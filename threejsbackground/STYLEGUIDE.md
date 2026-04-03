# Cloud Glitch — Scene Styleguide

## Overview

A fullscreen WebGL canvas effect built with Three.js r134. Four transparent PNG cloud layers are composited, passed through a multi-stage post-processing pipeline including glitch, chromatic aberration, bloom, and god rays, then rendered to the browser viewport. An 8-column layout guide overlay distorts in sync with glitch intensity, intended to anchor a full-page UI grid.

---

## File Structure

```
threejsbackground/
├── index.html              # Single-file app — all HTML, CSS, JS, GLSL
├── clouds.jpg              # Original reference photograph (unused in current build)
├── cloud_layer/
│   ├── 0.png               # Background layer  (2412×1447, RGBA)
│   ├── 1.png               # Mid-back layer    (2412×1447, RGBA)
│   ├── 2.png               # Mid-front layer   (2412×1447, RGBA)
│   └── 3.png               # Foreground layer  (2412×1447, RGBA)
├── stages/
│   ├── stage-01-layers-glitch-sat.html
│   ├── stage-02-full-controls.html
│   └── stage-03-lighting-grid.html
├── STYLEGUIDE.md
└── .claude/
    └── launch.json         # Preview server: npx serve -l 5173 .
```

---

## Render Pipeline

Seven sequential passes per frame. All intermediate results are written to `WebGLRenderTarget`s.

```
Cloud layers (layerScene)
        │
        ▼
[Pass 1]  layerRT        — Composite 4 PNG layers with transparency
        │
        ▼
[Pass 2]  glitchRT       — Full glitch/aberration/flow/pixelation shader
        │
        ├──► [Pass 3]  brightRT (half-res)  — Bright threshold extraction
        │         │
        │         ▼
        │    [Pass 4a] blurART  — Horizontal gaussian blur
        │         │
        │         ▼
        │    [Pass 4b] bloomRT  — Vertical gaussian blur
        │
        ├──► [Pass 5]  godRayRT (half-res)  — Radial blur from animated sun
        │
        ▼
[Pass 6]  screen         — Final composite: base + bloom + god rays
```

Bloom and god ray passes run at half resolution for performance. A single `PlaneGeometry(2,2)` quad is reused across all passes; the material is swapped per pass.

---

## Cloud Layer System

- Four `MeshBasicMaterial` planes with `transparent: true, depthWrite: false, depthTest: false`
- Stacked in a separate `layerScene` with z-ordered `renderOrder` (0–3)
- **Cover-fit UV**: each texture uses `repeat` and `offset` to fill the screen while maintaining the source aspect ratio (2412:1447 ≈ 1.667), equivalent to CSS `background-size: cover`
- **Bobbing**: UV offset is animated each frame via `Math.sin()` — no mesh movement, so no edge gaps appear at any screen size
- Each layer has independent amplitude, speed, and phase for organic non-synchronised movement
- Horizontal drift is also applied per layer at a different frequency, giving a subtle parallax feel

| Layer | Bob amp | Bob speed | Drift amp |
|-------|---------|-----------|-----------|
| 0 (bg)      | 0.008 | 0.30 rad/s | 0.003 |
| 1 (mid-back)| 0.018 | 0.52 rad/s | 0.006 |
| 2 (mid-front)| 0.028| 0.71 rad/s | 0.009 |
| 3 (fg)      | 0.040 | 0.95 rad/s | 0.013 |

---

## Glitch Shader (Pass 2)

All effects share a single fragment shader. Per-section on/off uniforms (`uGlitchOn`, `uBlockOn`, etc.) are floats (0.0/1.0) so effects can be multiplied out without branching.

### Glitch intensity signal
```glsl
float idle   = uIdleBase * (0.6 + 0.4 * pulse) + spike * 0.28;
float mg     = uMouseGlitch * uMouseForce;
float glitch = clamp((idle + mg) * uGlitchOn, 0.0, 1.0);
```
- `pulse`: slow sine wave (~0.4 Hz)
- `spike`: rare probabilistic event (~3% of time steps at 3.1 fps samples)
- `smoothGlitch` in JS: symmetric lerp toward mouse speed, rate controlled by ease slider

### Effects in order
1. **Ripple** — sin wave radiating from cursor, attenuated with `exp(-dist)`
2. **Block glitch** — horizontal UV band displacement, hash-driven, independent toggle
3. **Scanline tear** — single pixel-row displacement on occasional frames
4. **Pixelation** — UV quantisation; base size always on, glitch drives up to max
5. **Chromatic aberration** — prism model: R/G/B sampled at 120° offsets from an animated angle, radial spread from screen centre
6. **Flow** — dual cross-faded sawtooth UV displacement (see below)
7. **CRT grid** — UV-space step() lines
8. **Film grain** — hash noise scaled by glitch intensity
9. **Contrast/exposure** — static contrast + dynamic breathing exposure
10. **Scanlines** — subtle sine darkening at pixel row frequency
11. **Vignette** — radial power falloff
12. **Mouse brightness** — additive highlight under cursor
13. **Saturation** — luma-based mix toward greyscale

### Flow map
Procedural 256×256 `DataTexture` — integer-frequency sine/cosine combinations ensuring seamless tiling. No external file required.

### Continuous flow (no harsh reset)
Two sawtooth phases offset by 0.5, cross-faded with `0.5 + 0.5*cos(phase * TAU)`:
- When phase A resets (→ 0), blend weight goes to 1, showing phase B (at 0.5 — stable mid-cycle)
- When phase B resets, blend weight goes to 0, showing phase A
- Neither discontinuity is ever visible — motion is seamless
- A second layer runs at golden-ratio speed (×1.618) for large-scale variety

### Chromatic aberration angle wander
```glsl
float angleWander = sin(t * 0.28) * 1.8 * uAberrAnim
                  + sin(t * 0.71 + 1.2) * 0.6 * uAberrAnim;
float baseAngle   = atan(aberrBase.y, aberrBase.x) + angleWander;
```
Two incommensurable frequencies keep the wander non-periodic.

---

## Lighting Effects

### Dynamic exposure
Sinusoidal brightness modulation applied at the end of the glitch pass:
```glsl
float expFactor = 1.0 + sin(uTime * uExpSpd * TAU) * uExpAmp * uExpOn;
col *= expFactor;
```
Simulates the sun moving behind cloud cover.

### Bloom
1. Extract bright pixels above threshold with `smoothstep`
2. 9-tap separable gaussian blur (H then V) at half resolution
3. Additive composite in final pass, scaled by bloom strength

### God rays (screen-space radial blur)
50-sample radial blur marching from current UV toward the sun position. Each sample is attenuated by `decay^i`. The sun position drifts on two incommensurable sine frequencies and is slightly influenced by mouse X position.

---

## 8-Column Layout Grid

A CSS `display: grid` overlay with 8 equal columns sits at `z-index: 5` above the canvas but below the controls panel. The grid is driven from the JS animation loop each frame:

```js
const tx    = (g * Math.sin(p1) * 9.0)  + (idleDrift * Math.sin(p2) * 4.0);
const skew  = (g * Math.sin(p2) * 4.5)  + (idleDrift * Math.sin(p1) * 1.8);
const scaleY= 1 + g * Math.sin(p3) * 0.04;
col.style.transform = `translateX(${tx}px) skewX(${skew}deg) scaleY(${scaleY})`;
```

Each column strip gets a different phase offset (`i * 1.1`, `i * 0.7`, `i * 1.6`) so adjacent columns distort independently rather than moving in unison. A low-level idle drift runs even at zero mouse movement. Column opacity is set via a CSS custom property `--col-opa` so it can be adjusted from the controls panel without inline style conflicts.

**Integration with page content**: to make HTML content appear glitched, apply CSS transforms driven by `--glitch` custom property, or position content within `.col-strip` elements so they inherit the distortion.

---

## Controls Panel

- `position: fixed; top: 16px; right: 16px; z-index: 10`
- Pill toggles: CSS-only using `input:checked ~ .tog-track` selector
- Disabled section bodies: `opacity: 0.28; pointer-events: none` via `.sect-body.off`
- All slider values display live with fixed decimal places
- Export: downloads `cloud-glitch-settings.json` via `Blob` + `URL.createObjectURL` (clipboard API avoided — unreliable on `http://localhost`)

### Full settings map

| Section | Slider | Uniform / target |
|---------|--------|-----------------|
| Glitch | idle intensity | `uIdleBase` |
| | mouse force | `uMouseForce`, `P.force` |
| | mouse ease | `P.ease` (JS lerp rate) |
| | ripple | `uRipple` |
| Block glitch | chaos | `uBlockChaos` |
| Aberration | scale | `uAberrScale` |
| | idle spread | `uAberrIdle` |
| | mouse force | `uAberrMouse` |
| | animation | `uAberrAnim` |
| Grid (CRT) | cell size | `uGridSize` |
| | opacity | `uGridOpacity` |
| Pixelation | base size | `uPixelBase` |
| | max (glitch) | `uPixelMax` |
| Flow | speed | `uFlowSpeed` |
| | strength | `uFlowStrength` |
| Saturation | amount | `uSaturation` |
| Exposure | breathe amount | `uExpAmp` |
| | breathe speed | `uExpSpd` |
| Bloom | threshold | `brightMat.uThreshold` |
| | strength | `finalMat.uBloomStr` |
| | radius | `P.bloomRad` (blur kernel offset) |
| God rays | strength | `finalMat.uGodRayStr` |
| | decay | `godRayMat.uDecay` |
| | density | `godRayMat.uWeight` |
| | sun height | `P.grSunY` |
| | drift amount | `P.grDrift` |
| | drift speed | `P.grSpd` |
| Cloud layers | bob amount | `P.layerMove` |
| Column guide | opacity | `P.colOpa` → `--col-opa` |

---

## Default Values

| Setting | Default |
|---------|---------|
| idle intensity | 0.28 |
| mouse force | 0.50 |
| mouse ease | 0.70 |
| ripple | 1.25 |
| aberr scale | 0.55 |
| aberr idle spread | 0.001 |
| aberr mouse force | 2.00 |
| aberr animation | 0.66 |
| pixel base | 4.5 |
| pixel max | 8.0 |
| flow speed | 0.200 |
| flow strength | 0.030 |
| saturation | 1.50 |
| breathe amount | 0.08 |
| breathe speed | 0.045 |
| bloom threshold | 0.51 |
| bloom strength | 0.25 |
| bloom radius | 3.25 |
| god ray strength | 0.50 |
| god ray decay | 0.966 |
| god ray density | 0.40 |
| sun height | 0.72 |
| drift amount | 0.28 |
| bob amount | 0.30 |
| column opacity | 0.07 |

**Default off**: block glitch, CRT grid, god rays

---

## Stages

| File | Description |
|------|-------------|
| `stage-01-layers-glitch-sat.html` | 4 cloud layers, glitch effects, saturation control |
| `stage-02-full-controls.html` | Full controls panel, flow fix, export |
| `stage-03-lighting-grid.html` | Bloom, god rays, exposure, 8-column grid distortion |

To restore a stage: copy it over `index.html`.

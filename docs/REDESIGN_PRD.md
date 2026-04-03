# Portfolio Redesign — PRD & Implementation Plan

**Version:** 1.1
**Date:** 2026-04-04
**Status:** Planning — not yet implemented

---

## 1. Overview

A comprehensive visual redesign of the portfolio to establish a more considered, distinct design identity.

**Key changes:**
- New typographic system (PP Paloma headings / PP Neue Montreal body)
- Full colour system: grey neutrals + peach accent + secondary/tertiary palette + client colour set
- ThreeJS WebGL cloud canvas as the homepage hero background — using **existing** `threejsbackground/index.html` code directly (no rewrite)
- Visible 8-column CSS grid unified with the ThreeJS column overlay — grid lines are a design element
- Dark pill nav (new structure) — transparent over hero, opaque elsewhere
- Case study cards redesigned: numbered, tag badge, large title, pill CTA, image right, accent circle
- Case study headers default to dark grey, per-client colour preserved as named palette option
- Reusable button component with primary, outline, and ghost variants
- All design tokens consolidated globally in `global.css`

**Reference mockups (provided):**
- Homepage case study cards (grey bg + accent circle variants)
- Homepage hero (ThreeJS canvas, large white type)
- Case study interior page (grid with visible column lines)

---

## 2. Design Tokens

### 2.1 Grey Scale

Base: dark `#343230` / background `#f2f2f2`

| Token | Hex | Usage |
|-------|-----|-------|
| `--grey-0` | `#ffffff` | Pure white |
| `--grey-5` | `#f2f2f2` | **Primary background** |
| `--grey-10` | `#e8e8e7` | Surface, card bg |
| `--grey-20` | `#d2d1d0` | Borders, dividers |
| `--grey-30` | `#bcbab9` | Disabled, placeholders |
| `--grey-40` | `#a5a3a2` | Secondary text (light) |
| `--grey-50` | `#8f8d8b` | Secondary text |
| `--grey-60` | `#797674` | Body text (light contexts) |
| `--grey-70` | `#625f5d` | Body text |
| `--grey-80` | `#4d4a48` | Strong body text |
| `--grey-90` | `#3e3b39` | Near-dark |
| `--grey-100` | `#343230` | **Primary dark — headings, nav, dark bg** |

---

### 2.2 Accent Scale — Peach `#F7C099`

Primary accent. Used for: hover states, decorative highlights, default case study accent circle, focus rings.

| Token | Hex | Usage |
|-------|-----|-------|
| `--accent-0` | `#ffffff` | White |
| `--accent-10` | `#fef6ef` | Lightest tint — hover bg |
| `--accent-20` | `#fdecdf` | Light tint |
| `--accent-30` | `#fce3cf` | Light tint |
| `--accent-40` | `#fad9be` | Mid-light tint |
| `--accent-50` | `#f7c099` | **Base accent** |
| `--accent-60` | `#e8a87a` | Borders, underlines |
| `--accent-70` | `#d6905c` | Hover on accent elements |
| `--accent-80` | `#b8733e` | High-contrast accent |
| `--accent-90` | `#8f5628` | Very dark accent |
| `--accent-100` | `#5e3312` | Near-black accent |

---

### 2.3 Secondary Scale — Slate `#7B93A8`

Cool blue-grey. Balances the warm peach accent. Used for: secondary interactive elements, info badges, code/mono contexts.

| Token | Hex | Usage |
|-------|-----|-------|
| `--secondary-0` | `#ffffff` | White |
| `--secondary-10` | `#f2f5f7` | Subtle tint |
| `--secondary-20` | `#dce4ea` | Light surface |
| `--secondary-30` | `#c5d2db` | Border |
| `--secondary-40` | `#afc0cc` | Mid-light |
| `--secondary-50` | `#7b93a8` | **Base secondary** |
| `--secondary-60` | `#627886` | Hover state |
| `--secondary-70` | `#4c5e69` | Active state |
| `--secondary-80` | `#37444d` | Dark secondary |
| `--secondary-90` | `#243039` | Very dark |
| `--secondary-100` | `#141d24` | Near-black secondary |

---

### 2.4 Tertiary Scale — Rust `#C17A5A`

Warm terracotta/rust. Earthy counterpart to peach. Used for: warnings, highlights, featured callouts, decorative marks.

| Token | Hex | Usage |
|-------|-----|-------|
| `--tertiary-0` | `#ffffff` | White |
| `--tertiary-10` | `#faf4f0` | Subtle tint |
| `--tertiary-20` | `#f3e4d9` | Light surface |
| `--tertiary-30` | `#ead0bc` | Border |
| `--tertiary-40` | `#dab99d` | Mid-light |
| `--tertiary-50` | `#c17a5a` | **Base tertiary** |
| `--tertiary-60` | `#a86248` | Hover |
| `--tertiary-70` | `#8c4d37` | Active |
| `--tertiary-80` | `#6e3926` | Dark tertiary |
| `--tertiary-90` | `#4f2618` | Very dark |
| `--tertiary-100` | `#30140a` | Near-black tertiary |

---

### 2.5 Semantic Aliases

Use these in all components — never reference raw scale tokens directly.

```css
/* Backgrounds */
--color-bg:              var(--grey-5);       /* #f2f2f2 — page background */
--color-surface:         var(--grey-10);      /* card / panel */
--color-dark-bg:         var(--grey-100);     /* #343230 — dark sections, nav */

/* Text */
--color-text:            var(--grey-80);      /* body text */
--color-text-muted:      var(--grey-50);      /* captions, labels */
--color-text-strong:     var(--grey-100);     /* headings */
--color-text-on-dark:    var(--grey-0);       /* text on dark backgrounds */

/* Borders */
--color-border:          var(--grey-20);      /* dividers */
--color-border-strong:   var(--grey-40);      /* strong borders */

/* Accent */
--color-accent:          var(--accent-50);    /* #F7C099 */
--color-accent-subtle:   var(--accent-10);    /* hover backgrounds */
--color-accent-border:   var(--accent-60);    /* accent underlines/borders */
--color-accent-hover:    var(--accent-70);    /* hover on accent */

/* Secondary */
--color-secondary:       var(--secondary-50);
--color-secondary-subtle:var(--secondary-10);

/* Tertiary */
--color-tertiary:        var(--tertiary-50);
--color-tertiary-subtle: var(--tertiary-10);

/* Grid lines (design element) */
--color-grid-line:       rgba(52, 50, 48, 0.08); /* grey-100 at low opacity */
--color-grid-line-dark:  rgba(255, 255, 255, 0.10); /* on dark/canvas backgrounds */
```

---

### 2.6 Client Colour Palettes

Named palette options for case study `bgClass` frontmatter. Replaces gradients as the default system. Each is a flat background colour — the design uses shape/circle elements (accent circle) rather than gradients for visual interest.

| bgClass | Background | Text | Accent circle | Notes |
|---------|-----------|------|---------------|-------|
| `default` | `#343230` | `#ffffff` | `#f7c099` | Dark — all new case studies |
| `accent` | `#f7c099` | `#343230` | `#343230` | Peach bg, dark text |
| `slate` | `#7b93a8` | `#ffffff` | `#f7c099` | Cool blue-grey |
| `sage` | `#8fa68b` | `#ffffff` | `#f7c099` | Muted green |
| `rust` | `#c17a5a` | `#ffffff` | `#f2f2f2` | Warm terracotta |
| `sand` | `#d4bc94` | `#343230` | `#343230` | Warm sand |
| `indigo` | `#4a5580` | `#ffffff` | `#f7c099` | Deep blue-indigo |
| `midnight` | `#1a1a2e` | `#ffffff` | `#f7c099` | Very dark blue-black |
| — | — | — | — | — |
| `kepla` | gradient `#a2e0d3→#649ee0` | `#343230` | — | Legacy — keep |
| `aurora` | gradient `#fdd893→#faa949` | `#343230` | — | Legacy — keep |
| `pelorus` | gradient `#407beb→#6fc6fc` | `#ffffff` | — | Legacy — keep |
| `sitesmart` | gradient `#b7ddef→#4cadde` | `#343230` | — | Legacy — keep |

**CSS pattern for new flat palettes:**
```css
/* All new bgClass entries follow this pattern */
.slate  { background-color: #7b93a8; --cs-text: #ffffff; --cs-accent: var(--color-accent); }
.sage   { background-color: #8fa68b; --cs-text: #ffffff; --cs-accent: var(--color-accent); }
.rust   { background-color: #c17a5a; --cs-text: #ffffff; --cs-accent: var(--grey-5); }
.sand   { background-color: #d4bc94; --cs-text: var(--grey-100); --cs-accent: var(--grey-100); }
.indigo { background-color: #4a5580; --cs-text: #ffffff; --cs-accent: var(--color-accent); }
.midnight { background-color: #1a1a2e; --cs-text: #ffffff; --cs-accent: var(--color-accent); }
.accent { background-color: var(--color-accent); --cs-text: var(--grey-100); --cs-accent: var(--grey-100); }

/* Default (no bgClass or bgClass="default") */
.hero-casestudy { background-color: var(--color-dark-bg); --cs-text: var(--grey-0); --cs-accent: var(--color-accent); }
```

---

### 2.7 Typography

**Fonts required (files to be provided):**
- `PP Paloma` — headings — weights: Regular (400), Bold (700)
- `PP Neue Montreal` — body — weights: Light (300), Regular (400), Medium (500)

**New file:** `src/styles/fonts.css` (imported in BaseLayout)

```css
@font-face {
  font-family: 'PP Paloma';
  src: url('/fonts/PPPaloma-Regular.woff2') format('woff2');
  font-weight: 400; font-style: normal; font-display: swap;
}
@font-face {
  font-family: 'PP Paloma';
  src: url('/fonts/PPPaloma-Bold.woff2') format('woff2');
  font-weight: 700; font-style: normal; font-display: swap;
}
@font-face {
  font-family: 'PP Neue Montreal';
  src: url('/fonts/PPNeueMontreal-Light.woff2') format('woff2');
  font-weight: 300; font-style: normal; font-display: swap;
}
@font-face {
  font-family: 'PP Neue Montreal';
  src: url('/fonts/PPNeueMontreal-Regular.woff2') format('woff2');
  font-weight: 400; font-style: normal; font-display: swap;
}
@font-face {
  font-family: 'PP Neue Montreal';
  src: url('/fonts/PPNeueMontreal-Medium.woff2') format('woff2');
  font-weight: 500; font-style: normal; font-display: swap;
}
```

**Font files:** `public/fonts/`

**Token updates:**
```css
--font-heading: 'PP Paloma', Georgia, serif;
--font-body:    'PP Neue Montreal', Helvetica, Arial, sans-serif;
/* Remove: --font-work-sans, --font-inconsolata */
```

**Type scale:**

| Element | Font | Weight | Mobile | Desktop |
|---------|------|--------|--------|---------|
| h1 | PP Paloma | 700 | 2.25rem | 3rem |
| h2 | PP Paloma | 700 | 1.75rem | 2.375rem |
| h3 | PP Paloma | 700 | 1.25rem | 1.5rem |
| h4 | PP Paloma | 400 | 1rem | 1.25rem |
| h5 | PP Paloma | 400 | 1rem | 1rem |
| body | PP Neue Montreal | 300 | 1rem | 1rem |
| `.overview-text` | PP Neue Montreal | 300 | 1.625rem | 1.875rem |
| `.overview-text-small` | PP Neue Montreal | 300 | 1.125rem | 1.25rem |
| `.workitem-title` | PP Paloma | 700 | 1.675rem | 2rem |
| `.link-large` | PP Paloma | 700 | 1.2rem | 1.2rem |
| `.logo` | PP Paloma | 700 | 1rem | 1rem |
| `.small-title` | PP Neue Montreal | 500 | 1rem | 1rem |
| `.tag-badge` | PP Neue Montreal | 500 | 0.75rem | 0.75rem |
| `.case-number` | PP Paloma | 700 | 2rem | 3rem |

---

### 2.8 Grid System

**Spec:** 8 total columns = 6 content + 1 margin each side. Matches ThreeJS 8-column overlay.
Grid lines are a **visible design element** — displayed as `--color-grid-line` thin verticals on all pages.

```css
--grid-cols: 6;
--grid-total: 8;
--grid-gutter: 1.5rem;
--grid-margin: minmax(1rem, 1fr);
--max-width: 1600px;           /* unchanged */
```

**Grid container:**
```css
.grid {
  display: grid;
  grid-template-columns: var(--grid-margin) repeat(6, 1fr) var(--grid-margin);
  gap: var(--grid-gutter);
  max-width: var(--max-width);
  margin: 0 auto;
}
```

**Placement utilities:**
```css
.col-full      { grid-column: 1 / -1; }   /* all 8 */
.col-content   { grid-column: 2 / 8; }   /* 6 content cols */
.col-narrow    { grid-column: 2 / 6; }   /* 4 cols left-aligned */
.col-centered  { grid-column: 3 / 7; }   /* 4 cols centred */
.col-left      { grid-column: 2 / 5; }   /* left 3 content cols */
.col-right     { grid-column: 5 / 8; }   /* right 3 content cols */
.col-left-wide { grid-column: 2 / 6; }   /* left 4 cols */
.col-right-wide{ grid-column: 4 / 8; }   /* right 4 cols */
```

**Grid line overlay** (visual design element, rendered via CSS pseudo-elements or a dedicated `GridOverlay` component):
```css
/* Each column has a right-side border line */
.grid-lines {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  display: grid;
  grid-template-columns: var(--grid-margin) repeat(6, 1fr) var(--grid-margin);
  max-width: var(--max-width);
  margin: 0 auto;
}
.grid-lines span {
  border-right: 1px solid var(--color-grid-line);
}
/* On canvas/dark hero: use --color-grid-line-dark */
.hero-home .grid-lines span {
  border-right-color: var(--color-grid-line-dark);
}
```

**Corner bracket marks** (seen in mockups at grid intersections):
```css
.grid-bracket {
  position: absolute;
  width: 12px;
  height: 12px;
  border-color: var(--color-grid-line);
  border-style: solid;
}
.grid-bracket--tl { border-width: 1px 0 0 1px; top: 0; left: 0; }
.grid-bracket--tr { border-width: 1px 1px 0 0; top: 0; right: 0; }
.grid-bracket--bl { border-width: 0 0 1px 1px; bottom: 0; left: 0; }
.grid-bracket--br { border-width: 0 1px 1px 0; bottom: 0; right: 0; }
```

**Responsive:**
- `≥ 768px`: full 8-column grid
- `< 768px`: single column with `1rem` edge padding, grid lines hidden

---

## 3. Components

### 3.1 Button Component — `src/components/Button.astro`

**New reusable component.** All CTAs across the site use this — no one-off button styles.

**Variants:**

| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| `primary` | `--color-text-strong` (#343230) | `--grey-0` | none | `--grey-80` bg |
| `outline` | transparent | `--color-text-strong` | `--color-text-strong` | `--color-accent-subtle` bg |
| `ghost` | transparent | `--color-text-strong` | none | `--color-accent-subtle` bg |

All variants: `border-radius: 999px` (pill shape, as seen in mockups).

**Component API:**
```astro
---
export interface Props {
  variant?: 'primary' | 'outline' | 'ghost';
  href?: string;           // renders as <a> if provided
  size?: 'sm' | 'md' | 'lg';
  external?: boolean;      // adds target="_blank" rel="noopener"
}
const { variant = 'primary', href, size = 'md', external = false } = Astro.props;
---
```

**CSS:**
```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 999px;
  font-family: var(--font-heading);
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  border: 1.5px solid transparent;
  transition: var(--transition-1-fast);
  white-space: nowrap;
}

/* Sizes */
.btn--sm  { padding: 0.375rem 1rem;   font-size: 0.875rem; }
.btn--md  { padding: 0.625rem 1.5rem; font-size: 1rem; }
.btn--lg  { padding: 0.875rem 2rem;   font-size: 1.125rem; }

/* Primary */
.btn--primary {
  background-color: var(--color-text-strong);
  color: var(--grey-0);
  border-color: var(--color-text-strong);
}
.btn--primary:hover, .btn--primary:focus {
  background-color: var(--grey-80);
  border-color: var(--grey-80);
}

/* Outline */
.btn--outline {
  background-color: transparent;
  color: var(--color-text-strong);
  border-color: var(--color-text-strong);
}
.btn--outline:hover, .btn--outline:focus {
  background-color: var(--color-accent-subtle);
}

/* Ghost */
.btn--ghost {
  background-color: transparent;
  color: var(--color-text-strong);
  border-color: transparent;
}
.btn--ghost:hover, .btn--ghost:focus {
  background-color: var(--color-accent-subtle);
}

/* On dark backgrounds — invert primary */
.dark-bg .btn--primary {
  background-color: var(--grey-0);
  color: var(--color-text-strong);
  border-color: var(--grey-0);
}
.dark-bg .btn--primary:hover {
  background-color: var(--accent-10);
}

/* On dark backgrounds — outline/ghost use white border */
.dark-bg .btn--outline,
.dark-bg .btn--ghost {
  color: var(--grey-0);
  border-color: var(--grey-0);
}
```

**Usage across the site:**
- Case study cards: `<Button href={url} variant="primary" size="md">Read</Button>`
- Case study hero: `<Button href={projectLink} variant="outline">{projectLinkCopy}</Button>`
- Project pages: same pattern
- Nav (if needed): `<Button variant="ghost" size="sm">`

---

### 3.2 Tag Badge — `src/components/TagBadge.astro`

Seen in mockups: "CASE STUDY" outlined label above the work title.

```astro
---
export interface Props {
  label: string;
  variant?: 'default' | 'accent';
}
---
<span class={`tag-badge tag-badge--${variant ?? 'default'}`}>{label}</span>
```

```css
.tag-badge {
  display: inline-block;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.25rem 0.625rem;
  border-radius: 3px;
  border: 1px solid currentColor;
}
.tag-badge--default { color: var(--color-text-strong); }
.tag-badge--accent  { color: var(--color-accent); border-color: var(--color-accent); }
```

---

### 3.3 Case Number — inline element

The large numbered labels ("01.", "02." etc.) on work cards. Not a component — a CSS class applied to a `<span>` or `<p>`.

```css
.case-number {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 2rem;
  color: var(--color-text-strong);
  line-height: 1;
  margin-bottom: 1rem;
}
@media (min-width: 768px) {
  .case-number { font-size: 3rem; }
}
```

---

### 3.4 Workitem (updated) — `src/components/Workitem.astro`

**New layout from mockups:**
- Number top-left
- TagBadge below number
- Large heading title
- Description paragraph
- Button (primary)
- Product screenshot — right column (or right half of grid)
- Optional: accent circle behind screenshot (circle element, colour driven by `accentColor` prop or case study `bgClass`)

**Updated props:**
```astro
export interface Props {
  url: string;
  title: string;
  description: string;
  image: { url: string; alt: string; };
  optimizedImage?: ImageMetadata;
  order: number;              // drives "01." display
  type?: 'case-study' | 'project';
  accentColor?: string;       // hex — drives the circle bg element
}
```

The accent circle is a decorative `<div>` positioned absolutely behind the image:
```css
.workitem-accent-circle {
  position: absolute;
  width: 80%;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: var(--workitem-accent, var(--color-accent));
  z-index: 0;
  right: -10%;
  top: 50%;
  transform: translateY(-50%);
}
```
Driven by: `style="--workitem-accent: {accentColor}"` on the workitem element.

---

### 3.5 ThreeBackground — `src/components/ThreeBackground.astro`

**Critical:** This component wraps the **existing** `threejsbackground/index.html` code. The shaders, render pipeline, and WebGL setup are **not rewritten** — only extracted into an Astro component format.

**What gets moved:**
- All `<script>` content from `index.html` → into the `<script>` block of `ThreeBackground.astro`
- Cloud layer PNG paths updated: `threejsbackground/cloud_layer/` → `public/images/cloud_layer/`
- Three.js CDN script tag → kept as CDN import or bundled via npm (`three@0.134.0`)
- Controls panel: wrapped in `if (import.meta.env.DEV)` — visible in dev, stripped in production build

**What does NOT change:**
- All GLSL shader code (verbatim copy)
- All render pass logic
- All animation loop code
- All default values (as per STYLEGUIDE.md)
- The 8-column grid overlay JS (column distortion in sync with glitch)

**Column grid connection:**
The ThreeJS overlay columns (`--col-opa: 0.07`) are shown at low opacity. The CSS grid lines layer on top at the same column positions. Together they create the unified grid aesthetic seen in the mockups.

**Component structure:**
```astro
---
// No server-side props — purely client-side
---
<div
  id="three-bg-container"
  aria-hidden="true"
  role="presentation"
>
  <canvas id="three-canvas"></canvas>
</div>

<script>
  // === EXTRACTED VERBATIM FROM threejsbackground/index.html ===
  // Only changes:
  //   1. Asset paths: '../cloud_layer/' → '/images/cloud_layer/'
  //   2. Controls panel: guard with isDev check
  //   3. prefers-reduced-motion: pause loop after first frame
</script>

<style>
  #three-bg-container {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
  }
  #three-canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
```

**Fallback (prefers-reduced-motion):**
```js
const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!motionOK) {
  // Render one frame then stop the animation loop
  renderer.render(scene, camera);
  return; // exit animate()
}
```

**Asset migration:** `threejsbackground/cloud_layer/*.png` → `public/images/cloud_layer/`

---

### 3.6 Navigation (full rethink) — `src/components/Header.astro`

**From mockups:** Dark pill/capsule, centred horizontally. "Jamie Barter" left side, "Case Studies" + "Projects" right side — all within one dark rounded pill.

```
┌────────────────────────────────────────────────────┐
│  Jamie Barter          Case Studies    Projects    │ ← dark pill
└────────────────────────────────────────────────────┘
```

**CSS:**
```css
nav {
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: calc(100% - 2rem);
  max-width: 780px;
  background-color: var(--color-dark-bg);
  border-radius: 999px;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: var(--transition-2);
}
```

**Transparent mode (homepage only):** Nav pill gains opacity but the background becomes semi-transparent when `nav-transparent` class is active. On scroll past 80px, goes fully opaque.

**Text on nav:** Always `--grey-0` (white) — both over ThreeJS canvas and over opaque nav bg.

**Mobile:** Pill collapses — logo + hamburger button only. Mobile menu drops below the pill as a second pill/panel.

---

### 3.7 GridOverlay — `src/components/GridOverlay.astro`

A globally-rendered overlay component providing the visible column lines. Added to `BaseLayout.astro` once — present on all pages.

```astro
---
// No props
---
<div class="grid-overlay" aria-hidden="true">
  {Array.from({ length: 8 }).map(() => <span />)}
</div>
```

```css
.grid-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  display: grid;
  grid-template-columns: minmax(1rem, 1fr) repeat(6, 1fr) minmax(1rem, 1fr);
  gap: 1.5rem;
  max-width: 1600px;
  margin: 0 auto;
  left: 0;
  right: 0;
}
.grid-overlay span {
  border-right: 1px solid var(--color-grid-line);
}
.grid-overlay span:last-child {
  border-right: none;
}
/* Darker lines on canvas hero */
.has-canvas-hero .grid-overlay span {
  border-right-color: var(--color-grid-line-dark);
}
```

---

## 4. Component Reuse Rules

To prevent one-off styles proliferating:

| Pattern | Use this | Never do this |
|---------|----------|--------------|
| Any CTA or link-as-button | `<Button>` component | `.link-large` class or ad-hoc `<a>` styling |
| "Case study" / "Project" label | `<TagBadge>` component | Inline span with ad-hoc border |
| Hero images | `<Image>` from `astro:assets` with `format="webp"` | Raw `<img>` or public path |
| Grid layout | `.grid` + `.col-*` utilities | Ad-hoc `margin: 0 auto; max-width` on individual elements |
| Typography sizes | Use heading elements + CSS scale | Inline font-size |
| Colour values | Semantic token vars (`--color-*`) | Raw hex values in CSS |
| Hover underline | `--color-accent-border` box-shadow | `text-decoration` or hardcoded colour |
| Case study count | `.case-number` class | Hardcoded styled number |

---

## 5. Homepage Structure (from mockups)

```
┌──────────────────────────────────────────────────────┐
│  [ThreeBackground canvas — full viewport]            │
│  ┌── GridOverlay lines ──────────────────────────┐   │
│  │                                               │   │
│  │  Jamie                                        │   │
│  │  Barter                                       │   │
│  │                                               │   │
│  │          UX AND PRODUCT DESIGN LEAD           │   │
│  │          5+ years experience...               │   │
│  └───────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────┐
│  [Light grey bg -- #f2f2f2]                          │
│                                                      │
│  01.                         [product screenshot]    │
│  [CASE STUDY]               (with accent circle bg)  │
│  Title of case study                                 │
│  Description text                                    │
│  [Read  ●]                                           │
│                                                      │
│  02. ...                                             │
└──────────────────────────────────────────────────────┘
```

**Grid placement for work cards:**
- Number + badge + title + description + button: `col-left` (cols 2–4)
- Product screenshot + accent circle: `col-right` (cols 5–7) or `col-right-wide` (cols 4–7)

---

## 6. Implementation Phases

### Phase 1 — Foundations *(unblocks everything)*
- [ ] Add PP Paloma + PP Neue Montreal font files to `public/fonts/`
- [ ] Create `src/styles/fonts.css`
- [ ] Add font import to `BaseLayout.astro`
- [ ] Replace all tokens in `global.css` — full grey/accent/secondary/tertiary scales + semantic aliases
- [ ] Remove old tokens (`--primary-*`, `--midnight-blue`, `--gradient-standard`, `--font-work-sans`, `--font-inconsolata`)
- [ ] Update all font references throughout `global.css` to `--font-heading` / `--font-body`
- [ ] Update all colour references to semantic tokens
- [ ] Verify: `npm run build` passes, site renders with new fonts + colours

### Phase 2 — Grid system
- [ ] Add grid tokens + `.grid` + `.col-*` utilities to `global.css`
- [ ] Create `src/components/GridOverlay.astro`
- [ ] Add `<GridOverlay>` to `BaseLayout.astro`
- [ ] Add `.has-canvas-hero` class logic to homepage
- [ ] Verify: grid lines visible, aligned at all breakpoints

### Phase 3 — Button + Badge components
- [ ] Create `src/components/Button.astro`
- [ ] Create `src/components/TagBadge.astro`
- [ ] Add button CSS to `global.css`
- [ ] Replace all existing `.link-large` usage with `<Button>`
- [ ] Verify: all three variants render correctly on light and dark backgrounds

### Phase 4 — ThreeJS integration
- [ ] Move `threejsbackground/cloud_layer/*.png` → `public/images/cloud_layer/`
- [ ] Create `src/components/ThreeBackground.astro`
- [ ] Copy JS verbatim from `threejsbackground/index.html` into `<script>` block
- [ ] Update asset paths (`../cloud_layer/` → `/images/cloud_layer/`)
- [ ] Wrap controls panel in dev-only guard
- [ ] Add `prefers-reduced-motion` fallback
- [ ] Integrate into `index.astro` hero
- [ ] Add hero CSS (relative/absolute positioning, z-index layering)
- [ ] Add `has-canvas-hero` class to homepage `<body>` or hero section
- [ ] Verify: canvas renders, grid lines visible in dark mode over canvas

### Phase 5 — Nav rethink
- [ ] Rewrite `Header.astro` — new pill nav structure
- [ ] Rewrite `Navigation.astro` — simplified (no unused glob imports)
- [ ] Update nav CSS — pill shape, dark bg, centred
- [ ] Update `menu.js` — add transparent-over-hero scroll behaviour
- [ ] Mobile hamburger restyle within pill
- [ ] Verify: all pages, scroll behaviour on homepage, keyboard nav

### Phase 6 — Homepage cards
- [ ] Update `Workitem.astro` — new layout (number, badge, title, desc, button, image, accent circle)
- [ ] Update `WorkitemProject.astro` — same pattern, smaller scale
- [ ] Update `index.astro` — apply grid to case study + project sections
- [ ] Pass `order` and `accentColor` props through from MDX frontmatter
- [ ] Add `accentColor` field to case study frontmatter files

### Phase 7 — Case study headers + layouts
- [ ] Update `.hero-casestudy` default in `global.css` — dark grey bg
- [ ] Add new flat client colour palette classes to `global.css`
- [ ] Update `CaseStudyLayout.astro` — grid layout for hero content, use `<Button>` for project link
- [ ] Update `ProjectLayout.astro` — same
- [ ] Update `src/pages/case-study/*.mdx` — set appropriate `bgClass` per case study

### Phase 8 — Case study interior content
- [ ] Apply `.grid` + `.col-*` to content sections in case study pages
- [ ] Full-width images: `.col-full`
- [ ] Prose text: `.col-narrow` or `.col-centered`
- [ ] Side-by-side images: `.col-left` + `.col-right`
- [ ] Update `.content-case-study` CSS — remove max-width constraint, let grid handle it

### Phase 9 — Footer + remaining components
- [ ] Update `Footer.astro` — font + colour tokens, consider dark bg variant
- [ ] Audit all remaining hardcoded hex values in `global.css`
- [ ] Audit all `--midnight-blue`, `--primary-*` references missed in Phase 1

### Phase 10 — Polish + QA
- [ ] `npm run build` — zero errors
- [ ] Test all pages: mobile 375px, tablet 768px, desktop 1280px+
- [ ] All hover/focus states use `--color-accent-border` or `--color-accent-subtle`
- [ ] All text passes WCAG AA contrast on respective backgrounds
- [ ] Run `/astro` skill review
- [ ] Run `/styleguide` to generate updated living styleguide

---

## 7. Files Modified

| File | Phase | Change |
|------|-------|--------|
| `src/styles/global.css` | 1–3, 5–9 | Major — full token rewrite + grid + components |
| `src/styles/fonts.css` | 1 | **New** — all @font-face |
| `public/fonts/` | 1 | **New** — PP Paloma + PP Neue Montreal files |
| `public/images/cloud_layer/` | 4 | **New** — moved from threejsbackground/ |
| `src/components/ThreeBackground.astro` | 4 | **New** — wraps existing JS verbatim |
| `src/components/Button.astro` | 3 | **New** — primary/outline/ghost |
| `src/components/TagBadge.astro` | 3 | **New** — case study/project label |
| `src/components/GridOverlay.astro` | 2 | **New** — visible column lines |
| `src/layouts/BaseLayout.astro` | 1–2 | fonts.css import, GridOverlay, data attrs |
| `src/layouts/CaseStudyLayout.astro` | 7 | Grid layout, Button, new colour defaults |
| `src/layouts/ProjectLayout.astro` | 7 | Same as CaseStudyLayout |
| `src/components/Header.astro` | 5 | New pill nav structure |
| `src/components/Navigation.astro` | 5 | Simplified |
| `src/components/Logo.astro` | 5 | Font token update |
| `src/components/Hamburger.astro` | 5 | Restyle |
| `src/components/Footer.astro` | 9 | Token + font updates |
| `src/components/Workitem.astro` | 6 | New layout — number, badge, circle |
| `src/components/WorkitemProject.astro` | 6 | Same pattern |
| `src/pages/index.astro` | 4, 6 | ThreeBackground, grid, updated cards |
| `src/pages/case-study/*.mdx` | 7 | bgClass updates |
| `src/scripts/menu.js` | 5 | Transparent nav scroll logic |

---

## 8. Open Questions

- [ ] PP Paloma weights available — Regular + Bold confirmed? Any italic?
- [ ] PP Neue Montreal weights — Light 300, Regular 400, Medium 500 confirmed?
- [ ] Nav on mobile: hamburger in the pill, or pill collapses to icon-only?
- [ ] Footer: light bg (`--grey-5`) or dark bg (`--grey-100`)?
- [ ] Grid overlay: always visible, or fade in on scroll, or only on homepage?
- [ ] ThreeJS column guide opacity (`--col-opa`): keep at 0.07 or remove entirely since CSS grid lines handle the visual?
- [ ] `accentColor` per case study — should this be specified per case study in frontmatter, or auto-assigned by order?

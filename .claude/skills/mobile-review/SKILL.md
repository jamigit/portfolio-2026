---
name: mobile-review
description: Review code for mobile-first CSS patterns, touch targets, responsive layout, ThreeJS mobile performance, and viewport handling specific to this portfolio project.
argument-hint: "[file or component to review — or leave blank for IDE selection]"
---

You are reviewing code for mobile-first correctness in an Astro portfolio site. The project uses plain CSS (no Tailwind), a custom 8-column grid, and a ThreeJS WebGL hero on the homepage.

Always read the file before reviewing. Do not assume what's there.

---

## Mobile-first rule set

### 1. Media query direction

**Rule:** All CSS must be written mobile-first. Base styles apply to the smallest viewport. Larger viewports are progressive enhancements via `min-width`.

Flag any `max-width` media query as **[warning]** unless it's an intentional override:
```css
/* Wrong — desktop-first */
@media (max-width: 767px) { ... }

/* Correct — mobile-first */
@media (min-width: 768px) { ... }
```

This project's breakpoints (defined in `global.css`):
- `--media-mob: 540px`
- `--media-mob-med: 768px` ← main layout breakpoint
- `--media-tablet: 1024px`
- `--media-desktop: 1280px`

---

### 2. Touch targets

All interactive elements must meet minimum touch target size:
- Minimum: `44px × 44px` (WCAG 2.5.5)
- Buttons: check `padding` creates at least 44px height at mobile font sizes
- Nav links: check tap area
- Hamburger button: must be at least 44×44px
- Card links (Workitem): entire card should be tappable, not just the button

Flag undersized touch targets as **[critical]** if below 44px, **[warning]** if borderline (36–44px).

```css
/* Minimum safe button height check */
/* padding: 0.625rem 1.5rem + font-size: 1rem + line-height: 1.2 */
/* = ~10px + 20px + 10px = 40px — borderline, needs min-height */
.btn { min-height: 44px; }
```

---

### 3. Grid — mobile behaviour

The project uses an 8-column grid. On mobile this MUST collapse:

```css
/* Correct mobile-first grid */
.grid {
  display: block;          /* mobile: single column */
  padding: 0 1rem;
}
@media (min-width: 768px) {
  .grid {
    display: grid;
    grid-template-columns: minmax(1rem, 1fr) repeat(6, 1fr) minmax(1rem, 1fr);
    gap: 1.5rem;
    padding: 0;
  }
}
```

Grid placement utilities (`.col-*`) must not constrain layout on mobile — they should only apply at `min-width: 768px`.

Flag any grid utility that doesn't have a mobile fallback as **[warning]**.

---

### 4. ThreeJS canvas on mobile

The WebGL pipeline (bloom, god rays, glitch, chromatic aberration) is GPU-intensive. On mobile:

**Required:** Detect mobile and reduce or disable the canvas:

```js
// Acceptable approaches (flag if none present):
// Option A — disable on mobile
const isMobile = window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent);
if (isMobile) { /* skip renderer init, show static fallback */ }

// Option B — reduce quality on mobile
if (isMobile) {
  // disable god rays, bloom, reduce pixel ratio
  renderer.setPixelRatio(1);
  // skip bloom/god ray passes
}
```

Also check:
- `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))` — cap pixel ratio to prevent overdraw
- Canvas resize handler exists and is called on `window.resize`
- Canvas doesn't prevent page scroll (no `touch-action: none` on the canvas or parent unless intentional)

Flag missing mobile strategy as **[critical]**.

---

### 5. Typography — mobile sizes

Check that font sizes are readable at mobile:
- Body text: minimum `1rem` (16px) — do not reduce below this on mobile
- Headings: should scale down at mobile, not stay at desktop sizes without a breakpoint
- `.overview-text`: `1.625rem` mobile → `1.875rem` desktop — ✓ correct direction
- Check no text is set in `px` that would ignore user font size preferences

Flag text below `0.875rem` on mobile as **[warning]** unless it's intentional (labels, captions).

---

### 6. Workitem cards

On mobile, work cards must stack vertically:
- Text content (number, badge, title, description, button) stacks above the image
- Image is full-width below the text
- Accent circle: must be `overflow: hidden` on the image container, or the circle must be hidden/resized on mobile to prevent horizontal scroll

```css
/* Correct mobile-first Workitem */
.workitem { display: block; }  /* stack on mobile */
.workitem-image-wrap { position: relative; overflow: hidden; margin-top: 1.5rem; }
.workitem-accent-circle { display: none; }  /* hide on mobile */

@media (min-width: 768px) {
  .workitem { display: grid; grid-template-columns: 1fr 1fr; align-items: center; }
  .workitem-accent-circle { display: block; }
}
```

Flag horizontal scroll caused by accent circles as **[critical]**.

---

### 7. Navigation — mobile

The pill nav on mobile:
- Must not be too wide for small screens (max-width or `calc(100% - 2rem)`)
- Hamburger icon within the pill: minimum 44×44px tap target
- Mobile menu overlay: must not prevent page scroll on elements outside the menu
- `body.overflow: hidden` when menu open: verify it doesn't cause layout shift on iOS Safari

---

### 8. Images

- All `<Image>` components must have `max-width: 100%` via CSS
- No fixed `width` values on images in CSS without a responsive override
- Accent circles and decorative elements with `position: absolute` must not cause overflow on mobile

---

## Output format

Use the same three-severity format:
- **[critical]** — causes layout breakage, horizontal scroll, or unusable UI on mobile
- **[warning]** — degrades mobile experience but doesn't break
- **[suggestion]** — improvement

End with **Mobile score: X/10** — a rough assessment of how mobile-ready the code is, plus the single most important fix.

---

## Rules

- Read the actual file first — never fabricate issues
- Check against this project's specific breakpoints and patterns, not generic mobile rules
- A desktop-first approach that works is still a **[warning]** — this project must be mobile-first going forward
- Flag any instance of horizontal scroll risk as **[critical]**

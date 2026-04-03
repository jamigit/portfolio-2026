---
name: phase-gate
description: End-of-phase checklist for the portfolio redesign. Reviews whether a phase is truly complete and safe to build on before moving to the next phase.
argument-hint: "[phase number, e.g. '1' or 'Phase 1']"
---

You are a quality gate reviewer for the portfolio redesign project. Your job is to verify that a given implementation phase is genuinely complete — not just "the code is written" but "it's correct, tested, and won't cause problems in subsequent phases."

Read the relevant files before reviewing. Cross-reference against the PRD at `docs/REDESIGN_PRD.md`.

---

## What to check per phase

### Phase 1 — Foundations

Read: `src/styles/global.css`, `src/styles/fonts.css`, `src/layouts/BaseLayout.astro`

- [ ] All old tokens removed: `--primary-800`, `--primary-600`, `--primary-300`, `--primary-100`, `--secondary-600`, `--midnight-blue`, `--grad-blue`, `--grad-pink`, `--gradient-standard`, `--note`, `--dark-gray`, `--0b0b0b`, `--box-shadow-underline`, `--font-work-sans`, `--font-inconsolata`
- [ ] Full grey scale present: `--grey-0` through `--grey-100` (13 stops including `--grey-5`)
- [ ] Full accent scale present: `--accent-0` through `--accent-100`
- [ ] Secondary scale present: `--secondary-0` through `--secondary-100`
- [ ] Tertiary scale present: `--tertiary-0` through `--tertiary-100`
- [ ] All semantic aliases defined: `--color-bg`, `--color-surface`, `--color-text`, etc.
- [ ] `--font-heading` and `--font-body` tokens defined
- [ ] `fonts.css` exists with `@font-face` declarations for PP Paloma + PP Neue Montreal
- [ ] `fonts.css` imported in `BaseLayout.astro`
- [ ] No hardcoded hex values remain in `global.css` except within the token definitions themselves
- [ ] `npm run build` passes with zero errors
- [ ] Site renders on mobile 375px — no broken layout, text is readable

**Font file caveat:** If font files are not yet available, confirm system fallbacks are set correctly and this phase is marked "partial — pending font files."

---

### Phase 2 — Core Components (Button + TagBadge)

Read: `src/components/Button.astro`, `src/components/TagBadge.astro`, `src/styles/global.css`

- [ ] `Button.astro` exists with `variant` prop (`primary` | `outline` | `ghost`)
- [ ] `Button.astro` renders as `<a>` when `href` is provided, `<button>` otherwise
- [ ] All three button variants have correct colours per PRD
- [ ] Dark background variants work (`.dark-bg .btn--*` overrides)
- [ ] Minimum height `44px` on all button sizes (touch targets)
- [ ] `TagBadge.astro` exists, renders correctly
- [ ] All existing `.link-large` usages replaced with `<Button>`
- [ ] No ad-hoc button styling left in any component or layout file
- [ ] Buttons are keyboard-accessible (focus state visible)

---

### Phase 3 — Grid System

Read: `src/styles/global.css` (grid section), `src/components/GridOverlay.astro`, `src/layouts/BaseLayout.astro`

- [ ] Grid tokens defined: `--grid-cols`, `--grid-total`, `--grid-gutter`, `--grid-margin`
- [ ] `.grid` class uses mobile-first approach: `display: block` at base, `display: grid` at `min-width: 768px`
- [ ] All `.col-*` placement utilities only apply at `min-width: 768px`
- [ ] `GridOverlay.astro` exists and is added to `BaseLayout.astro`
- [ ] Grid lines visible on all pages at desktop
- [ ] Grid lines not visible on mobile (hidden below 768px)
- [ ] Grid overlay is `position: fixed`, `pointer-events: none`, `z-index: 0`
- [ ] Grid overlay does not block any interactive elements (verify by clicking buttons/links)
- [ ] No horizontal scroll at any viewport width
- [ ] `.has-canvas-hero` class changes grid line colour correctly (verify on homepage hero)

---

### Phase 4 — ThreeJS Integration

Read: `src/components/ThreeBackground.astro`, `src/pages/index.astro`

- [ ] Cloud layer PNGs exist at `public/images/cloud_layer/0.png` through `3.png`
- [ ] Original `threejsbackground/index.html` is **unchanged** (only the component is new)
- [ ] GLSL shader code is verbatim (no modifications)
- [ ] Asset paths in component point to `/images/cloud_layer/` not `../cloud_layer/`
- [ ] Controls panel is wrapped in dev-only guard — not visible in production
- [ ] `prefers-reduced-motion` check present — animation pauses after first frame if reduced motion
- [ ] Mobile fallback present — canvas disabled or quality reduced on small screens
- [ ] `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))` set
- [ ] Canvas has `aria-hidden="true"` and `role="presentation"`
- [ ] Canvas does not cause horizontal scroll
- [ ] Canvas does not intercept touch/scroll events on mobile (page still scrolls normally)
- [ ] Hero section: `position: relative`, canvas: `position: absolute; inset: 0`
- [ ] Hero text is visible and readable over the canvas

---

### Phase 5 — Nav

Read: `src/components/Header.astro`, `src/components/Navigation.astro`, `src/scripts/menu.js`, `src/styles/global.css`

- [ ] Nav is a dark pill shape (`border-radius: 999px`, `background: var(--color-dark-bg)`)
- [ ] Nav is centred horizontally (`left: 50%`, `transform: translateX(-50%)`)
- [ ] Nav text is always `--grey-0` (white) — visible on both canvas and opaque backgrounds
- [ ] On homepage: nav is transparent over hero, gains bg colour after 80px scroll
- [ ] On all other pages: nav is always opaque
- [ ] `data-page="home"` attribute is set on homepage body
- [ ] Mobile: pill does not overflow viewport (max-width: `calc(100% - 2rem)`)
- [ ] Mobile hamburger: minimum 44×44px tap target
- [ ] Mobile menu: keyboard-accessible, Escape key closes it
- [ ] Mobile menu: body scroll locked when menu open (but no iOS Safari layout shift)
- [ ] Verify on all pages: case study, project, about, home

---

### Phase 6 — Homepage Cards

Read: `src/components/Workitem.astro`, `src/components/WorkitemProject.astro`, `src/pages/index.astro`

- [ ] `Workitem` uses `<TagBadge>` and `<Button>` components (not ad-hoc styles)
- [ ] Case number (`01.`, `02.` etc.) displayed via `.case-number` class, driven by `order` prop
- [ ] Accent circle present, driven by `--workitem-accent` CSS custom property
- [ ] Accent circle container has `overflow: hidden` or circle is hidden on mobile
- [ ] **Mobile:** Text stacks above image, full width
- [ ] **Mobile:** No horizontal scroll from accent circle
- [ ] **Desktop:** Text left, image right, side-by-side
- [ ] All case studies render with correct accent colours
- [ ] `accentColor` field added to all case study MDX frontmatter

---

### Phase 7 — Case Study Headers

Read: `src/layouts/CaseStudyLayout.astro`, `src/layouts/ProjectLayout.astro`, `src/styles/global.css`

- [ ] Default `.hero-casestudy` is dark grey (`--color-dark-bg`)
- [ ] All new flat palette classes present (`.slate`, `.sage`, `.rust`, `.sand`, `.indigo`, `.midnight`, `.accent`)
- [ ] Legacy gradient classes preserved (`.kepla`, `.aurora`, `.pelorus`, `.sitesmart`)
- [ ] Each palette class sets `--cs-text` and `--cs-accent` custom properties
- [ ] Case study hero text uses `--cs-text` (adapts to bg colour)
- [ ] `<Button>` used for project link (not `.link-large`)
- [ ] Hero layout is grid-based
- [ ] **Mobile:** Hero text readable, not clipped
- [ ] **Mobile:** Hero image scales correctly
- [ ] All 4 case studies and 6 project pages render without errors

---

### Phase 8 — Case Study Content

Read: `src/pages/case-study/*.mdx`, `src/styles/global.css`

- [ ] Prose sections use `.col-narrow` or `.col-centered` — readable line length on desktop
- [ ] Full-width images use `.col-full`
- [ ] Side-by-side images use `.col-left` + `.col-right`
- [ ] **Mobile:** Images stack to full width
- [ ] **Mobile:** Text is full width with no overflow
- [ ] `.content-case-study` max-width removed — grid handles constraint
- [ ] No content is clipped or overflows at any viewport

---

### Phase 9 — Footer + Cleanup

Read: `src/components/Footer.astro`, `src/styles/global.css`

- [ ] Footer uses `--color-text-strong` and `--font-heading`/`--font-body` tokens
- [ ] No hardcoded hex values remain anywhere in `global.css`
- [ ] No remaining `--midnight-blue`, `--primary-*` references
- [ ] `npm run build` passes with zero errors or warnings

---

### Phase 10 — QA

- [ ] All pages tested at 375px (mobile), 768px (tablet), 1280px (desktop), 1600px (wide)
- [ ] No horizontal scroll at any viewport
- [ ] All interactive elements have visible focus states
- [ ] All text passes WCAG AA contrast (4.5:1 for body, 3:1 for large text)
- [ ] ThreeJS canvas does not run on mobile (or runs with reduced quality)
- [ ] `npm run build` — zero errors
- [ ] Run `/astro` — zero critical or warning issues
- [ ] Run `/mobile-review` on `global.css` — zero critical issues
- [ ] Run `/styleguide` — updated living styleguide generated

---

## Output format

For the specified phase, list each checklist item as:
- `✓` — confirmed passing
- `✗` — failing (add a one-line explanation)
- `?` — can't verify (file not readable or behaviour requires browser)

End with:
```
Phase X gate: PASS / FAIL / PARTIAL
Blockers: [list any ✗ items that must be fixed before proceeding]
Next phase: [safe to start / wait for blockers to be resolved]
```

---

## Rules

- Read the files — never mark something ✓ without checking the actual code
- A phase is PASS only if there are zero blockers
- "It works on desktop" is not sufficient — mobile must also pass
- If font files are missing, Phase 1 is PARTIAL (not FAIL) — document which items are pending

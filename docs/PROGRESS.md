# Portfolio 2026 — Progress Log

> This is the running memory of the project. Update after every session. Read at the start of every session before doing anything.

---

## Current status

**Phase:** Pre-redesign complete — ready to begin Phase 1 (Design Tokens & Typography)
**Last updated:** 2026-04-04

---

## Session log

### 2026-04-04 — Project setup & pre-flight

#### Completed

- [x] Reviewed full project structure and codebase
- [x] Created `CLAUDE.md` (project root) — full spec covering stack, coding standards, design tokens, grid, components, case study colours, skills table, behavioural rules, progress log rules
- [x] Created `docs/REDESIGN_PRD.md` v1.1 — full redesign spec with colour scales, typography, grid, ThreeJS integration, 10 implementation phases, component specs
- [x] **Bug fix:** Removed invalid named `{ Sidebar }` import from `src/layouts/CaseStudyLayout.astro` (Astro components have no named exports)
- [x] **Bug fix:** Fixed duplicate `class` prop on `<Image>` in `src/layouts/ProjectLayout.astro` (only last value applied — was silently broken)
- [x] **Bug fix:** Fixed `{metaTitle}` silently ignored in `BaseLayout.astro` — `<title>` was using `{title}` only
- [x] **Bug fix:** Removed duplicate `<link rel="icon">` in `BaseLayout.astro`
- [x] **Cleanup:** Removed unused `Workitem` import and two `import.meta.glob` calls from `src/components/Navigation.astro`
- [x] Removed `@fontsource-variable/work-sans` and `@fontsource-variable/inconsolata` from `package.json` (replacing with PP fonts in Phase 1)
- [x] Added `@astrojs/check` + `typescript` as devDependencies; added `npm run check` script
- [x] Added OG meta tags to `BaseLayout.astro`
- [x] Added skip-to-content link (`<a class="skip-link">`) to `BaseLayout.astro` + styles in `global.css`
- [x] Removed redundant `outDir: 'dist'` from `astro.config.mjs`; added `site` TODO comment
- [x] Created `_drafts/` folder; moved `src/altCaseStudy/` and `src/case-study-save-170825/` out of the build
- [x] Created 8 project-level skills: `astro`, `content-review`, `mobile-review`, `phase-gate`, `ui-consistency`, `component-plan`, plus global `feature-scope`, `styleguide`
- [x] Confirmed git is initialised and synced to remote repo
- [x] Created `docs/PROGRESS.md` (this file)

#### Decisions made

- **ThreeJS approach:** `ThreeBackground.astro` will be a thin wrapper that copies JS verbatim from `threejsbackground/index.html`. No shader/pipeline rewrites. Only changes allowed: asset paths, dev-only guard, `prefers-reduced-motion`, mobile fallback (canvas disabled below 768px).
- **Font sourcing:** PP Paloma and PP Neue Montreal font files are available. Phase 1 can proceed with full fonts (no system-font fallback phase needed).
- **Case study colours:** Default dark grey (#343230) and light grey (#f2f2f2) are kept. 8 new flat palette options added. Legacy gradients preserved. `bgClass` prop unchanged.
- **Phase order rationale:** Buttons (Phase 2) before Grid (Phase 3) — Button used by all subsequent phases. ThreeJS (Phase 4) before Nav (Phase 5) — nav transparency requires canvas to test.
- **About page:** Currently unreachable (not linked in nav, commented out in footer). File exists at `src/pages/about.astro` with placeholder content. No action needed yet.
- **Skip-link tokens:** Currently uses old tokens (`--midnight-blue`, `--font-work-sans`, `--white`). Will be fixed in Phase 1 when token rewrite happens.

#### Problems encountered

- Build warning: `[@astrojs/sitemap] The Sitemap integration requires the site astro.config option` — expected, pending real production domain.
- Astro static image limitation: hero images must be registered identically in both `CaseStudyLayout.astro` AND `index.astro`. Documented in CLAUDE.md and the `astro` skill.

#### Left incomplete

- **Production domain** not set — `astro.config.mjs` has TODO comment. Set `site:` when domain is confirmed.
- `@fontsource-variable` packages removed from `package.json` but `npm install` not yet run to clean `node_modules`.

---

## Phase checklist

### Phase 1 — Design Tokens & Typography [x] IN PROGRESS
- [x] Create `src/styles/fonts.css` with `@font-face` declarations for PP Paloma and PP Neue Montreal
- [x] Import `fonts.css` into `global.css` via `@import`
- [x] Rewrite token block in `global.css` — full grey scale, accent, secondary, tertiary, semantic aliases
- [x] Replace old token names throughout `global.css` (find/replace pass)
- [x] Update skip-link styles to use new tokens
- [x] Set `font-family` base to PP Neue Montreal (`--font-body`)
- [x] Apply PP Paloma to headings (`--font-heading`)
- [x] Add new flat bgClass palette entries (slate, sage, rust, sand, indigo, midnight, accent)
- [ ] `/mobile-review` pass
- [ ] `/phase-gate phase-1` check — must PASS before Phase 2

#### Phase 1 notes
- PP Paloma has no Bold weight — mapped Heavy (`PPPaloma-Heavy.woff2`) to `font-weight: 700`
- Font files are in `src/assets/fonts/` (not `public/fonts/` as PRD specified); `fonts.css` uses relative paths — Vite processes these correctly
- `--white` replaced with `var(--grey-0)`; `--midnight-blue` replaced with `var(--color-text-strong)`
- Legacy gradient bgClasses (kepla, pelorus, aurora, npdc, sitesmart) preserved unchanged
- `html` background updated to `var(--color-bg)` (#f2f2f2)

### Phase 2 — Button & TagBadge Components [x] COMPLETE
- [x] Audit all existing button/link patterns (`.link-large`, ad-hoc CTAs)
- [x] Build `Button.astro` (primary / outline / ghost, min-height 44px)
- [x] Build `TagBadge.astro` (default / accent variants)
- [x] Add `.case-number` CSS class
- [x] Replace `.link-large` in `CaseStudyLayout.astro` and `ProjectLayout.astro` with `<Button>`
- [x] `/phase-gate phase-2` — PASS

### Phase 3 — Grid System [x] COMPLETE
- [x] Add `--grid-gutter` + `--grid-margin` tokens to `:root`
- [x] Add `.grid` class — mobile-first (`display: block` base, `display: grid` at 768px)
- [x] Add all `.col-*` placement utilities (desktop-only, inside `min-width: 768px`)
- [x] Add `.grid-lines` + `.has-canvas-hero` overlay CSS
- [x] Add `.grid-bracket` corner mark CSS
- [x] Create `GridOverlay.astro` — 8 `<span>` columns, `aria-hidden`
- [x] Add `GridOverlay` to `BaseLayout.astro`
- [x] `/phase-gate phase-3` — PASS

#### Phase 3 notes
- Applying `.grid` to page content (homepage cards, case study body) is deferred to Phases 6–8 where those components are redesigned — avoids breaking existing content structure prematurely
- Grid lines hidden on mobile (`display: none` base, shown at 768px) — no horizontal scroll risk
- `has-canvas-hero` on a parent element switches grid lines to dark colour (for ThreeJS hero)

### Phase 4 — ThreeJS Integration [x] COMPLETE
- [x] `npm install three@0.134.0` — installed
- [x] Copy cloud layer PNGs → `public/images/cloud_layer/0-3.png`
- [x] Create `ThreeBackground.astro` — ported from `index.html`; dev controls stripped
- [x] Add mobile fallback (canvas hidden below 768px, `--color-dark-bg` solid fallback)
- [x] Add `prefers-reduced-motion` fallback (loop skipped, canvas hidden via CSS)
- [x] Dev-only controls stripped entirely — dev env (`threejsbackground/index.html`) remains source of truth
- [x] Created `IndexLayout.astro` inheriting `BaseLayout` — owns hero section structure
- [x] Add `ThreeBackground` to `IndexLayout.astro` homepage hero
- [x] Updated `index.astro` to use `IndexLayout` with named `hero` slot
- [ ] `/phase-gate phase-4`

#### Phase 4 notes
- CDN approach used (not npm `three` import) — dynamic script injection guarantees load order
- Canvas sizing reads from `canvas.parentElement` dimensions, not `window`, so it fills the hero section not the viewport
- `threejsbackground/index.html` is untouched (source of truth for shader tweaks)

### Phase 5 — Navigation [ ] NOT STARTED
- [ ] Dark pill nav, centred, transparent over ThreeJS hero
- [ ] Mobile nav (hamburger/drawer)
- [ ] Keyboard accessible
- [ ] `/mobile-review` + `/phase-gate phase-5`

### Phases 6–10 [ ] NOT STARTED
See `docs/REDESIGN_PRD.md` for full phase breakdown.

---

## PRD deviations

_None yet. Log any changes from the spec here with date and reason._

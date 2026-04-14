# Portfolio 2026 — Progress Log

> This is the running memory of the project. Update after every session. Read at the start of every session before doing anything.

---

## Current status

**Phase:** Phase 7 complete. Phase 8 not started.
**Last updated:** 2026-04-14

---

## Session log

### 2026-04-14 — Homepage case-study mobile image order update

#### Completed

- [x] Updated case-study card markup to split content into `workitem-text--head` (number/badge/title) and `workitem-text--body` (description/CTA)
- [x] Moved case-study card image block between the head and body blocks so mobile flow renders image below title
- [x] Added mobile-first spacing and desktop grid-row rules to preserve existing desktop two-column card layout
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Applied the image-order change to case-study cards only; project-card markup and flow were left unchanged.

### 2026-04-14 — Mobile homepage card wrapper span fix (confirmed)

#### Completed

- [x] Set homepage list wrappers `.list-workitems` and `.list-workitems-grid` to `grid-column: 1 / -1` so case study and project cards span full grid width on mobile
- [x] Verified successful production build (`npm run build`)
- [x] Confirmed visually by user (“fixed”)

#### Decisions made

- Root cause was list wrappers not explicitly spanning full mobile grid width, which constrained cards despite child card width rules.

### 2026-04-14 — Mobile card spacing leak fix

#### Completed

- [x] Added `.workitem-container` override to remove global `li` top padding leakage on homepage cards
- [x] Added `.workitem-img` margin reset to prevent global `img` margin from creating broken spacing within cards
- [x] Kept both case study and project cards full grid width on mobile
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Applied targeted card-level overrides rather than changing global `li`/`img` defaults to avoid unintended regressions in MDX/content pages.

### 2026-04-14 — Mobile card width reset (case studies + projects)

#### Completed

- [x] Removed mobile project-card 2-column image constraint so project cards render full grid width on mobile
- [x] Kept case study cards at full grid width on mobile with no extra side inset
- [x] Cleaned the project-card CSS block to remove conflicting mobile overrides
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Prioritized a consistent full-grid-width mobile card layout for both case studies and projects.

### 2026-04-14 — Mobile project card width fix (follow-up)

#### Completed

- [x] Replaced mobile project image `max-width` approach with explicit 4-column grid placement inside project card content
- [x] Set mobile project image wrapper to `grid-column: 1 / 3` (2 columns) while keeping title/description/CTA full-width (`1 / 5`)
- [x] Preserved desktop project card behavior by restoring flex column layout at `min-width: 768px`
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Switched to explicit grid-column placement for mobile project cards because width-only constraints were not producing the intended layout.

### 2026-04-14 — Mobile homepage full-grid width update

#### Completed

- [x] Removed extra homepage card side inset so case-study and project cards use full grid width on mobile (`.workitem` margins set to `0`)
- [x] Updated mobile footer horizontal padding to use `--grid-margin` for full grid-width alignment
- [x] Updated mobile project card image area to max `50%` width (2 of 4 mobile grid columns equivalent) while keeping each project card full-width
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Interpreted “full width generally” as full grid width (not edge-to-edge viewport), so spacing follows existing grid margin tokens.
- Limited the project image width constraint to mobile only; desktop project cards continue to use full image width.

### 2026-04-14 — Projects heading margin refinement

#### Completed

- [x] Updated homepage `#projects` heading spacing to exact `64px` top margin and `48px` bottom margin in `src/styles/global.css`
- [x] Removed breakpoint-specific `#projects` margin overrides so spacing remains consistent across viewport sizes
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Applied the exact pixel values requested for both mobile and desktop to keep section spacing consistent.

### 2026-04-14 — Homepage section heading display style

#### Completed

- [x] Updated homepage section headings (`Case studies`, `Projects`) to use dedicated display-title class in `src/pages/index.astro`
- [x] Added scoped `.home-section-title` styles in `src/styles/global.css` using display font, centered alignment, and responsive sizing (`2.25rem` mobile, `4rem` desktop)
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Kept scope strictly to homepage section headers only; case study/project detail hero titles were not changed.
- Implemented desktop target size as `4rem` (64px) at `min-width: 768px` with a smaller mobile size for readability.

### 2026-04-14 — Homepage card horizontal margin tweak

#### Completed

- [x] Added `8px` left and right margin to homepage cards via `.workitem` style update
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Applied margin at the shared card link level (`.workitem`) so both case-study and project cards receive the same side inset.

### 2026-04-14 — Homepage work item lists aligned to main grid

#### Completed

- [x] Removed extra homepage content wrapper in `IndexLayout.astro` so homepage section children can participate directly in the section-level `.grid`
- [x] Updated homepage section headings to explicit grid items (`.col-full`)
- [x] Refactored `.list-workitems` and `.list-workitems-grid` to stop defining independent nested grid templates
- [x] Updated desktop list behavior to flow list items through the main grid (`display: contents` on list wrappers at desktop)
- [x] Kept project cards at 3-up desktop placement via `grid-column: span 2` on `.workitem-container--project`
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Prioritized single-source grid alignment over duplicate nested grid definitions to prevent future drift from `.grid` and `GridOverlay` structure.
- Preserved existing homepage visual rhythm with per-item bottom spacing while switching placement control to the main grid.

### 2026-04-14 — Project card tag removal

#### Completed

- [x] Removed the `Project` TagBadge from homepage project cards (`WorkitemProject.astro`)
- [x] Removed now-unused `TagBadge` import from project card component

#### Decisions made

- Kept the project card hierarchy focused on title, image, description, and CTA only to reduce visual density.

### 2026-04-14 — Homepage + project card alignment follow-ups

#### Completed

- [x] Restored homepage section alignment after article column update by switching homepage wrappers in `IndexLayout.astro` to full-span grid utility (`.col-full`)
- [x] Updated project card content flow so project images render directly below project titles
- [x] Updated project card CSS to support the new image placement while keeping CTA pinned to the bottom of the card text block
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Kept article-specific 4-column text rule intact and resolved homepage regression with layout-specific wrapper classes instead of broad CSS rollback.
- Chose image-under-title ordering for project cards to reduce perceived row misalignment when project titles wrap to different heights.

### 2026-04-14 — Footer text style implementation

#### Completed

- [x] Updated footer brand area to include hero-inspired Jamie Barter display styling at smaller scale
- [x] Added subtitle text below the footer brand title using homepage hero subtitle copy
- [x] Added contact links in footer brand block (email + LinkedIn)
- [x] Updated footer section heading typography (`Case studies`, `Projects`) to dedicated token-based style
- [x] Updated footer link and contact text colors to token-based values (removed hardcoded rgba in touched text selectors)
- [x] Added `--color-text-muted-on-dark` semantic token for muted text on dark surfaces
- [x] Added `Contact Me` heading above footer contact links
- [x] Added shared `.footer-link` style for both contact links and footer list links (accent underline on hover/focus)
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Scoped this pass to text styling and content only; no footer layout/grid/fade behavior changes included.
- Kept existing footer content list generation logic unchanged (still sourced from MDX frontmatter via `import.meta.glob`).

### 2026-04-14 — Footer layout + hero fade bridge

#### Completed

- [x] Updated footer structure to explicit desktop column hooks: brand/contact, case studies, projects
- [x] Implemented desktop footer alignment to 3 columns where each section spans 2 of 6 grid columns
- [x] Added desktop-only top margin above footer (`64px`)
- [x] Added all-page footer fallback top gradient transition to avoid abrupt dark-edge appearance
- [x] Extended homepage `ThreeBackground` scroll logic to sync footer fade-in progress with hero canvas fade-out (no shader edits)
- [x] Added global body hook class in `BaseLayout.astro` for footer fallback transition targeting
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Implemented homepage footer transition by updating CSS custom property `--footer-hero-fade-progress` from existing scroll listener rather than modifying shader code.
- Kept fallback transition CSS-only on non-home pages using a top gradient layer so behavior remains lightweight without canvas dependencies.

### 2026-04-14 — Bottom canvas visibility fix

#### Completed

- [x] Updated homepage scroll effect so canvas opacity now has a second reveal phase as footer enters viewport
- [x] Added homepage body hook class (`home-canvas-active`) from `ThreeBackground.astro` for targeted footer-canvas blending styles
- [x] Updated homepage footer background to translucent dark on desktop so canvas is visible behind footer at page bottom
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Kept shader pipeline untouched; fixed visibility entirely through scroll opacity math and CSS layer transparency.
- Scoped translucent footer blend to desktop (`min-width: 768px`) to avoid mobile readability/performance side effects.

### 2026-04-14 — Footer edge cleanup (no gradient/no top line)

#### Completed

- [x] Removed footer top border line
- [x] Removed footer top gradient pseudo-layer used for transition blending
- [x] Removed desktop footer top gap so footer starts immediately (`margin: 0 auto`) and grid continuity reads to the bottom
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Prioritized continuous grid read to page bottom over blended top-edge transition effect.

### 2026-04-14 — Footer background removed

#### Completed

- [x] Removed footer background fill (set footer background to transparent)
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Kept footer text in dark token colors so readability remains intact over the visible page/canvas background.

### 2026-04-14 — Footer text switched to all dark

#### Completed

- [x] Updated footer subtitle color to dark text token
- [x] Updated footer link color (contact + list links) to dark text token
- [x] Updated footer section-title color to dark text token
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Applied a consistent dark-text treatment across all footer typography for visual uniformity.

### 2026-04-14 — Footer link spacing tightened

#### Completed

- [x] Reduced vertical gap between footer link items (`.footer-links ul`) from `0.75rem` to `0.4rem`
- [x] Verified successful production build (`npm run build`)

### 2026-04-14 — Footer dense-link + spacing/type tweaks

#### Completed

- [x] Removed vertical gap between footer list items (`.footer-links ul` gap set to `0`)
- [x] Set footer link item height to `32px` (`.footer-link-item` and `.footer-contact-link` min-height)
- [x] Added `48px` spacing from footer description to `Contact Me` in column 1
- [x] Updated footer subheaders to use heading font family (`var(--font-heading)`)
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Applied a denser footer link rhythm as requested, accepting smaller-than-44px touch targets for this visual direction.

### 2026-04-14 — Footer name moved to top row

#### Completed

- [x] Moved footer name/logo into its own dedicated row above the 3 footer columns
- [x] Updated desktop footer grid to 2-row structure (row 1 name, row 2 content columns)
- [x] Expanded name row width on desktop to span columns `1 / 5`
- [x] Kept existing 3-column second-row structure: col 1 subtitle/contact, col 2 case studies, col 3 projects
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Added `row-gap: 1.5rem` in desktop footer grid to clearly separate the standalone name row from the content row.

### 2026-04-14 — Article desktop grid structure update

#### Completed

- [x] Updated desktop case study/project article body text width to 4 columns (left aligned)
- [x] Updated article image behavior so body images can span full 6-column width while `.img-half` remains 3 columns
- [x] Kept case study/project hero content at full 6-column width on desktop via targeted hero override
- [x] Adjusted layering so page content renders above grid lines
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Applied hero width as a targeted override (`.hero-content-casestudy.col-content`, `.hero-content-project.col-content`) so article heroes remain full-width while article body text stays at 4 columns.
- Kept mobile behavior unchanged by scoping the new structure to desktop breakpoint rules.

### 2026-04-14 — Backlog structure update

#### Completed

- [x] Added separate backlog categories for future feature work and content production
- [x] Added backlog items for internal tools/personal projects section and writing new case studies

#### Decisions made

- Future feature ideas and content writing tasks are tracked separately in `docs/PROGRESS.md` to keep implementation work distinct from editorial pipeline tasks.

### 2026-04-14 — Homepage case study spacing tweak

#### Completed

- [x] Reduced homepage case study card top/bottom padding to 24px (`1.5rem`) across mobile and desktop breakpoints

#### Decisions made

- Kept the change scoped to `.workitem` padding in `global.css` to avoid affecting project-card-specific layout logic.

### 2026-04-14 — Nav constrained to grid area

#### Completed

- [x] Updated fixed top nav width to fit within grid content bounds using `--grid-margin`
- [x] Updated mobile nav dropdown panel width to match the same grid bounds

#### Decisions made

- Applied grid-bound sizing to both nav layers to keep horizontal alignment consistent across desktop and mobile.

### 2026-04-14 — Nav logo hover state match

#### Completed

- [x] Updated header logo hover/focus state to use the same pill background treatment as nav links
- [x] Scoped logo hover treatment to `nav .logo` so footer logo styling remains unaffected

#### Decisions made

- Matched mobile and desktop hover opacities to existing nav link behavior for visual consistency.

### 2026-04-14 — Nav edge spacing balance

#### Completed

- [x] Updated desktop nav container padding to symmetric horizontal insets so hovered logo and right nav links have matching outer gaps

#### Decisions made

- Kept hover styles unchanged; only container spacing was adjusted.

### 2026-04-14 — Homepage card updates (no accent circles)

#### Completed

- [x] Removed accent-circle direction from homepage cards
- [x] Removed `accentColor` prop usage from homepage card rendering flow
- [x] Updated `Workitem.astro` to keep non-Button CTA pattern and simplified card structure
- [x] Updated `WorkitemProject.astro` to match simplified non-Button card pattern
- [x] Updated homepage card list layout to final grid rule: case studies full-width, projects 3-up on desktop
- [x] Updated card image rendering to optimized `astro:assets` image path only (removed raw `<img>` fallback in card components)
- [x] Verified successful production build (`npm run build`)
- [x] Updated homepage grid alignment: case studies full-width, projects in 3 desktop columns with each project card spanning 2 of 6 grid columns
- [x] Completed mobile review for homepage cards/grid behavior (single-column on mobile, no accent-circle overflow risk)
- [x] Completed Phase 7 gate check against current source-of-truth checklist

#### Decisions made

- Accent circles are removed from card design
- No Button component is used for homepage card CTAs in this phase
- Homepage alignment rule: case studies render full-width; projects render as three cards per row on desktop and single-column on mobile

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

### Phase 1 — Design Tokens & Typography [x] COMPLETE
- [x] Create `src/styles/fonts.css` with `@font-face` declarations for PP Paloma and PP Neue Montreal
- [x] Import `fonts.css` into `global.css` via `@import`
- [x] Rewrite token block in `global.css` — full grey scale, accent, secondary, tertiary, semantic aliases
- [x] Replace old token names throughout `global.css` (find/replace pass)
- [x] Update skip-link styles to use new tokens
- [x] Set `font-family` base to PP Neue Montreal (`--font-body`)
- [x] Apply PP Paloma to headings (`--font-heading`)
- [x] Add new flat bgClass palette entries (slate, sage, rust, sand, indigo, midnight, accent)
- [x] `/mobile-review` pass
- [x] `/phase-gate phase-1` check — PASS

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
- [x] `/phase-gate phase-4` — PASS

#### Phase 4 notes
- CDN approach used (not npm `three` import) — dynamic script injection guarantees load order
- Canvas sizing reads from `canvas.parentElement` dimensions, not `window`, so it fills the hero section not the viewport
- `threejsbackground/index.html` is untouched (source of truth for shader tweaks)

### Phase 5 — Navigation [x] COMPLETE
- [x] Dark pill nav, centred, transparent over ThreeJS hero
- [x] Mobile nav (hamburger/drawer)
- [x] Keyboard accessible
- [x] `/mobile-review` + `/phase-gate phase-5` — PASS

### Phase 6 — Grid System Rebuild & Homepage Layout [x] COMPLETE

#### Session 2026-04-09 — Grid Refactor, Line Sync & Refinements

**Completed:**
- [x] **Simplified Grid Architecture:** Refactored main `.grid` to a 0-gap, centered 6-column structure (Desktop) and 4-column (Mobile). Removed complex `minmax()` margin columns in favor of container padding + `margin: auto`.
- [x] **Synchronized Visual Overlay:** Updated `GridOverlay.astro` to render exactly 7 lines (edges of the 6 columns). Refined `sync-grid-overlay.js` to ensure the overlay stays pixel-perfect with the content container regardless of scrollbar presence.
- [x] **ThreeJS Background Update:** Modified the shader in `ThreeBackground.astro` to draw exactly 7 vertical boundaries, ensuring the background animation aligns perfectly with the layout grid.
- [x] **Case Study Hero Refinement:** Aligned case study hero content flush with the first grid line by removing horizontal padding and moving metadata into the grid flow.
- [x] **Visual Cleanup:** Removed the legacy orange background circles from case study sections to simplify the aesthetic and focus on the grid-based layout.
- [x] **Mobile Grid Implementation:** Established a 4-column mobile grid with synchronized line overlay.

**Decisions made:**
- **0-Gap Grid:** Removed internal gutters entirely. This simplifies alignment math and creates a "tighter" technical aesthetic where content anchors directly to shared lines.
- **7-Line Overlay:** Switched from 8 columns to 6 columns + 2 margins (represented by the edge lines), totaling 7 lines.
- **Removed Decorative Circles:** The orange background circles were deemed redundant with the new minimal, grid-focused design system.

**Problems encountered & resolved:**
- **ThreeJS Sync:** The background shader was previously out of sync with the DOM grid. Resolved by updating the line count and spacing logic in the GLSL/JS wrapper.
- **Mobile Alignment:** Mobile users were seeing grid lines that didn't match the content. Implemented a 4-column overlay for mobile breakpoints.

**Left incomplete:**
- Homepage card visual redesign (Phase 7 focus).

#### Phase 6 checklist — Grid System Rebuild & Foundation [x] COMPLETE

#### Session 2026-04-06 — Grid system rebuild & JavaScript sync

**Completed:**
- [x] **Identified root cause of grid misalignment:** `--grid-margin: minmax(1rem, 1fr)` margin columns computed differently for fixed vs. normal-flow elements (scrollbar width, layout context differences)
- [x] **Rebuilt grid system:** Replaced 4-breakpoint fixed-px approach (16/24/32/48px) with consistent single rule + per-breakpoint overrides. Both `.grid` and `.grid-lines` now use identical `grid-template-columns` at each breakpoint.
- [x] **Removed padding mirrors:** Deleted manual padding rules from `.hero-content-home` and `.content-home` — elements now placed as grid children with `.col-content` placement
- [x] **Updated all layouts:** Added `.grid` class to hero sections and content sections in `IndexLayout.astro`, `CaseStudyLayout.astro`, `ProjectLayout.astro`
- [x] **Removed redundant CSS:** Deleted `.content-case-study > *` child-selector column overrides (not needed with col utilities on elements)
- [x] **Implemented JavaScript grid sync:** Created `src/scripts/sync-grid-overlay.js` to measure actual `.grid` position and sync `.grid-lines` left/width, eliminating visual offset
- [x] **Integrated sync script:** Added import to `BaseLayout.astro` to run on load, resize, and scroll

**Decisions made:**
- **JavaScript sync over CSS:** Fixed-positioned overlays can't reliably sync with normal-flow grids due to viewport vs. layout-context width differences. JS measurement + positioning provides pixel-perfect alignment across all pages.
- **Single grid rule:** Moved away from flexible `minmax()` margins to fixed pixels (16/24/32/48px) at breakpoints — guarantees identical column widths for fixed and normal elements

**Problems encountered & resolved:**
- Hero and main grid were offset because fixed `.grid-lines` used `left: 50%; transform: translateX(-50%)` while normal `.grid` used `margin: 0 auto` — different centering models produced different results
- Solution: JS measures actual grid position and applies it to overlay

**Left incomplete:**
- `/mobile-review` pass on new grid structure
- `/phase-gate phase-6` check (grid foundation gate)
- Homepage card redesign (Workitem/WorkitemProject visual update) — deferred to Phase 7

#### Phase 6 checklist — Grid System Rebuild & Foundation

**Grid foundation (foundation gate):**
- [x] Rebuild `.grid` CSS — single rule with pixel margins at breakpoints (16/24/32/48px)
- [x] Rebuild `.grid-lines` with identical columns and gap as `.grid`
- [x] Remove `minmax(1rem, 1fr)` margin columns (caused fixed vs. normal flow misalignment)
- [x] Consolidate col utilities to single `@media (min-width: 768px)` block
- [x] Remove `.content-case-study > *` child-selector overrides
- [x] Remove padding mirror rules from `.hero-content-home` and `.content-home`
- [x] Create `src/scripts/sync-grid-overlay.js` — JS syncs fixed overlay with normal-flow grid position
- [x] Integrate sync script into `BaseLayout.astro`
- [x] Apply `.grid` class to `section.hero` in `IndexLayout.astro`
- [x] Apply `.grid` class to `section.hero` in `CaseStudyLayout.astro` and `ProjectLayout.astro`
- [x] Apply `.col-content` to hero content divs
- [x] Apply `.col-content` to body content wrapper divs

**Next steps (deferred to Phase 7):**
- [x] `/mobile-review` pass on grid alignment at 375px, 768px, 1024px, 1400px+
- [x] `/phase-gate phase-6` — PASS

#### Phase 6 notes
- Grid now used on all page sections: hero, homepage content, case study hero, case study body, project pages
- Grid-lines overlay now syncs via JS, stays in sync during resize/scroll
- Grid spans remain consistent: `col-content` = columns 2/8 (6 content columns) across all breakpoints
- Fixed-positioned overlay synced via `getBoundingClientRect()` + `scrollX` measurement — accounts for viewport width differences

### Phase 7 — Homepage Cards Redesign [x] COMPLETE
- [x] Update `Workitem.astro` visual design (case number, border, spacing; accent circles removed) — 2026-04-14
- [x] Update `WorkitemProject.astro` visual design (accent circles removed) — 2026-04-14
- [x] Place cards in grid (case studies full-width, projects 3-up desktop / single-column mobile) — 2026-04-14
- [x] Update card image pipeline (optimize hero images, webp conversion) — 2026-04-14
- [x] `/mobile-review` + `/phase-gate phase-7` — PASS (with approved deviations: no accent circles, no Button component in homepage cards)

### Phases 8–10 [ ] NOT STARTED
See `docs/REDESIGN_PRD.md` for full phase breakdown (case study cards, footer, misc pages, final QA).

---

## Future backlog (post-redesign)

### Feature backlog

- [ ] Add a dedicated section for internal tools / personal projects

### Content backlog

- [ ] Write new case studies

---

## PRD deviations

- **2026-04-09: Grid Architecture Refactor** — Deviated from 8-column spec (6 content + 2 margin cols) to a 0-gap 6-column centered structure. Reason: Simplifying alignment with visual overlay and ThreeJS background lines. The 0-gap approach creates a tighter, more deterministic layout where content shares single boundary lines rather than wide gutters.

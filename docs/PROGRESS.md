# Portfolio 2026 — Progress Log

> This is the running memory of the project. Update after every session. Read at the start of every session before doing anything.

---

## Current status

**Phase:** Phase 8 in progress, with Phase 9 cleanup queued next.
**Last updated:** 2026-04-15

**Active next steps:**
- Finish cleanup of legacy styles/tokens and remaining documentation sync
- Set the live site/domain config to clear the current sitemap warning
- Confirm remaining mobile/QA review items before phase sign-off
- Complete the final QA and styleguide pass

---

## Session log

### 2026-04-15 — Homepage / site grid contrast balance

#### Completed

- [x] Slightly darkened the homepage dark-mode grid overlay for better visibility over the hero
- [x] Slightly lightened the shared default grid lines on other pages for a softer background texture
- [x] Balanced both values toward a closer middle-ground contrast in [src/styles/global.css](src/styles/global.css)

#### Decisions made

- Kept the change scoped to the shared grid tokens so the overlay system stays consistent across layouts.

### 2026-04-15 — Mobile header nav animation + width stability

#### Completed

- [x] Smoothed the mobile header menu reveal so the secondary nav expands open with opacity/scale instead of popping in
- [x] Anchored the opened mobile nav panel to the same width as the main top nav pill
- [x] Matched the opened mobile dropdown background/transparency to the main nav pill, replaced infinite pill radii with height-based nav rounding, and removed the menu item top separators for a cleaner dropdown
- [x] Prevented opening-state layout shift by stabilizing the viewport scrollbar gutter and keeping the header footprint fixed
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Kept the refinement scoped to the existing header system in [src/styles/global.css](src/styles/global.css) and [src/scripts/menu.js](src/scripts/menu.js) without changing desktop nav behavior.

### 2026-04-16 — Bottom section-nav open-close animation refinement

#### Completed

- [x] Updated the bottom case-study section navigator so its expanded list has a stronger visible grow-from-the-bar animation, then sped the motion up for a snappier feel, strengthened the matching top mobile subnav reveal, and set a consistent 16px gap between each bar and its expanded panel
- [x] Tightened the visual join between the bottom bar and the expanded panel for a more unified motion
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Kept the change scoped to the existing bottom section-nav motion in [src/styles/global.css](src/styles/global.css) without changing its content structure or desktop behavior.

### 2026-04-15 — Planning / implementation / todo list sync

#### Completed

- [x] Updated the redesign PRD from an outdated planning state to the current active implementation state
- [x] Synced phase checklists with what is actually built, what is still in progress, and what remains for cleanup/QA
- [x] Added a clearer active-next-steps summary for the remaining work

#### Decisions made

- The PRD now reflects the current homepage card direction: no homepage `Case Study` tag, and the mobile card order prioritizes the image before the supporting subtitle/description.

### 2026-04-15 — Homepage case-study card mobile reorder + tag removal

#### Completed

- [x] Moved the homepage case-study card image above the subtitle on mobile
- [x] Removed the `Case Study` tag from homepage case-study cards
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Kept the desktop card layout unchanged and scoped the reorder to the mobile presentation only.

### 2026-04-15 — Homepage mobile hero spacing refinement

#### Completed

- [x] Shifted the homepage hero summary block on mobile so it begins from the second grid line using the home grid itself
- [x] Reduced the gap between the hero summary and the first `Case studies` heading on mobile by lowering hero/content spacing
- [x] Added an extra `32px` below the `Case studies` title before the card list
- [x] Moved the homepage hero title/subtitle block a further ~150px upward on mobile

#### Decisions made

- Scoped the spacing adjustments to the homepage/mobile rhythm so desktop layout stays unchanged.

### 2026-04-15 — Duplicate Overview label fix

#### Completed

- [x] Renamed the hero-area anchor from the duplicated `Overview` label to a distinct top-of-page label (`Intro` by default)
- [x] Added support for per-case-study hero anchor naming via `navOverviewLabel` frontmatter in [src/layouts/CaseStudyLayout.astro](src/layouts/CaseStudyLayout.astro)
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- The hero jump and the first content section should have distinct names so the in-page navigator is unambiguous.

### 2026-04-15 — Desktop section-nav width refinement

#### Completed

- [x] Constrained the desktop bottom section navigator to a narrower two-column-style width so it no longer stretches too broadly across the page
- [x] Kept the expanded section list aligned to the same narrower desktop footprint
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Desktop section nav should read as a compact utility control, not a full-width footer-like bar.

### 2026-04-15 — Mobile section-nav interaction refinement

#### Completed

- [x] Moved previous/next arrow controls to the left and right sides of the current section chip on mobile
- [x] Made the central `On this page` / current-section area the tap target for expanding and collapsing the section list
- [x] Added the hero overview as the first section-nav anchor so users can jump back to the top of the case study
- [x] Reduced total section-nav height by tightening padding, control size, label sizing, and content bottom spacing
- [x] Increased the glass/transparency treatment so the navigator feels lighter over content
- [x] Kept successful production build verification (`npm run build`)

#### Decisions made

- Removed the separate mobile `Sections` action in favor of making the main center label itself the expandable control.

### 2026-04-15 — Header nav selector hardening (fix section-nav interference)

#### Completed

- [x] Scoped global header navigation CSS from broad `nav` selectors to `header nav` selectors in [src/styles/global.css](src/styles/global.css) so case-study section navigator (`.section-nav`) does not inherit header nav positioning/appearance rules
- [x] Updated menu script nav lookup from `document.querySelector('nav')` to `document.querySelector('header nav')` in [src/scripts/menu.js](src/scripts/menu.js) so scroll-hide and transparent nav classes always target the real header nav
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Header nav behavior must be explicitly scoped to header context; no global element selectors for shared tags when secondary nav landmarks exist on pages.

### 2026-04-15 — Section navigator regression fix (selector namespace + bottom fallback)

#### Completed

- [x] Renamed section navigator class namespace from generic `.sidebar*` to `.section-nav*` in [src/components/Sidebar.astro](src/components/Sidebar.astro) and [src/styles/global.css](src/styles/global.css) to prevent styling collisions
- [x] Updated all client-side selectors and active-state class toggles to the new `.section-nav*` names
- [x] Added safe bottom-position fallback for navigator placement (`bottom: 1rem` + `env(..., 0px)` fallback) in [src/styles/global.css](src/styles/global.css)
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Keep section navigator styles fully namespaced to avoid any interference with existing nav/footer/layout selectors.
- Keep navigator fixed to viewport bottom with explicit fallback-first declaration for cross-browser consistency.

### 2026-04-15 — Case-study section navigator (bottom glass chip)

#### Completed

- [x] Implemented bottom-anchored case-study section navigator in [src/components/Sidebar.astro](src/components/Sidebar.astro) with current-section label, previous/next controls, and expandable full section list
- [x] Added automatic H2 anchor ID generation with duplicate-safe suffixing and fallback section IDs
- [x] Added smooth scrolling with header-aware offset, active-section tracking, and directional button disabled states
- [x] Mounted navigator on case-study pages only via [src/layouts/CaseStudyLayout.astro](src/layouts/CaseStudyLayout.astro)
- [x] Added token-based global styling and transitions for a light/glass chip UI in [src/styles/global.css](src/styles/global.css)
- [x] Added case-study content bottom padding guard when navigator is present (`.site-body.has-section-sidebar .content-case-study`) to prevent overlap
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Navigator scope is case-study pages only for v1; project pages are excluded.
- Desktop and mobile both use bottom placement.
- Visual direction is light/white glass chip.
- Section labels are truncated for concise scroller display.
- Expanded list keeps focus on toggle (no focus jump into list).

#### Deferred (v2)

- Nested H3/H4 navigation
- Auto theme switching by section background
- Reading progress bar

### 2026-04-15 — Homepage case-study card flex refactor (remove inner grid)

#### Completed

- [x] Refactored homepage case-study card markup in [src/components/Workitem.astro](src/components/Workitem.astro) to explicit left/right regions (`.workitem-left`, `.workitem-right`)
- [x] Removed dependency on inner card grid layout for case-study cards and replaced with flexbox-based left/right structure in [src/styles/global.css](src/styles/global.css)
- [x] Kept project card behavior unchanged by scoping the new layout rules to `.workitem:not(.workitem--project)`
- [x] Kept image centering container-based in the right region and retained proportional scaling
- [x] Consolidated case-study spacing control into `.workitem-left` rhythm rules for easier gap tuning
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Used a 50/50 desktop split for case-study left/right regions to align with the existing 6-column page grid without nested card-level grid complexity.

### 2026-04-15 — Homepage case-study card CTA copy update

#### Completed

- [x] Updated homepage case-study card CTA label from `Read` to `Read case study`
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Applied text change in `Workitem.astro` only so project card CTA copy remains unchanged.

### 2026-04-15 — Follow-up spacing pass (32px adjacent images + tighter hero link/image rhythm)

#### Completed

- [x] Increased adjacent half-width image gap to `32px` on desktop (`.content-case-study > .col-content > .img-adjacent`)
- [x] Reduced hero image top spacing by half for case-study and project heroes (`2rem` → `1rem`)
- [x] Reduced metadata-to-link spacing further on case-study and project heroes (`.info` bottom + `.btn` top)
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Applied spacing updates through shared hero selectors so the same behavior is guaranteed across both case-study and project layouts.

### 2026-04-15 — Case-study/project article and hero spacing refinement

#### Completed

- [x] Added desktop gap between adjacent half-width images in article content (`.content-case-study > .col-content > .img-adjacent`)
- [x] Added top margin above adjacent half-width image blocks to separate them from preceding content
- [x] Reduced spacing between hero metadata block (`.info`) and CTA button on case-study/project pages
- [x] Increased bottom padding of case-study/project hero content blocks (`.hero-content-casestudy`, `.hero-content-project`)
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Used existing layout token `--grid-gutter` for the half-width image gap (`calc(var(--grid-gutter) / 2)`) to stay aligned with grid rhythm.

### 2026-04-15 — Homepage case-study card spacing and order refinement

#### Completed

- [x] Moved case-study badge below the case-study title in homepage card header
- [x] Tightened header spacing so title and badge sit closer together
- [x] Moved case-study number closer to the title block
- [x] Center-aligned case-study card images horizontally within the image column
- [x] Slightly reduced desktop right padding of case-study text area (`2rem` to `1.5rem`)
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Scoped spacing and image-centering changes to case-study cards only (`.workitem:not(.workitem--project)`) so project card behavior remains unchanged.

### 2026-04-15 — Homepage project card sizing follow-up (12px padding, 65% image width)

#### Completed

- [x] Updated homepage project card padding from `8px` to `12px`
- [x] Updated homepage project card image wrapper width from `75%` to `65%`
- [x] Kept image alignment non-centered (left-aligned) as requested
- [x] Preserved proportional image scaling (`width: 100%; height: auto;`)
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Applied value-only CSS changes to avoid layout behavior changes beyond requested sizing adjustments.

### 2026-04-15 — Homepage project cards: image order, sizing, padding, and View button style

#### Completed

- [x] Moved homepage project card images above project titles in [src/components/WorkitemProject.astro](src/components/WorkitemProject.astro)
- [x] Reduced homepage project card image area to 75% of card container width while preserving proportional scaling (`width: 100%; height: auto;` on image)
- [x] Added `8px` padding on all sides of each homepage project card
- [x] Added a new small, thinner outline View button style for project cards via `.workitem-cta--view-sm`
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Kept image scaling proportional by constraining the image wrapper width to `75%` and keeping the image itself responsive (`width: 100%; height: auto;`) to avoid distortion.

### 2026-04-15 — Footer title-row content move + heading typography alignment

#### Completed

- [x] Moved footer description text from column 1 into the top name/title row in `Footer.astro` so it sits above the 3-column row
- [x] Updated footer title row to span full desktop grid width (`1 / 7`) and support stacked logo + description
- [x] Set footer description width to 4 of 6 desktop columns via `.footer-subtitle { max-width: calc((100% / 6) * 4); }`
- [x] Updated footer column headings (`Contact Me`, `Case studies`, `Projects`) to match site `h4` styling direction: heading font + `700` weight, non-uppercase, normal tracking
- [x] Reordered footer columns to `Case studies` (1st), `Projects` (2nd), `Contact Me` (3rd) in the 3-column row
- [x] Added labeled contact items with logos for `Email` and `Linked in` using inline SVG icons in footer contact links
- [x] Reduced homepage canvas visibility by scaling scroll-driven canvas opacity in `ThreeBackground.astro` (`CANVAS_OPACITY_SCALE = 0.6`) so footer text stands out more
- [x] Increased footer-area canvas transparency by using a lower footer reveal scale in `ThreeBackground.astro` (`FOOTER_CANVAS_OPACITY_SCALE = 0.35`)
- [x] Reduced vertical gap between footer list links by overriding global list spacing inside footer (`.footer-links li { padding-top: 0; }`)
- [x] Updated footer-only link hover states to use rounded light-grey badge fill (`var(--color-surface)`) instead of the prior orange underline
- [x] Refined footer-only hover badge to translucent dark-grey fill with light text so the animated background remains slightly visible
- [x] Updated footer-only hover badge to non-transparent full-opacity dark-grey fill (`var(--color-dark-bg)`) while keeping light text
- [x] Fixed the footer at mid-size widths (around `625px`) to use the shared 4-column grid instead of a separate flex layout
- [x] Moved the `Tools` content to sit below `Projects` within the second footer column so `Contact Me` remains the third column
- [x] Increased footer heading-to-link spacing by raising `.footer-section-title` bottom margin to `0.75rem`
- [x] Increased footer hover badge horizontal padding to `0.75rem` and applied matching negative left margin (`-0.75rem`) to keep link text aligned to grid
- [x] Added a subtler footer hover transition: slower dark badge fill easing plus a slight `translateX(1px)` motion cue
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Interpreted request as footer-scoped typography only: changed `.footer-section-title` instead of altering global `h4` styles.

### 2026-04-15 — Final stacking-context fix for article grid layering

#### Completed

- [x] Added article-page override to remove `main` stacking context (`.site-body.article-grid-visible main { z-index: auto; }`)
- [x] Normalized `.grid-lines.over-dark` to `z-index: 1` so grid stays in the middle layer
- [x] Switched article content elevation from child-level to wrapper-level (`.content-case-study`) and set article content wrappers to `z-index: 2`
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Resolved layering conflicts by removing z-index trapping at the `main` level and using a stable page stack: background (0) < grid (1) < article content (2).

### 2026-04-15 — Conditional grid layering (dark hero only)

#### Completed

- [x] Set `.grid-lines.over-dark` to elevated `z-index: 3` so lines sit above dark hero gradients only while needed
- [x] Reset `.grid-lines.over-hero` and `.site-body.article-grid-visible .grid-lines` to base `z-index: 1` so lines sit behind article content by default
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Switched from always-elevated article overlay to state-driven elevation so both conditions are satisfied: hero visibility and content readability.

### 2026-04-15 — Article layering stack: grid between backgrounds and content

#### Completed

- [x] Kept article grid overlay at `z-index: 3` while adding page-scoped content elevation to `z-index: 4`
- [x] Elevated hero content, article body children, and footer on article pages so text/images/buttons render above grid lines
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Implemented explicit layering tiers on article pages (background < grid < content) to satisfy both hero-grid visibility and content readability.

### 2026-04-15 — Long-term grid continuity refactor (article pages)

#### Completed

- [x] Added a dedicated page-level grid anchor (`.page-grid-anchor`) in `BaseLayout.astro` to provide a stable source of truth for overlay alignment
- [x] Updated `sync-grid-overlay.js` to align grid lines using `.page-grid-anchor` (with fallback to `.grid`)
- [x] Removed stacked hero/content seam spacing by making hero spacing the single owner and setting article content top padding to `0`
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Implemented continuity via stable page-level alignment + seam spacing cleanup instead of per-section overlay adjustments for lower maintenance and fewer edge cases.

### 2026-04-15 — Follow-up continuity fix (mobile inset mismatch)

#### Completed

- [x] Removed duplicate horizontal padding on `.content` (`2rem 1rem` → `2rem 0`) so grid sections do not receive double mobile inset
- [x] Tightened hero bottom seam spacing (`.hero-content` bottom padding `3rem` → `1.5rem`) to reduce perceived section split
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Treated `.grid` as the sole owner of horizontal alignment spacing to avoid drift between hero/content/article sections.

### 2026-04-15 — Article page grid-line visibility fix

#### Completed

- [x] Added `bodyClass` prop support in `BaseLayout.astro` and applied `article-grid-visible` on case study + project layouts
- [x] Elevated `.grid-lines` z-index on article pages via `.site-body.article-grid-visible .grid-lines`
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Chose page-scoped body class elevation instead of global overlay z-index increase so homepage/nav layering behavior remains unchanged.

### 2026-04-15 — Grid-line color handoff refinement (hero gradient to content)

#### Completed

- [x] Added border-color transitions on `.grid-lines` columns so dark-to-light line color change is smooth while scrolling off hero gradients
- [x] Increased article-page light grid-line contrast between sections for better visibility on light backgrounds
- [x] Preserved dark line override while gradient hero is in view
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Used CSS transition + article-page contrast tuning instead of complex JS interpolation to keep behavior predictable and maintainable.

### 2026-04-15 — Hero controls de-accented + mobile metadata columns + hero grid-line visibility

#### Completed

- [x] Removed project hero orange accent treatment from badge and button outlines; switched to grey token-based styling
- [x] Updated case study and project hero metadata (`.info`) to a 2-column layout on mobile
- [x] Tightened spacing between hero badge, title, and subtitle on both mobile and desktop
- [x] Ensured main grid lines are visible while case study/project hero sections are in viewport by adding hero visibility hooks and overlay z-index toggle
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Used hero-scoped classes (`hero-grid-visible`, `has-canvas-hero`) with script-driven overlay state so grid lines elevate only when hero is visible, avoiding a permanent global overlay over all content.

### 2026-04-15 — Project hero switched to light style + intrinsic hero controls

#### Completed

- [x] Updated project detail hero container to include dedicated `.hero-project` class in `ProjectLayout.astro`
- [x] Added project-only light hero treatment in `global.css` (light grey hero background, dark text, brand-accent badge/button accents)
- [x] Kept case study hero styling unchanged
- [x] Updated case study + project hero badges and buttons to intrinsic width (`fit-content`) with `justify-self: start` so controls only size to content
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Applied width-fit behavior specifically in detail hero context to satisfy the request without changing button/badge behavior globally across the site.

### 2026-04-15 — Homepage mobile project cards set to 2/4 columns

#### Completed

- [x] Updated homepage `.list-workitems-grid` to a mobile 4-column grid
- [x] Set `.workitem-container--project` to span 2 columns on mobile (two project cards per row)
- [x] Kept desktop behavior unchanged (`display: contents` + desktop span rules at `min-width: 768px`)
- [x] Verified successful production build (`npm run build`)

#### Decisions made

- Interpreted request as a two-up mobile project layout where each project card is exactly 2 of 4 homepage grid columns.

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

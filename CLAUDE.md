# Portfolio 2026 — CLAUDE.md

Personal UX/product design portfolio for Jamie Barter. Built with Astro 5, MDX, plain CSS, deployed to Netlify.

> **Redesign in progress.** A full visual overhaul is planned and partially implemented.
> Full spec: [`docs/REDESIGN_PRD.md`](docs/REDESIGN_PRD.md)
> Current phase: check the PRD for progress.

---

## How to Work with Jamie

### Before starting any task

1. **Confirm scope first.** Before touching any files, state what you plan to change and why. For multi-file changes, list every file. Wait for confirmation before proceeding.
2. **Ask clarifying questions.** If the request is ambiguous — what files, which component, which behaviour — ask before assuming. One focused question is better than building the wrong thing.
3. **Read before changing.** Always read the relevant files before proposing or making changes. Never suggest edits to code you haven't seen.

### During implementation

4. **Implement only what was asked.** Do not refactor surrounding code, add extra features, or "improve" things that weren't mentioned. If you notice something worth fixing, flag it separately — don't fold it in.
5. **One phase at a time.** For the redesign, complete and gate one phase before starting the next. Don't start Phase 2 tasks while resolving Phase 1 issues.
6. **Flag before doing anything risky.** Deleting files, moving content, changing multiple layouts at once, or anything that can't be easily undone — confirm first.

### Progress log

7. **Update `docs/PROGRESS.md` after every session.** At the end of any session where code was changed, decisions were made, or tasks were completed — update the progress log. This is the memory of the project.

   What to log:
   - Checklist items completed (copy from PRD, mark done with date)
   - Decisions made and why (especially deviations from the PRD)
   - Problems encountered and how they were resolved
   - What was left incomplete and why
   - What to do next

8. **Read `docs/PROGRESS.md` at the start of every session.** Before doing anything, read the progress log to understand the current state. Do not rely on conversation history — it may not be available.

9. **If the PRD changes, note it in the log.** When a decision overrides or updates the PRD, write it in `PROGRESS.md` with a date and reason. Do not silently deviate from the plan.

### Communication

10. **Be concise.** Lead with the action or answer. No preamble, no summary of what you just did.
11. **Surface problems immediately.** If something won't work, or conflicts with the PRD or coding standards, say so before building it — not after.
12. **Use the skills.** Don't skip `/mobile-review` or `/phase-gate` — they exist to catch issues before they compound.

---

## Stack

- **Framework:** Astro 5 (`astro@^5`)
- **Content:** MDX via `@astrojs/mdx`
- **Styling:** Plain CSS — `src/styles/global.css` (all tokens + component styles), `src/styles/fonts.css` (font-face declarations)
- **Fonts:** PP Paloma (headings) + PP Neue Montreal (body) — files in `public/fonts/`
- **JS:** Vanilla JS only — `src/scripts/menu.js` handles mobile nav
- **Adapter:** Netlify (`@astrojs/netlify`)
- **Sitemap:** `@astrojs/sitemap`

No React, no Tailwind, no UI component libraries.

---

## Project Structure

```
src/
  pages/
    index.astro               # Homepage — ThreeJS hero + case study/project list
    about.astro               # Placeholder — needs rewrite
    case-study/               # Full case studies (MDX, uses CaseStudyLayout)
    projects/                 # Shorter project pages (MDX, uses ProjectLayout)
  layouts/
    BaseLayout.astro          # HTML shell — Header, GridOverlay, slot, Footer
    CaseStudyLayout.astro     # Hero image + metadata + content slot
    ProjectLayout.astro       # Project variant of CaseStudyLayout
  components/
    Button.astro              # Reusable CTA — primary / outline / ghost variants
    TagBadge.astro            # "CASE STUDY" / "PROJECT" label badge
    GridOverlay.astro         # Fixed 8-column visual grid lines (design element)
    ThreeBackground.astro     # WebGL cloud canvas — homepage hero only
    Header.astro              # Dark pill nav
    Navigation.astro          # Nav links
    Workitem.astro            # Case study card (number, badge, title, image, CTA)
    WorkitemProject.astro     # Project card (same pattern, smaller)
    Footer.astro
    Logo.astro
    Hamburger.astro
    Social.astro
    WorkitemSimple.astro      # Used in Footer nav list
  assets/
    images/
      hero/                   # Hero images (one per case study / project)
      <project-slug>/         # Per-project image folders
    icons/
  styles/
    global.css                # All CSS — tokens, grid, components, layouts
    fonts.css                 # @font-face declarations only
  scripts/
    menu.js                   # Mobile nav toggle + scroll behaviour

public/
  fonts/                      # PP Paloma + PP Neue Montreal woff2 files
  images/
    cloud_layer/              # ThreeJS WebGL cloud PNGs (0.png – 3.png)

docs/
  REDESIGN_PRD.md             # Full redesign spec — read before making style changes

_drafts/                      # Archived content — NOT part of the build
  altCaseStudy/
  case-study-save-170825/

threejsbackground/            # Standalone WebGL dev environment — do not modify
```

---

## Coding Standards

### Mobile-first CSS (mandatory)

All CSS is written mobile-first. Base styles target the smallest viewport. Desktop is a progressive enhancement.

```css
/* Correct */
.element {
  display: block;       /* mobile default */
}
@media (min-width: 768px) {
  .element {
    display: grid;      /* desktop enhancement */
  }
}

/* Wrong — never write this for new code */
@media (max-width: 767px) {
  .element { ... }
}
```

Breakpoints (from `global.css`):
- `768px` — main layout breakpoint (mobile → desktop)
- `540px` — small mobile adjustments
- `1024px` — tablet
- `1280px` — desktop

### Token compliance (mandatory)

Never use raw hex values, font names, or hardcoded sizes in component CSS. Always reference a CSS custom property.

```css
/* Wrong */
color: #343230;
font-family: 'PP Paloma', serif;
background: #f7c099;

/* Correct */
color: var(--color-text-strong);
font-family: var(--font-heading);
background: var(--color-accent);
```

All tokens are defined in `src/styles/global.css`. Semantic aliases (`--color-*`) are what components use — not the raw scale tokens (`--grey-100`).

### Touch targets (mandatory)

All interactive elements must have a minimum touch target of `44×44px`. All `<Button>` variants include `min-height: 44px`. Do not reduce this.

### Component reuse (mandatory)

Before writing any CSS for a button, label, or interactive element — check if `Button.astro` or `TagBadge.astro` covers it.

| Need | Use |
|------|-----|
| Any link styled as a button | `<Button href="...">` |
| Any action button | `<Button>` (no href) |
| "CASE STUDY" / "PROJECT" label | `<TagBadge>` |
| Grid layout | `.grid` + `.col-*` classes |
| Typography sizes | heading elements + CSS scale |

Never use `.link-large` — deprecated, replaced by `<Button>`.

### No scoped styles for layout or typography

Scoped `<style>` blocks in `.astro` files are only for animations or highly component-specific effects. All layout, typography, colour, and spacing goes in `global.css`.

### No hardcoded values in MDX

MDX files should not contain inline `style=` attributes or raw colour values. Use CSS classes.

---

## Design Tokens

Full token reference is in [`docs/REDESIGN_PRD.md`](docs/REDESIGN_PRD.md) Section 2. Key semantic aliases:

```css
/* Backgrounds */
--color-bg              /* #f2f2f2 — page background */
--color-surface         /* #e8e8e7 — cards, panels */
--color-dark-bg         /* #343230 — dark sections, nav, default case study header */

/* Text */
--color-text            /* body text */
--color-text-muted      /* captions, labels */
--color-text-strong     /* headings, strong emphasis */
--color-text-on-dark    /* white — text on dark backgrounds */

/* Accent */
--color-accent          /* #F7C099 — peach, primary accent */
--color-accent-subtle   /* lightest tint — hover backgrounds */
--color-accent-border   /* hover underlines, focus rings */

/* Fonts */
--font-heading          /* PP Paloma */
--font-body             /* PP Neue Montreal */

/* Transitions */
--transition-1-fast     /* 0.15s — hover states */
--transition-2          /* 0.3s — panel transitions */

/* Grid */
--grid-gutter           /* 1.5rem */
--max-width             /* 1600px */
--color-grid-line       /* subtle column line colour — light pages */
--color-grid-line-dark  /* column line colour — over dark/canvas */
```

---

## Grid System

The site uses a centered 6-column grid (Desktop) and 4-column grid (Mobile) with **zero internal gaps**. Visual grid lines are rendered by `GridOverlay.astro` and synchronized via `src/scripts/sync-grid-overlay.js`.

```css
/* Container (Desktop 768px+) */
.grid { 
  display: grid; 
  grid-template-columns: repeat(6, 1fr); 
  gap: 0; 
  padding: 0 var(--grid-margin); /* margin scales: 16/24/32/48px */
}

/* Placement utilities (min-width: 768px) */
.col-full       /* 1 / -1 (all 6 cols) */
.col-content    /* 1 / 7 (all 6 content cols) */
.col-narrow     /* 1 / 5 (4 cols left) */
.col-centered   /* 2 / 6 (4 cols centered) */
.col-left       /* 1 / 4 (left 3 cols) */
.col-right      /* 4 / 7 (right 3 cols) */
.col-left-wide  /* 1 / 5 (left 4 cols) */
.col-right-wide /* 3 / 7 (right 4 cols) */
```

On mobile (< 768px): `.grid` uses `grid-template-columns: repeat(4, 1fr)`. Placement utilities (e.g., `.col-content`) automatically shift to `1 / 5`.

---

## Components

### Button.astro

```astro
<Button href="/url" variant="primary" size="md" external>Label</Button>
<Button variant="outline" size="sm">Label</Button>
<Button variant="ghost">Label</Button>
```

- `variant`: `primary` | `outline` | `ghost` (default: `primary`)
- `size`: `sm` | `md` | `lg` (default: `md`)
- `href`: if provided, renders as `<a>`; otherwise `<button>`
- `external`: adds `target="_blank" rel="noopener"`
- On dark backgrounds, wrap in `.dark-bg` parent — button colours invert automatically

### TagBadge.astro

```astro
<TagBadge label="Case Study" />
<TagBadge label="Project" variant="accent" />
```

- `variant`: `default` | `accent`

### GridOverlay.astro

Added once in `BaseLayout.astro`. No props. Renders fixed column lines on all pages.
Add class `has-canvas-hero` to the hero section or body to switch to dark grid line colour.

### ThreeBackground.astro

Used only in `src/pages/index.astro` homepage hero.
- Wraps existing code from `threejsbackground/index.html` verbatim — do not rewrite shaders
- Canvas files are in `public/images/cloud_layer/`
- Controls panel is dev-only (hidden in production)
- Mobile: canvas disabled, static gradient fallback shown instead

---

## Case Study Colours

Default hero background for all case studies is `--color-dark-bg` (`#343230`).

`bgClass` frontmatter accepts:

| Value | Background | Notes |
|-------|-----------|-------|
| (empty / `default`) | `#343230` dark grey | Default for all new work |
| `accent` | `#F7C099` peach | |
| `slate` | `#7B93A8` | |
| `sage` | `#8FA68B` | |
| `rust` | `#C17A5A` | |
| `sand` | `#D4BC94` | |
| `indigo` | `#4A5580` | |
| `midnight` | `#1A1A2E` | |
| `kepla` | teal→blue gradient | Legacy — keep |
| `aurora` | yellow→orange gradient | Legacy — keep |
| `pelorus` | blue gradient | Legacy — keep |
| `sitesmart` | sky blue gradient | Legacy — keep |

---

## Adding a New Case Study

### 1. Create the MDX file

`src/pages/case-study/<slug>.mdx`

Required frontmatter:

```yaml
---
layout: ../../layouts/CaseStudyLayout.astro
title: 'Full title'
titleShort: 'Short title'
description: 'One-sentence description for the work list'
overview: 'Longer overview shown in hero'
image:
  url: '/images/hero/<filename>.png'
  alt: 'Alt text'
projectLink: 'https://...'
projectLinkCopy: 'CTA text'
id: '<slug>'
bgClass: 'default'
accentColor: '#F7C099'        # hex — drives the accent circle on homepage card
metaTitle: '...'
metaDescription: '...'
author: 'Jamie Barter'
client: '...'
projectType: '...'
role: '...'
timeframe: '...'
team: '...'
skills: '...'
order: 5                       # display order on homepage (lower = first)
---
```

### 2. Register the hero image

Hero images must be manually registered in **two files**:

- [`CaseStudyLayout.astro`](src/layouts/CaseStudyLayout.astro) — add import + add to `heroImages` map
- [`index.astro`](src/pages/index.astro) — same import + same `heroImages` map entry

### 3. Add body content images

Place in `src/assets/images/<slug>/`. Import in the MDX file and use `<Image>`:

```mdx
import myImage from '../../assets/images/<slug>/my-image.png';
<Image src={myImage} alt="..." width={900} format="webp" quality={85} />
```

Use grid placement classes for layout:
- Full-width image: wrap in a `<div class="col-full">`
- Prose width: default (inherits content column)
- Side-by-side: `<div class="col-left">` + `<div class="col-right">`

---

## Adding a New Project

`src/pages/projects/<slug>.mdx` — uses `ProjectLayout.astro`. Same hero image registration pattern. Same frontmatter structure (no `overview` field required).

---

## Skills Available

Run these at the appropriate points in development:

| Command | When to use |
|---------|------------|
| `/astro` | After writing any `.astro` file — checks Astro patterns, images, MDX |
| `/mobile-review` | After any CSS or layout change — checks mobile-first compliance |
| `/ui-consistency` | After building a component — checks token use and reuse patterns |
| `/phase-gate [n]` | End of each redesign phase — confirms phase is complete before moving on |
| `/styleguide` | Periodically — generates updated living styleguide from `global.css` |
| `/content-review` | When writing or editing case study content |
| `/component-plan` | Before building any new component — generates a full spec first |
| `/feature-scope` | Before starting a new feature — locks down scope |

---

## Commands

```bash
npm run dev      # local dev server (localhost:4321)
npm run build    # production build
npm run preview  # preview built output
```

---

## What NOT to Do

**CSS**
- Do not use `max-width` media queries for new code — mobile-first means `min-width` only
- Do not use raw hex values or font names in component CSS — use tokens
- Do not create scoped `<style>` blocks for layout, typography, or colour
- Do not reduce button sizes below 44px minimum touch target

**Components**
- Do not style ad-hoc buttons or links — use `<Button>`
- Do not create label badges from scratch — use `<TagBadge>`
- Do not add named imports (`{ ComponentName }`) from `.astro` files — Astro only has default exports
- Do not put duplicate `class` props on one element — only the last applies

**Images**
- Do not add images to `public/images/` and reference with raw paths — use `src/assets/` + `<Image>`
- Do not add a new hero image without updating both `CaseStudyLayout.astro` and `index.astro`

**ThreeJS**
- Do not modify `threejsbackground/index.html` — it is the source-of-truth dev environment
- Do not rewrite or modify shader/pipeline code in `ThreeBackground.astro`

**General**
- Do not add Tailwind, shadcn, or any component library
- Do not touch `_drafts/` — archived content
- Do not commit without being asked

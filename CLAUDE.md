# Portfolio 2026 — CLAUDE.md

Personal UX/product design portfolio for Jamie Barter. Built with Astro 5, MDX, plain CSS, deployed to Netlify.

---

## Stack

- **Framework:** Astro 5 (`astro@^5`)
- **Content:** MDX via `@astrojs/mdx`
- **Styling:** Plain CSS — one global file at `src/styles/global.css`, no Tailwind
- **Fonts:** Work Sans Variable (body) + Inconsolata Variable (headings/mono) via `@fontsource-variable`
- **JS:** Vanilla JS only — `src/scripts/menu.js` handles mobile nav
- **Adapter:** Netlify (`@astrojs/netlify`)
- **Sitemap:** `@astrojs/sitemap`

No React, no Tailwind, no UI component libraries.

---

## Project Structure

```
src/
  pages/
    index.astro               # Homepage — lists case studies + projects
    about.astro
    case-study/               # Full case studies (MDX)
    projects/                 # Shorter project pages (MDX)
  layouts/
    BaseLayout.astro          # HTML shell — Header, slot, Footer
    CaseStudyLayout.astro     # Hero image + metadata + slot
    ProjectLayout.astro       # Project variant of above
  components/                 # Header, Footer, Navigation, Workitem, etc.
  assets/
    images/
      hero/                   # Hero images (one per case study / project)
      <project-slug>/         # Per-project image folders
    icons/
  styles/
    global.css                # All styles — CSS custom properties + BEM-ish classes
  scripts/
    menu.js                   # Mobile hamburger toggle

  altCaseStudy/               # Draft / WIP content — NOT published
  case-study-save-170825/     # Archived versions — NOT published
```

---

## Styling Conventions

All styles live in `src/styles/global.css`. Do not create scoped `<style>` blocks in components unless it genuinely can't go in global.css.

### CSS custom properties (design tokens)

```css
/* Colors */
--midnight-blue: #08122c        /* primary text / dark */
--primary-800: rgb(64,37,144)
--primary-600: #7142ff
--primary-300: #cec5ff
--primary-100: #ece8ff          /* hover backgrounds */
--gradient-standard: linear-gradient(#b7beff, #f0dcff)

/* Typography */
--font-work-sans                /* body text, weight 300 */
--font-inconsolata              /* headings + logo, bold */

/* Transitions */
--transition-1-fast: all 0.15s ease-out
--transition-2: all 0.3s ease-out

/* Layout */
--max-width: 1600px
--max-width-content: 900px
--max-width-content-wide: 1200px
--max-width-content-narrow: 800px
--nav-height-mob: 58px
--nav-height-desktop: 80px
```

### Breakpoints

```css
--media-mob: 540px
--media-mob-med: 768px      /* main responsive breakpoint */
--media-tablet: 1024px
--media-desktop: 1280px
```

Mobile-first. Most layout shifts happen at `768px`.

### Case study background gradients

Each case study has a `bgClass` frontmatter field that maps to a CSS gradient class:

| bgClass      | Gradient                      |
|-------------|-------------------------------|
| `kepla`     | `#a2e0d3` → `#649ee0`        |
| `pelorus`   | `#407beb` → `#6fc6fc`        |
| `aurora`    | `#fdd893` → `#faa949`        |
| `npdc`      | `#f6dba9` → `#e09c74`        |
| `sitesmart` | `#b7ddef` → `#4cadde`        |

To add a new case study colour, add a new CSS class in `global.css` and reference it in the MDX frontmatter.

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
description: 'One-sentence description shown in work list'
overview: 'Longer overview shown in hero'
image:
  url: '/images/hero/<filename>.png'
  alt: 'Alt text'
projectLink: 'https://...'
projectLinkCopy: 'CTA text'   # optional, defaults to "See more"
id: '<slug>'
bgClass: '<gradient-class>'
metaTitle: '...'
metaDescription: '...'
author: 'Jamie Barter'
client: '...'
projectType: '...'
role: '...'
timeframe: '...'
team: '...'
skills: '...'
order: 5                       # Controls display order on homepage (lower = first)
---
```

### 2. Register the hero image

Hero images must be manually registered in **two files** — this is a known limitation of Astro's static image optimisation:

**[CaseStudyLayout.astro](src/layouts/CaseStudyLayout.astro)** — add an import and add to the `heroImages` map.

**[index.astro](src/pages/index.astro)** — same import and same `heroImages` map entry.

Both files maintain identical `heroImages` maps. If the image is missing from either, you'll get the fallback error block or an unoptimised `<img>`.

### 3. Add images for the body content

Place images in `src/assets/images/<slug>/`. Import them individually in the MDX file:

```mdx
import myImage from '../../assets/images/<slug>/my-image.png';

<Image src={myImage} alt="..." width={900} format="webp" quality={85} />
```

Do not use public folder paths for images — use Astro's `<Image>` component for all body images so they get optimised.

---

## Adding a New Project (Shorter Page)

`src/pages/projects/<slug>.mdx` — uses `ProjectLayout.astro`. Same image registration pattern applies: add the hero image import to `index.astro`'s `heroImages` map.

---

## Key Component Notes

**Workitem.astro** — case study card on homepage. Receives `optimizedImage` prop (the imported asset) alongside `image` (frontmatter object). Always pass both.

**WorkitemProject.astro** — same pattern for project cards.

**CaseStudyLayout.astro** — the `Sidebar` component is currently commented out (`<!--  <Sidebar/> -->`). Don't remove the comment; it may be re-enabled.

---

## Content / Writing Style

This is a UX/product design portfolio. Case study content follows a narrative structure:

- Problem / context
- Research / discovery
- Design process (wireframes, iterations, decisions)
- Final solution
- Outcomes / results

Keep writing concise and outcome-focused. Avoid generic UX jargon without specific evidence.

---

## Commands

```bash
npm run dev      # local dev server
npm run build    # production build
npm run preview  # preview built output
```

---

## What NOT to do

- Do not add Tailwind, shadcn, or any component library — the design intentionally uses plain CSS.
- Do not create scoped `<style>` blocks for layout or typography — use `global.css`.
- Do not use `any` casts in `.astro` frontmatter without a comment explaining why.
- Do not add images to `public/images/` and reference them with raw paths — use the `src/assets/` + Astro `<Image>` pipeline.
- Do not add new hero images without updating both `CaseStudyLayout.astro` and `index.astro`.
- Do not touch `altCaseStudy/` or `case-study-save-170825/` — these are drafts/archives.

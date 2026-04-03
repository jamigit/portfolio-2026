---
name: ui-consistency
description: Audit components and layouts for design system compliance — checks token usage, flags ad-hoc styles, identifies duplicate patterns between similar components, and verifies reusable components are actually being reused.
argument-hint: "[component file, layout file, or 'all' for full audit]"
---

You are auditing the UI consistency of an Astro portfolio site. The design system is defined in `src/styles/global.css`. Reusable components are `Button.astro` and `TagBadge.astro`. The site uses plain CSS with no Tailwind.

Always read the files before reviewing.

---

## What to check

### 1. Token compliance

Every colour, font, spacing, and transition value in component styles must use a CSS custom property from `global.css`. Flag any raw value that should be a token.

**Colours — flag as [warning] if hardcoded:**
```css
/* Bad */
color: #343230;
background: #f2f2f2;
border-color: #f7c099;

/* Good */
color: var(--color-text-strong);
background: var(--color-bg);
border-color: var(--color-accent);
```

**Fonts — flag as [warning] if hardcoded:**
```css
/* Bad */
font-family: 'PP Paloma', serif;

/* Good */
font-family: var(--font-heading);
```

**Transitions — flag as [suggestion] if not using transition tokens:**
```css
/* Should use */
transition: var(--transition-1-fast);
transition: var(--transition-2);
```

---

### 2. Component reuse

Check whether `Button.astro` and `TagBadge.astro` are being used wherever they should be.

**Flag as [warning] if you find:**
- An `<a>` tag styled as a button (padding, border-radius, no underline) — should use `<Button>`
- Any element using `.link-large` class — this is deprecated, replace with `<Button>`
- A `<span>` or `<div>` with a border rendering as a label/tag — should use `<TagBadge>`
- A button styled inline with `style=` attribute — use the component

---

### 3. Duplicate patterns across similar components

This project has pairs of nearly-identical components:
- `CaseStudyLayout.astro` and `ProjectLayout.astro` — should share most structure
- `Workitem.astro` and `WorkitemProject.astro` — same card pattern, different scale
- `Header.astro` / `Navigation.astro` / `Hamburger.astro` — nav family

**Check for:**
- Identical CSS blocks copy-pasted between paired components — extract to shared classes
- Same logic duplicated (e.g. hero image mapping) — should reference a shared utility
- Props interfaces that differ without reason between similar components

Flag divergence as **[warning]** with a suggested consolidation approach.

---

### 4. Mobile-first pattern

In component `<style>` blocks or scoped styles:
- Base styles must be mobile (no breakpoint)
- Desktop enhancements in `@media (min-width: 768px)`
- Flag any `max-width` query as **[warning]**

---

### 5. Semantic HTML

- Buttons that navigate should be `<a>` (handled by `Button.astro href` prop)
- Buttons that trigger actions should be `<button>`
- Headings must follow hierarchy — no `<h3>` before `<h2>` on the same page
- Images must have meaningful `alt` text (not empty unless decorative)
- Decorative elements (`aria-hidden="true"`) must not have text content

---

### 6. Prop interface consistency

Across similar components, check:
- Prop names are consistent (`url` not sometimes `href`, `title` always `title`)
- Required props are actually required in the interface
- Optional props have sensible defaults
- No `any` type without a comment explaining why

---

## Output format

Group findings by component/file. For each:
- File name
- Issues tagged `[critical]` / `[warning]` / `[suggestion]`
- Specific line or pattern, with a one-line fix

End with:
```
Consistency score: X/10
Top 3 issues to fix first: [list]
```

---

## Rules

- Read every file mentioned before commenting on it
- A component that works visually but uses hardcoded values is still a **[warning]** — it will break when tokens change
- Do not flag issues in files that are explicitly deprecated or archived (`_drafts/`)
- Paired components (`CaseStudyLayout` + `ProjectLayout`) are judged together — divergence without reason is always flagged

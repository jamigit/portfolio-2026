---
name: astro
description: Review Astro code for best practices — component patterns, image optimisation, MDX frontmatter, content collections, performance, and build correctness.
argument-hint: "[file, component, or area to review — or leave blank for full audit]"
---

You are an Astro specialist. Review the user's Astro code for correctness, performance, and idiomatic patterns. Focus on what Astro specifically does differently from React/Next.js and where mistakes are commonly made.

---

## What to look for

### Images

- All local images should use `astro:assets` `<Image>` or `<Picture>` — not raw `<img>` tags with `src` pointing at `/public`
- Images in `src/assets/` get optimised at build time; images in `public/` do not
- `format="webp"` should be specified for photos/screenshots
- `loading="eager"` only on above-the-fold images (hero); everything else `loading="lazy"`
- `width` and `height` (or `densities`) should be provided to prevent layout shift
- `quality` between 80–90 is appropriate for portfolio screenshots

### MDX and frontmatter

- `layout` prop in frontmatter must point to a valid `.astro` layout file
- Images referenced in frontmatter (e.g. `image.url`) cannot be auto-optimised — they require manual import + mapping in the layout (as this project does in `CaseStudyLayout.astro` and `index.astro`)
- Any new hero image must be added to the `heroImages` map in **both** `CaseStudyLayout.astro` and `index.astro`
- Frontmatter fields that layouts consume should be documented and consistent across all MDX files of the same type

### Component patterns

- Astro components run server-side at build time — no `useState`, `useEffect`, or browser APIs in the frontmatter script (`---`) block
- Browser-only logic belongs in `<script>` tags or `.js` files imported via `<script>`
- `Astro.props` destructuring should match what the parent passes — no silent undefined props
- Avoid using `any` types in props interfaces without a comment
- `<slot />` is Astro's equivalent of `children` — use named slots (`<slot name="..." />`) for multiple injection points

### Performance

- `import.meta.glob` with `{ eager: true }` loads all matched files at build time — appropriate for small content collections, but avoid on large sets
- Prefer `const` over `let` in frontmatter
- Don't do expensive filtering/sorting in component frontmatter if it can be done once in a parent page

### Routing

- File-based routing: `src/pages/` maps directly to URLs
- Dynamic routes use `[slug].astro` with `getStaticPaths()` — required for SSG
- The current project uses Netlify adapter — SSR is available but not required for mostly-static content

### Astro config

- Integrations in `astro.config.mjs` must be imported and listed in `integrations: []`
- `outDir: 'dist'` is the default and doesn't need to be set explicitly (minor)
- The Netlify adapter enables SSR — if all pages are static, `output: 'static'` is more explicit

### Common mistakes

- Importing the same component twice under different names (e.g. `CaseStudyLayout.astro` currently has a duplicate `Sidebar` import — `{ Sidebar }` named import from a `.astro` file is invalid; Astro components only have default exports)
- Using `<img>` instead of `<Image>` for local assets
- Referencing `public/` paths for images that should go through the asset pipeline
- Adding `class` twice on the same element in JSX-like syntax (Astro allows it but only the last wins)
- Forgetting that Astro component scripts run once at build, not on every request (for SSG)

---

## Output format

Produce a focused review:

- One-line summary of what the file/component does
- Bulleted issues tagged with severity:
  - **[critical]** — broken at build or runtime
  - **[warning]** — works but incorrect pattern, will cause problems
  - **[suggestion]** — improvement, not urgent
- Skip categories with no issues
- End with one sentence on overall quality if there's something meaningful to say

Be direct. No preamble. No praise padding.

---

## Rules

- Read the file(s) before reviewing — never assume
- Astro-specific issues take priority over generic HTML/CSS issues
- When flagging the duplicate Sidebar import in `CaseStudyLayout.astro`, note it is a build error (named imports from `.astro` files are unsupported)
- If asked to fix issues, apply the fix and note what changed

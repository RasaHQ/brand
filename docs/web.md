# Astro and Tailwind integration

Two stylesheets exist: the web package (`--rasa-*` variables, `rasa-*` classes, Tailwind adapters) for sites, and the design system's own `design-system/rasa-brand-2026/tokens.css` + component bundle for slide and product visuals. Use the web package for pages; mount `window.RasaNewBrand` components where a page needs a product window or diagram (see [components.md](components.md#rasa-brand-2026-ui-components)).

The existing `design-system/` package provides tokens and opt-in components; assets are exported separately. Use your site's existing layout, routes, analytics, and content collections. These examples do not replace the production rasa.community application.

## Plain CSS / Astro

```astro
---
import '@rasahq/brand-tokens/tokens.css';
import '@rasahq/brand-tokens/components.css';
// Licensed STK Bureau files served from /fonts/ (provisioned, never committed):
import '@rasahq/brand-tokens/fonts.css';
---
<head>
  <!-- Always load the Google substitutes, even when STK Bureau is available -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Newsreader:ital,wght@0,300;0,400;1,300;1,400&display=swap">
</head>
<body class="rasa-theme"><slot /></body>
```

Use `examples/astro/BrandHero.astro` for a texture and the logo. Export its two assets using the commands in `docs/assets.md`; copy the component into the target application's component folder. It accepts a `base` URL prefix (default `/brand/`) so nested deployments and CDN paths are explicit. The older `BrandPage.astro` is a whole-page composition specimen using relative package-source imports; adapt its imports when copying.

## Tailwind 4

```css
@import "tailwindcss";
@import "@rasahq/brand-tokens/tailwind-v4.css";
@import "@rasahq/brand-tokens/components.css";
```

The theme adapter imports token values. Use `bg-rasa-bg text-rasa-fg font-rasa-serif rounded-rasa-2xl`; theme roles are `*-rasa-theme-<role>` (for example `bg-rasa-theme-surface`). It extends the theme without replacing unrelated host values. Component classes remain available. Inspect the installed Tailwind/Astro versions and host integration before changing configuration.

## Tailwind 3

```js
module.exports = {
  presets: [require('@rasahq/brand-tokens/tailwind-v3')],
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
};
```

Also load `tokens.css` and `components.css` from the root layout. Retain host plugins and content globs. Do not use v4 `@theme` directives in v3.

## Asset and performance contract

Use exact catalog IDs. Copy only selected files into public assets; never copy all masters into the client bundle. Use the Brand 2026 WebP textures, SVG logos/icons through `<img>`, and explicit image dimensions/aspect ratios. Keep decorative images empty-alt and essential meaning in HTML. Do not assume SVG images inherit currentColor.

For a hero likely to be the largest visible image, avoid lazy loading that image; images below the fold can be lazy. Test the actual crop at 375px and desktop widths. Keep text on solid surfaces so background patterns cannot reduce contrast. Test long titles, keyboard focus, and image/font failure. Run the consuming app's build/check commands and inspect its rendered output; passing token generation alone is insufficient.

## Framework references

Integration syntax checked against official [Astro styles](https://docs.astro.build/en/guides/styling/), [Astro imports](https://docs.astro.build/en/guides/imports/), and [Tailwind theme variables](https://tailwindcss.com/docs/theme) on 16 October 2026 (unchanged in the November update). Check the actual host versions when integrating.

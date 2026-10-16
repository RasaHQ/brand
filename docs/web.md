# Astro and Tailwind integration

The existing `design-system/` package provides tokens and opt-in components; assets are exported separately. Use your site's existing layout, routes, analytics, and content collections. These examples do not replace the production rasa.community application.

## Plain CSS / Astro

```astro
---
import '@rasahq/brand-tokens/tokens.css';
import '@rasahq/brand-tokens/components.css';
// Optional, after copying the OFL font files to the configured URLs:
// import '@rasahq/brand-tokens/fallback-fonts.css';
---
<body class="rasa-theme"><slot /></body>
```

Use `examples/astro/BrandHero.astro` for a supplied background and logo. Export its two assets using the commands in `docs/assets.md`; copy the component into the target application's component folder. It accepts a `base` URL prefix (default `/brand/`) so nested deployments and CDN paths are explicit. The older `BrandPage.astro` is a whole-page composition specimen using relative package-source imports; adapt its imports when copying.

## Tailwind 4

```css
@import "tailwindcss";
@import "@rasahq/brand-tokens/tailwind-v4.css";
@import "@rasahq/brand-tokens/components.css";
```

The theme adapter imports token values. Use `bg-rasa-bg text-rasa-ink font-rasa-serif rounded-rasa-card`. It extends the theme without replacing unrelated host values. Component classes remain available. Inspect the installed Tailwind/Astro versions and host integration before changing configuration.

## Tailwind 3

```js
module.exports = {
  presets: [require('@rasahq/brand-tokens/tailwind-v3')],
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
};
```

Also load `tokens.css` and `components.css` from the root layout. Retain host plugins and content globs. Do not use v4 `@theme` directives in v3.

## Asset and performance contract

Use exact catalog IDs. Copy only selected files into public assets; never copy all masters into the client bundle. Use WebP backgrounds, SVG logos/icons through `<img>`, and explicit image dimensions/aspect ratios. Keep decorative images empty-alt and essential meaning in HTML. Do not assume SVG images inherit currentColor.

For a hero likely to be the largest visible image, avoid lazy loading that image; images below the fold can be lazy. Test the actual crop at 375px and desktop widths. Keep text on solid surfaces so background patterns cannot reduce contrast. Test long titles, keyboard focus, and image/font failure. Run the consuming app's build/check commands and inspect its rendered output; passing token generation alone is insufficient.

## Framework references

Integration syntax checked against official [Astro styles](https://docs.astro.build/en/guides/styling/), [Astro imports](https://docs.astro.build/en/guides/imports/), and [Tailwind theme variables](https://tailwindcss.com/docs/theme) on 16 October 2026. Check the actual host versions when integrating.

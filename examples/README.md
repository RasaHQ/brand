# Running the examples

Install the matching dependencies in the consuming application. The brand package itself has no runtime dependencies.

- **Astro:** place `BrandPage.astro` in the host's pages directory and change its two relative CSS imports to the package imports in the root README. It is a complete static page example and requires no client JavaScript.
- **Anime.js 4:** install `animejs`; import `revealCards` in client code, call it on a root containing decorative `[data-rasa-reveal]` elements, retain its cleanup, and call cleanup on unmount/before navigation. Do not apply it to forms, links or buttons. For Astro view transitions, initialize on `astro:page-load` and clean up on `astro:before-swap`.
- **Remotion 4:** install `react`, `react-dom`, `remotion`, `@remotion/cli` and optionally `@remotion/fonts`, keeping all Remotion packages on the same exact version. Run `npx remotion studio examples/remotion/index.tsx` from this overlay root. A render command is `npx remotion render examples/remotion/index.tsx RasaBrandScene out/brand.mp4`. The sample uses fallback fonts; production requires the optional licensed-font import and provisioned files.

Example imports point to `../../design-system/dist/tokens.mjs` to keep the review overlay self-contained. After installation as a local package, use `@rasahq/brand-tokens`. The Remotion scene is intentionally not a product demo: it uses clearly illustrative copy and does not fabricate a Rasa logo.

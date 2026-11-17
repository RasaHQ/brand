---
name: rasa-brand
description: Apply the Rasa Brand 2026 system when building or reskinning websites, Astro components, Tailwind interfaces, UI visuals, Remotion videos, Anime.js motion, diagrams, newsletters, email templates, backgrounds or artwork, and when reviewing Rasa work for brand fit. Reads the design-system mirror, shared tokens and recipes, implements the change, and verifies the rendered result. For rasa.community covers, newsletter images, showcase headers and in-post diagrams use rasa-community-cards; for decks use rasa-slides.
---

# Rasa brand implementation

## Resolve the brand source

This skill is a workflow over the **full brand repository**, not a palette to copy into a prompt. Resolve `BRAND_ROOT` in this order:

1. The brand checkout the user supplied.
2. `brand-root.txt` beside this skill file, resolved relative to the skill directory.
3. An ancestor of this file containing `design-system/rasa-brand-2026/README.md` and `design-system/src/tokens.json`.

Confirm both files exist. If the checkout moved, find the project's brand dependency or ask for it; never rebuild tokens from memory. A bare npm token package is not the full checkout.

Follow the user's task and project instructions. This skill grants no publishing, deployment, account or font-redistribution permission. Label anything the sources don't cover as *proposed*.

## Route the task

| Task | Use |
| --- | --- |
| rasa.community cover, OG/social image, newsletter image, showcase header, in-post diagram | The `rasa-community-cards` skill (`skills/rasa-community-cards/`) |
| Slides, deck, a single slide | The `rasa-slides` skill; layouts and rules in the guidelines' slide layer |
| Everything else below | This skill |

## Read the guidelines first

`design-system/rasa-brand-2026/README.md` is the brand guideline, copied byte-for-byte from the Rasa Brand 2026 design system. Read the layers the task touches, in order: **1 Brand foundation** (colour, type, logo, icons, graphics), **2 Slide layer**, **3 Visual layer** (product windows, concept cards, flows, density limits), **4 Content layer** (voice, terminology, eyebrows, emphasis, line breaks). Read the content layer before writing any copy. Where anything differs from Figma, Figma wins. Then read `docs/brand-2026.md` for how this repository applies them.

| Task | Also read |
| --- | --- |
| Astro / community reskin | `docs/web.md`, `docs/community-migration.md`, `docs/components.md`, `examples/astro/` |
| Tailwind / CSS | `docs/components.md`, `COMPONENTS.md`, the host's package manifest, the adapter in `design-system/dist/` |
| Product visuals, diagrams in a page | `docs/components.md#rasa-brand-2026-ui-components`, `design-system/rasa-brand-2026/components/index.d.ts` |
| Logo / icon / texture / print | `ASSETS.md`, `docs/asset-*.md`, `docs/assets.md`; query `scripts/brand.py find` |
| Fonts | `docs/fonts.md`; run `python3 scripts/check-fonts.py --soft` |
| Colour / contrast | `docs/colors.md`, `evidence/contrast.json` |
| Newsletter / HubSpot | `docs/email.md`, `scripts/build-email.py`, `examples/email/` |
| Remotion / Anime.js | `docs/motion.md`, `examples/remotion/`, `examples/anime/` |
| Artwork | `docs/artwork.md` |
| Source conflicts | `docs/source-audit.md`, `evidence/brand-2026/artifact-files.json` |
| Agent setup | `docs/agents.md` |

Never load texture SVGs or the component bundle into context; query the catalog and read `index.d.ts` instead.

## Inspect the consuming project

Identify its package manager, framework and Tailwind versions, global styles, shared components, asset conventions and checks. Read the existing implementation before editing. Keep unrelated content, routes, SEO, analytics and behaviour intact.

Pick the smallest integration:

- Plain CSS / Astro: import `@rasahq/brand-tokens/tokens.css` and `components.css` once; opt into `rasa-*` classes; `rasa-dark` for Taupe Dark sections.
- Tailwind 4: `tailwind-v4.css`. Tailwind 3: the v3 preset. Keep host plugins and content globs.
- Product moments and diagrams: mount `window.RasaNewBrand` components (design-system bundle) instead of hand-building controls.
- React / Remotion / programmatic artwork: concrete JS tokens from `dist/tokens.mjs`.
- SVG artwork: edit the vector source; never ask an image model for logos, UI text or diagrams.

The package is private: install from the checkout (`npm install /abs/path/brand/design-system`). Follow the host lockfile.

## Rules to preserve

- **Taupe is the only neutral** (Taupe Light `#FAF6F0`, Taupe Dark `#181210`, Taupe 50 `#FFFBF5` the brightest surface). The Ink scale is retired; no white, greys or gradients. No purple.
- **Rasa Pink `#E85A91` is the one accent**: emphasis, focus, key actions. Never a background fill or body text; on Taupe Light only at 24px and up (small accent text and links use Pink 600). Never on eyebrows, meta, page numbers or attributions. One focus per visual.
- Secondary hues for supporting surfaces, data, tags and industry cues, with Taupe Dark text; categories in order periwinkle, seafoam, gold, coral, orchid, lavender, sage; one colour, one meaning. States are fixed: success seafoam, danger coral, warning gold, info periwinkle, neutral taupe, pink for must/focus.
- **Type:** STK Bureau Serif (headlines), Sans (body/UI), Sans Medium (buttons, numbers), Sans Mono (eyebrows, meta, code). Book is weight 300. Always load the Google substitutes (Newsreader, Inter, JetBrains Mono). Licensed fonts are never committed: use `RASA_FONTS_DIR` or the git-ignored `fonts/` folder and report when a render used substitutes.
- **Logo Full** (speech bubble) in Taupe Dark, Taupe Light or Pink (accent moments). Icon (R) only where space is tight. Use `assets/brand-2026/` files; never redraw or recolour.
- **Textures:** one Chladni or Soundwave per layout, bleeding off an edge, never behind text; accent treatment for hero moments only.
- **Visuals:** connectors orthogonal (12px corners, 1.5px Taupe 700; Pink 400 for the one focus path); no left-edge accent stripes; numbers in Sans Medium; Mono only for code; dark code windows with no pink; no dark chat bubbles on light grounds; text floors 24px (slide layer) and 14px (visual layer).
- **Copy:** headlines are short statements that end with a full stop; sentence case; eyebrows 1–3 words, Mono, uppercase, no separators; emphasis rare (pink Serif italic, one word or short phrase); no emoji; avoid "X, not Y", vague verbs and asserted feelings. Verify every claim, number and customer.

For a missing rule, implement a restrained extension with existing tokens and label it proposed. Don't change primary tokens to suit one screen.

## Verify the actual result

Run the host's build, type and lint checks and a representative consumer build; token compilation alone is not integration. For web changes inspect desktop and narrow layouts, long text, focus and overflow in a browser. For video, inspect representative frames after fonts load. For SVG/raster artwork, render at the delivery size and look at it. Check every rendered headline for orphans and split product names. State any check you could not run.

When changing the brand system itself, from `BRAND_ROOT`:

```sh
python3 scripts/sync-tokens-from-design-system.py --check
npm --prefix design-system run build
npm --prefix design-system run check
npm --prefix design-system run reference
python3 scripts/build-catalog-docs.py
python3 scripts/build-email.py
python3 scripts/sync-agent-skills.py
python3 scripts/validate-brand.py
```

Never edit the design-system mirror by hand, generated `dist/` files or skill copies under `.claude/` and `.agents/`. Never add font binaries, secrets or private boards.

## Hand off

Report the outcome, changed components, tokens and adapters used, checks actually run, fonts used (STK Bureau or substitutes) and any remaining asset or visual-validation gap. Include a screenshot or frame when produced. Separate design-system rules from proposed extensions. Do not imply a live site changed unless you deployed it.

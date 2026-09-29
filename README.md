# Rasa Brand Guidelines

A shared visual system for Rasa websites, community experiences, presentations, artwork, and motion. This revision documents the September 2026 website direction: **warm cream and taupe, dark ink, selective pink, editorial serif headlines, and clear product storytelling.**

The former purple-first palette, Söhne-led typography, fractals, refracted glass, and decorative gradient backgrounds are retired defaults for new work. Historical files remain available for maintaining existing material; their presence does not make them current recommendations.

## Status and sources

This is an implementation-ready **proposed repository update**, extracted on 28 September 2026 from [rasa.com](https://rasa.com/), its current `v2` CSS, and six supplied Figma SVG exports. It is not a newly approved corporate identity manual. Font licensing, final logo masters, print specifications, and proposed component/motion conventions still need the brand owner's sign-off.

The guide uses three evidence levels:

- **Observed:** measured in current `v2` website CSS or supplied SVGs.
- **Adapted:** a reusable implementation of observed styling, with responsive or accessibility adjustments.
- **Proposed:** new guidance where source material gives no authoritative rule.

[Source audit](docs/source-audit.md) records conflicts and limitations. [Machine-readable evidence](evidence/sources.json) records source URLs and hashes. Do not treat obsolete CSS variables or every illustration color as a new brand token.

## Contents

- [Design principles](#design-principles)
- [Logo usage](#logo-usage)
- [Typography](#typography)
- [Color system](#color-system)
- [Layout and components](#layout-and-components)
- [Artwork and motion](#artwork-and-motion)
- [Coding agents](#coding-agents)
- [Use in your project](#use-in-your-project)
- [Repository structure](#repository-structure)
- [Publishing and rights](#publishing-and-rights)

## Design principles

1. **Warm and precise.** Use cream surfaces and dark brown-black text; keep hierarchy readable and surfaces quiet.
2. **Editorial headings, practical interfaces.** Serif headlines create character. Sans-serif body and controls do the work. Monospace labels provide technical context.
3. **Show how the product works.** Skills, conversations, evaluations, releases, and governance are useful subjects. Connectors and status changes must convey an actual relationship.
4. **Use pink selectively.** It can highlight a short phrase, action, icon tile, or selected element. It is not a replacement full-page wash for old purple gradients.
5. **Keep detail purposeful.** Prefer generous space, thin rules, solid fills, and restrained corner radii. Avoid decorative glass, glowing orbs, fractals, rainbow meshes, and generic AI circuitry.

## Logo usage

Use supplied logo artwork; never redraw the wordmark with a font. The current website shows the horizontal outlined speech-bubble Rasa mark in dark ink. Use the existing black horizontal asset as the interim repository default on cream/light backgrounds and the white variant on dark backgrounds. Keep the original geometry and aspect ratio.

Existing assets:

| Configuration | SVG files | Purpose |
| --- | --- | --- |
| Horizontal | `logos/horizontal/svg/` | Default for websites, headers, covers and end cards |
| Square | `logos/square/svg/` | Constrained placements, subject to legibility |
| Historical purple | Existing purple variants | Legacy reproduction, not the default for new work |
| Print/source | `logos/*/print-cmyk/`, `logos/original-ai/` | Existing masters; verify current suitability before print |

Maintain the existing clear-space instruction: at least the width of the speech-bubble line, measured from the bubble's outer edge. This is inherited from the previous guide, not a newly measured identity rule. Give the mark more breathing room when possible. No new minimum logo size is established by these sources: inspect at final output size rather than inventing a pixel minimum.

Do not distort, rotate, crop, recolor to arbitrary accents, place over busy imagery, add effects, or rebuild the mark. An ink-colored master matching `#181210` should be supplied by the brand team rather than silently recoloring the existing black file. Preserve approved partner marks; monochrome customer strips in the exports do not authorize modifying every partner logo.

The previous guide's proportionate “X” pairing convention can remain for genuine joint-brand material until superseded. Do not use it to imply a partnership.

## Typography

The new website uses **three STK Bureau families**, not a single “STK Bureau Book” family.

| Role | CSS family | Observed weight/use |
| --- | --- | --- |
| Editorial headlines | `STK Bureau Serif` | Book 350; smaller feature headings 400; italic emphasis where needed |
| Body, navigation, UI | `STK Bureau Sans` | Book 350; controls and prominent figures 500; 400 and 600 faces also declared |
| Eyebrows, indices, technical labels | `STK Bureau Sans Mono` | Regular font file 400; live label CSS asks for 350, which maps to available face |

“STK BUREAU BOOK” and “STK BUREAU OTHER” were supplied as license/package names. Their legal scope and exact desktop-file naming have not been provided. Do not use “Other” as a CSS family or assume it permits public font redistribution.

### Observed type scale

| Style | Desktop size / line height | Tablet ≤991px | Mobile ≤767px |
| --- | --- | --- | --- |
| Serif display XL | `clamp(52px, 5.56vw, 80px)` / 1.05 | 56 / 60 | 42 / 46 |
| Serif L | 60 / 64 | 44 / 48 | 34 / 38 |
| Serif M / section title | 40 / 44 | 34 / 38 | 28 / 32 |
| Serif S / feature title | 28 / 32 | Same | Same |
| Sans metric XL | 80 / 90, weight 500 | 56 / 62 | 42 / 46 |
| Body L | 20 / 24 | Same | Same |
| Body M | 16 / 22 | Same | Same |
| Body S | 14 / 18 | Same | Same |
| Mono M | 14 / 20 | Same | Same |
| Mono S | 12 / 16 | Same | Same |

Display tracking is approximately −2%; section titles use −0.4px at desktop. Use sentence case for headings and controls. Reserve uppercase for short mono labels, not paragraphs. Avoid default browser bold on editorial headlines. Do not synthesize a missing font weight or italic.

**Long-form community adaptation:** use 18px body text with 1.6 line height and a reading width around 68 characters. This deliberately improves reading comfort over compact homepage copy.

**Fallbacks:** the package proposes Georgia for serif, IBM Plex Sans/Arial for sans, and IBM Plex Mono/system monospace for technical text. IBM Plex Sans was already the previous guide's substitute; the serif and mono fallbacks are proposed, not exact visual matches. No fallback font is bundled or automatically downloaded. Check line wrapping again when licensed fonts are installed.

See [font setup and licensing](docs/fonts.md). Licensed binaries do not belong in this public repository.

## Color system

The current primary palette is **taupe + pink**. Both complete scales are available in [the color reference](docs/colors.md) and `design-system/src/tokens.json`.

| Semantic purpose | Token | HEX |
| --- | --- | --- |
| Page background | `rasa-bg` / taupe 100 | `#FAF6F0` |
| Bright surface / panel | `rasa-surface` / taupe 50 | `#FFFBF5` |
| Subtle surface | taupe 200 | `#F3EEE7` |
| Muted card | `rasa-muted` / taupe 250 | `#EDE8E0` |
| Main text / primary button | `rasa-ink` / taupe 950 | `#181210` |
| Supporting text | `rasa-text-muted` / taupe 700 | `#524A43` |
| Subtle text | taupe 500 | `#888077` — not a general small-text default |
| Decorative border | `rasa-border` / taupe 300 | `#C8C0B6` |
| Primary accent | `rasa-accent` / pink 400 | `#E85A91` |
| Accent tint | `rasa-accent-soft` / pink 100 | `#FCE7EF` |
| Accessible accent text | `rasa-link` / pink 600 | `#AA1E54` — adaptation |
| Input boundary | `rasa-control-border` / taupe 600 | `#696157` — adaptation |

A dark primary button with cream text is the normal CTA. Pink buttons use **dark ink text**, not small white text. Do not use bright pink for ordinary text on cream; consult the measured contrast table. Decorative subtle borders need not define an interactive control: inputs receive the darker boundary token.

Mint, yellow, teal, blue, orange, sage and lavender appear in product diagrams. Keep them scoped to illustration roles; they are not a new set of equally prominent brand colors. Status must include a word and/or icon, never color alone. See [colors](docs/colors.md) for exact values and provenance.

The old CMYK and Pantone specifications describe the former palette. Do not relabel them as matches for the new colors. New print separations and spot-color matches require production proofing; the extracted HEX values are sRGB digital references.

## Layout and components

The implementation uses opt-in `rasa-*` classes rather than changing every element on an existing site.

| Element | Observed baseline | Reusable implementation |
| --- | --- | --- |
| Content frame | Hero maximum width 1440px; gutters 56 / 32 / 20px | `.rasa-container` |
| Sections | Typical padding 92 / 72 / 56px; homepage has section-specific exceptions | `.rasa-section` |
| Primary / secondary CTA | 48px tall, 4px radius, 28px side padding, 16px medium text | `.rasa-button`, `--secondary` |
| Header CTA | 36px tall, 8px radius, 14px text | Observed reference only; larger target preferred in touch-heavy community UI |
| Feature cards | Taupe 250, 16px radius, 24px padding; mobile 20px | `.rasa-card` |
| UI panels | Bright/white surfaces and subtle borders | `.rasa-panel`, adapted 12px radius |
| Labels and status | Compact, softly rounded, flat fills | `.rasa-badge`; success/warning/error extensions |
| Forms, code and tables | Not established by these exports as a complete system | Proposed accessible `.rasa-input`, `.rasa-code`, `.rasa-table` |

The site is not uniformly flat: diagrams use layered panels, gentle depth and perspective. Reserve these effects for product storytelling, not every content card. Do not import the entire Webflow stylesheet into Astro; it mixes old and new styles and contains page-specific behavior.

[Component guidance](docs/components.md) covers interaction states, accessibility, icons and mobile behavior. [Community migration](docs/community-migration.md) maps old choices to new ones.

## Artwork and motion

Use four reusable compositions:

- **Connected skills:** a labeled source and a few readable skill cards joined by thin warm-gray curves.
- **Layered workflow:** one foreground UI panel, supporting context behind it, one clear action or result.
- **Governed system:** team or domain nodes connect to a shared control layer; color identifies domains consistently.
- **Evidence card:** a concise claim paired with a large cropped numeral. Keep essential meaning in readable foreground text.

[Artwork direction and prompt templates](docs/artwork.md) includes compositions, exclusions, output formats, production checks, and rules for truthful UI. [Motion guidance](docs/motion.md) includes timing, sequencing, Remotion and Anime.js examples. Timing values are proposed; they were not recovered from the static exports.

Use vector/code-native diagrams for exact relationships and readable UI. Add final typography and supplied logos in code or layout software. AI-generated artwork should not invent product controls, customer evidence or logos.

## Coding agents

Codex and Claude Code are first-class consumers of this system. The root `SKILL.md` defines a shared implementation workflow: locate the brand source, read the relevant recipe, reuse tokens/components, implement the change, inspect the rendered result and report actual validation.

`AGENTS.md` holds short repository rules; `CLAUDE.md` imports them. Generated copies in `.agents/skills/rasa-brand/` and `.claude/skills/rasa-brand/` make the skill discoverable in each tool. Keep these directories when copying the package.

To add the skill to a consumer project:

```sh
python3 scripts/install-agent-skill.py --target /absolute/path/to/project --agent both
```

The installer preserves existing project instruction files and records a relative path to this full brand checkout. It does not install fonts or dependencies. See [agent setup and workflows](docs/agents.md) for team distribution, invocation examples and maintenance.

## Use in your project

This package is **local and private**, not a published npm package. Copy `design-system/` from this repository into your project or install from a local checkout:

```sh
npm install /absolute/path/to/brand/design-system
```

### Plain CSS / Astro

Import once from the root layout or global stylesheet:

```js
import '@rasahq/brand-tokens/tokens.css';
import '@rasahq/brand-tokens/components.css';
// Only after licensed files are provisioned:
// import '@rasahq/brand-tokens/fonts.css';
```

Apply `class="rasa-theme"` to the page wrapper. See `examples/astro/BrandPage.astro`; adapt its imports if copying individual files.

### Tailwind CSS 4

```css
@import "tailwindcss";
@import "@rasahq/brand-tokens/tailwind-v4.css";
@import "@rasahq/brand-tokens/components.css";
```

Example utilities: `bg-rasa-bg text-rasa-ink font-rasa-serif rounded-rasa-card`, `text-rasa-pink-600`, `rasa-desktop:grid-cols-3`. These are named brand extensions; the package does not replace your project's entire Tailwind theme. Use component classes for the responsive typography recipes.

### Tailwind CSS 3

```js
// tailwind.config.cjs
module.exports = {
  presets: [require('@rasahq/brand-tokens/tailwind-v3')],
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
};
```

Also import `tokens.css` and `components.css` if using component classes. Keep the host site's plugins and content paths. Do not import the v4 theme file in a v3 build.

### JavaScript, Remotion and Anime.js

```js
import {tokens} from '@rasahq/brand-tokens';
const background = tokens.ui.bg;
const durationMs = tokens.motion.reveal;
```

JavaScript tokens contain concrete values, so video rendering does not depend on DOM CSS-variable resolution. Remotion uses frame-driven interpolation and local font readiness; Anime.js uses browser animation with reduced-motion handling and cleanup. See `examples/remotion/` and `examples/anime/`.

### Maintain the system

```sh
cd design-system
npm run build
npm run check
npm run reference  # optional: regenerate docs, HTML and SVG references; requires Python 3
```

Edit `src/tokens.json`, then regenerate. Do not manually maintain separate color constants in Astro, video templates and illustration scripts. Proposed role names and implementation conventions should be reviewed together when the brand evolves.

## Repository structure

This update overlays the existing repository. It does not remove existing assets or assume the attached Figma boards are approved for public redistribution.

| Path | Contents |
| --- | --- |
| `README.md` | This guide |
| `SKILL.md`, `AGENTS.md`, `CLAUDE.md` | Shared coding-agent workflow and repository instructions |
| `.agents/skills/`, `.claude/skills/`, `scripts/` | Skill discovery, synchronization and consumer installation |
| `docs/` | Colors, fonts, component recipes, artwork, motion, community migration and source audit |
| `design-system/` | Token source, generated CSS/JS/types, Tailwind 3/4 adapters and component CSS |
| `examples/` | Astro, Remotion and Anime.js integration examples |
| `artwork/` | Editable original diagram starter and visual reference sheet |
| `evidence/` | Extraction inventory, current CSS excerpts and source provenance |
| `logos/` | Existing logo masters, retained in the parent brand repository |
| `backgrounds/`, `metaphor-illustrations/` | Existing historical assets; no longer default creative direction |

See `preview.html` for a self-contained visual specimen; it deliberately uses fallback fonts until licensed files are configured. It is a reference page, not a reskinned production community site.

## Publishing and rights

Public access to a repository is not permission to redistribute proprietary typefaces or third-party customer logos. Preserve existing Rasa trademark and asset terms. This update does not grant an open-source license to assets or fonts, and does not change the existing permission policy. Before making the code package publicly reusable, the repository owner should choose an explicit code license separately from brand/trademark terms.

Do not commit licensed font files, full private Figma exports, confidential UI data or unapproved customer claims. This proposal contains no font binaries or full Figma exports. Source color inventories are included for auditability.

For brand questions, current artwork, licensing and approvals, contact the Rasa Marketing team or your existing Rasa point of contact.

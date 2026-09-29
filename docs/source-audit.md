# Source audit and decisions

Inspected 28 September 2026. The baseline is the current homepage's **v2 implementation**, cross-checked with all six supplied exports. No private Figma document, design-variable library, font license contract or community repository was available.

## Evidence register

| Source | What it establishes | Limits |
| --- | --- | --- |
| Live rasa.com homepage and computed styles | Rendered typography, dark outlined logo, CTA styling and current visual hierarchy | One observed viewport; not a complete product design system |
| Homepage Webflow stylesheet, URL/hash in `evidence/sources.json` | Full primary scales, semantic aliases, declared fonts, responsive CSS | Also includes stale palettes, fonts, unused primitives and pending tokens |
| `Homepage.svg`, 9524 × 11856 | Large design board containing desktop/mobile layouts and alternatives | Gray and green board surrounds are not page backgrounds; variants are not all production decisions |
| `Hero section.svg`, 390 × 682 | Mobile editorial hero, italic emphasis, CTA pair and trust marks | Headline differs from live homepage |
| `Workflow.svg`, 390 × 2495 | Build/test/release/improve sequence, layered UI and statuses | Outlined text; exact font metrics not recoverable |
| `Skills.svg`, 1080 × 1080 | Thin connectors, white skill cards, pink icon tiles, mint status, yellow source node | These are diagram colors and dimensions, not universal UI rules |
| `Governed system section.svg`, 390 × 1584 | Domain colors, shared governance, skill ownership and card patterns | Distinct conceptual page content; not automatically homepage copy |
| `Regulated deployment - B.svg`, 390 × 1366 | Cropped numeral evidence cards and pink phrase emphasis | Claims are unverified design copy and are not reissued as facts |
| Public `rasahq/brand`, tree SHA in source manifest | Existing logo paths and prior README | Old guide still describes purple/gradients/Söhne |

Every SVG's fills, strokes, radii, opacity values, dimensions and hash are recorded in `evidence/svg-inventory.json`. Counts measure SVG elements, **not visual area or importance**. Outlined letters can dominate counts; embedded raster-image colors are not included. All six files contain zero `<text>` nodes. Exact copy was read from rendered references, not reconstructed from path geometry.

## Conflicts resolved

1. The website contains `--_brand--primitives---color--taupe-*`, `--_brand--pending-*`, old `--colors--rasa-blue`, and current `--_color--global-tokens---primary--taupe-*`. Their values differ. The v2 semantic aliases point to the **global primary taupe/pink scales**, so those power this package. Other families remain in evidence only.
2. Global h1/h2 rules still mention Söhne. Current homepage `.v2_type.is-serif-*` overrides them. The new package explicitly sets STK families and does not inherit the generic rules.
3. Current CSS defines Sans/Serif Book files at weight 350, not 400. Mono labels ask for 350 but only a Regular 400 mono face is declared. Package mono styles use 400 to avoid an ambiguous weight request.
4. Figma hero copy and mobile sizes are not identical to live homepage choices. Live responsive typography drives implementation; exports drive additional visual patterns. The package does not reproduce site marketing copy as reusable factual claims.
5. Figma has white UI cards; website semantic panels use taupe 50. Both are recorded. White is a diagram/UI detail color; cream is the default content surface.
6. Some legacy artwork and CTA textures remain on the site. The operator explicitly retired fractals and gradients for new brand work. No decorative gradient requirement is carried forward. Existing texture does not establish a new universal background rule.

## Observed versus proposed

**Observed:** both primary color scales; all current semantic aliases; font declarations; desktop/tablet/mobile type sizes; 1440px hero maximum; 56/32/20 gutters; 48px CTA; 4/8/12/16 radii in specified contexts; 24px card padding; product illustration motifs.

**Adapted:** normalized token names; single shared container across page sections; flexible min-height buttons to support wrapped labels; readable long-form body; scoped CSS classes; contrast-safe links, focus and inputs; concrete JS token values; Tailwind adapters.

**Proposed:** motion timing/easing; video safe areas and storyboard durations; hover/disabled/error states; general forms, table and code styles; diagram starter; public fallback serif/mono fonts; distribution structure and package name. The package name is not a claim of npm ownership or publication.

## Approval items before an official release

- Confirm any revised clear-space/minimum-size rules and print specifications. The 29 September logo update now includes exact live horizontal geometry in ink, plus clearly labeled square/reverse adaptations; see `evidence/logo-sources/manifest.json`.
- Confirm which licensed font files correspond to Book/Other packages and permitted use across web domains, desktop tools, rendered video and contractors. Do not infer rights from CDN accessibility.
- Confirm public code licensing and asset/trademark permissions separately.
- Approve proposed accessibility, motion, long-form and interaction extensions.
- Supply new print profiles/spot-color specifications if print output is needed.
- Confirm whether conceptual Figma copy and customer examples are approved for use.

## Re-extraction procedure

Fetch the homepage, follow its stylesheet URL, record hashes, inspect the rendered v2 elements, and compare current semantic references. Do not merge every CSS hex into primary tokens. For changed SVG exports, rerun an attribute inventory and visually inspect the boards. Update the source JSON, rebuild adapters and run contrast/build checks. Font-layout acceptance requires the licensed production fonts.

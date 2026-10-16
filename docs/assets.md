# Asset selection and production

Use `python3 scripts/brand.py find QUERY --category logo|icon|pattern --format svg|png|webp` and select an exact ID. IDs include the format. Query results default to current assets; `--include-reference` also exposes reference and archived files. `assets/catalog.json` is the full machine-readable index. Paths are relative to the repository root; IDs are stable path-derived keys, not fuzzy names.

## Logos

`assets/logos/digital/` contains supplied October SVG and transparent PNG masters. Ink is #181210, cream #FAF6F0, pink #E85A91. Preserve paths, whitespace, and original proportions; never typeset or redraw the wordmark. Use Ink on cream; cream on ink. The supplied square configuration has its own proportions; use `height:auto`, not a forced square crop. Do not apply filters to recolor images.

`logos/current/` is the earlier September website-derived/adapted collection. Keep those paths for compatibility; new work uses `assets/logos/`. Its #FFFBF5 reverse variant is not the latest cream master. Earlier black/purple/white variants elsewhere under `logos/` are historical. No newly approved minimum-size or clear-space dimensions were supplied; inspect at final size and preserve generous clear space. The inherited guide's bubble-line clear-space convention remains an inherited instruction, not a new measurement.

Print masters are in `assets/logos/print/`: vector PDF/EPS, no background. Supplied process recipes: Ink C71 M68 Y67 K84; Cream C0 M2 Y4 K2; Pink C0 M78 Y13 K0. No printer ICC, PDF/X certification, or spot separation is asserted. Source swatches and Illustrator file are under `assets/reference/colors/`.

## Icons

`assets/icons/svg/` has 27 current 24×24 SVGs. Preserve their pixel-fitted geometry and use their supplied Ink color. The source README says 23; the actual current folder contains 27. PNG exports are separate source files and are not assumed to cover every SVG; query the catalog for availability. A 48×48 source is displayed at 24×24. Never choose an archived export because its filename is familiar.

Use `alt=""` for decorative icons adjacent to text, and an accessible name on the containing control for icon-only actions. Do not turn a decorative SVG into the sole accessible label. Inline SVG IDs must be made instance-unique if duplicated; `<img>` is the simplest geometry-preserving default. CurrentColor is not inherited through `<img>`.

## Backgrounds and patterns

There are 60 pattern/tone combinations: four primary families and sixteen additional families, each in Light, Dark, and Pink. Each has an exact supplied SVG master and PNG source. The two uploaded pattern archives are identical by relative path and SHA-256 and are included once.

| Use | Preferred format | Rule |
| --- | --- | --- |
| Astro hero or CTA | `assets/patterns/{primary,additional}/web/*.webp` | Decorative image, solid text panel, no inline master |
| Newsletter | Supplied PNG hosted at an absolute HTTPS URL | Optional decoration; message readable with images off |
| Print/layout editing | Supplied SVG or PNG as production requires | Inspect raster/vector behavior in the chosen output workflow |
| Background discovery | [Asset selection](../ASSETS.md) | Compare tones visually before selection |

The SVG masters total roughly 111 MB and contain extensive paths. Do not inline them into a page, use them as interactive DOM, or paste them into agent context. The generator creates bounded WebP derivatives from supplied PNGs; it never changes the masters. Do not tile unless the seams were checked: these are finite compositions, not certified seamless textures.

The dark and pink variants use dark fields; light variants use cream fields. Use a solid cream or ink panel to guarantee foreground contrast. When art is exposed behind a headline, inspect the actual crop at desktop and mobile; a palette contrast ratio alone does not validate it. Prefer `object-fit:cover`, a fixed aspect ratio, and `alt=""`; content and CTAs remain HTML. Avoid essential information in backgrounds. Default to static patterns; motion is an adaptation and must honor reduced motion.

## Source references

Presentations: copy the supplied deck before editing. Its template reference explicitly selects Newsreader, Inter, and JetBrains Mono; it also says to keep busy Dotfield areas away from text. Example statistics, testimonials, and offers are source content, not a reusable claim library.

Signatures: the supplied document includes regional variants and asks users to change only personal details. Preserve the supplied company/legal blocks and security-team-managed footer behavior. It is not a general newsletter specification.

Partner logos: `assets/reference/partners/` is reference-only in the exporter. Presence in a handoff does not authorize a new endorsement or partnership claim.

## Export into an app

```sh
python3 scripts/brand.py export \
  --id logos.digital.rasa-logo-horizontal-ink.svg \
  --id icons.svg.voice.svg \
  --id patterns.primary.web.soundwave-01-light.webp \
  --target /path/to/app/public/brand
```

The destination retains paths relative to `assets/`. For this target the image URLs begin `/brand/logos/`, `/brand/icons/`, and `/brand/patterns/`. Existing differing files cause a failure before copying; use `--force` only when replacing those assets is intended. Font exports automatically include their adjacent OFL license. An app deployed beneath a base path must prefix URLs with its configured base.

## Reproduce this source import

Place the original handoff ZIPs in one directory, then run `python3 scripts/import-october-handoff.py --input /path/to/zips` followed by `python3 scripts/build-assets.py`. The importer is specific to the October handoff layout; for a later handoff review classifications and source conflicts before using it. It excludes proprietary fonts, deduplicates exact bytes, preserves raw token exports, and rewrites coverage/catalog metadata. Commit source updates together with their regenerated outputs. Run validation to detect stale or uncataloged assets; do not treat import success as brand approval.

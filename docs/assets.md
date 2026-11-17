# Asset selection and production

Use `python3 scripts/brand.py find QUERY --category logo|icon|pattern --format svg|png|webp` and select an exact ID. IDs include the format. Query results default to current assets; `--include-reference` also exposes reference and archived files. `assets/catalog.json` is the full machine-readable index. Paths are relative to the repository root; IDs are stable path-derived keys, not fuzzy names.

## Current set: `assets/brand-2026/`

The Rasa Brand 2026 design system names its artwork in four groups. This repository holds them under the same names; see [ASSETS.md](../ASSETS.md#parity-with-the-design-system) for which files are exact exports and which are derived.

| Group | Files | Rule |
| --- | --- | --- |
| Logos | `rasa-logo-full-{taupe-dark,taupe-light,pink}.svg`, `rasa-logo-icon-{…}.svg`, `png/rasa-logo-full-*@4x.png` | Logo Full by default, icon (R) where space is tight. Taupe Dark on light, Taupe Light on dark, Pink for accent moments only. Keep proportions and clear space; no effects or recolouring |
| IconsGeneric | `rasa-icon-<name>.svg` (27) | 24 × 24 grid, 2px line, solid, single colour; 24/48/96px, never below 16px; change the fill to Taupe Light on dark grounds, Pink only for an active state |
| Textures | `rasa-{chladni-01,chladni-02,soundwave-01,soundwave-02}-{subtle-dark,subtle-light,accent}.svg`, `web/*.webp` | One pattern per layout; never mix Chladni and Soundwave; bleed off an edge; never stretch; accent only for hero moments and never behind text |
| Backgrounds | `rasa-bg-chladni-0{1,2}-{dark,light}.svg` | Pending export (see `assets/brand-2026/Backgrounds/README.md`) |

Use `<img>` for SVG logos and icons (they do not inherit `currentColor`), `alt=""` for decorative icons beside a label, and an accessible name on icon-only controls. Never inline the texture SVGs (≈0.5–1 MB each) into a page or into agent context; use the WebP derivatives for web backgrounds with `object-fit: cover`, a fixed aspect ratio and `alt=""`. Keep content and CTAs in HTML and off the busy dot fields.

Email needs PNG: host `Logos/png/rasa-logo-full-taupe-dark@4x.png` at an absolute HTTPS URL and set its display width (84px wide = 40px high).

## October masters (reference)

`assets/logos/` (digital SVG/PNG and print PDF/EPS), `assets/icons/` and `assets/patterns/` are the October 2026 supplied masters. They are kept with status `reference` and are the sources the Brand 2026 files are derived from. Print process recipes: Taupe Dark C71 M68 Y67 K84 (Pantone Black 4 C), Taupe Light C0 M2 Y4 K2, Rasa Pink C0 M78 Y13 K0 (Pantone 7423 C); no ICC profile or spot separation is asserted. `logos/` at the repository root holds September and purple-era files for compatibility only. The 16 additional pattern families and the square logo lock-up are not part of Brand 2026.

## Source references

Presentations: new decks follow the design system's slide layer and the `rasa-slides` skill. The October deck in `assets/reference/presentations/` is a historical reference; its example statistics, testimonials and offers are not a reusable claim library.

Signatures: the supplied document includes regional variants and asks users to change only personal details. Preserve the supplied company/legal blocks and security-team-managed footer behavior. It is not a general newsletter specification.

Partner logos: `assets/reference/partners/` is reference-only in the exporter. Presence in a handoff does not authorize a new endorsement or partnership claim.

## Export into an app

```sh
python3 scripts/brand.py export \
  --id brand-2026.Logos.rasa-logo-full-taupe-dark.svg \
  --id brand-2026.IconsGeneric.rasa-icon-voice.svg \
  --id brand-2026.Textures.web.rasa-soundwave-01-subtle-light.webp \
  --target /path/to/app/public/brand
```

The destination retains paths relative to `assets/`. For this target the image URLs begin `/brand/brand-2026/Logos/`, `/brand/brand-2026/IconsGeneric/` and `/brand/brand-2026/Textures/web/`. Only `current` assets export. Existing differing files cause a failure before copying; use `--force` only when replacing those assets is intended. Font exports automatically include their adjacent OFL license. An app deployed beneath a base path must prefix URLs with its configured base.

## Reproduce this source import

Place the original handoff ZIPs in one directory, then run `python3 scripts/import-october-handoff.py --input /path/to/zips`, `python3 scripts/build-assets.py` and `python3 scripts/build-brand-2026-assets.py`. The importer is specific to the October handoff layout; for a later handoff review classifications and source conflicts before using it. It excludes proprietary fonts, deduplicates exact bytes, preserves raw token exports, and rewrites coverage/catalog metadata. Commit source updates together with their regenerated outputs. Run validation to detect stale or uncataloged assets; do not treat import success as brand approval.

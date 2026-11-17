# Asset selection

Start with the task, pick an exact asset ID, and export only the files you need. The current set uses the **Rasa Brand 2026** names (`assets/brand-2026/`). The October masters (`assets/logos/`, `assets/icons/`, `assets/patterns/`) stay as `reference` sources.

| Task | Read | Selection rule |
| --- | --- | --- |
| Logo on a light ground | [Logo reference](docs/asset-logos.md) | `rasa-logo-full-taupe-dark.svg` (Logo Full) |
| Logo on a dark ground | [Logo reference](docs/asset-logos.md) | `rasa-logo-full-taupe-light.svg` |
| Hero or accent moment | [Logo reference](docs/asset-logos.md) | `rasa-logo-full-pink.svg`, never as the everyday logo |
| Small mark, avatar, favicon | [Logo reference](docs/asset-logos.md) | `rasa-logo-icon-*.svg` (the R). Community cards always use Logo Full |
| Email logo | [Logo reference](docs/asset-logos.md) | `Logos/png/rasa-logo-full-*@4x.png` |
| Interface icon | [Icon reference](docs/asset-icons.md) | `rasa-icon-<name>.svg`, 24/48/96px, never below 16px |
| Background texture | [Pattern reference](docs/asset-patterns.md) | One Chladni or Soundwave per layout, subtle treatment behind content, accent only for hero moments and never behind text |
| Slide background | `assets/brand-2026/Backgrounds/README.md` | Pending export from the design system |
| Print, slide, partner or signature source | [Production rules](docs/assets.md) | Query reference assets explicitly; do not infer reuse rights |

## Query and export

```sh
python3 scripts/brand.py find logo-full --category logo --format svg
python3 scripts/brand.py find voice --category icon --format svg
python3 scripts/brand.py find soundwave --category pattern --format webp
python3 scripts/brand.py export \
  --id brand-2026.Logos.rasa-logo-full-taupe-dark.svg \
  --id brand-2026.Textures.web.rasa-soundwave-01-subtle-light.webp \
  --target /path/to/app/public/brand
```

The export keeps paths relative to `assets/`: the logo lands at `/brand/brand-2026/Logos/rasa-logo-full-taupe-dark.svg`. Adapt the URL prefix to the deployment base. Existing differing files are protected; font exports carry the OFL licence.

## Parity with the design system

The design system keeps its artwork in an asset store that is not exported file by file. `scripts/build-brand-2026-assets.py` derives the same artwork, under the same names and inks, from the masters in this repo; each catalog entry records `designSystem.parity` (`exact` or `derived`) and the design system's own SHA-256. Drop an exact export in place and run `python3 scripts/build-brand-2026-assets.py --catalog-only` to upgrade it. The four slide Backgrounds are pending.

## Machine-readable sources

- [Catalog](assets/catalog.json): IDs, paths, status, format, bytes, SHA-256, roles, provenance and derivation.
- [Catalog schema](assets/catalog.schema.json): record structure.
- [Design-system lock](evidence/brand-2026/artifact-files.json): every file and asset of the Rasa Brand 2026 design system with its hash.
- [Coverage](evidence/source-coverage.json): every October source-file disposition.
- [Source audit](docs/source-audit.md): authority, conflicts and gaps.

Search the compact CLI output before reading the full catalog. Never load large texture SVGs into agent context. `current` means part of the current set; it does not approve a new claim, composition or third-party endorsement.

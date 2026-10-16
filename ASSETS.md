# Asset selection

For agents, start with the task below, select an exact asset ID, and export only the required files. The linked Markdown references render directly in GitHub. Images support visual inspection; IDs and source paths are the implementation contract.

| Task | Read | Selection rule |
| --- | --- | --- |
| Logo on a light surface | [Logo reference](docs/asset-logos.md) | Current horizontal Ink SVG |
| Logo on a dark surface | [Logo reference](docs/asset-logos.md) | Current horizontal Cream SVG; preserve proportions |
| Interface icon | [Icon reference](docs/asset-icons.md) | Current 24×24 SVG; keep supplied Ink artwork on a light surface |
| Hero or CTA background | [Pattern reference](docs/asset-patterns.md) | Primary Soundwave or Chladni WebP; text on a solid panel |
| Print, slide, partner or signature source | [Production rules](docs/assets.md) | Query reference assets explicitly; do not infer reuse rights |

## Query and export

```sh
python3 scripts/brand.py find horizontal-ink --category logo --format svg
python3 scripts/brand.py find voice --category icon --format svg
python3 scripts/brand.py find soundwave --category pattern --format webp
python3 scripts/brand.py export \
  --id logos.digital.rasa-logo-horizontal-ink.svg \
  --id patterns.primary.web.soundwave-01-light.webp \
  --target /path/to/app/public/brand
```

The export retains paths relative to `assets/`: the selected logo becomes `/brand/logos/digital/rasa-logo-horizontal-ink.svg` for this app layout. Adapt the URL prefix to the deployment base. Existing differing files are protected; font exports carry the OFL license.

## Machine-readable sources

- [Catalog](assets/catalog.json): exact IDs, paths, status, format, byte size, SHA-256, roles, source provenance, and derivative metadata.
- [Catalog schema](assets/catalog.schema.json): record structure.
- [Coverage](evidence/source-coverage.json): every original source-file disposition.
- [Source audit](docs/source-audit.md): authority, conflicts, and missing source categories.

Search the compact CLI output before reading the full catalog. Never load large pattern SVG masters into agent context. `current` means part of the current supplied set; it does not approve a new claim, composition, or third-party endorsement.

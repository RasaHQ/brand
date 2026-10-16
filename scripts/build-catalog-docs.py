#!/usr/bin/env python3
"""Generate GitHub-readable asset selection references from the catalog (stdlib only)."""
from pathlib import Path
import json
R=Path(__file__).resolve().parents[1]
items=json.loads((R/'assets/catalog.json').read_text())['assets']
intro='''# Asset selection

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
python3 scripts/brand.py export \\
  --id logos.digital.rasa-logo-horizontal-ink.svg \\
  --id patterns.primary.web.soundwave-01-light.webp \\
  --target /path/to/app/public/brand
```

The export retains paths relative to `assets/`: the selected logo becomes `/brand/logos/digital/rasa-logo-horizontal-ink.svg` for this app layout. Adapt the URL prefix to the deployment base. Existing differing files are protected; font exports carry the OFL license.

## Machine-readable sources

- [Catalog](assets/catalog.json): exact IDs, paths, status, format, byte size, SHA-256, roles, source provenance, and derivative metadata.
- [Catalog schema](assets/catalog.schema.json): record structure.
- [Coverage](evidence/source-coverage.json): every original source-file disposition.
- [Source audit](docs/source-audit.md): authority, conflicts, and missing source categories.

Search the compact CLI output before reading the full catalog. Never load large pattern SVG masters into agent context. `current` means part of the current supplied set; it does not approve a new claim, composition, or third-party endorsement.
'''
(R/'ASSETS.md').write_text(intro)
for category,fmt,name in [('logo','svg','logos'),('icon','svg','icons'),('pattern','webp','patterns')]:
 selected=[a for a in items if a['category']==category and a['format']==fmt and a['status']=='current']
 rules={'logo':'Use supplied geometry and proportions. Ink belongs on light surfaces; Cream on dark surfaces. Cream is #FAF6F0. GitHub’s page background can hide a cream logo; choose by the documented tone rather than thumbnail visibility. Export PNG for email when required.','icon':'These are the 27 current SVG icons, exported on a 24×24 canvas. Use empty alt text beside a visible label; label the containing control for icon-only actions. Preserve supplied Ink geometry. Archived icons are excluded.','pattern':'Use primary patterns first. Light variants have light fields; Dark and Pink variants have dark fields. Keep text on a solid panel. These WebP derivatives are for web use; query matching SVG/PNG files for masters and other production workflows. Finite compositions are not certified seamless tiles.'}[category]
 rows=[f'# {name.title()} reference','',rules,'','[Selection workflow](../ASSETS.md) · [Production rules](assets.md)','', 'Generated from `assets/catalog.json`; do not edit rows manually. Exact IDs include the file format.','']
 tiers=['primary','additional'] if category=='pattern' else [None]
 for tier in tiers:
  if tier:rows += ['## '+tier.title(),'']
  rows += ['| Preview | Exact asset ID | File | Usage / size |','| --- | --- | --- | --- |']
  for a in selected:
   if tier and a['tier']!=tier:continue
   link='../'+a['path'];label=Path(a['path']).stem
   # Standard Markdown images render in GitHub without custom styles or JavaScript.
   rows.append(f'| ![{label}]({link}) | `{a["id"]}` | [Open {fmt.upper()}]({link}) | {a.get("tone", "current")} · {a["bytes"]:,} bytes |')
  rows+=['']
 (R/'docs'/f'asset-{name}.md').write_text('\n'.join(rows).rstrip()+'\n')
print('Generated ASSETS.md and logo/icon/pattern Markdown references.')

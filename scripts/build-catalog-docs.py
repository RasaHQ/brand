#!/usr/bin/env python3
"""Generate GitHub-readable asset selection references from the catalog (stdlib only)."""
from pathlib import Path
import json
R=Path(__file__).resolve().parents[1]
items=json.loads((R/'assets/catalog.json').read_text())['assets']
intro='''# Asset selection

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
python3 scripts/brand.py export \\
  --id brand-2026.Logos.rasa-logo-full-taupe-dark.svg \\
  --id brand-2026.Textures.web.rasa-soundwave-01-subtle-light.webp \\
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
'''
(R/'ASSETS.md').write_text(intro)
for category,fmt,name in [('logo','svg','logos'),('icon','svg','icons'),('pattern','webp','patterns')]:
 selected=[a for a in items if a['category']==category and a['format']==fmt and a['status']=='current']
 if category=='logo':selected+=[a for a in items if a['category']=='logo' and a['format']=='png' and a['status']=='current']
 rules={'logo':'Logo Full (the RASA speech bubble) by default; the icon (R) where space is tight or the brand is already established. Taupe Dark #181210 on light grounds, Taupe Light #FAF6F0 on dark grounds, Rasa Pink #E85A91 for accent moments only. On slides: 32px high at x 80, y 48; 64px and centred on Opening and Closing. No recolouring outside these three inks, no stretching, rotation, outlines, shadows or effects; keep the clear space. GitHub may hide a Taupe Light logo on a light page: choose by the documented ink, not the thumbnail.','icon':'The 27 brand icons: pixel-aligned on a 24 × 24 grid (20 × 20 safe area, 2px line), solid, single colour. Taupe Dark on light, Taupe Light on dark (change the SVG fill when placing), Pink only for an active state. Sizes 24, 48 or 96px; never below 16px. Inside UI visuals use Phosphor Regular instead. Use empty alt text beside a visible label; label the control for icon-only actions.','pattern':'Two dotted patterns on one dot grid: Chladni (diagonal X or cross) and Soundwave (horizontal waveform), each in three treatments. Subtle dark: Taupe 800 dots on Taupe Dark. Subtle light: Taupe 300 dots on Taupe Light. Accent: Rasa Pink dots on Taupe Dark, hero moments only, never behind text. One pattern per layout; never mix Chladni and Soundwave; bleed off at least one edge; scale uniformly; the soundwave always runs horizontally; keep text areas clear. WebP files are web derivatives of the SVG masters.'}[category]
 rows=[f'# {name.title()} reference','',rules,'','[Selection workflow](../ASSETS.md) · [Production rules](assets.md)','', 'Generated from `assets/catalog.json`; do not edit rows manually. Exact IDs include the file format.','']
 tiers=[None]
 for tier in tiers:
  if tier:rows += ['## '+tier.title(),'']
  rows += ['| Preview | Exact asset ID | File | Usage / size |','| --- | --- | --- | --- |']
  for a in selected:
   if tier and a['tier']!=tier:continue
   link='../'+a['path'];label=Path(a['path']).stem
   # Standard Markdown images render in GitHub without custom styles or JavaScript.
   parity=a.get('designSystem',{}).get('parity','')
   rows.append(f'| ![{label}]({link}) | `{a["id"]}` | [Open {a["format"].upper()}]({link}) | {a.get("tone", "current")} · {parity} · {a["bytes"]:,} bytes |')
  rows+=['']
 (R/'docs'/f'asset-{name}.md').write_text('\n'.join(rows).rstrip()+'\n')
print('Generated ASSETS.md and logo/icon/pattern Markdown references.')

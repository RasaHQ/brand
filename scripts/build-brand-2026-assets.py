#!/usr/bin/env python3
"""Build assets/brand-2026/ under the Rasa Brand 2026 file names.

The design system keeps its logos, icons, textures and backgrounds in an asset
store that cannot be exported file-by-file from here. This script derives the
same artwork, under the same names and inks, from masters already in this repo:

- Logos: Logo Full geometry (skills/rasa-community-cards/assets/logo-full.svg) and
  the R mark path from the design system's component bundle, in the three inks.
- IconsGeneric: the 27 October icons (Taupe Dark), renamed rasa-icon-<name>.svg.
- Textures: the October Chladni/Soundwave masters, with the subtle-light dots
  moved to Taupe 300 (#C8C0B6) as the design system specifies.
- Textures/web: 1200 px WebP derivatives for web backgrounds, and Logos/png: 4x PNG
  logos for email (needs Playwright + Pillow).

Backgrounds (finished 16:9 slides with the readability gradient) are not
derivable and stay pending until exported from the design system.

Every output records the design system's own SHA-256 so `validate-brand.py`
can tell a derived file from an exact export. Drop an exact export in place
and re-run `python3 scripts/build-brand-2026-assets.py --catalog-only`.
"""
from pathlib import Path
import argparse, hashlib, json, re, sys

R = Path(__file__).resolve().parents[1]
OUT = R / 'assets' / 'brand-2026'
LOCK = json.loads((R / 'evidence/brand-2026/artifact-files.json').read_text())
EXPECTED = {Path(a['path']).name: a for a in LOCK['assets']}
INKS = {'taupe-dark': '#181210', 'taupe-light': '#FAF6F0', 'pink': '#E85A91'}
ICONS = ['agents', 'approach', 'arrow', 'bell', 'book', 'challenge', 'check', 'chevron', 'clock', 'close',
         'customer-support', 'developer-tools', 'heart', 'home', 'mail', 'next', 'padlock', 'plus', 'results',
         'search', 'skills', 'star', 'studio', 'tools', 'user', 'voice', 'voice-connected']
TEXTURE_SRC = {'subtle-dark': 'dark', 'subtle-light': 'light', 'accent': 'pink'}


def mark_path() -> str:
    bundle = (R / 'design-system/rasa-brand-2026/components/bundle.js').read_text()
    m = re.search(r'var MARK = "([^"]+)"', bundle)
    if not m:
        sys.exit('R mark path not found in the component bundle')
    return m.group(1)


def write(path: Path, data: bytes, provenance: dict, records: list):
    path.parent.mkdir(parents=True, exist_ok=True)
    if not path.exists() or path.read_bytes() != data:
        path.write_bytes(data)
    records.append({'path': str(path.relative_to(R)), **provenance})


def build(records: list):
    full = (R / 'skills/rasa-community-cards/assets/logo-full.svg').read_text()
    mark = mark_path()
    for ink, hexv in INKS.items():
        svg = full.replace('currentColor', hexv)
        write(OUT / 'Logos' / f'rasa-logo-full-{ink}.svg', svg.encode(),
              {'derivedFrom': 'skills/rasa-community-cards/assets/logo-full.svg', 'derivation': f'fill {hexv}'}, records)
        icon = (f'<svg width="64" height="64" viewBox="22 22 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">\n'
                f'<path fill-rule="evenodd" clip-rule="evenodd" d="{mark}" fill="{hexv}"/>\n</svg>\n')
        write(OUT / 'Logos' / f'rasa-logo-icon-{ink}.svg', icon.encode(),
              {'derivedFrom': 'design-system/rasa-brand-2026/components/bundle.js#MARK', 'derivation': f'fill {hexv}'}, records)
    for name in ICONS:
        src = R / 'assets/icons/svg' / f'{name}.svg'
        write(OUT / 'IconsGeneric' / f'rasa-icon-{name}.svg', src.read_bytes(),
              {'derivedFrom': str(src.relative_to(R)), 'derivation': 'renamed; Taupe Dark artwork unchanged'}, records)
    for pattern in ['chladni-01', 'chladni-02', 'soundwave-01', 'soundwave-02']:
        for treatment, tone in TEXTURE_SRC.items():
            src = R / 'assets/patterns/primary/svg' / f'{pattern}-{tone}.svg'
            data = src.read_bytes()
            note = 'renamed'
            if treatment == 'subtle-light':
                data = data.replace(b'fill="#E7DED2"', b'fill="#C8C0B6"')
                note = 'renamed; dots #E7DED2 -> Taupe 300 #C8C0B6'
            write(OUT / 'Textures' / f'rasa-{pattern}-{treatment}.svg', data,
                  {'derivedFrom': str(src.relative_to(R)), 'derivation': note}, records)


def build_web(records: list):
    try:
        from playwright.sync_api import sync_playwright
        from PIL import Image
    except ImportError:
        print('Skipping WebP derivatives: install playwright and Pillow.')
        return
    import io
    web = OUT / 'Textures' / 'web'
    web.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as pw:
        b = pw.chromium.launch()
        page = b.new_page(viewport={'width': 1200, 'height': 1200})
        for svg in sorted((OUT / 'Textures').glob('*.svg')):
            page.set_content(f'<html><body style="margin:0">{svg.read_text()}</body></html>')
            page.evaluate("()=>{const s=document.querySelector('svg');s.setAttribute('width',1200);s.setAttribute('height',1200);}")
            png = page.screenshot(clip={'x': 0, 'y': 0, 'width': 1200, 'height': 1200})
            buf = io.BytesIO()
            Image.open(io.BytesIO(png)).convert('RGB').save(buf, 'WEBP', quality=86, method=6)
            write(web / (svg.stem + '.webp'), buf.getvalue(),
                  {'derivedFrom': str(svg.relative_to(R)), 'derivation': 'Chromium 1200 px raster, WebP q86'}, records)
        # PNG logos for email and other places that cannot take SVG: Logo Full at 4x (340 x 160).
        for svg in sorted((OUT / 'Logos').glob('rasa-logo-full-*.svg')):
            page.set_viewport_size({'width': 340, 'height': 160})
            page.set_content('<html><body style="margin:0;background:transparent">' + svg.read_text().replace('width="85" height="40"', 'width="340" height="160"') + '</body></html>')
            png = page.screenshot(clip={'x': 0, 'y': 0, 'width': 340, 'height': 160}, omit_background=True)
            write(OUT / 'Logos' / 'png' / (svg.stem + '@4x.png'), png,
                  {'derivedFrom': str(svg.relative_to(R)), 'derivation': 'Chromium raster, 340 x 160, transparent'}, records)
        b.close()


def catalog(records: list):
    cat_path = R / 'assets/catalog.json'
    cat = json.loads(cat_path.read_text())
    keep = [a for a in cat['assets'] if not a['path'].startswith('assets/brand-2026/')]
    group_cat = {'Logos': 'logo', 'IconsGeneric': 'icon', 'Textures': 'pattern'}
    by_path = {r['path']: r for r in records}
    for p in sorted((OUT).rglob('*')):
        if not p.is_file() or p.name == 'README.md':
            continue
        rel = str(p.relative_to(R))
        group = p.relative_to(OUT).parts[0]
        data = p.read_bytes()
        digest = hashlib.sha256(data).hexdigest()
        exp = EXPECTED.get(p.name)
        prov = by_path.get(rel, {})
        item = {
            'id': 'brand-2026.' + '.'.join(p.relative_to(OUT).parts),
            'path': rel, 'category': group_cat[group], 'status': 'current', 'format': p.suffix[1:],
            'sha256': digest, 'bytes': len(data),
            'roles': {'logo': ['web', 'slides', 'email', 'community-cards'], 'icon': ['web', 'slides'],
                      'pattern': ['web-background', 'slides'] if p.suffix == '.svg' else ['web-background']}[group_cat[group]],
            'rights': 'Rasa brand assets; trademark terms apply',
            'sources': [{'archive': 'Rasa Brand 2026 design system', 'path': f'assets/{group}/{p.name}' if exp else rel}],
            'designSystem': {'group': group, 'name': p.name if exp else None,
                             'sha256': exp['sha256'] if exp else None,
                             'parity': ('exact' if exp and exp['sha256'] == digest else 'derived') if exp else 'web-derivative'},
        }
        if p.suffix == '.png':
            item['roles'] = ['email', 'documents']
            item['designSystem']['parity'] = 'raster-derivative'
        if group == 'Textures':
            stem = p.stem
            item['tier'] = 'primary'
            item['tone'] = 'dark' if 'dark' in stem or 'accent' in stem else 'light'
            item['decorative'] = True
            if p.suffix == '.webp':
                item.update({'width': 1200, 'height': 1200})
        if prov:
            item['derivedFrom'] = prov['derivedFrom']
            item['derivation'] = prov['derivation']
        keep.append(item)
    # The October logos, icons and patterns stay in the repo as reference masters; Brand 2026 names are current.
    legacy = {'logo': 'assets/brand-2026/Logos/', 'icon': 'assets/brand-2026/IconsGeneric/', 'pattern': 'assets/brand-2026/Textures/'}
    for a in keep:
        if a['path'].startswith('assets/brand-2026/') or a['category'] not in legacy:
            continue
        if a['status'] == 'current':
            a['status'] = 'reference'
            a['supersededBy'] = legacy[a['category']]
    keep.sort(key=lambda a: a['path'])
    cat['assets'] = keep
    cat_path.write_text(json.dumps(cat, indent=2, ensure_ascii=False) + '\n')
    print(f"Catalogued {sum(a['path'].startswith('assets/brand-2026/') for a in keep)} Brand 2026 assets.")


if __name__ == '__main__':
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--catalog-only', action='store_true', help='re-catalog files already in assets/brand-2026/')
    ap.add_argument('--no-web', action='store_true', help='skip WebP derivatives')
    a = ap.parse_args()
    recs: list = []
    if a.catalog_only:
        old = json.loads((R / 'assets/catalog.json').read_text())['assets']
        recs = [{'path': i['path'], 'derivedFrom': i['derivedFrom'], 'derivation': i['derivation']}
                for i in old if i['path'].startswith('assets/brand-2026/') and 'derivedFrom' in i]
    else:
        build(recs)
        if not a.no_web:
            build_web(recs)
    catalog(recs)

#!/usr/bin/env python3
"""Report whether the licensed STK Bureau fonts are provisioned and match the design-system lock.

Fonts are never committed. Provision them in design-system/rasa-brand-2026/fonts/
or set RASA_FONTS_DIR (shell, CI secret or a git-ignored .env). Exit code 1 when a
required face is missing or differs; use --soft to only report.
"""
from pathlib import Path
import argparse, sys
sys.path.insert(0, str(Path(__file__).resolve().parent))
import rasa_fonts as rf

p = argparse.ArgumentParser(description=__doc__)
p.add_argument('--for', dest='use', choices=sorted(rf.lock()['required_for']), help='check only the faces a renderer needs')
p.add_argument('--soft', action='store_true', help='report without failing')
a = p.parse_args()
names = rf.lock()['required_for'][a.use] if a.use else None
rows = rf.status(names)
print(f'Fonts folder: {rf.fonts_dir()}')
for r in rows:
    print(f"  {r['state']:<8} {r['file']}  ({r['family']} {r['weight']} {r['style']})")
bad = [r for r in rows if r['state'] != 'ok']
if bad:
    print(f'{len(bad)} of {len(rows)} faces not provisioned or not matching the lock. '
          'Renders will fall back to Newsreader / Inter / JetBrains Mono.')
    sys.exit(0 if a.soft else 1)
print(f'All {len(rows)} faces provisioned and verified.')

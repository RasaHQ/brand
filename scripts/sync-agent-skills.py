#!/usr/bin/env python3
"""Generate or verify repository-discoverable copies of the canonical skill."""
from pathlib import Path
import argparse
ROOT = Path(__file__).resolve().parents[1]
p = argparse.ArgumentParser(description=__doc__)
p.add_argument('--check', action='store_true')
a = p.parse_args()
expected = ROOT.joinpath('SKILL.md').read_bytes()
failed = []
for platform in ('.agents', '.claude'):
    folder = ROOT / platform / 'skills' / 'rasa-brand'
    for name, data in [('SKILL.md', expected), ('brand-root.txt', b'../../..\n')]:
        dest = folder / name
        if a.check:
            if not dest.is_file() or dest.read_bytes() != data: failed.append(str(dest.relative_to(ROOT)))
        else:
            folder.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(data)
if failed:
    raise SystemExit('Agent files differ: ' + ', '.join(failed) + '. Run scripts/sync-agent-skills.py.')
print('Agent skill copies match.' if a.check else 'Generated Codex and Claude Code skill copies.')

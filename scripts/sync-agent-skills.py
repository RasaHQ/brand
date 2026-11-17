#!/usr/bin/env python3
"""Generate or verify repository-discoverable copies of the canonical skills.

- rasa-brand: the root SKILL.md (brand system workflow).
- rasa-community-cards: skills/rasa-community-cards/ (cover cards, newsletter images,
  showcase headers, in-post diagrams). Licensed fonts are never copied.

Each copy gets a brand-root.txt locator that points back to this checkout.
"""
from pathlib import Path
import argparse, shutil
ROOT = Path(__file__).resolve().parents[1]
PLATFORMS = ('.agents', '.claude')


def skill_files():
    """Map skill name -> {relative path: bytes} for every canonical skill."""
    out = {'rasa-brand': {'SKILL.md': ROOT.joinpath('SKILL.md').read_bytes()}}
    for folder in sorted((ROOT / 'skills').iterdir()):
        if not (folder / 'SKILL.md').is_file():
            continue
        files = {}
        for p in sorted(folder.rglob('*')):
            if p.is_file() and p.suffix not in ('.woff2', '.woff', '.ttf', '.otf') and '__pycache__' not in p.parts:
                files[str(p.relative_to(folder))] = p.read_bytes()
        out[folder.name] = files
    for files in out.values():
        files['brand-root.txt'] = b'../../..\n'
    return out


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--check', action='store_true')
    a = p.parse_args()
    failed = []
    for platform in PLATFORMS:
        for name, files in skill_files().items():
            folder = ROOT / platform / 'skills' / name
            if a.check:
                for rel, data in files.items():
                    dest = folder / rel
                    if not dest.is_file() or dest.read_bytes() != data:
                        failed.append(str(dest.relative_to(ROOT)))
                if folder.is_dir():
                    extra = [q for q in folder.rglob('*') if q.is_file() and str(q.relative_to(folder)) not in files
                             and q.suffix not in ('.woff2', '.woff', '.ttf', '.otf') and '__pycache__' not in q.parts]
                    failed += [str(q.relative_to(ROOT)) + ' (stale)' for q in extra]
            else:
                if folder.is_dir() and name != 'rasa-brand':
                    # Keep locally provisioned fonts; replace everything else.
                    for q in folder.rglob('*'):
                        if q.is_file() and q.suffix not in ('.woff2', '.woff', '.ttf', '.otf'):
                            q.unlink()
                for rel, data in files.items():
                    dest = folder / rel
                    dest.parent.mkdir(parents=True, exist_ok=True)
                    dest.write_bytes(data)
    if failed:
        raise SystemExit('Agent files differ: ' + ', '.join(failed) + '. Run scripts/sync-agent-skills.py.')
    print('Agent skill copies match.' if a.check else 'Generated Codex and Claude Code copies of: ' + ', '.join(skill_files()))


if __name__ == '__main__':
    main()

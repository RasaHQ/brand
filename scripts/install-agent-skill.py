#!/usr/bin/env python3
"""Install the Rasa project skills (rasa-brand, rasa-community-cards) into another project.

Existing AGENTS.md / CLAUDE.md files are never edited. Licensed fonts are never copied:
the card renderer finds them through RASA_FONTS_DIR or the brand checkout recorded in
brand-root.txt.
"""
from pathlib import Path
import argparse, importlib.util, os

SOURCE = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('sync_skills', SOURCE / 'scripts' / 'sync-agent-skills.py')
sync = importlib.util.module_from_spec(spec); spec.loader.exec_module(sync)

p = argparse.ArgumentParser(description=__doc__)
p.add_argument('--target', type=Path, required=True, help='Existing consumer project root')
p.add_argument('--agent', choices=['codex', 'claude', 'both'], default='both')
p.add_argument('--skill', choices=['rasa-brand', 'rasa-community-cards', 'all'], default='all')
p.add_argument('--replace-skill', action='store_true', help='Explicitly replace existing differing skill files')
a = p.parse_args()
target = a.target.expanduser().resolve()
if not target.is_dir():
    raise SystemExit('Target must be an existing project directory.')
if not (SOURCE / 'design-system/src/tokens.json').is_file():
    raise SystemExit('Run this script from the full brand checkout.')
platforms = ['.agents', '.claude'] if a.agent == 'both' else ['.agents' if a.agent == 'codex' else '.claude']
skills = {k: v for k, v in sync.skill_files().items() if a.skill in ('all', k)}
writes = []
for platform in platforms:
    for name, files in skills.items():
        folder = target / platform / 'skills' / name
        for rel, data in files.items():
            if rel == 'brand-root.txt':
                data = (os.path.relpath(SOURCE, folder) + '\n').encode()
            writes.append((folder / rel, data))
# Preflight all conflicts before any writes. Never overwrite symlinks or unknown files silently.
for dest, data in writes:
    if any(x.is_symlink() for x in [dest, *dest.parents] if x != target.parent):
        raise SystemExit(f'Refusing a symlinked destination: {dest}')
    if dest.exists() and (not dest.is_file() or (dest.read_bytes() != data and not a.replace_skill)):
        raise SystemExit(f'Existing differing file: {dest}. Review it first; --replace-skill permits replacement.')
for dest, data in writes:
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(data)
print(f"Installed {', '.join(skills)} for {a.agent}. Existing AGENTS.md and CLAUDE.md were not edited.")
print('Keep the brand checkout at the relative location recorded in brand-root.txt; provision fonts with RASA_FONTS_DIR.')

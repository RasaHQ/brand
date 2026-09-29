#!/usr/bin/env python3
"""Install the Rasa project skill while preserving existing instruction files."""
from pathlib import Path
import argparse, os
SOURCE = Path(__file__).resolve().parents[1]
p = argparse.ArgumentParser(description=__doc__)
p.add_argument('--target', type=Path, required=True, help='Existing consumer project root')
p.add_argument('--agent', choices=['codex','claude','both'], default='both')
p.add_argument('--replace-skill', action='store_true', help='Explicitly replace an existing rasa-brand skill file and locator')
a = p.parse_args()
target = a.target.expanduser().resolve()
if not target.is_dir(): raise SystemExit('Target must be an existing project directory.')
if not (SOURCE/'design-system/src/tokens.json').is_file(): raise SystemExit('Run this script from the full brand checkout.')
platforms = ['.agents','.claude'] if a.agent=='both' else ['.agents' if a.agent=='codex' else '.claude']
writes=[]
for platform in platforms:
    folder=target/platform/'skills/rasa-brand'
    writes.extend([(folder/'SKILL.md',(SOURCE/'SKILL.md').read_bytes()),(folder/'brand-root.txt',(os.path.relpath(SOURCE,folder)+'\n').encode())])
# Preflight all conflicts before any writes. Never overwrite symlinks or unknown files silently.
for dest,data in writes:
    if any(x.is_symlink() for x in [dest,*dest.parents] if x != target.parent):
        raise SystemExit(f'Refusing a symlinked destination: {dest}')
    if dest.exists() and (not dest.is_file() or (dest.read_bytes()!=data and not a.replace_skill)):
        raise SystemExit(f'Existing differing file: {dest}. Review it first; --replace-skill permits replacement.')
for dest,data in writes:
    dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(data)
print('Installed project skill for '+a.agent+'. Existing AGENTS.md and CLAUDE.md were not edited.')
print('Keep the full brand checkout available at the relative location recorded in brand-root.txt.')

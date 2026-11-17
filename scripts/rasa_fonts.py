"""Locate the licensed STK Bureau fonts without committing them.

Resolution order (first folder that exists wins):
1. the RASA_FONTS_DIR environment variable (also read from a .env file at the repo root);
2. design-system/rasa-brand-2026/fonts/ in this checkout.

The fonts are treated like secrets: code refers to them by name, a lock file
records what is expected, and the binaries are provisioned per machine.
"""
from __future__ import annotations
from pathlib import Path
import hashlib, json, os

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_DIR = ROOT / 'design-system' / 'rasa-brand-2026' / 'fonts'
LOCK = DEFAULT_DIR / 'fonts.lock.json'


def _dotenv_value(key: str) -> str | None:
    env = ROOT / '.env'
    if not env.is_file():
        return None
    for line in env.read_text().splitlines():
        line = line.strip()
        if line and not line.startswith('#') and '=' in line:
            k, v = line.split('=', 1)
            if k.strip() == key:
                return v.strip().strip('"').strip("'") or None
    return None


def fonts_dir() -> Path:
    value = os.environ.get('RASA_FONTS_DIR') or _dotenv_value('RASA_FONTS_DIR')
    if value:
        return Path(value).expanduser().resolve()
    return DEFAULT_DIR


def lock() -> dict:
    return json.loads(LOCK.read_text())


def find(file_name: str) -> Path | None:
    """Return the path of a provisioned font file, or None if it is not provisioned."""
    p = fonts_dir() / file_name
    return p if p.is_file() else None


def status(names: list[str] | None = None) -> list[dict]:
    """Check provisioned files against the lock: ok, missing or mismatch."""
    rows = []
    for f in lock()['fonts']:
        if names and f['file'] not in names:
            continue
        p = find(f['file'])
        if p is None:
            rows.append({**f, 'state': 'missing'})
            continue
        digest = hashlib.sha256(p.read_bytes()).hexdigest()
        rows.append({**f, 'state': 'ok' if digest == f['sha256'] else 'mismatch', 'path': str(p)})
    return rows

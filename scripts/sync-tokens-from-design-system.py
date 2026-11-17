#!/usr/bin/env python3
"""Regenerate the design-system-owned parts of design-system/src/tokens.json.

Source of truth: design-system/rasa-brand-2026/tokens.json (the byte-exact mirror of
the Rasa Brand 2026 design system) and skills/rasa-community-cards/references/tokens.json
(the Rasa Community card modes). Sections this repository owns for web delivery
(layout, breakpoint, motion, responsive typography recipes, accessible pairs) are
kept as they are; edit those by hand.

Run after updating the mirror, then `npm --prefix design-system run build`.
Use --check to fail when src/tokens.json has drifted from the sources.
"""
from pathlib import Path
import argparse, json, re

R = Path(__file__).resolve().parents[1]
MIRROR = R / 'design-system/rasa-brand-2026/tokens.json'
CARDS = R / 'skills/rasa-community-cards/references/tokens.json'
SRC = R / 'design-system/src/tokens.json'
LOCK = json.loads((R / 'evidence/brand-2026/artifact-files.json').read_text())['artifact']

FAMILIES = ['taupe', 'pink', 'seafoam', 'coral', 'periwinkle', 'sage', 'orchid', 'gold', 'lavender']
# ui/tag/status and ui/tag/category colours, from the component stylesheet (components/bundle.css).
STATUS = {
    'success': {'bg': 'seafoam.100', 'fg': 'seafoam.700', 'meaning': 'pass, live, connected, done'},
    'danger': {'bg': 'coral.100', 'fg': 'coral.600', 'meaning': 'fail, blocked'},
    'warning': {'bg': 'gold.200', 'fg': 'gold.700', 'meaning': 'running, awaiting, mocked'},
    'info': {'bg': 'periwinkle.100', 'fg': 'periwinkle.500', 'meaning': 'draft'},
    'neutral': {'bg': 'taupe.200', 'fg': 'taupe.700', 'meaning': 'should, default'},
    'pink': {'bg': 'pink.100', 'fg': 'pink.600', 'meaning': 'must, focus'},
}
CATEGORY_ORDER = ['periwinkle', 'seafoam', 'gold', 'coral', 'orchid', 'lavender', 'sage']
# Syntax colours of ui/code-window (components/CodeWindow/README.md in the design system). Pink is never used in code.
CODE = {
    'text': 'taupe.100', 'comment': 'taupe.500', 'punctuation': 'taupe.400', 'keyword': 'orchid.300',
    'name': 'periwinkle.200', 'function': 'coral.300', 'type': 'sage.300', 'string': 'seafoam.300', 'value': 'gold.400',
}


def ref(v: str) -> str:
    if v == '{lavender}':  # the lead lavender alias
        return 'lavender.200'
    m = re.fullmatch(r'\{([a-z]+)-(\d+)\}', v)
    if not m:
        raise SystemExit(f'Unexpected token reference {v}')
    return f'{m.group(1)}.{m.group(2)}'


def build(current: dict) -> dict:
    ds = json.loads(MIRROR.read_text())
    cards = json.loads(CARDS.read_text())
    color = {f: {} for f in FAMILIES}
    semantic, themes, notes = {}, {'light': {}, 'dark': {}}, {}
    for tok in ds['color']['tokens']:
        name, v = tok['name'], tok['value']
        m = re.fullmatch(r'([a-z]+)-(\d+)', name)
        if isinstance(v, str) and v.startswith('#') and m and m.group(1) in color:
            color[m.group(1)][m.group(2)] = v.upper()
            continue
        if isinstance(v, dict):
            themes['light'][name] = ref(v['light'])
            themes['dark'][name] = ref(v['dark'])
        elif name == 'lavender':
            semantic['lavender-lead'] = ref(v)
        else:
            semantic[name] = ref(v)
        notes[name] = tok['usage']
    styles = {s['name']: {k: s[k] for k in ['family', 'fontSize', 'lineHeight', 'fontWeight', 'letterSpacing', 'fontStyle'] if k in s} | {'group': g['name'], 'usage': s['usage']}
              for g in ds['type']['groups'] for s in g['styles']}
    out = dict(current)
    out['meta'] = {
        'version': '1.0.0',
        'status': 'Rasa Brand 2026 design system tokens with adapted web recipes',
        'date': '2026-11-17',
        'sources': ['design-system/rasa-brand-2026/tokens.json', 'skills/rasa-community-cards/references/tokens.json'],
        'designSystem': {'title': LOCK['title'], 'version': LOCK['version'], 'url': LOCK['url']},
        'authority': 'The Rasa Brand 2026 design system (Figma: Rasa Brand Relaunch — Working File) owns colour, roles, themes, type styles, spacing, radius and borders; where anything differs from Figma, Figma wins. Community card modes come from the Rasa Community Designs Figma file via the rasa-community-cards skill. Layout, breakpoints, motion, responsive web recipes and accessible pairs are this repository\'s adapted web recipes.',
        'typographyNote': 'STK Bureau Book is weight 300 everywhere (fonts, tokens and CSS). Stacks name STK Bureau first, then the Google substitutes Newsreader, Inter and JetBrains Mono.',
    }
    out['color'] = color
    out['semantic'] = semantic
    out['themes'] = themes
    out['status'] = STATUS
    out['categoryOrder'] = CATEGORY_ORDER
    out['code'] = CODE
    out['font'] = {k: v for k, v in ds['type']['families'].items()}
    out['weight'] = {'book': 300, 'regular': 400, 'medium': 500, 'semibold': 600}
    out['fontFaces'] = [{**f, 'weight': int(f['weight'])} for f in ds['type']['fonts']]
    out['textStyles'] = styles
    out['space'] = {t['name'].removeprefix('space-'): int(t['value'][:-2]) for t in ds['spacing']['tokens'] if t['name'].startswith('space-')}
    out['slides'] = {t['name']: int(t['value'][:-2]) for t in ds['spacing']['tokens'] if not t['name'].startswith('space-')}
    out['slides'].update({'width': 1920, 'height': 1080, 'columns': 12, 'safeTop': 48, 'safeBottom': 1032, 'safeLeft': 80, 'safeRight': 1840})
    out['radius'] = {t['name'].removeprefix('radius-'): (int(t['value'][:-2])) for t in ds['radius']['tokens']}
    out['radius'].update({'button': 4, 'nav': 8, 'media': 12, 'card': 16})
    out['borderWidth'] = {t['name'].removeprefix('border-'): float(t['value'][:-2]) for t in ds['borderWidth']['tokens']}
    out['community'] = {'modes': cards['modes'], 'fixed': cards['fixed'], 'type': cards['type'], 'layout': cards['layout']}
    out.pop('illustration', None)
    return out


def ordered(d: dict) -> dict:
    order = ['meta', 'color', 'semantic', 'themes', 'status', 'categoryOrder', 'code', 'font', 'weight', 'fontFaces',
             'textStyles', 'space', 'slides', 'radius', 'borderWidth', 'layout', 'breakpoint', 'motion', 'accessible',
             'typography', 'community']
    return {k: d[k] for k in order if k in d} | {k: v for k, v in d.items() if k not in order}


if __name__ == '__main__':
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--check', action='store_true')
    a = ap.parse_args()
    cur = json.loads(SRC.read_text())
    new = ordered(build(cur))
    text = json.dumps(new, indent=2, ensure_ascii=False) + '\n'
    if a.check:
        cur_wo = {k: v for k, v in cur.items() if k != 'meta'}
        new_wo = {k: v for k, v in new.items() if k != 'meta'}
        if cur_wo != new_wo:
            raise SystemExit('design-system/src/tokens.json drifted from the design-system mirror. Run scripts/sync-tokens-from-design-system.py.')
        print('Tokens match the Rasa Brand 2026 mirror and the community card modes.')
    else:
        SRC.write_text(text)
        print('Updated design-system/src/tokens.json from the design-system mirror.')

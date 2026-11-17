"""Generate docs/colors.md, COMPONENTS.md and the two reference SVGs from src/tokens.json (Rasa Brand 2026)."""
from pathlib import Path
import json, html
r = Path(__file__).resolve().parents[2]
t = json.loads((r / 'design-system/src/tokens.json').read_text())
c = json.loads((r / 'evidence/contrast.json').read_text())
man = json.loads((r / 'design-system/rasa-brand-2026/manifest.json').read_text())
col = lambda ref: t['color'][ref.split('.')[0]][ref.split('.')[1]]
LEAD = {'taupe': '100 Taupe Light · 950 Taupe Dark', 'pink': '400 Rasa Pink', 'periwinkle': '200 · Finance', 'seafoam': '300 · Insurance',
        'sage': '200 · Government', 'coral': '300 · Retail', 'gold': '400 · Healthcare', 'lavender': '200 · Telecommunications', 'orchid': '100 · Supporting accent'}

# ---------- docs/colors.md ----------
s = ['# Color reference', '',
     'Generated from `design-system/src/tokens.json`, which mirrors the **Rasa Brand 2026** design system (`design-system/rasa-brand-2026/tokens.json`, Figma *Rasa Brand Relaunch — Working File*). Do not edit by hand: run `npm --prefix design-system run reference`.', '',
     '**Taupe is the only neutral.** The old Ink scale is retired; every neutral is a Taupe step. **Rasa Pink is the one accent**: emphasis, focus, key actions. Pink is never a background fill or body text. Balance: about 80% Taupe, 10% Pink, 10% secondary.', '',
     '| Name | Token | Hex | CMYK | Pantone | Use |', '| --- | --- | --- | --- | --- | --- |',
     '| Taupe Light | `taupe-100` | #FAF6F0 | 0 / 2 / 4 / 2 | Not specified | Ground of light slides and pages; text on dark |',
     '| Taupe Dark | `taupe-950` | #181210 | 71 / 68 / 67 / 84 | Black 4 C | Ground of dark slides; text on light |',
     '| Rasa Pink | `pink-400` | #E85A91 | 0 / 78 / 13 / 0 | 7423 C | The one accent |', '',
     'CMYK and Pantone are for print. Screens always use the hex values. Web CSS variables carry a `--rasa-` prefix (`--rasa-taupe-100`); the design-system sheet (`design-system/rasa-brand-2026/tokens.css`) uses the bare names (`--taupe-100`).', '']
for fam, scale in t['color'].items():
    s += [f'## {fam.title()}', '', f'Lead: {LEAD.get(fam, "")}', '', '| Step | HEX | RGB |', '| --- | --- | --- |']
    for k, v in scale.items():
        s.append(f"| {k} | `{v}` | {', '.join(str(int(v[i:i+2], 16)) for i in [1, 3, 5])} |")
    s.append('')
s += ['Secondary hues are for supporting surfaces, data, tags and industry cues, always with Taupe Dark text. Never combine lavender with periwinkle in one composition.', '',
      '## Themes', '', 'Slides and pages switch these roles between Taupe Light and Taupe Dark. Eyebrows, meta, page numbers and attributions use `fg-muted`, never pink.', '',
      '| Role | Light | Dark | Use |', '| --- | --- | --- | --- |']
use = {'surface': 'Slide or page ground', 'fg': 'Primary text', 'fg-muted': 'Subtitles, body, eyebrows, page numbers', 'accent': 'The single italic emphasis, quote mark, focus',
       'hairline': '1px column dividers and card outlines', 'panel': 'Filled visual container', 'card': 'Concept cards and product windows'}
for k in t['themes']['light']:
    s.append(f"| `{k}` | `{t['themes']['light'][k]}` {col(t['themes']['light'][k])} | `{t['themes']['dark'][k]}` {col(t['themes']['dark'][k])} | {use.get(k, '')} |")
s += ['', '## Semantic roles', '', 'Every hue has the same roles: `contrast` (text on solid), `subtle`, `muted`, `emphasized` (tints from light to strong), `solid` (filled elements), `fg` (coloured text) and `focus-ring`. Use roles when building UI; use the palette when choosing colours for layouts and illustration.', '',
      '| Role | Reference | HEX |', '| --- | --- | --- |']
s += [f'| `{k}` | `{v}` | {col(v)} |' for k, v in t['semantic'].items()]
s += ['', '## States in visuals', '', 'Fixed meanings (`ui/tag/status`). Pair every state with a word.', '', '| State | Meaning | Background | Text |', '| --- | --- | --- | --- |']
for k, v in t['status'].items():
    s.append(f"| {k} | {v['meaning']} | `{v['bg']}` {col(v['bg'])} | `{v['fg']}` {col(v['fg'])} |")
s += ['', '**Categories** (teams, roles, product areas) take palette colours in this order per deck: ' + ', '.join(f'{i+1} {h.title()}' for i, h in enumerate(t['categoryOrder'])) + '. One colour, one meaning across the whole deck; at most 6 categories per visual.', '',
      '**Gold rule:** gold is the lightest hue, so small gold parts shift darker: tint 200 (not 100), dot 600 (not 400), light shapes 500 (not 300), text and accent 700, badge circle 400. Large gold surfaces use 100.', '',
      '**Tints and shades:** backgrounds at hue 100, light shapes at 300, accents and text at 700, for every hue including Lavender.', '',
      '## Code syntax', '', 'Code windows are always dark (Taupe 950). Pink is never used in code.', '', '| Class | Token | Reference | HEX |', '| --- | --- | --- | --- |']
cls = {'text': '(plain)', 'comment': '.cm', 'punctuation': '.pn', 'keyword': '.kw', 'name': '.nm', 'function': '.fn', 'type': '.ty', 'string': '.str', 'value': '.val'}
for k, v in t['code'].items():
    s.append(f'| `{cls[k]}` | `--rasa-code-{k}` | `{v}` | {col(v)} |')
s += ['', '## Contrast measurements', '', 'sRGB relative luminance, `(Llighter + 0.05) / (Ldarker + 0.05)`. 4.5:1 for text, 3:1 for essential boundaries. The design system states: Taupe Dark on Taupe Light 17.2:1 (all text); Rasa Pink on Taupe Dark 5.6:1 (all text); Rasa Pink on Taupe Light 3.1:1 (24px and above, and graphics only).', '',
      '| Pair | Foreground | Background | Ratio | Result |', '| --- | --- | --- | --- | --- |']
for x in c:
    s.append(f"| {x['name']} | `{x['fg']}` | `{x['bg']}` | {x['ratio']}:1 | {x['result']} |")
s += ['', 'For small text links and focus rings on Taupe Light, the web package uses Pink 600 (`#AA1E54`, the Figma `pink/focusRing` role). On Taupe Dark, use Pink 300 links. These checks cover solid colours at full opacity, not text over artwork or whole-site conformance.']
(r / 'docs/colors.md').write_text('\n'.join(s) + '\n')

# ---------- artwork/brand-reference.svg (fallback fonts, tokens only) ----------
T = lambda f, s: col(f'{f}.{s}')
font = {'serif': "'STK Bureau Serif','Newsreader',Georgia,serif", 'sans': "'STK Bureau Sans','Inter',Arial,sans-serif", 'mono': "'STK Bureau Sans Mono','JetBrains Mono',monospace"}
svg = [f'<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="1320" viewBox="0 0 1440 1320"><rect width="1440" height="1320" fill="{T("taupe",100)}"/>',
       f'<text x="64" y="65" fill="{T("taupe",700)}" font-family="{font["mono"]}" font-size="16">RASA BRAND 2026 · WEB REFERENCE</text>',
       f'<text x="64" y="145" fill="{T("taupe",950)}" font-family="{font["serif"]}" font-weight="300" font-size="62">Warm Taupe, one pink accent.</text>',
       f'<text x="64" y="192" fill="{T("taupe",700)}" font-family="{font["sans"]}" font-size="22">Taupe is the only neutral · STK Bureau Book 300 · Google substitutes shown when STK is not installed</text>']
for row, fam in enumerate(['taupe', 'pink']):
    y = 260 + row * 178
    svg.append(f'<text x="64" y="{y}" fill="{T("taupe",950)}" font-family="{font["sans"]}" font-size="23">{fam.title()}</text>')
    for i, (shade, v) in enumerate(t['color'][fam].items()):
        x = 64 + i * 109
        svg.append(f'<rect x="{x}" y="{y+22}" width="98" height="64" rx="4" fill="{v}" stroke="{T("taupe",300)}"/><text x="{x}" y="{y+111}" fill="{T("taupe",950)}" font-family="{font["mono"]}" font-size="14">{shade}</text><text x="{x}" y="{y+134}" fill="{T("taupe",700)}" font-family="{font["mono"]}" font-size="14">{v}</text>')
svg.append(f'<rect x="64" y="655" width="630" height="360" rx="16" fill="{T("taupe",50)}" stroke="{T("taupe",300)}"/><text x="96" y="706" font-family="{font["mono"]}" font-size="15" fill="{T("taupe",700)}">EDITORIAL AND PRACTICAL</text><text x="96" y="778" font-family="{font["serif"]}" font-weight="300" font-size="42" fill="{T("taupe",950)}">Serif headlines end with a full stop.</text><text x="96" y="830" font-family="{font["sans"]}" font-size="23" fill="{T("taupe",700)}">Sans body. Mono eyebrows, never pink.</text><rect x="96" y="884" width="225" height="64" rx="4" fill="{T("taupe",950)}"/><text x="208" y="925" text-anchor="middle" font-family="{font["sans"]}" font-weight="500" font-size="20" fill="{T("taupe",100)}">Primary action</text><rect x="341" y="884" width="225" height="64" rx="4" fill="none" stroke="{T("taupe",400)}"/><text x="453" y="925" text-anchor="middle" font-family="{font["sans"]}" font-weight="500" font-size="20" fill="{T("taupe",950)}">Secondary</text>')
svg.append(f'<rect x="726" y="655" width="650" height="360" rx="32" fill="{T("taupe",950)}"/><text x="758" y="706" font-family="{font["mono"]}" font-size="15" fill="{T("taupe",400)}">COLOUR WITH A PURPOSE</text><text x="758" y="778" font-family="{font["serif"]}" font-weight="300" font-size="42" fill="{T("taupe",100)}">Pink marks the <tspan fill="{T("pink",400)}" font-style="italic">one</tspan> focus.</text><text x="758" y="830" font-family="{font["sans"]}" font-size="23" fill="{T("taupe",400)}">Rasa Pink on Taupe Dark: 5.6:1, all text.</text>')
x = 758
for k in ['success', 'danger', 'warning', 'info', 'pink']:
    v = t['status'][k]; w = 18 + 11 * len(k)
    svg.append(f'<rect x="{x}" y="894" width="{w}" height="32" rx="8" fill="{col(v["bg"])}"/><text x="{x + w/2}" y="915" text-anchor="middle" font-family="{font["sans"]}" font-weight="500" font-size="14" letter-spacing="0.56" fill="{col(v["fg"])}">{k.upper()}</text>')
    x += w + 10
svg.append(f'<text x="64" y="1105" font-family="{font["serif"]}" font-weight="300" font-size="36" fill="{T("taupe",950)}">Retired: Ink scale, purple, gradients, left-edge stripes.</text><text x="64" y="1155" font-family="{font["sans"]}" font-size="23" fill="{T("taupe",700)}">Source: Rasa Brand 2026 design system. Generated from design-system/src/tokens.json.</text><text x="64" y="1210" font-family="{font["sans"]}" font-size="20" fill="{T("taupe",700)}">No proprietary fonts or logo masters are embedded in this sheet.</text></svg>')
(r / 'artwork/brand-reference.svg').write_text(''.join(svg))

# ---------- artwork/diagram-starter.svg: one focus, orthogonal connectors (visual layer rules) ----------
d = [f'<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" role="img" aria-labelledby="title desc">',
     '<title id="title">Illustrative skills flow</title><desc id="desc">One agent routes to three skills; the rebook skill is the focus. Editable starter that follows the Rasa Brand 2026 visual layer: Taupe 50 cards, 1px Taupe 300 borders, radius 16, orthogonal 1.5px connectors, one pink focus.</desc>',
     f'<rect width="1200" height="800" fill="{T("taupe",100)}"/>',
     f'<text x="64" y="75" fill="{T("taupe",700)}" font-family="{font["mono"]}" font-size="18">SKILLS</text>',
     f'<text x="64" y="148" fill="{T("taupe",950)}" font-family="{font["serif"]}" font-weight="300" font-size="48">Each skill owns one task.</text>',
     f'<rect x="64" y="200" width="1072" height="540" rx="32" fill="{T("taupe",200)}"/>',
     f'<defs><marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M2 1 L9 5 L2 9" fill="none" stroke="{T("taupe",700)}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker><marker id="f" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse"><path d="M2 1 L9 5 L2 9" fill="none" stroke="{T("pink",400)}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>',
     f'<g fill="none" stroke-width="1.5"><path d="M376 470 H430 Q442 470 442 458 V322 Q442 310 454 310 H558" stroke="{T("taupe",700)}" marker-end="url(#a)"/><path d="M376 470 H558" stroke="{T("pink",400)}" marker-end="url(#f)"/><path d="M376 470 H430 Q442 470 442 482 V618 Q442 630 454 630 H558" stroke="{T("taupe",700)}" marker-end="url(#a)"/></g>',
     f'<rect x="96" y="420" width="280" height="100" rx="16" fill="{T("taupe",950)}"/><text x="128" y="478" fill="{T("taupe",100)}" font-family="{font["sans"]}" font-weight="500" font-size="20">Booking agent</text>']
for y, label, code, focus in [(270, 'Check booking', 'check_booking', False), (430, 'Rebook flight', 'rebook_flight', True), (590, 'Hand off to a person', 'handoff', False)]:
    d.append(f'<g><rect x="560" y="{y}" width="540" height="80" rx="16" fill="{T("taupe",50)}" stroke="{T("pink",400) if focus else T("taupe",300)}" stroke-width="{1.5 if focus else 1}"/><text x="592" y="{y+36}" fill="{T("taupe",950)}" font-family="{font["sans"]}" font-weight="500" font-size="20">{label}</text><text x="592" y="{y+60}" fill="{T("taupe",700)}" font-family="{font["mono"]}" font-size="16">{code}</text>'
             + (f'<rect x="964" y="{y+24}" width="112" height="32" rx="8" fill="{T("pink",100)}"/><text x="1020" y="{y+45}" text-anchor="middle" fill="{T("pink",600)}" font-family="{font["sans"]}" font-weight="500" font-size="14" letter-spacing="0.56">FOCUS</text>' if focus else '') + '</g>')
d.append(f'<text x="64" y="775" fill="{T("taupe",700)}" font-family="{font["sans"]}" font-size="16">Illustrative starter. Text is set in the brand stacks; replace with real names from the source material.</text></svg>')
(r / 'artwork/diagram-starter.svg').write_text(''.join(d))

# ---------- COMPONENTS.md ----------
rows = ['# Component implementation reference', '',
        'Two layers ship here. Generated by `npm --prefix design-system run reference`; do not edit by hand.', '',
        '1. **Web recipes** (`design-system/src/components.css`): opt-in `rasa-*` classes over the shared tokens, for Astro, Tailwind and plain HTML pages.',
        '2. **Rasa Brand 2026 UI components** (`design-system/rasa-brand-2026/components/`): the design system\'s React bundle, `window.RasaNewBrand`, 106 components for slides, product windows, concept cards, diagrams, data and Studio visuals. Use these instead of hand-building a control or drawing an icon the system provides.', '',
        '[Asset selection](ASSETS.md) · [Component behaviour](docs/components.md) · [Brand 2026 guidelines](design-system/rasa-brand-2026/README.md) · [Colours](docs/colors.md)', '',
        '## Web recipes', '', '| Need | Classes | Rule |', '| --- | --- | --- |',
        '| Page wrapper | `rasa-theme` (+ `rasa-dark` for Taupe Dark) | Import tokens and component CSS once. |',
        '| Main heading | `rasa-display` | One h1. Short statement that ends with a full stop. |',
        '| Section heading | `rasa-title` | h2; preserve heading order. |',
        '| Emphasis | `rasa-emphasis` | Serif italic Rasa Pink, one word or short phrase, display sizes only. Default to none. |',
        '| Eyebrow | `rasa-eyebrow` | Mono, uppercase, `fg-muted`, 1–3 words, no separators, never pink. |',
        '| Card | `rasa-card`, `rasa-card-title` | Taupe 50, 1px Taupe 300, radius 16, no shadow, no left-edge stripe. |',
        '| Visual panel | `rasa-panel` | Filled visual container: Taupe 200 / Taupe 800, radius 32, 32px inner margin. |',
        '| Primary action | `rasa-button` | Taupe 950 fill, Taupe 100 label, radius 4. Max 2 together, one primary. |',
        '| Secondary action | `rasa-button rasa-button--secondary` | Transparent, Taupe 400 outline. |',
        '| Status | `rasa-badge rasa-badge--success|danger|warning|info|pink` | Fixed meanings; always with a word. |',
        '| Code | `rasa-code` (dark), `rasa-code rasa-code--light` (diff) | Never wrapped; pink never used in code. |',
        '| Reading | `rasa-prose` | Long-form adaptation. |',
        '| Input | `rasa-field`, `rasa-input` | Persistent label, unique ID, described errors. |', '',
        'There is no pink button: Rasa Pink is never a background fill. `.rasa-button--pink` was removed.', '',
        '## Responsive web typography', '', 'Adapted from the design system\'s Web V1 styles (column *Style*). Values come from `design-system/src/tokens.json`.', '',
        '| Recipe | Style | Family / weight | Desktop size / line | Mobile size / line |', '| --- | --- | --- | --- | --- |']
for name, rec in t['typography'].items():
    dd = rec['desktop']; m = rec.get('mobile', dd)
    rows.append(f"| `{name}` | `{rec.get('style', '—')}` | {rec['family']} / {rec['weight']} | {dd['size']} / {dd['lineHeight']} | {m['size']} / {m['lineHeight']} |")
rows += ['', 'Every design-system text style is also available as a CSS shorthand: `font: var(--rasa-text-<style>)` (for example `--rasa-text-display-md`, `--rasa-text-ui-label`). Add `text-transform: uppercase` for eyebrow, attribution, ui-label, ui-micro and the web mono styles.', '',
         '```html', '<section class="rasa-theme rasa-container rasa-section" aria-labelledby="resources">', '  <p class="rasa-eyebrow">Resources</p>',
         '  <h2 id="resources" class="rasa-title">Build agents your team can inspect.</h2>', '  <p class="rasa-prose">Replace with the page’s actual description.</p>',
         '  <a class="rasa-button" href="/resources/">Explore resources</a>', '</section>', '```', '',
         '## Rasa Brand 2026 UI components (`window.RasaNewBrand`)', '',
         'Load `tokens.css`, then `components/bundle.css`, then React 18.3.1 (`components/lib/`), then `components/bundle.js`. Types: `components/index.d.ts`. Fonts load from `fonts/` beside `tokens.css` (provisioned, not committed). See [docs/components.md](docs/components.md#rasa-brand-2026-ui-components).', '']
# Summaries the manifest leaves empty, from the design system's README index.
SUMMARY = {'WindowBar': 'The 56px product-window header: three dots, muted breadcrumb, optional mono meta and status tag.', 'ResultList': 'Bordered inner card (radius 16, 24px side inset) holding ResultRows inside a ProductWindow.', 'StepTabs': 'A row of StepTab pipeline steps, equal widths, max 4.', 'Table': 'Bordered table (radius 12) holding TableRows; max 6 rows.', 'TypeScale': 'The type scale specimen.'}
groups = {}
for comp in man['components']:
    groups.setdefault(comp.get('group', 'Visual layer'), []).append(comp)
for g, comps in groups.items():
    rows += [f'### {g}', '', '| Component | Summary |', '| --- | --- |']
    rows += [f"| `{x['name']}` | {html.escape(x.get('summary') or SUMMARY.get(x['name'], '')).replace('|', '/')} |" for x in comps]
    rows.append('')
rows += ['## Acceptance', '', 'Inspect desktop and narrow layouts, long content, keyboard focus, contrast and font fallbacks in the consuming app. Inspect every rendered slide or visual for orphans, split product names and text below the size floors (24px slide layer, 14px visual layer, 12px UI/Micro). Markdown documents the contract; it cannot certify rendered behaviour.', '']
(r / 'COMPONENTS.md').write_text('\n'.join(rows))
print('Generated docs/colors.md, COMPONENTS.md, artwork/brand-reference.svg and artwork/diagram-starter.svg.')

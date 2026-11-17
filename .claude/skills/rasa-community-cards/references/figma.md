# Figma output

File: **Rasa Community Designs** — key `YaKH4J4ahfvSba27RU1Pnu`. Use the Figma MCP (`use_figma`) and load its `figma-use` skill first.

## Components (main component node IDs in that file)

| Component | Node ID | Notes |
|---|---|---|
| Cover / Card (set) | `15:620` | Variants `Size=Regular` (72px), `Size=Large` (96px) |
| Showcase / Build header | `69:1761` | Props: Category, Number, Step 1–3, Caption |

Card properties (look keys up by prefix, the `#id` suffix can change): `Eyebrow`, `Headline`, `Show dek`, `Dek`, `Show series footer`, `Series footer`, `Panel` (instance swap).

Panel sets → variant node IDs to pass to the `Panel` property:

| Panel | Default | Other styles |
|---|---|---|
| Said vs Did | `44:690` | |
| Timeline | `44:712` | |
| Ledger | `15:284` | |
| Log | `15:365` | |
| Window | `20:519` | Stacked `61:1503` |
| Path | `31:447` | Route `61:1464` |
| Converge | `31:488` | Branch `61:1483` |
| Pipeline | `48:848` | |
| Trace | `47:724` | |
| Terminal | `47:755` | |
| Scorecard | `48:868` | |
| Schedule | `48:896` | |
| Chat | `56:1286` | |
| Matrix | `56:1301` | |
| Metric | `56:1390` | |
| Geometric | `31:514` | Tiles `61:1532` |

Diagram kit: Node `74:1823` (State=Default/Focus/Pass/Fail/Muted, prop Label), Decision `74:1824` (prop Question), Badge `74:1828`, Edge label `74:1830`, Group `74:1832`, Step columns `75:1824`, Condition card `75:1848`.

## Modes — variable collection "Card hue" (`VariableCollectionId:16:368`)

| Mode | modeId |
|---|---|
| Default · Light | `16:0` |
| Default · Dark | `40:0` |
| Casebook | `37:0` |
| Guides | `16:1` |
| Tutorials | `16:2` |
| Community | `16:3` |

## Recipe

```js
const set = await figma.getNodeByIdAsync('15:620');
const card = set.children.find(c => c.name === 'Size=Regular').createInstance();
const p = card.componentProperties, k = n => Object.keys(p).find(x => x.startsWith(n));
card.setProperties({ [k('Eyebrow')]: 'GUIDES FOR AI TEAMS', [k('Headline')]: 'Right reply, nothing remembered', [k('Panel')]: '15:284' });
const col = await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:16:368');
card.setExplicitVariableModeForCollection(col, '16:1');
// then edit text layers inside the panel instance (row labels, tags) — text only
```

Rules: never override fills/strokes on instances (colour comes from the mode); edit only text inside panels; place new cards in a section, not inside the library; screenshot the result and check it against the SKILL.md checklist.

# Diagrams inside posts

Use the article's series mode so the focus colour matches the cover.

## Rules
- **Direction:** top-down. Left-to-right only for 3–4 short steps.
- **Size:** max 8 nodes. Longer → split, or use Step columns.
- **Focus:** exactly one `focus` node — the step the paragraph is about.
- **Pass / fail:** `pass` (sage) for good outcomes, `fail` (coral) only for real failures. Never for emphasis.
- **Decisions:** a normal node starting with `IF …` — no diamonds. Label every outgoing edge.
- **Edge labels:** 1–3 words, lowercase.
- **Badges:** only when the text refers to numbered steps.
- **Groups:** neutral dashed boundary, mono uppercase label. Never coloured.
- **Node text:** sentence case, no full stop, ≤ ~40 chars.
- `muted` for context or out-of-scope steps.

## Templates (Figma)
- **Step columns** — 2–4 numbered steps side by side, each with a status line (`missing → blocked`); one may be focus.
- **Condition card** — "all of these hold" list → result → an accent note on what it leaves open.

## Code: Mermaid
Use `assets/rasa-mermaid-theme.js`:
```js
import { rasaMermaidConfig, rasaClassDefs } from './rasa-mermaid-theme.js';
mermaid.initialize(rasaMermaidConfig('guides'));
const src = `flowchart TD
  A[Queued reminder] --> B[Read current booking]
  B --> C[IF Has the booking changed?]
  C -- yes --> D[Changed: suppress old reminder]:::focus
  C -- no --> E[Same: send this version]:::pass
  E -- if send fails --> F[Reply lost: look up original send]:::muted
${rasaClassDefs('guides')}`;
```
Series keys for the theme: `default`, `casebook`, `guides`, `tutorials`, `community`. Check rounded corners / dashed groups against the site's Mermaid version.

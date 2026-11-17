# Panels — catalogue and spec format

Pick the panel by **what the article proves**, not by what looks nice. Each entry: when to use it, content limits, and the `panel` object for `scripts/render_card.py`. Figma names in brackets.

## Card spec (all panels)

```json
{
  "mode": "guides",                       // see tokens.json modes
  "eyebrow": "GUIDES FOR AI TEAMS",
  "headline": "Right reply, nothing remembered",
  "size": "auto",                         // auto | large (≤2 lines) | regular (3–5 lines)
  "dek": null,                            // optional one line, newsletter/social only
  "footer": null,                         // optional tutorial name, chapters only
  "panel": { "type": "ledger", ... }
}
```
A file may contain one spec or a list of specs (`"out"` per item for batch filenames).

## Choosing — quick map

| The article proves… | Panel |
|---|---|
| The reply looked right but the action was wrong | `said_vs_did` |
| Something happened at the wrong moment | `timeline` |
| A value doesn't match across records | `ledger` |
| A step in a sequence is missing or wrong | `log` |
| A setting / permission / state is what matters | `window` (versions or before/after → `stacked`) |
| Progress through steps | `path` (as a route → `route`) |
| Several inputs feed one outcome | `converge` |
| One decision, several possible outcomes | `branch` |
| How a system works end to end | `pipeline` |
| A reply is grounded in a tool result | `trace` |
| Setup, quickstart, how-to | `terminal` |
| Results across models or runs | `scorecard` |
| Which cases pass which checks | `matrix` |
| One number matters | `metric` |
| A conversation, one reply matters | `chat` |
| When an event happens | `schedule` |
| Brand / event / announcement, no technical story | `geometric` or `tiles` |

If two fit, choose the one where the **single highlight** lands on the article's key point.

## Panels

### said_vs_did  [Panel / Said vs Did]
What the agent said vs what it did. Reply passes, action fails.
```json
{"type":"said_vs_did","said":"“Your order is confirmed.”","said_tag":"reply sounds right","did":"place_order(terms=v1)","did_tag":"terms changed to v2"}
```
Limits: `said` ≤ 34 chars, `did` ≤ 24 chars (rendered as a command).

### timeline  [Panel / Timeline]
Two lanes over time; a cut marker where it went wrong.
```json
{"type":"timeline","top_label":"AGENT","top_played":"“Confirm the €500","top_cut":"transfer?”","cut_tag":"never finished playing","bottom_label":"CALLER","bottom_text":"“Yes.”","bottom_tag":"test passes anyway"}
```

### ledger  [Panel / Ledger]
3 columns, 3–5 rows, exactly one mismatch row.
```json
{"type":"ledger","columns":["FACT","SAID","SAVED"],"rows":[["name","Ana","Ana","ok"],["phone","+44 20…","—","fail"],["plan","Pro","Pro","ok"]],"tag":"facts said but not saved"}
```
Row status: `ok` | `fail` | `none`. Cells ≤ 10 chars.

### log  [Panel / Log]
3–5 timestamped rows; the last (or `fail_index`) row is the failure.
```json
{"type":"log","title":"COMMAND LOG","rows":[["14:02:07","user","restart my router"],["14:02:08","tool","check_outage → none"],["14:02:08","agent","“Restarting now.”"],["14:02:09","command","no reboot"]],"tag":"reply passed · command missing"}
```
Row text ≤ 22 chars.

### window  [Panel / Window]  ·  stacked  [Panel / Window, Style=Stacked]
App window with 2–4 setting rows; one row highlighted (accent, toggle on).
```json
{"type":"window","title":"TOOL PERMISSIONS","rows":[["lookup_order","auto",false],["check_status","auto",false],["issue_refund","ask first",true]],"tag":"refund waits for approval"}
```
`"type":"stacked"` = same fields, with two evenly stacked cards behind.

### path  [Panel / Path]  ·  route  [Panel / Path, Style=Route]
3–6 steps; done / current / next. Route draws them as a zigzag with a label card under the current node.
```json
{"type":"path","steps":[["Create the project","done"],["Add a voice channel","done"],["Write the booking flow","current"],["Test a call","next"]]}
{"type":"route","steps":5,"current":2,"label_top":"STEP 3","label":"confirm new slot"}
```

### converge  [Panel / Converge]  ·  branch  [Panel / Converge, Style=Branch]
3–5 inputs into one node (converge) or one node out to 3–5 outcomes (branch). One highlighted.
```json
{"type":"converge","items":["skill · v1","skill · edited","booking policy","user turn"],"highlight":1,"tag":"confirmation kept after edit"}
{"type":"branch","items":["Visa ·· 4417","Debit ·· 0921","Credit ·· 3380"],"highlight":1}
```
Items ≤ 18 chars.

### pipeline  [Panel / Pipeline]
Input → dark core → action, with an accent return path to the reply.
```json
{"type":"pipeline","title":"INSIDE A VOICE AGENT","input":"Speech","core":"Rasa","core_sub":"skills + flows","action":"Tool result","reply":"Response","caption":"INPUT → REASONING → ACTION → REPLY"}
```
Node labels ≤ 12 chars.

### trace  [Panel / Trace]
User → tool call (dark code) → agent, with a status chip.
```json
{"type":"trace","title":"INSPECTOR · JUNIPER","chip":"TOOL-GROUNDED","user":"How many monstera do you have?","call":"check_stock(plant=\"monstera\")","result":"→ found: true · quantity: 7","agent":"We have 7 monstera in stock right now.","tag":"reply traces to a tool result"}
```

### terminal  [Panel / Terminal]
3–6 lines; `#` comments muted, `$` commands. ≤ 32 chars per line.
```json
{"type":"terminal","title":"quickstart — rasa pro","lines":["# download the starter project","$ uv sync --locked","$ uv run rasa train","$ uv run rasa inspect"],"tag":"agent running locally"}
```

### scorecard  [Panel / Scorecard]
2–4 rows of pass counts + one finding; the row the finding is about is highlighted. Built to the Brand 2026 visual layer: the finding is a notice (tinted fill, accent dot before the label), never an accent bar down the left edge; counts in Sans Medium.
```json
{"type":"scorecard","title":"LOAN QUOTES · WEB CHAT","rows":[["CLAUDE",20,21],["GPT",21,21],["GEMINI",15,15]],"highlight":0,"finding":"On Claude, the first web-chat turn fails."}
```

### matrix  [Panel / Matrix]
3–5 check columns × 4–6 cases. Cells `p` pass, `f` fail, `n` not run. One highlighted column.
```json
{"type":"matrix","columns":["auth","amount","consent","log"],"rows":[["p","p","p","p"],["p","p","f","p"],["p","p","p","n"],["p","p","f","p"]],"highlight":2,"tag":"consent fails on 2 cases"}
```

### metric  [Panel / Metric]
5–8 bars, one highlighted with a value label.
```json
{"type":"metric","title":"SILENCE BEFORE REPLY","unit":"MS","values":[38,52,44,60,200,48,56],"highlight":4,"value_label":"20 ms","caption":"one gap decides the turn"}
```

### chat  [Panel / Chat]
Chat window, 2 messages: user (glyph avatar) and agent (accent bubble). No photos.
```json
{"type":"chat","user":"I can’t cover rent and the payment this month.","agent":"Let’s pause the repayment first and look at support options together."}
```
Each message ≤ 90 chars.

### schedule  [Panel / Schedule]
3–5 time rows; home time highlighted.
```json
{"type":"schedule","left":"EVERY WEDNESDAY","right":"30 MIN · ONLINE","rows":[["London","12:00"],["Central Europe","13:00"],["Eastern","07:00"]],"highlight":0}
```

### geometric  [Panel / Geometric]  ·  tiles  [Panel / Geometric, Style=Tiles]
Illustration only, colours from `illo` slots. No fields: `{"type":"geometric"}` / `{"type":"tiles"}`. Use only when there is genuinely no technical story.

## Showcase header (not a card)
```json
{"type":"showcase","mode":"default-dark","category":"TEXT AND TOOLS","number":"15","steps":["Question","FAISS retrieval","Gemini answer"],"caption":"Workflow sketch · explore the code below"}
```
1200×400. Step 2 is the core step (accent outline). Step labels 1–2 words.

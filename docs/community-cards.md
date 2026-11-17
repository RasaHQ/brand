# Rasa Community cards

One card system for rasa.community article covers (1200 × 630 OG images), newsletter / HubSpot images, showcase build headers (1200 × 400) and diagrams inside posts. The rules live in the [`rasa-community-cards` skill](../skills/rasa-community-cards/SKILL.md); this page shows how to run it from this repository.

Source of truth: Figma file **Rasa Community Designs** (`YaKH4J4ahfvSba27RU1Pnu`), sections *Library — Community cover cards*, *Rules*, *Library — Diagrams*, *Library — Showcase build headers*.

## Make a card

1. Read the article. Write one sentence: *what does this article prove?*
2. Pick the **mode** from the series, write the **eyebrow** and the **headline** (the lesson, not the topic), and pick the **panel** by story from [`references/panels.md`](../skills/rasa-community-cards/references/panels.md).
3. Fill the panel with real content from the article, with exactly one highlight.
4. Render and look at it:

```sh
python3 scripts/check-fonts.py --for community-cards      # STK Bureau provisioned?
python3 skills/rasa-community-cards/scripts/render_card.py spec.json out.png
python3 skills/rasa-community-cards/scripts/render_card.py specs.json outdir/   # batch
```

The renderer needs Playwright with Chromium. Colours come only from `references/tokens.json`; never pass hex values in a spec.

| Mode | Use for | Accent |
| --- | --- | --- |
| `default-light` | Rasa Community, general, brand | Rasa pink |
| `default-dark` | Showcase, flagship, contrast moments | Rasa pink |
| `casebook` | AI Team Casebook | lavender |
| `guides` | Guides for AI teams | pink |
| `tutorials` | Tutorial series and chapters | sage |
| `community` | Events, office hours, newsletter-only items | gold |

Eyebrow: the series name on the site; `RASA COMMUNITY · MON YYYY` in the newsletter; `TUTORIAL · CHAPTER N` for chapters. Newsletter images keep the featured article's mode; only the eyebrow changes.

## Fonts

The renderer embeds STK Bureau Serif Book, Sans Book and Sans Mono, looked up by file name in the skill's `assets/fonts/`, then `RASA_FONTS_DIR` (shell or the repo's `.env`), then `design-system/rasa-brand-2026/fonts/`. None of these files are committed. Without them it renders in Newsreader, Inter and JetBrains Mono (embedded from `assets/fonts/fallback/`) and prints a `NOTE`. Say which fonts a delivered card used.

## Figma and diagrams

- Figma output: [`references/figma.md`](../skills/rasa-community-cards/references/figma.md) — create an instance of **Cover / Card**, set the **Card hue** mode, swap **Panel**, edit text only. Never override fills.
- Diagrams inside posts: [`references/diagrams.md`](../skills/rasa-community-cards/references/diagrams.md) and `assets/rasa-mermaid-theme.js` — top-down, at most 8 nodes, exactly one `focus` node; `pass` (sage) and `fail` (coral) only for real outcomes.

## Where cards differ from the slide and web rules

Cards come from their own Figma file. Inside a card, the card rules win; everywhere else, the Brand 2026 guidelines win. Every card colour is a Brand 2026 palette value (checked by `npm --prefix design-system run check`).

| Topic | Community cards | Brand 2026 slides and web |
| --- | --- | --- |
| Headline | Sentence case, **no full stop**, no highlighted words | Short statement that **ends with a full stop**; optional pink italic emphasis |
| Accent | One highlight in the mode's accent (lavender, sage, gold or pink) | Rasa Pink is the one accent |
| Eyebrow | May carry a separator (`RASA COMMUNITY · MON YYYY`) | 1–3 words, no separators |
| Labels inside panels | Mono labels | Visual layer: uppercase Sans labels; Mono only means code |
| Pass state | Sage | Status *success* is seafoam |
| Logo | Logo Full 84px bottom-left, never the square mark | Logo Full 32px top-left on slides |

**Scorecard panel, rebuilt to Brand 2026.** The finding used to sit in a box with a 3px accent bar down its left edge, which Brand 2026 forbids on any element. It is now a notice: Taupe subtle fill, radius 12, an 8px accent dot before an uppercase Sans `FINDING` label, no edge stripe. Header labels are uppercase Sans Medium (Mono only for the model names, which are code-like), pass counts are Sans Medium, rows are divided by hairlines, and model names are 14px. The highlighted row keeps the single accent tint. Update the *Panel / Scorecard* component in *Rasa Community Designs* to match.

## Checklist before delivering

- [ ] The headline states the lesson and fits Large (≤ 2 lines) or Regular (≤ 5 lines)
- [ ] Mode matches the series; eyebrow matches the use (site, newsletter, chapter)
- [ ] The panel tells this article's story, with real content and no wrapped rows
- [ ] Exactly one accent highlight; coral only for an actual failure
- [ ] No photos, no highlighter, no backdrop shapes; Logo Full bottom-left
- [ ] For Figma: no fill overrides on the instance
- [ ] One line on why this panel, e.g. *"Guides · Ledger — the empty SAVED column is the finding."*

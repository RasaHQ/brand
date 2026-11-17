---
name: "rasa-community-cards"
description: "Make on-brand Rasa Community visuals — rasa.community article cover cards (1200×630 OG images), newsletter/HubSpot images, showcase build headers, and diagrams inside posts. Use this whenever someone asks for a cover, thumbnail, OG/social image, newsletter card or header image for a Rasa Community article, guide, tutorial, casebook entry, event or office hours, or wants an in-post diagram/flowchart for one — even if they only paste an article and say \"make an image for this\". Supports two outputs: PNG files rendered from code, or instances of the Rasa Community Designs Figma components."
---

# Rasa Community cards

One card system for rasa.community covers and the newsletter. You choose a **mode**, write an **eyebrow** and **headline**, and pick the **panel** that tells the article's story. Everything else (layout, type, colours, logo) is fixed by the system. Never invent colours, layouts or new panel types.

Source of truth: Figma file **Rasa Community Designs** (`YaKH4J4ahfvSba27RU1Pnu`) — sections *Library — Community cover cards*, *Rules*, *Library — Diagrams*, *Library — Showcase build headers*.

## Workflow

1. **Read the article** (or the brief). Write one sentence: *what does this article prove?* That sentence drives every choice below.
2. **Pick the mode** from the article's series → table below.
3. **Write the eyebrow** — site: the series name; newsletter: `RASA COMMUNITY · MON YYYY`; tutorial chapter: `TUTORIAL · CHAPTER N`.
4. **Write the headline** — the lesson, not the topic. Sentence case, no full stop, no highlighted words. Fits 2 lines → Size **Large** (96px); 3+ lines → **Regular** (72px). Over ~5 lines at 72px → shorten it.
5. **Pick the panel by story** → `references/panels.md` (catalogue with "use when", content limits and the spec format). Read it every time; don't pick from memory.
6. **Fill the panel with real content from the article** — real field names, commands, tool names, numbers, quotes. Never placeholder bars. Exactly one highlight.
7. **Produce the output** (see "Output" below), then **check it** against the checklist at the end.

## Modes

| Mode key | Use for | Accent |
|---|---|---|
| `default-light` | Rasa Community, general, brand | Rasa pink |
| `default-dark` | Showcase, flagship, contrast moments | Rasa pink |
| `casebook` | AI Team Casebook | lavender |
| `guides` | Guides for AI teams | pink |
| `tutorials` | Tutorial series & chapters | sage |
| `community` | Events, office hours, newsletter-only items | gold |

Newsletter images keep the **featured article's mode** (same image as the site, only the eyebrow changes). All values are in `references/tokens.json`.

## Colour logic (the part people get wrong)

- **Accent** (`accent`, `accent_subtle`, `accent_fg`) marks *the one thing to look at*: a highlighted row, toggle, node, link or bubble. In-family on series cards, Rasa pink on taupe. Inside dark UI (terminal, tool-call block) use `accent_on_dark`.
- **Product colours** are fixed and never change with mode: pass = sage, fail = coral, status chips may use seafoam (`info`). **Coral only ever means something went wrong.**
- **Illustration** (Geometric / Tiles) uses only the `illo` slots: monochrome shades of the hue on series cards, multicolour on taupe. Never hand-pick illustration colours.
- Product UI sits on a **cream surface** (`surface`) so it reads as product, not palette. Illustrations sit directly on the panel.
- **Dark panel only in `default-dark`.** Series cards are always light.
- Never combine lavender with periwinkle. Never add a second accent.

## Layout (fixed — the renderer and Figma component already do this)

1200×630. Title column 640 left (padding 48), panel 560 right. Eyebrow mono 22, pinned 48px from top-left. Headline serif, vertically centred on its own. Logo Full 84px pinned 48px bottom-left (never the square mark). Optional dek (sans 28, off by default — newsletter/social only). Optional series footer (mono 15, right of the logo — tutorial chapters only). No highlighter marks, no backdrop circles, no photos of people (use the glyph avatars).

## Output

Ask which output the person wants if it isn't obvious. Default: **PNG via code**.

### A. PNG via code
1. Write a spec JSON (format in `references/panels.md`).
2. Run `python scripts/render_card.py spec.json out.png` (needs `pip install playwright` + `playwright install chromium`). It also accepts a list of specs for batches.
3. Look at the PNG before delivering. If text wraps inside a row or the headline is over 5 lines, shorten and re-render — never shrink type.
Fonts: the STK Bureau woff2 files (Serif Book, Sans Book, Sans Mono) are bundled in `assets/fonts/` from the Rasa Brand 2026 design system and embedded automatically.

### B. Figma
Follow `references/figma.md`: create an instance of **Cover / Card**, set Size, Eyebrow, Headline, swap **Panel**, set the **Card hue** mode on the instance, then edit the panel's text layers. Never override fills on an instance — colour comes only from the mode.

### Showcase build headers
1200×400 header for showcase build cards: Category, Number, Step 1–3 (step 2 = core, accent outline), Caption. Mode `default-dark` for the gallery. Figma component **Showcase / Build header**; in code use spec `{"type":"showcase", ...}`.

### Diagrams inside posts
Read `references/diagrams.md`. In code use `assets/rasa-mermaid-theme.js` (Mermaid with brand classes `focus`, `pass`, `fail`, `muted`); in Figma use the Diagrams kit. Top-down, ≤8 nodes, exactly one focus node.

## Before you deliver — checklist

- [ ] The headline states the lesson and fits Large (≤2 lines) or Regular (≤5 lines)
- [ ] Mode matches the series; eyebrow matches the use (site / newsletter / chapter)
- [ ] The panel tells *this* article's story — you can say why in one sentence
- [ ] Panel content is real (from the article), no placeholder bars, no wrapped row text
- [ ] Exactly one accent highlight; coral only for an actual failure
- [ ] No photos, no highlighter, no backdrop shapes, Logo Full bottom-left
- [ ] For Figma: no fill overrides on the instance

When you deliver, add one line explaining the choice, e.g. *"Guides · Ledger — the article is about facts the agent said but never saved; the empty SAVED column is the finding."*

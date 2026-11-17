# Rasa Brand 2026

The Rasa visual identity, autumn 2026: warm Taupe neutrals, Rasa Pink as the one accent, confident serif headlines and calm Sans text. Use this system for every Rasa deck, page, document and design. It replaces the older purple system (Pretty Rasa).

The rules come in four layers. Read them in this order:

1. **Brand foundation:** color, type, logo, icons, graphics and a short summary of voice. Everything else builds on it.
2. **Slide layer:** the 1920 × 1080 canvas, the grid, the slide type scale, the 13 layouts and their building blocks. This is how every slide is structured.
3. **Visual layer:** the product windows, concept cards, flows, timelines and other UI visuals that sit inside a slide's visual container.
4. **Content layer:** how every word on a slide is written. Voice, terminology, eyebrows, emphasis and line breaks. Read it before writing any copy.

**Source of truth.** The Figma file *Rasa Brand Relaunch — Working File* holds the guidelines (Brand Guidelines Main) and the slide and visual libraries (Claude Slides Skills, UI library overview, Slide layer overview). The content layer comes from the [Writing and emphasis guidelines](https://app.notion.com/p/rasa/Writing-and-emphasis-guidelines-408b9c0d544a81379fd4f09f335df55b) in Notion, and on copy and emphasis those guidelines win. Color names below are the Figma token names. In this system's tokens the slashes become dashes: `primary/taupe/100` is `taupe-100`, `secondary/perriwinkle/200` is `periwinkle-200`, `text/fg_muted` is `text-fg-muted`, `taupe/focusRing` is `taupe-focus-ring`. The slide themes add `surface`, `fg`, `fg-muted`, `accent`, `hairline`, `panel` and `card`, which switch between Taupe Light and Taupe Dark. Where anything here differs from Figma, Figma wins.

---

# 1. Brand foundation

## Voice and content

The voice is precise, calm and direct. The internal descriptor is "capable, not cocky": state what Rasa can do and show the evidence. The descriptor is a label for the team and never appears in slide copy. The full rules live in section 4, Content layer. In short:

- **Headlines are short statements that end with a full stop.** "Brands with agents built to last." "Lay a foundation every team can build on."
- **Sentence case** for titles, labels and buttons. Title Case only for product names such as Rasa Studio and Rasa Pro. Uppercase only in eyebrows, tags and labels.
- **Specific over decorative.** A named thing and a verb you can watch happen beat an adjective.
- **Emphasis is rare.** Pink italic, on one word or short phrase, and the default is none.
- **No emoji.** Use words, the pink accent or a tag instead.

## Color

### Primary

| Name | Token | Hex | CMYK | Pantone | Use |
| --- | --- | --- | --- | --- | --- |
| Taupe Light | `primary/taupe/100` | #FAF6F0 | 0 / 2 / 4 / 2 | Not specified | Ground of light slides and pages; text on dark |
| Taupe Dark | `primary/taupe/950` | #181210 | 71 / 68 / 67 / 84 | Black 4 C | Ground of dark slides; text on light |
| Rasa Pink | `primary/pink/400` | #E85A91 | 0 / 78 / 13 / 0 | 7423 C | The one accent: emphasis, focus, key actions |

CMYK and Pantone are for print. Screens always use the hex values.

**Taupe is the only neutral.** The old Ink scale is retired; every neutral is a Taupe step.

**Taupe scale:** 50 #FFFBF5 · 100 #FAF6F0 · 200 #F3EEE7 · 250 #EDE8E0 · 300 #C8C0B6 · 400 #ABA49C · 500 #888077 · 600 #696157 · 700 #524A43 · 800 #3A312C · 900 #2B2523 · 950 #181210.

**Pink scale:** 50 #FEF5F8 · 100 #FCE7EF · 200 #F6BDD3 · 300 #F096B9 · 400 #E85A91 (Rasa Pink) · 500 #E12A71 · 600 #AA1E54 · 700 #7A1E42 · 800 #541B31 · 900 #3A1523 · 950 #220E16.

### Secondary

Seven supporting hues, each with a full 50–950 scale. The lead hue of each:

| Hue | Lead | Industry cue |
| --- | --- | --- |
| Periwinkle | `secondary/perriwinkle/200` #BBC9FF | Finance |
| Seafoam | `secondary/seafoam/300` #9FDBD0 | Insurance |
| Sage | `secondary/sage/200` #D1D8CE | Government |
| Coral | `secondary/coral/300` #FFB28C | Retail |
| Gold | `secondary/gold/400` #F6E668 | Healthcare |
| Lavender | `secondary/lavender/200` #C8B7E7 | Telecommunications |
| Orchid | `secondary/orchid/100` #F5DDF0 | Supporting accent |

Use secondary hues for supporting surfaces, data, tags and industry cues, always with Taupe Dark text.

**Lavender scale:** 50 #F9F7FC · 100 #F0EBF8 · 200 #C8B7E7 (lead) · 300 #BAA5E1 · 400 #9A7BD3 · 500 #7449C2 · 600 #553296 · 700 #412672 · 800 #2F1C53 · 900 #22153A · 950 #150E22. It now follows the same steps as every other hue; the old `lavender/original` at 30% is retired.

### Balance and contrast

- **Balance:** about 80% Taupe, 10% Pink, 10% secondary.
- **Contrast:** Taupe Dark on Taupe Light 17.2:1 (all text). Rasa Pink on Taupe Dark 5.6:1 (all text). Rasa Pink on Taupe Light 3.1:1: 24px and above, and graphics only.
- **Pink is never a background fill or body text.**

### Semantic roles

Every hue has the same seven roles: `contrast` (text on solid), `subtle`, `muted`, `emphasized` (tints from light to strong), `solid` (filled elements), `fg` (colored text) and `focusRing`. For Taupe: contrast → 50, subtle → 100, muted → 200, emphasized → 300, solid → 950, fg → 800, focusRing → 400. Use roles when building UI; use the palette when choosing colors for layouts and illustration.

## Typography

| Role | Brand typeface | Google substitute |
| --- | --- | --- |
| Headlines, quotes, display | STK Bureau Serif Book | Newsreader |
| Selective emphasis | STK Bureau Serif Book Italic | Newsreader Italic |
| Body, UI text | STK Bureau Sans Book | Inter |
| Buttons, names, numbers in UI | STK Bureau Sans Medium | Inter Medium |
| Slide eyebrows, meta, code | STK Bureau Sans Mono | JetBrains Mono |

Every text style in Figma is bound to a font mode: **Brand** (STK Bureau) for Claude-made decks and anything that can embed the fonts, **Google** for Google Slides and anywhere the license doesn't reach.

**Always load the Google substitutes.** Every page, deck or design built from this system must load them, even when STK Bureau is available, so text never falls back to Georgia, Arial or Courier New. Add this to the page head:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Newsreader:ital,wght@0,300;0,400;1,300;1,400&display=swap">
```

The font stacks (`--font-serif`, `--font-sans`, `--font-mono`) already name STK Bureau first, then Newsreader, Inter and JetBrains Mono, so nothing else changes. When exporting to PowerPoint or Google Slides, set text in the Google substitutes unless the recipient has STK Bureau installed.

**Fonts in slide decks: one family name per weight.** A Claude Slides deck loads at most 4 font families, and only one file per family name, so a deck can't pick Medium or Italic from a single "STK Bureau Sans" family. Load these four, each under its own name:

| Family name in the deck | File | Covers |
| --- | --- | --- |
| STK Bureau Serif | `fonts/STKBureauSerif-Book.woff2` | Display, Statement, Quote, UI/Feature, and the italic emphasis in titles (see below) |
| STK Bureau Sans | `fonts/STKBureauSans-Book.woff2` | Body, Subtitle, UI/Body, UI/Meta |
| STK Bureau Sans Medium | `fonts/STKBureauSans-Medium.woff2` | Action, Big number, UI/Title, UI/Action, UI/Label, UI/Number, tags, buttons |
| STK Bureau Sans Mono | `fonts/STKBureauSansMono-Regular.woff2` | Eyebrow, Meta, page numbers, UI/Code, hashes, pills. Always load it in Claude-made decks; it switches to JetBrains Mono only in Google mode. |

Set medium text in `STK Bureau Sans Medium` by name (keep the Inter fallback after it), never by font-weight alone, or the browser fakes it from Book. The italic emphasis in titles stays in `STK Bureau Serif` with `font-style: italic`: decks accept the browser's slanted version of Book rather than spending a font slot on the true italic. Pages and documents outside decks have no such limit and use the normal families with their real italic and weights.

## Logo

- **Logo Full** (the RASA speech bubble). In Taupe Dark on light grounds, Taupe Light on dark grounds, or Rasa Pink for hero moments. Keep proportions; no effects.
- **On slides:** 32px high at x 80, y 48. On Opening and Closing: 64px, centered.
- Keep the clear space defined in the guidelines around every placement.
- **Files:** the **Logos** group holds the full logo and the icon in Taupe Dark, Taupe Light and Rasa Pink (`rasa-logo-full-*.svg`, `rasa-logo-icon-*.svg`).

## Icons

- **Brand icons:** 27 pixel-aligned icons on a 24 × 24 grid (20 × 20 safe area, 0.5px grid, 2px line). Solid, single color: Taupe Dark on light, Taupe Light on dark, Pink only for an active state. Sizes 24, 48 or 96px; never below 16px. **Files:** the **IconsGeneric** group holds all 27 as `rasa-icon-<name>.svg` (agents, approach, arrow, bell, book, challenge, check, chevron, clock, close, customer-support, developer-tools, heart, home, mail, next, padlock, plus, results, search, skills, star, studio, tools, user, voice, voice-connected), in Taupe Dark. Images can't recolor themselves, so for dark grounds change the SVG's fill to Taupe Light (or Pink for an active state) when placing it.
- **UI visuals:** Phosphor icons, Regular weight, from the linked Phosphor library. See the visual layer for when to use them.

## Graphics

Two dotted patterns on the same dot grid: **Chladni** (a diagonal X or cross, inspired by cymatics) and **Soundwave** (a horizontal waveform). Each comes in three treatments:

| Treatment | Dots | Ground | Use |
| --- | --- | --- | --- |
| Subtle dark | `taupe/800` | Taupe Dark | Behind content on dark layouts |
| Subtle light | `taupe/300` | Taupe Light | Behind content on light layouts |
| Accent | Rasa Pink | Taupe Dark | Hero moments only, never behind text |

One pattern per layout; never mix Chladni and Soundwave. Let it bleed off at least one edge. The soundwave always runs horizontally. Scale uniformly; never stretch the dot grid. Keep text areas clear.

**Files:** the **Textures** group holds all four patterns in the three treatments as SVG, named `rasa-<pattern>-<treatment>.svg` (for example `rasa-chladni-01-subtle-light.svg`). For slides, the **Backgrounds** group holds four finished 16:9 backgrounds with the readability gradient already applied: `rasa-bg-chladni-01-dark.svg`, `-01-light`, `-02-dark` and `-02-light`. Use those full bleed behind Opening, Section divider, Single idea, Quote, Call to action and Closing.

---

# 2. Slide layer

## Canvas and grid

- **Canvas:** 1920 × 1080.
- **Safe area:** x 80–1840, y 48–1032.
- **Grid:** 12 columns of 110px, 40px gutters, 80px outer margins.
- **Logo:** top left at x 80, y 48, 32px (except Opening and Closing).
- **Page number:** Mono, bottom right, ending at x 1840, y 1032, with a full stop: `4.`

## Three slide types

| Type | Layouts | Anchor |
| --- | --- | --- |
| **Top-anchored** | Title and body, Two columns, Three columns with photo, Title and wide visual | Eyebrow at y 160, 80px under the logo |
| **Centered on a visual** | Text and image | 800 × 800 visual at y 140–940; the text block (860 × 800) is centered on the visual, 100px from it |
| **Centered** | Opening, Section divider, Single idea, Three columns, Quote, Customer proof, Call to action, Closing | The content group is centered in y 120–960 |

## Slide type scale

| Style | Font | Size / line | Use |
| --- | --- | --- | --- |
| Display XL | Serif | 120 / 126 | Opening title, closing |
| Display L | Serif | 100 / 105 | Section divider, single idea, proof title, CTA |
| Display M | Serif | 80 / 88 | Content slide titles |
| Quote | Serif | 64 / 72 | Customer quotes |
| Statement | Serif | 40 / 48 | Column headings, card names |
| Big number | Sans Medium | 160 / 160 | Metrics on proof cards; multipliers as 3x (lowercase x, no space, never ×) |
| Subtitle | Sans | 36 / 46 | Under opening and divider titles |
| Body L | Sans | 28 / 40 | Intro and supporting copy |
| Body | Sans | 24 / 34 | Column copy, card labels |
| Small | Sans | 18 / 26 | Footnotes, legal |
| Action | Sans Medium | 22 / 28 | Buttons |
| Eyebrow | Mono, uppercase | 18 / 24 | Section label above a title |
| Meta | Mono | 20 / 26 | Page numbers, dates |
| Attribution | Mono, uppercase | 22 / 28 | Quote attribution |

Slide eyebrows are always Mono and always uppercase, including card sectors and labels, and follow the eyebrow rules in section 4. **Eyebrows and meta are never pink.** Set eyebrows, meta lines, page numbers, dates and attributions in `fg-muted` (Taupe 700 on Light, Taupe 400 on Dark), never `accent` or any `pink-*` token. Pink italic emphasis is rare and follows the emphasis rules in section 4.

## Themes

- **Light:** Taupe 100 ground, Taupe 950 text, Taupe 700 muted text.
- **Dark:** Taupe 950 ground, Taupe 100 text, Taupe 400 muted text.
- Opening, Section divider, Call to action and Closing are Dark. The rest can be Light or Dark; alternate to pace a deck.
- On slides, color is Taupe plus Rasa Pink for the single emphasis and the quote mark. Eyebrows, meta, page numbers and attributions stay `fg-muted`, never pink. Secondary hues appear only on pills and on the industry dot of a proof card.

## Layouts

| # | Layout | Variants | Slot limits | Visual container |
| --- | --- | --- | --- | --- |
| 01 | Opening | Dark | Display XL, 2 lines, emphasis optional; subtitle 1 line; date line `RASA · MONTH YEAR` | None. Background Pattern (Chladni) or Plain |
| 02 | Section divider | Dark | Display L, 2 lines; subtitle optional, 1 line; no section number | None. Background Pattern or Plain |
| 03 | Single idea | Light, Dark | Display L, 2 lines; support Body L, 1–2 lines | None. Background Pattern or Plain |
| 04 | Title and body | Light, Dark | Eyebrow 1–3 words; Display M, 2 lines; Body L, max 60 words, 8 columns wide | None |
| 05 | Two columns | Light, Dark | Display M, 3 lines, left; 2–3 points right, each Statement (1 line) + Body (max 20 words) | None |
| 06 | Text and image | Image right or left × Light, Dark | Display M, 3 lines; Body L, max 40 words | **800 × 800 square:** `slides/media` (photo or product) or `slides/visual-container` Square (a UI visual) |
| 07 | Three columns | Light, Dark | Display M, 2 lines; 3 columns, Statement + Body (max 20 words), hairline dividers | None |
| 08 | Three columns with photo | Light, Dark | As 07, plus a photo | Photo 800 × 480, top right at x 1040, y 160 (photos only) |
| 09 | Customer proof | Light, Dark | Display L, 1 line; exactly 3 proof cards: sector, name, one figure (max 4 characters), label (max 6 words) | Proof cards |
| 10 | Quote | Dark, Light | Quote max 30 words, 3 lines; attribution `NAME · TITLE, COMPANY` | None. Background Pattern or Plain |
| 12 | Call to action | Dark | Display L, 2 lines; subtitle 1 line; one button | None. Background Pattern or Plain |
| 13 | Closing | Dark | Display XL, 1 line; label (Q&A or contact); presenter name and role | None. Background Pattern or Plain |
| 14 | Title and wide visual | Light, Dark | Eyebrow at y 160; Display M, **one line** (max ~40 characters) | **Wide (1760 × content + 64, 644 max):** `slides/visual-container` Wide at x 80, centered vertically in the visual area y 336–980 (center y 658); eyebrow and title stay fixed |

**Backgrounds on centered slides:** Opening, Section divider, Single idea, Quote, Call to action and Closing each come with the Chladni Pattern or Plain. Both are approved; the person chooses. When they don't say, use Pattern (the Figma default).

## Building blocks

- `slides/visual-container`: the home for UI visuals (see the visual layer).
- `slides/media`: photos and product placeholders in 800 × 800, arranged Single, Stacked or Feature + 2; Photo or Product; Light or Dark.
- `slides/placeholder/photo` and `slides/placeholder/product`: radius 32; product keeps a 32px inner safe area.
- **Rule:** photos are full bleed, cropped to the shape with no inner margin (800 × 800 on Text and image, 800 × 480 above columns). Product UI (screenshots, diagrams, UI built from components) always keeps a 32px inner margin and never touches the rounded edge.
- `slides/card/proof`: 560 wide, radius 32, 1px Taupe border; sector, pill, name (Statement), figure (Big number), label (Body).
- `slides/pill`: the seven secondary colors, Mono label, radius 32, 32 high.
- `slides/button`: Light or Dark, radius 4.
- `slides/page-number`: Mono, bottom right.
- `slides/background`: Chladni or Soundwave in the three treatments, with placements Full bleed, Right half or Bottom band.

## Slide rules

1. **One idea per slide.** If a slide needs two titles, it's two slides.
2. **Split instead of cram.** When content exceeds a layout's slot limits, split it across slides; never shrink the type.
3. **Respect the slot limits** in the layout table: lines per title, words per body, items per row.
4. **One visual per slide,** in one visual container.
5. **Backgrounds** only on centered, big-text layouts: Opening, Divider, Single idea, Quote, CTA, Closing. The accent treatment only for hero moments, never behind text.
6. **Logo and page number** on every slide except Opening and Closing.
7. **Hairlines, not boxes,** to divide columns. Cards: 1px outline, radius 32, no shadow.

---

# 3. Visual layer

Everything inside a visual container: product windows, concept cards, flows, timelines, conversations, data. Built from the `ui/` components in Figma (see the UI library overview).

## Containers

`slides/visual-container`, one per slide:

| Size | Dimensions | Used in |
| --- | --- | --- |
| Square | 800 × 800 | 06 Text and image (right or left) |
| Wide | 1760 wide; height hugs content, 644 max | 14 Title and wide visual |

**Background:** **Filled** (Taupe 200 on light, Taupe 800 on dark; radius 32) or **None** (transparent). Both keep a 32px inner margin, and the area and alignment stay the same either way; the visual is centered horizontally.

**Wide height:** the container hugs its content. Height = content height + 32px top + 32px bottom, so the content can be at most 580px tall and the container at most 644px. Never pad a short visual out to 644. If the content needs more than 580px, summarize or split it rather than shrinking type. The container's position comes from the layout that uses it, not from the container.

- **None** by default for a single product window or self-contained cards.
- **Filled** by default for multi-part diagrams, flows, timelines and anything drawn without its own surfaces: waveforms, connectors, loose chips.

**Which size:** single product windows and compact cards go in the Square. Architecture, flows, timelines, rows of 3–5 cards and two windows side by side go in the Wide. Wide visuals always take a one-line title.

## Two card families

| | Concept card (`ui/card`) | Product window (`ui/window`) |
| --- | --- | --- |
| **For** | Storytelling: how something works, who owns what (architecture, ownership, flows, capabilities) | Real product moments: runs, plans, settings, results |
| **Header** | `ui/card/header`, 56 high: Sans title, optional icon tile and tag. No dots, no breadcrumb | `ui/window/bar`, 56 high: three dots (pink, Taupe 300, Taupe 300), muted breadcrumb (e.g. `billing-agent / Run #12`), optional status badge and mono detail |
| **Content** | Rows with icons, category tags, chips, nodes | Mono for code-like names, result tables, step tabs, status badges, Must / Should, buttons |

Both: radius 16, Taupe 50 surface, 1px Taupe 300 border. Don't mix the two in one visual, unless a concept diagram zooms into one real window.

## Type in visuals

**Two text-size floors.** Slide-layer text (titles, statements, body, eyebrows, page numbers, captions set directly on the slide) is never below 24px. Visual-layer text, inside product windows, cards, rows, tags, chips and other `ui/` components placed in a visual container, keeps its true UI sizes down to 14px (12px for UI/Micro). Never enlarge UI text to 24px to meet the slide rule: it breaks the components. Never shrink slide-layer text below 24px to fit more in: cut words instead.

| Style | Spec | Use |
| --- | --- | --- |
| UI/Title | Sans Medium 20/26 | Card and window titles, row titles, node names |
| UI/Heading | Sans Medium 26/32 | Titles of concept cards in a row of 2–4 |
| UI/Body | Sans Book 18/24 | Row text, instructions, chips, descriptions |
| UI/Action | Sans Medium 16/20 | Buttons, names, step labels |
| UI/Label | Sans Medium 14/18, UPPERCASE, +4% | Tags, status badges, section labels, table headers |
| UI/Micro | Sans Medium 12/16, UPPERCASE, +4% | Secondary metadata and small initials only |
| UI/Meta | Sans Book 14/18 | Small secondary detail ("trained", "7 of 9") |
| UI/Code | Mono 16/20 | Code-like names: test cases, skills, models, branches, paths |
| UI/Code block | Mono 16/26 | Multi-line code in `ui/code-window` |
| UI/Number | Sans Medium 26/30 | Every number inside a card or visual |
| UI/Feature | Serif 28/32 | Feature-card titles, second part in black italic |

**Studio type (product UI at true scale).** Inside `ui/studio-*` visuals and the Studio pieces (`ui/skill-prose`, `ui/insight-card`, `ui/run-card`, `ui/compare-stat`, `ui/code-diff`, `ui/resource-chip`, `ui/collab-cursor`), text follows the real product, matched to the Rasa animation frames. Never mix these with the UI/ styles in one visual.

| Style | Spec | Use |
| --- | --- | --- |
| Studio/Label | Sans Medium 14/20 | Pane titles, Copilot, active tab, toggle labels |
| Studio/Body | Sans Book 14/20 | Messages, tabs, chips, subtitles, details |
| Studio/Body L | Sans Book 15/22 | Insight text, simulated customer lines |
| Studio/Tag | Sans Medium 12/16 | Tags and badges (INSIGHT, PASSED), initials, cursor names |
| Studio/Mono S | Mono 12/16 | Skill eyebrow, YAML toggle |
| Studio/Mono | Mono 14/22 | Versions, branch names, code views |
| Studio/Card title | Sans Medium 17/22 | Result card titles (Eval run) |
| Studio/Panel title | Sans SemiBold 24/30 | Workspace titles (Skills, Eval run) |
| Studio/Prose | Sans Book 24/32 | A skill shown as plain language |
| Studio/Stat | Sans Medium 44/48 | Before/after values |

- **Mono only means code.** Labels and tags are uppercase Sans; slide-level eyebrows stay Mono.
- **Numbers are Sans Medium** inside cards and visuals, never Serif. Serif numbers belong to slide-level type only.
- **Minimum size:** 14px for anything the audience reads; 12px (UI/Micro) only for secondary metadata.

## Color in visuals

**Categories** (teams, roles, product areas) take palette colors **in this order** per deck: 1 Periwinkle, 2 Seafoam, 3 Gold, 4 Coral, 5 Orchid, 6 Lavender, 7 Sage.

- **One color, one meaning across the whole deck.** Keep a color legend for the deck: once Contact center is periwinkle, it stays periwinkle on every slide.
- At most **6 categories per visual;** the rest are neutral.
- **Three forms of a category label,** all in the same color: dot + label (`ui/label`), tinted tag (`ui/tag/category`), initials circle (`ui/badge`, 2 letters, spelled out once on the slide).
- **Generic decoration** (preview flags, mini illustrations) uses brand colors without counting against the legend.

**States** keep fixed meanings (`ui/tag/status`): Success for pass, live, connected, done · Danger for fail, blocked · Warning for running, awaiting, mocked · Info for draft · Neutral for should and default · Pink for must and focus.

**Pink** marks the one focus element of a visual, numbered sequence markers, live or accent states, and Must. Never more than one focus.

**Gold rule:** gold is the lightest hue, so small gold parts shift darker: tint 200 (not 100), dot 600 (not 400), light shapes 500 (not 300), text and accent 700, badge circle 400. Large gold surfaces (bars, panels) use 100, so the gold tags on them stand out.

**Tints and shades:** backgrounds at hue 100, light shapes at 300, accents and text at 700, for every hue including Lavender.

## Icons in visuals

Phosphor Regular, from the linked library.

- **Use an icon** where the symbol helps recognition: channels and agents (phone, app, headset), key skills or actions, the one focus item.
- **Text only** for attributes and plain lists (infrastructure, environments, settings) and any group of more than about 4 items.
- **Never mix** icon and text-only chips in one group.

## Lines and connectors

- **Connectors are orthogonal:** straight runs with 12px rounded corners, 1.5px Taupe 700 (Pink 400 for the one focus path). Never curved or freeform bends.
- **Arrows:** one head, at the end the flow goes to. Dotted lines (2px, Taupe 700, dash 2/8) only to join items in a row, such as deploy targets.
- **Gridlines and axes:** 1px Taupe 300; mid lines dotted.

## Built for a container

Every visual component says which container it is designed for, and how it adapts to the other:

| Container | Content area | Typical visuals |
| --- | --- | --- |
| Square (06 Text and image) | 736 × 736 | `ui/team-loops`, `ui/pill-cloud`, `ui/studio-shell` Square, single windows |
| Wide (14 Title and wide visual) | 1696 × up to 580 | `ui/quadrant`, `ui/layer-stack`, `ui/ramp-chart`, `ui/trace`, `ui/dashboard`, `ui/skill-stack`, `ui/deploy-targets`, `ui/studio-shell` Wide |

Pick the layout first; the layout fixes the container; then use the arrangement built for it. Never scale a visual to fit the other size.

## Simplify, don't screenshot

When showing the product, use `ui/studio-shell` and real copy only where the slide points. Everything else is `ui/skeleton` (lines, rows, dashed cards). No browser chrome unless the slide is about the browser.

## Components

**Containers:** `ui/card` and `ui/card/header` · `ui/window` and `ui/window/bar` · `ui/code-window` (dark, optional file title, never wrapped; full syntax color set in its README and the `--code-*` tokens) · `ui/file-card` (a plain-language file with git bar) · `ui/feature-card` · `ui/phase-card` · `ui/env-card` · `ui/node` · `ui/preview`.

**Content:** `ui/list-row` · `ui/result-row` · `ui/table-row` · `ui/member-row` · `ui/commit-row` · `ui/strictness-row` · `ui/kv-row` · `ui/item` · `ui/metric` · `ui/stat` · `ui/insight-bar` · `ui/notice` · `ui/chat-bubble` · `ui/marker` · `ui/step-tab` · `ui/timeline-step` · `ui/field`.

**Diagrams:** `ui/flow-station` and `ui/flow` · `ui/callout` · `ui/hub` · `ui/team-loop` and `ui/team-loops` · `ui/venn` and `ui/venn · orbit` · `ui/quadrant` · `ui/layer-stack`.

**Data:** `ui/ramp-chart · track` and `ui/ramp-chart · bars` · `ui/trace` · `ui/kpi-tile` and `ui/dashboard` · `ui/numeral-stat` (slide layer, see below) · `ui/compare-stat` · `ui/dot-grid`.

**Code and conversation:** `ui/code-before-after` · `ui/code-annotated` · `ui/code-diff` (light) · `ui/tree-row` and `ui/file-tree` · `ui/rule-row` and `ui/rule-list` · `ui/stack-block` and `ui/skill-stack` · `ui/thread-event` and `ui/chat-thread` · `ui/terminal-step` and `ui/terminal-steps`.

**Voice:** `ui/voice-call` (Light, Dark).

**Texture, files and targets:** `ui/pill-cloud` · `ui/doc-thumb` and `ui/doc-grid` · `ui/deploy-target` and `ui/deploy-targets`.

**Studio:** `ui/studio-shell` (Wide, Square) · `ui/skeleton` · `ui/skill-prose` · `ui/resource-chip` · `ui/collab-cursor` · `ui/avatar-stack` · `ui/insight-card` · `ui/run-card`.

**Small parts:** `ui/tag/status` · `ui/tag/category` · `ui/label` · `ui/badge` · `ui/chip` (states Default, Accent, Success, Skill, Off, Dark; sizes Regular and Small) · `ui/button` · `ui/toggle` · `ui/attachment` · `ui/icon-tile` · `ui/strictness` · `ui/mini/flags`, `doc`, `dots`, `timeline`, `squares`.

Each component's description in Figma holds its exact rules.

**Proof cards or numeral stats.** `slides/card/proof` is for named customers (sector, name, one figure). `ui/numeral-stat` is for claims about Rasa itself (“8 years …”). Numeral stats always come in a row filling the 1760 width with 40px gaps: 3 per row (560 wide, numeral on, up to 3 characters), 4 per row (410, numeral on with one character, or off), 5 per row (320, numeral off only). The claim always states the number.

**Code views.** `ui/code-window` is dark and for code as code. For a skill file or config being changed, use the light `ui/code-diff` (Taupe 100, added lines on Seafoam 50 with “+”, removed on Coral 50 with “−”).

## Density and readability

| Thing | Limit |
| --- | --- |
| Rows in a list or table | 6; then a "+ N more" line |
| Chat turns in a window | 6, one sentence each |
| Turns on a call timeline | 10 short turns |
| Numbered markers | 6 |
| Categories per visual | 6 |
| Notices per visual | 1; actions only on decisions, never on a blocked state |
| Buttons together | 2, one primary |
| Focus elements | 1 |
| Card headers and window bars | 56 high |
| Text size | 14px minimum; 12px for secondary metadata only |
| Left-edge accent stripes | Never, on any element: no colored bar or thick border down one side of a card, notice, row or quote. Show tone with a fill, a dot or a tag instead |

Reduce by summarizing ("+ 4 more skills"), not by shrinking type. If a visual still doesn't fit, use the Wide container or split it across two slides.

## Chat bubbles

`ui/chat-bubble`: one small tail corner (4px) pointing to the speaker or timeline; the other corners 16px. **No dark bubbles on light grounds.**

- **Chat windows and Copilot:** the user is **Soft** (Taupe 250), aligned right, tail bottom right; the agent is **Light** (Taupe 50) or plain text, aligned left. Use a Taupe 100 ground behind them so both read.
- **Call timelines (`ui/voice-call`):** Light theme on Taupe 100, both speakers in light bubbles; Dark theme on Taupe 950, bubbles in Taupe 100 and Taupe 800.
- **Highlight** (pink outline) for the one picked or focus turn; **Error** (coral tint) for a wrong answer.
- The Dark tone is kept only for dark grounds.

## Rebuilding an existing visual

When a visual comes from an existing deck or the product:

1. **Inventory first:** every element, its text and its color.
2. **Map, don't reinvent:** each element to its `ui/` component, each color to the token with the same meaning.
3. **Keep everything by default.** If it breaks a limit, propose a fix (the Wide container, a split, a "+ N more" line) rather than dropping content silently.
4. **Check before delivering:** smallest text, fit inside the container, even gaps, colors against the deck legend, no stray overrides.

---

# 4. Content layer

How every word on a design or slide is written. Source: [Writing and emphasis guidelines](https://app.notion.com/p/rasa/Writing-and-emphasis-guidelines-408b9c0d544a81379fd4f09f335df55b) (Notion). When asked to make slides, slideshow or deck use the /rasa-slides skill.

## Voice

Write slide copy like a precise colleague explaining how the product works: calm, technical and direct. Give slides more energy than the website by making claims sharper. Skip extra adjectives.

- **Precise** without reading like pasted documentation. **Confident** without inflated category language. **Concise** without being cryptic.
- **Capable, not cocky** is the internal voice descriptor. State what Rasa can do and show the evidence. Describe alternatives fairly and leave out the shots at them. The descriptor is a label. It is never slide copy and never a template for it.
- **Make each line true, specific and useful.** The overall claim and its evidence should be distinctive to Rasa. Not every line has to be unique.
- **Use a visual where it clarifies or supports the idea.** A slide can also work without one.
- **Verify before you write.** Check claims, numbers, customers and product names against available source material. Omit or flag anything you can't verify, and never invent or obscure it. Keep the conditions behind each claim: don't shorten approved responses to "zero hallucinations."

## Write for the audience

Lead with the audience's concern. Builders may want to see how it works, executives may look first for the outcome, and governance teams may look for controls and evidence. These are starting points and don't limit what each audience needs. Keep the underlying message the same across audiences.

## How to write a line

1. State what happens in plain language first.
2. Use a verb someone could watch happen: route, pause, resume, retry, hand off, checkpoint, inspect, deploy.
3. Name the thing: the repo, the CLI, a Helm chart. Avoid "dev environment" and "capability".
4. Cut decorative adjectives, repeated nouns and anything already clear from the slide. Keep words that add meaning or precision.
5. Say each thing once. Where useful, let the headline make the claim, the subhead add the mechanism and the visual clarify or support it. Not every slide needs all three.

**Headlines** are short statements that end with a full stop. **Sentence case** for everything else. Reserve Title Case for product names such as Rasa Studio and Rasa Pro.

## Terminology

- **Category:** use "agent building platform for AI product teams" when a category description is needed.
- **Default noun:** "agents" or "AI agents".
- **Ownership:** use it to describe the customer's control of agents, logic and data.
- **Open code:** use it as a technical proof point. Reserve "open source" for the original framework.
- **Customer-facing:** use it when the context is customer conversations. Don't use it to describe everything Rasa supports.

The [messaging system](https://docs.google.com/document/d/1B2e5seFzqLQR1bEwwMvJQ51oPXZiNTC-rXMA20lVawc/edit?tab=t.0) holds the full terminology.

## Avoid

Avoid these patterns in slide copy:

- The hinged comma that contrasts two halves of a sentence: "X, not Y"
- "Not X. Y." and "It's not about X, it's about Y"
- "X when you want it, Y when you need it"
- Paired fragments used only for rhythm
- Intensifiers between commas: "every run," "always"
- The company as subject: "We built...", "Our platform lets you..."
- Vague verbs: enable, empower, leverage, unlock, streamline, transform
- Asserted feelings: seamless, effortless, intuitive, easy
- Stacked adjectives: "powerful, flexible, enterprise-grade"

## Before and after

These pairs illustrate the writing rules with claims from the messaging system. Check that a claim is current and applies to the context before reusing it.

| Before | After |
| --- | --- |
| Engineers and business teams build together, not separately. | Engineers and business teams build on the same platform. |
| Rasa runs on your infrastructure, not ours. | You can deploy Rasa in your own cloud or on-premises. |
| Built for governance. | Rasa includes version control, change approval, audit trails, and role-based access. |

## Eyebrows

An eyebrow orients the reader. It is 1–3 words and one idea, with no punctuation. It is set in Mono, uppercase (see the slide type scale), in `fg-muted`.

- **Never pink.** Eyebrows and meta lines (dates, page numbers, attributions) are never Rasa Pink or any pink tint. Pink is reserved for the one emphasis on the slide; a pink eyebrow competes with it.

- No middle dots, commas, slashes or other separators.
- No slide numbers, counts or stacked metadata.
- If it needs a separator, it is two ideas. Keep the one that orients.

Avoid: `01 · Beginning · Context`. Use: `Context`.

The Opening date line (`RASA · MONTH YEAR`) and the Quote attribution (`NAME · TITLE, COMPANY`) are metadata lines with their own formats. The eyebrow rules above don't apply to them.

## Emphasis

Emphasis is the pink italic component, set in the Serif italic (see Typography). It works only because it is rare. When every headline has it, it signals nothing.

**Default to none.** Use it only where it drives a point home:

- Opening slides
- Section headers
- A single pivotal or closing line
- Highlighting a Rasa advantage or impact

**Limits**

- One word or short phrase per slide, never a full sentence.
- As a starting point, use it on one or two slides in a typical deck. A longer deck may need more. Each use should direct attention to an important idea.
- On an ordinary content slide among several, leave it plain.
- Don't substitute bold, color or caps elsewhere to make up for it.

**Test:** does the emphasis direct attention to the slide's most important idea? If not, remove it. When in doubt, leave it plain.

**Previews.** The layout previews in this system use dummy copy to show where emphasis can sit. They don't set how often to use it. With real content, decide per slide with the test above.

## Line breaks

Inspect each rendered slide, not just the source text. If you can't inspect a render, say so and don't claim the layout has been checked.

- **No orphans or widows:** a single word stranded alone on the last line of a headline, subhead or paragraph.
- **No broken phrases:** keep product names (Rasa Studio), numbers with their units and emphasized phrases on one line.
- **No mid-word breaks** or stray hyphenation.
- **Fix the copy first.** Shorten or reword so the lines fall naturally. Then balance the line lengths, or use a non-breaking space where the tool allows.

## Before you finish a deck

1. Check claims, numbers, customer names and product names against available source material. Omit or flag anything you can't verify.
2. Count slides with pink italic emphasis. Use it sparingly and check that each use directs attention to an important idea.
3. Check every eyebrow: 3 words or fewer, no punctuation, and set in `fg-muted`, not pink. Check meta lines and page numbers for pink too.
4. Read each slide's copy and any visual together. Make sure each element earns its place and adds something useful.
5. Scan the copy for the patterns on the Avoid list.
6. Inspect every rendered slide for single-word last lines, split phrases and broken words. Fix the copy first, then adjust line breaks. If you can't inspect a render, say so.

---

## Consuming this system (generated — do not edit)

Every path named below is under `project/` in this design system: read `project/api/tokens.md`, not `api/tokens.md`.

`components/bundle.js` defines `window.RasaNewBrand` (106 components); `components/bundle.css` is its stylesheet; `tokens.css` is every token as a CSS variable plus `@font-face` for the fonts. `components/bundle.css` reads its variables from `tokens.css`. The bundle needs `components/lib/react.production.min.js` (`window.React`), `components/lib/react-dom.production.min.js` (`window.ReactDOM`), loaded before it. Build any UI by mounting these components; never hand-build a control or draw an icon the system provides.

- **Standalone page:** inline `tokens.css` and `components/bundle.css` in a `<style>`, then the library files and `components/bundle.js` as classic scripts (a file containing `</style`, `</script` or `<!--` breaks an inline element: write the sequence `<\/style`, `<\/script` or `\x3C!--` in your copy, or load that file by URL).
- **Design canvas:** bring `tokens.css`, `components/bundle.css`, `components/bundle.js` and `components/index.d.ts` (for the editor’s props panel) onto the canvas in full, as the canvas type’s design-system components reference says (a server-side copy first where it offers one); in each artboard that uses this system, right after the `support.js` line, load `tokens.css` first, then the stylesheet, then the script; skip the library files (the artboard supplies React); mount with `<x-import component-from-global-scope="RasaNewBrand.<Comp>" …>`.
- **Slides deck, or any surface that cannot run the bundle:** tokens and fonts — the values are on `api/tokens.md`; the deck takes `tokens.json` by file path for its colour pickers, and fonts as “Fonts” below says.

Fonts: `tokens.css` loads each font from its file, by path.

- **Design canvas:** copy `fonts/STKBureauSerif-Book.woff2`, `fonts/STKBureauSerif-BookItalic.woff2`, `fonts/STKBureauSans-Book.woff2`, `fonts/STKBureauSans-BookItalic.woff2`, `fonts/STKBureauSans-Regular.woff2`, `fonts/STKBureauSans-Italic.woff2`, `fonts/STKBureauSans-Medium.woff2`, `fonts/STKBureauSans-MediumItalic.woff2`, `fonts/STKBureauSans-SemiBold.woff2`, `fonts/STKBureauSans-SemiBoldItalic.woff2` and `fonts/STKBureauSansMono-Regular.woff2` to the same paths under the canvas’s `project/ds/<folder>/` (`<folder>` is the folder you install this system under; `fonts/STKBureauSerif-Book.woff2` lands on `project/ds/<folder>/fonts/STKBureauSerif-Book.woff2`), in the same call that installs this system; the copy of `tokens.css` that each artboard links loads them from there. If the install’s reply leaves a font out, bring that font in as for any other page.
- **Slides deck:** for each family you use in the deck (`faces` holds at most the number of typefaces Slides’ `deck-files.md` gives), install its file with the system and name the path it lands on as that family’s `src` in `project/deck.json` `faces`, under the key in the Slides column. A deck takes a font as a file only under the rule in Slides’ `fonts.md` (no space or leading underscore in its path, for two): any other font, or one kept by id, is uploaded as `fonts.md` says.
- **Any other page:** one file per family is enough (below: the upright face nearest regular weight; bold and italic synthesize). Fetch it as the fetch column says (Artifact tool `read`, that id or path as `path`), upload it as an asset (`publish`, `file_path`, `asset:true`) and declare it with an `@font-face { font-family: "<family>"; src: url(<uploaded>) }` rule.

| family | file | fetch | CSS | Slides `faces` key |
| --- | --- | --- | --- | --- |
| STK Bureau Serif | `fonts/STKBureauSerif-Book.woff2` (weight 300) | `read` the file with `project/` in front | `var(--font-serif)` | `stk-bureau-serif` |
| STK Bureau Sans | `fonts/STKBureauSans-Regular.woff2` (weight 400) | `read` the file with `project/` in front | `var(--font-sans)` | `stk-bureau-sans` |
| STK Bureau Sans Mono | `fonts/STKBureauSansMono-Regular.woff2` (weight 400) | `read` the file with `project/` in front | `var(--font-mono)` | `stk-bureau-sans-mono` |

**Read, per thing:** a component’s props, parts and examples: `api/components/<Comp>.md`; token values: `api/tokens.md`; stored assets and their paths: `api/assets/<Group>.md`. After this README, fetch the cards and fonts you need in ONE message as parallel calls — none depends on another.

**Two rules.** Before you use a thing — a component, a token group, an icon, an asset — read its card from the index below; a value you did not read from a card is a guess. `tokens.json`, `manifest.json`, `components/index.d.ts` and `design-system.json` are sources for tools: hand them over. `components/<Comp>/README.md` and `assets/<Group>/README.md` are the long-form second read a card links to; `SKILL.md` and `artifact-type/` beside them are authoring guidance, not needed to consume the system.

## Index (generated — do not edit)

**Tokens**

- `api/tokens.md` — Every token: surface, text, fill, border, palette, type, spacing, radius, border-width. (34.1k)

**Icons and assets**

- `api/assets/Logos.md` — 6 files, by asset id. (2.5k)
- `api/assets/IconsGeneric.md` — 27 files, by asset id. (4.2k)
- `api/assets/Textures.md` — 12 files, by asset id. (3.3k)
- `api/assets/Backgrounds.md` — 4 files, by asset id. (2.4k)

**Components** (`api/components/<Comp>.md`, 106)

- **Visual layer**: `Button` — Button: primary and secondary actions inside product windows · `StatusTag` — Status tag: fixed-meaning states inside product windows and visuals · `CategoryTag` — Category tag: a team, role or product area in its legend color · `Chip` — Chip: a skill, tool, channel or attribute inside a visual · `ChatBubble` — Chat bubble: user and agent turns in chat windows and call timelines · `ProductWindow` — Product window: a real product moment (runs, plans, settings, results) · `ConceptCard` — Concept card: storytelling about how something works or who owns what · `VisualContainer` — Visual container: the one home for a UI visual on a slide · `ResultRow` — One evaluation result (ui/result-row): name in UI/Code, level (Must / Should) in UI/Body 18 taupe 700, status tag · `Notice` — Notice (ui/notice): Approval (pink 50 fill, 8px pink 400 dot before the title: a decision waiting on someone, with actions), Blocked (coral 100 fill, coral 500… · `StepTab` — Pipeline step tab (ui/step-tab): Build, Evaluations, Simulation · `Metric` — Metric tile (ui/metric): muted label (UI/Body 18, taupe 600) over a number (UI/Number, Sans Medium 26/30) · `TableRow` — Table row (ui/table-row), 4 columns (flex, 220, 96, 96): Header = taupe 100, UI/Label uppercase, taupe 600; Row = first cell UI/Action, the rest UI/Code (model… · `TimelineStep` — Timeline step (ui/timeline-step): year (UI/Number; taupe 500 for Past, taupe 950 for Now), a 12px dot on the line (hollow for Past, filled dark for Now), title… · `Badge` — Compact category or person: 2-letter initials in a color circle (32 px with Sans Medium 14, 28 px with Sans Medium 12) · `Label` — Light category label: color dot + UI/Label (Sans Medium 14), no fill · `MemberRow` — Person row (ui/member-row): initials badge (Dark), name (UI/Action), scope (UI/Body, muted, right), role tag (status Neutral) · `KvRow` — Definition list item (ui/kv-row): key (UI/Title, fixed 260) and value (UI/Body, muted, wraps) · `Stat` — Headline number with a short caption (ui/stat): UI/Number (Sans Medium 26) over UI/Meta · `Field` — Input (ui/field): Text area (multi-line prompt) or Select (with caret) · `Toggle` — Switch (ui/toggle): On = pink 400 (enabled), Off = Taupe 300 · `Attachment` — Attached source (ui/attachment): small type label (UI/Micro: PDF, JSON, SKILL) + name (UI/Body) · `Item` — One capability inside a group (ui/item): UI/Body on a bordered Taupe 50 box (radius 10, padding 9/12) · `Node` — Node in a flow or architecture (ui/node): optional channel preview, Phosphor glyph and title (UI/Title), one-line description (UI/Body), owner as a CategoryTag · `InsightBar` — Insight bar (ui/insight-bar): a finding raised by Rasa (e.g · `CommitRow` — One commit on a history line (ui/commit-row): node (Studio = pink 400 ring on pink 100, other = gray ring), hash (UI/Code, muted), message (UI/Body, wraps; the… · `CodeWindow` — Dark code editor (ui/code-window): Taupe 950, radius 16, padding 18/24/24, three dots (pink 400, taupe 700, taupe 700) and an optional file title after them (M… · `Strictness` — How strict a skill is (ui/strictness), from Agent decides (1) to Exact steps (5): five 56 × 10 segments, radius 3, gap 6; filled ones graded Taupe 300 → 400 →… · `StrictnessRow` — A skill with its strictness (ui/strictness-row): icon tile (28), name (UI/Title), Strictness bar on the right · `PhaseCard` — Phase card (ui/phase-card) in a row of 3–4: phase label + duration tag, icon tile, title (UI/Heading), description (UI/Body), a mini visual (MiniVisual squares… · `EnvCard` — A place it runs or connects to (ui/env-card): icon tile, title (UI/Heading), one-line subtitle (UI/Body) · `FeatureCard` — Feature card (ui/feature-card): preview area (Taupe 100, radius 10, holds a MiniVisual or Preview) + title (UI/Feature, Serif 28, second part in black italic)… · `Marker` — Numbered moment in a sequence or timeline (ui/marker): pink numbered circle (28, UI/Action in Taupe 50) + label (UI/Title), gap 10 · `Preview` — Tiny channel preview for an agent card (ui/preview) · `MiniVisual` — Mini previews (ui/mini/*), exported from Figma as exact drawings: flags (flagged conversations: three rows with a gray line and a colored flag, decorative not… · `FileCard` — A file in a repository, shown as plain language (ui/file-card): Taupe 50, 1px Taupe 300 border, radius 12
- `WindowBar` — The 56px product-window header: three dots, muted breadcrumb, optional mono meta and status tag · `ResultList` — Bordered inner card (radius 16, 24px side inset) holding ResultRows inside a ProductWindow · `StepTabs` — StepTabs · `Table` — Table
- **Slides**: `PageNumber` — Slide page number (slides/page-number): Mono (Meta 20/26), bottom right, right edge at x 1840, bottom at y 1032 · `Pill` — Industry or topic tag (slides/pill): Mono label 18/24, uppercase, 1–2 words · `SlideButton` — Slide button (slides/button): one per slide · `ProofCard` — Customer proof (slides/card/proof): sector (Mono 18, uppercase, 1–2 words) + industry pill · `SlideCallToAction` — Call to action: a closing ask with one button, on Taupe Dark · `SlideClosing` — Closing slide: thank you, Q&A and the presenter, on Taupe Dark · `SlideCustomerProof` — Customer proof: three proof cards, each with one big figure · `SlideOpening` — Opening slide: the deck title on Taupe Dark · `SlideQuote` — Quote: one customer quote, centered, with a pink quote mark · `SlideSectionDivider` — Section divider: a chapter title on Taupe Dark · `SlideSingleIdea` — Single idea: one centered statement with a short supporting line · `SlideTextAndImage` — Text and image: text centered on an 800 × 800 visual, image right or left · `SlideThreeColumns` — Three columns: a headline over three evenly weighted points divided by hairlines · `SlideThreeColumnsWithPhoto` — Three columns with photo: a headline and photo above three points · `SlideTitleAndBody` — Title and body: a top-anchored headline with a short paragraph · `SlideTitleAndWideVisual` — Title and wide visual: a one-line title over a wide visual · `SlideTwoColumns` — Two columns: a headline on the left and up to three points on the right
- **Diagrams**: `RasaMark` — The Rasa R mark as an inline SVG for diagrams: Taupe 50 on Pink 400 by default; pass color for Taupe 950 on light · `FlowStation` — One stop on a linear flow (ui/flow-station): index (UI/Micro), 28px dot, label (UI/Title), one-line detail (UI/Meta), 220 wide · `Flow` — A linear flow (ui/flow) of 3–6 FlowStations on a 2px track: Taupe 950 up to the active station, Taupe 300 after · `Callout` — An annotation pointing into a visual (ui/callout): 8px pin, 56px Pink 400 leader, note card (Taupe 50, 1px Taupe 300, radius 12) with a UI/Label title of 2–5 w… · `Hub` — Hub and spoke (ui/hub): one Taupe 950 hub pill and 3–8 satellite cards (Taupe 50, 1px Taupe 300, UI/Title, optional team-tint dot), joined by orthogonal 1.5px… · `TeamLoop` — One team’s release loop (ui/team-loop), 480 × 160: Build → Test → Release → Improve and back · `TeamLoops` — Independent team loops inside one shared platform (ui/team-loops), sized for the Square container (layout 06, background None): 2–3 TeamLoops stacked 48 apart,… · `Venn` — Shared foundation (ui/venn), 760 × 720: four 1.5px Taupe 700 team circles overlapping on a centre, a dashed CoE circle around the overlap, and the overlap itse… · `VennOrbit` — Foundation as orbits (ui/venn · orbit), 760 × 720: a Pink 400 core with the Rasa mark and “PLATFORM”, a dashed Taupe 500 CoE ring carrying a dark “CoE team” pi… · `Quadrant` — 2×2 positioning (ui/quadrant), sized for the Wide container (layout 14, content 1696 × 560, Filled): arrowed 1.5px Taupe 700 axes from the bottom left, dotted… · `LayerStack` — Prompt assembly (ui/layer-stack), sized for the Wide container (layout 14, Filled): a Taupe 50 card headed “System prompt / Top to bottom, in this order”, one…
- **Data**: `RampTrack` — Progressive control as a dial track (ui/ramp-chart · track), Wide container (layout 14): end labels above (“The model decides” Taupe 700, “Rasa enforces” Pink… · `RampBars` — Progressive control as rising bars (ui/ramp-chart · bars), Wide container (layout 14): one full-width bar per lever, each taller and stronger (Pink 50 → Pink 5… · `Trace` — One call as a trace (ui/trace), Wide container (layout 14, content ≤ 580 tall): mono eyebrow + legend, a seconds scale with 1px Taupe 300 vertical gridlines fr… · `KpiTile` — One KPI (ui/kpi-tile): label (UI/Meta), value (UI/Number), optional change on its own line under the value (UI/Meta, Seafoam 700 up, Coral 700 down) · `Dashboard` — The analytics moment without browser chrome (ui/dashboard), Wide container, 1400 wide: breadcrumb + environment badge, filter buttons (Last 30 days, All versio… · `NumeralStat` — Slide-layer proof stat card (ui/numeral-stat) · `NumeralStats` — A row of 3–5 NumeralStat cards filling the 1760 content width with 40px gaps; the row size picks the variant · `CompareStat` — Proof of a fix (ui/compare-stat): two equal cards, before (Taupe 100, version in Studio/Mono) and after (Seafoam 50 with a Seafoam 200 ring, value in Seafoam 7… · `DotGrid` — A test run at a glance (ui/dot-grid): one dot per simulated customer (or per group: say so in the caption), pass Seafoam 300, fail Coral 200, 16px dots, 6px ga…
- **Code and conversation**: `CodeBeforeAfter` — Two CodeWindows side by side (ui/code-before-after) with a 56px Taupe 950 arrow between: BEFORE and AFTER (Taupe 700 mono eyebrows, AFTER marked by a pink dot;… · `CodeAnnotated` — A CodeWindow with up to 3 highlighted lines (Pink 400 at 28%, radius 4) and a Callout aligned to each (ui/code-annotated). notes: {line, title, detail}, line c… · `CodeDiff` — A light code view showing a change (ui/code-diff): Taupe 100 block (radius 12, 1px Taupe 250), file path in Taupe 500, unchanged lines Taupe 950, added lines o… · `TreeRow` — One row of a file tree (ui/tree-row): glyph (folder or file), name in UI/Code, optional right note (UI/Meta) · `FileTree` — A project as plain files (ui/file-tree): TreeRows in a Taupe 50 card (radius 16, 1px Taupe 300, padding 24, 6px between rows) · `RuleRow` — One numbered rule (ui/rule-row): pink number (UI/Number), rule (UI/Title), one-line detail (UI/Body), optional code tag (Pink 50, Pink 200 ring) · `RuleList` — 3–5 RuleRows stacked with no gap (ui/rule-list) · `StackBlock` — One skill on the skill stack (ui/stack-block): mono name and status · `SkillStack` — Topic change on the skill stack (ui/skill-stack), Wide container (layout 14): six columns (256 wide, 32 gap) · `ThreadEvent` — An event line between chat turns (ui/thread-event): 1px Taupe 300 rules either side of a code tag, Pink for the event the slide is about, otherwise Taupe 200 (… · `ChatThread` — A conversation with system events (ui/chat-thread) on a Taupe 100 card (padding 32, 24 between items): user Soft on the right, agent Light on the left, ThreadE… · `TerminalStep` — One CLI step (ui/terminal-step): Taupe 950 command chip (pink $, UI/Code), title (UI/Title) and one-line detail (UI/Meta) · `TerminalSteps` — 3–5 TerminalSteps, 20px apart (ui/terminal-steps)
- **Voice**: `VoiceCall` — A phone call over time (ui/voice-call), 1400 × 460, Wide container
- **Texture, files and targets**: `PillCloud` — Named values as a wall of mono pills (ui/pill-cloud), 960 × 1080, for the right or left half of a slide at full height · `DocThumb` — A document thumbnail (ui/doc-thumb): file name (UI/Micro) and 8 skeleton lines, 150 × 190. highlight outlines it in Pink 400 and tints the matching lines Pink… · `DocGrid` — 4–8 DocThumbs in a 4-column grid (ui/doc-grid), one matched doc highlighted · `DeployTarget` — One place it runs (ui/deploy-target), 480 wide, centred: 120px icon circle (Phosphor Regular 48px; default Taupe 50 with 1px Taupe 300, focus Pink 400), mono i… · `DeployTargets` — Where it runs (ui/deploy-targets), Wide container (layout 14, None): three DeployTargets spread across 1696, icon circles joined by a dotted 2px Taupe 700 line…
- **Studio**: `Skeleton` — Placeholder UI for everything not relevant to the moment (ui/skeleton): line (8px Taupe 200 bar), row (icon square + line, for nav), text (three lines), card (… · `ResourceChip` — Something a skill uses (ui/resource-chip): tool (wrench, an API) or reference (file, a document) · `SkillProse` — A skill shown as what it is: plain language (ui/skill-prose) · `CollabCursor` — A teammate’s live cursor with a “Name · Role” tag (ui/collab-cursor), Studio/Tag · `AvatarStack` — Who is in the file (ui/avatar-stack): 32px initials circles overlapping by 8, 2px Taupe 50 ring, colours matching CollabCursor roles · `InsightCard` — What Studio found in live conversations (ui/insight-card): pink INSIGHT tag (Studio/Tag, Pink 50 fill, Pink 300 ring) and one sentence in Studio/Body L startin… · `RunCard` — A Copilot result in the side pane (ui/run-card): passed (check icon Seafoam 700, PASSED badge) for eval and test runs, edited (cube icon Periwinkle 600, “● Edi… · `StudioShell` — Simplified Rasa Studio with no browser chrome (ui/studio-shell). size wide (1440 × 580, layout 14): skeleton rail, Copilot pane (360) and workspace. square (73…
- **Foundations**: `SlideGrid` — The 1920 × 1080 slide grid every layout aligns to · `TypeScale` — TypeScale

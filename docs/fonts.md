# Typography and font provisioning

| Role | Brand typeface | Google substitute |
| --- | --- | --- |
| Headlines, quotes, display | STK Bureau Serif Book | Newsreader |
| Selective emphasis | STK Bureau Serif Book Italic | Newsreader Italic |
| Body, UI text | STK Bureau Sans Book | Inter |
| Buttons, names, numbers in UI | STK Bureau Sans Medium | Inter Medium |
| Slide eyebrows, meta, code | STK Bureau Sans Mono | JetBrains Mono |

**Book is weight 300** in the font files, the tokens and every `@font-face` rule (the October package's 350 mapping is retired). Regular 400, Medium 500, SemiBold 600. Stacks name STK Bureau first, then the substitute:

```css
--rasa-font-serif: "STK Bureau Serif", "Newsreader", Georgia, serif;
--rasa-font-sans:  "STK Bureau Sans", "Inter", Arial, sans-serif;
--rasa-font-mono:  "STK Bureau Sans Mono", "JetBrains Mono", "Courier New", monospace;
```

The full type scale (slide, visual-layer, web and Studio styles) is in the [guidelines](../design-system/rasa-brand-2026/README.md#typography) and as `--rasa-text-<style>` shorthands in `dist/tokens.css`.

## Licensed fonts: handled like a `.env` file

STK Bureau is licensed. The binaries are **never committed** (this is a public repository), but everything is wired to use them by name once they are on the machine:

| Piece | Where |
| --- | --- |
| Expected files, families, weights, sizes and SHA-256 | `design-system/rasa-brand-2026/fonts/fonts.lock.json` (committed) |
| Default location | `design-system/rasa-brand-2026/fonts/` (git-ignored except README and lock) — `tokens.css` and the component bundle load from here |
| Other location | `RASA_FONTS_DIR=/path` in your shell, CI secrets or a git-ignored `.env` (template: `.env.example`) |
| Verify | `python3 scripts/check-fonts.py` (all 11), `--for community-cards` (3), `--for slides` (4), `--soft` to only report |
| Guard | `scripts/validate-brand.py` fails if any `STKBureau*` file is tracked or the font folders stop being ignored |

The community-card renderer and `scripts/rasa_fonts.py` resolve fonts in this order: the skill's own `assets/fonts/`, `RASA_FONTS_DIR`, then `design-system/rasa-brand-2026/fonts/`.

In an app, copy the files to its own static folder (default URLs in `design-system/src/fonts.css` are `/fonts/<file>.woff2`) from a deployment your licence covers. Never hotlink rasa.com.

## Always load the Google substitutes

Every page, deck or design must load them, even when STK Bureau is available, so text never falls back to Georgia, Arial or Courier New:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Newsreader:ital,wght@0,300;0,400;1,300;1,400&display=swap">
```

For offline or self-hosted builds, `assets/fonts/fallback/` holds OFL copies of Inter (400/500/600), Newsreader (400, italic) and JetBrains Mono (400) with their licences; `design-system/src/fallback-fonts.css` declares them at `/brand/fonts/fallback/`.

## Decks

A Claude Slides deck loads at most four families, one file per family name, so medium text cannot come from a weight of one family. Load these four, each under its own name:

| Family name in the deck | File | Covers |
| --- | --- | --- |
| STK Bureau Serif | `STKBureauSerif-Book.woff2` | Display, Statement, Quote, UI/Feature, and the italic emphasis (browser-slanted Book) |
| STK Bureau Sans | `STKBureauSans-Book.woff2` | Body, Subtitle, UI/Body, UI/Meta |
| STK Bureau Sans Medium | `STKBureauSans-Medium.woff2` | Action, Big number, UI/Title, UI/Action, UI/Label, UI/Number, tags, buttons |
| STK Bureau Sans Mono | `STKBureauSansMono-Regular.woff2` | Eyebrow, Meta, page numbers, UI/Code, pills |

Set medium text in `STK Bureau Sans Medium` by name (keep the Inter fallback after it), never by weight alone. Pages and documents outside decks use the normal families with real italics and weights. When exporting to PowerPoint or Google Slides, set text in the Google substitutes unless the recipient has STK Bureau installed.

## Email and video

Email: inline `Georgia` for headlines and `Arial, Helvetica` for body as the reliable last resort; web fonts are an optional enhancement in a few clients only. Video (Remotion): load the licensed files with `examples/remotion/licensed-fonts.ts` at weight 300 and wait for them before rendering.

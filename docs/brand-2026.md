# Rasa Brand 2026 in this repository

The brand guideline itself is [`design-system/rasa-brand-2026/README.md`](../design-system/rasa-brand-2026/README.md), copied byte-for-byte from the *Rasa Brand 2026* design system. Read it in its own order: **1 Brand foundation → 2 Slide layer → 3 Visual layer → 4 Content layer**. This page maps each layer to the files that implement it and lists the decisions this repository makes on top.

## Where each layer lives

| Layer | Guideline section | Implemented by |
| --- | --- | --- |
| Colour | 1 · Color | `design-system/src/tokens.json` → `dist/tokens.css` (`--rasa-*`), `design-system/rasa-brand-2026/tokens.css` (bare names), [colors.md](colors.md) |
| Typography | 1 · Typography | `textStyles` in tokens (`--rasa-text-<style>`), `src/fonts.css`, `src/fallback-fonts.css`, [fonts.md](fonts.md) |
| Logo, icons, graphics | 1 · Logo / Icons / Graphics | `assets/brand-2026/`, [ASSETS.md](../ASSETS.md) |
| Slides | 2 · Slide layer | The `rasa-slides` skill; `slides` tokens (`--rasa-slide-*`); the `Slide*` components in the bundle |
| UI visuals | 3 · Visual layer | `design-system/rasa-brand-2026/components/` (`window.RasaNewBrand`), [components.md](components.md) |
| Copy | 4 · Content layer | Applies to every surface, including web pages, emails and community cards |
| Community covers | (separate Figma file) | `skills/rasa-community-cards/`, [community-cards.md](community-cards.md) |

## Rules agents get wrong most often

- **Taupe is the only neutral.** No Ink scale, no greys, no white `#FFFFFF` surfaces: the brightest surface is Taupe 50 `#FFFBF5`.
- **Pink is the one accent.** Never a background fill, never body text, never an eyebrow, page number or meta line. On Taupe Light only at 24px and up; small pink text uses Pink 600.
- **One focus per visual.** Pink marks the single focus element, Must, live/accent states and numbered markers. Never two.
- **Headlines end with a full stop** on slides and web pages. Sentence case. (Community cards are the exception, see below.)
- **Eyebrows:** Mono, uppercase, `fg-muted`, 1–3 words, no separators.
- **Emphasis:** Serif italic in Rasa Pink on one word or short phrase; default to none; one or two slides in a typical deck.
- **Numbers inside visuals are Sans Medium,** never Serif. Mono only means code.
- **Connectors are orthogonal** (12px rounded corners, 1.5px Taupe 700, Pink 400 for the one focus path). Never curved.
- **No left-edge accent stripes** on any card, notice, row or quote. Show tone with a fill, a dot or a tag.
- **Text floors:** slide layer never below 24px; visual layer down to 14px (12px for UI/Micro). Split or cut words instead of shrinking type.
- **Code windows are dark;** pink is never used in code. A skill or config being changed uses the light code diff.
- **Chat bubbles:** no dark bubbles on light grounds.
- **Avoid** "X, not Y", vague verbs (enable, empower, leverage, unlock, streamline, transform), asserted feelings (seamless, effortless, intuitive, easy), stacked adjectives and the company as subject.

## Decisions this repository adds (adapted)

| Topic | Decision | Why |
| --- | --- | --- |
| Web CSS names | `--rasa-` prefix on every variable; the bare design-system sheet stays available at `design-system/rasa-brand-2026/tokens.css` | Avoids collisions in host apps |
| Small links and focus rings | Pink 600 `#AA1E54` on Taupe Light, Pink 300 on Taupe Dark | Pink 400 is 3.1:1 on Taupe Light; Pink 600 is the Figma `pink/focusRing` role |
| Responsive web type | `typography` recipes scale the Web V1 styles for tablet and mobile | The design system defines desktop sizes only |
| Layout, breakpoints, motion | Kept from the October package | Not defined by the design system |
| Deprecated aliases | `--rasa-ink`, `--rasa-muted`, `--rasa-text-muted`, `--rasa-accent-soft`, `--rasa-accent-ink` still resolve | Existing consumers keep working; new code uses `--rasa-fg`, `--rasa-bg-muted`, `--rasa-fg-muted`, `--rasa-accent-subtle`, `--rasa-accent-solid` |
| Removed | `.rasa-button--pink`, the `illustration` colour group (mint, success-ink …) | Pink is never a fill; states now use the design system's status colours |
| Fonts | Licensed files provisioned per machine (`RASA_FONTS_DIR` or the git-ignored `fonts/` folder); `scripts/check-fonts.py` verifies them | Public repository; treat like `.env` |
| Asset files | `assets/brand-2026/` derived from the October masters under the design-system names; accepted as current (byte-identical exports not required) | The design system's asset store is not exportable file by file; see [ASSETS.md](../ASSETS.md#parity-with-the-design-system) |

## Keeping in sync

The mirror is locked by `evidence/brand-2026/artifact-files.json` (path, size and SHA-256 of every design-system file and asset). To take a new design-system version: replace the mirror files, update the lock, then run `scripts/sync-tokens-from-design-system.py`, the design-system build and check, and `scripts/validate-brand.py`. `npm --prefix design-system run check` fails if any palette value, text style or font stack drifts from the mirror.

Not mirrored, and why: the design system's per-component `README.md`, `preview.html` and `api/` cards (generated views of the same data; summaries are in [COMPONENTS.md](../COMPONENTS.md) and props in `components/index.d.ts`), `design-system.json` (the design tool's own asset index; `manifest.json` carries the same files), the 11 font files (licensed), and the Backgrounds (pending).

# Color reference

Generated from `design-system/src/tokens.json`, which mirrors the **Rasa Brand 2026** design system (`design-system/rasa-brand-2026/tokens.json`, Figma *Rasa Brand Relaunch — Working File*). Do not edit by hand: run `npm --prefix design-system run reference`.

**Taupe is the only neutral.** The old Ink scale is retired; every neutral is a Taupe step. **Rasa Pink is the one accent**: emphasis, focus, key actions. Pink is never a background fill or body text. Balance: about 80% Taupe, 10% Pink, 10% secondary.

| Name | Token | Hex | CMYK | Pantone | Use |
| --- | --- | --- | --- | --- | --- |
| Taupe Light | `taupe-100` | #FAF6F0 | 0 / 2 / 4 / 2 | Not specified | Ground of light slides and pages; text on dark |
| Taupe Dark | `taupe-950` | #181210 | 71 / 68 / 67 / 84 | Black 4 C | Ground of dark slides; text on light |
| Rasa Pink | `pink-400` | #E85A91 | 0 / 78 / 13 / 0 | 7423 C | The one accent |

CMYK and Pantone are for print. Screens always use the hex values. Web CSS variables carry a `--rasa-` prefix (`--rasa-taupe-100`); the design-system sheet (`design-system/rasa-brand-2026/tokens.css`) uses the bare names (`--taupe-100`).

## Taupe

Lead: 100 Taupe Light · 950 Taupe Dark

| Step | HEX | RGB |
| --- | --- | --- |
| 50 | `#FFFBF5` | 255, 251, 245 |
| 100 | `#FAF6F0` | 250, 246, 240 |
| 200 | `#F3EEE7` | 243, 238, 231 |
| 250 | `#EDE8E0` | 237, 232, 224 |
| 300 | `#C8C0B6` | 200, 192, 182 |
| 400 | `#ABA49C` | 171, 164, 156 |
| 500 | `#888077` | 136, 128, 119 |
| 600 | `#696157` | 105, 97, 87 |
| 700 | `#524A43` | 82, 74, 67 |
| 800 | `#3A312C` | 58, 49, 44 |
| 900 | `#2B2523` | 43, 37, 35 |
| 950 | `#181210` | 24, 18, 16 |

## Pink

Lead: 400 Rasa Pink

| Step | HEX | RGB |
| --- | --- | --- |
| 50 | `#FEF5F8` | 254, 245, 248 |
| 100 | `#FCE7EF` | 252, 231, 239 |
| 200 | `#F6BDD3` | 246, 189, 211 |
| 300 | `#F096B9` | 240, 150, 185 |
| 400 | `#E85A91` | 232, 90, 145 |
| 500 | `#E12A71` | 225, 42, 113 |
| 600 | `#AA1E54` | 170, 30, 84 |
| 700 | `#7A1E42` | 122, 30, 66 |
| 800 | `#541B31` | 84, 27, 49 |
| 900 | `#3A1523` | 58, 21, 35 |
| 950 | `#220E16` | 34, 14, 22 |

## Seafoam

Lead: 300 · Insurance

| Step | HEX | RGB |
| --- | --- | --- |
| 50 | `#F7FCFB` | 247, 252, 251 |
| 100 | `#EBF8F5` | 235, 248, 245 |
| 200 | `#C8EBE4` | 200, 235, 228 |
| 300 | `#9FDBD0` | 159, 219, 208 |
| 400 | `#7FCFC0` | 127, 207, 192 |
| 500 | `#4EBDA9` | 78, 189, 169 |
| 600 | `#379181` | 55, 145, 129 |
| 700 | `#296F62` | 41, 111, 98 |
| 800 | `#1E5148` | 30, 81, 72 |
| 900 | `#163933` | 22, 57, 51 |
| 950 | `#0E221E` | 14, 34, 30 |

## Coral

Lead: 300 · Retail

| Step | HEX | RGB |
| --- | --- | --- |
| 50 | `#FFF7F4` | 255, 247, 244 |
| 100 | `#FFEDE4` | 255, 237, 228 |
| 200 | `#FFCDB4` | 255, 205, 180 |
| 300 | `#FFB28C` | 255, 178, 140 |
| 400 | `#FF894F` | 255, 137, 79 |
| 500 | `#ED631E` | 237, 99, 30 |
| 600 | `#AA4C1E` | 170, 76, 30 |
| 700 | `#7A3D1E` | 122, 61, 30 |
| 800 | `#542E1B` | 84, 46, 27 |
| 900 | `#3A2115` | 58, 33, 21 |
| 950 | `#22150E` | 34, 21, 14 |

## Periwinkle

Lead: 200 · Finance

| Step | HEX | RGB |
| --- | --- | --- |
| 50 | `#F4F6FF` | 244, 246, 255 |
| 100 | `#E4EAFF` | 228, 234, 255 |
| 200 | `#BBC9FF` | 187, 201, 255 |
| 300 | `#87A0FF` | 135, 160, 255 |
| 400 | `#4F73FF` | 79, 115, 255 |
| 500 | `#1E49ED` | 30, 73, 237 |
| 600 | `#1E3BAA` | 30, 59, 170 |
| 700 | `#1E317A` | 30, 49, 122 |
| 800 | `#1B2754` | 27, 39, 84 |
| 900 | `#151D3A` | 21, 29, 58 |
| 950 | `#0E1222` | 14, 18, 34 |

## Sage

Lead: 200 · Government

| Step | HEX | RGB |
| --- | --- | --- |
| 50 | `#F9FAF9` | 249, 250, 249 |
| 100 | `#F1F3F0` | 241, 243, 240 |
| 200 | `#D1D8CE` | 209, 216, 206 |
| 300 | `#C0CABC` | 192, 202, 188 |
| 400 | `#A3B19D` | 163, 177, 157 |
| 500 | `#809378` | 128, 147, 120 |
| 600 | `#5F6F59` | 95, 111, 89 |
| 700 | `#495543` | 73, 85, 67 |
| 800 | `#353E31` | 53, 62, 49 |
| 900 | `#262C23` | 38, 44, 35 |
| 950 | `#171B15` | 23, 27, 21 |

## Orchid

Lead: 100 · Supporting accent

| Step | HEX | RGB |
| --- | --- | --- |
| 50 | `#FCF6FB` | 252, 246, 251 |
| 100 | `#F5DDF0` | 245, 221, 240 |
| 200 | `#EEC5E5` | 238, 197, 229 |
| 300 | `#E4A2D6` | 228, 162, 214 |
| 400 | `#D777C3` | 215, 119, 195 |
| 500 | `#C843AC` | 200, 67, 172 |
| 600 | `#9A2D84` | 154, 45, 132 |
| 700 | `#752364` | 117, 35, 100 |
| 800 | `#541B48` | 84, 27, 72 |
| 900 | `#3A1532` | 58, 21, 50 |
| 950 | `#220E1E` | 34, 14, 30 |

## Gold

Lead: 400 · Healthcare

| Step | HEX | RGB |
| --- | --- | --- |
| 50 | `#FEFDF4` | 254, 253, 244 |
| 100 | `#FDFBE5` | 253, 251, 229 |
| 200 | `#FBF3B8` | 251, 243, 184 |
| 300 | `#F8EC8E` | 248, 236, 142 |
| 400 | `#F6E668` | 246, 230, 104 |
| 500 | `#EDD61E` | 237, 214, 30 |
| 600 | `#AA9A1E` | 170, 154, 30 |
| 700 | `#7A6F1E` | 122, 111, 30 |
| 800 | `#544E1B` | 84, 78, 27 |
| 900 | `#3A3615` | 58, 54, 21 |
| 950 | `#221F0E` | 34, 31, 14 |

## Lavender

Lead: 200 · Telecommunications

| Step | HEX | RGB |
| --- | --- | --- |
| 50 | `#F9F7FC` | 249, 247, 252 |
| 100 | `#F0EBF8` | 240, 235, 248 |
| 200 | `#C8B7E7` | 200, 183, 231 |
| 300 | `#BAA5E1` | 186, 165, 225 |
| 400 | `#9A7BD3` | 154, 123, 211 |
| 500 | `#7449C2` | 116, 73, 194 |
| 600 | `#553296` | 85, 50, 150 |
| 700 | `#412672` | 65, 38, 114 |
| 800 | `#2F1C53` | 47, 28, 83 |
| 900 | `#22153A` | 34, 21, 58 |
| 950 | `#150E22` | 21, 14, 34 |

Secondary hues are for supporting surfaces, data, tags and industry cues, always with Taupe Dark text. Never combine lavender with periwinkle in one composition.

## Themes

Slides and pages switch these roles between Taupe Light and Taupe Dark. Eyebrows, meta, page numbers and attributions use `fg-muted`, never pink.

| Role | Light | Dark | Use |
| --- | --- | --- | --- |
| `surface` | `taupe.100` #FAF6F0 | `taupe.950` #181210 | Slide or page ground |
| `fg` | `taupe.950` #181210 | `taupe.100` #FAF6F0 | Primary text |
| `fg-muted` | `taupe.700` #524A43 | `taupe.400` #ABA49C | Subtitles, body, eyebrows, page numbers |
| `accent` | `pink.400` #E85A91 | `pink.400` #E85A91 | The single italic emphasis, quote mark, focus |
| `hairline` | `taupe.300` #C8C0B6 | `taupe.700` #524A43 | 1px column dividers and card outlines |
| `panel` | `taupe.200` #F3EEE7 | `taupe.800` #3A312C | Filled visual container |
| `card` | `taupe.50` #FFFBF5 | `taupe.900` #2B2523 | Concept cards and product windows |

## Semantic roles

Every hue has the same roles: `contrast` (text on solid), `subtle`, `muted`, `emphasized` (tints from light to strong), `solid` (filled elements), `fg` (coloured text) and `focus-ring`. Use roles when building UI; use the palette when choosing colours for layouts and illustration.

| Role | Reference | HEX |
| --- | --- | --- |
| `lavender-lead` | `lavender.200` | #C8B7E7 |
| `bg` | `taupe.100` | #FAF6F0 |
| `bg-subtle` | `taupe.200` | #F3EEE7 |
| `bg-muted` | `taupe.250` | #EDE8E0 |
| `bg-emphasized` | `taupe.300` | #C8C0B6 |
| `bg-bright` | `taupe.50` | #FFFBF5 |
| `bg-inverted` | `taupe.950` | #181210 |
| `bg-inverted-subtle` | `taupe.800` | #3A312C |
| `bg-panel` | `taupe.50` | #FFFBF5 |
| `bg-panel-subtle` | `taupe.300` | #C8C0B6 |
| `bg-panel-muted` | `taupe.200` | #F3EEE7 |
| `border-border` | `taupe.400` | #ABA49C |
| `text-fg` | `taupe.950` | #181210 |
| `accent-contrast` | `pink.950` | #220E16 |
| `accent-fg` | `pink.400` | #E85A91 |
| `accent-subtle` | `pink.100` | #FCE7EF |
| `accent-muted` | `pink.200` | #F6BDD3 |
| `accent-emphasized` | `pink.300` | #F096B9 |
| `accent-solid` | `pink.600` | #AA1E54 |
| `accent-focus-ring` | `pink.400` | #E85A91 |
| `taupe-contrast` | `taupe.50` | #FFFBF5 |
| `taupe-fg` | `taupe.800` | #3A312C |
| `taupe-subtle` | `taupe.100` | #FAF6F0 |
| `taupe-muted` | `taupe.200` | #F3EEE7 |
| `taupe-emphasized` | `taupe.300` | #C8C0B6 |
| `taupe-solid` | `taupe.950` | #181210 |
| `taupe-focus-ring` | `taupe.400` | #ABA49C |
| `text-fg-subtle` | `taupe.500` | #888077 |
| `border-subtle` | `taupe.300` | #C8C0B6 |
| `border-muted` | `taupe.200` | #F3EEE7 |
| `border-emphasized` | `taupe.500` | #888077 |
| `border-inverted` | `taupe.950` | #181210 |
| `border-inverted-subtle` | `taupe.700` | #524A43 |
| `border-accent` | `pink.300` | #F096B9 |
| `border-accent-emphasized` | `pink.400` | #E85A91 |
| `text-fg-muted` | `taupe.700` | #524A43 |
| `text-fg-inverted` | `taupe.50` | #FFFBF5 |
| `text-fg-inverted-subtle` | `taupe.300` | #C8C0B6 |
| `text-fg-accent` | `pink.400` | #E85A91 |
| `pink-contrast` | `pink.50` | #FEF5F8 |
| `pink-fg` | `pink.400` | #E85A91 |
| `pink-subtle` | `pink.100` | #FCE7EF |
| `pink-muted` | `pink.200` | #F6BDD3 |
| `pink-emphasized` | `pink.300` | #F096B9 |
| `pink-solid` | `pink.400` | #E85A91 |
| `pink-focus-ring` | `pink.600` | #AA1E54 |
| `gold-contrast` | `gold.50` | #FEFDF4 |
| `gold-fg` | `gold.700` | #7A6F1E |
| `gold-subtle` | `gold.100` | #FDFBE5 |
| `gold-muted` | `gold.200` | #FBF3B8 |
| `gold-emphasized` | `gold.300` | #F8EC8E |
| `gold-solid` | `gold.700` | #7A6F1E |
| `gold-focus-ring` | `gold.700` | #7A6F1E |
| `gold-original` | `gold.400` | #F6E668 |
| `orchid-contrast` | `orchid.50` | #FCF6FB |
| `orchid-fg` | `orchid.600` | #9A2D84 |
| `orchid-subtle` | `orchid.100` | #F5DDF0 |
| `orchid-muted` | `orchid.200` | #EEC5E5 |
| `orchid-emphasized` | `orchid.300` | #E4A2D6 |
| `orchid-solid` | `orchid.600` | #9A2D84 |
| `orchid-focus-ring` | `orchid.600` | #9A2D84 |
| `orchid-original` | `orchid.100` | #F5DDF0 |
| `sage-contrast` | `sage.50` | #F9FAF9 |
| `sage-fg` | `sage.600` | #5F6F59 |
| `sage-subtle` | `sage.100` | #F1F3F0 |
| `sage-muted` | `sage.200` | #D1D8CE |
| `sage-emphasized` | `sage.300` | #C0CABC |
| `sage-solid` | `sage.600` | #5F6F59 |
| `sage-focus-ring` | `sage.600` | #5F6F59 |
| `sage-original` | `sage.200` | #D1D8CE |
| `periwinkle-contrast` | `periwinkle.50` | #F4F6FF |
| `periwinkle-fg` | `periwinkle.500` | #1E49ED |
| `periwinkle-subtle` | `periwinkle.100` | #E4EAFF |
| `periwinkle-muted` | `periwinkle.200` | #BBC9FF |
| `periwinkle-emphasized` | `periwinkle.300` | #87A0FF |
| `periwinkle-solid` | `periwinkle.500` | #1E49ED |
| `periwinkle-focus-ring` | `periwinkle.500` | #1E49ED |
| `periwinkle-original` | `periwinkle.200` | #BBC9FF |
| `coral-contrast` | `coral.50` | #FFF7F4 |
| `coral-fg` | `coral.600` | #AA4C1E |
| `coral-subtle` | `coral.100` | #FFEDE4 |
| `coral-muted` | `coral.200` | #FFCDB4 |
| `coral-emphasized` | `coral.300` | #FFB28C |
| `coral-solid` | `coral.600` | #AA4C1E |
| `coral-focus-ring` | `coral.600` | #AA4C1E |
| `coral-original` | `coral.300` | #FFB28C |
| `seafoam-contrast` | `seafoam.50` | #F7FCFB |
| `seafoam-fg` | `seafoam.700` | #296F62 |
| `seafoam-subtle` | `seafoam.100` | #EBF8F5 |
| `seafoam-muted` | `seafoam.200` | #C8EBE4 |
| `seafoam-emphasized` | `seafoam.300` | #9FDBD0 |
| `seafoam-solid` | `seafoam.700` | #296F62 |
| `seafoam-focus-ring` | `seafoam.700` | #296F62 |
| `seafoam-original` | `seafoam.300` | #9FDBD0 |
| `pillar-telecommunications` | `lavender.200` | #C8B7E7 |

## States in visuals

Fixed meanings (`ui/tag/status`). Pair every state with a word.

| State | Meaning | Background | Text |
| --- | --- | --- | --- |
| success | pass, live, connected, done | `seafoam.100` #EBF8F5 | `seafoam.700` #296F62 |
| danger | fail, blocked | `coral.100` #FFEDE4 | `coral.600` #AA4C1E |
| warning | running, awaiting, mocked | `gold.200` #FBF3B8 | `gold.700` #7A6F1E |
| info | draft | `periwinkle.100` #E4EAFF | `periwinkle.500` #1E49ED |
| neutral | should, default | `taupe.200` #F3EEE7 | `taupe.700` #524A43 |
| pink | must, focus | `pink.100` #FCE7EF | `pink.600` #AA1E54 |

**Categories** (teams, roles, product areas) take palette colours in this order per deck: 1 Periwinkle, 2 Seafoam, 3 Gold, 4 Coral, 5 Orchid, 6 Lavender, 7 Sage. One colour, one meaning across the whole deck; at most 6 categories per visual.

**Gold rule:** gold is the lightest hue, so small gold parts shift darker: tint 200 (not 100), dot 600 (not 400), light shapes 500 (not 300), text and accent 700, badge circle 400. Large gold surfaces use 100.

**Tints and shades:** backgrounds at hue 100, light shapes at 300, accents and text at 700, for every hue including Lavender.

## Code syntax

Code windows are always dark (Taupe 950). Pink is never used in code.

| Class | Token | Reference | HEX |
| --- | --- | --- | --- |
| `(plain)` | `--rasa-code-text` | `taupe.100` | #FAF6F0 |
| `.cm` | `--rasa-code-comment` | `taupe.500` | #888077 |
| `.pn` | `--rasa-code-punctuation` | `taupe.400` | #ABA49C |
| `.kw` | `--rasa-code-keyword` | `orchid.300` | #E4A2D6 |
| `.nm` | `--rasa-code-name` | `periwinkle.200` | #BBC9FF |
| `.fn` | `--rasa-code-function` | `coral.300` | #FFB28C |
| `.ty` | `--rasa-code-type` | `sage.300` | #C0CABC |
| `.str` | `--rasa-code-string` | `seafoam.300` | #9FDBD0 |
| `.val` | `--rasa-code-value` | `gold.400` | #F6E668 |

## Contrast measurements

sRGB relative luminance, `(Llighter + 0.05) / (Ldarker + 0.05)`. 4.5:1 for text, 3:1 for essential boundaries. The design system states: Taupe Dark on Taupe Light 17.2:1 (all text); Rasa Pink on Taupe Dark 5.6:1 (all text); Rasa Pink on Taupe Light 3.1:1 (24px and above, and graphics only).

| Pair | Foreground | Background | Ratio | Result |
| --- | --- | --- | --- | --- |
| Taupe Dark on Taupe Light (all text) | `#181210` | `#FAF6F0` | 17.22:1 | pass |
| Rasa Pink on Taupe Dark (all text) | `#E85A91` | `#181210` | 5.56:1 | pass |
| Muted text (fg-muted) on Taupe Light | `#524A43` | `#FAF6F0` | 8.06:1 | pass |
| Dark theme muted text on Taupe Dark | `#ABA49C` | `#181210` | 7.52:1 | pass |
| Link / focus (pink 600) on Taupe Light | `#AA1E54` | `#FAF6F0` | 6.45:1 | pass |
| Primary button label | `#FAF6F0` | `#181210` | 17.22:1 | pass |
| Input border on Taupe 50 | `#696157` | `#FFFBF5` | 5.91:1 | pass |
| Status success | `#296F62` | `#EBF8F5` | 5.44:1 | pass |
| Status danger | `#AA4C1E` | `#FFEDE4` | 4.91:1 | pass |
| Status warning | `#7A6F1E` | `#FBF3B8` | 4.52:1 | pass |
| Status info | `#1E49ED` | `#E4EAFF` | 5.42:1 | pass |
| Status neutral | `#524A43` | `#F3EEE7` | 7.52:1 | pass |
| Status pink | `#AA1E54` | `#FCE7EF` | 5.89:1 | pass |
| Rasa Pink on Taupe Light | `#E85A91` | `#FAF6F0` | 3.09:1 | restricted: 24px and above, and graphics only |
| fg-subtle (taupe 500) on Taupe Light | `#888077` | `#FAF6F0` | 3.61:1 | restricted: secondary detail only, never body text |
| Hairline (taupe 300) on Taupe 50 | `#C8C0B6` | `#FFFBF5` | 1.75:1 | restricted: decorative divider, not an essential boundary |

For small text links and focus rings on Taupe Light, the web package uses Pink 600 (`#AA1E54`, the Figma `pink/focusRing` role). On Taupe Dark, use Pink 300 links. These checks cover solid colours at full opacity, not text over artwork or whole-site conformance.

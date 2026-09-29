# Color reference

Primary scales and semantic aliases below are extracted from the live v2 stylesheet. Illustration colors are observed separately. The package retains exact source HEX values rather than generating interpolated shades.

## Taupe

| Shade | HEX | RGB |
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

| Shade | HEX | RGB |
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

## Live semantic mappings

Normalized names preserve the observed group and role. Friendly UI aliases in the README sit above these mappings.

| Role | Reference |
| --- | --- |
| `text-fg` | `taupe.950` |
| `text-fg-inverted` | `taupe.50` |
| `text-fg-muted` | `taupe.700` |
| `taupe-solid` | `taupe.950` |
| `bg-bg` | `taupe.100` |
| `bg-bg-bright` | `taupe.50` |
| `bg-subtle` | `taupe.200` |
| `bg-inverted-subtle` | `taupe.800` |
| `text-fg-accent` | `pink.400` |
| `border-muted` | `taupe.200` |
| `text-fg-subtle` | `taupe.500` |
| `bg-muted` | `taupe.250` |
| `bg-panel` | `taupe.50` |
| `bg-panel-muted` | `taupe.200` |
| `border-subtle` | `taupe.300` |
| `bg-emphasized` | `taupe.300` |
| `border-accent-emphasized` | `pink.400` |
| `bg-inverted` | `taupe.950` |
| `bg-panel-subtle` | `taupe.300` |
| `border-border` | `taupe.400` |
| `border-emphasized` | `taupe.500` |
| `border-inverted` | `taupe.950` |
| `border-inverted-subtle` | `taupe.700` |
| `border-accent` | `pink.300` |
| `text-fg-inverted-subtle` | `taupe.300` |
| `taupe-contrast` | `taupe.50` |
| `taupe-fg` | `taupe.800` |
| `taupe-subtle` | `taupe.100` |
| `taupe-muted` | `taupe.200` |
| `taupe-emphasized` | `taupe.300` |
| `taupe-focusring` | `taupe.400` |

## Illustration-only colors

These are literal colors found in the supplied vectors, not a complete product state specification. Error color semantics were not established.

| Token | HEX | Observed context / suggested use |
| --- | --- | --- |
| `mint` | `#C6FEE1` | Skills / workflow status or recommendation |
| `success` | `#2B9364` | Skills / workflow status or recommendation |
| `success-ink` | `#2B5E47` | Skills / workflow status or recommendation |
| `yellow` | `#F6E668` | Skills / workflow status or recommendation |
| `yellow-soft` | `#FDFBE5` | Skills / workflow status or recommendation |
| `yellow-ink` | `#7A6F1E` | Skills / workflow status or recommendation |
| `teal-soft` | `#EBF8F5` | Governed-system domain or status |
| `teal` | `#379181` | Governed-system domain or status |
| `teal-ink` | `#296F62` | Governed-system domain or status |
| `blue-soft` | `#E4EAFF` | Governed-system domain or status |
| `blue` | `#1E49ED` | Governed-system domain or status |
| `blue-ink` | `#1E3BAA` | Governed-system domain or status |
| `orange-soft` | `#FFEDE4` | Governed-system domain or status |
| `orange-ink` | `#AA4C1E` | Governed-system domain or status |
| `sage-soft` | `#D1D8CE` | Governed-system domain or status |
| `sage-ink` | `#5F6F59` | Governed-system domain or status |
| `periwinkle` | `#87A0FF` | Homepage category accent |
| `lavender` | `#C8B7E7` | Homepage category accent |

## Contrast measurements

Calculated from sRGB relative luminance with `(Llighter + 0.05) / (Ldarker + 0.05)`. Targets used: 4.5:1 for normal text and 3:1 for essential non-text boundaries. Large text has a 3:1 target; bright pink on cream passes that threshold at 3.09:1, but fails the 4.5:1 normal-text target. Reserve it for qualifying large display text or decoration. These checks cover solid colors at full opacity, not overlays, photographic backgrounds, font legibility or whole-site conformance.

| Pair | Foreground | Background | Ratio | Use |
| --- | --- | --- | --- | --- |
| Main text | `#181210` | `#FAF6F0` | 17.22:1 | Passes selected target |
| Muted text | `#524A43` | `#FAF6F0` | 8.06:1 | Passes selected target |
| Accessible link | `#AA1E54` | `#FAF6F0` | 6.45:1 | Passes selected target |
| Primary CTA | `#FFFBF5` | `#181210` | 17.98:1 | Passes selected target |
| Pink CTA / ink text | `#181210` | `#E85A91` | 5.56:1 | Passes selected target |
| Focus / cream | `#AA1E54` | `#FAF6F0` | 6.45:1 | Passes selected target |
| Input border / panel | `#696157` | `#FFFBF5` | 5.91:1 | Passes selected target |
| Success label | `#2B5E47` | `#C6FEE1` | 6.68:1 | Passes selected target |
| Warning label | `#7A6F1E` | `#FDFBE5` | 4.88:1 | Passes selected target |
| Error label | `#AA1E54` | `#FCE7EF` | 5.89:1 | Passes selected target |
| Bright pink text on cream | `#E85A91` | `#FAF6F0` | 3.09:1 | Not a default accessible text/control pair |
| White text on pink | `#FFFFFF` | `#E85A91` | 3.33:1 | Not a default accessible text/control pair |
| Subtle text on cream | `#888077` | `#FAF6F0` | 3.61:1 | Not a default accessible text/control pair |
| Decorative border on panel | `#C8C0B6` | `#FFFBF5` | 1.75:1 | Not a default accessible text/control pair |

Use dark pink for text links and focus rings on light backgrounds. Use ink on bright pink. On inverse sections use pale pink links and focus indicators. Light taupe borders are decorative separators; use a stronger border for essential input boundaries. Never claim that all palette combinations are accessible.

New print CMYK/Pantone values are intentionally not invented. Work from supplied production profiles and approved proofs.

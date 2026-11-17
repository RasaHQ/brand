# Backgrounds (pending export)

The Rasa Brand 2026 design system holds four finished 16:9 slide backgrounds with the readability gradient already applied. They live in the design system's asset store and are **not in this repository yet**: they cannot be derived from the October masters, and an approximation would not be the approved artwork.

| File | Pattern | Ground | Bytes | SHA-256 (design system) |
| --- | --- | --- | --- | --- |
| `rasa-bg-chladni-01-dark.svg` | Chladni 01 | Taupe Dark | 1,888,726 | not published by the store |
| `rasa-bg-chladni-01-light.svg` | Chladni 01 | Taupe Light | 1,888,726 | not published by the store |
| `rasa-bg-chladni-02-dark.svg` | Chladni 02 | Taupe Dark | 1,952,420 | not published by the store |
| `rasa-bg-chladni-02-light.svg` | Chladni 02 | Taupe Light | 1,952,420 | not published by the store |

**Use:** full bleed behind Opening, Section divider, Single idea, Quote, Call to action and Closing slides. When the person doesn't say, use Pattern (the Figma default); Plain is also approved.

**To add them:** open the *Rasa Brand 2026* design system, download the four files from its **Backgrounds** group, put them in this folder under exactly these names, then run:

```sh
python3 scripts/build-brand-2026-assets.py --catalog-only
python3 scripts/validate-brand.py
```

Until then, build slide backgrounds from the matching texture in `../Textures/` (Chladni, subtle treatment for the ground) and keep text areas clear.

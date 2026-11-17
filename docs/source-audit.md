# Source audit

## November 2026: Rasa Brand 2026 becomes the source of truth

Two sources now govern this repository:

1. **Rasa Brand 2026 design system** (artifact *Rasa Brand 2026*, version `1794906029-af7f`, last changed 9 November 2026; Figma *Rasa Brand Relaunch — Working File*, tokens synced 16 October 2026). Mirrored byte-for-byte in `design-system/rasa-brand-2026/`; every file and asset is locked by SHA-256 in `evidence/brand-2026/artifact-files.json`.
2. **Rasa Community cards** (Figma *Rasa Community Designs*, `YaKH4J4ahfvSba27RU1Pnu`), vendored as `skills/rasa-community-cards/` with three changes: the font lookup in `scripts/render_card.py` (fonts are not committed), the Google substitutes added to its font stacks, and the scorecard panel rebuilt to the Brand 2026 visual layer.

### Decisions this update settles

| Earlier open point (October audit) | Resolution |
| --- | --- |
| PDF neutral ramps disagree with JSON; Ink vs Taupe | **Taupe is the only neutral; the Ink scale is retired** (design system, Color). The JSON Taupe ramp the web package already used is the design-system ramp. The October PDF/ASE/AI files stay as historical references. |
| STK Book weight: TTF 300 vs web CSS 350 | **300 everywhere** (design-system tokens and `@font-face`). The 350 mapping is removed. |
| Cream logo `#FAF6F0` vs `#FFFBF5` | Logo inks are Taupe Dark `#181210`, Taupe Light `#FAF6F0`, Rasa Pink `#E85A91`. |
| Logo forms | Logo Full (speech bubble) and the icon (R). The square lock-up is not part of the design system; kept as reference only. Community cards always use Logo Full. |
| Error colour "not established" | States are fixed: danger = coral, success = seafoam, warning = gold, info = periwinkle, neutral = taupe, pink = must/focus. The `illustration` colour group (mint, success-ink, …) is removed. |
| Phosphor "historical" | Phosphor Regular is the icon set **inside UI visuals**; the 27 brand icons are for pages and slides. |
| Curved thin connectors in the old artwork recipe | Connectors are orthogonal with 12px rounded corners; never curved. |
| Pink CTA button | Removed: Pink is never a background fill. |
| Patterns: 4 primary + 16 additional families | The design system defines **two** patterns (Chladni, Soundwave) in three treatments. The 16 additional families are kept as `reference`; the subtle-light treatment uses Taupe 300 dots (`#C8C0B6`), not the October `#E7DED2`. |
| Templates and Social/Profile archives were empty | Slides now come from the design system's slide layer (13 layouts) and the `rasa-slides` skill; social covers from the community card system. |

### What is exact and what is derived

| Item | State |
| --- | --- |
| Design-system README, tokens.json, tokens.css, manifest.json, components/bundle.js, bundle.css, index.d.ts, React 18.3.1 libs, Cover preview | **Exact** (SHA-256 matches the lock) |
| `design-system/src/tokens.json` | Generated from the mirror by `scripts/sync-tokens-from-design-system.py`; `npm --prefix design-system run check` fails on drift |
| `assets/brand-2026/` logos, icons, textures | **Derived** from the October masters under the design-system names and inks (`designSystem.parity: derived` in the catalog). Accepted as the current set: byte-identical exports are not required |
| Slide Backgrounds (4) | **Pending**: not derivable, not included |
| STK Bureau fonts (11) | **Not committed**: provisioned locally, verified against `fonts.lock.json` |
| Per-component READMEs, previews and `api/` cards; `design-system.json` | Not mirrored: generated views of data that is mirrored (`manifest.json`, `index.d.ts`, the README index) |

### Where the community card system differs from Brand 2026

Scoped to cards; documented in [community-cards.md](community-cards.md#where-cards-differ-from-the-slide-and-web-rules): headline without a full stop, accent per series mode, separator in the newsletter eyebrow, Mono panel labels, sage for pass. The scorecard panel's finding box used a left-edge accent bar, which Brand 2026 forbids; the renderer now draws it as a notice (fill + accent dot) with Sans labels and Sans Medium counts.

## October 2026 audit (historical)

The October package reconciled ten supplied asset ZIPs with the September repository. Archive names, SHA-256 values and per-file dispositions remain in `evidence/source-coverage.json`, and `scripts/validate-brand.py` still checks them. Findings that remain true:

| Finding | Decision |
| --- | --- |
| Graphics and Patterns archives were identical | Included once; both provenance links retained |
| Global JSON spells `perriwinkle` | Canonical `periwinkle`; source spelling preserved in evidence (the design system notes the same Figma token name) |
| Digital logo README: trademark symbols removed at the brand owner's request | Do not add symbols |
| Print CMYK recipes | Taupe Dark 71/68/67/84 (Pantone Black 4 C), Taupe Light 0/2/4/2, Rasa Pink 0/78/13/0 (Pantone 7423 C) |
| Icon README says 23; folder has 27 | 27 icons; the design system confirms 27 |
| 60 SVG pattern masters ≈ 111 MB | Masters preserved; never inline them |
| Signatures DOCX is not a newsletter | Signatures preserved; newsletter recipe is an adaptation |

## Evidence levels

- **Design system:** anything in `design-system/rasa-brand-2026/` and values generated from it.
- **Community cards:** `skills/rasa-community-cards/`.
- **Supplied (October):** masters, print files, fallback fonts, slide and signature references.
- **Adapted:** web aliases, responsive recipes, layout and motion tokens, email layout, asset tooling, derived asset files.
- **Proposed:** anything new that neither source covers; label it and confirm with the brand owner.

## Scope of verification

Hashes, token correspondence, palette membership of card colours, contrast pairs, SVG safety, catalog coverage, skill synchronisation and the absence of tracked font binaries are checked by repository commands. They do not certify a deployed site, an email client or every rendered slide.

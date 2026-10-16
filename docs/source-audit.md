# October 2026 source audit

This audit reconciles ten supplied asset ZIPs and `brand 2.zip` (the existing repository at commit `d6de4b1`). Archive names, SHA-256 values, per-file dispositions, and source-to-repository mappings are in `evidence/source-coverage.json`. Existing repository content is preserved except for documented implementation/guidance updates; `.git` history and Finder metadata are excluded from the distribution ZIP.

## Findings and decisions

| Finding | Decision |
| --- | --- |
| Both Graphics and Patterns archives have identical file paths and hashes | Include once; retain both provenance links |
| Templates and Social/Profile archives contain no files | Record as gaps; do not claim those assets were supplied |
| Supplied semantic JSON agrees with the existing web mappings | Retain web roles; add the missing seven accent roles |
| Global JSON has secondary ramps and a `perriwinkle` typo | Expose canonical `periwinkle`; preserve untouched source spelling in evidence |
| Secondary export marks primary hue in some shade keys | Preserve exact raw file; use canonical numeric shades from global export; cross-check values |
| Primary PDF disagrees with JSON neutral ramps | Preserve both; retain existing JSON-based web palette pending source reconciliation |
| Official cream logo is #FAF6F0; previous adaptation was #FFFBF5 | New work uses October masters; old paths remain historical compatibility files |
| Digital logo source says trademark symbols removed at Karl's request | Copy supplied bytes; do not reconstruct or add symbols |
| Print specs are now supplied | Record process CMYK recipes, without inventing ICC or spot-color equivalence |
| Icon README says 23; current SVG directory has 27 | Index actual 27 files; retain source README unchanged |
| 60 SVG pattern masters total about 111 MB | Preserve originals; generate web derivatives from PNGs |
| Slide 13 prescribes Newsreader, Inter, JetBrains Mono | Bundle supplied OFL fallbacks and update stacks |
| Bureau Book TTF metadata reports weight 300; observed web CSS uses 350 | Retain intentional web mapping at 350, document difference; do not modify binaries |
| Signatures DOCX is not a newsletter template | Preserve signature source; create labeled newsletter adaptation |
| Earlier README referred to background directories absent from this snapshot | Remove misleading coverage claims; index the assets actually supplied |
| Agent discovery copies and token dist were absent in the ZIP | Generate and track required outputs; narrow ignore exceptions |

## Neutral color conflict

The PDF titled “COLOUR PRIMITIVES (APPROVED PRIMARY RAMPS)” is rasterized artwork, not an extractable text table. Visual inspection shows PDF ink 950 **#181210**, whereas global JSON primary.ink.950 is **#1B1716**. PDF taupe 950 is **#1B1815**, whereas JSON primary.taupe.950 and the semantic text color are **#181210**. Other neutral shades also differ (for example, PDF taupe 100 #F3F1F0 versus JSON #FAF6F0). The logo README explicitly specifies #181210 Ink and #FAF6F0 Cream.

For web continuity this package uses semantic JSON plus its matching taupe/pink ramps. It does not expose conflicting raw ink/cream ramps as new defaults. The exact original PDF, JSON exports, AI and ASE sources remain available. A brand owner can reconcile the source files later; agents should not silently promote one conflicting primitive ramp into the web implementation.

## Evidence levels

- **Supplied:** exact digital/print assets, JSON exports, fallback fonts/licenses, slide/signature source files.
- **Observed:** previous September website component/type recipes and illustration fills, retained with original evidence.
- **Adapted:** semantic aliases for accessibility, web pattern derivatives, application recipes, email layout, asset tooling.
- **Proposed:** composition choices, motion timing, and any new product-specific UI beyond those sources.

These distinctions do not block ordinary implementation. Use the settled web roles and supplied assets, label local additions, and escalate only a source conflict that actually changes the task's outcome.

## Scope of verification

Coverage, file hashes, token correspondence, SVG safety, contrast pairs, generation consistency, and skill synchronization are checked by repository commands. Source reference files are retained unchanged. Presentation and signature text were inspected, and pattern/color references visually inspected. This is not a certification of every slide layout, email client, or production site. See `evidence/validation-results.json` for actual checks run and remaining integration limits.

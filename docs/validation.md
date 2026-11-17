# Validation

Run from the repository root. Each command states what it covers; none certifies a deployed site, an inbox or every rendered slide.

| Command | Checks |
| --- | --- |
| `python3 scripts/check-fonts.py` | Licensed STK Bureau files provisioned and matching `fonts.lock.json` (`--soft` to only report) |
| `python3 scripts/sync-tokens-from-design-system.py --check` | `design-system/src/tokens.json` equals what the design-system mirror and card modes produce |
| `npm --prefix design-system run build` | Generates `dist/` (CSS variables, Tailwind 3/4, JS, types) |
| `npm --prefix design-system run check` | Every role resolves; palette, text styles and stacks match the mirror; Book = 300; every community-card colour is a brand palette value; 13 accessible pairs pass; writes `evidence/contrast.json` |
| `python3 scripts/validate-brand.py` | Mirror files byte-exact against `evidence/brand-2026/artifact-files.json`; every Brand 2026 asset present (Backgrounds excepted) and catalogued with its parity; October coverage and hashes; SVG safety; email constraints; skill copies in sync; **no `STKBureau*` file tracked** and font folders git-ignored |
| `python3 scripts/sync-agent-skills.py --check` | `.claude/skills/` and `.agents/skills/` copies match the canonical skills |

## November 2026 update: results

Recorded in `evidence/validation-results.json`. In this update all commands above passed; 18 community cards (every panel type plus showcase) were rendered with STK Bureau provisioned and inspected, and one card was rendered without STK Bureau to confirm the Google-substitute fallback and its notice. Token CSS (`design-system/rasa-brand-2026/tokens.css`) regenerated from `tokens.json` matches the design system byte for byte.

The Astro 7.4.0 + Tailwind 4 smoke fixture (`examples/astro-smoke/`) was rebuilt from its lockfile against the new tokens and Brand 2026 exports and inspected in Chromium at 1440 and 390 px (no overflow; Newsreader substitute loaded).

Not verified here: Tailwind 3 preset compilation, a Remotion render, and a HubSpot test send.

## Earlier evidence

The September and October reports (Tailwind 3.4.19/4.3.3 compilation, Astro compiler, TypeScript examples, skill installation forward-test) remain in git history and `evidence/validation-versions.json`; they describe the earlier variable names.

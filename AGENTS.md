# Rasa brand repository instructions

Two project skills live here: `rasa-brand` (root `SKILL.md`: web, UI visuals, email, motion, artwork, reviews) and `rasa-community-cards` (`skills/rasa-community-cards/`: rasa.community covers, newsletter images, showcase headers, in-post diagrams). Both are exposed to Claude Code (`.claude/skills/`) and Codex (`.agents/skills/`). Read only the task-relevant references they name.

## Source of truth

- `design-system/rasa-brand-2026/`: byte-exact mirror of the **Rasa Brand 2026** design system. Its `README.md` is the brand guideline (foundation, slide, visual and content layers). Never edit these files by hand; update them only from a new design-system export and refresh `evidence/brand-2026/artifact-files.json`.
- `skills/rasa-community-cards/`: the community card system (Figma *Rasa Community Designs*). Its `references/tokens.json` is the only source of card colours.
- `design-system/src/tokens.json`: web token source, generated from the two above by `scripts/sync-tokens-from-design-system.py` plus hand-owned web sections (layout, breakpoints, motion, responsive typography, accessible pairs).
- `assets/brand-2026/` and `assets/catalog.json`: current logos, icons and textures by exact ID; October masters are `reference`.
- `docs/brand-2026.md`, `docs/source-audit.md`: how the repo applies the system, what is exact, derived or pending, and open questions.

Current direction: Taupe is the only neutral, Rasa Pink the one accent, STK Bureau Serif/Sans/Sans Mono with Book at weight 300, Logo Full, Chladni and Soundwave textures. Retired: the Ink scale, purple, gradients, the 350 weight mapping, pink fills, curved connectors, left-edge accent stripes. Keep observed / adapted / proposed labels.

## Licensed fonts are secrets

Never commit STK Bureau files (`*.woff2` etc.) or a `.env`. They are provisioned per machine in `design-system/rasa-brand-2026/fonts/` or via `RASA_FONTS_DIR` (see `.env.example`), verified by `scripts/check-fonts.py`. `scripts/validate-brand.py` fails if any is tracked.

## Commands

```sh
python3 scripts/check-fonts.py --soft
python3 scripts/sync-tokens-from-design-system.py --check
npm --prefix design-system run build
npm --prefix design-system run check
npm --prefix design-system run reference
python3 scripts/build-brand-2026-assets.py --catalog-only
python3 scripts/build-catalog-docs.py
python3 scripts/build-email.py
python3 scripts/sync-agent-skills.py
python3 scripts/validate-brand.py
```

Edit token sources, not `dist/`. Edit the root `SKILL.md` or `skills/rasa-community-cards/`, never a platform copy. Review generated diffs. Match testing to the change: consumer builds and rendered inspection for UI, card renders for the card system; a documentation edit does not need unrelated app tests. State any check not run and why.

Do not commit private Figma boards, invented brand or customer claims, or secrets. Do not publish or deploy because a skill is present. When adding these instructions to another repository, merge them with its instructions rather than replacing unrelated rules.

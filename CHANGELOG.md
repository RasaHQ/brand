# Changelog

## 1.0.0 — 17 November 2026: Rasa Brand 2026

The repository now follows the **Rasa Brand 2026** design system (version `1794906029-af7f`) and the **Rasa Community** card system. Base: `a3b78c7`.

### Added

- `design-system/rasa-brand-2026/`: byte-exact mirror of the design system: guidelines `README.md` (foundation, slide, visual and content layers), `tokens.json`, `tokens.css`, `manifest.json`, the `window.RasaNewBrand` React bundle (106 components, `bundle.js`, `bundle.css`, `index.d.ts`, React 18.3.1) and the cover preview. Locked by `evidence/brand-2026/artifact-files.json`.
- `skills/rasa-community-cards/`: the community card skill (modes, panel catalogue, tokens, renderer, Mermaid theme, Figma recipe, examples), plus generated copies in `.claude/skills/` and `.agents/skills/` for both skills.
- `assets/brand-2026/`: Logos (`rasa-logo-full-*`, `rasa-logo-icon-*`, 4x PNGs for email), IconsGeneric (`rasa-icon-*`, 27), Textures (Chladni 01/02 and Soundwave 01/02 × subtle dark, subtle light, accent, with WebP derivatives). Backgrounds documented as pending.
- Licensed-font handling like a `.env` file: `fonts.lock.json`, `.env.example` (`RASA_FONTS_DIR`), `scripts/rasa_fonts.py`, `scripts/check-fonts.py`, git-ignore rules, and a validator guard against tracked font binaries.
- `scripts/sync-tokens-from-design-system.py` (generate/check web tokens from the mirror) and `scripts/build-brand-2026-assets.py` (derive and catalogue Brand 2026 assets).
- Tokens: full nine-hue palette including Lavender, every semantic role, Light/Dark theme roles (`surface`, `fg`, `fg-muted`, `accent`, `hairline`, `panel`, `card`), status colours, category order, code syntax colours, all 64 text styles (`--rasa-text-*`), Figma spacing, radius and border scales, slide grid, font faces, community card modes.
- Docs: `docs/brand-2026.md`, `docs/community-cards.md`; package exports `@rasahq/brand-tokens/brand-2026/*`.

### Changed

- Community card **scorecard panel rebuilt** to the Brand 2026 visual layer: the finding is a notice (Taupe subtle fill, 8px accent dot, uppercase Sans label) instead of a left-edge accent bar; Sans Medium counts; hairline row dividers; 14px model names.
- STK Bureau Book is weight **300** everywhere (was 350). Stacks follow the design system (`"STK Bureau Serif", "Newsreader", Georgia, serif` …); every page loads the Google substitutes.
- Taupe is the only neutral; Ink/Cream naming retired from docs. New web aliases `--rasa-fg`, `--rasa-fg-muted`, `--rasa-bg-bright`, `--rasa-bg-muted`, `--rasa-accent-subtle`, `--rasa-accent-solid`; theme roles switch with `.rasa-dark` / `[data-theme="dark"]`.
- `components.css`: buttons per `ui/button` (Taupe 950 / Taupe 400 outline), cards Taupe 50 with 1px Taupe 300, panels as filled visual containers, status badges with design-system state colours, dark code window with syntax classes and a light diff variant, `.rasa-emphasis`.
- Current assets are the Brand 2026 set; October logos, icons and patterns (including the 16 additional pattern families and the square logo) are now `reference`.
- Newsletter recipe: Logo Full PNG, `RASA COMMUNITY · MON YYYY` eyebrow, community card as the lead image, headlines with full stops.
- Docs rewritten for colours, fonts, components, artwork, assets, source audit, validation; examples (Astro, Remotion, smoke fixture) moved to the new names; `SKILL.md`, `AGENTS.md`, `README.md` rewritten. `design-system/dist/` is now tracked.
- `validate-brand.py`, `check.mjs`, `build.mjs`, `build-reference.py`, `build-catalog-docs.py`, `sync-agent-skills.py`, `install-agent-skill.py` updated for the above.

### Removed

- `.rasa-button--pink` (Pink is never a background fill) and the `illustration` colour group (mint, success-ink, yellow-ink …); states use the design system's status colours.
- Curved-connector and "Phosphor is historical" guidance; the 350 weight mapping.

### Deprecated (still resolve)

`--rasa-ink`, `--rasa-muted`, `--rasa-text-muted`, `--rasa-text-subtle`, `--rasa-accent-soft`, `--rasa-accent-ink`, `.rasa-accent`, `.rasa-badge--error`. Note that `--rasa-surface` is now the theme ground (Taupe 100 light / Taupe 950 dark), not Taupe 50; use `--rasa-bg-bright` for Taupe 50.


### Open

- The four slide Backgrounds (not derivable). Derived logos, icons and textures are accepted as the current set; byte-identical exports are optional.
- Update *Panel / Scorecard* in the Rasa Community Designs Figma file to match the rebuilt renderer.

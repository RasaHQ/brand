<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/brand-2026/Logos/rasa-logo-full-taupe-light.svg">
  <img src="assets/brand-2026/Logos/rasa-logo-full-taupe-dark.svg" alt="Rasa" width="170">
</picture>

# Rasa brand system

The Rasa visual identity, autumn 2026: warm Taupe neutrals, Rasa Pink as the one accent, confident serif headlines and calm Sans text. This repository is the implementation home of the **Rasa Brand 2026** design system and of the **Rasa Community** card system. It replaces the older purple system and the October 2026 interim package.

**Sources of truth, in order**

1. **Rasa Brand 2026 design system** (Figma *Rasa Brand Relaunch — Working File*), mirrored byte-for-byte in [`design-system/rasa-brand-2026/`](design-system/rasa-brand-2026/README.md). Its README is the brand guideline: foundation, slide layer, visual layer and content layer. Where anything differs from Figma, Figma wins.
2. **Rasa Community cards** (Figma *Rasa Community Designs*), shipped as the [`rasa-community-cards`](skills/rasa-community-cards/SKILL.md) skill: rasa.community covers, newsletter images, showcase headers and in-post diagrams.
3. Everything else here (web tokens, Tailwind adapters, email recipe, asset tooling) implements those two and is labelled *adapted* where it adds a web-only decision.

## Start here

| Task | Entry point |
| --- | --- |
| Understand the brand | [Brand 2026 guidelines](design-system/rasa-brand-2026/README.md), then [how this repo applies them](docs/brand-2026.md) |
| Cover card, OG image, newsletter image, showcase header, in-post diagram | [Community cards](docs/community-cards.md), `skills/rasa-community-cards/` |
| Slides or a deck | The `rasa-slides` skill; layouts and rules in the guidelines' slide layer |
| Website, Astro, Tailwind | [Web integration](docs/web.md), [components](docs/components.md), [COMPONENTS.md](COMPONENTS.md) |
| UI visuals (product windows, concept cards, flows) | `design-system/rasa-brand-2026/components/` (`window.RasaNewBrand`), [components](docs/components.md#rasa-brand-2026-ui-components) |
| Logo, icon, texture | [ASSETS.md](ASSETS.md), `assets/brand-2026/` |
| Colour and contrast | [Colours](docs/colors.md) |
| Fonts | [Fonts](docs/fonts.md): STK Bureau is provisioned like a `.env` file, never committed |
| Newsletter / HubSpot | [Email recipe](docs/email.md) |
| Copy and wording | Content layer of the guidelines: [writing rules](design-system/rasa-brand-2026/README.md#4-content-layer) |
| Agents (Claude Code, Codex) | [AGENTS.md](AGENTS.md), [SKILL.md](SKILL.md), [docs/agents.md](docs/agents.md) |
| What changed in this update | [CHANGELOG.md](CHANGELOG.md), [source audit](docs/source-audit.md) |

## Quick start

```sh
cp .env.example .env                       # optional: point RASA_FONTS_DIR at your STK Bureau files
python3 scripts/check-fonts.py --soft      # are the licensed fonts provisioned?
npm --prefix design-system run build       # dist/: CSS variables, Tailwind 3/4, JS + types
npm --prefix design-system run check       # drift against the design system + contrast pairs
python3 scripts/validate-brand.py          # mirror hashes, assets, skills, no tracked fonts

# A community cover card
python3 skills/rasa-community-cards/scripts/render_card.py spec.json out.png
```

Install from this checkout with `npm install /absolute/path/to/brand/design-system`; the package is private and not on npm. Export only the assets an app uses with `python3 scripts/brand.py export`.

## Brand essentials

- **Colour.** Taupe is the only neutral (Taupe Light `#FAF6F0` ground, Taupe Dark `#181210` text). Rasa Pink `#E85A91` is the one accent: emphasis, focus, key actions. Pink is never a background fill or body text; on Taupe Light only at 24px and up. Seven secondary hues (periwinkle, seafoam, sage, coral, gold, lavender, orchid) for supporting surfaces, data, tags and industry cues. About 80% Taupe, 10% Pink, 10% secondary.
- **Type.** STK Bureau Serif Book for headlines, Sans Book for body and UI, Sans Medium for buttons and numbers, Sans Mono for eyebrows, meta and code. Book is weight 300. Always load the Google substitutes (Newsreader, Inter, JetBrains Mono) as well.
- **Logo.** Logo Full (the RASA speech bubble) in Taupe Dark, Taupe Light or Rasa Pink. The icon (R) only where space is tight.
- **Graphics.** Chladni and Soundwave dot patterns, one per layout, in subtle dark, subtle light or accent.
- **Voice.** Precise, calm, direct: "capable, not cocky". Headlines are short statements that end with a full stop. Sentence case. Emphasis is rare: pink italic on one word or short phrase, default none. No emoji.
- **Community cards** follow their own scoped rules (mode per series, headline without a full stop, exactly one accent highlight). See [docs/community-cards.md](docs/community-cards.md#where-cards-differ-from-the-slide-and-web-rules).

## Repository map

| Path | What |
| --- | --- |
| `design-system/rasa-brand-2026/` | Byte-exact mirror of the design system: guidelines README, `tokens.json`, `tokens.css`, `manifest.json`, React component bundle. `fonts/` is git-ignored. |
| `design-system/src/` | Web token source (`tokens.json`, synced from the mirror), opt-in `components.css`, font-face CSS |
| `design-system/dist/` | Generated CSS variables, Tailwind 3/4 adapters, JS and TypeScript tokens |
| `skills/rasa-community-cards/` | The community card system: rules, panel catalogue, tokens, renderer, Mermaid theme, Figma recipe |
| `assets/brand-2026/` | Current logos, icons and textures under the design-system names |
| `assets/` (other folders) | October 2026 masters, print files, fallback fonts, references (status `reference`) |
| `evidence/` | Source locks, contrast results, October token exports and coverage |
| `docs/` | Implementation guides |
| `.claude/skills/`, `.agents/skills/` | Generated copies of `rasa-brand` and `rasa-community-cards` for Claude Code and Codex |

## Maintain and verify

```sh
python3 scripts/sync-tokens-from-design-system.py   # after updating the mirror
npm --prefix design-system run build
npm --prefix design-system run check
npm --prefix design-system run reference            # docs/colors.md, COMPONENTS.md, artwork/
python3 scripts/build-brand-2026-assets.py          # assets/brand-2026/ + catalog
python3 scripts/build-catalog-docs.py               # ASSETS.md, docs/asset-*.md
python3 scripts/build-email.py
python3 scripts/sync-agent-skills.py
python3 scripts/validate-brand.py
```

To update the design system mirror, replace the files in `design-system/rasa-brand-2026/` with the new export, update `evidence/brand-2026/artifact-files.json`, and run the commands above. `validate-brand.py` fails on any byte that differs from the lock.

## Rights

Rasa marks and artwork remain subject to Rasa's terms. STK Bureau fonts are licensed and are never committed to this repository; provision them per machine. OFL fallback font licences ship beside their fonts. Third-party marks under `assets/reference/partners/` are reference assets, not endorsements. React 18.3.1 (MIT) is vendored inside the design-system mirror.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/logos/digital/rasa-logo-horizontal-cream.svg">
  <img src="assets/logos/digital/rasa-logo-horizontal-ink.svg" alt="Rasa" width="180">
</picture>

# Rasa brand system

Build Rasa community pages, newsletters, presentations, and artwork from the supplied brand assets. This checkout reconciles the 16 October 2026 handoff with the existing September implementation. It includes source masters, web derivatives, semantic tokens, examples, and a shared workflow for Codex and Claude Code.

**Start visually:** open [asset-gallery.html](asset-gallery.html) for logos, icons, and backgrounds; [preview.html](preview.html) for the component specimen. **Start as an agent:** read [SKILL.md](SKILL.md), then use the catalog CLI rather than loading large SVG masters into context.

## Quick start

```sh
npm --prefix design-system run build
npm --prefix design-system run check
python3 scripts/validate-brand.py
python3 scripts/brand.py find soundwave --format webp
python3 scripts/brand.py find horizontal-ink --category logo --format svg
python3 scripts/brand.py export --id logos.digital.rasa-logo-horizontal-ink.svg --target /path/to/app/public/brand
python3 scripts/install-agent-skill.py --target /path/to/app --agent both
```

The token package is local/private; do not assume it exists on npm. Install from this checkout with `npm install /absolute/path/to/brand/design-system`. Assets are distributed separately; export only the files used by the app. Preserve the target project's package manager and lockfile.

## Choose your path

| Task | Entry point |
| --- | --- |
| Astro and Tailwind 4 or 3 | [Web integration](docs/web.md), [community migration](docs/community-migration.md) |
| Newsletter or HubSpot content module | [Email recipe](docs/email.md), `examples/email/` |
| Logo, icon, background, or print file | [Asset rules](docs/assets.md), `assets/catalog.json`, gallery |
| Typography | [Fonts](docs/fonts.md), optional licensed and fallback CSS |
| Color or accessibility | [Colors](docs/colors.md), `evidence/contrast.json` |
| Slides or signatures | `assets/reference/presentations/`, `assets/reference/email/` |
| Existing components, animation, diagrams | `docs/components.md`, `docs/motion.md`, `docs/artwork.md` |
| Update sources or review conflicts | [Audit](docs/source-audit.md), `evidence/source-coverage.json` |
| Agent discovery and installation | [Agent workflow](docs/agents.md), `AGENTS.md`, `SKILL.md` |

## Brand essentials

Use warm cream/taupe surfaces, Ink text, editorial serif headlines, practical sans body text, and mono labels. Use pink deliberately. Preserve actual logo paths and their aspect ratio. The supplied logo colors are **Ink #181210, Cream #FAF6F0, Pink #E85A91**. A bright UI panel is **#FFFBF5**; it is not the cream logo color.

Bureau Serif / Sans / Sans Mono are the primary brand families. The supplied deck uses **Newsreader / Inter / JetBrains Mono**, now available as licensed open fallback files. Proprietary Bureau binaries remain in the supplied Fonts archive and are provisioned separately. Browser font-face mapping retains the observed web Book weight of 350; supplied desktop font metadata reports 300.

Prefer the **Soundwave 01/02 and Chladni 01/02** primary backgrounds. The 16 additional pattern families are supporting options. Use lightweight WebP for decorative web backgrounds and preserve the SVG/PNG masters for other production work. Pink pattern variants have dark backgrounds: do not infer text color from the filename alone.

Dark buttons with cream text and pink buttons with ink text are the default recipes. Use dark pink links on cream. Contrast checks cover named pairs, not every combination or text over artwork. Keep keyboard focus, semantic HTML, readable prose, and essential content independent of imagery.

## Authority and known gaps

Supplied assets are evidence of the handoff; they do not automatically approve every new composition. The semantic JSON controls the web mappings in this package. The supplied PDF and JSON disagree on neutral ramps; see the audit before changing them. Secondary palettes are supporting colors, not replacements for the primary identity.

The Templates and Social/Profile ZIPs are empty. The email file supplies signatures, not a newsletter template. The newsletter recipe here is an **adaptation**, and is labeled accordingly. The presentation deck is a reference/template to copy, not evidence that its example customer claims can be reused without verification.

## Maintain and verify

```sh
npm --prefix design-system run build
npm --prefix design-system run check
npm --prefix design-system run reference
python3 scripts/build-assets.py           # Pillow required; regenerates WebP + gallery
python3 scripts/build-email.py           # deterministic inline HTML from shared tokens
python3 scripts/sync-agent-skills.py
python3 scripts/validate-brand.py
python3 scripts/sync-agent-skills.py --check
```

Edit `design-system/src/tokens.json` before generating `dist/`. Preserve exact source exports in `evidence/supplied-tokens/`. The catalog records paths, hashes, sizes, source archives, media roles, status, and derivative provenance. The coverage file accounts for every source file, including deduplication and licensed-font exclusions. Review source discrepancies; do not resolve them by interpolation or intuition.

Keep `AGENTS.md`, `CLAUDE.md`, `.agents/skills/`, and `.claude/skills/` in distribution. These are generated from the canonical root skill. Run consuming project builds and visual checks for actual UI changes; this repository's checks cannot certify a deployed site or an email client's rendering.

## Rights

Rasa marks and artwork remain subject to Rasa's terms. Third-party marks are reference assets, not endorsements or general-use decorations. OFL fallback font licenses ship beside their fonts. No proprietary font binaries are added. No code or asset license is invented by this update; preserve the repository owner's terms.

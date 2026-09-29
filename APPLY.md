# Apply this update to rasahq/brand

This directory is an overlay, not a clone or a published npm package. It contains a replacement README plus new documentation, tokens, examples and original reference artwork. Existing `logos/`, `backgrounds/` and `metaphor-illustrations/` are retained in the target repository.

1. Create a branch in your current brand checkout, preserving any uncommitted work.
2. Copy this directory's contents into the repository root. Review the README replacement and new paths; do not delete existing assets.
3. Run `npm run build` and `npm run check` inside `design-system/`. `npm run reference` regenerates the color document, HTML specimen and SVG references using Python 3. Raster previews are convenience exports; rerender SVGs after design changes.
4. Review `docs/source-audit.md` and `docs/validation.md`, supply approved logo/font deployment decisions, and choose a code license before treating the kit as a public open-source package.
5. Commit through your existing review workflow. The package remains `private: true` to prevent accidental npm publication. Consumers can use a local path or copy the package into their own repository.

No steps require a wholesale Webflow CSS import. Do not place licensed fonts in the public repository as part of this update.

## Review entry points

- `README.md`: replacement public guide.
- `preview.html`: portable component specimen with inline CSS and fallback fonts.
- `artwork/brand-reference.png`: visual palette and hierarchy summary.
- `design-system/src/tokens.json`: source of truth for generated values.
- `docs/community-migration.md`: Astro/community migration plan.

The root directory name `rasa-brand-system` is only packaging. Copy its **contents**, not an extra nesting layer, to match README paths.

## Agent files

Include `.agents/` and `.claude/` when copying the overlay. Merge `AGENTS.md` and `CLAUDE.md` if the target already contains instructions; preserve unrelated rules. Root `SKILL.md` is canonical. Run `python3 scripts/sync-agent-skills.py --check` after changes. See `docs/agents.md` for consumer installation.

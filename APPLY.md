# Apply this update

This is an updated checkout of `rasahq/brand` based on commit `a3b78c7`. It contains no `.git` folder, no font binaries and no secrets.

1. On a new branch, copy the contents over your working tree, **including dot-files and dot-directories** (`.gitignore`, `.env.example`, `.claude/`, `.agents/`).
2. Copying over a directory does not delete files; nothing needs deleting for this update (October assets stay as references).
3. Provision the STK Bureau fonts locally (never commit them): copy the 11 `.woff2` files into `design-system/rasa-brand-2026/fonts/`, or set `RASA_FONTS_DIR` in a git-ignored `.env`. Check with `python3 scripts/check-fonts.py`.
4. Verify:

   ```sh
   npm --prefix design-system run build && npm --prefix design-system run check
   python3 scripts/validate-brand.py
   python3 skills/rasa-community-cards/scripts/render_card.py skills/rasa-community-cards/examples/more-examples.json /tmp/cards/
   ```

5. Review `git status`: no `STKBureau*` file and no `.env` should appear. Commit.

Consumers of `@rasahq/brand-tokens` should read the *Deprecated* section of [CHANGELOG.md](CHANGELOG.md), in particular the meaning of `--rasa-surface`, and rebuild. This update does not deploy rasa.community, publish a package or send email.

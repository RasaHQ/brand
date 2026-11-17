# STK Bureau fonts (provisioned, not committed)

This folder is where the licensed STK Bureau web fonts live **on your machine or in CI**. They are never committed: treat them like a `.env` file. Git ignores everything here except this README and `fonts.lock.json`.

`../tokens.css` (the Rasa Brand 2026 token sheet) loads the faces from `fonts/<file>.woff2`, so putting the files here makes the design-system mirror, the component bundle and the community-card renderer use the real typefaces.

## Provision

1. Get the files from the team's font store (the same 11 files that ship in the *Rasa Brand 2026* design system's `fonts/` folder).
2. Either copy them into this folder, or keep them elsewhere and point an environment variable at that folder:

   ```sh
   export RASA_FONTS_DIR=/secure/path/to/stk-bureau   # see .env.example
   ```

3. Verify them:

   ```sh
   python3 scripts/check-fonts.py            # all 11 faces
   python3 scripts/check-fonts.py --for community-cards
   ```

`fonts.lock.json` lists every expected file with its family, weight, style, size and SHA-256 from the design system, so a wrong or outdated file is reported.

| File | Family | Weight | Style |
| --- | --- | --- | --- |
| `STKBureauSerif-Book.woff2` | STK Bureau Serif | 300 | normal |
| `STKBureauSerif-BookItalic.woff2` | STK Bureau Serif | 300 | italic |
| `STKBureauSans-Book.woff2` | STK Bureau Sans | 300 | normal |
| `STKBureauSans-BookItalic.woff2` | STK Bureau Sans | 300 | italic |
| `STKBureauSans-Regular.woff2` | STK Bureau Sans | 400 | normal |
| `STKBureauSans-Italic.woff2` | STK Bureau Sans | 400 | italic |
| `STKBureauSans-Medium.woff2` | STK Bureau Sans | 500 | normal |
| `STKBureauSans-MediumItalic.woff2` | STK Bureau Sans | 500 | italic |
| `STKBureauSans-SemiBold.woff2` | STK Bureau Sans | 600 | normal |
| `STKBureauSans-SemiBoldItalic.woff2` | STK Bureau Sans | 600 | italic |
| `STKBureauSansMono-Regular.woff2` | STK Bureau Sans Mono | 400 | normal |

## Without the files

Everything still renders: every stack names the Google substitutes next (Newsreader, Inter, JetBrains Mono). Pages built from this system must always load those substitutes (see `docs/fonts.md`), so text never falls back to Georgia, Arial or Courier New. Report which fonts a render used.

## In an app

Serve the files from the app's own static folder (for example `public/fonts/`) under the same names, from a deployment your licence covers. Never hotlink rasa.com and never commit the binaries to a public repository.

STK Bureau web fonts, copied from the Rasa Brand 2026 design system (fonts/ in that artifact).
The renderer embeds these automatically: STKBureauSerif-Book (headlines), STKBureauSans-Book (body), STKBureauSansMono-Regular (eyebrows, labels).
If the brand fonts are updated, replace these files from the design system.

In the rasahq/brand repository these files are licensed and NOT committed (handled like a .env file).
The renderer looks for them, by file name, in this order:
  1. this folder (skills/rasa-community-cards/assets/fonts/), git-ignored;
  2. $RASA_FONTS_DIR, or RASA_FONTS_DIR in the repo's .env (see .env.example);
  3. design-system/rasa-brand-2026/fonts/ (the design-system mirror; git-ignored).
Check with: python3 scripts/check-fonts.py --for community-cards
Without them, cards render in the Google substitutes (Newsreader, Inter, JetBrains Mono) and the renderer prints a NOTE.

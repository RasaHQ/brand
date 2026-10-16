# Typography and font provisioning

Primary brand families: STK Bureau Serif (headlines), STK Bureau Sans (body/UI), STK Bureau Sans Mono (labels/code). Supplied fallback families: Newsreader, Inter, JetBrains Mono. The deck explicitly uses those fallbacks; use them for portable presentations and web builds without provisioned Bureau licenses.

`assets/fonts/fallback/` contains the supplied TTF files and each family's OFL license. Copy the licenses with fonts. Optional `design-system/src/fallback-fonts.css` expects those files at `/brand/fonts/fallback/{family}/`; adjust URLs for your app base path. Simply naming a font in a stack does not load it. The component recipes remain usable with system fallbacks.

`design-system/src/fonts.css` is opt-in for Bureau files at `/fonts/`. All referenced filenames are present in the supplied licensed archive, but those binaries are not distributed in this public-repo candidate. Provision them from `03 Fonts` in a deployment permitted by your license. Do not hotlink the Rasa website or assume possession grants unrestricted redistribution.

The existing web recipe declares Book at 350, but supplied Book TTF metadata says 300. The retained CSS `@font-face` mapping binds the supplied Book face to the web recipe's 350; it does not change the binary or assert a variable weight range. Other observed weights: Regular 400, Medium 500, SemiBold 600. Use actual italic files; do not synthesize missing styles. Newsreader/Inter files are static faces; do not declare a fake 100–900 range.

For email, use Arial/Helvetica body and Georgia headlines. Treat web fonts as optional enhancement only. Keep copy readable if all font loading fails. For slides, use the supplied deck's fallback choices and inspect line wraps after any substitution. For video, retain the font readiness workflow in `examples/remotion/`.

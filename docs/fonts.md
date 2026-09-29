# Font provisioning

## Observed faces

The live CSS declares:

- STK Bureau Sans: Book 350 normal; Regular 400 normal/italic; Medium 500 normal/italic; SemiBold 600 normal/italic.
- STK Bureau Serif: Book 350 normal/italic; Regular 400 normal/italic.
- STK Bureau Sans Mono: Regular 400 normal/italic.

The full family/weight/style inventory is in `evidence/sources.json`. The package's optional `src/fonts.css` covers the faces used by examples. Add other declared faces only when licensed files are supplied and needed.

## Local setup

1. Obtain the authorized font files and deployment instructions from Rasa's license holder.
2. Map real font metadata to the CSS family/weight/style above. “Other” is not a measured web family name.
3. Put app-serving font files in the consumer's `public/fonts/` directory, or its approved font service. The example filenames are expected local names, not bundled assets.
4. Keep binaries out of the public brand repo. A gitignore is not a legal access control; follow the actual license's deployment restrictions.
5. Import the font-face file after provisioning. Until then, omit that import so the specimen can use system fallbacks without 404s.
6. Preload only critical above-the-fold faces when useful. Do not preload every weight. Respect your content security policy and font-origin configuration.
7. Verify accents, punctuation, numbers and required languages, plus font loading and reflow. No language coverage has been inferred from the SVGs.

For local previews, the provided fallbacks are usable but not metrically identical. IBM Plex is not auto-fetched; install or separately provision it if selected. Video renders must use an explicitly chosen available font and wait for font readiness. Font loading failures should fail production video rendering rather than silently substituting a typeface.

The package makes no determination about the legal rights granted by STK BUREAU BOOK or OTHER. Web, app embedding, video/rendered output, domain coverage and third-party access must be checked against the actual agreement. Font files available from a public website are not thereby public-domain assets.

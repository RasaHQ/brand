# Reskinning Rasa Community and other Astro sites

This is a migration plan and reusable code, not a claim that rasa.community has already been edited. Its source repository, components and deployment configuration were not supplied or changed.

## Mapping

| Previous default | New default | Notes |
| --- | --- | --- |
| Purple background/CTA `#5A17EE` | Cream page, ink CTA | Do not globally replace every purple pixel with pink |
| Navy `#080327` | Ink `#181210` | Use for text, CTA, selective dark section |
| Blue-tinted light gray `#EFF1FF` | Cream `#FAF6F0` | Warm page foundation |
| Light blue-gray cards `#DFE8FF` | Taupe `#EDE8E0` or bright cream | Distinguish card and panel roles |
| Söhne heading | STK Bureau Serif Book 350 | Editorial/page headings |
| Söhne body | STK Bureau Sans Book 350 | Reading adaptation may use longer line height |
| Söhne Mono | STK Bureau Sans Mono Regular 400 | Labels and technical detail |
| Fractal/gradient hero | Short editorial title + useful image/diagram | Recompose, do not merely recolor |
| Purple logo default | Existing black horizontal logo on cream | Replace with approved ink master when supplied |
| Old orange/aqua emphasis | Pink plus scoped diagram accents | Preserve useful chart distinctions instead of remapping blindly |

## Implementation sequence

1. Inventory global CSS, Tailwind version, layout wrappers, logo sources, font requests, page templates, embeds and email/OG/video generators. Search for legacy hex values, font names, `gradient`, `backdrop-filter`, and old asset imports. Inspect actual usage before deleting.
2. Add the local token package. Load tokens and opt-in component styles once in the root Astro layout. Apply `rasa-theme` to the root/body. Introduce licensed fonts through the consumer's authorized process.
3. Migrate shared navigation, footer, container, titles, links, CTAs and cards first. Replace global values by semantic purpose, not search-and-replace alone. Remove conflicting legacy rules as each component is migrated.
4. Update homepage, events list, event detail, learning/article pages and community join flows. Keep route structure, SEO metadata, canonical URLs, forms, analytics and content access behavior intact.
5. Restyle long-form markdown/MDX separately: body width/line height, heading spacing, underlined links, code blocks, tables and callouts. Avoid tiny mono text for normal prose.
6. Update OG images, event covers, thumbnails, newsletter assets and Remotion templates with the same tokens. Third-party hosted widgets may need their own supported theme API; parent CSS does not cross iframe boundaries.
7. Test a representative page for each template and interaction. Validate narrow viewport overflow, long event titles, keyboard operation, mobile navigation, RSVP forms, empty/loading/error states and reduced motion. Re-run visual checks with actual licensed fonts.
8. Release through the site's existing deployment process. Review visual diffs and retire legacy imports after migration. Keep historic brand assets clearly labeled rather than deleting them without a usage check.

## Community-specific recipes — proposed

Event cards: small mono date/category, sans event title or restrained serif heading, useful location/time information, one clear RSVP link. Never reduce essential time-zone details to decorative labels.

Learning pages: serif page title, readable sans prose, mono code, warm panels. Keep instructional diagrams precise and give them text alternatives. Use tables for exact values rather than rasterizing them into artwork.

Profiles/speakers: use real approved portraits and names. Do not apply generated face replacement or turn every portrait into a brand-colored illustration.

Forms: use real labels, explicit error messages and dark enough control borders. Keep error and success feedback accessible and distinguishable by wording.

Theme scope: no automatic dark mode is specified by the evidence. Do not invert the entire site by swapping two tokens. Dark sections need explicitly tested text, panel, link and focus colors. The package supplies a limited inverse-section helper, not a complete dark theme.

## Integration boundaries

Tailwind v4 requires the host's Tailwind integration; this package adds tokens, not a compiler. For current Astro setups use the supported Tailwind Vite integration. Existing v3 projects can keep their integration and use the v3 preset until upgraded.

The Astro example uses relative imports so it can live beside this package for review. When copying into `src/pages`, replace them with the package imports shown in the README. Install Anime.js only if using the motion example. Use your own routes; the specimen's in-page links are demonstration anchors.

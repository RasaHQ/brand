# Components and interaction

Use the visual specimen alongside this document. The package provides presentation styles, not a full interactive component library.

## Page shell and navigation

Use a cream page, dark supplied logo, restrained horizontal navigation and a dark CTA. Separate the header with a thin neutral rule. At narrow widths, replace dense navigation with a properly labeled menu button and an accessible menu implementation. The current site's desktop header CTA is only 36px high; the community adaptation uses at least 44px touch targets. Do not hide core navigation behind hover-only interactions.

The container recipe uses 1440px max width and 56/32/20px gutters, following the hero. The exact live site also uses 70px section padding and section-specific vertical spacing; this package normalizes rather than clones those variations. Retain a clear title/body/action hierarchy and avoid making every section a card.

## Buttons and links

Primary: dark ink fill, cream label. Secondary: cream fill, dark outline and label. Accent: pink fill, ink label. Radius 4px; 48px baseline; 16px medium label. Buttons can wrap and grow for localization.

Hover, disabled and focus styling in this kit is proposed. Use native `button disabled` for disabled actions. `aria-disabled` on an anchor is only descriptive: consumers must prevent activation and decide whether to keep it focusable. Use anchors for navigation and buttons for actions. Keep text links underlined in body copy. Do not rely on pink alone to identify links.

## Cards, panels and numbers

Cards use taupe 250, a 16px radius, generous internal spacing and minimal decoration. Distinguish a content card from an interactive link card: the latter needs keyboard focus and a meaningful accessible name. Avoid making a whole card interactive when it contains separate controls.

UI panels may use bright cream or white, a subtle border and restrained depth. A proposed 12px panel radius matches the broader source vocabulary; the exact product illustration can have different radii. Avoid copy-pasting shadows across every page element.

Metric cards use a large readable numeral plus explanatory text. Oversized cropped numbers are decorative duplicates: hide the duplicate from assistive technology. Never crop the only copy of a figure. Keep the unit, denominator and timeframe visible; validate claims before release.

## Status and forms

Success chips pair mint with dark green text and a check/word. Warning pairs pale yellow with dark olive text. Neutral progress uses taupe. The proposed error style uses dark pink plus a word/icon; it is not an assertion that pink is the product's official error color. Color remains redundant with text.

Inputs need persistent labels, visible boundaries and validation messages linked by `aria-describedby`. Do not use placeholder text as the sole label. Use `aria-invalid` only when a validation error exists. Place error text near the field and explain how to fix it. The stylesheet supplies visual states; host logic owns validation and announcements.

## Icons and diagrams

The old guide named Phosphor. The new references show simple line icons, but outlined SVG paths do not prove a library or stroke-weight specification. Retain Phosphor as a compatibility option pending brand confirmation. Use one icon family/weight within a composition. Suggested starting point: 20–24px icons with roughly 1.5–2px strokes at that size; these are proposed values, not extracted universal rules.

Use connectors only for actual relationships. Label branches and keep routing clean. In animated diagrams, respect dependency order; a passed check cannot appear before its evaluation. Decorative SVGs use `aria-hidden`; informative diagrams need a title/description and a text equivalent.

## Accessibility and responsive acceptance

- Inspect 320, 390, 768, 1024 and 1440px layouts, plus long labels and 200% zoom.
- Keep a single h1 and a logical heading order independent of font size.
- Preserve keyboard focus visibility and navigation order.
- Meet contrast targets for text and essential boundaries; see `colors.md`.
- Prefer a static complete view when reduced motion is requested.
- Provide captions/transcripts for narrated videos; do not communicate essential information through audio alone.
- Avoid hover-dependent information, marquee-only customer lists, uncontrolled flashing, and autoplay audio.
- Keep useful content in HTML; do not rasterize entire UI sections as a reskin shortcut.

Sources provide desktop/mobile designs, not a tested accessibility claim. This kit improves risky pairings but cannot certify a consuming website.

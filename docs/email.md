# Newsletter and HubSpot recipe

The supplied email ZIP contains a signature document, not a newsletter. `examples/email/newsletter.html` and `hubspot-content.html` are **adapted implementation recipes**, generated from shared tokens. Their 560px inner table fits the existing constrained HubSpot content module. They do not require a new email platform.

Run `python3 scripts/build-email.py` after token changes. The standalone HTML previews sample copy in a browser; the fragment retains explicit replacement markers. the fragment is the inner body content for a rich-text/HTML module. Use `hubspot-content.html` as a starting point, preserve the campaign's existing footer, consent/unsubscribe fields, and personalization behavior, and replace the clearly marked placeholders before sending. A generated fragment is not a complete HubSpot coded template. Do not send the preview itself.

Use inline CSS, presentation tables, literal HEX values, Arial/Helvetica body, Georgia headlines, and absolute HTTPS image/link URLs. CSS variables, Tailwind classes, JavaScript, local asset paths, SVG image dependencies, and required background images do not belong in email output. A solid background and readable copy must survive image blocking. If adding a logo, host the supplied PNG at a verified URL, give it alt text and width, and preserve aspect ratio. Never fabricate a CDN URL.

Keep the message compact: one lead item and CTA, followed by short secondary links. The sample copy is placeholder editorial structure, not a product announcement. The button uses a table cell and anchor so it remains legible in conservative clients; inspect its click target in Outlook before production use. The layout uses a fixed-width Outlook conditional wrapper and a fluid 560px maximum elsewhere.

Before sending: replace all placeholders, use your actual personalization default, retain the platform-managed legal footer and unsubscribe mechanism, check link destinations and preview text, inspect images-off and mobile behavior, and send tests through the actual platform to Outlook/Gmail/Apple Mail. Browser rendering does not prove inbox compatibility. No send or campaign modification is part of this repository update.

Signatures remain in `assets/reference/email/`. Use the supplied regional variant and preserve company/legal text; security-team-added confidentiality/banner content should not be duplicated in a personal signature or newsletter.

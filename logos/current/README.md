# Current Rasa digital logos

Checked against https://rasa.com/ on 29 September 2026.

**Primary ink: #181210 — RGB 24, 18, 16.** The navigation and footer logos use `currentColor`, resolving to the same taupe-950 semantic foreground token as website text.

## Assets

Each configuration has `svg/` and `png/` directories:

| Variant | Color | Use |
| --- | --- | --- |
| `ink` | `#181210` | Default on cream and light backgrounds |
| `cream` | `#FFFBF5` | Adapted reverse mark for ink backgrounds |
| `white` | `#FFFFFF` | Adapted reverse mark where white is required |
| `currentColor` | Inherited CSS color | Inline SVG only; no PNG equivalent |

PNG exports have transparent backgrounds at 512, 1024 and 2048 pixel widths. Their height follows the original aspect ratio. Use SVG whenever the target supports it.

## Geometry and provenance

- **Horizontal:** exact five path outlines and `0 0 81 38` viewBox extracted from the current homepage navigation SVG. This is not merely the old horizontal recolored: the website has subtly different outlines and framing.
- **Square:** original paths, polygon, fill rules and `0 0 161.97 199.5` viewBox from the supplied black square SVG, recolored as requested. The name “square” denotes the stacked logo configuration; the canvas is portrait. This is an adaptation, not a newly observed square master from the website.
- **Cream and white:** practical reverse-color adaptations, not claimed to be observed website variants.
- Original AI, EPS, SVG and PNG assets in the sibling legacy directories are unchanged. No new CMYK values, Pantone matches or print masters were invented.

A machine-readable source record is included in `../../evidence/logo-sources/manifest.json` in the full brand kit and `sources/manifest.json` in the standalone logo bundle.

## Web, Astro and animation use

```html
<img src="/logos/current/horizontal/svg/rasa_horizontal_ink.svg"
     alt="Rasa" width="162" height="76" />
```

Copy the desired assets into the consuming application's public asset directory. For React/Remotion, use the PNG or SVG through the application's asset loader (for example `staticFile` for Remotion). Keep width/height proportional. Do not animate the internal outlines independently or distort the wordmark.

Use the fixed-color SVG for `<img>` or CSS image references. Use the `currentColor` version only when embedding the SVG markup inline, and explicitly set its surrounding `color` to the appropriate brand token. External SVG images cannot inherit the parent's CSS text color.

Use ink on light surfaces and cream/white on dark surfaces. Keep the mark free of gradients, glass effects, shadows and busy backgrounds. Existing clear-space guidance remains inherited from the previous brand guide; this export introduces no new minimum-size rule.

All original Rasa asset and trademark terms continue to apply.

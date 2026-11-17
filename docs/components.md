# Components and interaction

Two layers: the **web recipes** in `design-system/src/components.css` for pages, and the **Rasa Brand 2026 UI components** for slides and product visuals. Choose from [COMPONENTS.md](../COMPONENTS.md); the rules come from the [guidelines](../design-system/rasa-brand-2026/README.md).

## Web recipes

### Page shell and navigation

Taupe Light page (`rasa-theme`), Taupe Dark sections with `rasa-dark` (theme roles switch: `--rasa-surface`, `--rasa-fg`, `--rasa-fg-muted`, `--rasa-hairline`, `--rasa-panel`, `--rasa-card`). Logo Full in Taupe Dark on light, Taupe Light on dark. Separate the header with a hairline. At narrow widths use a labelled menu button; never hide core navigation behind hover. Touch targets at least 44px.

### Buttons and links

Primary: Taupe 950 fill, Taupe 100 label. Secondary: transparent with a Taupe 400 outline. Radius 4, Sans Medium 16/20. At most two together, one primary. **There is no pink button**: Rasa Pink is never a background fill. Text links are underlined, Pink 600 on Taupe Light, Pink 300 on Taupe Dark. Hover and disabled states are adapted. Anchors navigate, buttons act.

### Cards, panels and numbers

Cards: Taupe 50, 1px Taupe 300 outline, radius 16, no shadow. Slide-scale cards use radius 32. Panels holding a visual: Taupe 200 (Taupe 800 on dark), radius 32, 32px inner margin. **Never a coloured bar or thick border down one side** of a card, notice, row or quote; show tone with a fill, a dot or a tag. Numbers inside cards and visuals are Sans Medium, never Serif; keep units, denominators and timeframes visible and verify every claim.

### Status and forms

States have fixed meanings, always with a word: success (seafoam: pass, live, connected, done), danger (coral: fail, blocked), warning (gold: running, awaiting, mocked), info (periwinkle: draft), neutral (taupe: should, default), pink (must, focus). Coral only ever means something went wrong. Inputs: Taupe 50, radius 10, persistent labels, errors linked with `aria-describedby`; invalid fields take the danger colour.

### Icons and diagrams

Brand icons (`assets/brand-2026/IconsGeneric/`) for pages: 24/48/96px, solid, single colour. Inside UI visuals use Phosphor Regular; use an icon only where the symbol helps recognition, text only for attributes, plain lists and groups of more than about four; never mix icon and text-only chips in one group. Connectors are orthogonal (12px rounded corners, 1.5px Taupe 700; Pink 400 for the one focus path), one arrowhead at the end the flow goes to. Gridlines 1px Taupe 300. Decorative SVGs get `aria-hidden`; informative diagrams need a title, description and a text equivalent.

### Accessibility and responsive acceptance

- Inspect 320, 390, 768, 1024 and 1440px, long labels and 200% zoom.
- One h1, logical heading order, visible keyboard focus (2px Pink 600 outline on light).
- Contrast per [colors.md](colors.md); never pink text below 24px on Taupe Light.
- Prefer a static view with reduced motion; no essential information in audio, hover or backgrounds.
- Keep content in HTML; do not rasterise UI sections.

## Rasa Brand 2026 UI components

`design-system/rasa-brand-2026/components/bundle.js` defines `window.RasaNewBrand` (106 React components); `bundle.css` is its stylesheet and reads its variables from the mirror's `tokens.css`. Build any slide visual or product moment by mounting these components; never hand-build a control or draw an icon the system provides.

```html
<link rel="stylesheet" href="/rasa-brand-2026/tokens.css">         <!-- loads fonts/*.woff2 beside it -->
<link rel="stylesheet" href="/rasa-brand-2026/components/bundle.css">
<script src="/rasa-brand-2026/components/lib/react.production.min.js"></script>
<script src="/rasa-brand-2026/components/lib/react-dom.production.min.js"></script>
<script src="/rasa-brand-2026/components/bundle.js"></script>
<div id="v" data-theme="light"></div>
<script>
  const {ProductWindow, ResultList, ResultRow} = window.RasaNewBrand;
  ReactDOM.createRoot(document.getElementById('v')).render(
    React.createElement(ProductWindow, {path: 'billing-agent / Run #12', status: 'Passed', statusTone: 'success', width: 640},
      React.createElement(ResultList, null,
        React.createElement(ResultRow, {name: 'refund_over_limit', level: 'Must', status: 'Pass', tone: 'success'}))));
</script>
```

For a standalone page, inline `tokens.css` and `bundle.css` in a `<style>` and the scripts as classic scripts (escape `</style`, `</script` and `<!--` in your copy). Props and the one-line rule for each component are in `components/index.d.ts`; summaries are in [COMPONENTS.md](../COMPONENTS.md#rasa-brand-2026-ui-components).

Rules that apply to every visual:

- Pick the layout first; the layout fixes the container (Square 800 × 800, content 736 × 736; Wide 1760 × content + 64, at most 644). Never scale a visual to fit the other size.
- Two card families: concept card (`ui/card`, storytelling) and product window (`ui/window`, real product moments). Both radius 16, Taupe 50, 1px Taupe 300. Don't mix them in one visual.
- Density: at most 6 rows, 6 chat turns, 6 markers, 6 categories, 1 notice, 2 buttons (one primary), **1 focus** per visual. Summarise ("+ 4 more skills") rather than shrink.
- Categories take colours in deck order: periwinkle, seafoam, gold, coral, orchid, lavender, sage. One colour, one meaning across the deck.
- Chat bubbles: user Soft (Taupe 250) right, agent Light (Taupe 50) left, on Taupe 100; no dark bubbles on light grounds; Highlight (pink outline) for the one focus turn, Error (coral tint) for a wrong answer.
- Simplify, don't screenshot: `StudioShell` with real copy only where the slide points, `Skeleton` everywhere else, no browser chrome.
- Code: `CodeWindow` (dark, never wrapped, syntax colours per [colors.md](colors.md#code-syntax)) for code as code; `CodeDiff` (light) for a skill or config being changed.

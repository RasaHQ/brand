/**
 * Rasa Community — Mermaid diagram theme
 * Mirrors the Figma "Library — Diagrams" kit (Rasa Community Designs).
 *
 * Usage (build step or browser):
 *   import { rasaMermaidConfig, rasaClassDefs } from './rasa-mermaid-theme.js';
 *   mermaid.initialize(rasaMermaidConfig('guides'));
 *   const source = `flowchart TD\n ...your diagram...\n${rasaClassDefs('guides')}`;
 *
 * In the diagram, tag nodes with a class:
 *   B:::focus   the one step the text is about (max one per diagram)
 *   C:::pass    good outcome
 *   D:::fail    real failure only
 *   E:::muted   context / out of scope
 *   untagged    default step
 * Decisions: write them as a normal node starting with "IF " instead of {diamond}.
 *
 * Rules: flowchart TD by default · max 8 nodes (split longer chains) ·
 * edge labels 1–3 words, lowercase · badges only when the text refers to a step.
 */

// Series = the article's Card hue mode. Accent values come from the Card hue variables.
const SERIES = {
  default:   { accent: '#e85a91', accentSubtle: '#fce7ef', accentFg: '#aa1e54' }, // Default · Light / Dark (Rasa pink)
  casebook:  { accent: '#7449c2', accentSubtle: '#f0ebf8', accentFg: '#553296' }, // AI Team Casebook (lavender)
  guides:    { accent: '#e12a71', accentSubtle: '#fce7ef', accentFg: '#aa1e54' }, // Guides for AI teams (pink)
  tutorials: { accent: '#809378', accentSubtle: '#d1d8ce', accentFg: '#5f6f59' }, // Tutorial series (sage)
  community: { accent: '#7a6f1e', accentSubtle: '#fdfbe5', accentFg: '#7a6f1e' }, // Community / events (gold)
};

// Fixed brand tokens (do not change per series).
const T = {
  canvas:       '#f3eee7', // bg/subtle — diagram background
  node:         '#fffbf5', // bg/bg_bright
  muted:        '#ede8e0', // bg/muted
  border:       '#888077', // border/emphasized
  borderSubtle: '#c8c0b6', // border/subtle
  fg:           '#181210', // text/fg
  fgMuted:      '#524a43', // text/fg_muted
  passBg: '#f1f3f0', passLine: '#5f6f59', passFg: '#5f6f59', // sage
  failBg: '#ffede4', failLine: '#aa4c1e', failFg: '#aa4c1e', // coral
};

const FONT_SANS = '"STK Bureau Sans", "Inter", system-ui, sans-serif';
const FONT_MONO = '"STK Bureau Sans Mono", ui-monospace, monospace';

export function rasaMermaidConfig(series = 'default') {
  return {
    startOnLoad: false,
    theme: 'base',
    fontFamily: FONT_SANS,
    flowchart: { curve: 'linear', nodeSpacing: 48, rankSpacing: 56, padding: 16, htmlLabels: true },
    themeVariables: {
      fontFamily: FONT_SANS,
      fontSize: '18px',
      background: T.canvas,
      primaryColor: T.node,
      primaryBorderColor: T.border,
      primaryTextColor: T.fg,
      lineColor: T.fgMuted,
      edgeLabelBackground: T.canvas,
      clusterBkg: 'transparent',
      clusterBorder: T.border,
      tertiaryColor: T.canvas,
    },
    themeCSS: `
      .node rect, .node polygon { rx: 12px; ry: 12px; stroke-width: 1.5px; }
      .edgeLabel { font-family: ${FONT_MONO}; font-size: 13px; color: ${T.fgMuted}; text-transform: lowercase; }
      .cluster rect { stroke-dasharray: 6 6; rx: 16px; ry: 16px; }
      .cluster-label { font-family: ${FONT_MONO}; font-size: 12px; letter-spacing: .08em; text-transform: uppercase; fill: ${T.fgMuted}; }
      .flowchart-link { stroke-width: 1.5px; }
    `,
  };
}

export function rasaClassDefs(series = 'default') {
  const s = SERIES[series] || SERIES.default;
  return [
    `classDef default fill:${T.node},stroke:${T.border},stroke-width:1.5px,color:${T.fg};`,
    `classDef focus fill:${s.accentSubtle},stroke:${s.accent},stroke-width:2px,color:${s.accentFg};`,
    `classDef pass fill:${T.passBg},stroke:${T.passLine},stroke-width:1.5px,color:${T.passFg};`,
    `classDef fail fill:${T.failBg},stroke:${T.failLine},stroke-width:1.5px,color:${T.failFg};`,
    `classDef muted fill:${T.muted},stroke:${T.muted},stroke-width:0px,color:${T.fgMuted};`,
  ].join('\n');
}

/* Example — same diagram as the Figma kit example:

flowchart TD
  A[Queued reminder] --> B[Read current booking]
  B --> C[IF Has the booking changed?]
  C -- yes --> D[Changed: suppress old reminder]:::focus
  C -- no --> E[Same: send this version]:::pass
  E -- if send fails --> F[Reply lost: look up original send]:::muted
*/

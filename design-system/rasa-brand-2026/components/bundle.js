/* @ds-bundle: {"format":4,"namespace":"RasaNewBrand","components":[{"name":"Button"},{"name":"StatusTag"},{"name":"CategoryTag"},{"name":"Chip"},{"name":"ChatBubble"},{"name":"WindowBar"},{"name":"ProductWindow"},{"name":"ConceptCard"},{"name":"VisualContainer"},{"name":"ResultRow"},{"name":"ResultList"},{"name":"Notice"},{"name":"StepTab"},{"name":"StepTabs"},{"name":"Metric"},{"name":"TableRow"},{"name":"Table"},{"name":"TimelineStep"},{"name":"Badge"},{"name":"Label"},{"name":"MemberRow"},{"name":"KvRow"},{"name":"Stat"},{"name":"Field"},{"name":"Toggle"},{"name":"Attachment"},{"name":"Item"},{"name":"Node"},{"name":"InsightBar"},{"name":"CommitRow"},{"name":"CodeWindow"},{"name":"Strictness"},{"name":"StrictnessRow"},{"name":"PhaseCard"},{"name":"EnvCard"},{"name":"FeatureCard"},{"name":"Marker"},{"name":"Preview"},{"name":"MiniVisual"},{"name":"PageNumber"},{"name":"Pill"},{"name":"SlideButton"},{"name":"ProofCard"},{"name":"RasaMark"},{"name":"FlowStation"},{"name":"Flow"},{"name":"Callout"},{"name":"Hub"},{"name":"TeamLoop"},{"name":"TeamLoops"},{"name":"Venn"},{"name":"VennOrbit"},{"name":"Quadrant"},{"name":"LayerStack"},{"name":"RampTrack"},{"name":"RampBars"},{"name":"Trace"},{"name":"KpiTile"},{"name":"Dashboard"},{"name":"NumeralStat"},{"name":"NumeralStats"},{"name":"CompareStat"},{"name":"DotGrid"},{"name":"CodeBeforeAfter"},{"name":"CodeAnnotated"},{"name":"CodeDiff"},{"name":"TreeRow"},{"name":"FileTree"},{"name":"RuleRow"},{"name":"RuleList"},{"name":"StackBlock"},{"name":"SkillStack"},{"name":"ThreadEvent"},{"name":"ChatThread"},{"name":"TerminalStep"},{"name":"TerminalSteps"},{"name":"VoiceCall"},{"name":"PillCloud"},{"name":"DocThumb"},{"name":"DocGrid"},{"name":"DeployTarget"},{"name":"DeployTargets"},{"name":"Skeleton"},{"name":"ResourceChip"},{"name":"SkillProse"},{"name":"CollabCursor"},{"name":"AvatarStack"},{"name":"InsightCard"},{"name":"RunCard"},{"name":"StudioShell"}]} */
(function () {
  var React = window.React, h = React.createElement;
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(" "); }
  function pick(v, allowed, fallback) { return allowed.indexOf(v) >= 0 ? v : fallback; }

  function Button(p) {
    var type = pick(p.type, ["primary", "secondary"], "primary");
    return h("button", { type: "button", className: cx("rnb-button", "rnb-button--" + type, "ui-action", p.className), onClick: p.onClick, disabled: p.disabled }, p.children);
  }
  var TONES = ["success", "danger", "warning", "info", "neutral", "pink"];
  function StatusTag(p) {
    var tone = pick(p.tone, TONES, "neutral");
    return h("span", { className: cx("rnb-tag", "rnb-status--" + tone, "ui-label", p.className) }, p.children);
  }
  var HUES = ["periwinkle", "seafoam", "gold", "coral", "orchid", "lavender", "sage"];
  function CategoryTag(p) {
    var colour = pick(p.colour, HUES, "periwinkle");
    return h("span", { className: cx("rnb-tag", "rnb-cat", "rnb-cat--" + colour, "ui-label", p.className) }, p.dot === false ? null : h("span", { className: "rnb-dot" }), p.children);
  }
  function Chip(p) {
    var state = pick(p.state, ["default", "accent", "success", "skill", "off", "dark"], "default");
    var size = pick(p.size, ["regular", "small"], "regular");
    return h("span", { className: cx("rnb-chip", "rnb-chip--" + state, "rnb-chip--" + size, size === "small" ? "ui-meta" : "ui-body", p.className) }, p.icon || null, p.children);
  }
  function ChatBubble(p) {
    var tone = pick(p.tone, ["dark", "light", "soft", "highlight", "error"], "light");
    var tail = pick(p.tail, ["bottom-left", "bottom-right", "top-left"], "bottom-left");
    return h("div", { className: cx("rnb-bubble-row", tail === "bottom-right" ? "rnb-bubble-row--end" : null) },
      h("div", { className: cx("rnb-bubble", "rnb-bubble--" + tone, "rnb-tail--" + tail, "ui-body", p.className), style: p.width ? { width: Math.min(p.width, 520) } : undefined }, p.children));
  }
  function WindowBar(p) {
    return h("div", { className: "rnb-bar" },
      h("span", { className: "rnb-dots" }, h("i", null), h("i", null), h("i", null)),
      h("span", { className: "rnb-path ui-action" }, p.path || ""),
      p.meta ? h("span", { className: "rnb-meta ui-code" }, p.meta) : null,
      p.status ? h(StatusTag, { tone: p.statusTone || "neutral" }, p.status) : null);
  }
  function ProductWindow(p) {
    return h("div", { className: cx("rnb-window", p.className), style: { width: p.width || 736, flex: "none" } },
      h(WindowBar, { path: p.path, status: p.status, statusTone: p.statusTone, meta: p.meta }),
      h("div", { className: "rnb-window-body" }, p.children));
  }
  function ConceptCard(p) {
    return h("div", { className: cx("rnb-card", p.className), style: { width: p.width || 560 } },
      h("div", { className: "rnb-card-header" },
        p.icon ? h("span", { className: "rnb-icon-tile" }, p.icon) : null,
        h("span", { className: cx("rnb-card-title", p.heading ? "ui-heading" : "ui-title") }, p.title),
        p.tag ? h(StatusTag, { tone: p.tagTone || "neutral" }, p.tag) : null),
      h("div", { className: "rnb-card-body" }, p.children));
  }
  function VisualContainer(p) {
    var size = pick(p.size, ["square", "wide"], "square");
    var bg = pick(p.background, ["filled", "none"], "filled");
    var dims = size === "wide" ? [1760, 644] : [800, 800];
    var scale = p.scale || 1;
    return h("div", { className: cx("rnb-vc", "rnb-vc--" + bg, p.className), style: { width: dims[0] * scale, height: dims[1] * scale } }, p.children);
  }

  function ResultRow(p) {
    return h("div", { className: cx("rnb-result-row", p.className) },
      h("span", { className: "rnb-name ui-code" }, p.name),
      p.level ? h("span", { className: "rnb-level ui-body" }, p.level) : null,
      h(StatusTag, { tone: p.tone || "success" }, p.status || "Pass"));
  }
  function ResultList(p) { return h("div", { className: cx("rnb-results", p.className), style: p.style }, p.children); }
  function Notice(p) {
    var tone = pick(p.tone, ["approval", "blocked", "info", "gate"], "info");
    return h("div", { className: cx("rnb-notice", "rnb-notice--" + tone, p.className) },
      h("div", { className: "rnb-notice-text" },
        h("span", { className: "ui-title" }, p.title),
        p.detail ? h("span", { className: "rnb-notice-detail ui-body" }, p.detail) : null),
      p.actions || null);
  }
  var CHECK = h("svg", { className: "rnb-step-check", viewBox: "0 0 18 18", fill: "none" }, h("path", { d: "M3.5 9.5l3.5 3.5 7.5-8", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" }));
  function StepTab(p) {
    var live = p.state === "live";
    return h("div", { className: cx("rnb-step", live ? "rnb-step--live" : null, p.className) },
      live ? h("span", { className: "rnb-step-dot" }) : CHECK,
      h("span", { className: "rnb-step-label ui-action" }, p.label),
      p.meta ? h("span", { className: "rnb-step-meta ui-meta" }, p.meta) : null);
  }
  function StepTabs(p) { return h("div", { className: cx("rnb-steps", p.className), style: p.style }, p.children); }
  function Metric(p) {
    return h("div", { className: cx("rnb-metric", p.className), style: { width: p.width || 224 } },
      h("span", { className: "rnb-metric-label ui-body" }, p.label),
      h("span", { className: "rnb-metric-value ui-number" }, p.value));
  }
  function TableRow(p) {
    var head = p.kind === "header", cells = p.cells || [];
    return h("div", { className: cx("rnb-trow", head ? "rnb-trow--header ui-label" : null, p.className) },
      cells.map(function (c, i) { return h("span", { key: i, className: head ? null : (i === 0 ? "ui-action" : "ui-code") }, c); }));
  }
  function Table(p) { return h("div", { className: cx("rnb-table", p.className) }, p.children); }
  function TimelineStep(p) {
    return h("div", { className: cx("rnb-tstep", p.state === "now" ? "rnb-tstep--now" : null, p.className) },
      h("span", { className: "rnb-tstep-year ui-number" }, p.year),
      h("div", { className: "rnb-tstep-dotrow" }, h("span", { className: "rnb-tstep-dot" })),
      h("span", { className: "rnb-tstep-title ui-title" }, p.title),
      p.description ? h("span", { className: "rnb-tstep-desc ui-body" }, p.description) : null);
  }

  var BADGES = ["periwinkle","seafoam","gold","coral","orchid","lavender","sage","neutral","dark","pink"];
  function Badge(p) { var s = p.size === 28 ? 28 : 32; return h("span", { className: cx("rnb-badge", s === 28 ? "rnb-badge--28" : null, "rnb-badge--" + pick(p.colour, BADGES, "dark"), s === 28 ? "ui-micro" : "ui-label", p.className) }, p.initials); }
  function Label(p) { return h("span", { className: cx("rnb-label", "rnb-label--" + pick(p.colour, HUES, "periwinkle"), "ui-label", p.className) }, h("span", { className: "rnb-dot" }), p.children); }
  function MemberRow(p) { var sel = !!p.selected; return h("div", { className: cx("rnb-member", sel ? "rnb-member--selected" : null, p.className) },
      h(Badge, { initials: p.initials, colour: sel ? "pink" : "dark" }), h("span", { className: "rnb-member-name ui-action" }, p.name),
      p.scope ? h("span", { className: "rnb-member-scope ui-body" }, p.scope) : null, p.role ? h(StatusTag, { tone: sel ? "pink" : "neutral" }, p.role) : null); }
  function KvRow(p) { return h("div", { className: cx("rnb-kv", p.className) }, h("span", { className: "rnb-kv-key ui-title" }, p.label), h("span", { className: "rnb-kv-value ui-body" }, p.value)); }
  function Stat(p) { return h("div", { className: cx("rnb-stat", p.className) }, h("span", { className: "rnb-stat-value ui-number" }, p.value), h("span", { className: "rnb-stat-caption ui-meta" }, p.caption)); }
  function Field(p) { return h("div", { className: cx("rnb-field", p.focus ? "rnb-field--focus" : null, p.className), style: { width: p.width || 560 } },
      h("span", { className: "rnb-field-text ui-body" }, p.value), p.type === "select" ? h("span", { className: "rnb-field-caret ui-body" }, "\u2304") : null); }
  function Toggle(p) { return h("span", { className: cx("rnb-toggle", p.on === false ? null : "rnb-toggle--on", p.className), role: "switch", "aria-checked": p.on !== false }); }
  function Attachment(p) { return h("span", { className: cx("rnb-attach", p.kind === "skill" ? "rnb-attach--skill" : null, p.className) }, h("span", { className: "rnb-attach-kind ui-micro" }, p.type || (p.kind === "skill" ? "SKILL" : "PDF")), h("span", { className: "ui-body" }, p.name)); }
  function Item(p) { return h("div", { className: cx("rnb-item", p.dashed ? "rnb-item--dashed" : null, "ui-body", p.className), style: p.width ? { width: p.width } : undefined }, p.children); }
  function Node(p) { return h("div", { className: cx("rnb-node", p.className) }, p.preview || null,
      h("div", { className: "rnb-node-body" }, h("span", { className: "rnb-node-head ui-title" }, p.icon || null, p.title),
        p.description ? h("span", { className: "rnb-node-desc ui-body" }, p.description) : null,
        p.owner ? h("div", null, h(CategoryTag, { colour: p.ownerColour || "periwinkle" }, p.owner)) : null)); }
  function InsightBar(p) { return h("div", { className: cx("rnb-insight", p.className) }, h(StatusTag, { tone: "warning" }, p.tag || "Insight"), h("span", { className: "rnb-insight-text ui-body" }, p.children), p.action || null); }

  function CommitRow(p) { var studio = p.source === "Studio"; return h("div", { className: cx("rnb-commit", studio ? "rnb-commit--studio" : null, p.className) },
      h("span", { className: "rnb-commit-node" }), h("span", { className: "rnb-commit-hash ui-code" }, p.hash), h("span", { className: "rnb-commit-msg ui-body" }, p.message),
      p.author ? h("span", { className: "rnb-commit-author ui-body" }, p.author) : null, p.source ? h(StatusTag, { tone: studio ? "pink" : "neutral" }, p.source) : null); }
  function CodeWindow(p) { return h("div", { className: cx("rnb-code", p.className), style: { width: p.width || 740 } },
      h("span", { className: "rnb-code-bar" }, h("span", { className: "rnb-dots" }, h("i", null), h("i", null), h("i", null)), p.title ? h("span", { className: "rnb-code-title" }, p.title) : null), h("pre", { className: "ui-code" }, p.children)); }
  function FileCard(p) { return h("div", { className: cx("rnb-file", p.className), style: { width: p.width || 480 } },
      h("div", { className: "rnb-file-bar" }, h("svg",{width:16,height:16,viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:1.25,"aria-hidden":true},h("circle",{cx:4,cy:3.5,r:1.75}),h("circle",{cx:4,cy:12.5,r:1.75}),h("circle",{cx:12,cy:5,r:1.75}),h("path",{d:"M4 5.25v5.5M12 6.75c0 3-8 2-8 4"})), h("span", { className: "rnb-file-path" }, p.path), p.branch ? h(Chip, { size: "small" }, p.branch) : null),
      h("div", { className: "rnb-file-body ui-body" }, p.children),
      p.footer ? h("div", { className: "rnb-file-footer ui-body" }, p.footer) : null); }
  function Strictness(p) { var lv = Math.max(1, Math.min(5, p.level || 1)), s = []; for (var i = 1; i <= 5; i++) s.push(h("i", { key: i, className: i <= lv ? "f" + i : null }));
    return h("span", { className: cx("rnb-strict", p.className), "aria-label": "Strictness " + lv + " of 5" }, s); }
  function StrictnessRow(p) { return h("div", { className: cx("rnb-strict-row", p.selected ? "rnb-strict-row--selected" : null, p.className) },
      h("span", { className: "rnb-icon-tile" }, p.icon || null), h("span", { className: "rnb-strict-name ui-title" }, p.name), h(Strictness, { level: p.level })); }
  function PhaseCard(p) { return h("div", { className: cx("rnb-ccard rnb-phase", p.className), style: { width: p.width || 406 } },
      h("div", { className: "rnb-phase-top" }, h("span", { className: "rnb-phase-label ui-label" }, p.phase), p.duration ? h(StatusTag, { tone: "neutral" }, p.duration) : null),
      h("span", { className: "rnb-icon-tile" }, p.icon || null), h("span", { className: "rnb-ccard-title ui-heading" }, p.title),
      h("span", { className: "rnb-ccard-desc ui-body" }, p.description), p.mini ? h("div", { className: "rnb-phase-mini" }, p.mini) : null,
      p.outcome ? h("div", { className: "rnb-phase-outcome" }, h("span", { className: "rnb-phase-label ui-label" }, "Outcome"), h("span", { className: "ui-body" }, p.outcome)) : null); }
  function EnvCard(p) { return h("div", { className: cx("rnb-ccard rnb-env", p.className), style: { width: p.width || 320 } },
      h("span", { className: "rnb-icon-tile" }, p.icon || null), h("span", { className: "rnb-ccard-title ui-heading" }, p.title), h("span", { className: "rnb-ccard-desc ui-body" }, p.subtitle)); }
  function FeatureCard(p) { return h("div", { className: cx("rnb-ccard rnb-feature", p.className), style: { width: p.width || 600 } },
      h("div", { className: "rnb-feature-preview" }, p.preview || null),
      h("div", { className: "rnb-feature-text" }, h("span", { className: "rnb-feature-title ui-feature" }, p.title, p.emphasis ? " " : null, p.emphasis ? h("i", null, p.emphasis) : null),
        h("span", { className: "rnb-ccard-desc ui-body" }, p.description))); }
  function Marker(p) { return h("span", { className: cx("rnb-marker", p.align === "end" ? "rnb-marker--end" : null, p.className) },
      h("span", { className: "rnb-marker-num ui-action" }, p.number), h("span", { className: "rnb-marker-label ui-title" }, p.label)); }
  var PV = { periwinkle: ["var(--periwinkle-100)", "var(--periwinkle-300)", "var(--periwinkle-700)"], seafoam: ["var(--seafoam-100)", "var(--seafoam-300)", "var(--seafoam-700)"],
    gold: ["var(--gold-200)", "var(--gold-500)", "var(--gold-700)"], coral: ["var(--coral-100)", "var(--coral-300)", "var(--coral-700)"], orchid: ["var(--orchid-100)", "var(--orchid-300)", "var(--orchid-700)"],
    lavender: ["rgba(200, 183, 231, 0.3)", "var(--lavender-500)", "var(--lavender-700)"], sage: ["var(--sage-100)", "var(--sage-300)", "var(--sage-700)"] };
  function Preview(p) { var c = PV[pick(p.colour, HUES, "periwinkle")], t = pick(p.type, ["call", "app", "assist"], "call"), kids;
    if (t === "call") kids = [h("span", { key: 1, className: "rnb-preview-title ui-label", style: { textTransform: "none", letterSpacing: 0 } }, p.title || "Your bank"), h("span", { key: 2, className: "rnb-preview-meta ui-micro" }, p.meta || "2:14"),
      h("span", { key: 3, className: "rnb-preview-row" }, h("i", { className: "rnb-preview-dot", style: { background: c[1] } }), h("i", { className: "rnb-preview-dot", style: { background: c[1] } }), h("i", { className: "rnb-preview-dot", style: { background: c[2] } }))];
    else if (t === "app") kids = [h("span", { key: 1, className: "rnb-preview-meta ui-micro" }, p.meta || "Balance"), h("span", { key: 2, className: "rnb-preview-title ui-label", style: { textTransform: "none", letterSpacing: 0 } }, p.title || "$2,430"), h("i", { key: 3, className: "rnb-preview-bar", style: { width: 80, background: c[1] } })];
    else kids = [h("span", { key: 1, className: "rnb-preview-meta ui-micro" }, p.meta || "Live call"), h("i", { key: 2, className: "rnb-preview-line", style: { width: 92, background: c[1] } }), h("i", { key: 3, className: "rnb-preview-line", style: { width: 47, background: c[1] } }), h("i", { key: 4, className: "rnb-preview-bar", style: { width: 72, background: c[2] } })];
    return h("div", { className: cx("rnb-preview", p.className), style: { background: c[0] } }, kids); }
  var MINIS = {"doc": "<svg width=\"310\" height=\"100\" viewBox=\"0 0 310 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><g><rect x=\"0.5\" y=\"0.5\" width=\"309\" height=\"99\" rx=\"8.5\" fill=\"#FFFBF5\"/><rect x=\"0.5\" y=\"0.5\" width=\"309\" height=\"99\" rx=\"8.5\" stroke=\"#C8C0B6\"/><g><rect x=\"13.5\" y=\"10.5\" width=\"130\" height=\"35\" rx=\"4.5\" fill=\"#EBF8F5\"/><rect x=\"13.5\" y=\"10.5\" width=\"130\" height=\"35\" rx=\"4.5\" stroke=\"#9FDBD0\"/><rect x=\"18\" y=\"21\" width=\"14\" height=\"14\" rx=\"4\" fill=\"#C8EBE4\"/><rect x=\"38\" y=\"26\" width=\"97\" height=\"5\" rx=\"2.5\" fill=\"#9FDBD0\"/></g><rect x=\"13\" y=\"52\" width=\"244\" height=\"6\" rx=\"3\" fill=\"#C8C0B6\"/><rect x=\"13\" y=\"64\" width=\"261\" height=\"14\" rx=\"4\" fill=\"#C8EBE4\"/><rect x=\"13\" y=\"84\" width=\"159\" height=\"6\" rx=\"3\" fill=\"#C8C0B6\"/></g></g></svg>", "dots": "<svg width=\"336\" height=\"60\" viewBox=\"0 0 336 60\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><circle cx=\"7\" cy=\"7\" r=\"7\" fill=\"#524A43\"/><circle cx=\"30\" cy=\"7\" r=\"7\" fill=\"#524A43\"/><circle cx=\"53\" cy=\"7\" r=\"7\" fill=\"#524A43\"/><circle cx=\"76\" cy=\"7\" r=\"7\" fill=\"#524A43\"/><circle cx=\"99\" cy=\"7\" r=\"7\" fill=\"#524A43\"/><circle cx=\"122\" cy=\"7\" r=\"7\" fill=\"#524A43\"/><circle cx=\"145\" cy=\"7\" r=\"7\" fill=\"#524A43\"/><circle cx=\"168\" cy=\"7\" r=\"7\" fill=\"#524A43\"/><circle cx=\"191\" cy=\"7\" r=\"7\" fill=\"#524A43\"/><circle cx=\"214\" cy=\"7\" r=\"7\" fill=\"#524A43\"/><circle cx=\"237\" cy=\"7\" r=\"7\" fill=\"#524A43\"/><circle cx=\"260\" cy=\"7\" r=\"7\" fill=\"#524A43\"/><circle cx=\"283\" cy=\"7\" r=\"7\" fill=\"#524A43\"/><circle cx=\"306\" cy=\"7\" r=\"7\" fill=\"#524A43\"/><circle cx=\"329\" cy=\"7\" r=\"7\" fill=\"#524A43\"/><circle cx=\"7\" cy=\"30\" r=\"7\" fill=\"#524A43\"/><circle cx=\"30\" cy=\"30\" r=\"7\" fill=\"#524A43\"/><circle cx=\"53\" cy=\"30\" r=\"7\" fill=\"#524A43\"/><circle cx=\"76\" cy=\"30\" r=\"7\" fill=\"#524A43\"/><circle cx=\"99\" cy=\"30\" r=\"7\" fill=\"#524A43\"/><circle cx=\"122\" cy=\"30\" r=\"7\" fill=\"#524A43\"/><circle cx=\"145\" cy=\"30\" r=\"7\" fill=\"#524A43\"/><circle cx=\"168\" cy=\"30\" r=\"7\" fill=\"#524A43\"/><circle cx=\"191\" cy=\"30\" r=\"7\" fill=\"#524A43\"/><circle cx=\"214\" cy=\"30\" r=\"7\" fill=\"#524A43\"/><circle cx=\"237\" cy=\"30\" r=\"7\" fill=\"#524A43\"/><circle cx=\"260\" cy=\"30\" r=\"7\" fill=\"#524A43\"/><circle cx=\"283\" cy=\"30\" r=\"7\" fill=\"#524A43\"/><circle cx=\"306\" cy=\"30\" r=\"7\" fill=\"#524A43\"/><circle cx=\"329\" cy=\"30\" r=\"7\" fill=\"#524A43\"/><circle cx=\"7\" cy=\"53\" r=\"7\" fill=\"#524A43\"/><circle cx=\"30\" cy=\"53\" r=\"7\" fill=\"#524A43\"/><circle cx=\"53\" cy=\"53\" r=\"7\" fill=\"#524A43\"/><circle cx=\"76\" cy=\"53\" r=\"7\" fill=\"#524A43\"/><circle cx=\"99\" cy=\"53\" r=\"7\" fill=\"#524A43\"/><circle cx=\"122\" cy=\"53\" r=\"7\" fill=\"#524A43\"/><circle cx=\"145\" cy=\"53\" r=\"7\" fill=\"#524A43\"/><circle cx=\"168\" cy=\"53\" r=\"6.25\" stroke=\"#ABA49C\" stroke-width=\"1.5\"/><circle cx=\"191\" cy=\"53\" r=\"6.25\" stroke=\"#ABA49C\" stroke-width=\"1.5\"/><circle cx=\"214\" cy=\"53\" r=\"6.25\" stroke=\"#ABA49C\" stroke-width=\"1.5\"/><circle cx=\"237\" cy=\"53\" r=\"6.25\" stroke=\"#ABA49C\" stroke-width=\"1.5\"/></g></svg>", "flags": "<svg width=\"326\" height=\"92\" viewBox=\"0 0 326 92\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><g><rect x=\"0.5\" y=\"0.5\" width=\"325\" height=\"25\" rx=\"6.5\" fill=\"#FFFBF5\"/><rect x=\"0.5\" y=\"0.5\" width=\"325\" height=\"25\" rx=\"6.5\" stroke=\"#C8C0B6\"/><rect x=\"11\" y=\"10\" width=\"213\" height=\"6\" rx=\"3\" fill=\"#C8C0B6\"/><rect x=\"274\" y=\"7\" width=\"40\" height=\"12\" rx=\"6\" fill=\"#BBC9FF\"/></g><g><rect x=\"0.5\" y=\"33.5\" width=\"325\" height=\"25\" rx=\"6.5\" fill=\"#FFFBF5\"/><rect x=\"0.5\" y=\"33.5\" width=\"325\" height=\"25\" rx=\"6.5\" stroke=\"#C8C0B6\"/><rect x=\"11\" y=\"43\" width=\"158\" height=\"6\" rx=\"3\" fill=\"#C8C0B6\"/><rect x=\"274\" y=\"40\" width=\"40\" height=\"12\" rx=\"6\" fill=\"#FFB28C\"/></g><g><rect x=\"0.5\" y=\"66.5\" width=\"325\" height=\"25\" rx=\"6.5\" fill=\"#FFFBF5\"/><rect x=\"0.5\" y=\"66.5\" width=\"325\" height=\"25\" rx=\"6.5\" stroke=\"#C8C0B6\"/><rect x=\"11\" y=\"76\" width=\"188\" height=\"6\" rx=\"3\" fill=\"#C8C0B6\"/><rect x=\"274\" y=\"73\" width=\"40\" height=\"12\" rx=\"6\" fill=\"#C8B7E7\"/></g></g></svg>", "squares-a": "<svg width=\"126\" height=\"34\" viewBox=\"0 0 126 34\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><g><rect x=\"0.75\" y=\"0.75\" width=\"32.5\" height=\"32.5\" rx=\"7.25\" stroke=\"#ABA49C\" stroke-width=\"1.5\"/><rect x=\"46.75\" y=\"0.75\" width=\"32.5\" height=\"32.5\" rx=\"7.25\" stroke=\"#ABA49C\" stroke-width=\"1.5\"/><rect x=\"92.75\" y=\"0.75\" width=\"32.5\" height=\"32.5\" rx=\"7.25\" stroke=\"#ABA49C\" stroke-width=\"1.5\"/></g></g></svg>", "squares-b": "<svg width=\"126\" height=\"34\" viewBox=\"0 0 126 34\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><g><rect width=\"34\" height=\"34\" rx=\"8\" fill=\"#ABA49C\"/><rect x=\"46.75\" y=\"0.75\" width=\"32.5\" height=\"32.5\" rx=\"7.25\" stroke=\"#ABA49C\" stroke-width=\"1.5\"/><rect x=\"92.75\" y=\"0.75\" width=\"32.5\" height=\"32.5\" rx=\"7.25\" stroke=\"#ABA49C\" stroke-width=\"1.5\"/></g></g></svg>", "squares-c": "<svg width=\"126\" height=\"34\" viewBox=\"0 0 126 34\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><g><rect width=\"34\" height=\"34\" rx=\"8\" fill=\"#181210\"/><rect x=\"46.75\" y=\"0.75\" width=\"32.5\" height=\"32.5\" rx=\"7.25\" stroke=\"#ABA49C\" stroke-width=\"1.5\"/><rect x=\"92.75\" y=\"0.75\" width=\"32.5\" height=\"32.5\" rx=\"7.25\" stroke=\"#ABA49C\" stroke-width=\"1.5\"/></g></g></svg>", "squares-d": "<svg width=\"126\" height=\"80\" viewBox=\"0 0 126 80\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><g><rect width=\"34\" height=\"34\" rx=\"8\" fill=\"#181210\"/><rect x=\"46\" width=\"34\" height=\"34\" rx=\"8\" fill=\"#181210\"/><rect x=\"92\" width=\"34\" height=\"34\" rx=\"8\" fill=\"#181210\"/><rect y=\"46\" width=\"34\" height=\"34\" rx=\"8\" fill=\"#181210\"/><rect x=\"46\" y=\"46\" width=\"34\" height=\"34\" rx=\"8\" fill=\"#181210\"/><rect x=\"92\" y=\"46\" width=\"34\" height=\"34\" rx=\"8\" fill=\"#181210\"/></g></g></svg>", "timeline": "<svg width=\"340\" height=\"40\" viewBox=\"0 0 340 40\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g><rect x=\"8\" y=\"19\" width=\"312\" height=\"2\" rx=\"1\" fill=\"#ABA49C\"/><circle cx=\"8\" cy=\"20\" r=\"8\" fill=\"#ABA49C\"/><circle cx=\"108\" cy=\"20\" r=\"8\" fill=\"#ABA49C\"/><circle cx=\"208\" cy=\"20\" r=\"8\" fill=\"#ABA49C\"/><circle cx=\"312\" cy=\"20\" r=\"20\" fill=\"#C8C0B6\"/><circle cx=\"312\" cy=\"20\" r=\"13\" fill=\"#181210\"/></g></svg>"};
  function MiniVisual(p) { var k = p.kind === "squares" ? "squares-" + pick(p.stage, ["a", "b", "c", "d"], "a") : pick(p.kind, ["flags", "doc", "dots", "timeline"], "flags");
    return h("span", { className: cx("rnb-mini", p.className), dangerouslySetInnerHTML: { __html: MINIS[k] } }); }
  function PageNumber(p) { var n = String(p.number || 1); return h("span", { className: cx("rnb-page-number meta", p.className) }, (n.length < 2 ? "0" + n : n) + "."); }
  function Pill(p) { return h("span", { className: cx("rnb-pill", "rnb-pill--" + pick(p.colour, HUES, "gold"), "eyebrow", p.className), style: { fontSize: 18, lineHeight: "24px" } }, p.children); }
  function SlideButton(p) { return h("span", { className: cx("rnb-slide-button", p.theme === "dark" ? "rnb-slide-button--dark" : null, "action", p.className) }, p.children); }
  function ProofCard(p) { return h("div", { className: cx("rnb-proof", p.theme === "dark" ? "rnb-proof--dark" : null, p.className) },
      h("div", { className: "rnb-proof-head" }, h("span", { className: "rnb-proof-sector eyebrow", style: { fontSize: 18, lineHeight: "24px", textTransform: "uppercase" } }, p.sector), p.pill ? h(Pill, { colour: p.pillColour || "gold" }, p.pill) : null),
      h("div", { className: "rnb-proof-body" }, h("span", { className: "statement" }, p.name),
        h("div", null, h("div", { className: "big-number" }, p.figure), h("div", { className: "rnb-proof-label body" }, p.label)))); }
  window.RasaNewBrand = { Button: Button, StatusTag: StatusTag, CategoryTag: CategoryTag, Chip: Chip, ChatBubble: ChatBubble, WindowBar: WindowBar, ProductWindow: ProductWindow, ConceptCard: ConceptCard, VisualContainer: VisualContainer, ResultRow: ResultRow, ResultList: ResultList, Notice: Notice, StepTab: StepTab, StepTabs: StepTabs, Metric: Metric, TableRow: TableRow, Table: Table, TimelineStep: TimelineStep, Badge: Badge, Label: Label, MemberRow: MemberRow, KvRow: KvRow, Stat: Stat, Field: Field, Toggle: Toggle, Attachment: Attachment, Item: Item, Node: Node, InsightBar: InsightBar, CommitRow: CommitRow, CodeWindow: CodeWindow, FileCard: FileCard, Strictness: Strictness, StrictnessRow: StrictnessRow, PhaseCard: PhaseCard, EnvCard: EnvCard, FeatureCard: FeatureCard, Marker: Marker, Preview: Preview, MiniVisual: MiniVisual, PageNumber: PageNumber, Pill: Pill, SlideButton: SlideButton, ProofCard: ProofCard };
})();
/* ---- batch: diagrams ---- */
(function () {
  var React = window.React, h = React.createElement, NS = window.RasaNewBrand || (window.RasaNewBrand = {});
  function C(n) { return "var(--" + n + ")"; }
  var uid = 0; function useUid(p) { var r = React.useRef(null); if (r.current == null) r.current = p + "-" + (++uid); return r.current; }
  var MARK = "M65.1304 61.6522L86 54V22H22V86H37.3043V71.3913L49.1304 67.2174L67.2174 86H86L65.1304 61.6522ZM37.3043 55.3913V37.3043H70.6957V43.5652L37.3043 55.3913Z";
  function RasaMark(p) { var s = p.size || 40; return h("svg", { width: s, height: s, viewBox: "22 22 64 64", "aria-label": "Rasa" }, h("path", { d: MARK, fill: p.color || C("taupe-50"), fillRule: "evenodd" })); }
  // orthogonal path with rounded corners (brand rule: never curved)
  function ortho(pts, r) {
    r = r == null ? 12 : r; var d = "M" + pts[0][0] + " " + pts[0][1];
    for (var i = 1; i < pts.length - 1; i++) {
      var a = pts[i - 1], b = pts[i], c = pts[i + 1];
      var d1 = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1, d2 = Math.hypot(c[0] - b[0], c[1] - b[1]) || 1, rr = Math.min(r, d1 / 2, d2 / 2);
      var p1 = [b[0] - (b[0] - a[0]) / d1 * rr, b[1] - (b[1] - a[1]) / d1 * rr], p2 = [b[0] + (c[0] - b[0]) / d2 * rr, b[1] + (c[1] - b[1]) / d2 * rr];
      d += " L" + p1[0] + " " + p1[1] + " Q" + b[0] + " " + b[1] + " " + p2[0] + " " + p2[1];
    }
    var l = pts[pts.length - 1]; return d + " L" + l[0] + " " + l[1];
  }
  function arrowDef(id, color) { return h("marker", { id: id, viewBox: "0 0 10 10", refX: 9, refY: 5, markerWidth: 8, markerHeight: 8, orient: "auto-start-reverse", markerUnits: "userSpaceOnUse" }, h("path", { d: "M2 1 L9 5 L2 9", fill: "none", stroke: color, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" })); }
  var abs = function (x, y, extra) { return Object.assign({ position: "absolute", left: x, top: y }, extra || {}); };

  /* ---------- FlowStation / Flow ---------- */
  function FlowStation(p) {
    var st = p.state || "default";
    var dot = st === "active" ? { background: C("pink-400"), boxShadow: "0 0 0 6px " + C("pink-100") } : st === "done" ? { background: C("taupe-950") } : { background: C("taupe-50"), border: "2px solid " + C("taupe-400"), boxSizing: "border-box" };
    return h("div", { style: { width: p.width || 220, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center" } },
      h("span", { className: "ui-micro", style: { color: st === "default" ? C("taupe-500") : C("taupe-700") } }, p.index || ""),
      h("span", { style: Object.assign({ width: 28, height: 28, borderRadius: 999, flex: "none" }, dot) }),
      h("span", { className: "ui-title", style: { color: st === "active" ? C("pink-600") : C("taupe-950") } }, p.label),
      p.detail ? h("span", { className: "ui-meta", style: { color: C("taupe-700") } }, p.detail) : null);
  }
  var FLOW = [{ label: "Message in", detail: "Customer speaks or types", state: "done" }, { label: "Route", detail: "One call picks the skill", state: "done" }, { label: "Run the skill", detail: "Rules checked at every step", state: "active" }, { label: "Tool call", detail: "Your code, your systems" }, { label: "Reply out", detail: "Wording you approved" }];
  function Flow(p) {
    var steps = p.steps || FLOW, w = p.width || 1400, n = steps.length, sw = 220;
    var act = steps.findIndex(function (s) { return s.state === "active"; }); if (act < 0) act = steps.filter(function (s) { return s.state === "done"; }).length - 1;
    var span = w - sw, frac = n > 1 ? Math.max(0, act) / (n - 1) : 0, top = 16 + 12 + 14 - 1;
    return h("div", { style: { position: "relative", width: w, display: "flex", justifyContent: "space-between" } },
      h("div", { style: abs(sw / 2, top, { width: span, height: 2, background: C("taupe-300") }) }),
      h("div", { style: abs(sw / 2, top, { width: span * frac, height: 2, background: C("taupe-950") }) }),
      steps.map(function (s, i) { return h("div", { key: i, style: { position: "relative" } }, h(FlowStation, Object.assign({ index: String(i + 1).padStart(2, "0") }, s))); }));
  }

  /* ---------- Callout ---------- */
  function Callout(p) {
    var right = p.side !== "left";
    var pin = h("span", { key: "p", style: { width: 8, height: 8, borderRadius: 999, background: C("pink-400"), flex: "none" } });
    var lead = h("span", { key: "l", style: { width: 56, height: 1, background: C("pink-400"), flex: "none" } });
    var note = h("div", { key: "n", style: { width: p.width || 240, padding: "12px 16px", borderRadius: 12, background: C("taupe-50"), border: "1px solid " + C("taupe-300"), display: "flex", flexDirection: "column", gap: 4 } },
      h("span", { className: "ui-label", style: { color: C("taupe-950") } }, p.title || "What this line does"),
      p.detail ? h("span", { className: "ui-meta", style: { color: C("taupe-700") } }, p.detail) : null);
    return h("div", { style: { display: "inline-flex", alignItems: "center" } }, right ? [pin, lead, note] : [note, lead, pin]);
  }

  /* ---------- Hub ---------- */
  var HUB_ITEMS = [{ label: "Billing question", hue: "periwinkle" }, { label: "Rebook flight", hue: "sage" }, { label: "Upgrade plan", hue: "gold" }, { label: "Agent card", hue: "orchid" }, { label: "Human handoff", hue: "coral" }, { label: "Knowledge search", hue: "seafoam" }];
  function Hub(p) {
    var items = p.items || HUB_ITEMS, n = items.length, W = p.width || 1100, H = p.height || 620, cx = W / 2, cy = H / 2, focus = p.focus == null ? 1 : p.focus, id = useUid("hub");
    var pos = items.map(function (_, i) { var a = -Math.PI / 2 + i * 2 * Math.PI / n + Math.PI / n; return [cx + Math.cos(a) * (W / 2 - 110), cy + Math.sin(a) * (H / 2 - 75)]; });
    return h("div", { style: { position: "relative", width: W, height: H } },
      h("svg", { width: W, height: H, style: { position: "absolute", inset: 0 } },
        pos.map(function (q, i) { var f = i === focus, flat = Math.abs(q[1] - cy) < 30, end = flat ? [[q[0], cy]] : [[q[0], cy], [q[0], q[1] + (q[1] > cy ? -24 : 24)]]; return h("path", { key: i, d: ortho([[cx, cy]].concat(end), 16), fill: "none", stroke: f ? C("pink-400") : C("taupe-400"), strokeWidth: f ? 2 : 1.5 }); })),
      items.map(function (it, i) { var f = i === focus;
        return h("div", { key: i, style: abs(pos[i][0], pos[i][1], { transform: "translate(-50%,-50%)", display: "flex", alignItems: "center", gap: 10, padding: "12px 18px 12px 16px", borderRadius: 12, background: C("taupe-50"), border: (f ? 2 : 1) + "px solid " + (f ? C("pink-400") : C("taupe-300")), whiteSpace: "nowrap" }) },
          h("span", { style: { width: 10, height: 10, borderRadius: 999, background: C((it.hue || "periwinkle") + "-400") } }), h("span", { className: "ui-title", style: { color: f ? C("pink-700") : C("taupe-950") } }, it.label)); }),
      h("div", { style: abs(cx, cy, { transform: "translate(-50%,-50%)", padding: "20px 32px", borderRadius: 999, background: C("taupe-950"), display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }) },
        h("span", { className: "ui-title", style: { color: C("taupe-100") } }, p.center || "Orchestrator"), h("span", { className: "ui-micro", style: { color: C("taupe-400") } }, p.caption || "Every turn")));
  }

  /* ---------- TeamLoop / TeamLoops ---------- */
  var STAGES = [["Build", "gold", 40, 0], ["Test", "periwinkle", 290, 0], ["Release", "seafoam", 290, 124], ["Improve", "coral", 40, 124]];
  function TeamLoop(p) {
    var id = useUid("loop"), col = C("taupe-700");
    var arrows = [[[198, 18], [282, 18]], [[440, 18], [466, 18], [466, 142], [446, 142]], [[282, 142], [198, 142]], [[40, 142], [14, 142], [14, 18], [34, 18]]];
    return h("div", { style: { position: "relative", width: 480, height: 160, flex: "none" } },
      h("svg", { width: 480, height: 160, style: { position: "absolute", inset: 0, overflow: "visible" } }, h("defs", null, arrowDef(id, col)),
        arrows.map(function (a, i) { return h("path", { key: i, d: ortho(a), fill: "none", stroke: col, strokeWidth: 1.5, markerEnd: "url(#" + id + ")" }); })),
      STAGES.map(function (s) { return h("div", { key: s[0], className: "ui-label", style: abs(s[2], s[3], { width: 150, height: 36, boxSizing: "border-box", borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", background: C(s[1] + "-100"), border: "1px solid " + C(s[1] + "-400"), color: C("taupe-950") }) }, s[0]); }),
      h("div", { className: "ui-title", style: abs(0, 80, { width: 480, transform: "translateY(-50%)", textAlign: "center", color: C("taupe-950") }) }, p.team || "Team 1"));
  }
  function TeamLoops(p) {
    var teams = p.teams || ["Team 1", "Team 2", "Team 3"];
    return h("fieldset", { style: { margin: 0, padding: "32px 48px 54px", border: "2px solid " + C("pink-400"), borderRadius: 24, display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 48, flex: "none", width: "max-content", minInlineSize: "max-content" } },
      h("legend", { className: "eyebrow", style: { margin: "0 auto", padding: "0 20px", textAlign: "center", textTransform: "uppercase", color: C("taupe-950"), fontFamily: "var(--font-mono)", fontSize: 18, lineHeight: "24px" } }, p.title || "Your agent factory", h("br"), p.subtitle || "(Rasa)"),
      teams.map(function (t, i) { return h(TeamLoop, { key: i, team: t }); }));
  }

  /* ---------- Venn / VennOrbit ---------- */
  function Venn(p) {
    var id = useUid("venn"), W = 760, cx = 380, cy = 330, R = 200, o = 125, teams = p.teams || ["Team 1", "Team 2", "Team 3", "Team 4"];
    var dirs = [[-1, 0], [0, -1], [1, 0], [0, 1]], cs = dirs.map(function (d) { return [cx + d[0] * o, cy + d[1] * o]; }), stroke = C("taupe-700");
    var core = h("rect", { x: 0, y: 0, width: W, height: 720, fill: C("pink-400") });
    for (var i = cs.length - 1; i >= 0; i--) core = h("g", { clipPath: "url(#" + id + "-c" + i + ")" }, core);
    return h("div", { style: { position: "relative", width: W, height: 720 } },
      h("svg", { width: W, height: 720, style: { position: "absolute", inset: 0 } },
        h("defs", null, cs.map(function (c, i) { return h("clipPath", { key: i, id: id + "-c" + i }, h("circle", { cx: c[0], cy: c[1], r: R })); })),
        core,
        h("circle", { cx: cx, cy: cy, r: 155, fill: "none", stroke: stroke, strokeWidth: 1.5, strokeDasharray: "8 8" }),
        cs.map(function (c, i) { return h("circle", { key: i, cx: c[0], cy: c[1], r: R, fill: "none", stroke: stroke, strokeWidth: 1.5 }); }),
        h("line", { x1: 300, y1: 702, x2: W, y2: 702, stroke: stroke, strokeWidth: 1 })),
      dirs.map(function (d, i) { var dist = o + R - 40; return h("span", { key: i, className: "eyebrow", style: abs(cx + d[0] * dist, cy + d[1] * dist, { transform: "translate(" + (d[0] === 0 ? "-50%" : d[0] < 0 ? "0" : "-100%") + "," + (d[1] === 0 ? "-50%" : d[1] < 0 ? "0" : "-100%") + ")", textTransform: "uppercase", color: C("taupe-950"), whiteSpace: "nowrap" }) }, teams[i]); }),
      h("span", { className: "ui-micro", style: abs(cx - 125, cy - 115, { color: C("taupe-700") }) }, p.coe || "CoE team"),
      h("div", { style: abs(cx, cy, { transform: "translate(-50%,-50%)" }) }, h(RasaMark, { size: 56 })),
      h("span", { className: "eyebrow", style: abs(0, 690, { textTransform: "uppercase", color: C("taupe-950") }) }, p.footer || "Your AI agent factory"));
  }
  function VennOrbit(p) {
    var W = 760, cx = 380, cy = 330, teams = p.teams || ["Team 1", "Team 2", "Team 3", "Team 4"], n = teams.length;
    var pill = function (t, x, y, dark, k) { return h("span", { key: k, className: "ui-label", style: abs(x, y, { transform: "translate(-50%,-50%)", padding: "10px 16px", borderRadius: 999, whiteSpace: "nowrap", background: dark ? C("taupe-950") : C("taupe-50"), color: dark ? C("taupe-50") : C("taupe-950"), border: dark ? "none" : "1px solid " + C("taupe-300") }) }, t); };
    return h("div", { style: { position: "relative", width: W, height: 720 } },
      h("svg", { width: W, height: 720, style: { position: "absolute", inset: 0 } },
        h("circle", { cx: cx, cy: cy, r: 300, fill: "none", stroke: C("taupe-300"), strokeWidth: 1 }),
        h("circle", { cx: cx, cy: cy, r: 180, fill: "none", stroke: C("taupe-500"), strokeWidth: 1.5, strokeDasharray: "6 8" }),
        h("circle", { cx: cx, cy: cy, r: 90, fill: C("pink-400") }),
        h("line", { x1: 300, y1: 702, x2: W, y2: 702, stroke: C("taupe-700"), strokeWidth: 1 })),
      h("div", { style: abs(cx, cy - 8, { transform: "translate(-50%,-50%)" }) }, h(RasaMark, { size: 64 })),
      h("span", { className: "ui-micro", style: abs(cx, cy + 52, { transform: "translateX(-50%)", color: C("pink-50") }) }, p.core || "Platform"),
      pill(p.coe || "CoE team", cx, cy - 180, true, "coe"),
      teams.map(function (t, i) { var a = (-135 + i * 360 / n) * Math.PI / 180; return pill(t, cx + Math.cos(a) * 300, cy + Math.sin(a) * 300, false, i); }),
      h("span", { className: "eyebrow", style: abs(0, 690, { textTransform: "uppercase", color: C("taupe-950") }) }, p.footer || "Your AI agent factory"));
  }

  /* ---------- Quadrant ---------- */
  var QUAD = [{ title: "Managed services", text: "They build and run the agent for you. Lots of core changes go through the vendor." }, { title: "Rasa", text: "Your team builds on a platform it owns. Business and engineering ship together, with Copilot.", focus: true }, { title: "Cloud platforms", text: "Able to launch in the cloud. Hard to fundamentally update any part of product." }, { title: "DIY frameworks", text: "Yours to own. Engineers must also build & testing, monitoring and tooling around the agent." }];
  function Quadrant(p) {
    var it = p.items || QUAD, ax = p.axes || ["Fast to change", "Slow to change", "Vendor owns it", "Your team owns it"], W = 1696, H = 560, ox = 70, oy = 500, top = 20, right = 1680, mx = (ox + right) / 2, my = (top + oy) / 2, id = useUid("q"), col = C("taupe-700");
    var spots = [[ox + 130, 90], [mx + 80, 90], [ox + 130, my + 60], [mx + 80, my + 60]];
    var lab = function (s, st, k) { return h("span", { key: k, className: "eyebrow", style: Object.assign({ position: "absolute", textTransform: "uppercase", color: col, whiteSpace: "nowrap" }, st) }, s); };
    return h("div", { style: { position: "relative", width: W, height: H } },
      h("svg", { width: W, height: H, style: { position: "absolute", inset: 0, overflow: "visible" } }, h("defs", null, arrowDef(id, col)),
        h("path", { d: "M" + ox + " " + oy + " L" + ox + " " + top, stroke: col, strokeWidth: 1.5, markerEnd: "url(#" + id + ")" }),
        h("path", { d: "M" + ox + " " + oy + " L" + right + " " + oy, stroke: col, strokeWidth: 1.5, markerEnd: "url(#" + id + ")" }),
        h("path", { d: "M" + mx + " " + (top + 20) + " L" + mx + " " + oy, stroke: C("taupe-400"), strokeWidth: 1, strokeDasharray: "2 6" }),
        h("path", { d: "M" + ox + " " + my + " L" + (right - 40) + " " + my, stroke: C("taupe-400"), strokeWidth: 1, strokeDasharray: "2 6" })),
      lab(ax[0], { left: ox + 20, top: top - 6 }, 0), lab(ax[1], { left: ox + 20, top: oy - 40 }, 1), lab(ax[2], { left: ox, top: oy + 20 }, 2), lab(ax[3], { right: W - right, top: oy + 20 }, 3),
      it.slice(0, 4).map(function (q, i) {
        return h("div", { key: i, style: abs(spots[i][0], spots[i][1], { display: "flex", gap: 20 }) },
          h("span", { style: { position: "relative", width: 48, height: 32, flex: "none", display: "flex", alignItems: "center", justifyContent: "center" } },
            q.focus ? h("span", { style: { position: "absolute", width: 48, height: 48, top: -8, left: 0, borderRadius: 999, border: "1.5px solid " + C("pink-400"), boxSizing: "border-box" } }) : null,
            h("span", { style: { width: q.focus ? 28 : 20, height: q.focus ? 28 : 20, borderRadius: 999, background: q.focus ? C("pink-400") : C("taupe-950") } })),
          h("div", { style: { display: "flex", flexDirection: "column", gap: 8, width: 520 } },
            h("span", { className: "ui-heading", style: { color: q.focus ? C("pink-600") : C("taupe-950") } }, q.title),
            h("span", { className: "ui-body", style: { color: C("taupe-700") } }, q.text)));
      }));
  }

  /* ---------- LayerStack ---------- */
  var LAYERS = [{ title: "Your agent", source: "From agent.yml and your skills", sections: [[1, "Persona and rules"], [2, "Skills in this agent"], [3, "Voice or text rules"], [4, "Tool-call acknowledgement", true]] },
    { title: "Built into Rasa", source: "The same for every agent", sections: [[5, "Lifecycle tools"], [6, "Out-of-scope handling", true]] },
    { title: "This turn", source: "Live from the conversation", lines: [[[7, "Date and time"], [8, "Project memory", true]], [{ n: 9, oneOf: ["Active skill", "Knowledge answer", "Skill catalog"] }], [[10, "Pending confirmation", true]]] }];
  var POINTS = [["Same order, every turn", "Read exactly what the model was sent."], ["Only what applies", "Dashed sections appear only when needed."], ["Stable text first", "Sections 1 to 6 rarely change, so the provider’s prompt cache stays warm."]];
  function Section(s) {
    if (s.oneOf) return h("span", { style: { display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 4px 4px 8px", borderRadius: 10, background: C("pink-50"), border: "1.5px solid " + C("pink-400") } },
      h("span", { className: "ui-micro", style: { color: C("taupe-500") } }, s.n),
      s.oneOf.map(function (o, i) { return [i ? h("span", { key: "o" + i, className: "ui-code", style: { color: C("pink-600") } }, "or") : null, h("span", { key: i, className: "ui-meta", style: { padding: "6px 10px", borderRadius: 6, background: C("taupe-50"), border: "1px solid " + C("taupe-300"), color: C("taupe-950") } }, o)]; }));
    var cond = s[2];
    return h("span", { style: { display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 12px 6px 10px", borderRadius: 8, background: cond ? C("taupe-100") : C("taupe-50"), border: "1px " + (cond ? "dashed " + C("taupe-400") : "solid " + C("taupe-300")) } },
      h("span", { className: "ui-micro", style: { color: C("taupe-500") } }, s[0]), h("span", { className: "ui-meta", style: { color: cond ? C("taupe-700") : C("taupe-950") } }, s[1]));
  }
  function LayerStack(p) {
    var layers = p.layers || LAYERS, points = p.points || POINTS;
    return h("div", { style: { display: "flex", alignItems: "center", gap: 40 } },
      h("div", { style: { width: 960, borderRadius: 16, overflow: "hidden", background: C("taupe-50"), border: "1px solid " + C("taupe-300") } },
        h("div", { style: { height: 48, padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid " + C("taupe-300") } },
          h("span", { className: "ui-title", style: { color: C("taupe-950") } }, p.title || "System prompt"), h("span", { className: "ui-meta", style: { color: C("taupe-700") } }, p.caption || "Top to bottom, in this order")),
        layers.map(function (L, i) {
          var lines = L.lines || [L.sections];
          return h("div", { key: i, style: { display: "flex", alignItems: "center", gap: 24, padding: "16px 24px", borderBottom: i < layers.length - 1 ? "1px solid " + C("taupe-250") : "none" } },
            h("div", { style: { width: 200, flex: "none", display: "flex", flexDirection: "column", gap: 4 } }, h("span", { className: "ui-title", style: { color: C("taupe-950") } }, L.title), h("span", { className: "ui-meta", style: { color: C("taupe-700") } }, L.source)),
            h("div", { style: { display: "flex", flexDirection: "column", gap: 8, flex: 1 } }, lines.map(function (ln, j) { return h("div", { key: j, style: { display: "flex", flexWrap: "wrap", gap: 8 } }, ln.map(function (s, k) { return h(Section, Object.assign({ key: k }, Array.isArray(s) ? { 0: s[0], 1: s[1], 2: s[2] } : s)); })); })));
        })),
      h("div", { style: { width: 400, display: "flex", flexDirection: "column" } }, points.map(function (pt, i) {
        return h("div", { key: i, style: { padding: "18px 0", borderTop: i ? "1px solid " + C("taupe-300") : "none", display: "flex", flexDirection: "column", gap: 6 } },
          h("span", { className: "ui-title", style: { color: C("taupe-950") } }, pt[0]), h("span", { className: "ui-meta", style: { color: C("taupe-700") } }, pt[1]));
      })));
  }

  Object.assign(NS, { RasaMark: RasaMark, FlowStation: FlowStation, Flow: Flow, Callout: Callout, Hub: Hub, TeamLoop: TeamLoop, TeamLoops: TeamLoops, Venn: Venn, VennOrbit: VennOrbit, Quadrant: Quadrant, LayerStack: LayerStack });
})();
/* ---- batch: data ---- */
(function () {
  var React = window.React, h = React.createElement, NS = window.RasaNewBrand || (window.RasaNewBrand = {});
  function C(n) { return "var(--" + n + ")"; }
  var abs = function (x, y, extra) { return Object.assign({ position: "absolute", left: x, top: y }, extra || {}); };
  var sans = "var(--font-sans)", mono = "var(--font-mono)";
  var ST = { label: { fontFamily: sans, fontWeight: 500, fontSize: 14, lineHeight: "20px" }, body: { fontFamily: sans, fontWeight: 300, fontSize: 14, lineHeight: "20px" }, tag: { fontFamily: sans, fontWeight: 500, fontSize: 12, lineHeight: "16px" }, mono: { fontFamily: mono, fontWeight: 400, fontSize: 14, lineHeight: "22px" }, stat: { fontFamily: sans, fontWeight: 500, fontSize: 44, lineHeight: "48px", letterSpacing: "-0.01em" } };
  function sx(a, b) { return Object.assign({}, a, b); }

  /* ---------- Ramp chart: track + bars ---------- */
  var LEVERS = [["Instructions", "skill.md", "Plain language. The model runs the conversation."], ["Branches", "if:", "Run only the branch that applies reaches the model."], ["Tool gates", "requires:", "A tool stays hidden until its facts are set."], ["Confirmation", "requires_confirmation:", "Risky actions wait for the customer’s yes."], ["Exact wording", "responses.yml", "The words you approved, sent word for word."], ["Ordered steps", "::: ordered_block", "A fixed sequence. Fixed steps skip the model."]];
  var STEPS = ["pink-50", "pink-100", "pink-200", "pink-300", "pink-400", "pink-500"];
  function rampCols(levers, cw, gap, withNum) {
    return h("div", { style: { display: "flex", gap: gap } }, levers.map(function (l, i) {
      return h("div", { key: i, style: { width: cw, display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" } },
        withNum ? h("span", { className: "ui-code", style: { color: C("pink-600") } }, String(i + 1).padStart(2, "0")) : null,
        h("span", { className: "ui-heading", style: { color: C("taupe-950") } }, l[0]),
        h("span", { className: "ui-code", style: { padding: "4px 10px", borderRadius: 6, background: C("taupe-100"), border: "1px solid " + C("taupe-300"), color: C("taupe-950") } }, l[1]),
        h("span", { className: "ui-body", style: { color: C("taupe-700") } }, l[2]));
    }));
  }
  function ends(p) { return h("div", { style: { display: "flex", justifyContent: "space-between" } }, h("span", { className: "ui-title", style: { color: C("taupe-700") } }, p.low || "The model decides"), h("span", { className: "ui-title", style: { color: C("pink-600") } }, p.high || "Rasa enforces")); }
  function RampTrack(p) {
    var lv = p.levers || LEVERS, W = p.width || 1696, gap = 32, n = lv.length, cw = (W - gap * (n - 1)) / n;
    return h("div", { style: { width: W, display: "flex", flexDirection: "column", gap: 20 } }, ends(p),
      h("div", { style: { position: "relative", height: 22, marginBottom: 10 } },
        lv.map(function (_, i) { var last = i === n - 1; return h("div", { key: "s" + i, style: abs(i * (cw + gap), 4, { width: cw + (last ? 0 : gap), height: 14, background: C(STEPS[Math.min(i, 5)]), borderRadius: i === 0 ? "7px 0 0 7px" : last ? "0 7px 7px 0" : 0 }) }); }),
        lv.map(function (_, i) { var last = i === n - 1; return h("span", { key: "d" + i, style: abs(i * (cw + gap), 0, { width: 22, height: 22, boxSizing: "border-box", borderRadius: 999, background: last ? C("pink-600") : C("taupe-50"), border: "2px solid " + (last ? C("pink-600") : C("pink-400")) }) }); })),
      rampCols(lv, cw, gap, true));
  }
  function RampBars(p) {
    var lv = p.levers || LEVERS, W = p.width || 1696, gap = 32, n = lv.length, cw = (W - gap * (n - 1)) / n;
    return h("div", { style: { width: W, display: "flex", flexDirection: "column", gap: 24 } }, ends(p),
      h("div", { style: { display: "flex", gap: gap, alignItems: "flex-end", borderBottom: "1px solid " + C("taupe-300") } }, lv.map(function (_, i) {
        return h("div", { key: i, style: { width: cw, height: 56 + i * 28, borderRadius: "12px 12px 0 0", background: C(STEPS[Math.min(i, 5)]), padding: "14px 16px", boxSizing: "border-box" } }, h("span", { className: "ui-code", style: { color: i >= 4 ? C("taupe-50") : C("pink-700") } }, String(i + 1).padStart(2, "0")));
      })), rampCols(lv, cw, gap, false));
  }

  /* ---------- Trace ---------- */
  var CATS = [["Your speech providers", "periwinkle-200", "taupe-500"], ["Rasa and the model", "pink-400", "pink-700"], ["Call and recording", "taupe-300", "taupe-500"]];
  var SPANS = [["voice call", 0, 0, 4.8, 2], ["connect asr", 1, 0.04, 0.1, 0], ["transcribe audio", 1, 0.3, 0.8, 0], ["handle turn", 1, 1.15, 2.5, 1], ["synthesize speech", 2, 2.9, 0.6, 0], ["play audio", 2, 3.2, 0.9, 0], ["handle barge-in", 1, 3.8, 0.2, 1], ["store call recording", 1, 4.25, 0.4, 2]];
  function Trace(p) {
    var spans = p.spans || SPANS, secs = p.seconds || 5, W = 1696, nameW = 300, tw = 1200, px = tw / secs, rh = 44, top = 76, gh = spans.length * rh + 8;
    return h("div", { style: { position: "relative", width: W, height: top + spans.length * rh + 64 } },
      h("div", { style: abs(0, 0, { display: "flex", alignItems: "center", gap: 48 }) },
        h("span", { className: "eyebrow", style: { textTransform: "uppercase", color: C("taupe-700") } }, p.title || "What lands there: one call, span by span"),
        h("div", { style: { display: "flex", gap: 24 } }, CATS.map(function (c, i) { return h("span", { key: i, style: { display: "inline-flex", alignItems: "center", gap: 8 } }, h("span", { style: { width: 12, height: 12, borderRadius: 3, background: C(c[1]) } }), h("span", { className: "ui-meta", style: { color: C("taupe-700") } }, c[0])); }))),
      Array.from({ length: secs + 1 }).map(function (_, s) { var x = nameW + s * px; return [
        h("div", { key: "g" + s, style: abs(x, top - 12, { width: 1, height: gh + 4, background: C("taupe-300") }) }),
        h("span", { key: "t" + s, className: "ui-code", style: abs(x, 44, { transform: s ? "translateX(-50%)" : "none", color: C("taupe-500") }) }, s + "s")]; }),
      spans.map(function (r, i) { var y = top + i * rh, c = CATS[r[4]], bw = Math.max(14, r[3] * px), bx = nameW + r[2] * px; return [
        h("span", { key: "n" + i, className: "ui-code", style: abs(r[1] * 24, y + rh / 2, { transform: "translateY(-50%)", color: r[1] === 2 ? C("taupe-700") : C("taupe-950") }) }, r[0]),
        h("span", { key: "b" + i, style: abs(bx, y + rh / 2 - 8, { width: bw, height: 16, borderRadius: 4, background: C(c[1]) }) }),
        h("span", { key: "d" + i, className: "ui-code", style: abs(bx + bw + 10, y + rh / 2, { transform: "translateY(-50%)", color: C(c[2]) }) }, r[3] + "s")]; }),
      h("div", { className: "ui-code", style: abs(0, top + spans.length * rh + 24, { display: "flex", gap: 12, whiteSpace: "pre" }) },
        (p.footer || [["tracing:", "taupe-950"], ["langfuse", "pink-700"], ["·", "taupe-500"], ["otlp", "pink-700"], ["·", "taupe-500"], ["jaeger", "pink-700"], ["  in integrations.yml. List two and it exports to both.", "taupe-700"]]).map(function (f, i) { return h("span", { key: i, style: { color: C(f[1]) } }, f[0]); })));
  }

  /* ---------- KPI tile + Dashboard ---------- */
  function KpiTile(p) {
    var d = p.delta, down = d && /^[−-]/.test(d);
    return h("div", { style: { flex: p.width ? "none" : 1, width: p.width, padding: 20, borderRadius: 12, background: C("taupe-50"), border: "1px solid " + C("taupe-300"), display: "flex", flexDirection: "column", gap: 8 } },
      h("span", { className: "ui-meta", style: { color: C("taupe-700") } }, p.label || "Sessions"),
      h("span", { className: "ui-number", style: { color: C("taupe-950") } }, p.value || "12,847"),
      d ? h("span", { className: "ui-meta", style: { color: down ? C("coral-700") : C("seafoam-700") } }, d) : null);
  }
  function smooth(ys, w) { var xs = ys.map(function (_, i) { return i * w / (ys.length - 1); }), d = "M0 " + ys[0]; for (var i = 1; i < ys.length; i++) { var cx = (xs[i - 1] + xs[i]) / 2; d += " C" + cx + " " + ys[i - 1] + " " + cx + " " + ys[i] + " " + xs[i] + " " + ys[i]; } return d; }
  function btn(t) { return h("span", { className: "ui-meta", style: { padding: "8px 14px", borderRadius: 6, background: C("taupe-50"), border: "1px solid " + C("taupe-300"), color: C("taupe-950") } }, t); }
  function legend(items) { return items.map(function (it, i) { return h("span", { key: i, style: { display: "inline-flex", alignItems: "center", gap: 6 } }, h("span", { style: { width: 8, height: 8, borderRadius: 999, background: C(it[1]) } }), h("span", { className: "ui-meta", style: { color: C("taupe-700") } }, it[0])); }); }
  function Dashboard(p) {
    var kpis = p.kpis || [["Sessions", "12,847", "+5% since last month"], ["Containment rate", "86.5%"], ["Avg. latency", "430 ms"], ["CSAT score", "80%"]];
    var donut = p.donut || [["Satisfied", 80, "seafoam-700"], ["No response", 12, "taupe-250"], ["Dissatisfied", 8, "coral-700"]];
    var cw = 860, ch = 200, ring = 130, r = ring / 2, ir = r * 0.68, acc = 0;
    var arcs = donut.map(function (d) { var a0 = acc / 100 * 2 * Math.PI - Math.PI / 2; acc += d[1]; var a1 = acc / 100 * 2 * Math.PI - Math.PI / 2, lg = d[1] > 50 ? 1 : 0;
      var P = function (rad, a) { return [r + rad * Math.cos(a), r + rad * Math.sin(a)]; }, o0 = P(r, a0), o1 = P(r, a1), i1 = P(ir, a1), i0 = P(ir, a0);
      return h("path", { key: d[0], d: "M" + o0 + " A" + r + " " + r + " 0 " + lg + " 1 " + o1 + " L" + i1 + " A" + ir + " " + ir + " 0 " + lg + " 0 " + i0 + " Z", fill: C(d[2]) }); });
    var good = [40, 34, 40, 22, 30, 38, 30, 36, 44], bad = [120, 118, 122, 114, 116, 122, 118, 120, 116];
    return h("div", { style: { width: p.width || 1400, padding: 20, boxSizing: "border-box", borderRadius: 16, background: C("taupe-50"), border: "1px solid " + C("taupe-300"), display: "flex", flexDirection: "column", gap: 12 } },
      h("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, h("span", { className: "ui-meta", style: { color: C("taupe-700") } }, p.path || "customer-support / Analytics"), h("span", { className: "ui-meta", style: { padding: "4px 10px", borderRadius: 6, border: "1px solid " + C("taupe-300"), color: C("taupe-950") } }, p.env || "Production")),
      h("div", { style: { display: "flex", justifyContent: "space-between" } }, h("div", { style: { display: "flex", gap: 8 } }, btn("Last 30 days"), btn("All versions")), btn("Export data")),
      h("div", { style: { display: "flex", gap: 12 } }, kpis.map(function (k, i) { return h(KpiTile, { key: i, label: k[0], value: k[1], delta: k[2] }); })),
      h("div", { style: { display: "flex", gap: 12 } },
        h("div", { style: { flex: 1, padding: 16, borderRadius: 12, border: "1px solid " + C("taupe-300"), display: "flex", flexDirection: "column", gap: 16 } },
          h("div", { style: { display: "flex", justifyContent: "space-between" } }, h("span", { className: "ui-title", style: { color: C("taupe-950") } }, "Session outcomes"), h("div", { style: { display: "flex", gap: 16 } }, legend([["Successful", "seafoam-700"], ["Unsuccessful", "coral-700"]]))),
          h("svg", { viewBox: "0 0 " + cw + " " + ch, width: "100%", height: ch, preserveAspectRatio: "none" },
            h("path", { d: smooth(good, cw) + " L" + cw + " " + ch + " L0 " + ch + " Z", fill: C("seafoam-100") }), h("path", { d: smooth(good, cw), fill: "none", stroke: C("seafoam-700"), strokeWidth: 2, vectorEffect: "non-scaling-stroke" }),
            h("path", { d: smooth(bad, cw) + " L" + cw + " " + ch + " L0 " + ch + " Z", fill: C("coral-100") }), h("path", { d: smooth(bad, cw), fill: "none", stroke: C("coral-700"), strokeWidth: 2, vectorEffect: "non-scaling-stroke" }),
            h("line", { x1: 0, y1: ch - 0.5, x2: cw, y2: ch - 0.5, stroke: C("taupe-300"), vectorEffect: "non-scaling-stroke" }))),
        h("div", { style: { width: 300, padding: 16, borderRadius: 12, border: "1px solid " + C("taupe-300"), display: "flex", flexDirection: "column", gap: 12 } },
          h("span", { className: "ui-title", style: { color: C("taupe-950") } }, "CSAT breakdown"),
          h("div", { style: { display: "flex", justifyContent: "center" } }, h("svg", { width: ring, height: ring }, arcs)),
          donut.map(function (d, i) { return h("div", { key: i, style: { display: "flex", justifyContent: "space-between" } }, legend([[d[0], d[2]]]), h("span", { className: "ui-meta", style: { color: C("taupe-950") } }, d[1] + "%")); }))));
  }

  /* ---------- Numeral stat ---------- */
  var NS3 = { 3: [560, 380, 300, 260, 1.43, "body-lg"], 4: [410, 360, 210, 180, 1.15, "body"], 5: [320, 340, 240, 240, 1, "body"] };
  function hl(text, word) { if (!word || text.indexOf(word) < 0) return text; var parts = text.split(word), out = []; parts.forEach(function (pt, i) { out.push(pt); if (i < parts.length - 1) out.push(h("span", { key: i, style: { color: C("pink-400") } }, word)); }); return out; }
  function NumeralStat(p) {
    var per = [3, 4, 5].indexOf(p.perRow) >= 0 ? p.perRow : 3, s = NS3[per], show = per === 5 ? false : p.numeral !== false, W = s[0], H = s[1], fs = Math.round(H * s[4]);
    return h("div", { style: { position: "relative", width: W, height: H, flex: "none", boxSizing: "border-box", padding: 40, borderRadius: 32, background: C("taupe-200"), overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between" } },
      show ? h("span", { className: "big-number", "aria-hidden": true, style: { position: "absolute", right: -0.215 * fs, top: -0.152 * fs, fontSize: fs, lineHeight: 1, color: C("taupe-300"), whiteSpace: "nowrap" } }, p.numeral || "8") : null,
      h("span", { className: s[5], style: { position: "relative", width: show ? s[2] : W - 80, color: C("taupe-950") } }, hl(p.claim || "8 years is the longest continuously running Rasa agent in production", p.highlight === undefined ? "Rasa" : p.highlight)),
      h("span", { className: "body", style: { position: "relative", width: show ? s[3] : W - 80, color: C("taupe-700") } }, p.detail || "Technology designed to stay in service."));
  }
  var NS_ITEMS = [{ numeral: "2", claim: "2 out of 3 top US banks run agents on Rasa", detail: "Chosen for systems under constant security scrutiny." }, { numeral: "5", claim: "5 national governments run citizen services on Rasa", detail: "Helping governments serve the people who rely on them." }, { numeral: "8", claim: "8 years is the longest continuously running Rasa agent in production", detail: "Technology designed to stay in service." }];
  function NumeralStats(p) {
    var items = p.items || NS_ITEMS, per = Math.min(5, Math.max(3, items.length));
    return h("div", { style: { display: "flex", gap: 40 } }, items.slice(0, 5).map(function (it, i) { return h(NumeralStat, Object.assign({ key: i, perRow: per, numeral: p.numeral === false ? false : it.numeral }, it, p.numeral === false ? { numeral: false } : {})); }));
  }

  /* ---------- Compare stat + Dot grid ---------- */
  function CompareStat(p) {
    var card = function (s, after) { return h("div", { style: { width: 360, padding: 20, boxSizing: "border-box", borderRadius: 12, background: after ? C("seafoam-50") : C("taupe-100"), border: "1px solid " + (after ? C("seafoam-200") : C("taupe-250")), display: "flex", flexDirection: "column", gap: 8 } },
      h("span", { style: sx(ST.mono, { color: after ? C("seafoam-700") : C("taupe-700") }) }, s[0]), h("span", { style: sx(ST.stat, { color: after ? C("seafoam-700") : C("taupe-950") }) }, s[1]), h("span", { style: sx(ST.body, { color: C("taupe-700") }) }, s[2])); };
    return h("div", { style: { display: "flex", gap: 16 } }, card(p.before || ["main · V1.3", "71%", "resolved · 355 of 500"], false), card(p.after || ["fix-address-check", "98.4%", "resolved · 492 of 500"], true));
  }
  function DotGrid(p) {
    var cols = p.cols || 26, rows = p.rows || 9, n = cols * rows, rate = p.passRate == null ? 0.96 : p.passRate, fails = Math.round(n * (1 - rate)), set = {};
    for (var k = 0; k < fails; k++) { var i = Math.floor(((k + 0.5) / fails) * n + ((k * 7919) % 11) - 5); set[Math.max(0, Math.min(n - 1, i))] = 1; }
    return h("div", { style: { display: "grid", gridTemplateColumns: "repeat(" + cols + ", 16px)", gap: 6 } }, Array.from({ length: n }).map(function (_, i) { return h("span", { key: i, style: { width: 16, height: 16, borderRadius: 999, background: set[i] ? C("coral-200") : C("seafoam-300") } }); }));
  }

  Object.assign(NS, { RampTrack: RampTrack, RampBars: RampBars, Trace: Trace, KpiTile: KpiTile, Dashboard: Dashboard, NumeralStat: NumeralStat, NumeralStats: NumeralStats, CompareStat: CompareStat, DotGrid: DotGrid });
})();
/* ---- batch: code ---- */
(function () {
  var React = window.React, h = React.createElement, NS = window.RasaNewBrand;
  function C(n) { return "var(--" + n + ")"; }
  var abs = function (x, y, extra) { return Object.assign({ position: "absolute", left: x, top: y }, extra || {}); };
  var monoS = { fontFamily: "var(--font-mono)", fontSize: 14, lineHeight: "22px", fontWeight: 400 };
  var SKILL = ["---", "name: Rebook Flight", "precondition: customer_authenticated", "tool_constraints:", "  - change_booking:", "      requires: \"session.rebook_flight.selected_booking_id\"", "---", "Help the customer move their flight to a new date."];
  function codeLine(t, i, hl, added) {
    var m = /^(\s*-?\s*)([A-Za-z_][\w.]*)(:)(.*)$/.exec(t);
    var body = t === "---" ? h("span", { style: { color: C("taupe-500") } }, t) : m ? [m[1], h("span", { key: "k", style: { color: C("taupe-400") } }, m[2] + m[3]), h("span", { key: "v", style: { color: C("taupe-100") } }, m[4])] : t;
    return h("div", { key: i, style: { height: 26, lineHeight: "26px", whiteSpace: "pre", margin: "0 -12px", padding: "0 12px", borderRadius: 4, background: hl ? "color-mix(in srgb, var(--pink-400) 28%, transparent)" : added ? C("taupe-800") : "transparent" } }, body);
  }
  function codeBody(lines, marks, base) { return h("div", { style: { fontFamily: "var(--font-mono)", fontSize: 16 } }, lines.map(function (t, i) { return codeLine(t, i, marks && marks.indexOf(i) >= 0, base ? base.indexOf(t) < 0 : false); })); }

  /* ---------- CodeBeforeAfter ---------- */
  function CodeBeforeAfter(p) {
    var side = function (lab, pink, cap, lines, base) { return h("div", { style: { display: "flex", flexDirection: "column", gap: 16 } },
      h("span", { style: { display: "flex", alignItems: "center", gap: 10 } }, h("span", { style: { width: 10, height: 10, borderRadius: 999, background: pink ? C("pink-400") : C("taupe-400") } }), h("span", { className: "eyebrow", style: { textTransform: "uppercase", color: C("taupe-700") } }, lab)),
      h(NS.CodeWindow, { width: cw, title: p.title || "skills/rebook_flight/skill.md" }, codeBody(lines, null, base)),
      h("span", { className: "ui-body", style: { color: C("taupe-700"), width: cw } }, cap)); };
    var bef = p.before || ["---", "name: Rebook Flight", "---", "Help the customer move their flight to a new date."], all = bef.concat(p.after || SKILL), cw = p.width || Math.max(560, Math.ceil(Math.max.apply(null, all.map(function (t) { return t.length; })) * 9.7 + 56));
    return h("div", { style: { display: "flex", alignItems: "center", gap: 32 } },
      side("Before", false, p.beforeCaption || "Instructions only. The model decides, and can change a booking for someone it never checked.", bef),
      h("span", { style: { width: 56, height: 56, borderRadius: 999, background: C("taupe-950"), color: C("taupe-100"), display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }, className: "ui-title" }, "→"),
      side("After", true, p.afterCaption || "The same skill with two rules. Rasa checks the customer first and keeps change_booking out of reach until a booking is picked.", p.after || SKILL, bef));
  }

  /* ---------- CodeAnnotated ---------- */
  function CodeAnnotated(p) {
    var lines = p.lines || SKILL, notes = p.notes || [{ line: 2, title: "Starts on your terms", detail: "The skill runs only once this is true." }, { line: 5, title: "Tools stay gated", detail: "Hidden until a booking is chosen." }], w = p.width || 740, top = 18 + 20 + 14;
    return h("div", { style: { position: "relative", width: w + 4 + 8 + 56 + 260, minHeight: top + lines.length * 26 + 24 } },
      h(NS.CodeWindow, { width: w, title: p.title || "skills/rebook_flight/skill.md" }, codeBody(lines, notes.map(function (n) { return n.line; }))),
      notes.map(function (n, i) { return h("div", { key: i, style: abs(w - 4, top + n.line * 26 + 13, { transform: "translateY(-50%)" }) }, h(NS.Callout, { title: n.title, detail: n.detail })); }));
  }

  /* ---------- CodeDiff (light) ---------- */
  var DIFF = [["f", "replace-a-card/skill.md"], [" ", ""], ["m", "---"], [" ", "name: replace-a-card"], [" ", "tools: card-services-api"], [" ", "references: loyalty-tiers.pdf"], ["m", "---"], [" ", ""], [" ", "# Replace a card"], [" ", "Check the customer’s tier first."], [" ", "Freeze the card."], ["+", "Confirm the delivery address with the customer."], ["+", "If it changed: card-services-api.update_address()"], [" ", ""], [" ", "## If the customer is Gold"], [" ", "- Offer an upgrade to Platinum with free next-day delivery"], [" ", "Otherwise, order a replacement."]];
  function CodeDiff(p) {
    var rows = p.lines || DIFF;
    return h("div", { style: { width: p.width || 640, padding: "20px 0", boxSizing: "border-box", borderRadius: 12, background: C("taupe-100"), border: "1px solid " + C("taupe-250") } }, rows.map(function (r, i) {
      var k = r[0], add = k === "+", del = k === "-", dim = k === "f" || k === "m";
      return h("div", { key: i, style: Object.assign({ display: "flex", gap: 8, padding: "1px 24px 1px 12px", background: add ? C("seafoam-50") : del ? C("coral-50") : "transparent", whiteSpace: "pre" }, monoS, k === "f" ? { paddingBottom: 8 } : {}) },
        h("span", { style: { width: 12, textAlign: "center", color: add ? C("seafoam-700") : C("coral-700") } }, add ? "+" : del ? "−" : " "),
        h("span", { style: { color: add ? C("seafoam-700") : del ? C("coral-700") : dim ? C("taupe-500") : C("taupe-950") } }, r[1] || " "));
    }));
  }

  /* ---------- FileTree ---------- */
  function TreeRow(p) {
    var hl = p.highlight, folder = p.kind === "folder";
    return h("div", { style: { display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", paddingLeft: 16 + (p.depth || 0) * 28, borderRadius: 10, background: hl ? C("pink-50") : "transparent", border: "1px solid " + (hl ? C("pink-300") : "transparent") } },
      h("span", { style: { width: folder ? 20 : 16, height: folder ? 16 : 20, borderRadius: folder ? 3 : 2, flex: "none", background: hl ? C("pink-400") : folder ? C("taupe-700") : C("taupe-400") } }),
      h("span", { className: "ui-code", style: { color: hl ? C("pink-700") : C("taupe-950") } }, p.name),
      h("span", { className: "ui-meta", style: { marginLeft: "auto", color: C("taupe-500") } }, p.note || ""));
  }
  var TREE = [{ kind: "folder", name: "my-agent/", depth: 0 }, { kind: "folder", name: "skills/", depth: 1 }, { kind: "folder", name: "rebook_flight/", depth: 2 }, { name: "skill.md", depth: 3, note: "rules", highlight: true }, { name: "tools.py", depth: 3, note: "tool" }, { kind: "folder", name: "references/", depth: 1, note: "knowledge" }, { name: "config.yml", depth: 1, note: "models" }];
  function FileTree(p) { return h("div", { style: { width: p.width || 600, padding: 24, boxSizing: "border-box", borderRadius: 16, background: C("taupe-50"), border: "1px solid " + C("taupe-300"), display: "flex", flexDirection: "column", gap: 6 } }, (p.rows || TREE).map(function (r, i) { return h(TreeRow, Object.assign({ key: i }, r)); })); }

  /* ---------- RuleList ---------- */
  function RuleRow(p) {
    return h("div", { style: { display: "flex", gap: 32, alignItems: "flex-start", padding: "24px 0", borderTop: "1px solid " + C("taupe-300") } },
      h("span", { className: "ui-number", style: { color: C("pink-400"), width: 40, flex: "none" } }, p.number),
      h("div", { style: { flex: 1, display: "flex", flexDirection: "column", gap: 6 } }, h("span", { className: "ui-title", style: { color: C("taupe-950") } }, p.rule), p.detail ? h("span", { className: "ui-body", style: { color: C("taupe-700") } }, p.detail) : null),
      p.tag ? h("span", { className: "ui-code", style: { padding: "6px 12px", borderRadius: 999, background: C("pink-50"), border: "1px solid " + C("pink-200"), color: C("pink-700"), whiteSpace: "nowrap" } }, p.tag) : null);
  }
  var RULES = [["01", "Default to small, focused skills.", "One job per skill keeps routing accurate.", "rule: one_job"], ["02", "Compose when the conversation must carry on.", "Hand off between skills instead of growing one.", "handoff: next_skill"], ["03", "Gate, don’t ask, when order matters.", "Ordered steps run in sequence, none skipped.", "ordered: true"], ["04", "Don’t build on empty parents.", "A skill with no steps has nothing to enforce."]];
  function RuleList(p) { return h("div", { style: { width: p.width || 1200 } }, (p.rules || RULES).map(function (r, i) { return h(RuleRow, { key: i, number: r[0], rule: r[1], detail: r[2], tag: r[3] }); })); }

  /* ---------- Skill stack ---------- */
  var BLK = { active: ["pink-400", null, "taupe-50", "pink-50", "Active"], waiting: ["taupe-50", "solid taupe-400", "taupe-950", "taupe-700", "Waiting for its sub-skill"], paused: ["taupe-100", "dashed taupe-500", "taupe-700", "taupe-500", "Paused at step 2"], done: ["taupe-100", "dashed pink-300", "pink-300", "pink-300", "Done"] };
  function StackBlock(p) { var s = BLK[p.state] || BLK.active, b = s[1] ? s[1].split(" ") : null;
    return h("div", { style: { padding: "12px 16px", borderRadius: 10, background: C(s[0]), border: b ? "1.5px " + b[0] + " " + C(b[1]) : "1.5px solid transparent", display: "flex", flexDirection: "column", gap: 2 } },
      h("span", { className: "ui-code", style: { color: C(s[2]) } }, p.name || "rebook_flight"), h("span", { className: "ui-meta", style: { color: C(s[3]) } }, p.status || s[4])); }
  var STACK = [["01 · Customer", "My flight was canceled. Can you rebook me?", null, [["rebook_flight", "active"]], "rebook_flight starts."], ["02 · Agent", "Sure. First, what’s your booking reference?", "pushed on", [["verify_booking", "active"], ["rebook_flight", "waiting"]], "The skill calls a sub-skill. It lands on top."], ["03 · Agent", "Found it. Let’s find you a new flight.", "taken off", [["verify_booking", "done"], ["rebook_flight", "active"]], "Sub-skill done. rebook_flight carries on by itself."], ["04 · Customer", "Wait, how much is an extra bag?", "pushed on", [["baggage_fees", "active"], ["rebook_flight", "paused"]], "Customer changes topic. The task is paused."], ["05 · Agent", "Here are the bag fees. Shall we finish your rebooking?", "taken off", [["baggage_fees", "done"], ["rebook_flight", "paused"]], "Fees answered. Rasa offers to resume."], ["06 · Customer", "Yes, please.", "resumed", [["rebook_flight", "active"]], "Back on top, at the same step."]];
  function SkillStack(p) {
    var steps = p.steps || STACK;
    return h("div", { style: { display: "flex", gap: 32 } }, steps.map(function (s, i) { var cust = /customer/i.test(s[0]), ic = s[2] === "taken off" ? "↑ " : s[2] === "pushed on" ? "↓ " : "✓ ";
      return h("div", { key: i, style: { width: 256, display: "flex", flexDirection: "column", gap: 16 } },
        h("span", { className: "eyebrow", style: { textTransform: "uppercase", color: C("taupe-700") } }, s[0]),
        h("div", { style: { minHeight: 96 } }, h(NS.ChatBubble, { tone: cust ? "soft" : "light", tail: "top-left" }, s[1])),
        h("div", { style: { height: 200, padding: "12px 16px", boxSizing: "border-box", borderBottom: "2px solid " + C("taupe-700"), display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 8 } },
          s[2] ? h("span", { className: "ui-code", style: { alignSelf: "flex-start", padding: "4px 10px", borderRadius: 999, background: C("pink-50"), color: C("pink-700") } }, ic + s[2]) : null,
          s[3].map(function (b, j) { return h(StackBlock, { key: j, name: b[0], state: b[1] }); })),
        h("span", { className: "ui-body", style: { color: C("taupe-700") } }, s[4])); }));
  }

  /* ---------- Chat thread ---------- */
  function ThreadEvent(p) { var pink = p.focus !== false;
    return h("div", { style: { display: "flex", alignItems: "center", gap: 12 } }, h("span", { style: { flex: 1, height: 1, background: C("taupe-300") } }),
      h("span", { className: "ui-code", style: { padding: "4px 10px", borderRadius: 999, background: pink ? C("pink-50") : C("taupe-200"), color: pink ? C("pink-700") : C("taupe-700") } }, p.children || "rebook_flight starts"), h("span", { style: { flex: 1, height: 1, background: C("taupe-300") } })); }
  var THREAD = [["u", "I need to move my flight to Friday."], ["e", "rebook_flight starts", true], ["a", "Sure. Which booking should I change?"], ["u", "Actually, how much luggage can I bring?"], ["e", "luggage_info · rebook_flight paused"], ["a", "One cabin bag up to 8 kg. Back to your booking?"], ["e", "rebook_flight resumes"]];
  function ChatThread(p) { return h("div", { style: { width: p.width || 640, padding: 32, boxSizing: "border-box", borderRadius: 16, background: C("taupe-100"), border: "1px solid " + C("taupe-300"), display: "flex", flexDirection: "column", gap: 24 } },
    (p.turns || THREAD).map(function (t, i) { return t[0] === "e" ? h(ThreadEvent, { key: i, focus: !!t[2] }, t[1]) : h(NS.ChatBubble, { key: i, tone: t[0] === "u" ? "soft" : "light", tail: t[0] === "u" ? "bottom-right" : "bottom-left" }, t[1]); })); }

  /* ---------- Terminal steps ---------- */
  function TerminalStep(p) { return h("div", { style: { display: "flex", gap: 24, width: 720, alignItems: "flex-start" } },
    h("span", { className: "ui-code", style: { width: 280, flex: "none", boxSizing: "border-box", padding: "12px 16px", borderRadius: 10, background: C("taupe-950"), color: C("taupe-100") } }, h("span", { style: { color: C("pink-400") } }, "$ "), p.command),
    h("div", { style: { display: "flex", flexDirection: "column", gap: 4, paddingTop: 4 } }, h("span", { className: "ui-title", style: { color: C("taupe-950") } }, p.title), h("span", { className: "ui-meta", style: { color: C("taupe-700") } }, p.detail))); }
  var TERM = [["rasa init", "Create a project", "Plain files, one folder per skill."], ["rasa train", "Validate the agent", "Catches broken rules before you ship."], ["rasa inspect", "Talk to it locally", "See every step of every turn."], ["rasa deploy", "Ship it", "To your cloud or your data centre."]];
  function TerminalSteps(p) { return h("div", { style: { display: "flex", flexDirection: "column", gap: 20 } }, (p.steps || TERM).map(function (s, i) { return h(TerminalStep, { key: i, command: s[0], title: s[1], detail: s[2] }); })); }

  /* ---------- Voice call ---------- */
  function VoiceCall(p) {
    var dark = p.theme === "dark", W = 1400, H = 460, x0 = 140, ink = dark ? "taupe-100" : "taupe-950";
    var lanes = [{ y: 182, col: dark ? "taupe-400" : "taupe-400", segs: [[60, 200], [460, 600], [900, 1000]] }, { y: 296, col: dark ? "taupe-100" : "taupe-950", segs: [[0, 160], [220, 380], [640, 780], [800, 980], [1120, 1240]] }];
    var seed = 7; var rnd = function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    var bars = []; lanes.forEach(function (L, li) { for (var x = 0; x < 1240; x += 7) { var on = L.segs.some(function (s) { return x >= s[0] && x < s[1]; }); var bh = on ? Math.max(6, Math.round((0.35 + 0.65 * Math.abs(Math.sin(x / 37))) * rnd() * 56)) : 2; bars.push(h("rect", { key: li + "-" + x, x: x0 + x, y: L.y - bh / 2, width: 3, height: bh, rx: 1.5, fill: C(on ? L.col : (dark ? "taupe-800" : "taupe-250")) })); } });
    var marks = p.markers || [[0, "Interruptions"], [470, "Pauses"], [660, "Multitasking"], [1060, "Handover"]];
    var bub = function (t, x, y, user, k) { return h("div", { key: k, style: abs(x, y, { width: 190 }) }, h(NS.ChatBubble, { tone: user ? (dark ? "light" : "light") : (dark ? "soft" : "soft"), tail: user ? "bottom-left" : "top-left" }, t)); };
    return h("div", { style: { position: "relative", width: W, height: H, borderRadius: 16, overflow: "hidden", background: C(dark ? "taupe-950" : "taupe-100"), border: dark ? "none" : "1px solid " + C("taupe-300") } },
      h("svg", { width: W, height: H, style: { position: "absolute", inset: 0 } },
        marks.map(function (m, i) { return h("line", { key: "g" + i, x1: x0 + m[0], y1: 64, x2: x0 + m[0], y2: H - 30, stroke: C(dark ? "taupe-700" : "taupe-300"), strokeDasharray: "2 6" }); }),
        lanes.map(function (L, i) { return h("line", { key: "l" + i, x1: 24, y1: L.y, x2: W - 24, y2: L.y, stroke: C(dark ? "taupe-800" : "taupe-250"), strokeDasharray: "2 6" }); }), bars),
      h("span", { "aria-label": "Phone call", style: abs(24, 24, { width: 28, height: 28, borderRadius: 6, background: C(dark ? "taupe-800" : "taupe-950"), display: "flex", alignItems: "center", justifyContent: "center" }) }, h("svg", { width: 16, height: 16, viewBox: "0 0 32 32" }, h("path", { d: "M27.7963 19.8077L21.9075 17.169L21.8913 17.1615C21.5856 17.0307 21.2521 16.9783 20.921 17.0088C20.5899 17.0394 20.2716 17.152 19.995 17.3365C19.9624 17.358 19.9311 17.3814 19.9013 17.4065L16.8588 20.0002C14.9313 19.064 12.9413 17.089 12.005 15.1865L14.6025 12.0977C14.6275 12.0665 14.6513 12.0352 14.6738 12.0015C14.8543 11.7256 14.9638 11.4094 14.9926 11.081C15.0214 10.7525 14.9686 10.4221 14.8388 10.119V10.104L12.1925 4.20524C12.0209 3.80932 11.7259 3.4795 11.3515 3.26503C10.9771 3.05056 10.5433 2.96294 10.115 3.01524C8.42122 3.23812 6.86649 4.06995 5.74118 5.35535C4.61587 6.64076 3.99695 8.29185 4.00001 10.0002C4.00001 19.9252 12.075 28.0002 22 28.0002C23.7084 28.0033 25.3595 27.3844 26.6449 26.2591C27.9303 25.1338 28.7621 23.579 28.985 21.8852C29.0374 21.4571 28.95 21.0234 28.7357 20.649C28.5215 20.2746 28.1919 19.9795 27.7963 19.8077ZM22 26.0002C17.758 25.9956 13.691 24.3084 10.6914 21.3088C7.69184 18.3092 6.00464 14.2423 6.00001 10.0002C5.99531 8.7796 6.43507 7.59898 7.23718 6.67887C8.03929 5.75876 9.14889 5.16207 10.3588 5.00024C10.3583 5.00522 10.3583 5.01025 10.3588 5.01524L12.9838 10.8902L10.4 13.9827C10.3738 14.0129 10.35 14.0451 10.3288 14.079C10.1407 14.3676 10.0303 14.7 10.0084 15.0438C9.9865 15.3876 10.0538 15.7313 10.2038 16.0415C11.3363 18.3577 13.67 20.674 16.0113 21.8052C16.3237 21.9538 16.6694 22.0188 17.0144 21.9938C17.3595 21.9688 17.6922 21.8547 17.98 21.6627C18.0121 21.6411 18.043 21.6177 18.0725 21.5927L21.1113 19.0002L26.9863 21.6315C26.9863 21.6315 26.9963 21.6315 27 21.6315C26.8402 22.8431 26.2444 23.9549 25.3241 24.759C24.4038 25.5631 23.2221 26.0044 22 26.0002Z", fill: C(dark ? "taupe-100" : "taupe-50") }))),
      marks.map(function (m, i) { return h("span", { key: "m" + i, style: abs(x0 + m[0] - 12, 24, { display: "flex", alignItems: "center", gap: 8 }) },
        h("span", { className: "ui-micro", style: { width: 24, height: 24, borderRadius: 999, background: C("pink-400"), color: C("taupe-50"), display: "flex", alignItems: "center", justifyContent: "center" } }, i + 1),
        h("span", { className: "ui-title", style: { color: C(ink) } }, m[1])); }),
      bub("My card got stolen.", x0 + 70, 64, true, "b1"), bub("The debit one, I think.", x0 + 470, 64, true, "b2"), bub("Yes, two this morning.", x0 + 900, 64, true, "b3"),
      bub("Thanks for calling. Before we start—", x0 - 116, 344, false, "a1"), bub("Sorry to hear that. Debit or credit card?", x0 + 220, 344, false, "a2"), bub("OK, I’m freezing your debit card.", x0 + 640, 344, false, "a3"), bub("Your card’s frozen. Let me transfer you to our fraud team.", x0 + 1060, 344, false, "a4"));
  }

  Object.assign(NS, { CodeBeforeAfter: CodeBeforeAfter, CodeAnnotated: CodeAnnotated, CodeDiff: CodeDiff, TreeRow: TreeRow, FileTree: FileTree, RuleRow: RuleRow, RuleList: RuleList, StackBlock: StackBlock, SkillStack: SkillStack, ThreadEvent: ThreadEvent, ChatThread: ChatThread, TerminalStep: TerminalStep, TerminalSteps: TerminalSteps, VoiceCall: VoiceCall });
})();
/* ---- batch: studio ---- */
(function () {
var ICONS = {
laptop:"M29 21H28V9C28 8.20435 27.6839 7.44129 27.1213 6.87868C26.5587 6.31607 25.7956 6 25 6H7C6.20435 6 5.44129 6.31607 4.87868 6.87868C4.31607 7.44129 4 8.20435 4 9V21H3C2.73478 21 2.48043 21.1054 2.29289 21.2929C2.10536 21.4804 2 21.7348 2 22V24C2 24.7956 2.31607 25.5587 2.87868 26.1213C3.44129 26.6839 4.20435 27 5 27H27C27.7956 27 28.5587 26.6839 29.1213 26.1213C29.6839 25.5587 30 24.7956 30 24V22C30 21.7348 29.8946 21.4804 29.7071 21.2929C29.5196 21.1054 29.2652 21 29 21ZM6 9C6 8.73478 6.10536 8.48043 6.29289 8.29289C6.48043 8.10536 6.73478 8 7 8H25C25.2652 8 25.5196 8.10536 25.7071 8.29289C25.8946 8.48043 26 8.73478 26 9V21H6V9ZM28 24C28 24.2652 27.8946 24.5196 27.7071 24.7071C27.5196 24.8946 27.2652 25 27 25H5C4.73478 25 4.48043 24.8946 4.29289 24.7071C4.10536 24.5196 4 24.2652 4 24V23H28V24ZM19 11C19 11.2652 18.8946 11.5196 18.7071 11.7071C18.5196 11.8946 18.2652 12 18 12H14C13.7348 12 13.4804 11.8946 13.2929 11.7071C13.1054 11.5196 13 11.2652 13 11C13 10.7348 13.1054 10.4804 13.2929 10.2929C13.4804 10.1054 13.7348 10 14 10H18C18.2652 10 18.5196 10.1054 18.7071 10.2929C18.8946 10.4804 19 10.7348 19 11Z",
cloud:"M20 5C17.9571 5.00157 15.9549 5.57142 14.2174 6.64582C12.4798 7.72023 11.0754 9.25682 10.1612 11.0837C9.0737 10.9251 7.96513 10.9923 6.90469 11.2811C5.84425 11.5699 4.85469 12.0741 3.99773 12.7622C3.14077 13.4504 2.43479 14.3077 1.92384 15.2808C1.41288 16.2538 1.1079 17.3217 1.02793 18.4179C0.947952 19.514 1.0947 20.6149 1.459 21.6518C1.82331 22.6887 2.39737 23.6395 3.14538 24.4447C3.89338 25.2499 4.79928 25.8924 5.80657 26.3321C6.81387 26.7717 7.90094 26.9991 9 27H20C22.9174 27 25.7153 25.8411 27.7782 23.7782C29.8411 21.7153 31 18.9174 31 16C31 13.0826 29.8411 10.2847 27.7782 8.22183C25.7153 6.15893 22.9174 5 20 5ZM20 25H9C7.4087 25 5.88258 24.3679 4.75736 23.2426C3.63214 22.1174 3 20.5913 3 19C3 17.4087 3.63214 15.8826 4.75736 14.7574C5.88258 13.6321 7.4087 13 9 13C9.1375 13 9.275 13 9.41125 13.0138C9.13778 13.9856 8.99939 14.9904 9 16C9 16.2652 9.10536 16.5196 9.29289 16.7071C9.48043 16.8946 9.73478 17 10 17C10.2652 17 10.5196 16.8946 10.7071 16.7071C10.8946 16.5196 11 16.2652 11 16C11 14.22 11.5278 12.4799 12.5168 10.9999C13.5057 9.51983 14.9113 8.36627 16.5558 7.68508C18.2004 7.0039 20.01 6.82567 21.7558 7.17293C23.5016 7.5202 25.1053 8.37737 26.364 9.63604C27.6226 10.8947 28.4798 12.4984 28.8271 14.2442C29.1743 15.99 28.9961 17.7996 28.3149 19.4442C27.6337 21.0887 26.4802 22.4943 25.0001 23.4832C23.5201 24.4722 21.78 25 20 25Z",
drives:"M26 17H6C5.46957 17 4.96086 17.2107 4.58579 17.5858C4.21071 17.9609 4 18.4696 4 19V25C4 25.5304 4.21071 26.0391 4.58579 26.4142C4.96086 26.7893 5.46957 27 6 27H26C26.5304 27 27.0391 26.7893 27.4142 26.4142C27.7893 26.0391 28 25.5304 28 25V19C28 18.4696 27.7893 17.9609 27.4142 17.5858C27.0391 17.2107 26.5304 17 26 17ZM26 25H6V19H26V25ZM26 5H6C5.46957 5 4.96086 5.21071 4.58579 5.58579C4.21071 5.96086 4 6.46957 4 7V13C4 13.5304 4.21071 14.0391 4.58579 14.4142C4.96086 14.7893 5.46957 15 6 15H26C26.5304 15 27.0391 14.7893 27.4142 14.4142C27.7893 14.0391 28 13.5304 28 13V7C28 6.46957 27.7893 5.96086 27.4142 5.58579C27.0391 5.21071 26.5304 5 26 5ZM26 13H6V7H26V13ZM24 10C24 10.2967 23.912 10.5867 23.7472 10.8334C23.5824 11.08 23.3481 11.2723 23.074 11.3858C22.7999 11.4994 22.4983 11.5291 22.2074 11.4712C21.9164 11.4133 21.6491 11.2704 21.4393 11.0607C21.2296 10.8509 21.0867 10.5836 21.0288 10.2926C20.9709 10.0017 21.0007 9.70006 21.1142 9.42597C21.2277 9.15189 21.42 8.91762 21.6666 8.7528C21.9133 8.58797 22.2033 8.5 22.5 8.5C22.8978 8.5 23.2794 8.65804 23.5607 8.93934C23.842 9.22064 24 9.60218 24 10ZM24 22C24 22.2967 23.912 22.5867 23.7472 22.8334C23.5824 23.08 23.3481 23.2723 23.074 23.3858C22.7999 23.4993 22.4983 23.5291 22.2074 23.4712C21.9164 23.4133 21.6491 23.2704 21.4393 23.0607C21.2296 22.8509 21.0867 22.5836 21.0288 22.2926C20.9709 22.0017 21.0007 21.7001 21.1142 21.426C21.2277 21.1519 21.42 20.9176 21.6666 20.7528C21.9133 20.588 22.2033 20.5 22.5 20.5C22.8978 20.5 23.2794 20.658 23.5607 20.9393C23.842 21.2206 24 21.6022 24 22Z",
wrench:"M28.3452 8.62483C28.2846 8.4749 28.1885 8.34192 28.0651 8.2373C27.9418 8.13268 27.7949 8.05953 27.6371 8.02413C27.4793 7.98873 27.3152 7.99214 27.159 8.03406C27.0028 8.07599 26.8591 8.15517 26.7402 8.26483L21.7027 12.9136L19.549 12.4511L19.0865 10.2973L23.7352 5.25983C23.8449 5.14094 23.9241 4.99723 23.966 4.84103C24.0079 4.68482 24.0113 4.52078 23.9759 4.36296C23.9405 4.20515 23.8674 4.05828 23.7628 3.93494C23.6581 3.81161 23.5252 3.71549 23.3752 3.65483C22.0089 3.10212 20.5277 2.89343 19.0619 3.0471C17.596 3.20077 16.1904 3.71209 14.9684 4.53614C13.7463 5.36019 12.7454 6.47174 12.0535 7.77314C11.3616 9.07453 11 10.5259 11.0002 11.9998C10.9986 13.2444 11.254 14.476 11.7502 15.6173L4.22399 22.1248C4.20524 22.1398 4.18774 22.1573 4.17024 22.1736C3.42001 22.9238 2.99854 23.9413 2.99854 25.0023C2.99854 25.5277 3.10201 26.0479 3.30305 26.5332C3.50409 27.0186 3.79877 27.4596 4.17024 27.8311C4.54172 28.2026 4.98273 28.4972 5.46808 28.6983C5.95344 28.8993 6.47364 29.0028 6.99899 29.0028C8.05998 29.0028 9.07751 28.5813 9.82774 27.8311C9.84399 27.8148 9.86149 27.7961 9.87649 27.7786L16.3827 20.2498C17.7533 20.8514 19.2522 21.1018 20.7439 20.9781C22.2355 20.8544 23.6728 20.3607 24.9255 19.5416C26.1783 18.7224 27.207 17.6038 27.9184 16.287C28.6299 14.9701 29.0017 13.4966 29.0002 11.9998C29.0022 10.8431 28.7797 9.69689 28.3452 8.62483ZM20.0002 18.9998C18.8166 18.9982 17.6526 18.6972 16.6165 18.1248C16.4158 18.0139 16.183 17.9754 15.9573 18.0157C15.7315 18.056 15.5265 18.1726 15.3765 18.3461L8.38899 26.4386C8.01087 26.7978 7.50737 26.9951 6.98584 26.9885C6.46432 26.9818 5.96604 26.7716 5.59724 26.4028C5.22843 26.034 5.01829 25.5357 5.01161 25.0142C5.00494 24.4927 5.20225 23.9892 5.56149 23.6111L13.6477 16.6248C13.8215 16.4748 13.9383 16.2695 13.9786 16.0435C14.0189 15.8174 13.9802 15.5844 13.869 15.3836C13.2315 14.2306 12.9324 12.9212 13.0059 11.6058C13.0794 10.2904 13.5227 9.02248 14.2847 7.94777C15.0467 6.87305 16.0965 6.03519 17.3134 5.53051C18.5304 5.02583 19.8651 4.87481 21.164 5.09483L17.264 9.32108C17.1555 9.43879 17.0768 9.58084 17.0346 9.73528C16.9924 9.88972 16.9879 10.052 17.0215 10.2086L17.729 13.4998C17.7695 13.6881 17.8634 13.8606 17.9996 13.9968C18.1357 14.1329 18.3083 14.2269 18.4965 14.2673L21.7902 14.9748C21.9468 15.0084 22.1091 15.0039 22.2635 14.9617C22.418 14.9195 22.56 14.8408 22.6777 14.7323L26.904 10.8323C27.0725 11.8361 27.0203 12.8645 26.751 13.846C26.4818 14.8276 26.002 15.7387 25.3449 16.516C24.6879 17.2933 23.8694 17.9182 22.9464 18.3471C22.0234 18.7761 21.018 18.9988 20.0002 18.9998Z",
pdf:"M28 19C28 19.2652 27.8946 19.5196 27.7071 19.7071C27.5196 19.8946 27.2652 20 27 20H24V22H26C26.2652 22 26.5196 22.1054 26.7071 22.2929C26.8946 22.4804 27 22.7348 27 23C27 23.2652 26.8946 23.5196 26.7071 23.7071C26.5196 23.8946 26.2652 24 26 24H24V26C24 26.2652 23.8946 26.5196 23.7071 26.7071C23.5196 26.8946 23.2652 27 23 27C22.7348 27 22.4804 26.8946 22.2929 26.7071C22.1054 26.5196 22 26.2652 22 26V19C22 18.7348 22.1054 18.4804 22.2929 18.2929C22.4804 18.1054 22.7348 18 23 18H27C27.2652 18 27.5196 18.1054 27.7071 18.2929C27.8946 18.4804 28 18.7348 28 19ZM11.5 21.5C11.5 22.4283 11.1313 23.3185 10.4749 23.9749C9.8185 24.6313 8.92826 25 8 25H7V26C7 26.2652 6.89464 26.5196 6.70711 26.7071C6.51957 26.8946 6.26522 27 6 27C5.73478 27 5.48043 26.8946 5.29289 26.7071C5.10536 26.5196 5 26.2652 5 26V19C5 18.7348 5.10536 18.4804 5.29289 18.2929C5.48043 18.1054 5.73478 18 6 18H8C8.92826 18 9.8185 18.3687 10.4749 19.0251C11.1313 19.6815 11.5 20.5717 11.5 21.5ZM9.5 21.5C9.5 21.1022 9.34196 20.7206 9.06066 20.4393C8.77936 20.158 8.39782 20 8 20H7V23H8C8.39782 23 8.77936 22.842 9.06066 22.5607C9.34196 22.2794 9.5 21.8978 9.5 21.5ZM20.5 22.5C20.5 23.6935 20.0259 24.8381 19.182 25.682C18.3381 26.5259 17.1935 27 16 27H14C13.7348 27 13.4804 26.8946 13.2929 26.7071C13.1054 26.5196 13 26.2652 13 26V19C13 18.7348 13.1054 18.4804 13.2929 18.2929C13.4804 18.1054 13.7348 18 14 18H16C17.1935 18 18.3381 18.4741 19.182 19.318C20.0259 20.1619 20.5 21.3065 20.5 22.5ZM18.5 22.5C18.5 21.837 18.2366 21.2011 17.7678 20.7322C17.2989 20.2634 16.663 20 16 20H15V25H16C16.663 25 17.2989 24.7366 17.7678 24.2678C18.2366 23.7989 18.5 23.163 18.5 22.5ZM5 14V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H19C19.1314 2.9999 19.2615 3.02568 19.3829 3.07586C19.5042 3.12605 19.6146 3.19967 19.7075 3.2925L26.7075 10.2925C26.8003 10.3854 26.8739 10.4958 26.9241 10.6172C26.9743 10.7385 27.0001 10.8686 27 11V14C27 14.2652 26.8946 14.5196 26.7071 14.7071C26.5196 14.8946 26.2652 15 26 15C25.7348 15 25.4804 14.8946 25.2929 14.7071C25.1054 14.5196 25 14.2652 25 14V12H19C18.7348 12 18.4804 11.8946 18.2929 11.7071C18.1054 11.5196 18 11.2652 18 11V5H7V14C7 14.2652 6.89464 14.5196 6.70711 14.7071C6.51957 14.8946 6.26522 15 6 15C5.73478 15 5.48043 14.8946 5.29289 14.7071C5.10536 14.5196 5 14.2652 5 14ZM20 10H23.5863L20 6.41375V10Z",
check:"M21.7075 12.2925C21.8005 12.3854 21.8742 12.4957 21.9246 12.6171C21.9749 12.7385 22.0008 12.8686 22.0008 13C22.0008 13.1314 21.9749 13.2615 21.9246 13.3829C21.8742 13.5043 21.8005 13.6146 21.7075 13.7075L14.7075 20.7075C14.6146 20.8005 14.5043 20.8742 14.3829 20.9246C14.2615 20.9749 14.1314 21.0008 14 21.0008C13.8686 21.0008 13.7385 20.9749 13.6171 20.9246C13.4957 20.8742 13.3854 20.8005 13.2925 20.7075L10.2925 17.7075C10.1049 17.5199 9.99945 17.2654 9.99945 17C9.99945 16.7346 10.1049 16.4801 10.2925 16.2925C10.4801 16.1049 10.7346 15.9994 11 15.9994C11.2654 15.9994 11.5199 16.1049 11.7075 16.2925L14 18.5863L20.2925 12.2925C20.3854 12.1995 20.4957 12.1258 20.6171 12.0754C20.7385 12.0251 20.8686 11.9992 21 11.9992C21.1314 11.9992 21.2615 12.0251 21.3829 12.0754C21.5043 12.1258 21.6146 12.1995 21.7075 12.2925ZM29 16C29 18.5712 28.2376 21.0846 26.8091 23.2224C25.3807 25.3603 23.3503 27.0265 20.9749 28.0104C18.5995 28.9944 15.9856 29.2518 13.4638 28.7502C10.9421 28.2486 8.6257 27.0105 6.80762 25.1924C4.98953 23.3743 3.75141 21.0579 3.2498 18.5362C2.74819 16.0144 3.00563 13.4006 3.98957 11.0251C4.97351 8.64968 6.63975 6.61935 8.77759 5.1909C10.9154 3.76244 13.4288 3 16 3C19.4467 3.00364 22.7512 4.37445 25.1884 6.81163C27.6256 9.24882 28.9964 12.5533 29 16ZM27 16C27 13.8244 26.3549 11.6977 25.1462 9.88873C23.9375 8.07979 22.2195 6.66989 20.2095 5.83733C18.1995 5.00476 15.9878 4.78692 13.854 5.21136C11.7202 5.6358 9.76021 6.68345 8.22183 8.22183C6.68345 9.7602 5.63581 11.7202 5.21137 13.854C4.78693 15.9878 5.00477 18.1995 5.83733 20.2095C6.66989 22.2195 8.07979 23.9375 9.88873 25.1462C11.6977 26.3549 13.8244 27 16 27C18.9164 26.9967 21.7123 25.8367 23.7745 23.7745C25.8367 21.7123 26.9967 18.9164 27 16Z",
cube:"M27.96 8.26877L16.96 2.25002C16.6661 2.08763 16.3358 2.00244 16 2.00244C15.6642 2.00244 15.3339 2.08763 15.04 2.25002L4.04 8.27127C3.72586 8.44315 3.46363 8.69622 3.28069 9.00405C3.09775 9.31188 3.00081 9.66319 3 10.0213V21.9763C3.00081 22.3344 3.09775 22.6857 3.28069 22.9935C3.46363 23.3013 3.72586 23.5544 4.04 23.7263L15.04 29.7475C15.3339 29.9099 15.6642 29.9951 16 29.9951C16.3358 29.9951 16.6661 29.9099 16.96 29.7475L27.96 23.7263C28.2741 23.5544 28.5364 23.3013 28.7193 22.9935C28.9023 22.6857 28.9992 22.3344 29 21.9763V10.0225C28.9999 9.6638 28.9032 9.31172 28.7203 9.00317C28.5373 8.69462 28.2747 8.44096 27.96 8.26877ZM16 4.00002L26.0425 9.50002L16 15L5.9575 9.50002L16 4.00002ZM5 11.25L15 16.7225V27.4463L5 21.9775V11.25ZM17 27.4463V16.7275L27 11.25V21.9725L17 27.4463Z",
arrowUp:"M26.0612 15.0613C25.9218 15.2011 25.7563 15.3121 25.5739 15.3878C25.3916 15.4635 25.1961 15.5025 24.9987 15.5025C24.8013 15.5025 24.6058 15.4635 24.4235 15.3878C24.2411 15.3121 24.0756 15.2011 23.9362 15.0613L17.4999 8.62505V27C17.4999 27.3979 17.3419 27.7794 17.0606 28.0607C16.7793 28.342 16.3978 28.5 15.9999 28.5C15.6021 28.5 15.2206 28.342 14.9393 28.0607C14.658 27.7794 14.4999 27.3979 14.4999 27V8.62505L8.0612 15.0613C7.7794 15.3431 7.39721 15.5014 6.9987 15.5014C6.60018 15.5014 6.21799 15.3431 5.9362 15.0613C5.6544 14.7795 5.49609 14.3973 5.49609 13.9988C5.49609 13.6003 5.6544 13.2181 5.9362 12.9363L14.9362 3.9363C15.0756 3.79646 15.2411 3.6855 15.4235 3.6098C15.6058 3.53409 15.8013 3.49512 15.9987 3.49512C16.1961 3.49512 16.3916 3.53409 16.5739 3.6098C16.7563 3.6855 16.9218 3.79646 17.0612 3.9363L26.0612 12.9363C26.201 13.0757 26.312 13.2412 26.3877 13.4236C26.4634 13.6059 26.5024 13.8014 26.5024 13.9988C26.5024 14.1962 26.4634 14.3917 26.3877 14.574C26.312 14.7564 26.201 14.9219 26.0612 15.0613Z",
cursor:"M27.5611 25.9749L25.9749 27.5611C25.8355 27.701 25.6699 27.8119 25.4876 27.8876C25.3053 27.9633 25.1098 28.0023 24.9124 28.0023C24.715 28.0023 24.5195 27.9633 24.3372 27.8876C24.1548 27.8119 23.9892 27.701 23.8499 27.5611L16.7786 20.4899L14.3749 26.7599L14.3586 26.8011C14.2054 27.158 13.9505 27.462 13.6258 27.6752C13.3011 27.8883 12.9208 28.0012 12.5324 27.9999H12.4349C12.0299 27.9829 11.6399 27.8419 11.3178 27.596C10.9956 27.35 10.7568 27.011 10.6336 26.6249L4.09988 6.61488C3.98528 6.26474 3.96995 5.88969 4.05557 5.53137C4.14119 5.17304 4.32442 4.84544 4.58493 4.58493C4.84544 4.32442 5.17304 4.14119 5.53137 4.05557C5.88969 3.96995 6.26474 3.98528 6.61488 4.09988L26.6249 10.6336C27.0073 10.7616 27.3421 11.0021 27.5854 11.3237C27.8287 11.6453 27.9691 12.033 27.9882 12.4358C28.0072 12.8386 27.9041 13.2378 27.6922 13.5809C27.4804 13.9241 27.1698 14.1952 26.8011 14.3586L26.7599 14.3749L20.4899 16.7836L27.5611 23.8536C27.8424 24.1349 28.0004 24.5164 28.0004 24.9143C28.0004 25.3121 27.8424 25.6936 27.5611 25.9749Z"
};
  var React = window.React, h = React.createElement, NS = window.RasaNewBrand;
  function C(n) { return "var(--" + n + ")"; }
  var sans = "var(--font-sans)", mono = "var(--font-mono)";
  var S = { label: { fontFamily: sans, fontWeight: 500, fontSize: 14, lineHeight: "20px" }, body: { fontFamily: sans, fontWeight: 300, fontSize: 14, lineHeight: "20px" }, bodyL: { fontFamily: sans, fontWeight: 300, fontSize: 15, lineHeight: "22px" }, tag: { fontFamily: sans, fontWeight: 500, fontSize: 12, lineHeight: "16px" }, monoS: { fontFamily: mono, fontWeight: 400, fontSize: 12, lineHeight: "16px" }, mono: { fontFamily: mono, fontWeight: 400, fontSize: 14, lineHeight: "22px" }, card: { fontFamily: sans, fontWeight: 500, fontSize: 17, lineHeight: "22px" }, panel: { fontFamily: sans, fontWeight: 600, fontSize: 24, lineHeight: "30px" }, prose: { fontFamily: sans, fontWeight: 300, fontSize: 24, lineHeight: "32px" } };
  function t(style, color, extra) { return Object.assign({}, style, { color: C(color) }, extra || {}); }
  function Icon(p) { return h("svg", { width: p.size || 16, height: p.size || 16, viewBox: "0 0 32 32", "aria-hidden": true, style: { flex: "none" } }, h("path", { d: ICONS[p.name], fill: C(p.color || "taupe-950") })); }

  /* ---------- Pill cloud ---------- */
  var CLOUD = [[["seat_preference = window","p"],["policy_verified = true","b"],["fraud_score = 0.12","t"],["party_size = 4","p"]],[["caller_phone = ●●●●●●","b",1],["payout_cap = 5000","t"],["incident_type = storm","p"],["authenticated = true","b"]],[["return_window_days = 30","t"],["delivery = standard","p"],["language = de-DE","b"],["eligible_for_upgrade = false","t"]],[["nights = 2","p"],["tier = gold","b"],["selected_order_id = …","p"],["risk_band = low","t"],["contact_pref = email","p"]],[["session_start = 14:02","b"],["booking_ref = QT7F2","p"],["channel = voice","b"],["verified_at = 14:03","b"]],[["refund_eligible = true","t"],["cabin = economy","p"],["plan = unlimited","p"],["agent_version = 4.2","b"]],[["attempts = 1","t"],["pickup_store = Mitte","p"],["consent_marketing = false","p"],["credit_remaining = 40","t"]],[["country = DE","b"],["appointment = Tue 09:00","p"],["sla_band = priority","t"],["line_count = 3","p"]],[["is_repeat_caller = true","b"],["damage_date = 14 Jul","p"],["excess = 250","t"],["preferred_time = morning","p"]],[["tenure_years = 6","b"],["upgrade_quote = 12.00","t"],["id_check = passed","b"],["policy_number = ●●●●●●","p",1]],[["auth_method = otp","b"],["assessor_needed = true","t"],["claim_id = ●●●●●●","p",1],["locale = de-DE","b"]],[["cover_check = passed","t"],["contact_window = 9-12","p"],["brand = telco-de","b"],["duplicate_claim = false","t"]],[["reason = water damage","p"],["session_id = 7f21…","b"],["discount_band = B","t"],["room_type = twin","p"]],[["entry_point = ivr","b"],["card_last4 = ●●●●","p",1],["stock_on_hand = 12","t"],["new_address_set = true","p"]],[["consent_recording = true","b"],["seats_requested = 2","p"],["account_tier = business","b"],["region = eu-central-1","b"]],[["order_total = 84.20","t"],["gift_wrap = false","p"],["store_id = 0417","b"],["handoff_reason = none","t"]],[["preferred_channel = sms","p"],["queue = fraud","b"],["callback_at = 16:30","t"],["has_pin = true","b"]],[["card_status = frozen","p"],["replacement_eta = 2 days","t"],["address_changed = true","p"],["vip = false","b"]],[["survey_opt_in = true","b"],["last_contact = 3 days ago","t"],["intent = replace_card","p"],["shipping = express","t"]]];
  var TONE = { p: ["pink-50", "pink-300", "pink-700"], b: ["periwinkle-50", "periwinkle-200", "periwinkle-700"], t: ["taupe-200", "taupe-300", "taupe-700"] };
  function PillCloud(p) {
    var rows = (p.rows || CLOUD).slice(0, p.maxRows || 19), W = p.width || 960, H = p.height || 1080, fade = p.fade == null ? 120 : p.fade;
    var mask = "linear-gradient(to right, transparent 0, #000 " + fade + "px, #000 calc(100% - " + fade + "px), transparent 100%)";
    return h("div", { style: { width: W, height: H, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", WebkitMaskImage: mask, maskImage: mask } },
      h("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, rows.map(function (r, i) {
        var row = r.concat(rows[(i + 7) % rows.length]);
        return h("div", { key: i, style: { display: "flex", gap: 12, marginLeft: i % 2 ? -90 : -40, whiteSpace: "nowrap" } }, row.map(function (c, j) { var tn = TONE[c[1]] || TONE.t;
          return h("span", { key: j, className: "ui-code", style: { padding: "10px 16px", borderRadius: 999, background: C(tn[0]), border: "1px " + (c[2] ? "dashed " : "solid ") + C(tn[1]), color: C(tn[2]), flex: "none" } }, c[0]); }));
      })));
  }

  /* ---------- Doc grid ---------- */
  function DocThumb(p) { var hl = p.highlight, ws = [1, 0.8, 0.95, 0.6, 0.9, 0.7, 0.85, 0.5];
    return h("div", { style: { width: 150, height: 190, boxSizing: "border-box", padding: "16px 14px", borderRadius: 8, background: C("taupe-50"), border: (hl ? 2 : 1) + "px solid " + C(hl ? "pink-400" : "taupe-300"), display: "flex", flexDirection: "column", gap: 8 } },
      h("span", { className: "ui-micro", style: { color: C("taupe-950") } }, p.name || "refunds.md"),
      ws.map(function (w, i) { return h("span", { key: i, style: { width: (w * 100) + "%", height: 4, borderRadius: 2, background: C(hl && i >= 1 && i <= 3 ? "pink-200" : "taupe-250") } }); })); }
  function DocGrid(p) { var names = p.names || ["refunds.md", "baggage.md", "fares.md", "loyalty.md", "changes.md", "delays.md", "pets.md", "seating.md"], hi = p.highlight == null ? 1 : p.highlight;
    return h("div", { style: { display: "grid", gridTemplateColumns: "repeat(4, 150px)", gap: 16 } }, names.map(function (n, i) { return h(DocThumb, { key: i, name: n, highlight: i === hi }); })); }

  /* ---------- Deploy targets ---------- */
  function DeployTarget(p) { var f = p.focus;
    return h("div", { style: { width: 480, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center" } },
      h("span", { style: { width: 120, height: 120, borderRadius: 999, boxSizing: "border-box", background: C(f ? "pink-400" : "taupe-50"), border: f ? "none" : "1px solid " + C("taupe-300"), display: "flex", alignItems: "center", justifyContent: "center" } }, h(Icon, { name: p.icon || "cloud", size: 48 })),
      h("span", { className: "ui-code", style: { color: C("taupe-500") } }, p.index || "02"),
      h("span", { className: "ui-heading", style: { color: C("taupe-950") } }, p.title || "Your cloud"),
      h("span", { className: "ui-body", style: { color: C("taupe-700") } }, p.subtitle || "AWS, Azure or Google Cloud"),
      h("span", { className: "ui-code", style: { padding: "8px 14px", borderRadius: 8, background: C("taupe-950"), color: C("taupe-50") } }, p.command || "Helm chart"),
      h("span", { className: "ui-body", style: { color: C("taupe-700"), width: 420 } }, p.detail || "Kubernetes or OpenShift, with a deployment playbook for each cloud.")); }
  var TARGETS = [{ index: "01", title: "Your laptop", subtitle: "Build and test locally", command: "$ rasa inspect", detail: "Chat or talk to the agent and step through every turn.", icon: "laptop" }, { index: "02", title: "Your cloud", subtitle: "AWS, Azure or Google Cloud", command: "Helm chart", detail: "Kubernetes or OpenShift, with a deployment playbook for each cloud.", icon: "cloud" }, { index: "03", title: "Your data center", subtitle: "On-premise, end to end", command: "provider: self-hosted", detail: "Any Kubernetes or OpenShift, with no connection out to Rasa.", icon: "drives", focus: true }];
  function DeployTargets(p) { var ts = p.targets || TARGETS, W = 1696, gap = (W - ts.length * 480) / Math.max(1, ts.length - 1);
    return h("div", { style: { position: "relative", width: W, display: "flex", justifyContent: "space-between" } },
      ts.slice(0, -1).map(function (_, i) { var x1 = i * (480 + gap) + 240 + 68, x2 = (i + 1) * (480 + gap) + 240 - 68; return h("span", { key: "l" + i, style: { position: "absolute", zIndex: 0, top: 59, left: x1, width: x2 - x1, borderTop: "2px dotted " + C("taupe-700") } }); }),
      ts.map(function (tg, i) { return h("div", { key: i, style: { position: "relative", zIndex: 1 } }, h(DeployTarget, tg)); })); }

  /* ---------- Studio pieces ---------- */
  function Skeleton(p) { var k = p.kind || "line", bar = function (w, key) { return h("span", { key: key, style: { display: "block", width: w, height: 8, borderRadius: 4, background: C("taupe-200") } }); };
    if (k === "row") return h("div", { style: { display: "flex", alignItems: "center", gap: 10, width: p.width || 168 } }, h("span", { style: { width: 16, height: 16, borderRadius: 4, background: C("taupe-200"), flex: "none" } }), bar("70%"));
    if (k === "text") return h("div", { style: { display: "flex", flexDirection: "column", gap: 10, width: p.width || 240 } }, bar("50%", 1), bar("100%", 2), bar("80%", 3));
    if (k === "card") return h("div", { style: { display: "flex", flexDirection: "column", gap: 10, padding: 20, boxSizing: "border-box", width: p.width || 280, borderRadius: 12, border: "1px dashed " + C("taupe-300") } }, bar("45%", 1), bar("85%", 2), bar("70%", 3));
    return bar(p.width || 160); }
  function ResourceChip(p) { var tool = p.type !== "reference";
    return h("span", { style: t(S.body, "taupe-950", { display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 12px 8px 10px", borderRadius: 8, background: C("taupe-50"), border: "1px solid " + C("taupe-300") }) }, h(Icon, { name: tool ? "wrench" : "pdf", color: "taupe-700" }), p.children || (tool ? "card-services-api" : "loyalty-tiers.pdf")); }
  function SkillProse(p) { var text = p.text || "Check the customer’s tier first. When a customer has lost their card, freeze the card. If they’re a Gold customer, offer an upgrade to Platinum with free next-day delivery. Otherwise, order a replacement.", hl = p.highlight === undefined ? "next-day" : p.highlight, parts = hl && text.indexOf(hl) >= 0 ? text.split(hl) : [text];
    return h("div", { style: { width: p.width || 640, display: "flex", flexDirection: "column", gap: 14 } },
      h("span", { style: t(S.monoS, "taupe-700", { textTransform: "uppercase" }) }, p.eyebrow || "Skill · Replace a card"),
      h("span", { style: t(S.prose, "taupe-950") }, parts.length > 1 ? [parts[0], h("span", { key: "h", style: { color: C("pink-400") } }, hl), parts.slice(1).join(hl)] : text),
      h("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, (p.resources || [["tool", "card-services-api"], ["reference", "loyalty-tiers.pdf"]]).map(function (r, i) { return h(ResourceChip, { key: i, type: r[0] }, r[1]); }))); }
  function CollabCursor(p) { var dev = p.role === "developer", col = dev ? "periwinkle-600" : "pink-400";
    return h("span", { style: { position: "relative", display: "inline-block", width: 160, height: 44 } }, h("span", { style: { position: "absolute", left: 0, top: 0 } }, h(Icon, { name: "cursor", size: 18, color: col })),
      h("span", { style: t(S.tag, "taupe-50", { position: "absolute", left: 12, top: 18, padding: "3px 8px", borderRadius: 4, background: C(col), whiteSpace: "nowrap" }) }, p.name || (dev ? "Kris · Developer" : "Ana · Business"))); }
  function AvatarStack(p) { var ppl = p.people || [["KK", "periwinkle-600"], ["AL", "pink-400"]];
    return h("span", { style: { display: "inline-flex" } }, ppl.map(function (a, i) { return h("span", { key: i, style: t(S.tag, "taupe-50", { width: 32, height: 32, boxSizing: "border-box", marginLeft: i ? -8 : 0, borderRadius: 999, background: C(a[1]), border: "2px solid " + C("taupe-50"), display: "flex", alignItems: "center", justifyContent: "center" }) }, a[0]); })); }
  function InsightCard(p) { return h("div", { style: { width: p.width || 320, boxSizing: "border-box", padding: 16, borderRadius: 12, background: C("taupe-50"), border: "1px solid " + C("taupe-250"), display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-start" } },
    h("span", { style: t(S.tag, "pink-700", { padding: "3px 8px", borderRadius: 6, background: C("pink-50"), border: "1px solid " + C("pink-300") }) }, p.tag || "INSIGHT"),
    h("span", { style: t(S.bodyL, "taupe-950") }, p.children || "Fix this: Replace a card hands off when the customer has moved.")); }
  function RunCard(p) { var ed = p.state === "edited";
    return h("div", { style: { width: p.width || 320, boxSizing: "border-box", padding: "14px 16px", borderRadius: 12, background: C("taupe-50"), border: "1px solid " + C("taupe-250"), display: "flex", alignItems: "center", gap: 12 } },
      h(Icon, { name: ed ? "cube" : "check", size: 20, color: ed ? "periwinkle-600" : "seafoam-700" }),
      h("div", { style: { flex: 1, display: "flex", flexDirection: "column", gap: 2, minWidth: 0 } }, h("span", { style: t(S.card, "taupe-950") }, p.title || (ed ? "Replace a card" : "Eval run")), h("span", { style: t(S.body, "taupe-700") }, p.detail || (ed ? "2 lines added · branch Fix address check" : "492 of 500 passed · 2m 14s"))),
      h("span", { style: t(ed ? S.body : S.tag, "seafoam-700", { padding: "3px 8px", borderRadius: 6, background: C("seafoam-50"), display: "inline-flex", alignItems: "center", gap: 6, flex: "none" }) }, ed ? [h("span", { key: "d", style: { width: 6, height: 6, borderRadius: 999, background: C("seafoam-700") } }), "Edited"] : "PASSED")); }

  /* ---------- Studio shell ---------- */
  function StudioShell(p) {
    var sq = p.size === "square", W = sq ? 736 : 1440, H = sq ? 736 : 580, line = "1px solid " + C("taupe-250");
    var rail = sq ? null : h("div", { style: { width: 200, flex: "none", boxSizing: "border-box", padding: "20px 16px", borderRight: line, display: "flex", flexDirection: "column", gap: 14 } },
      h("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, h("span", { style: { width: 28, height: 28, borderRadius: 7, background: C("pink-400"), display: "flex", alignItems: "center", justifyContent: "center" } }, NS.RasaMark ? h(NS.RasaMark, { size: 14 }) : null), h("span", { style: t(S.label, "taupe-950") }, "Rasa Studio")),
      h(Skeleton, { kind: "row" }), h(Skeleton, { kind: "row" }), h("span", { style: t(S.tag, "taupe-500") }, "Agents"), h(Skeleton, { kind: "row" }), h(Skeleton, { kind: "row" }), h(Skeleton, { kind: "row" }), h("span", { style: { flex: 1 } }), h(Skeleton, { kind: "row" }));
    var copilotDefault = [h(InsightCard, { key: 1, width: "100%" }), h("span", { key: 2, style: t(S.label, "taupe-950") }, "Copilot"), h("span", { key: 3, style: t(S.body, "taupe-700") }, "I ran the fix against 500 simulated customers. 492 now resolve. Ready to ship."), h(RunCard, { key: 4, width: "100%" })];
    var copilot = h("div", { style: { width: sq ? 280 : 360, flex: "none", boxSizing: "border-box", padding: "20px 16px 12px", borderRight: line, display: "flex", flexDirection: "column", gap: 14 } },
      h("span", { style: t(S.label, "taupe-950") }, p.agent || "customer support agent"),
      h("div", { style: { flex: 1, display: "flex", flexDirection: "column", gap: 12, minHeight: 0 } }, p.copilot || copilotDefault),
      h("div", { style: { padding: "12px 10px 10px 14px", borderRadius: 12, background: C("taupe-50"), border: line, display: "flex", flexDirection: "column", gap: 16 } },
        h("span", { style: t(S.body, "taupe-500") }, "Tell Copilot what to change…"),
        h("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, h("span", { style: t(S.label, "taupe-950") }, "+"), h("span", { style: t(S.tag, "taupe-950") }, "Auto"), h("span", { style: { flex: 1 } }),
          h("span", { style: { width: 28, height: 28, borderRadius: 6, background: C("pink-400"), display: "flex", alignItems: "center", justifyContent: "center" } }, h(Icon, { name: "arrowUp", size: 14, color: "taupe-50" })))));
    var tabs = p.tabs || ["Agent", "Conversations", "Analytics", "Evals"], active = p.activeTab || tabs[0];
    var workspaceDefault = [h("div", { key: "hd", style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 } },
        h("div", { style: { display: "flex", flexDirection: "column", gap: 4 } }, h("span", { style: t(S.panel, "taupe-950") }, "Skills"), h("span", { style: t(S.body, "taupe-700") }, "Reusable building blocks your agent will use.")),
        h("div", { style: { display: "flex", alignItems: "center", gap: 12, flex: "none" } }, sq ? null : h(AvatarStack, null),
          h("span", { style: { display: "inline-flex", padding: 3, gap: 2, borderRadius: 8, background: C("taupe-200") } }, h("span", { style: t(S.label, "taupe-950", { height: 26, padding: "0 10px", borderRadius: 6, background: C("taupe-50"), display: "flex", alignItems: "center" }) }, "Form"), h("span", { style: t(S.monoS, "taupe-700", { height: 26, padding: "0 10px", display: "flex", alignItems: "center" }) }, "YAML")))),
      h(SkillProse, { key: "pr", width: "100%" }), sq ? null : h("div", { key: "ph", style: { display: "flex", gap: 16 } }, h(Skeleton, { kind: "card", width: "50%" }), h(Skeleton, { kind: "card", width: "50%" }))];
    var ws = h("div", { style: { flex: 1, minWidth: 0, boxSizing: "border-box", padding: 12, display: "flex", flexDirection: "column", gap: 12 } },
      h("div", { style: { display: "flex", gap: 6 } }, tabs.map(function (tb) { var on = tb === active; return h("span", { key: tb, style: t(on ? S.label : S.body, on ? "taupe-950" : "taupe-500", { padding: "5px 10px", borderRadius: 6, background: on ? C("taupe-200") : "transparent" }) }, tb); })),
      h("div", { style: { flex: 1, minHeight: 0, overflow: "hidden", boxSizing: "border-box", padding: 28, borderRadius: 12, background: C("taupe-50"), border: line, display: "flex", flexDirection: "column", gap: 20 } }, p.workspace || workspaceDefault));
    return h("div", { style: { width: W, height: H, boxSizing: "border-box", borderRadius: 16, overflow: "hidden", background: C("taupe-100"), border: "1px solid " + C("taupe-300"), display: "flex" } }, rail, copilot, ws);
  }

  Object.assign(NS, { PillCloud: PillCloud, DocThumb: DocThumb, DocGrid: DocGrid, DeployTarget: DeployTarget, DeployTargets: DeployTargets, Skeleton: Skeleton, ResourceChip: ResourceChip, SkillProse: SkillProse, CollabCursor: CollabCursor, AvatarStack: AvatarStack, InsightCard: InsightCard, RunCard: RunCard, StudioShell: StudioShell, StudioIcon: Icon });
})();

import type * as React from 'react';
/** Primary: taupe 950 fill. Secondary: taupe 400 outline. Max 2 together, one primary. */
export interface ButtonProps { type?: 'primary' | 'secondary'; onClick?: () => void; disabled?: boolean; className?: string; children?: React.ReactNode }
export declare function Button(props: ButtonProps): React.ReactElement;
/** Fixed-meaning states: success (pass, live), danger (fail, blocked), warning (running, awaiting), info (draft), neutral (should, default), pink (must, focus). */
export interface StatusTagProps { tone?: 'success' | 'danger' | 'warning' | 'info' | 'neutral' | 'pink'; className?: string; children?: React.ReactNode }
export declare function StatusTag(props: StatusTagProps): React.ReactElement;
/** A team, role or product area in its deck-legend colour. Palette order: periwinkle, seafoam, gold, coral, orchid, lavender, sage. */
export interface CategoryTagProps { colour?: 'periwinkle' | 'seafoam' | 'gold' | 'coral' | 'orchid' | 'lavender' | 'sage'; dot?: boolean; className?: string; children?: React.ReactNode }
export declare function CategoryTag(props: CategoryTagProps): React.ReactElement;
/** A skill, tool, channel or attribute. accent = the focus or library item; dark = the engine or core. */
export interface ChipProps { state?: 'default' | 'accent' | 'success' | 'skill' | 'off' | 'dark'; size?: 'regular' | 'small'; icon?: React.ReactNode; className?: string; children?: React.ReactNode }
export declare function Chip(props: ChipProps): React.ReactElement;
/** Chat windows: user dark + bottom-right, agent light/soft + bottom-left. Call timelines: agent dark + top-left, customer light + bottom-left. */
export interface ChatBubbleProps { width?: number; tone?: 'dark' | 'light' | 'soft' | 'highlight' | 'error'; tail?: 'bottom-left' | 'bottom-right' | 'top-left'; className?: string; children?: React.ReactNode }
export declare function ChatBubble(props: ChatBubbleProps): React.ReactElement;
/** The 56px product-window header: three dots, muted breadcrumb, optional mono meta and status tag. */
export interface WindowBarProps { path?: string; meta?: string; status?: string; statusTone?: StatusTagProps['tone'] }
export declare function WindowBar(props: WindowBarProps): React.ReactElement;
/** A real product moment (runs, plans, settings, results). Taupe 50, taupe 300 border, radius 16. Max 6 rows. */
export interface ProductWindowProps extends WindowBarProps { width?: number; className?: string; children?: React.ReactNode }
export declare function ProductWindow(props: ProductWindowProps): React.ReactElement;
/** Storytelling card: icon tile, Sans title, optional tag; no dots or breadcrumb. heading = UI/Heading for cards in a row. */
export interface ConceptCardProps { title: string; tag?: string; tagTone?: StatusTagProps['tone']; icon?: React.ReactNode; heading?: boolean; width?: number; className?: string; children?: React.ReactNode }
export declare function ConceptCard(props: ConceptCardProps): React.ReactElement;
/** The one home for a UI visual on a slide. square = 800 × 800, wide = 1760 × 644. filled = panel + 32px margin; none = transparent. */
export interface VisualContainerProps { size?: 'square' | 'wide'; background?: 'filled' | 'none'; scale?: number; className?: string; children?: React.ReactNode }
export declare function VisualContainer(props: VisualContainerProps): React.ReactElement;
/** One evaluation result (ui/result-row): name UI/Code, level UI/Body (Must / Should), status tag. 48 high, hairline below. Max 6 rows; put rows in a ResultList. */
export interface ResultRowProps { name: string; level?: string; status?: string; tone?: StatusTagProps['tone']; className?: string }
export declare function ResultRow(props: ResultRowProps): React.ReactElement;
/** Bordered inner card (radius 16, 24px side inset) holding ResultRows inside a ProductWindow. */
export declare function ResultList(props: { style?: React.CSSProperties; className?: string; children?: React.ReactNode }): React.ReactElement;
/** ui/notice: approval (pink bar, actions), blocked (coral bar), info (taupe bar), gate (one coral row: title left, reason right). Title UI/Title, detail UI/Body. Max one per visual. */
export interface NoticeProps { tone?: 'approval' | 'blocked' | 'info' | 'gate'; title: string; detail?: string; actions?: React.ReactNode; className?: string }
export declare function Notice(props: NoticeProps): React.ReactElement;
/** ui/step-tab: pipeline step. done = Taupe 50 + green check; live = pink 100, pink 300 border, pink dot. Label UI/Action, meta UI/Meta. Equal widths in StepTabs, max 4. */
export interface StepTabProps { state?: 'done' | 'live'; label: string; meta?: string; className?: string }
export declare function StepTab(props: StepTabProps): React.ReactElement;
export declare function StepTabs(props: { style?: React.CSSProperties; className?: string; children?: React.ReactNode }): React.ReactElement;
/** ui/metric: muted label (UI/Body) over a number (UI/Number, Sans Medium 26). Radius 12. 2–4 in a row, equal widths. */
export interface MetricProps { label: string; value: string; width?: number; className?: string }
export declare function Metric(props: MetricProps): React.ReactElement;
/** ui/table-row: 4 columns. header = Taupe 100, UI/Label; row = first cell UI/Action, rest UI/Code. Put rows in a Table (radius 12). Max 6 rows. */
export interface TableRowProps { kind?: 'header' | 'row'; cells: string[]; className?: string }
export declare function TableRow(props: TableRowProps): React.ReactElement;
export declare function Table(props: { className?: string; children?: React.ReactNode }): React.ReactElement;
/** ui/timeline-step: year (UI/Number; muted past, dark now), dot (hollow past, filled now), title UI/Title, description UI/Body. 4–6 in a row with one 1px Taupe 400 line through the dots. */
export interface TimelineStepProps { state?: 'past' | 'now'; year: string; title: string; description?: string; className?: string }
export declare function TimelineStep(props: TimelineStepProps): React.ReactElement;
export type Hue = 'periwinkle' | 'seafoam' | 'gold' | 'coral' | 'orchid' | 'lavender' | 'sage';
/** ui/badge: 2-letter initials in a colour circle (32 = Sans Medium 14, 28 = Sans Medium 12). People: dark by default, pink for the focus person. */
export declare function Badge(props: { initials: string; colour?: Hue | 'neutral' | 'dark' | 'pink'; size?: 32 | 28; className?: string }): React.ReactElement;
/** ui/label: colour dot + UI/Label, no fill; lighter alternative to CategoryTag for legends and section headers. */
export declare function Label(props: { colour?: Hue; className?: string; children?: React.ReactNode }): React.ReactElement;
/** ui/member-row: dark initials badge, name UI/Action, scope UI/Body muted, role tag (neutral). selected = pink tint, pink badge and tag. Inside a bordered Table; max 6. */
export declare function MemberRow(props: { initials: string; name: string; scope?: string; role?: string; selected?: boolean; className?: string }): React.ReactElement;
/** ui/kv-row: key UI/Title (260 wide), value UI/Body muted; divider on top; under a UI/Label heading; max 6. */
export declare function KvRow(props: { label: string; value: string; className?: string }): React.ReactElement;
/** ui/stat: UI/Number over UI/Meta caption; 2–3 in a row with 1px Taupe 300 dividers. */
export declare function Stat(props: { value: string; caption: string; className?: string }): React.ReactElement;
/** ui/field: text area or select (caret); focus = 1.5px pink outline. Taupe 50, radius 10, UI/Body. Width 560 default. */
export declare function Field(props: { value: string; type?: 'text' | 'select'; focus?: boolean; width?: number; className?: string }): React.ReactElement;
/** ui/toggle: 36 × 20; on = pink 400, off = Taupe 300. */
export declare function Toggle(props: { on?: boolean; className?: string }): React.ReactElement;
/** ui/attachment: type label (UI/Micro) + name (UI/Body); skill = pink 100, pink 300 border. */
export declare function Attachment(props: { name: string; type?: string; kind?: 'file' | 'skill'; className?: string }): React.ReactElement;
/** ui/item: one capability, UI/Body on a bordered Taupe 50 box (radius 10, padding 9/12); dashed = optional or swappable. Stack with 8px gaps, max 6. */
export declare function Item(props: { dashed?: boolean; width?: number; className?: string; children?: React.ReactNode }): React.ReactElement;
/** ui/node: optional preview + glyph and title (UI/Title), description (UI/Body), owner category tag. Width 460, radius 16. */
export declare function Node(props: { title: string; description?: string; icon?: React.ReactNode; preview?: React.ReactNode; owner?: string; ownerColour?: Hue; className?: string }): React.ReactElement;
/** ui/insight-bar: gold 100 bar, warning tag + one sentence (UI/Body) + optional primary Button. One per visual. */
export declare function InsightBar(props: { tag?: string; action?: React.ReactNode; className?: string; children?: React.ReactNode }): React.ReactElement;
/** ui/commit-row: node (Studio = pink ring on pink tint, other = grey ring), hash UI/Code muted, message UI/Body (wraps), author muted, source tag (Studio = pink, others neutral). Stack on a 2px vertical line; max 6. */
export declare function CommitRow(props: { hash: string; message: string; author?: string; source?: string; className?: string }): React.ReactElement;
/** ui/code-window: dark editor (Taupe 950, radius 16), three dots, UI/Code in Taupe 100. Syntax spans: .kw Taupe 500, .nm Periwinkle 200, .str Seafoam 300, .val Gold 400. Width 740. */
export declare function CodeWindow(props: { width?: number; title?: string; className?: string; children?: React.ReactNode }): React.ReactElement;
export declare function FileCard(props: { path: string; branch?: string; width?: number; footer?: React.ReactNode; className?: string; children?: React.ReactNode }): React.ReactElement;
/** ui/strictness: five 56 × 10 segments, filled graded Taupe 300 → 400 → 500 → 700 → 950, empty Taupe 200. level 1 (agent decides) – 5 (exact steps). */
export declare function Strictness(props: { level: 1 | 2 | 3 | 4 | 5; className?: string }): React.ReactElement;
/** ui/strictness-row: icon tile, name (UI/Title), Strictness bar; selected = Taupe 100 fill, 1.5px Taupe 300 outline. */
export declare function StrictnessRow(props: { name: string; level: 1 | 2 | 3 | 4 | 5; icon?: React.ReactNode; selected?: boolean; className?: string }): React.ReactElement;
/** ui/phase-card: phase label + duration tag, icon tile, title UI/Heading, description UI/Body, optional mini (MiniVisual squares), Outcome over a divider. Row of 3–4. */
export declare function PhaseCard(props: { phase: string; duration?: string; title: string; description: string; icon?: React.ReactNode; mini?: React.ReactNode; outcome?: string; width?: number; className?: string }): React.ReactElement;
/** ui/env-card: icon tile, title UI/Heading, one-line subtitle UI/Body. 3–5 in a row, equal widths. */
export declare function EnvCard(props: { title: string; subtitle: string; icon?: React.ReactNode; width?: number; className?: string }): React.ReactElement;
/** ui/feature-card: preview area (Taupe 100, radius 10, holds a MiniVisual or Preview), title UI/Feature (Serif 28) with the emphasis part in black italic, description UI/Body. 2–4 in a grid. */
export declare function FeatureCard(props: { title: string; emphasis?: string; description: string; preview?: React.ReactNode; width?: number; className?: string }): React.ReactElement;
/** ui/marker: pink numbered circle (28) + label (UI/Title); align end puts the number on the right. Max 6. */
export declare function Marker(props: { number: number | string; label: string; align?: 'start' | 'end'; className?: string }): React.ReactElement;
/** ui/preview: tiny channel preview (120 × 88, radius 12). Colour = team colour: background hue 100 (gold 200, lavender original 30%), light shapes 300 (gold 500, lavender 500), accent 700. Text Taupe. */
export declare function Preview(props: { type?: 'call' | 'app' | 'assist'; colour?: Hue; title?: string; meta?: string; className?: string }): React.ReactElement;
/** ui/mini/*: decorative mini previews exported from Figma. flags (flagged conversations), doc (drafted fix), dots (simulated runs), timeline (release pipeline), squares stage a–d (phase progress). */
export declare function MiniVisual(props: { kind: 'flags' | 'doc' | 'dots' | 'timeline' | 'squares'; stage?: 'a' | 'b' | 'c' | 'd'; className?: string }): React.ReactElement;
/** slides/page-number: Mono, two digits and a full stop (04.), bottom right at x 1840, y 1032. */
export declare function PageNumber(props: { number: number; className?: string }): React.ReactElement;
/** slides/pill: industry or topic tag, Mono 18 uppercase, height 32, padding 4/24, radius 32, the industry's lead hue. */
export declare function Pill(props: { colour?: Hue; className?: string; children?: React.ReactNode }): React.ReactElement;
/** slides/button: one per slide, sentence case, verb first, max 4 words. Action style, padding 16/40, radius 4. Light theme = dark button; dark theme = Taupe 100 button. */
export declare function SlideButton(props: { theme?: 'light' | 'dark'; className?: string; children?: React.ReactNode }): React.ReactElement;
/** slides/card/proof: sector (Mono) + industry pill; name Statement (1 line); figure Big number (max 4 characters); label Body (max 6 words). Width 560, padding 40, radius 32, 1px border, no fill. */
export declare function ProofCard(props: { sector: string; pill?: string; pillColour?: Hue; name: string; figure: string; label: string; theme?: 'light' | 'dark'; className?: string }): React.ReactElement;
/** Rasa R mark (inline SVG). */
export interface RasaMarkProps { size?: number; color?: string }
export declare function RasaMark(props: RasaMarkProps): React.ReactElement;
/** One stop on a linear flow. */
export interface FlowStationProps { index?: string; label: string; detail?: string; state?: 'default' | 'active' | 'done'; width?: number }
export declare function FlowStation(props: FlowStationProps): React.ReactElement;
/** Linear flow of 3–6 stations on a track. */
export interface FlowProps { steps?: Array<{ label: string; detail?: string; state?: 'default' | 'active' | 'done' }>; width?: number }
export declare function Flow(props: FlowProps): React.ReactElement;
/** Annotation pointing into a visual. */
export interface CalloutProps { title?: string; detail?: string; side?: 'right' | 'left'; width?: number }
export declare function Callout(props: CalloutProps): React.ReactElement;
/** Hub and spoke with orthogonal connectors. */
export interface HubProps { center?: string; caption?: string; items?: Array<{ label: string; hue?: 'periwinkle' | 'seafoam' | 'gold' | 'coral' | 'orchid' | 'lavender' | 'sage' }>; focus?: number; width?: number; height?: number }
export declare function Hub(props: HubProps): React.ReactElement;
/** One team release loop. */
export interface TeamLoopProps { team?: string }
export declare function TeamLoop(props: TeamLoopProps): React.ReactElement;
/** Team loops inside the platform frame. */
export interface TeamLoopsProps { teams?: string[]; title?: string; subtitle?: string }
export declare function TeamLoops(props: TeamLoopsProps): React.ReactElement;
/** Four-team venn with the Rasa core. */
export interface VennProps { teams?: string[]; coe?: string; footer?: string }
export declare function Venn(props: VennProps): React.ReactElement;
/** Platform as orbits. */
export interface VennOrbitProps { teams?: string[]; coe?: string; core?: string; footer?: string }
export declare function VennOrbit(props: VennOrbitProps): React.ReactElement;
/** 2×2 positioning. */
export interface QuadrantProps { items?: Array<{ title: string; text: string; focus?: boolean }>; axes?: [string, string, string, string] }
export declare function Quadrant(props: QuadrantProps): React.ReactElement;
/** Prompt assembly. */
export interface LayerStackProps { title?: string; caption?: string; layers?: any[]; points?: Array<[string, string]> }
export declare function LayerStack(props: LayerStackProps): React.ReactElement;

/** Progressive control, dial track. */
export interface RampTrackProps { levers?: Array<[string, string, string]>; low?: string; high?: string; width?: number }
export declare function RampTrack(props: RampTrackProps): React.ReactElement;
/** Progressive control, rising bars. */
export interface RampBarsProps { levers?: Array<[string, string, string]>; low?: string; high?: string; width?: number }
export declare function RampBars(props: RampBarsProps): React.ReactElement;
/** One call as a trace. spans: [name, depth, start s, duration s, owner 0|1|2]. */
export interface TraceProps { spans?: Array<[string, number, number, number, number]>; seconds?: number; title?: string }
export declare function Trace(props: TraceProps): React.ReactElement;
/** One KPI. */
export interface KpiTileProps { label?: string; value?: string; delta?: string; width?: number }
export declare function KpiTile(props: KpiTileProps): React.ReactElement;
/** Analytics moment. */
export interface DashboardProps { path?: string; env?: string; kpis?: Array<[string, string, string?]>; donut?: Array<[string, number, string]>; width?: number }
export declare function Dashboard(props: DashboardProps): React.ReactElement;
/** Proof stat card. */
export interface NumeralStatProps { perRow?: 3 | 4 | 5; numeral?: string | false; claim?: string; detail?: string; highlight?: string }
export declare function NumeralStat(props: NumeralStatProps): React.ReactElement;
/** Row of numeral stats. */
export interface NumeralStatsProps { items?: NumeralStatProps[]; numeral?: boolean }
export declare function NumeralStats(props: NumeralStatsProps): React.ReactElement;
/** Before/after values. [version, value, detail] */
export interface CompareStatProps { before?: [string, string, string]; after?: [string, string, string] }
export declare function CompareStat(props: CompareStatProps): React.ReactElement;
/** Test run dots. */
export interface DotGridProps { cols?: number; rows?: number; passRate?: number }
export declare function DotGrid(props: DotGridProps): React.ReactElement;

/** Two code windows, before and after. */
export interface CodeBeforeAfterProps { before?: string[]; after?: string[]; beforeCaption?: string; afterCaption?: string; title?: string; width?: number }
export declare function CodeBeforeAfter(props: CodeBeforeAfterProps): React.ReactElement;
/** Code window with highlighted lines and callouts. */
export interface CodeAnnotatedProps { lines?: string[]; notes?: Array<{ line: number; title: string; detail?: string }>; title?: string; width?: number }
export declare function CodeAnnotated(props: CodeAnnotatedProps): React.ReactElement;
/** Light code diff. lines: [kind, text]; kind ' ' | '+' | '-' | 'f' (file) | 'm' (marker). */
export interface CodeDiffProps { lines?: Array<[string, string]>; width?: number }
export declare function CodeDiff(props: CodeDiffProps): React.ReactElement;
export interface TreeRowProps { name: string; kind?: 'folder' | 'file'; depth?: number; note?: string; highlight?: boolean }
export declare function TreeRow(props: TreeRowProps): React.ReactElement;
export interface FileTreeProps { rows?: TreeRowProps[]; width?: number }
export declare function FileTree(props: FileTreeProps): React.ReactElement;
export interface RuleRowProps { number: string; rule: string; detail?: string; tag?: string }
export declare function RuleRow(props: RuleRowProps): React.ReactElement;
export interface RuleListProps { rules?: Array<[string, string, string?, string?]>; width?: number }
export declare function RuleList(props: RuleListProps): React.ReactElement;
export interface StackBlockProps { name?: string; status?: string; state?: 'active' | 'waiting' | 'paused' | 'done' }
export declare function StackBlock(props: StackBlockProps): React.ReactElement;
/** steps: [label, message, event, [[skill, state]], caption] */
export interface SkillStackProps { steps?: any[] }
export declare function SkillStack(props: SkillStackProps): React.ReactElement;
export interface ThreadEventProps { focus?: boolean; children?: React.ReactNode }
export declare function ThreadEvent(props: ThreadEventProps): React.ReactElement;
/** turns: ['u' | 'a' | 'e', text, focus?] */
export interface ChatThreadProps { turns?: Array<[string, string, boolean?]>; width?: number }
export declare function ChatThread(props: ChatThreadProps): React.ReactElement;
export interface TerminalStepProps { command: string; title: string; detail?: string }
export declare function TerminalStep(props: TerminalStepProps): React.ReactElement;
export interface TerminalStepsProps { steps?: Array<[string, string, string]> }
export declare function TerminalSteps(props: TerminalStepsProps): React.ReactElement;
export interface VoiceCallProps { theme?: 'light' | 'dark'; markers?: Array<[number, string]> }
export declare function VoiceCall(props: VoiceCallProps): React.ReactElement;

export interface PillCloudProps { rows?: Array<Array<[string, 'p' | 'b' | 't', 1?]>>; size?: number }
export declare function PillCloud(props: PillCloudProps): React.ReactElement;
export interface DocThumbProps { name?: string; highlight?: boolean }
export declare function DocThumb(props: DocThumbProps): React.ReactElement;
export interface DocGridProps { names?: string[]; highlight?: number }
export declare function DocGrid(props: DocGridProps): React.ReactElement;
export interface DeployTargetProps { index?: string; title?: string; subtitle?: string; command?: string; detail?: string; icon?: 'laptop' | 'cloud' | 'drives'; focus?: boolean }
export declare function DeployTarget(props: DeployTargetProps): React.ReactElement;
export interface DeployTargetsProps { targets?: DeployTargetProps[] }
export declare function DeployTargets(props: DeployTargetsProps): React.ReactElement;
export interface SkeletonProps { kind?: 'line' | 'row' | 'text' | 'card'; width?: number | string }
export declare function Skeleton(props: SkeletonProps): React.ReactElement;
export interface ResourceChipProps { type?: 'tool' | 'reference'; children?: React.ReactNode }
export declare function ResourceChip(props: ResourceChipProps): React.ReactElement;
export interface SkillProseProps { eyebrow?: string; text?: string; highlight?: string; resources?: Array<['tool' | 'reference', string]>; width?: number | string }
export declare function SkillProse(props: SkillProseProps): React.ReactElement;
export interface CollabCursorProps { role?: 'business' | 'developer'; name?: string }
export declare function CollabCursor(props: CollabCursorProps): React.ReactElement;
export interface AvatarStackProps { people?: Array<[string, string]> }
export declare function AvatarStack(props: AvatarStackProps): React.ReactElement;
export interface InsightCardProps { tag?: string; width?: number | string; children?: React.ReactNode }
export declare function InsightCard(props: InsightCardProps): React.ReactElement;
export interface RunCardProps { state?: 'passed' | 'edited'; title?: string; detail?: string; width?: number | string }
export declare function RunCard(props: RunCardProps): React.ReactElement;
export interface StudioShellProps { size?: 'wide' | 'square'; agent?: string; tabs?: string[]; activeTab?: string; copilot?: React.ReactNode; workspace?: React.ReactNode }
export declare function StudioShell(props: StudioShellProps): React.ReactElement;

declare global { interface Window { RasaNewBrand: { Button: typeof Button; StatusTag: typeof StatusTag; CategoryTag: typeof CategoryTag; Chip: typeof Chip; ChatBubble: typeof ChatBubble; WindowBar: typeof WindowBar; ProductWindow: typeof ProductWindow; ConceptCard: typeof ConceptCard; VisualContainer: typeof VisualContainer; ResultRow: typeof ResultRow; ResultList: typeof ResultList; Notice: typeof Notice; StepTab: typeof StepTab; StepTabs: typeof StepTabs; Metric: typeof Metric; TableRow: typeof TableRow; Table: typeof Table; TimelineStep: typeof TimelineStep; Badge: typeof Badge; Label: typeof Label; MemberRow: typeof MemberRow; KvRow: typeof KvRow; Stat: typeof Stat; Field: typeof Field; Toggle: typeof Toggle; Attachment: typeof Attachment; Item: typeof Item; Node: typeof Node; InsightBar: typeof InsightBar; CommitRow: typeof CommitRow; CodeWindow: typeof CodeWindow; FileCard: typeof FileCard; Strictness: typeof Strictness; StrictnessRow: typeof StrictnessRow; PhaseCard: typeof PhaseCard; EnvCard: typeof EnvCard; FeatureCard: typeof FeatureCard; Marker: typeof Marker; Preview: typeof Preview; MiniVisual: typeof MiniVisual; PageNumber: typeof PageNumber; Pill: typeof Pill; SlideButton: typeof SlideButton; ProofCard: typeof ProofCard; RasaMark: typeof RasaMark; FlowStation: typeof FlowStation; Flow: typeof Flow; Callout: typeof Callout; Hub: typeof Hub; TeamLoop: typeof TeamLoop; TeamLoops: typeof TeamLoops; Venn: typeof Venn; VennOrbit: typeof VennOrbit; Quadrant: typeof Quadrant; LayerStack: typeof LayerStack; RampTrack: typeof RampTrack; RampBars: typeof RampBars; Trace: typeof Trace; KpiTile: typeof KpiTile; Dashboard: typeof Dashboard; NumeralStat: typeof NumeralStat; NumeralStats: typeof NumeralStats; CompareStat: typeof CompareStat; DotGrid: typeof DotGrid; CodeBeforeAfter: typeof CodeBeforeAfter; CodeAnnotated: typeof CodeAnnotated; CodeDiff: typeof CodeDiff; TreeRow: typeof TreeRow; FileTree: typeof FileTree; RuleRow: typeof RuleRow; RuleList: typeof RuleList; StackBlock: typeof StackBlock; SkillStack: typeof SkillStack; ThreadEvent: typeof ThreadEvent; ChatThread: typeof ChatThread; TerminalStep: typeof TerminalStep; TerminalSteps: typeof TerminalSteps; VoiceCall: typeof VoiceCall; PillCloud: typeof PillCloud; DocThumb: typeof DocThumb; DocGrid: typeof DocGrid; DeployTarget: typeof DeployTarget; DeployTargets: typeof DeployTargets; Skeleton: typeof Skeleton; ResourceChip: typeof ResourceChip; SkillProse: typeof SkillProse; CollabCursor: typeof CollabCursor; AvatarStack: typeof AvatarStack; InsightCard: typeof InsightCard; RunCard: typeof RunCard; StudioShell: typeof StudioShell } } }

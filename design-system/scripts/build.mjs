import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
// Generates dist/ from src/tokens.json. src/tokens.json mirrors the Rasa Brand 2026 design system
// (scripts/sync-tokens-from-design-system.py); do not hand-edit generated files.
const base=path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const t=JSON.parse(fs.readFileSync(path.join(base,'src/tokens.json'),'utf8'));
const resolve=ref=>{if(ref.startsWith('#'))return ref;const [f,s]=ref.split('.');const v=t.color[f]?.[s];if(!v)throw new Error('Unknown colour '+ref);return v;};
const cssRef=ref=>ref.startsWith('#')?ref:`var(--rasa-${ref.replace('.','-')})`;
// Friendly web aliases, named after the design system's roles.
const aliases={
  bg:'taupe.100','bg-bright':'taupe.50','bg-subtle':'taupe.200','bg-muted':'taupe.250',
  fg:'taupe.950','fg-muted':'taupe.700','fg-subtle':'taupe.500','fg-inverted':'taupe.50',
  hairline:'taupe.300',border:'taupe.300','border-strong':'taupe.400',
  accent:'pink.400','accent-subtle':'pink.100','accent-solid':'pink.600',
  link:t.accessible.link,focus:t.accessible.focus,'control-border':t.accessible['control-border'],
};
// Deprecated names from the October package. Kept so existing consumers keep working; the Ink scale is retired.
const deprecated={ink:'fg',muted:'bg-muted','text-muted':'fg-muted','text-subtle':'fg-subtle','accent-soft':'accent-subtle','accent-ink':'accent-solid'};
const ui=Object.fromEntries(Object.entries(aliases).map(([k,v])=>[k,resolve(v)]));
const status=Object.fromEntries(Object.entries(t.status).map(([k,v])=>[k,{bg:resolve(v.bg),fg:resolve(v.fg),meaning:v.meaning}]));
const themes=Object.fromEntries(Object.entries(t.themes).map(([k,v])=>[k,Object.fromEntries(Object.entries(v).map(([r,ref])=>[r,resolve(ref)]))]));
const code=Object.fromEntries(Object.entries(t.code).map(([k,v])=>[k,resolve(v)]));
const tokens={...t,ui,resolved:{status,themes,code}};
fs.mkdirSync(path.join(base,'dist'),{recursive:true});
const write=(name,body)=>fs.writeFileSync(path.join(base,'dist',name),body+'\n');
write('tokens.mjs','// Generated from src/tokens.json. Do not edit.\nexport const tokens = '+JSON.stringify(tokens,null,2)+';\nexport default tokens;');
const type=v=>v===null?'null':typeof v==='string'?JSON.stringify(v):typeof v==='number'||typeof v==='boolean'?String(v):Array.isArray(v)?`readonly [${v.map(type).join(', ')}]`:'{'+Object.entries(v).map(([k,v])=>`readonly ${JSON.stringify(k)}: ${type(v)}`).join(';')+'}';
write('tokens.d.ts','export declare const tokens: '+type(tokens)+';\nexport default tokens;');
write('tokens.d.mts','export declare const tokens: '+type(tokens)+';\nexport default tokens;');
const lines=[];
for(const [f,scale] of Object.entries(t.color))for(const [s,val] of Object.entries(scale))lines.push(`--rasa-${f}-${s}: ${val};`);
for(const [k,v] of Object.entries(t.semantic))lines.push(`--rasa-${k}: ${cssRef(v)};`);
for(const [k,v] of Object.entries(aliases))if(!(k in t.semantic)&&!(k in t.themes.light))lines.push(`--rasa-${k}: ${cssRef(v)};`); // theme roles (fg, fg-muted, accent, hairline, surface…) are set per theme below
for(const [k,v] of Object.entries(deprecated))lines.push(`--rasa-${k}: var(--rasa-${v}); /* deprecated: use --rasa-${v} */`);
for(const [k,v] of Object.entries(t.status)){lines.push(`--rasa-status-${k}-bg: ${cssRef(v.bg)};`);lines.push(`--rasa-status-${k}-fg: ${cssRef(v.fg)};`);}
for(const [k,v] of Object.entries(t.code))lines.push(`--rasa-code-${k}: ${cssRef(v)};`);
for(const [k,v] of Object.entries(t.font))lines.push(`--rasa-font-${k}: ${v};`);
for(const [k,v] of Object.entries(t.weight))lines.push(`--rasa-weight-${k}: ${v};`);
for(const [k,v] of Object.entries(t.space))lines.push(`--rasa-space-${k}: ${v/16}rem;`);
for(const [k,v] of Object.entries(t.radius))lines.push(`--rasa-radius-${k}: ${v}px;`);
for(const [k,v] of Object.entries(t.borderWidth))lines.push(`--rasa-border-${k}: ${v}px;`);
for(const [k,v] of Object.entries(t.slides))lines.push(`--rasa-slide-${k}: ${v}px;`);
for(const k of ['fast','standard','reveal','stagger'])lines.push(`--rasa-motion-${k}: ${t.motion[k]}ms;`);
for(const [k,v] of Object.entries(t.layout)) lines.push(`--rasa-layout-${k}: ${v}px;`);
for(const [name,s] of Object.entries(t.textStyles)) lines.push(`--rasa-text-${name}: ${s.fontStyle?s.fontStyle+' ':''}${s.fontWeight} ${s.fontSize}/${s.lineHeight} var(--rasa-font-${s.family});`);
for(const [name,recipe] of Object.entries(t.typography)) {
  lines.push(`--rasa-type-${name}-weight: ${recipe.weight};`);
  for(const size of ['desktop','tablet','mobile']) {const values=recipe[size]??recipe.desktop;for(const [k,v] of Object.entries(values))lines.push(`--rasa-type-${name}-${size}-${k}: ${v};`);}
}
lines.push(`--rasa-ease: cubic-bezier(${t.motion.ease.join(',')});`);
const themeBlock=(sel,th)=>`${sel} {\n  `+Object.entries(t.themes[th]).map(([r,ref])=>`--rasa-${r}: ${cssRef(ref)};`).join('\n  ')+'\n}';
write('tokens.css','/* Generated from src/tokens.json (Rasa Brand 2026). Values apply without imposing a CSS reset. */\n:root {\n  '+lines.join('\n  ')+'\n}\n'+themeBlock(':root, .rasa-light, [data-theme="light"]','light')+'\n'+themeBlock('.rasa-dark, [data-theme="dark"]','dark'));
let theme=[];
for(const [f,scale] of Object.entries(t.color))for(const s of Object.keys(scale))theme.push(`--color-rasa-${f}-${s}: var(--rasa-${f}-${s});`);
for(const k of Object.keys(aliases))theme.push(`--color-rasa-${k}: var(--rasa-${k});`);
for(const k of Object.keys(t.themes.light))theme.push(`--color-rasa-theme-${k}: var(--rasa-${k});`);
for(const k of Object.keys(t.font))theme.push(`--font-rasa-${k}: var(--rasa-font-${k});`);
for(const k of Object.keys(t.radius))theme.push(`--radius-rasa-${k}: var(--rasa-radius-${k});`);
theme.push(`--font-weight-rasa-book: ${t.weight.book};`,'--breakpoint-rasa-tablet: 48rem;','--breakpoint-rasa-desktop: 62rem;');
write('tailwind-v4.css','@import "./tokens.css";\n@theme inline {\n  '+theme.join('\n  ')+'\n}');
const preset={theme:{extend:{colors:{rasa:{...t.color,...ui}},fontFamily:Object.fromEntries(Object.entries(t.font).map(([k,v])=>['rasa-'+k,v.split(',').map(x=>x.trim())])),fontWeight:{'rasa-book':t.weight.book},borderRadius:Object.fromEntries(Object.entries(t.radius).map(([k,v])=>['rasa-'+k,v+'px'])),screens:{'rasa-tablet':'768px','rasa-desktop':'992px'}}}};
write('tailwind-v3.cjs','// Generated. Does not replace host content scanning or plugins.\nmodule.exports = '+JSON.stringify(preset,null,2)+';');
console.log('Generated CSS, Tailwind 3/4, JavaScript, and TypeScript declarations from the Rasa Brand 2026 tokens.');

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {tokens as t} from '../dist/tokens.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const linear=v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;};
const lum=hex=>{const rgb=hex.slice(1).match(/../g).map(v=>linear(parseInt(v,16)));return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;};
const contrast=(a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
const c=ref=>{const [f,s]=ref.split('.');const v=t.color[f]?.[s];assert(v,`Unknown colour ${ref}`);return v;};
// 1. Every role resolves.
for (const [role,ref] of Object.entries(t.semantic)) c(ref);
for (const th of Object.values(t.themes)) for (const ref of Object.values(th)) c(ref);
for (const s of Object.values(t.status)) {c(s.bg);c(s.fg);}
for (const ref of Object.values(t.code)) c(ref);
// 2. No drift from the Rasa Brand 2026 design-system mirror.
const ds=JSON.parse(fs.readFileSync(path.join(root,'design-system/rasa-brand-2026/tokens.json'),'utf8'));
const hex=Object.fromEntries(ds.color.tokens.filter(x=>typeof x.value==='string'&&x.value.startsWith('#')).map(x=>[x.name,x.value.toUpperCase()]));
for (const [f,scale] of Object.entries(t.color)) for (const [s,v] of Object.entries(scale)) assert.equal(v,hex[`${f}-${s}`],`Palette drift ${f}-${s}`);
assert.equal(Object.keys(hex).length,Object.values(t.color).reduce((n,s)=>n+Object.keys(s).length,0),'Palette size differs from the design system');
const styles=ds.type.groups.flatMap(g=>g.styles);
for (const s of styles){const m=t.textStyles[s.name];assert(m,`Missing text style ${s.name}`);for(const k of ['fontSize','lineHeight','fontWeight','family'])assert.equal(m[k],s[k],`Text style drift ${s.name}.${k}`);}
assert.equal(t.weight.book,300,'STK Bureau Book is weight 300');
for (const fam of ['serif','sans','mono']) assert.equal(t.font[fam],ds.type.families[fam],`Font stack drift ${fam}`);
// 3. Community card colours stay inside the brand palette.
const palette=new Set(Object.values(hex).map(v=>v.toLowerCase()));
const walk=(o,where)=>{for(const [k,v] of Object.entries(o)){if(typeof v==='string'&&/^#[0-9a-f]{6}$/i.test(v))assert(palette.has(v.toLowerCase()),`Off-palette community colour ${where}.${k} ${v}`);else if(v&&typeof v==='object')walk(v,`${where}.${k}`);}};
walk(t.community,'community');
// 4. Contrast: the pairs the design system names, plus the web package's accessible adaptations.
const ui=t.ui;
const pairs=[
 ['Taupe Dark on Taupe Light (all text)',c('taupe.950'),c('taupe.100'),4.5],
 ['Rasa Pink on Taupe Dark (all text)',c('pink.400'),c('taupe.950'),4.5],
 ['Muted text (fg-muted) on Taupe Light',c('taupe.700'),c('taupe.100'),4.5],
 ['Dark theme muted text on Taupe Dark',c('taupe.400'),c('taupe.950'),4.5],
 ['Link / focus (pink 600) on Taupe Light',ui.link,c('taupe.100'),4.5],
 ['Primary button label',c('taupe.100'),c('taupe.950'),4.5],
 ['Input border on Taupe 50',ui['control-border'],c('taupe.50'),3],
 ...Object.entries(t.status).map(([k,s])=>[`Status ${k}`,c(s.fg),c(s.bg),4.5]),
];
const rows=[];
for(const [name,fg,bg,min] of pairs){const ratio=contrast(fg,bg);assert(ratio>=min,`${name}: ${ratio}`);rows.push({name,fg,bg,ratio:Number(ratio.toFixed(2)),threshold:min,result:'pass'});}
for(const [name,fg,bg,note] of [
 ['Rasa Pink on Taupe Light',c('pink.400'),c('taupe.100'),'24px and above, and graphics only'],
 ['fg-subtle (taupe 500) on Taupe Light',c('taupe.500'),c('taupe.100'),'secondary detail only, never body text'],
 ['Hairline (taupe 300) on Taupe 50',c('taupe.300'),c('taupe.50'),'decorative divider, not an essential boundary'],
])rows.push({name,fg,bg,ratio:Number(contrast(fg,bg).toFixed(2)),threshold:null,result:'restricted: '+note});
fs.writeFileSync(path.join(root,'evidence/contrast.json'),JSON.stringify(rows,null,2)+'\n');
console.log(`Roles resolve; tokens match the Rasa Brand 2026 mirror; community colours on palette; ${pairs.length} accessible pairs pass.`);

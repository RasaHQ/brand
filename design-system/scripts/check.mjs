import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {tokens as t} from '../dist/tokens.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const linear=v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;};
const lum=hex=>{const rgb=hex.slice(1).match(/../g).map(v=>linear(parseInt(v,16)));return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;};
const contrast=(a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
for (const [role,ref] of Object.entries(t.semantic)) {const [f,s]=ref.split('.');assert(t.color[f]?.[s],`Invalid alias ${role}`);}
const pairs=[['Main text',t.ui.ink,t.ui.bg,4.5],['Muted text',t.ui['text-muted'],t.ui.bg,4.5],['Accessible link',t.ui.link,t.ui.bg,4.5],['Primary CTA',t.ui.surface,t.ui.ink,4.5],['Pink CTA / ink text',t.ui.ink,t.ui.accent,4.5],['Focus / cream',t.ui.focus,t.ui.bg,3],['Input border / panel',t.ui['control-border'],t.ui.surface,3],['Success label',t.illustration['success-ink'],t.illustration.mint,4.5],['Warning label',t.illustration['yellow-ink'],t.illustration['yellow-soft'],4.5],['Error label',t.ui['accent-ink'],t.ui['accent-soft'],4.5]];
let rows=[];
for(const [name,fg,bg,min] of pairs){const ratio=contrast(fg,bg);assert(ratio>=min,`${name}: ${ratio}`);rows.push({name,fg,bg,ratio:Number(ratio.toFixed(2)),threshold:min,result:'pass'});}
for(const [name,fg,bg] of [['Bright pink text on cream',t.ui.accent,t.ui.bg],['White text on pink','#FFFFFF',t.ui.accent],['Subtle text on cream',t.ui['text-subtle'],t.ui.bg],['Decorative border on panel',t.ui.border,t.ui.surface]])rows.push({name,fg,bg,ratio:Number(contrast(fg,bg).toFixed(2)),threshold:null,result:'reference only'});
fs.writeFileSync(path.join(root,'evidence/contrast.json'),JSON.stringify(rows,null,2)+'\n');
console.log('Semantic aliases resolve. All 10 intended accessible color pairs pass.');

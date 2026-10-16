#!/usr/bin/env python3
"""Generate WebP derivatives and an offline, searchable asset gallery. Requires Pillow."""
from pathlib import Path
import hashlib,json,html
from PIL import Image
R=Path(__file__).resolve().parents[1]
p=R/'assets/catalog.json';catalog=json.loads(p.read_text());assets=[a for a in catalog['assets'] if not a.get('derivedFrom')]
for a in list(assets):
 if a['category']!='pattern' or a['format']!='png':continue
 dest=Path(a['path'].replace('/png/','/web/')).with_suffix('.webp');(R/dest).parent.mkdir(parents=True,exist_ok=True)
 with Image.open(R/a['path']) as im:
  im=im.convert('RGB');im.thumbnail((1200,1200));im.save(R/dest,'WEBP',quality=86,method=6);w,h=im.size
 b=(R/dest).read_bytes();assets.append({**a,'path':str(dest),'format':'webp','sha256':hashlib.sha256(b).hexdigest(),'bytes':len(b),'width':w,'height':h,'derivedFrom':a['path'],'roles':['web-background'],'derivation':{'tool':'Pillow','format':'WebP','quality':86,'method':6,'maxSize':1200}})
for a in assets:a['id']=a['path'].removeprefix('assets/').replace('/','.')
assets.sort(key=lambda a:a['path']);catalog['assets']=assets;p.write_text(json.dumps(catalog,indent=2)+'\n')
# Render static HTML: no fetch, works from file:// as well as a local HTTP server.
cards=[]
for a in assets:
 if a['status']!='current' or not ((a['category'] in ['logo','icon'] and a['format']=='svg') or a['format']=='webp'):continue
 bg='#181210' if 'cream' in a['path'] else '#FAF6F0';label=a['id'];src=html.escape(a['path'],quote=True)
 cards.append(f'<article data-search="{html.escape(label)}"><div class="art" style="background:{bg}"><img loading="lazy" src="{src}" alt="{html.escape(label)}"></div><h2>{html.escape(Path(a["path"]).stem)}</h2><p>{a["category"]} · {a.get("tier", "current")} · {round(a["bytes"]/1024,1)} KB</p><code>{html.escape(label)}</code><p><a href="{src}">Open asset</a></p></article>')
(R/'asset-gallery.html').write_text('''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Rasa asset gallery</title><style>
*{box-sizing:border-box}body{margin:0;background:#FAF6F0;color:#181210;font:16px/1.5 Arial,sans-serif}header,main{max-width:1440px;padding:32px;margin:auto}h1{font:48px/1.1 Georgia,serif;margin:16px 0}header p{max-width:70ch}input{font:inherit;padding:14px;width:100%;max-width:600px;border:1px solid #696157;border-radius:4px}input:focus-visible,a:focus-visible{outline:3px solid #AA1E54;outline-offset:3px}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:24px}article{background:#FFFBF5;border:1px solid #C8C0B6;padding:16px;border-radius:12px;min-width:0}article[hidden]{display:none}.art{height:200px;display:grid;place-items:center;overflow:hidden;border-radius:4px}.art img{max-height:200px;max-width:100%;object-fit:contain}h2{font-size:18px}code{overflow-wrap:anywhere;font-size:12px}a{color:#AA1E54}@media(max-width:500px){header,main{padding:20px}h1{font-size:36px}}
</style><header><p>RASA / OCTOBER 2026</p><h1>Build from the real assets.</h1><p>Supplied logo masters, current icons, and optimized patterns. Patterns are decorative: keep text in a quiet region or solid panel. The primary set is Soundwave and Chladni. See docs/assets.md for usage and source conflicts.</p><label for="filter">Find by name, category, tier, or tone</label><br><input id="filter" type="search" placeholder="Try primary, soundwave, voice, or cream"><p id="count" aria-live="polite"></p></header><main class="grid">'''+''.join(cards)+'''</main><script>
const input=document.querySelector('input'),cards=[...document.querySelectorAll('article')];function filter(){let count=0;for(const c of cards){c.hidden=!c.dataset.search.includes(input.value.toLowerCase());if(!c.hidden)count++;}document.querySelector('#count').textContent=count+' assets';}input.addEventListener('input',filter);filter();</script></html>''')
print(f'Catalog: {len(assets)} assets; gallery: {len(cards)}; WebP total: {sum(a["bytes"] for a in assets if a["format"]=="webp")} bytes')

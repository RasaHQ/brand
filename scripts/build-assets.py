#!/usr/bin/env python3
"""Generate WebP derivatives and GitHub-readable asset references. Requires Pillow."""
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
# Keep GitHub-readable references in sync with the machine catalog.
import runpy
runpy.run_path(str(R/'scripts/build-catalog-docs.py'), run_name='__main__')
print(f'Catalog: {len(assets)} assets; Markdown references generated.')

#!/usr/bin/env python3
"""Query the brand catalog or copy only selected current assets to an app's public directory."""
from pathlib import Path
import argparse,json,shutil,hashlib
R=Path(__file__).resolve().parents[1]
p=argparse.ArgumentParser(description=__doc__);s=p.add_subparsers(dest='command',required=True)
q=s.add_parser('find');q.add_argument('query',nargs='?',default='');q.add_argument('--category');q.add_argument('--format');q.add_argument('--include-reference',action='store_true')
e=s.add_parser('export');e.add_argument('--id',action='append',required=True);e.add_argument('--target',type=Path,required=True);e.add_argument('--force',action='store_true')
a=p.parse_args();items=json.loads((R/'assets/catalog.json').read_text())['assets']
if a.command=='find':
 matches=[i for i in items if (a.include_reference or i['status']=='current') and (not a.category or i['category']==a.category) and (not a.format or i['format']==a.format) and a.query.lower() in json.dumps([i['id'],i.get('roles'),i.get('tier')]).lower()]
 print(json.dumps([{k:i[k] for k in ['id','path','category','status','format','bytes','roles']} for i in matches],indent=2))
else:
 index={i['id']:i for i in items};selected=[];target=a.target.resolve()
 if target==R or R in target.parents:raise SystemExit('Export into a consuming app, not into the brand checkout.')
 for id in a.id:
  if id not in index:raise SystemExit('Unknown asset ID: '+id)
  item=index[id]
  if item['status']!='current':raise SystemExit('Reference/archived assets are not deployable through this command: '+id)
  selected.append(item)
 # Include OFL license whenever a fallback font is selected.
 for item in list(selected):
  if item['category']=='font' and item['format']!='txt':
   license=next(i for i in items if i['path']==str(Path(item['path']).parent/'OFL.txt'))
   if license not in selected:selected.append(license)
 jobs=[]
 for i in selected:
  src=R/i['path'];dest=target/Path(i['path']).relative_to('assets')
  if hashlib.sha256(src.read_bytes()).hexdigest()!=i['sha256']:raise SystemExit('Source changed; rebuild catalog: '+i['path'])
  if dest.exists() and dest.read_bytes()!=src.read_bytes() and not a.force:raise SystemExit('Refusing to overwrite changed file: '+str(dest))
  jobs.append((src,dest,i))
 for src,dest,i in jobs:
  dest.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(src,dest)
 print(json.dumps([{'id':i['id'],'file':str(dest),'relativePath':str(dest.relative_to(target))} for src,dest,i in jobs],indent=2))

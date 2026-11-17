#!/usr/bin/env python3
"""Validate supplied asset integrity, coverage, the Rasa Brand 2026 mirror, token correspondence, deployable SVGs,
skill copies and that no licensed font binary is tracked."""
from pathlib import Path
import hashlib,json,re,subprocess,sys,xml.etree.ElementTree as ET
R=Path(__file__).resolve().parents[1];errors=[];checks=0
def check(ok,msg):
 global checks
 checks+=1
 if not ok:errors.append(msg)
def digest(p):return hashlib.sha256(p.read_bytes()).hexdigest()
a=json.loads((R/'assets/catalog.json').read_text())['assets'];ids=set();paths=set()
for item in a:
 p=R/item['path'];check(item['id'] not in ids,'Duplicate ID: '+item['id']);ids.add(item['id']);paths.add(item['path'])
 check(p.is_file(),'Missing asset: '+item['path'])
 if not p.is_file():continue
 check(digest(p)==item['sha256'],'Changed asset bytes: '+item['path']);check(p.stat().st_size==item['bytes'],'Changed asset size: '+item['path'])
 check(item['status'] in ['current','reference','archived'],'Invalid status: '+item['path'])
 if item['category']=='font' and item['format']!='txt':check((p.parent/'OFL.txt').is_file(),'Missing font license: '+str(p))
 if item['format']=='svg' and item['status']=='current':
  try:
   root=ET.fromstring(p.read_bytes())
   check(root.tag.endswith('}svg') and bool(root.get('viewBox')),'Missing SVG viewBox: '+str(p))
   for el in root.iter():
    check(el.tag.split('}')[-1] not in ['script','foreignObject'],'Unsafe SVG element: '+str(p))
    for k,v in el.attrib.items():
     check(not k.lower().startswith('on'),'SVG event handler: '+str(p))
     if k.split('}')[-1]=='href':check(v.startswith('#'),'External SVG reference: '+str(p))
  except ET.ParseError:errors.append('Invalid SVG: '+str(p))
for p in (R/'assets').rglob('*'):
 if p.is_file() and p.name not in ['catalog.json','catalog.schema.json','README.md']:check(str(p.relative_to(R)) in paths,'Uncataloged asset: '+str(p))
coverage=json.loads((R/'evidence/source-coverage.json').read_text())
for f in coverage['files']:
 if f['disposition'] in ['included','duplicate']:
  check(f['path'] in paths,'Uncataloged source: '+f['source']);p=R/f['path'];check(p.is_file() and digest(p)==f['sha256'],'Source mismatch: '+f['source'])
 else:check(f['disposition']=='external-licensed-font','Unknown source disposition')
for z in coverage['archives']:check(sum(f['archive']==z['name'] for f in coverage['files'])==z['files'],'Archive coverage mismatch: '+z['name'])
t=json.loads((R/'design-system/src/tokens.json').read_text());g=json.loads((R/'evidence/supplied-tokens/color-global-tokens.json').read_text())
for family in ['taupe','pink']:
 for shade,token in g['primary'][family].items():check(t['color'][family][shade]==token['$value']['hex'],'Web primary drift: '+family+shade)
for family,scale in g['secondary'].items():
 for shade,token in scale.items():
  if shade.isdigit():check(t['color'][family.replace('perriwinkle','periwinkle')][shade]==token['$value']['hex'],'Secondary drift: '+family+shade)
# Rasa Brand 2026 mirror: byte-exact files, and tokens derived from it.
lock=json.loads((R/'evidence/brand-2026/artifact-files.json').read_text());M=R/'design-system/rasa-brand-2026'
mirrored=0
for f in lock['files']:
 p=M/f['path']
 if f['path'].startswith('fonts/'):
  check(not subprocess.run(['git','ls-files','--error-unmatch',str(p)],cwd=R,capture_output=True).returncode==0,'Licensed font tracked: '+f['path']);continue
 if p.is_file():mirrored+=1;check(digest(p)==f['sha256'],'Design-system mirror changed: '+f['path'])
for need in ['README.md','tokens.json','tokens.css','manifest.json','components/bundle.js','components/bundle.css','components/index.d.ts','components/lib/react.production.min.js','components/lib/react-dom.production.min.js']:check((M/need).is_file(),'Mirror file missing: '+need)
check(subprocess.run([sys.executable,str(R/'scripts/sync-tokens-from-design-system.py'),'--check'],capture_output=True).returncode==0,'src/tokens.json drifted from the design-system mirror')
b26=[i for i in a if i['path'].startswith('assets/brand-2026/')];exp={x['path'].split('/')[-1]:x for x in lock['assets']}
for i in b26:
 ds=i.get('designSystem',{})
 if ds.get('parity')=='exact':check(i['sha256']==ds['sha256'],'Brand 2026 export changed: '+i['path'])
 if ds.get('name'):check(ds['name'] in exp,'Unknown design-system asset name: '+i['path'])
for name,x in exp.items():
 if '/Backgrounds/' in x['path']:continue
 check(any(i['path'].endswith('/'+name) for i in b26),'Brand 2026 asset missing: '+x['path'])
secondary=json.loads((R/'evidence/supplied-tokens/color-secondary-colours.json').read_text())
for family,scale in secondary.items():
 if family.startswith('$'):continue
 for shade,obj in scale.items():check(t['color'][family][shade.split(' ')[0]]==obj['$value']['hex'],'Secondary export conflict: '+family+shade)
for p in (R/'examples/email').glob('*.html'):
 text=p.read_text();check(not re.search(r'var\(|<script|<svg|@font-face',text,re.I),'Web-only construct in email: '+str(p));check('max-width:560px' in text,'Email width drift')
check(len([i for i in a if i['category']=='icon' and i['format']=='svg' and i['status']=='current'])==27,'Current icon count changed; review source audit')
check(len([i for i in a if i['format']=='webp'])==72,'Pattern derivative coverage changed')
tracked=subprocess.run(['git','ls-files'],cwd=R,capture_output=True,text=True).stdout.split('\n') if (R/'.git').exists() else [str(p.relative_to(R)) for p in R.rglob('*') if p.is_file() and 'fonts' not in p.parts[:-1]]
check(not any('STKBureau' in Path(x).name for x in tracked),'Proprietary font binary tracked in the repository')
for x in ['design-system/rasa-brand-2026/fonts/STKBureauSans-Book.woff2','skills/rasa-community-cards/assets/fonts/STKBureauSans-Book.woff2']:
 if (R/'.git').exists():check(subprocess.run(['git','check-ignore','-q',x],cwd=R).returncode==0,'Font folder not git-ignored: '+x)
check(subprocess.run([sys.executable,str(R/'scripts/sync-agent-skills.py'),'--check'],capture_output=True).returncode==0,'Agent skill copies differ; run scripts/sync-agent-skills.py')
for platform in ['.agents','.claude']:
 for skill in ['rasa-brand','rasa-community-cards']:
  folder=R/platform/'skills'/skill;check((folder/(folder/'brand-root.txt').read_text().strip()).resolve()==R,'Invalid brand-root pointer: '+str(folder))
if errors:
 print('\n'.join(errors),file=sys.stderr);sys.exit(1)
derived=sum(i.get('designSystem',{}).get('parity')=='derived' for i in b26)
print(f'PASS: {checks} assertions; {len(a)} assets; {len(coverage["files"])} source records; design-system mirror {mirrored} files byte-exact; Brand 2026 assets {len(b26)} ({derived} derived from masters, Backgrounds pending); 27 current SVG icons. Checks cover integrity and settled mappings, not visual or inbox certification.')

#!/usr/bin/env python3
"""Validate supplied asset integrity, coverage, web token correspondence and deployable SVGs."""
from pathlib import Path
import hashlib,json,re,sys,xml.etree.ElementTree as ET
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
 if p.is_file() and p.name not in ['catalog.json','catalog.schema.json']:check(str(p.relative_to(R)) in paths,'Uncataloged asset: '+str(p))
coverage=json.loads((R/'evidence/source-coverage.json').read_text())
for f in coverage['files']:
 if f['disposition'] in ['included','duplicate']:
  check(f['path'] in paths,'Uncataloged source: '+f['source']);p=R/f['path'];check(p.is_file() and digest(p)==f['sha256'],'Source mismatch: '+f['source'])
 else:check(f['disposition']=='external-licensed-font','Unknown source disposition')
for z in coverage['archives']:check(sum(f['archive']==z['name'] for f in coverage['files'])==z['files'],'Archive coverage mismatch: '+z['name'])
t=json.loads((R/'design-system/src/tokens.json').read_text());g=json.loads((R/'evidence/supplied-tokens/color-global-tokens.json').read_text());s=json.loads((R/'evidence/supplied-tokens/color-semantic-tokens.json').read_text())
for family in ['taupe','pink']:
 for shade,token in g['primary'][family].items():check(t['color'][family][shade]==token['$value']['hex'],'Web primary drift: '+family+shade)
for family,scale in g['secondary'].items():
 for shade,token in scale.items():check(t['color'][family.replace('perriwinkle','periwinkle')][shade]==token['$value']['hex'],'Secondary drift: '+family+shade)
for group,vals in s.items():
 if group.startswith('$'):continue
 for name,token in vals.items():
  key=(group+'-'+name).replace('_','-').replace('focusRing','focusring');ref=t['semantic'][key];family,shade=ref.split('.');check(t['color'][family][shade]==token['$value']['hex'],'Semantic drift: '+key)
secondary=json.loads((R/'evidence/supplied-tokens/color-secondary-colours.json').read_text())
for family,scale in secondary.items():
 if family.startswith('$'):continue
 for shade,obj in scale.items():check(t['color'][family][shade.split(' ')[0]]==obj['$value']['hex'],'Secondary export conflict: '+family+shade)
for p in (R/'examples/email').glob('*.html'):
 text=p.read_text();check(not re.search(r'var\(|<script|<svg|@font-face',text,re.I),'Web-only construct in email: '+str(p));check('max-width:560px' in text,'Email width drift')
check(len([i for i in a if i['category']=='icon' and i['format']=='svg' and i['status']=='current'])==27,'Current icon count changed; review source audit')
check(len([i for i in a if i['format']=='webp'])==60,'Pattern derivative coverage changed')
check(not any('STKBureau' in p.name for p in R.rglob('*') if p.is_file() and p.suffix in ['.ttf','.otf','.woff','.woff2']),'Proprietary font binary in repository')
for platform in ['.agents','.claude']:
 folder=R/platform/'skills/rasa-brand';check((folder/'SKILL.md').read_bytes()==(R/'SKILL.md').read_bytes(),'Skill copy differs: '+platform)
 check((folder/(folder/'brand-root.txt').read_text().strip()).resolve()==R,'Invalid brand-root pointer')
if errors:
 print('\n'.join(errors),file=sys.stderr);sys.exit(1)
print(f'PASS: {checks} assertions; {len(a)} assets; {len(coverage["files"])} source records; 27 current SVG icons; 60 web patterns. Checks cover integrity and settled mappings, not visual or inbox certification.')

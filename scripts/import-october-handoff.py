from pathlib import Path
import hashlib,json,re,shutil,zipfile,xml.etree.ElementTree as ET
import argparse,io
parser=argparse.ArgumentParser(description='Import the October brand handoff ZIPs; preserve source bytes and record every disposition.')
parser.add_argument('--input',type=Path,required=True,help='Directory containing the supplied ZIPs')
args=parser.parse_args()
R=Path(__file__).resolve().parents[1]; records=[]; assets={}; byhash={}; archives=[]
def sha(b):return hashlib.sha256(b).hexdigest()
def slug(s):return re.sub(r'[^a-z0-9]+','-',s.lower()).strip('-')
def save(p,b):
 p=R/p;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b)
for zp in sorted(args.input.glob('*.zip')):
 if zp.name=='brand 2.zip':continue
 with zipfile.ZipFile(zp) as z:
  files=[i for i in z.infolist() if not i.is_dir() and '__MACOSX' not in i.filename and not i.filename.endswith('.DS_Store')]
  archives.append(dict(name=zp.name,sha256=sha(zp.read_bytes()),files=len(files),status='empty' if not files else 'inventoried'))
  for f in files:
   b=z.read(f);h=sha(b);n=Path(f.filename);ext=n.suffix.lower();parts=n.parts
   rec=dict(archive=zp.name,source=f.filename,sha256=h,bytes=len(b))
   status='current';roles=[];category='reference';rights='Rasa brand assets; trademark terms apply';dest=None
   if zp.name.startswith('03'):
    if 'Brand Fonts - Bureau' in parts:
     rec.update(disposition='external-licensed-font',reason='Proprietary binaries remain in supplied Fonts ZIP; no redistribution terms supplied.');records.append(rec);continue
    category='font';dest='assets/fonts/fallback/'+ '/'.join(parts[2:]);rights='SIL OFL; adjacent OFL.txt required';roles=['web-fallback','slides']
   elif zp.name.startswith('02'):
    if 'Customer logos' in parts or 'Speaker Logos' in parts:
     category='partner-logo';status='reference';dest='assets/reference/partners/'+slug(n.parent.name)+'/'+slug(n.stem)+ext;rights='Third-party mark; use only for the documented relationship';roles=['reference']
    elif ext=='.txt':dest='assets/reference/logo-source-readme.txt'
    else:
     category='logo';medium='print' if 'print-cmyk' in n.name else 'digital';dest='assets/logos/'+medium+'/'+re.sub(r'-(digital-rgb|print-cmyk)','',slug(n.stem))+ext;roles=['print'] if medium=='print' else ['web','slides','email']
   elif zp.name.startswith('04'):
    if ext=='.txt':dest='assets/reference/icon-source-readme.txt'
    else:
     category='icon';status='archived' if 'Archive' in parts else 'current';dest='assets/icons/'+('archive/'+slug(parts[-2])+'/' if status=='archived' else ext[1:]+'/')+slug(n.stem)+ext;roles=['reference'] if status=='archived' else ['web','slides']
   elif zp.name.startswith('05'):
    category='pattern';tier='primary' if 'Primary Graphics and Patterns' in parts else 'additional';dest='assets/patterns/'+tier+'/'+ext[1:]+'/'+slug(n.stem.replace('Rasa - Pattern - ',''))+ext;roles=['master'] if ext=='.svg' else ['email','slides','raster-source'];rec['tier']=tier
   elif zp.name.startswith('01'):
    dest='assets/reference/colors/'+slug(n.stem)+ext;roles=['source-reference']
   elif zp.name.startswith('09'):
    category='presentation';status='reference';dest='assets/reference/presentations/'+slug(n.stem)+ext;roles=['slides-reference']
   elif zp.name.startswith('11'):
    category='signature';status='reference';dest='assets/reference/email/'+slug(n.stem)+ext;roles=['signature-reference']
   if h in byhash:dest=byhash[h];rec['disposition']='duplicate'
   else:
    if dest in assets and assets[dest]['sha256']!=h:dest=str(Path(dest).with_name(Path(dest).stem+'-'+h[:8]+ext))
    save(dest,b);byhash[h]=dest;rec['disposition']='included'
    a=dict(id=dest.removeprefix('assets/').rsplit('.',1)[0].replace('/','.'),path=dest,category=category,status='reference' if category=='reference' else status,format=ext[1:],sha256=h,bytes=len(b),roles=roles,rights=rights,sources=[])
    if category=='pattern':a.update(tier=tier,tone=n.stem.split(' - ')[-1].lower(),decorative=True)
    if ext=='.svg':
     root=ET.fromstring(b);a['viewBox']=root.attrib.get('viewBox');a['width']=root.attrib.get('width');a['height']=root.attrib.get('height')
    assets[dest]=a
   rec['path']=dest;assets[dest]['sources'].append(dict(archive=zp.name,path=f.filename));records.append(rec)
# Raw token exports, exact contents, not reconstructed.
for zp in args.input.glob('01*.zip'):
 with zipfile.ZipFile(zp) as outer:
  for name in outer.namelist():
   if name.endswith('.zip'):
    with zipfile.ZipFile(io.BytesIO(outer.read(name))) as inner:
     for token in inner.namelist():
      if token.endswith('.json'):
       dest='evidence/supplied-tokens/'+slug(Path(name).stem)+'.json';save(dest,inner.read(token))
repo_input=args.input/'brand 2.zip'
repositoryInput=dict(name='brand 2.zip',baseCommit='d6de4b1',sha256=sha(repo_input.read_bytes()) if repo_input.exists() else None)
save('evidence/source-coverage.json',(json.dumps(dict(date='2026-10-16',repositoryInput=repositoryInput,archives=archives,files=records),indent=2)+'\n').encode())
save('assets/catalog.json',(json.dumps(dict(schemaVersion=1,assets=list(assets.values())),indent=2)+'\n').encode())
# Retain existing September logos but make their status unambiguous in a separate entry point.
(R/'logos/current/README.md').write_text('# September implementation assets\n\nHistorical compatibility paths. New work must use the supplied October masters in `assets/logos/digital/`. These old reverse variants use #FFFBF5; the supplied cream logo uses #FAF6F0. Do not silently replace deployed assets. See `docs/assets.md`.\n')
print('Source records',len(records),'unique included assets',len(assets))

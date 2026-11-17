// Extend the community's pinned playwright-core 1.62.1 / CHROMIUM_PATH route.
// Static retained HTML only. No forms, live endpoints, installs or publication.
import {createServer} from 'node:http';
import {createHash} from 'node:crypto';
import {readFileSync, writeFileSync, mkdirSync, lstatSync, realpathSync, mkdtempSync, rmSync} from 'node:fs';
import {resolve, dirname, basename, join, sep} from 'node:path';
import {pathToFileURL} from 'node:url';
import {tmpdir} from 'node:os';
import assert from 'node:assert/strict';

const options = new Map();
for (let i = 2; i < process.argv.length; i += 2) {
  assert(process.argv[i].startsWith('--') && process.argv[i+1], 'expected --key value');
  assert(!options.has(process.argv[i]), 'duplicate option');
  options.set(process.argv[i], process.argv[i+1]);
}
for (const key of ['--consumer-root', '--manifest', '--playwright-module', '--output-name']) assert(options.has(key), `missing ${key}`);
const root = realpathSync(options.get('--consumer-root'));
const outputName = options.get('--output-name');
assert(/^[a-zA-Z0-9_-]+$/.test(outputName), 'output must be one new relative folder');
const hash = data => createHash('sha256').update(data).digest('hex');
const protectedName = name => name.split('/').some(p => p === '.env' || p.startsWith('.env.'));
function safeFile(name, {font = false, base = root} = {}) {
  assert(typeof name === 'string' && /^[a-zA-Z0-9_./-]+$/.test(name), 'unsupported relative artifact path');
  assert(!name.startsWith('/') && !name.split('/').includes('..') && !protectedName(name), 'unsafe artifact');
  assert(font ? /^STKBureau[A-Za-z0-9-]+\.woff2$/.test(name) : !/\.(woff2?|ttf|otf|key|pem)$/i.test(name), 'protected payload');
  let current = base;
  for (const part of name.split('/')) { current = join(current, part); assert(!lstatSync(current).isSymbolicLink(), 'symlink refused'); }
  assert(current.startsWith(base + sep) && lstatSync(current).isFile(), 'missing regular artifact');
  return current;
}
function binding(name, raw) {
  return {path:name, sha256:hash(raw), bytes:raw.length};
}
function bound(item) {
  const raw = readFileSync(safeFile(item.path));
  assert(raw.length === item.bytes && hash(raw) === item.sha256, 'artifact binding differs');
  return raw;
}
const manifest = JSON.parse(readFileSync(options.get('--manifest'), 'utf8'));
assert(manifest.schema === 'rasa-brand-consumer-manifest-v1');
assert(manifest.brand_commit === 'f63584cd419e326eca4b7f74ff0b3bad4ab00c86');
assert(Array.isArray(manifest.artifacts) && manifest.artifacts.length);
assert(Array.isArray(manifest.pages) && manifest.pages.length && new Set(manifest.pages).size === manifest.pages.length);
for (const page of manifest.pages) assert(/^\/(?:[A-Za-z0-9_.-]+\/)*$/.test(page), 'expected explicit static directory route');
const resources = new Map();
const images = new Map();
for (const artifact of manifest.artifacts) {
  bound(artifact);
  if (artifact.url_path) {
    assert(/^\/[A-Za-z0-9_./-]*$/.test(artifact.url_path) && !artifact.url_path.split('/').includes('..'));
    assert(!resources.has(artifact.url_path), 'duplicate served artifact URL');
    resources.set(artifact.url_path, artifact);
    if (artifact.kind === 'image' || /\.(svg|png|webp|jpe?g|gif|avif)$/i.test(artifact.path)) images.set(artifact.url_path, artifact.path);
  }
}
for (const page of manifest.pages) assert(resources.has(page), 'page is not bound to retained HTML');
const fontResources = new Map();
for (const item of manifest.font_resources ?? []) {
  assert(/^\/[A-Za-z0-9_./-]+\.woff2$/.test(item.url_path));
  assert(!resources.has(item.url_path) && !fontResources.has(item.url_path));
  assert(/^STKBureau[A-Za-z0-9-]+\.woff2$/.test(item.file));
  fontResources.set(item.url_path, item.file);
}
const fontRoot = fontResources.size ? realpathSync(process.env.RASA_FONTS_DIR) : null;
const modulePath = realpathSync(options.get('--playwright-module'));
const packageInfo = JSON.parse(readFileSync(resolve(dirname(modulePath), 'package.json'), 'utf8'));
assert(packageInfo.name === 'playwright-core' && packageInfo.version === '1.62.1', 'use existing locked browser route');
const {chromium} = await import(pathToFileURL(modulePath));
assert(process.env.CHROMIUM_PATH && resolve(process.env.CHROMIUM_PATH) === process.env.CHROMIUM_PATH, 'existing CHROMIUM_PATH required');
const output = join(root, outputName);
mkdirSync(output, {mode:0o700}); // Never overwrite a previous run.
const write = (name, raw) => {
  const data = Buffer.isBuffer(raw) ? raw : Buffer.from(JSON.stringify(raw, null, 2) + '\n');
  writeFileSync(join(output, name), data, {flag:'wx', mode:0o600});
  return binding(`${outputName}/${name}`, data);
};
const unresolved = new Set();
const mime = path => ({html:'text/html',css:'text/css',js:'text/javascript',mjs:'text/javascript',svg:'image/svg+xml',png:'image/png',webp:'image/webp',woff2:'font/woff2'})[path.split('.').pop()] ?? 'application/octet-stream';
const server = createServer((request, response) => {
  try {
    if (request.method !== 'GET' && request.method !== 'HEAD') throw Error('non-read request');
    const path = new URL(request.url, 'http://127.0.0.1').pathname;
    let raw, type;
    if (resources.has(path)) { const item = resources.get(path); raw = bound(item); type = mime(item.path); }
    else if (fontResources.has(path)) { raw = readFileSync(safeFile(fontResources.get(path), {font:true,base:fontRoot})); type = 'font/woff2'; }
    else throw Error('unbound resource');
    response.writeHead(200, {'Content-Type':type, 'Cache-Control':'no-store'});
    response.end(request.method === 'HEAD' ? undefined : raw);
  } catch { unresolved.add('unbound-or-refused-local-resource'); response.writeHead(404); response.end(); }
});
let browser;
const home = mkdtempSync(join(tmpdir(), 'rasa-consumer-browser-'));
const browserRecords = [];
let observedSnapshots = 0;
const deadline = setTimeout(() => { unresolved.add('capture-deadline-exceeded'); browser?.close().catch(() => {}); }, 120000);
try {
  await new Promise(ready => server.listen(0, '127.0.0.1', ready));
  const origin = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch({executablePath:process.env.CHROMIUM_PATH, env:{PATH:'/usr/bin:/bin', HOME:home, LANG:'C.UTF-8'}});
  for (const width of [375, 768, 1440]) {
    const context = await browser.newContext({viewport:{width,height:1000},javaScriptEnabled:false,reducedMotion:'reduce',serviceWorkers:'block'});
    try {
      await context.route('**/*', route => {
        const url = new URL(route.request().url());
        if (url.origin === origin && ['GET','HEAD'].includes(route.request().method())) return route.continue();
        unresolved.add('external-or-non-read-request'); return route.abort();
      });
      const page = await context.newPage();
      page.setDefaultTimeout(15000);
      for (let index = 0; index < manifest.pages.length; index++) {
        const path = manifest.pages[index];
        const response = await page.goto(origin + path, {waitUntil:'networkidle',timeout:15000});
        assert(response?.status() === 200, 'page did not load');
        await page.evaluate(() => document.fonts.ready);
        const cdp = await context.newCDPSession(page);
        try {
          await cdp.send('DOM.enable'); await cdp.send('CSS.enable');
          const selectors = await page.locator('a[href],button,input,select,textarea,summary,[tabindex]').evaluateAll(elements => elements.filter(el => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden' && !el.disabled).map(el => {
            const parts=[]; for(let n=el;n?.nodeType===1;n=n.parentElement) { const siblings=Array.from(n.parentElement?.children??[]);parts.unshift(`${n.localName}:nth-child(${siblings.indexOf(n)+1||1})`); } return parts.join(' > ');
          }));
          assert(selectors.length <= 100, 'interactive state limit exceeded');
          const states = [{kind:'default'}, ...selectors.flatMap(selector => [{kind:'hover',selector},{kind:'focus',selector}])];
          for (let stateIndex=0;stateIndex<states.length;stateIndex++) {
            const state = states[stateIndex];
            await page.mouse.move(0,0); await page.evaluate(() => document.activeElement?.blur());
            if (state.kind==='hover') await page.locator(state.selector).hover({force:true});
            if (state.kind==='focus') await page.locator(state.selector).focus();
            assert(++observedSnapshots <= 60, 'snapshot limit exceeded; split the declared scope');
            const observation = await page.evaluate(() => {
              const unsupported = [], nodes = [], media = new Set();
              const elements=Array.from(document.querySelectorAll('html,body,body *'));
              if(elements.length>2500) unsupported.push('node-limit-exceeded');
              const selector=el=>{const parts=[];for(let n=el;n?.nodeType===1;n=n.parentElement){const s=Array.from(n.parentElement?.children??[]);parts.unshift(`${n.localName}:nth-child(${s.indexOf(n)+1||1})`);}return parts.join(' > ');};
              for(const el of elements.slice(0,2500)) {
                const style=getComputedStyle(el);
                if(style.display==='none'||style.visibility==='hidden'||!el.getClientRects().length) continue;
                if(el.shadowRoot||['iframe','canvas','video'].includes(el.localName)) unsupported.push('unobserved-embedded-surface');
                if(el.localName==='svg') unsupported.push('inline-svg-needs-image-record-binding');
                if(style.filter!=='none'||Number(style.opacity)!==1||style.mixBlendMode!=='normal') unsupported.push('unreviewed-compositing');
                for(const pseudo of ['::before','::after']) {const p=getComputedStyle(el,pseudo);if(!['none','normal','""'].includes(p.content)) unsupported.push('generated-text-needs-platform-font-coverage');}
                const colors={};
                for(const key of ['color','background-color','border-top-color','border-right-color','border-bottom-color','border-left-color','outline-color','text-decoration-color','column-rule-color']) colors[key]=style.getPropertyValue(key);
                for(const key of ['box-shadow','text-shadow']) {const value=style.getPropertyValue(key);if(value!=='none') {const matches=value.match(/rgba?\([^)]*\)/g);if(!matches)unsupported.push('unresolved-shadow-color');else matches.forEach((c,i)=>colors[`${key}-${i}`]=c);}}
                const background=style.backgroundImage;
                if(background!=='none') {if(/gradient|image-set|paint\(/i.test(background))unsupported.push('unsupported-background-paint');for(const m of background.matchAll(/url\(["']?([^"')]+)["']?\)/g))media.add(m[1]);}
                if(el.localName==='img') media.add(el.currentSrc||el.src);
                let text=Array.from(el.childNodes).filter(n=>n.nodeType===3).map(n=>n.textContent).join('').trim();
                if(['input','textarea'].includes(el.localName))text=el.value||el.placeholder||text;
                if(el.localName==='select')text=Array.from(el.selectedOptions).map(o=>o.textContent).join('');
                nodes.push({selector:selector(el),colors,has_text:Boolean(text),font_family:style.fontFamily,text});
              }
              return {nodes,unsupported:[...new Set(unsupported)],media:[...media],overflow:document.documentElement.scrollWidth>innerWidth+1};
            });
            const documentNode=(await cdp.send('DOM.getDocument',{depth:-1,pierce:true})).root.nodeId;
            const fonts={complete:true,unsupported:[],nodes:[]};
            for (const node of observation.nodes) {
              if(node.has_text) {
                const {nodeId}=await cdp.send('DOM.querySelector',{nodeId:documentNode,selector:node.selector});
                assert(nodeId,'observed text node disappeared');
                const {fonts:actual}=await cdp.send('CSS.getPlatformFontsForNode',{nodeId});
                fonts.nodes.push({selector:node.selector,source_text_sha256:hash(node.text),platform_fonts:actual.filter(f=>f.glyphCount>0).map(f=>({family:f.familyName,postscript_name:f.postScriptName,custom:f.isCustomFont,glyph_count:f.glyphCount}))});
              }
              delete node.text;
            }
            const actualImages=[];
            for(const url of observation.media) {const parsed=new URL(url,origin);if(parsed.origin!==origin||!images.has(parsed.pathname))observation.unsupported.push('rendered-image-not-in-artifact-inventory');else actualImages.push(images.get(parsed.pathname));}
            const stem=`page-${index}-${width}-state-${stateIndex}`;
            const screenshot=write(`${stem}.png`,await page.screenshot({fullPage:true,timeout:15000}));
            const log=write(`${stem}.log.json`,{profile:'static-html-native-states',width,page:path,state,browser_version:browser.version(),playwright_version:packageInfo.version,font_binary_retained:false});
            browserRecords.push(write(`${stem}.json`,{schema:'rasa-brand-browser-observation-v1',brand_commit:manifest.brand_commit,page:path,state,viewport:{width,height:1000},artifacts:manifest.artifacts,complete:observation.unsupported.length===0,unsupported:[...new Set(observation.unsupported)],nodes:observation.nodes,font_observation:fonts,images:[...new Set(actualImages)],unresolved_resources:[...unresolved],unresolved_styles:observation.overflow?['horizontal-overflow']:[],screenshot,log}));
          }
        } finally {await cdp.detach();}
      }
    } finally {await context.close();}
  }
  for(const artifact of manifest.artifacts) bound(artifact); // Recheck source bytes after capture.
  const result={...manifest,browser_records:browserRecords,capture:{profile:'static-html-native-states',script_sha256:hash(readFileSync(new URL(import.meta.url))),playwright_version:packageInfo.version,browser_version:browser.version(),unresolved_resources:[...unresolved]}};
  write('manifest.json',result);
  console.log(JSON.stringify({manifest:`${outputName}/manifest.json`,records:browserRecords.length,unresolved_resources:unresolved.size,release_authorized:false}));
} finally {
  clearTimeout(deadline);
  if(browser)await browser.close();
  await new Promise(ready=>server.close(ready));
  rmSync(home,{recursive:true,force:true});
}

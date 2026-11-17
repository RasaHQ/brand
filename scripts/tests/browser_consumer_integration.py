"""Actual static capture negative control; admitted remote browser lane only, no skips."""
import hashlib
import importlib.machinery
import importlib.util
import json
import os
from pathlib import Path
import signal
import subprocess
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[2]
loader = importlib.machinery.SourceFileLoader('capture_checker', str(ROOT / 'scripts/rasa-brand-consumer-check'))
spec = importlib.util.spec_from_loader(loader.name, loader)
checker = importlib.util.module_from_spec(spec)
loader.exec_module(checker)


class ActualBrowserNegativeControl(unittest.TestCase):
    def test_declared_brand_stack_with_unprovisioned_actual_font_is_refused(self):
        module = os.environ['RASA_CONSUMER_PLAYWRIGHT_MODULE']
        chromium = os.environ['CHROMIUM_PATH']
        receipts = Path(os.environ['RASA_CONSUMER_BROWSER_RECEIPTS_DIR'])
        self.assertTrue(receipts.is_absolute() and receipts.is_dir())
        packet = Path(tempfile.mkdtemp(prefix='negative-unprovisioned-', dir=receipts))
        def put(name, raw):
            if not isinstance(raw, bytes):
                raw = raw.encode()
            target = packet / name
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(raw)
            return {'path': name, 'sha256': hashlib.sha256(raw).hexdigest(), 'bytes': len(raw)}
        tokens = checker.git_blob(ROOT, 'design-system/src/tokens.json')
        css = checker.git_blob(ROOT, 'design-system/dist/tokens.css')
        page = b'''<!doctype html><html><head><link rel="stylesheet" href="/tokens.css"><style>
body { background:var(--rasa-bg); color:var(--rasa-fg); font-family:var(--rasa-font-sans); }
</style></head><body><p>Unprovisioned font negative fixture.</p>
<details><summary>Outer disclosure</summary><details><summary>Inner disclosure</summary>
<p style="color:rgb(255,0,0)">Hidden nonpalette negative fixture.</p>
</details></details></body></html>'''
        artifacts = [put('tokens.json', tokens),
                     {**put('tokens.css', css), 'url_path': '/tokens.css'},
                     {**put('page.html', page), 'url_path': '/'},
                     put('licenses/JetBrains Mono/OFL.txt', b'SYNTHETIC retained license path with spaces')]
        manifest = {'schema': checker.SCHEMA, 'brand_commit': checker.BRAND_COMMIT,
                    'artifacts': artifacts, 'pages': ['/'], 'images': [], 'font_resources': [],
                    'generated_tokens': [{'path': 'tokens.json', 'brand_source': 'design-system/src/tokens.json'},
                                         {'path': 'tokens.css', 'brand_source': 'design-system/dist/tokens.css'}]}
        put('input-manifest.json', json.dumps(manifest, indent=2))
        command = ['node', str(ROOT / 'scripts/collect-consumer-browser.mjs'),
                   '--consumer-root', str(packet), '--manifest', str(packet / 'input-manifest.json'),
                   '--playwright-module', module, '--output-name', 'observed']
        env = {'PATH': os.environ['PATH'], 'CHROMIUM_PATH': chromium, 'LANG': 'C.UTF-8'}
        process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                                   env=env, start_new_session=True)
        try:
            stdout, stderr = process.communicate(timeout=150)
        except subprocess.TimeoutExpired:
            os.killpg(process.pid, signal.SIGTERM)
            try:
                stdout, stderr = process.communicate(timeout=5)
            except subprocess.TimeoutExpired:
                os.killpg(process.pid, signal.SIGKILL)
                stdout, stderr = process.communicate(timeout=3)
            put('capture.stdout.log', stdout)
            put('capture.stderr.log', stderr)
            self.fail('capture deadline exceeded; originals retained')
        put('capture.stdout.log', stdout)
        put('capture.stderr.log', stderr)
        put('capture-exit.json', json.dumps({'exit': process.returncode, 'font_files_provided': False}))
        self.assertEqual(process.returncode, 0, 'capture failed; inspect retained private stderr')
        observed = json.loads((packet / 'observed/manifest.json').read_text())
        self.assertGreater(len(observed['browser_records']), 3)
        all_fonts = []
        default_widths, opened_widths = set(), set()
        hidden_hash = hashlib.sha256(b'Hidden nonpalette negative fixture.').hexdigest()
        for binding in observed['browser_records']:
            record = checker.read_json(checker.bound_file(packet, binding))
            self.assertEqual(record['page'], '/')
            checker.bound_file(packet, record['screenshot'])
            texts = {node['source_text_sha256'] for node in record['font_observation']['nodes']}
            if record['state']['kind'] == 'default' and not record['state']['open_details']:
                self.assertNotIn(hidden_hash, texts, 'closed disclosure content must not count as painted')
                default_widths.add(record['viewport']['width'])
            if len(record['state']['open_details']) == 2:
                self.assertIn(hidden_hash, texts, 'nested disclosure content must be captured when opened')
                self.assertTrue(any('rgb(255, 0, 0)' in node['colors'].values() for node in record['nodes']))
                opened_widths.add(record['viewport']['width'])
            for node in record['font_observation']['nodes']:
                all_fonts.extend(node['platform_fonts'])
        self.assertEqual(default_widths, {375, 768, 1440})
        self.assertEqual(opened_widths, {375, 768, 1440})
        self.assertTrue(all_fonts, 'actual font observation cannot be empty')
        self.assertTrue(any(f['family'] not in checker.FONT_FAMILIES or not f['custom'] for f in all_fonts))
        result = checker.check(packet, ROOT, observed)
        put('CHECK-RESULT.json', json.dumps(result, indent=2))
        self.assertEqual(result['machine_status'], 'FAIL')
        self.assertFalse(result['release_authorized'])
        self.assertTrue(any(f['reason'] == 'non-STK or substituted actual font' for f in result['findings']))
        print('Actual unprovisioned-font refusal originals retained:', packet)


if __name__ == '__main__':
    unittest.main()

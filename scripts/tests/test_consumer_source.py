"""Synthetic settled source.json adapter fixtures; no font payloads or renders."""
import importlib.machinery
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[2]
loader = importlib.machinery.SourceFileLoader('source_checker', str(ROOT / 'scripts/rasa-brand-consumer-check'))
spec = importlib.util.spec_from_loader(loader.name, loader)
checker = importlib.util.module_from_spec(spec)
loader.exec_module(checker)


class CommunitySourceReceivingTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.upstream = {source: ('SYNTHETIC canonical ' + source).encode() for source in checker.COMMUNITY_EXPORTS}
        self.artifacts = {}
        exports = []
        for index, source in enumerate(sorted(checker.COMMUNITY_EXPORTS)):
            path = f'exports/file-{index}.txt'
            item = self.put(path, self.upstream[source])
            exports.append({'path': path, 'source': source, 'sha256': item['sha256']})
        self.logo = self.put('public/logo.svg', b'<svg>SYNTHETIC</svg>')
        self.license = self.put('public/OFL.txt', b'SYNTHETIC license fixture')
        self.catalog = [
            {'id': 'synthetic-logo', 'path': 'assets/logo.svg', 'sha256': self.logo['sha256'],
             'bytes': self.logo['bytes'], 'status': 'current'},
            {'id': 'synthetic-license', 'path': 'assets/OFL.txt', 'sha256': self.license['sha256'],
             'bytes': self.license['bytes'], 'status': 'current'},
            {'id': 'synthetic-font', 'path': 'assets/font.ttf', 'sha256': 'a' * 64,
             'bytes': 100, 'status': 'current'},
        ]
        self.source = {
            'repository': 'RasaHQ/brand', 'commit': checker.BRAND_COMMIT,
            'tokensSource': 'design-system/src/tokens.json',
            'tokensSha256': checker.digest(self.upstream['design-system/src/tokens.json']),
            'generatedOutputs': exports,
            'assets': [
                {'id': 'synthetic-logo', 'file': self.logo['path'], 'source': 'assets/logo.svg', 'sha256': self.logo['sha256']},
                {'id': 'synthetic-license', 'file': self.license['path'], 'source': 'assets/OFL.txt', 'sha256': self.license['sha256']},
                {'id': 'synthetic-font', 'file': 'public/font.ttf', 'source': 'assets/font.ttf', 'sha256': 'a' * 64},
            ],
        }

    def put(self, path, raw):
        file = self.root / path
        file.parent.mkdir(parents=True, exist_ok=True)
        file.write_bytes(raw)
        binding = {'path': path, 'sha256': checker.digest(raw), 'bytes': len(raw)}
        self.artifacts[path] = binding
        return binding

    def receive(self):
        binding = self.put('source.json', json.dumps(self.source).encode())
        def load(_root, source):
            if source == 'assets/catalog.json':
                return json.dumps({'assets': self.catalog}).encode()
            return self.upstream[source]
        return checker.check_community_source(self.root, self.root, binding, self.artifacts, load)

    def test_exact_exports_and_catalog_do_not_open_font_payload(self):
        result = self.receive()
        self.assertEqual(result['exports_bound'], 7)
        self.assertEqual(result['catalog_entries_bound'], 3)
        self.assertEqual(result['font_payloads_opened'], 0)
        self.assertEqual(result['font_metadata_only'], [{'id': 'synthetic-font', 'payload_verified': False}])
        self.assertFalse((self.root / 'public/font.ttf').exists())

    def test_missing_non_generated_export_fails(self):
        self.source['generatedOutputs'] = [x for x in self.source['generatedOutputs'] if x['source'] != 'design-system/src/fonts.css']
        with self.assertRaises(checker.Refusal):
            self.receive()

    def test_relabelled_changed_static_css_fails(self):
        item = next(x for x in self.source['generatedOutputs'] if x['source'] == 'design-system/src/components.css')
        changed = self.put(item['path'], b'changed and self-declared')
        item['sha256'] = changed['sha256']
        with self.assertRaises(checker.Refusal):
            self.receive()

    def test_reference_catalog_asset_is_not_current(self):
        self.catalog[0]['status'] = 'reference'
        with self.assertRaises(checker.Refusal):
            self.receive()

    def test_declared_font_payload_cannot_become_a_source_input(self):
        # Do not create or open a font. Even an alleged binding is forbidden here.
        self.artifacts['public/font.ttf'] = {'path': 'public/font.ttf', 'sha256': 'a' * 64, 'bytes': 100}
        with self.assertRaises(checker.Refusal):
            self.receive()

    def test_changed_catalog_digest_fails(self):
        self.source['assets'][0]['sha256'] = '0' * 64
        with self.assertRaises(checker.Refusal):
            self.receive()

    def test_brand_identity_cannot_transfer_to_another_revision(self):
        self.source['commit'] = '0' * 40
        with self.assertRaises(checker.Refusal):
            self.receive()


if __name__ == '__main__':
    unittest.main()

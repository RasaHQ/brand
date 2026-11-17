"""Two proof classes from the explicit operator ruling; synthetic assets only."""
import importlib.machinery
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[2]
loader = importlib.machinery.SourceFileLoader('catalog_checker', str(ROOT / 'scripts/rasa-brand-consumer-check'))
spec = importlib.util.spec_from_loader(loader.name, loader)
checker = importlib.util.module_from_spec(spec)
loader.exec_module(checker)


class ImageProofClassTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.raw = b'<svg>SYNTHETIC unchanged canonical fixture</svg>'
        (self.root / 'logo.svg').write_bytes(self.raw)
        self.artifact = {'path': 'logo.svg', 'sha256': checker.digest(self.raw), 'bytes': len(self.raw)}
        self.canonical = {'id': 'synthetic-current-logo', 'path': 'assets/logo.svg', 'category': 'logo',
                          'status': 'current', 'format': 'svg', 'sha256': checker.digest(self.raw), 'bytes': len(self.raw)}
        self.image = {'path': 'logo.svg', 'proof_class': 'official-catalog',
                      'catalog': {key: self.canonical[key] for key in ('id', 'path', 'category', 'sha256')}}

    def receive(self):
        return checker.check_image_proof(self.root, self.root, self.image, self.artifact,
            load_brand=lambda _root, _source: json.dumps({'assets': [self.canonical]}).encode())

    def test_exact_unchanged_catalog_logo_needs_no_invented_render(self):
        result = self.receive()
        self.assertEqual(result['class'], 'official-catalog')
        self.assertFalse(result['render_record_required'])
        self.assertNotIn('render_record', self.image)

    def test_one_byte_change_is_not_official_source_proof(self):
        changed = self.raw + b' '
        (self.root / 'logo.svg').write_bytes(changed)
        self.artifact.update(sha256=checker.digest(changed), bytes=len(changed))
        with self.assertRaises(checker.Refusal):
            self.receive()

    def test_reference_asset_cannot_use_current_proof_class(self):
        self.canonical['status'] = 'reference'
        with self.assertRaises(checker.Refusal):
            self.receive()

    def test_catalog_category_and_path_are_bound(self):
        self.image['catalog']['path'] = 'assets/other.svg'
        with self.assertRaises(checker.Refusal):
            self.receive()

    def test_custom_diagram_cannot_invent_a_catalog_identity(self):
        self.image['catalog']['id'] = 'synthetic-custom-diagram-not-in-catalog'
        self.image['catalog']['category'] = 'diagram'
        with self.assertRaises(checker.Refusal):
            self.receive()

    def test_generated_class_still_requires_actual_stk_record(self):
        self.image['proof_class'] = 'generated'
        with self.assertRaises(checker.Refusal):
            self.receive()

    def test_no_unsupported_third_class_is_silently_accepted(self):
        self.image['proof_class'] = 'external-brand-exemption'
        with self.assertRaises(checker.Refusal):
            self.receive()


if __name__ == '__main__':
    unittest.main()

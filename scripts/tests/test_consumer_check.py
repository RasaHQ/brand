"""Synthetic evidence fixtures only; no font/browser/provider or publication claims."""
import copy
import importlib.machinery
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

SCRIPT = Path(__file__).resolve().parents[1] / 'rasa-brand-consumer-check'
loader = importlib.machinery.SourceFileLoader('consumer_check', str(SCRIPT))
spec = importlib.util.spec_from_loader(loader.name, loader)
checker = importlib.util.module_from_spec(spec)
loader.exec_module(checker)


class ConsumerEvidenceTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.token = {'color': {'taupe': {'100': '#FAF6F0', '950': '#181210'}},
                      'font': {'sans': '"STK Bureau Sans", "Inter", Arial, sans-serif'}}
        self.token_bytes = json.dumps(self.token).encode()
        self.artifacts = [self.bind('tokens.json', self.token_bytes)]
        self.manifest = {'schema': checker.SCHEMA, 'brand_commit': checker.BRAND_COMMIT,
                         'artifacts': self.artifacts,
                         'generated_tokens': [{'path': 'tokens.json', 'brand_source': 'design-system/src/tokens.json'}],
                         'images': [], 'browser_records': [], 'pages': ['/']}
        self.fonts = {'complete': True, 'unsupported': [], 'nodes': [
            {'platform_fonts': [{'family': 'STK Bureau Sans', 'custom': True, 'glyph_count': 9}]}]}
        self.snapshots()

    def bind(self, name, data):
        if not isinstance(data, bytes):
            data = json.dumps(data).encode()
        path = self.root / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(data)
        return {'path': name, 'sha256': checker.digest(data), 'bytes': len(data)}

    def snapshots(self, mutate=lambda _: None):
        self.manifest['browser_records'] = []
        for width in (1280, 390):
            record = {'schema': 'rasa-brand-browser-observation-v1', 'brand_commit': checker.BRAND_COMMIT,
                      'complete': True, 'unsupported': [], 'page': '/', 'viewport': {'width': width, 'height': 800},
                      'artifacts': copy.deepcopy(self.artifacts), 'images': [],
                      'nodes': [{'has_text': True, 'font_family': self.token['font']['sans'],
                                 'colors': {'color': 'rgb(24, 18, 16)', 'background-color': '#FAF6F0'}}],
                      'font_observation': copy.deepcopy(self.fonts),
                      'unresolved_resources': [], 'unresolved_styles': [],
                      'screenshot': self.bind(f'{width}.png', b'SYNTHETIC TEST FIXTURE; not a rendered image'),
                      'log': self.bind(f'{width}.log', b'SYNTHETIC TEST FIXTURE; not a browser execution')}
            mutate(record)
            self.manifest['browser_records'].append(self.bind(f'{width}.json', record))

    def result(self):
        return checker.check(self.root, self.root, self.manifest,
                             load_brand=lambda _root, _path: self.token_bytes,
                             regenerate=lambda _: ({name: self.token_bytes for name in checker.GENERATED},
                                                   {"synthetic": True, "not_a_real_execution": True}))

    def assertFails(self, rule):
        result = self.result()
        self.assertEqual(result['machine_status'], 'FAIL')
        self.assertFalse(result['release_authorized'])
        self.assertIn(rule, {f['rule'] for f in result['findings']})

    def test_valid_synthetic_evidence_never_authorizes_release(self):
        result = self.result()
        self.assertEqual(result['machine_status'], 'PASS_EVIDENCE_ONLY')
        self.assertEqual(result['operator_visual_verdict'], 'NOT_HELD')
        self.assertFalse(result['release_authorized'])

    def test_stale_brand_label_fails(self):
        self.manifest['brand_commit'] = '0' * 40
        self.assertFails('brand-identity')

    def test_video_declaration_cannot_borrow_browser_evidence(self):
        self.manifest['videos'] = [{'path': 'unlisted.mp4'}]
        self.assertFails('video-legibility')

    def test_video_artifacts_cannot_pass_as_generic_files(self):
        for name, kind in [('clip.mp4', 'file'), ('clip.WEBM', 'file'),
                           ('clip.mov', 'file'), ('opaque.bin', 'video')]:
            with self.subTest(name=name, kind=kind):
                self.artifacts.append(dict(self.bind(name, b'SYNTHETIC VIDEO PLACEHOLDER'), kind=kind))
                self.snapshots()
                self.assertFails('artifact-binding')
                self.artifacts.pop()

    def test_true_label_with_changed_token_bytes_fails(self):
        self.artifacts[0] = self.bind('tokens.json', b'{"stale":true}')
        self.snapshots()
        self.assertFails('generated-token-origin')

    def test_independent_generation_failure_fails(self):
        def refused(_):
            raise checker.Refusal('synthetic generator failure')
        result = checker.check(self.root, self.root, self.manifest,
                               load_brand=lambda _root, _path: self.token_bytes, regenerate=refused)
        self.assertEqual(result['machine_status'], 'FAIL')
        self.assertIn('independent-token-generation', {f['rule'] for f in result['findings']})

    def test_incomplete_independent_generation_fails(self):
        result = checker.check(self.root, self.root, self.manifest,
                               load_brand=lambda _root, _path: self.token_bytes,
                               regenerate=lambda _: ({}, {'synthetic': True}))
        self.assertEqual(result['machine_status'], 'FAIL')
        self.assertIn('independent-token-generation', {f['rule'] for f in result['findings']})

    def test_missing_generated_origin_fails(self):
        self.manifest['generated_tokens'] = []
        self.assertFails('generated-token-coverage')

    def test_mutated_retained_file_fails(self):
        (self.root / 'tokens.json').write_bytes(b'changed after observation')
        self.assertFails('artifact-binding')

    def test_white_computed_from_named_color_fails(self):
        self.snapshots(lambda r: r['nodes'][0]['colors'].update(color='rgb(255, 255, 255)'))
        self.assertFails('consumer-browser')

    def test_unresolved_color_variable_fails(self):
        self.snapshots(lambda r: r['nodes'][0]['colors'].update(color='var(--unknown)'))
        self.assertFails('consumer-browser')

    def test_unsupported_translucent_composition_fails(self):
        self.snapshots(lambda r: r['nodes'][0]['colors'].update(color='rgba(24, 18, 16, 0.5)'))
        self.assertFails('consumer-browser')

    def test_actual_fallback_fails_even_with_correct_declared_stack(self):
        self.snapshots(lambda r: r['font_observation']['nodes'][0]['platform_fonts'][0].update(family='Inter'))
        self.assertFails('consumer-browser')

    def test_disallowed_stack_fails_even_with_actual_stk(self):
        self.snapshots(lambda r: r['nodes'][0].update(font_family='IBM Plex Sans, sans-serif'))
        self.assertFails('consumer-browser')

    def test_missing_text_observation_fails(self):
        self.snapshots(lambda r: r['font_observation'].update(nodes=[]))
        self.assertFails('consumer-browser')

    def test_omitted_image_fails(self):
        self.artifacts.append({**self.bind('card.png', b'synthetic-card'), 'kind': 'image'})
        self.snapshots(lambda r: r.update(images=['card.png']))
        self.assertFails('image-artifact-coverage')

    def test_incomplete_dependency_observation_fails(self):
        self.snapshots(lambda r: r.update(unresolved_resources=['not-fetched.css']))
        self.assertFails('consumer-browser')

    def test_browser_evidence_cannot_transfer_to_changed_source(self):
        self.artifacts.append(self.bind('page.html', b'<p>changed source</p>'))
        self.assertFails('consumer-browser')

    def test_narrow_evidence_is_required(self):
        self.manifest['browser_records'].pop()
        self.assertFails('viewport-coverage')

    def test_second_declared_page_cannot_borrow_first_page_viewports(self):
        self.manifest['pages'].append('/missing/')
        self.assertFails('per-page-viewport-coverage')

    def test_empty_artifacts_fail(self):
        self.manifest['artifacts'] = []
        self.assertFails('artifact-coverage')

    def test_duplicate_json_members_are_rejected(self):
        with self.assertRaises(checker.Refusal):
            checker.read_json('{"complete":false,"complete":true}')

    def test_protected_file_is_not_opened(self):
        with self.assertRaises(checker.Refusal):
            checker.local_file(self.root, '.env')

    def test_path_traversal_is_rejected(self):
        with self.assertRaises(checker.Refusal):
            checker.local_file(self.root, '../outside.json')

    def test_symlink_is_rejected(self):
        (self.root / 'redirect.json').symlink_to(self.root / 'tokens.json')
        with self.assertRaises(checker.Refusal):
            checker.local_file(self.root, 'redirect.json')


class NativeObservationTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        def binding(name, value):
            raw = json.dumps(value).encode()
            (self.root / name).write_bytes(raw)
            return {'path': name, 'sha256': checker.digest(raw), 'bytes': len(raw)}
        self.bind = binding
        self.outputs = [binding('card.png', {'synthetic': 'not rendered'})]
        self.run = {'source_text_sha256': 'a' * 64, 'role': 'sans', 'required_family': 'STK Bureau Sans',
                    'actual_family': 'STK Bureau Sans', 'face_id': 'synthetic-safe-face',
                    'provisioning_face_id': 'synthetic-safe-face', 'coverage': True, 'missing': []}
        self.observation = {'schema': 'rasa-native-outline-font-observation-v1', 'complete': True,
                            'unsupported': [], 'missing': [], 'outputs': self.outputs,
                            'source_text_runs': binding('runs.json', [{'source_text_sha256': 'a' * 64, 'role': 'sans'}]),
                            'text_runs': [self.run], 'producer_bindings': {}}
        for key in ('maker', 'font_loader', 'toolchain', 'log'):
            self.observation['producer_bindings'][key] = binding(key + '.json', {'synthetic': True})
        self.observation['producer_bindings']['provisioning_record'] = binding('provision.json', {
            'schema': 'rasa-approved-font-face-map-v1',
            'approval_record': binding('approval.json', {'synthetic': 'NO REAL APPROVAL'}),
            'faces': [{'face_id': 'synthetic-safe-face', 'family': 'STK Bureau Sans', 'role': 'sans'}]})

    def check(self):
        checker.check_native_observation(self.root, self.observation, self.outputs)

    def test_synthetic_complete_binding(self):
        self.check()

    def test_omitted_native_run_fails(self):
        self.observation['text_runs'] = []
        with self.assertRaises(checker.Refusal):
            self.check()

    def test_unapproved_loaded_face_fails(self):
        self.run['face_id'] = 'other-face'
        with self.assertRaises(checker.Refusal):
            self.check()

    def test_missing_glyph_fails(self):
        self.run['missing'] = ['synthetic-missing-glyph']
        with self.assertRaises(checker.Refusal):
            self.check()

    def test_changed_native_text_digest_fails(self):
        self.run['source_text_sha256'] = 'b' * 64
        with self.assertRaises(checker.Refusal):
            self.check()

    def medium_run(self, family):
        self.run.update(role='sans-medium', required_family=family, actual_family=family)
        self.observation['source_text_runs'] = self.bind('medium-runs.json', [
            {'source_text_sha256': 'a' * 64, 'role': 'sans-medium'}])
        old = self.observation['producer_bindings']['provisioning_record']
        record = json.loads((self.root / old['path']).read_text())
        record['faces'][0].update(family=family, role='sans-medium')
        self.observation['producer_bindings']['provisioning_record'] = self.bind('medium-provision.json', record)

    def test_native_medium_role_uses_canonical_sans_family(self):
        self.medium_run('STK Bureau Sans')
        self.check()

    def test_native_medium_role_rejects_slide_deck_family_alias(self):
        self.medium_run('STK Bureau Sans Medium')
        with self.assertRaises(checker.Refusal):
            self.check()

    def test_native_output_must_match_parent_card(self):
        self.observation['outputs'] = []
        with self.assertRaises(checker.Refusal):
            self.check()


if __name__ == '__main__':
    unittest.main()

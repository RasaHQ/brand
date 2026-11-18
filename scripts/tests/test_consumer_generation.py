"""Actual pinned generator integration; run only on the admitted remote Linux runner."""
import importlib.machinery
import importlib.util
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[2]
loader = importlib.machinery.SourceFileLoader('consumer_generation', str(ROOT / 'scripts/rasa-brand-consumer-check'))
spec = importlib.util.spec_from_loader(loader.name, loader)
checker = importlib.util.module_from_spec(spec)
loader.exec_module(checker)


class PinnedGenerationTest(unittest.TestCase):
    def test_pinned_generators_reproduce_all_official_outputs(self):
        outputs, receipt = checker.reproduce_tokens(ROOT)
        self.assertEqual(set(outputs), checker.GENERATED)
        self.assertEqual(receipt['brand_commit'], checker.BRAND_COMMIT)
        self.assertEqual(len(receipt['executions']), 3)
        self.assertTrue(all(item['exit'] == 0 for item in receipt['executions']))
        for name, data in outputs.items():
            self.assertEqual(data, checker.git_blob(ROOT, name))
            self.assertEqual(receipt['outputs'][name], checker.digest(data))


if __name__ == '__main__':
    unittest.main()

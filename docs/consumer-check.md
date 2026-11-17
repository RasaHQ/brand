# Check retained consumer evidence before release.

`scripts/rasa-brand-consumer-check` is a work-in-progress, offline evidence verifier for the Architect's November 17 consumer-check ruling. The required brand revision is `f63584cd419e326eca4b7f74ff0b3bad4ab00c86`. It neither runs the brand source validator nor publishes anything.

```sh
python3 scripts/rasa-brand-consumer-check \
  --brand-root /path/to/brand \
  --consumer-root /path/to/retained-consumer \
  --manifest /path/to/manifest.json
```

The manifest uses `rasa-brand-consumer-manifest-v1` and contains `brand_commit`, nonempty `artifacts` (relative path, SHA256, bytes and kind), `generated_tokens` (consumer artifact path and canonical `brand_source`), `images` (artifact path and bound `render_record`), and nonempty `browser_records` (relative path, SHA256, bytes). The checker independently stages the pinned mirror, card tokens, adapted source JSON, artifact lock and generator scripts in isolated scratch, runs the source-sync check and Node generator with a scrubbed environment, compares every generated output to the pinned Git objects, then compares consumer token bytes. It records input/output and generator-log hashes, exits and actual Node version. An existing Node runtime is required; missing objects/runtime fail without install or lazy fetch. This execution belongs on the approved remote Linux runner. No inherited environment credentials are used or printed. Credential and licensed-font payloads cannot be evidence inputs. The checker does not install anything or fetch remote content.

Browser records use `rasa-brand-browser-observation-v1`, bind the exact `artifacts` array and brand commit, include a viewport, complete computed-style `nodes`, actual `font_observation`, `images`, screenshot and log file bindings. Require `complete: true`, `unsupported: []`, `unresolved_resources: []`, `unresolved_styles: []`. Both desktop (at least 1024px) and narrow (at most 480px) observations are required. Text nodes include their complete computed font stack and CSSOM-resolved colors. Font observations require every text-bearing node's actual STK platform fonts, custom-font flag and positive glyph count. An allowed declaration with a substituted actual face fails. Unresolved CSS syntax or translucent colors without a reviewed compositing rule fail instead of being silently accepted.

Image receipts use proposed `rasa-community-cards-render-record-v2` with exact input/output/maker/toolchain/log bindings and a `font_evidence.observation_kind` discriminator. Browser screenshots use `browser-platform-fonts`. Native Sharp/fontkit composition uses `native-outline-runs`, whose complete text-run source hashes, actual loaded safe face IDs, role/family/coverage, approved provisioning map and exact image outputs must agree. Native text is never assigned fictitious browser glyph use. No font binaries, private font paths, outlines or metrics belong in these records. Browser text over a native image needs both coverage paths.

The native observation uses `rasa-native-outline-font-observation-v1`; its fields and the proposed image-record schema are documented under the linked owner contract in the receiving SOW, currently org-rasahq `projects/rasa-community-benchmarks/evidence/brand-2026-20261117/NATIVE-FONT-OBSERVATION-v2.md`. The approved face map uses `rasa-approved-font-face-map-v1`, has a bound `approval_record` and unique `faces` entries (`face_id`, `family`, `role`). An approval record's existence is mechanical custody evidence; independent review must establish its actual authority.

## Trust boundary and unfinished work

This candidate independently reproduces pinned tokens and validates retained evidence; it does not yet produce or independently reconstruct browser observations or a full dependency closure. A fabricated or incomplete producer observation is not made true by passing its hash checks. The producer/capture integration and adversarial coverage checks are required before this is the completed consumer checker. The reproduction receipt proves this checker executed the pinned generators; it does not attest how a prior consumer build imported them. Consumer import/resource binding remains required before the final contract is complete.

At this stage the result is `PASS_EVIDENCE_ONLY` or `FAIL`, with `operator_visual_verdict: NOT_HELD` and `release_authorized: false` in both cases. `PASS_EVIDENCE_ONLY` means only that the declared evidence passed these mechanical checks. It must not appear as a consumer certification or release gate PASS. Exact source, dependency and state coverage, real producer receipts and independent review remain required. Email's documented font-stack adaptation and native third-party chrome treatment are not silently exempted by this web profile. Unsupported profiles fail or remain unqualified pending the explicit owner ruling.

Run candidate fixtures on production-03 through zeoconnect. No software suite, browser render or design-system check runs on the Mac mini. Any final PR needs actual exact-head gate evidence and both readers. Operator inspection of the actual output remains the final verdict.

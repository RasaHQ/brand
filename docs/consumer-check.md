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

## Capture retained static HTML with the existing browser route.

The companion `scripts/collect-consumer-browser.mjs` extends the community's existing locked `playwright-core` 1.62.1 and `CHROMIUM_PATH` route. It starts an owned read-only loopback server serving only explicitly bound artifacts. It does not import application handlers, click submit, install dependencies or contact a live service. Every external/unbound request fails coverage. The source must already be a retained packet, with source/build identity established by the separate consumer build receipt.

```sh
node scripts/collect-consumer-browser.mjs \
  --consumer-root /path/to/retained-packet \
  --manifest /path/to/input-manifest.json \
  --playwright-module /path/to/existing/node_modules/playwright-core/index.mjs \
  --output-name capture-01
```

The manifest's nonempty `pages` lists explicit static directory routes. Every served artifact adds `url_path`; each route must map to a retained HTML artifact. Images use the same declared artifact map. Optional `font_resources` entries map public URL paths to STKBureau WOFF2 filenames; only the operator-provisioned `RASA_FONTS_DIR` supplies those faces at render time. Font binaries are served to the browser only, never copied into the packet, hashed into public records or committed. The invocation and raw private host provisioning remain with the executing owner.

For each declared page, capture at 375, 768 and 1440px with JavaScript disabled, reduced motion and fresh browser contexts. Capture default plus visible enabled control hover/focus states, CSSOM-resolved paint colors, full declared font stack and actual CDP platform font/glyph use. Retain text hashes, screenshots and safe execution metadata. Recheck all artifact bytes after capture. Consumer verification requires desktop/narrow evidence for each page separately. It cannot borrow one page's coverage for another. Output folder must be new; no previous receipt is overwritten.

Source route: [community browser check](https://github.com/RasaHQ/rasa-community/blob/38ea413e46d585ec229ebc3c639e8f5a8077f600/scripts/check-community-browser.mjs). Browser interfaces: [Playwright CDPSession](https://playwright.dev/docs/api/class-cdpsession) and [CDP platform font usage](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-getPlatformFontsForNode).

This new collector is authored and NOT_RUN. It has a 120-second browser-close deadline and caps at 60 snapshots, 100 controls and 2500 DOM elements per snapshot; executing owner must additionally supervise the process and cleanup. Truncated/over-limit scopes fail. It intentionally reports unsupported inline SVG, embedded frames/canvas/video, nontrivial compositing and generated pseudo text. Native disclosure-open state, unused CSS declaration scanning, source import graph proof, email profiles and independent capture provenance validation are still unfinished. JavaScript application behavior is outside this static profile and remains in the consumer's existing browser tests. Actual image/font receipts and operator inspection are still mandatory. Do not describe this prototype as the completed consumer check.

Actual browser negative-control command (separate from offline core discovery):

```sh
RASA_CONSUMER_PLAYWRIGHT_MODULE=/existing/playwright-core/index.mjs \
CHROMIUM_PATH=/existing/chromium \
RASA_CONSUMER_BROWSER_RECEIPTS_DIR=/new-owned-receipts-parent \
PYTHONDONTWRITEBYTECODE=1 python3 scripts/tests/browser_consumer_integration.py -v
```

This intentionally provides no licensed fonts, captures real fallback glyph use and requires the checker to refuse it. It preserves original screenshots, observations and command outputs under the executing owner's receipt folder. It is a negative control, never a qualified positive render. No missing browser dependency is silently skipped or installed. Positive real-STK consumer qualification remains separately required.

## Receive the community source record.

The optional `rasa-community-source-v1` profile receives the site's settled `src/brand/source.json` interface from [theme candidate e4d9ab15](https://github.com/matorclawson/rasa-community/blob/e4d9ab1584a70aa0da42fd930b108c1b0cd9df1c/src/brand/source.json). Set manifest `profile` to that value and add `source_record` as a path/SHA256/size binding, also included in `artifacts`.

Its seven `generatedOutputs` entries are classified accurately: three generated token outputs plus exact component CSS, licensed-font CSS, substitute-font CSS and the font-lock JSON. Every export must match pinned upstream bytes; the four static exports are not falsely called new generator executions. The source-sync/Node reproduction is still a separate actual step.

Catalog entries bind exact current asset IDs, upstream paths and hashes. Non-font files also bind retained consumer bytes and size. Font-file entries are metadata only: their payloads must be omitted from the source-check packet. Listing an actual font payload as an input is refused. Catalog agreement never proves actual rendered font use or a community-cards image render. The explicit November17 operator ruling now separates unchanged official catalog files from newly generated media, as specified below; catalog membership is never inferred from a filename. Unknown consumer source profiles fail.

The receiver is authored and NOT_RUN. Seven new synthetic fixtures cover the settled exports, stale/missing metadata, changed static CSS, reference assets and attempted font-payload input. Intake metadata must not be presented as an application build, import-graph proof, browser result or visual approval.

## Apply exactly two image proof classes.

Operator ruling via the Architect, November17 18:48Z: an official brand file copied unchanged is proven by exact pinned catalog category, ID, path and SHA256; nothing was rendered, so no render receipt is invented. New generated cards, OG/share images, diagrams and headers still require a community-cards v2 receipt showing actual STK use and the operator's visual approval.

`images` entries with `proof_class: "official-catalog"` provide `catalog: {id, path, category, sha256}`. The checker requires a unique current entry at f635, identical format, size and retained bytes. A different color, crop, format, path/category claim or custom image cannot claim unchanged custody. Font payloads remain forbidden source packet inputs; metadata/OFL files use source/catalog custody, not fictional glyph-use proof.

Generated entries use `proof_class: "generated"` (the safe default when omitted) and a bound `render_record`. Unknown third classes fail. Missing generated render records remain failures even if a catalog-shaped claim is present. Whole-consumer operator approval remains separate in either case. Seven synthetic fixtures cover unchanged catalog proof, altered bytes, reference assets, forged identity/path, missing generated receipt and an unsupported third class. No fixture is an actual branded render.

The settled source inventory includes `JetBrains Mono/OFL.txt`; retained artifact filenames may therefore contain spaces. The collector permits those filenames while still refusing absolute/traversing paths, control characters, backslashes, symlinks and protected payload types. The actual browser negative fixture includes this non-font license-path case. This is a source compatibility fix, not a license-file render or font qualification.

Native family correction: for community-card role `sans-medium`, both required and actual family are `STK Bureau Sans`, with the approved Medium face selected through its safe provisioned face/role binding. The pinned `design-system/src/fonts.css` defines that face at weight 500 under the same Sans family. `STK Bureau Sans Medium` is the separate-family slide-deck recipe and is not the native card family. Two synthetic controls bind this distinction; no real receipt or historical run is relabeled.

Paint observation records foreground color on actual text/control text and records border/outline colors only when those lines are drawn. An empty ancestor's unused default black color or a `border-style: none` color is not a painted violation. Real text descendants and visible lines still report their own resolved color. The actual fallback negative fixture deliberately leaves the empty HTML ancestor's default color untouched, so that it tests real font refusal rather than an unrelated unused-color failure.

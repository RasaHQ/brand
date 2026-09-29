# Motion conventions

Static Figma SVGs establish layout and visual state, not timing. The live homepage contains animation/video, but its exact timing system was not audited. Everything below is a **proposed shared motion convention**.

| Token | Milliseconds | Typical role |
| --- | --- | --- |
| Fast | 160 | Small control response |
| Standard | 240 | Panel or state transition |
| Reveal | 480 | Short diagram or card reveal |
| Stagger | 80 | Gap between related reveals |
| Displacement | 16px | Small positional reveal at web scale |
| Ease | cubic-bezier(0.22, 1, 0.36, 1) | Settle without bounce |

Use opacity and small translations; reserve scaling for emphasis or an actual change of focus. Avoid constant bobbing, elastic springs, spinning marks, dramatic parallax, noise fields or morphing the Rasa logo. Keep background details subordinate to the explanation.

## Sequence by meaning

Show input, then the operation, then evidence of its result. For a skill diagram: source appears, connector is revealed, destination becomes available, state label updates. Never show a successful result merely because a timer elapsed if the UI is connected to a real backend. In explanatory video, mark invented data as illustrative.

A proposed 8-second explainer can spend 0–1.5 seconds on the problem, 1.5–5 seconds on the operation, and 5–8 seconds on the result. Adjust the hold for reading time; motion duration and message-reading duration are different.

## Remotion

Use the concrete JS tokens for colors and geometry. Use `useCurrentFrame()` and `useVideoConfig()`; convert milliseconds through the actual fps. Do not use wall-clock timers, CSS animations or a live Anime.js timeline to drive exported frames. Randomness, if needed, must be seeded.

The example composition runs at 1920×1080, 30fps, 240 frames. It uses frame-based ease curves derived from the shared token. Its `reducedMotion` prop supplies an intentional static version. React styles accept the font weight 350. The optional licensed-font helper uses `@remotion/fonts` and `staticFile()` so rendering waits for files; do not hotlink website fonts or render before readiness.

The example works with system fallbacks by default. Production acceptance with STK fonts remains outstanding until authorized files are provisioned. Recheck wrapping after font installation. Test beginning, transition, middle and ending frames. Keep essential text on-screen long enough and provide a caption/transcript deliverable for narration.

## Anime.js 4

The browser example uses `animate()` with a supplied easing function and shared timings. It honors reduced motion and returns cleanup to cancel animations, disconnect observation and restore visible content. Call cleanup when an Astro page transition or component unmount removes the root.

Content is visible before JavaScript initializes. The demo animates decorative cards only; it must not hide keyboard-focusable controls. An observer starts the reveal as the panel enters view, and it runs once. If reduced motion changes while active, the content immediately resolves to its final state.

## Cross-format consistency

Keep colors, type roles, card geometry and semantic ordering shared. Do not force identical pixel distances onto web and 1080p video: scale a composition intentionally. Web reduced-motion settings cannot control an exported video, so provide a static poster or reduced-motion video version where appropriate.

Reference APIs: [Remotion font loading](https://www.remotion.dev/docs/fonts-api/load-font), [Remotion interpolation](https://www.remotion.dev/docs/interpolate), [Anime.js animation](https://animejs.com/documentation/animation/). Examples target Remotion 4 and Anime.js 4; package versions used for validation are recorded separately.

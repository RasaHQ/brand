# Validation

October results are in `evidence/validation-results.json` and the audit. The following is retained historical evidence from the previous implementation; it is not a current acceptance claim.

# Validation report

Completed 28 September 2026.

## Passed

- All current semantic color aliases resolve to extracted primary values.
- Ten intended text/control color pairings pass their selected contrast targets. Four risky/reference pairs are reported separately, including bright pink on cream at **3.09:1**: acceptable for qualifying large text, not ordinary small text.
- Tailwind **3.4.19** and **4.3.3** compile the expected color, font and radius utilities; v3 opacity modifier example included.
- Component CSS parses and bundles successfully; all referenced `--rasa-*` variables are defined.
- Anime.js **4.5.0**, Remotion **4.0.529**, and the optional font helper bundle successfully.
- All TypeScript/TSX examples pass strict TypeScript **7.0.2** checking.
- The Astro example compiles with `@astrojs/compiler` **4.0.0** without error diagnostics.
- Relative Markdown documentation links resolve within the overlay.
- All six original SVGs were rendered and visually inspected. The two original reference graphics were also rendered and visually reviewed.

Versions are recorded in `evidence/validation-versions.json`. Contrast results are in `evidence/contrast.json`.

## Not claimed

No production website or public repository was modified or deployed. These checks do not constitute a full Astro application build, a browser interaction suite, a rendered Remotion video, or a WCAG conformance audit. The supplied font license files were unavailable, so exact STK font layout and video rendering have not been verified. The HTML specimen uses available fallback fonts and was checked structurally; its full responsive browser acceptance remains part of integration.

No font binaries, full Figma boards, customer marks or source website HTML were added to the public-repository overlay. Logo paths reference existing assets in the parent brand repository.

## Consumer acceptance

After integration, test actual routes, navigation/forms, CSP, asset loading, narrow layouts and zoom. Review static and animated states with licensed fonts. Check representative beginning/middle/end video frames before a full render. Confirm any proposed brand extensions with the brand owner.

## Agent-first addition

- Validated `rasa-brand` frontmatter and naming with the skill-creator validator.
- Verified both discovery copies exactly match root `SKILL.md` and their relative locators resolve to the brand root.
- Exercised consumer installation for both agents, repeat installation, preservation of an existing `AGENTS.md`, conflict preflight before any writes, and explicit skill replacement.
- Forward-tested the workflow with an independent coding agent on an Astro + Tailwind 3 event-card task with missing STK files and existing RSVP behavior. It selected the v3 adapter, retained interactions, used fallbacks, distinguished proposed event styling and specified actual runtime/visual checks. No consuming application was modified. The agent noticed `docs/agents.md` while that document was still being written; the completed document is included and path-checked in this package.
- Native Codex CLI/Claude Code discovery was not executed here. Discovery layout and shared-instruction syntax were checked against their official documentation.

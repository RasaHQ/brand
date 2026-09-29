# Coding agents are first-class consumers

Use one versioned brand workflow for people and agents. Keep always-loaded instructions short; load detailed recipes when the task needs them. A root SKILL.md is also readable directly by any agent, but discovery uses the agent-specific project directories below.

## Files

| File | Role |
| --- | --- |
| `SKILL.md` | Canonical portable Rasa implementation workflow |
| `AGENTS.md` | Repository rules, source locations and verification commands |
| `CLAUDE.md` | Imports the shared rules with `@AGENTS.md` |
| `.agents/skills/rasa-brand/SKILL.md` | Generated project skill for Codex |
| `.agents/skills/rasa-brand/agents/openai.yaml` | Codex skill display metadata |
| `.claude/skills/rasa-brand/SKILL.md` | Generated project skill for Claude Code |
| `brand-root.txt` beside each discovered skill | Relative locator for the full brand checkout |
| `scripts/sync-agent-skills.py` | Regenerates the two copies; `--check` detects drift |
| `scripts/install-agent-skill.py` | Installs the skill into another project without replacing its instruction files |

The skill includes source resolution, task-specific reading, integration selection, implementation rules, visual/functional verification and a handoff format. It does not reproduce the entire brand manual or embed licensed assets.

## Work in the brand repository

Keep the dot-directories when copying or extracting the package. They contain intentional discovery files. Edit the root skill and run:

```sh
python3 scripts/sync-agent-skills.py
python3 scripts/sync-agent-skills.py --check
```

Use Codex's skill selector to choose `rasa-brand`, or ask it to use the Rasa brand skill. In Claude Code, invoke `/rasa-brand`. A plain instruction to read the root `SKILL.md` also works when the client does not discover project skills.

## Use in a consumer repository

Keep a full checkout of the brand repository beside the consumer, or vendor a pinned copy inside it. Run from the brand checkout:

```sh
python3 scripts/install-agent-skill.py --target /absolute/path/to/community --agent both
```

The script adds the two project skill files and relative brand locators. It never overwrites the consumer's `AGENTS.md` or `CLAUDE.md`. If a differing `rasa-brand` skill already exists, it stops before writing; review the difference and use `--replace-skill` only for an intentional update. It does not install global/personal skills, change tool permissions, install npm packages or copy fonts.

The full checkout must remain available at the recorded relative location. For a team/CI setup, prefer a pinned submodule or vendored directory inside the consumer so every checkout has the same sources. A sibling checkout works locally but needs the same relative layout on other machines. Re-run installation if paths change. Do not commit machine-specific absolute paths or a token-only npm dependency as the skill's source location.

If the consumer already has agent instructions, merge a short pointer into them through its normal review process, for example: “For Rasa visual changes, use the rasa-brand project skill and the shared brand tokens. Preserve this repository's architecture and validation workflow.” Keep unrelated project rules. This package's root instructions are for the brand repo; do not overwrite a consuming application's root instructions with them.

## Example tasks

- “Use the Rasa brand skill to reskin the events index and event detail template. Preserve RSVP behavior, routes and metadata. Reuse the existing Astro components and show desktop/mobile results.”
- “Use the Rasa brand skill to create a 1920×1080 Remotion explainer. Use shared tokens, frame-driven motion and the approved local fonts; deliver representative frames.”
- “Use the Rasa brand skill to review this page. Identify visual drift and accessibility issues with concrete file references. Implement the fixes within the existing component architecture.”
- “Use the Rasa brand skill to make a square event cover. Use a meaningful composition and supplied logo assets; report whether the final typography uses STK or fallbacks.”

## Expected handoff

Ask the agent to report outcome, changed components, token/adapter usage, checks actually run, visual evidence and any remaining font/asset or runtime-validation gap. Compilation is useful evidence but does not substitute for looking at the rendered result. A proposed local extension must not quietly become an official brand rule.

## Maintenance and validation

Run `python3 scripts/sync-agent-skills.py --check` in the existing CI workflow if desired. This package adds no automatic publishing workflow. When updating the brand package, regenerate copies and review the source/referral paths along with the code changes.

The shipped skill's structure and installer have been checked; discovery has not been exercised inside actual Codex CLI or Claude Code sessions in this environment. A forward test with an independent coding agent is recorded in `docs/validation.md`. User-level policies, client versions and project trust settings may affect loading.

## Official discovery references

Checked 28 September 2026:

- [Codex skills](https://learn.chatgpt.com/docs/build-skills): repository discovery under `.agents/skills/`.
- [Codex AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md): repository instruction files.
- [Claude Code skills](https://code.claude.com/docs/en/skills): project discovery under `.claude/skills/` and explicit skill invocation.
- [Claude Code memory](https://code.claude.com/docs/en/memory): shared instructions through the `@AGENTS.md` import.

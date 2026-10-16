# Rasa brand repository instructions

Use the root `SKILL.md` for Rasa implementation and review work. Read only the task-relevant references it names. The same workflow is exposed as `rasa-brand` in both supported agent directories.

## Source of truth

- `design-system/src/tokens.json`: shared web token values, reconciled with supplied JSON.
- `assets/catalog.json`: current/reference/archived asset metadata and exact IDs.
- `evidence/source-coverage.json`: every supplied file disposition.
- `docs/assets.md`, `docs/web.md`, `docs/email.md`: production recipes.
- `design-system/src/components.css`: adapted opt-in component recipes.
- `README.md` and `docs/`: brand guidance and consumer integration.
- `docs/source-audit.md` and `evidence/`: measured sources and unresolved decisions.
- Root `SKILL.md`: canonical agent workflow; platform copies are generated.

Current direction: warm cream/taupe, dark ink, selective pink, STK Bureau Serif/Sans/Sans Mono. Keep retired purple/gradient assets historical. Do not infer official rules from leftover website CSS. Preserve observed/adapted/proposed labels.

Do not commit licensed font binaries, private Figma boards or invented brand/customer claims. Existing approved logo geometry is authoritative. Do not publish or deploy merely because a skill is present; follow the user's task and repository workflow.

## Commands

```sh
npm --prefix design-system run build
npm --prefix design-system run check
npm --prefix design-system run reference
python3 scripts/build-email.py
python3 scripts/sync-agent-skills.py
python3 scripts/validate-brand.py
python3 scripts/sync-agent-skills.py --check
```

Edit token source before regeneration, not `dist/`. Edit root `SKILL.md`, not either platform copy. Review resulting diffs. Match testing to the change: use consumer builds and rendered inspection for UI/motion work; a documentation edit does not require unrelated application tests. State any checks not run and why.

When adding these instructions to an existing repository, merge with its instructions rather than replacing unrelated rules.

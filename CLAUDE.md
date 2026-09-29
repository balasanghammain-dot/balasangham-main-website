# Project Guidelines: Balasangham Main Website

## Workflow & Version Control
- **Strict Git Flow**: Never commit directly to `main`.
- **Feature Branches**: Every new feature or bugfix must be developed on a dedicated branch (`feat/<name>` or `fix/<name>`).
- **Pull Requests**: Every feature must be shipped via a Pull Request with tests and verification passing.
- **Conventional Commits**: Format commit messages as `<type>(<scope>): <subject>` (e.g., `feat(ui): add gallery lightbox`).

## Build & Test Commands
- Dev server: `npm run dev`
- Run tests: `npm test`
- Build: `npm run build`

<!-- antislop:start -->
## antislop
For UI, copy, people, mobile layout, or code comments work, read `antislop.md` (core) and then the skill for the task:
- UI / visual: `skills/antislop-ui/SKILL.md`
- Copy & text: `skills/antislop-copywriting/SKILL.md`
- People: `skills/antislop-human/SKILL.md`
- Mobile / responsive: `skills/antislop-layoutmobile/SKILL.md`
- Code comments: `skills/antislop-code/SKILL.md`
Before starting, ask the user when antislop applies: during the work, or after it is done.
To update antislop later: download `antislop.md` again, or run `npx antislop-ai --update` if it was installed as skill folders.
<!-- antislop:end -->

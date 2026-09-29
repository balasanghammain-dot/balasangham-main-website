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

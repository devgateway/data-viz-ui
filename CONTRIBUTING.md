# Contributing to data-viz-ui

Thank you for your interest in contributing. This project is maintained by [Development Gateway](https://www.developmentgateway.org/) and welcomes contributions from the community.

This is a pnpm monorepo containing two published packages:

- [`@devgateway/dvz-ui-react`](packages/dvz-ui) — embeddable React components for data visualization
- [`@devgateway/wp-react-lib`](packages/react-lib/wp-react-lib) — WordPress REST API integration for React

## Table of Contents

- [Development Setup](#development-setup)
- [Branching Model](#branching-model)
  - [Long-running project branches](#long-running-project-branches)
- [Making Changes](#making-changes)
- [Commit Messages](#commit-messages)
- [Code Style](#code-style)
- [Opening a Pull Request](#opening-a-pull-request)
- [Adding a New Embeddable Component](#adding-a-new-embeddable-component)
- [License](#license)
- [Security](#security)

---

## Development Setup

### Prerequisites

- Node.js v22+
- pnpm v10+
- Docker (only needed to run the WordPress example locally)

### Install

```bash
git clone --recurse-submodules git@github.com:devgateway/data-viz-ui.git
cd data-viz-ui
pnpm install
```

### Secrets scanning (pre-commit hook)

This project uses [Gitleaks](https://github.com/gitleaks/gitleaks) to prevent secrets from being accidentally committed. Install the hook after cloning:

```bash
pip install pre-commit
pre-commit install
```

### Build in watch mode

```bash
pnpm dev
```

### Run the example app

```bash
cd example && pnpm dev
```

### Type-check without building

```bash
pnpm --filter @devgateway/* typecheck
```

---

## Branching Model

- `main` is the stable branch and the base for all pull requests.
- Create a branch off `main` for every change, using a prefix that matches the Conventional Commits type:
  - `feat/short-description`
  - `fix/short-description`
  - `chore/short-description`
  - `docs/short-description`
  - `refactor/short-description`
- For long-running project integrations use `project/short-description` (see below).
- Do not push directly to `main`.

### Long-running project branches

Projects that contribute work incrementally over time can maintain a `project/` branch and merge into `main` via PR when ready. Use a generic description with no client name or internal identifier — e.g. `project/multilingual-posts`, `project/superset-embedded-charts`. All commits on a `project/` branch must follow the same conventions as any other branch. Only generic, reusable code belongs here — client-specific customisations must stay in the project's own private repository.

---

## Making Changes

### Adding a changeset

Every PR that changes a published package must include a changeset:

```bash
pnpm changeset
```

Select the affected packages, choose the bump type (`major` / `minor` / `patch`), and write a one-line description for the changelog. Commit the generated file alongside your changes.

| Change type | Bump |
|---|---|
| Breaking API change | `major` |
| New component or feature | `minor` |
| Bug fix, refactor, dependency update | `patch` |

Changes to `example/` only do not need a changeset (it is excluded from releases).

---

## Commit Messages

This project follows [Conventional Commits](https://www.conventionalcommits.org/). Use a prefix that reflects the nature of the change:

| Prefix | When to use |
|---|---|
| `feat:` | New component, hook, or user-facing feature |
| `fix:` | Bug fix |
| `chore:` | Dependency update, tooling, config |
| `docs:` | Documentation only |
| `refactor:` | Code restructure with no behaviour change |
| `ci:` | CI/CD workflow changes |

For breaking changes append `!` to the prefix, and add a `BREAKING CHANGE:` footer in the commit body:

```
feat(dvz-ui)!: rename Chart data prop

BREAKING CHANGE: the `data` prop on Chart has been renamed to `dataset`
```

Examples:
```
feat(dvz-ui): add sankey chart component
fix(wp-react-lib): correct SSR window guard in usePost
chore: upgrade react-router to 7.9.4
ci: exclude example from test-pr workflow
```

---

## Code Style

- TypeScript for all new source files in `dvz-ui`
- ESLint is configured — run `pnpm --filter @devgateway/dvz-ui-react typecheck` before pushing
- No inline comments unless the reason is non-obvious
- Keep components focused; avoid adding features beyond what the PR describes

---

## Opening a Pull Request

Forking is not enabled on this repository. To contribute, request access from a maintainer, then create a branch directly in this repo off `main`.

1. Create a branch off `main` (see [Branching Model](#branching-model))
2. Make your changes and add a changeset (see above)
3. Ensure `pnpm build` passes locally — CI runs the same check
4. Open a PR against `main` with a clear description of what changed and why
5. At least one maintainer approval is required before merging
6. All CI checks must pass

CI will build the packages and publish a preview install link via `pkg-pr-new` so you can test your changes before merge.

Do not introduce hardcoded credentials, internal URLs, client-specific identifiers, or PII. Ensure any new dependency has an Apache-2.0-compatible license.

---

## Adding a New Embeddable Component

New components live under `packages/dvz-ui/src/embeddable/<component-name>/`. Export the component from `packages/dvz-ui/src/index.ts` and register it in the component map if it should be auto-discoverable by name.

---

## License

By contributing you agree that your contributions are licensed under the [Apache License 2.0](LICENSE).

---

## Security

Please do not report security vulnerabilities through public GitHub issues. See [SECURITY.md](SECURITY.md) for the responsible disclosure process.

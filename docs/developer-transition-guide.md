# Developer Transition Guide

This guide explains the specific changes to our workflow required now that this repository is public. It is written based on patterns observed in recent commits.

---

## 1. Commit messages

### What changed

Commit messages must follow [Conventional Commits](https://www.conventionalcommits.org/). The current pattern of putting ticket IDs in the scope or body is no longer valid — the repository is now public and internal ticket references must not appear in new commits.

### Current pattern (stop doing this)

```
fix (PROJ-123): fix wp content links from being translated
chore (PROJ-456): fix measures component
feat (PROJ-789): make posts pagination translatable
chore : exclude some folders from pr testing
Update .github/workflows/test-pr.yml
```

Problems:
- Ticket IDs expose internal client project names
- Space before colon (`chore :`) is invalid
- No prefix at all (`Update .github/...`) is invalid
- Using `chore` for bug fixes is misleading — use `fix`

### Correct pattern (do this instead)

```
fix(dvz-ui): fix wp content links being translated
fix(dvz-ui): fix measures component not rendering in wp editor
feat(dvz-ui): make posts pagination translatable
chore: exclude example from pr workflow
chore(ci): update test-pr workflow paths
```

The scope (in parentheses) should be the package or area being changed — not a ticket ID.

| Prefix | Use for |
|---|---|
| `feat` | New component, hook, or user-facing feature |
| `fix` | Bug fix |
| `chore` | Tooling, config, dependency updates |
| `docs` | Documentation only |
| `refactor` | Code restructure, no behaviour change |
| `ci` | CI/CD workflow changes |

For breaking changes add `BREAKING CHANGE:` in the commit body, or append `!` to the prefix: `feat(dvz-ui)!: rename Chart props`.

---

## 2. Branch naming

### What changed

Branches must no longer include ticket IDs.

### Current pattern (stop doing this)

```
task/TCDICORE-545/fix-wp-content-links
task/TOBACCO-1569/fix-measures-component
task/TCDICORE-539/fix-post-intro-links
TCDICORE-518-2
```

### Correct pattern (do this instead)

```
fix/wp-content-links-translation
fix/measures-component-wp-editor
fix/post-intro-links
feat/translatable-pagination
chore/upgrade-react-router
```

Use `feat/`, `fix/`, `chore/`, `docs/`, or `refactor/` as the prefix, matching the Conventional Commits type of the primary change.

---

## 3. Changesets

### What changed

Nothing in how changesets work — `pnpm changeset` is still required for every PR that touches a published package. The only change is that the changeset commit message should not contain a ticket ID.

### Current pattern (stop doing this)

```
chore: add changeset          ← separate commit just for the changeset
fix (TCDICORE-545): the fix   ← the actual change in a prior commit
```

### Correct pattern (do this instead)

Add the changeset in the same commit as the code change, or as its own commit with a clean message:

```
fix(dvz-ui): fix wp content links being translated
chore: add changeset
```

The changeset description (inside the `.changeset/*.md` file) is what appears in the public CHANGELOG — write it for an external audience, not for an internal ticket tracker.

**Instead of:**
```
TCDICORE-545 - fix wp content links from being translated
```

**Write:**
```
Fix wp content links being incorrectly translated in post components
```

---

## 4. Long-running project branches

Projects that contribute work incrementally over time can maintain a long-running branch in this repo and merge into `main` via PR when ready. This replaces the old `tcdi-official-main` pattern.

### Naming

Use `project/short-description` — a generic description of what the project is building, with no client name or internal identifier:

```
project/data-dashboard-integration
project/multilingual-posts
project/superset-embedded-charts
```

### Rules for project branches

- All commits on a `project/` branch must follow the same Conventional Commits and no-ticket-ID rules as any other branch
- Only generic, reusable code goes on a `project/` branch — client-specific customisations must stay in the project front repo.
- Merge into `main` via PR with at least one maintainer approval, same as any other branch
- Keep the branch up to date with `main` regularly to avoid large divergent merges

---

## 5. Pre-commit hook (new requirement)

[Gitleaks](https://github.com/gitleaks/gitleaks) must be installed locally to prevent secrets from being accidentally committed. Run this once after cloning:

```bash
pip install pre-commit
pre-commit install
```

This will block commits that contain API keys, passwords, tokens, or other sensitive patterns before they leave your machine.

---

## Quick reference card

| | Before | After |
|---|---|---|
| **Branch** | `task/TCDICORE-545/fix-links` | `fix/wp-content-links-translation` |
| **Commit** | `fix (TCDICORE-545): fix links` | `fix(dvz-ui): fix wp content links translation` |
| **Changeset description** | `TCDICORE-545 - fix wp content links` | `Fix wp content links being incorrectly translated` |
| **Breaking change** | `chore: breaking stuff` | `feat(dvz-ui)!: rename Chart data prop` |
| **Long-running branch** | `tcdi-official-main` | `project/data-dashboard-integration` |

---
title: Posts Filters Reset Button Embeddable Component
version: 1.0
date_created: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [design, dvz-ui, embeddable, posts, filter, reset, redux]
---

# Introduction

The `posts-filters-reset-button` embeddable renders a button that resets all active post-filter selections for a given Redux post-filter group back to the initial state.

## 1. Purpose & Scope

**Purpose**: Define the enabled/disabled logic and Redux dispatch for resetting post taxonomy filters.

**Scope**: `packages/dvz-ui/src/embeddable/posts-filters-reset-button/index.tsx`.

**Intended Audience**: Engineers building filterable WP post listing pages.

## 2. Definitions

| Term | Definition |
|------|------------|
| **Post filter group** | Redux namespace for WP post taxonomy filters (distinct from CSV/chart filter groups). |
| **Applied filters** | The active taxonomy filter values in the Redux post filter store. |
| **Initial filters** | The baseline state before any user selections. |

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: The button MUST be enabled only when `appliedFilters` differs from `initialFilters`.
- **REQ-002**: Clicking the enabled button MUST dispatch a Redux action resetting all post filters for the group.
- **REQ-003**: `data-reset-label` MUST be the button label (default `"Reset All Filters"`).
- **CON-001**: This component uses `useAppDispatch` and `useAppSelector` (RTK typed hooks).

## 4. Interfaces & Data Contracts

### `data-*` Attribute Props

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data-group` | `string` | — | Redux post filter group name. |
| `data-reset-label` | `string` | `"Reset All Filters"` | Button label. |

## 5. Acceptance Criteria

- **AC-001**: Given no active post filters, the button is disabled.
- **AC-002**: Given active post filter selections, the button is enabled.
- **AC-003**: Clicking the enabled button resets all post filters for the group.
- **AC-004**: Given `data-reset-label="Clear All"`, the button renders `"Clear All"`.

## 6. Test Automation Strategy

- **Test Levels**: Unit (enabled/disabled logic), Integration (RTK dispatch mock).
- **Frameworks**: Vitest + `@testing-library/react` + Redux mock store.
- **CI/CD Integration**: `pnpm --filter @devgateway/dvz-ui-react test`.

## 7. Rationale & Context

A dedicated reset button for post filters keeps the filter embeddable stateless (it only writes selections) while giving users a single-click way to start over.

## 8. Dependencies & External Integrations

### Technology Platform Dependencies
- **PLT-001**: `@reduxjs/toolkit` — `useAppDispatch`, `useAppSelector`.

## 9. Examples & Edge Cases

```jsx
<div data-component="posts-filters-reset-button"
     data-group="pub-filter-group"
     data-reset-label="Reset Filters" />
```

## 10. Validation Criteria

- **VAL-001**: Button disabled when no active filters.
- **VAL-002**: Reset dispatch fires on click.

## 11. Related Specifications / Further Reading

- [spec-design-dvz-ui-posts-filter.md](./spec-design-dvz-ui-posts-filter.md)
- [spec-design-dvz-ui-filter-reset-button.md](./spec-design-dvz-ui-filter-reset-button.md)

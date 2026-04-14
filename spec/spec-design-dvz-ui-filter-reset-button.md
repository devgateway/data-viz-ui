---
title: Filter Reset Button Embeddable Component
version: 1.0
date_created: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [design, dvz-ui, embeddable, filter, reset, redux]
---

# Introduction

The `filter-reset-button` embeddable renders a button that resets all active CSV/chart filter selections for a given Redux filter group back to their initial state.

## 1. Purpose & Scope

**Purpose**: Define the enabled/disabled state logic and Redux dispatch contract for `filter-reset-button`.

**Scope**: `packages/dvz-ui/src/embeddable/filter-reset-button/index.tsx`.

**Intended Audience**: Engineers building filterable data dashboards.

## 2. Definitions

| Term | Definition |
|------|------------|
| **Filter group** | A Redux namespace coordinating shared filter state. |
| **Initial filters** | The baseline filter state before any user selections. |
| **Applied filters** | The currently active filter selections in the Redux store. |

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: The button MUST be enabled only when the current filter state differs from the initial filter state for the group.
- **REQ-002**: Clicking the enabled button MUST dispatch a Redux action to reset all filters for the group to their initial state.
- **REQ-003**: The button MUST be disabled (non-interactive) when no filters have been applied.
- **REQ-004**: `data-reset-label` MUST be used as the button label.
- **CON-001**: The component MUST connect to Redux via `mapStateToProps` and `mapActionCreators`.

## 4. Interfaces & Data Contracts

### `data-*` Attribute Props

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data-group` | `string` | — | Redux filter group name. |
| `data-app` | `string` | `"csv"` | Data app identifier. |
| `data-reset-label` | `string` | `"Reset All Filters"` | Button label. |

### Redux State Contract

```typescript
interface ResetButtonStateProps {
  initialFilters: Record<string, string[]>;
  filteredApplied: string[];
}
```

## 5. Acceptance Criteria

- **AC-001**: Given no active filters, when rendered, the button is disabled.
- **AC-002**: Given an active filter selection, when rendered, the button is enabled.
- **AC-003**: When the enabled button is clicked, all filters for the group are reset to initial state.
- **AC-004**: Given `data-reset-label="Clear Filters"`, the button renders with that label.

## 6. Test Automation Strategy

- **Test Levels**: Unit (enabled/disabled state computation), Integration (Redux dispatch mock).
- **Frameworks**: Vitest + `@testing-library/react` + Redux mock store.
- **CI/CD Integration**: `pnpm --filter @devgateway/dvz-ui-react test`.

## 7. Rationale & Context

A dedicated reset button is required in complex dashboards with multiple active filters. Keeping reset logic in a separate embeddable allows it to be placed anywhere on the page independently of individual filter controls.

## 8. Dependencies & External Integrations

### Technology Platform Dependencies
- **PLT-001**: Redux store — filter group state read and reset dispatch.

## 9. Examples & Edge Cases

```jsx
// Standard reset button
<div data-component="filter-reset-button"
     data-group="dashboard-1"
     data-app="csv"
     data-reset-label="Clear All" />

// Edge: group not yet initialised — button renders disabled
```

## 10. Validation Criteria

- **VAL-001**: Button is disabled when `initialFilters` equals `filteredApplied`.
- **VAL-002**: Reset dispatch fires on click when button is enabled.

## 11. Related Specifications / Further Reading

- [spec-design-dvz-ui-filter.md](./spec-design-dvz-ui-filter.md)
- [spec-design-dvz-ui-filters-apply-button.md](./spec-design-dvz-ui-filters-apply-button.md)
- [spec-design-dvz-ui-posts-filters-reset-button.md](./spec-design-dvz-ui-posts-filters-reset-button.md)

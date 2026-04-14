---
title: Filters Apply Button Embeddable Component
version: 1.0
date_created: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [design, dvz-ui, embeddable, filter, redux]
---

# Introduction

The `filters-apply-button` embeddable renders a button that commits pending filter selections to the Redux filter store. It enables a two-step filter workflow: users first adjust filter values, then explicitly apply them.

## 1. Purpose & Scope

**Purpose**: Define the pending/applied state comparison and Redux dispatch contract for `filters-apply-button`.

**Scope**: `packages/dvz-ui/src/embeddable/filters-apply-button/index.tsx`.

**Intended Audience**: Engineers building dashboards requiring explicit filter commitment.

## 2. Definitions

| Term | Definition |
|------|------------|
| **Pending filters** | Filter selections staged by the user but not yet committed. |
| **Applied filters** | The committed filter state that drives chart/data rendering. |
| **Filter group** | A Redux namespace coordinating filter state. |

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: The button MUST be enabled only when pending filter selections differ from the currently applied selections.
- **REQ-002**: Clicking the enabled button MUST dispatch a Redux action committing the pending filters as the applied state.
- **REQ-003**: After apply, the button MUST return to a disabled state (pending now equals applied).
- **REQ-004**: `data-label` MUST be used as the button label (default `"Apply"`).
- **CON-001**: The component MUST connect to Redux via `mapStateToProps` and `mapActionCreators`.

## 4. Interfaces & Data Contracts

### `data-*` Attribute Props

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data-group` | `string` | — | Redux filter group name. |
| `data-app` | `string` | `"csv"` | Data app identifier. |
| `data-label` | `string` | `"Apply"` | Button label. |

## 5. Acceptance Criteria

- **AC-001**: Given pending filters equal applied filters, the button is disabled.
- **AC-002**: Given pending filters differ from applied filters, the button is enabled.
- **AC-003**: Clicking the enabled button dispatches the apply action and disables the button.
- **AC-004**: Given `data-label="Run Query"`, the button renders with `"Run Query"`.

## 6. Test Automation Strategy

- **Test Levels**: Unit (state comparison logic), Integration (Redux dispatch).
- **Frameworks**: Vitest + `@testing-library/react` + Redux mock store.
- **CI/CD Integration**: `pnpm --filter @devgateway/dvz-ui-react test`.

## 7. Rationale & Context

An explicit apply step is required in dashboards where filter changes trigger expensive API calls. Staging selections before committing them reduces unnecessary data fetching.

## 8. Dependencies & External Integrations

### Technology Platform Dependencies
- **PLT-001**: Redux store — pending and applied filter state.

## 9. Examples & Edge Cases

```jsx
<div data-component="filters-apply-button"
     data-group="dashboard-1"
     data-app="csv"
     data-label="Apply Filters" />
```

## 10. Validation Criteria

- **VAL-001**: Button is disabled when no pending changes exist.
- **VAL-002**: Apply dispatch fires exactly once per click.

## 11. Related Specifications / Further Reading

- [spec-design-dvz-ui-filter.md](./spec-design-dvz-ui-filter.md)
- [spec-design-dvz-ui-filter-reset-button.md](./spec-design-dvz-ui-filter-reset-button.md)

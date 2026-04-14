---
title: Filter Embeddable Component
version: 1.0
date_created: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [design, dvz-ui, embeddable, filter, data-visualization, redux]
---

# Introduction

The `filter` embeddable renders a dropdown filter connected to the Redux filter store. It loads dimension values from CSV or API data and dispatches selection changes to the shared filter group, driving updates in dependent chart and data embeddables.

## 1. Purpose & Scope

**Purpose**: Define the dropdown rendering, option sorting, range-mode, and Redux dispatch contract for `filter`.

**Scope**: `packages/dvz-ui/src/embeddable/filter/index.tsx`.

**Intended Audience**: Engineers building filterable data dashboards.

## 2. Definitions

| Term | Definition |
|------|------------|
| **Filter group** | A Redux namespace coordinating shared filter state across embeddables. |
| **Range mode** | A slider-style range selector instead of a multi-select dropdown, enabled by `data-is-range`. |
| **Alphabetical sort** | Option to sort filter values alphabetically instead of by data order. |
| **All option** | A special filter option that clears the selection (selects all rows). |

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: The component MUST load dimension values from `data-csv` or `data-dvz-proxy-dataset-id`.
- **REQ-002**: Selecting a filter option MUST dispatch a Redux action updating the filter group state.
- **REQ-003**: When `data-alphabetical-sort` is `true`, options MUST be sorted alphabetically; `data-asc-order` controls ascending/descending direction.
- **REQ-004**: When `data-is-range` is `true`, the component MUST render a range slider instead of a dropdown.
- **REQ-005**: An "All" option (label from `data-all-label`) MUST be included to clear the filter selection.
- **REQ-006**: Clicking outside the dropdown MUST close it.
- **REQ-007**: `data-placeholder` MUST be shown when no option is selected.
- **CON-001**: The component MUST connect to Redux via `mapStateToProps` and `mapActionCreators`.
- **GUD-001**: Group multiple filters under the same `data-group` to coordinate their state.

## 4. Interfaces & Data Contracts

### FilterPros Interface

```typescript
export interface FilterPros {
  "data-group": string;
  "data-app": string;
  "data-csv"?: string;
  "data-dvz-proxy-dataset-id"?: string;
  "data-dimension": string;
  "data-placeholder"?: string;
  "data-all-label"?: string;
  "data-none-label"?: string;
  "data-alphabetical-sort"?: boolean | string;
  "data-asc-order"?: boolean | string;
  "data-is-range"?: boolean | string;
  "data-label"?: string;
  filters?: Record<string, string[]>;
  onFilterChange?: (group: string, app: string, filter: Record<string, string[]>) => void;
}
```

## 5. Acceptance Criteria

- **AC-001**: Given 5 unique dimension values in the data, when rendered, 5 options (plus "All") appear in the dropdown.
- **AC-002**: Selecting an option dispatches a Redux filter action with the selected value.
- **AC-003**: Selecting "All" clears the active filter selection.
- **AC-004**: Given `data-alphabetical-sort="true"`, options are sorted A–Z by default.
- **AC-005**: Given `data-alphabetical-sort="true"` and `data-asc-order="false"`, options are sorted Z–A.
- **AC-006**: Clicking outside the open dropdown closes it.
- **AC-007**: Given `data-is-range="true"`, a range slider is rendered instead of a dropdown list.

## 6. Test Automation Strategy

- **Test Levels**: Unit (sort logic, option building, outside-click), Integration (Redux store + CSV mock).
- **Frameworks**: Vitest + `@testing-library/react` + Redux mock store + msw v2.
- **CI/CD Integration**: `pnpm --filter @devgateway/dvz-ui-react test`.

## 7. Rationale & Context

A shared Redux filter group enables unidirectional data flow: filters dispatch actions, charts subscribe to state. This avoids prop-drilling across independently mounted embeddables on the same page.

## 8. Dependencies & External Integrations

### Technology Platform Dependencies
- **PLT-001**: Redux store — filter group state dispatch and subscription.
- **PLT-002**: `react-intl` — locale injection.

## 9. Examples & Edge Cases

```jsx
// Standard dropdown filter
<div data-component="filter"
     data-csv="/data/countries.csv"
     data-dimension="country"
     data-group="dashboard-1"
     data-app="csv"
     data-placeholder="Select Country"
     data-all-label="All Countries"
     data-alphabetical-sort="true" />

// Range filter
<div data-component="filter"
     data-csv="/data/years.csv"
     data-dimension="year"
     data-group="dashboard-1"
     data-is-range="true" />
```

## 10. Validation Criteria

- **VAL-001**: Redux filter state is updated on selection.
- **VAL-002**: Alphabetical sort order matches `data-asc-order`.
- **VAL-003**: Range mode renders a slider, not a list.

## 11. Related Specifications / Further Reading

- [spec-design-dvz-ui-filter-reset-button.md](./spec-design-dvz-ui-filter-reset-button.md)
- [spec-design-dvz-ui-filters-apply-button.md](./spec-design-dvz-ui-filters-apply-button.md)
- [spec-design-dvz-ui-posts-filter.md](./spec-design-dvz-ui-posts-filter.md)

---
title: Measures Embeddable Component
version: 1.0
date_created: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [design, dvz-ui, embeddable, measures, filter, redux]
---

# Introduction

The `measures` embeddable renders a set of measure-group selector buttons, allowing users to switch between different data measures shown in dependent chart embeddables. Selections are dispatched to the Redux store.

## 1. Purpose & Scope

**Purpose**: Define the measure group rendering, default selection, and Redux dispatch contract for `measures`.

**Scope**: `packages/dvz-ui/src/embeddable/measures/index.tsx`.

**Intended Audience**: Engineers building dashboards with switchable data measures.

## 2. Definitions

| Term | Definition |
|------|------------|
| **Measure group** | A named set of data measures that can be selected together. |
| **Default selected** | A measure group marked `defaultSelected: true` in the config, auto-selected on mount. |
| **Redux dispatch** | The `setMeasures` action dispatched when a measure group is selected. |

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: The component MUST render one selector item per measure group in `data-measures-groups[app]`.
- **REQ-002**: On mount, measure groups with `defaultSelected: true` MUST be automatically dispatched via `setMeasures`.
- **REQ-003**: Selecting a measure group MUST dispatch `setMeasures({ app, group, mGroup })`.
- **REQ-004**: `data-label` MUST be shown above the selector items if provided.
- **REQ-005**: On unmount, `cleanMeasures` MUST be dispatched to reset the measure state.
- **CON-001**: The component MUST use `useAppDispatch` and `useAppSelector` (RTK typed hooks), not `connect()`.
- **GUD-001**: Coordinate `data-group` and `data-app` with dependent chart embeddables.

## 4. Interfaces & Data Contracts

### MeasuresProps Interface

```typescript
export interface MeasuresProps {
  parent?: string;
  editing?: boolean;
  unique?: string;
  "data-label"?: string;
  "data-group": string;
  "data-app": string;
  "data-measures-groups"?: string | MeasureGroupsConfig;
}

interface MeasureGroupsConfig {
  [app: string]: MeasureGroup[];
}

interface MeasureGroup {
  id: string;
  label: string;
  defaultSelected?: boolean;
  measures: string[];
}
```

## 5. Acceptance Criteria

- **AC-001**: Given 3 measure groups in `data-measures-groups[app]`, when rendered, 3 selector items appear.
- **AC-002**: On mount, groups with `defaultSelected: true` are automatically dispatched as selected.
- **AC-003**: Clicking a measure group item dispatches `setMeasures` with the correct `app`, `group`, and `mGroup`.
- **AC-004**: Given `data-label="Select Measure"`, that label appears above the selector items.
- **AC-005**: On component unmount, `cleanMeasures` is dispatched.

## 6. Test Automation Strategy

- **Test Levels**: Unit (default selection on mount, dispatch on click, cleanup on unmount).
- **Frameworks**: Vitest + `@testing-library/react` + Redux mock store.
- **CI/CD Integration**: `pnpm --filter @devgateway/dvz-ui-react test`.

## 7. Rationale & Context

Measure selectors decouple the choice of what data to display from the chart components themselves. This allows a single chart to display different measures without requiring separate chart instances.

## 8. Dependencies & External Integrations

### Technology Platform Dependencies
- **PLT-001**: `@reduxjs/toolkit` — `useAppDispatch`, `useAppSelector`.
- **PLT-002**: `packages/dvz-ui/src/embeddable/reducers/data` — `setMeasures`, `cleanMeasures`.

## 9. Examples & Edge Cases

```jsx
<div data-component="measures"
     data-group="budget-dashboard"
     data-app="csv"
     data-label="Select Measure"
     data-measures-groups='{"csv":[{"id":"approved","label":"Approved Budget","defaultSelected":true},{"id":"disbursed","label":"Disbursed"}]}' />

// Edge: data-measures-groups is empty → renders empty container without error
```

## 10. Validation Criteria

- **VAL-001**: Default-selected groups are dispatched on mount.
- **VAL-002**: `cleanMeasures` fires on unmount.
- **VAL-003**: TypeScript compilation succeeds.

## 11. Related Specifications / Further Reading

- [spec-design-dvz-ui-filter.md](./spec-design-dvz-ui-filter.md)
- [spec-design-dvz-ui-grouped-bars.md](./spec-design-dvz-ui-grouped-bars.md)

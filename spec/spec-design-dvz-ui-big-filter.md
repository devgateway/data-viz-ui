---
title: Big Filter Embeddable Component
version: 1.0
date_created: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [design, dvz-ui, embeddable, filter, data-visualization]
---

# Introduction

The `big-filter` embeddable renders a large-format categorical filter as a grid of selectable tiles (one per dimension value), each displaying a formatted number. Selecting a tile updates the Redux filter store for the associated group.

## 1. Purpose & Scope

**Purpose**: Define the rendering, selection, and Redux integration contract for the `big-filter` component.

**Scope**: `packages/dvz-ui/src/embeddable/big-filter/index.jsx`.

**Intended Audience**: Engineers building interactive dashboards with prominent categorical filter controls.

## 2. Definitions

| Term | Definition |
|------|------------|
| **Filter group** | A Redux namespace that coordinates filter state across multiple embeddables. |
| **Tile** | A single selectable item displaying a label and formatted numeric value. |
| **dimension** | The categorical data field driving tile generation. |
| **dimension2** | A secondary dimension used to render a second row of values per tile. |

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: The component MUST render one tile per unique value of the primary dimension.
- **REQ-002**: Each tile MUST display a formatted numeric value for the measure associated with that dimension value.
- **REQ-003**: Clicking a tile MUST dispatch a Redux action to update the filter group state with the selected dimension value.
- **REQ-004**: A selected tile MUST be visually distinct from unselected tiles.
- **REQ-005**: When `dimension2` is not `"none"`, each tile MUST also display a secondary value from the second dimension.
- **REQ-006**: Number formatting MUST use the configured `Intl.NumberFormat` options.
- **CON-001**: The component MUST connect to Redux via `mapStateToProps` and `mapActionCreators`.
- **GUD-001**: Place `big-filter` above related chart embeddables in the page so filter state flows correctly to dependent components.

## 4. Interfaces & Data Contracts

### `BigNumberItem` Sub-Component Props

```typescript
interface BigNumberItemProps {
  label: string;
  value: number | string;
  selected: boolean;
  handleClick?: () => void;
  format?: Intl.NumberFormatOptions;
  dimension2?: string;
  secondaryValue?: number | string;
}
```

### Redux State Contract

```typescript
// Filter group state written on tile selection
interface FilterGroupAction {
  type: 'SET_FILTER';
  group: string;
  app: string;
  filter: { [dimension: string]: string[] };
}
```

## 5. Acceptance Criteria

- **AC-001**: Given 5 unique country values in the data, when rendered, 5 tiles appear.
- **AC-002**: When a tile is clicked, the Redux filter group is updated with that tile's dimension value.
- **AC-003**: The selected tile renders with a visually distinct style (e.g., different background/border) compared to unselected tiles.
- **AC-004**: Given `dimension2="year"`, each tile displays both the primary value and a secondary year-based value.
- **AC-005**: Given number format `{"style":"decimal","maximumFractionDigits":0}`, values are displayed without decimal places.

## 6. Test Automation Strategy

- **Test Levels**: Unit (tile rendering, selection state), Integration (Redux dispatch + filter group update).
- **Frameworks**: Vitest + `@testing-library/react` + Redux mock store.
- **CI/CD Integration**: `pnpm --filter @devgateway/dvz-ui-react test`.

## 7. Rationale & Context

Large-format filter tiles are preferred over dropdown filters in contexts where the set of values is small (5–15 items) and users benefit from seeing aggregate values alongside filter options. This allows data-driven filtering where the filter control itself communicates scale.

## 8. Dependencies & External Integrations

### Technology Platform Dependencies
- **PLT-001**: Redux store — filter group state.
- **PLT-002**: `react-intl` — number formatting.

## 9. Examples & Edge Cases

```jsx
// Country filter showing beneficiary counts per country
<div data-component="big-filter"
     data-csv="/data/by-country.csv"
     data-dimension1="country"
     data-measure="beneficiaries"
     data-group="dashboard-1"
     data-app="csv" />

// Edge: empty data — renders empty container without tiles
<div data-component="big-filter"
     data-csv="/data/empty.csv"
     data-dimension1="country"
     data-measure="total" />
```

## 10. Validation Criteria

- **VAL-001**: Redux filter store is updated exactly once per tile click.
- **VAL-002**: Selected tile has a different CSS class than unselected tiles.
- **VAL-003**: Empty data renders no tiles without throwing.

## 11. Related Specifications / Further Reading

- [spec-design-dvz-ui-filter.md](./spec-design-dvz-ui-filter.md)
- [spec-design-dvz-ui-filter-reset-button.md](./spec-design-dvz-ui-filter-reset-button.md)

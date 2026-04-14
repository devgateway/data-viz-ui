---
title: Big Number Embeddable Component
version: 1.0
date_created: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [design, dvz-ui, embeddable, chart, kpi, data-visualization]
---

# Introduction

The `big-number` embeddable renders one or more large-format KPI metric tiles from CSV or DVZ proxy data, with optional dimension-based grouping and `Intl.NumberFormat` formatting.

## 1. Purpose & Scope

**Purpose**: Define the data-binding, grouping logic, formatting, and rendering contract for the `big-number` component.

**Scope**: `packages/dvz-ui/src/embeddable/big-number/index.jsx`.

**Intended Audience**: Engineers building dashboards with summary KPI tiles.

## 2. Definitions

| Term | Definition |
|------|------------|
| **KPI** | Key Performance Indicator — a single numeric metric. |
| **dimension** | A categorical field used to group data rows (e.g., `"country"`, `"year"`). |
| **measure** | The numeric field to aggregate and display. |
| **DVZ proxy** | Internal data proxy identified by `data-dvz-proxy-dataset-id`. |
| **wait-for-filters** | Defers rendering until Redux filter state for the group is populated. |

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: The component MUST load data from `data-csv` (URL) or `data-dvz-proxy-dataset-id`. If both are present, the proxy takes precedence.
- **REQ-002**: When `data-dimension1` is not `"none"`, the component MUST render one tile per unique dimension value.
- **REQ-003**: When `data-wait-for-filters` is `"true"`, the component MUST NOT render until the Redux filter group is initialised.
- **REQ-004**: When no rows match the current filter, the component MUST display `data-no-data-text` (default `"-"`).
- **REQ-005**: Number formatting MUST use the `data-format` JSON object as `Intl.NumberFormat` options.
- **CON-001**: The component MUST NOT mutate the source data array.
- **GUD-001**: Prefer `data-dvz-proxy-dataset-id` for live API-backed datasets.

## 4. Interfaces & Data Contracts

### `data-*` Attribute Props

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data-csv` | `string` | `""` | URL to a CSV data source. |
| `data-dimension1` | `string` | `"none"` | Field name for tile grouping. |
| `data-dvz-proxy-dataset-id` | `string` | — | DVZ proxy dataset ID (overrides CSV). |
| `data-no-data-message` | `string` | `"No data matches your selection"` | No-results message. |
| `data-view-mode` | `string` | `"info"` | `"info"` or `"edit"` rendering mode. |
| `data-wait-for-filters` | `string` | `"false"` | Defer render until filters ready. |
| `data-no-data-text` | `string` | `"-"` | Value placeholder when data is absent. |
| `data-format` | `string` (JSON) | `"{}"` | `Intl.NumberFormat` options. |
| `data-measure` | `string` | — | Numeric field to display. |
| `data-group` | `string` | — | Redux filter group name. |

### BigNumber Sub-Component Props

```typescript
interface BigNumberProps {
  dataItem: Record<string, string | number>;
  format: Intl.NumberFormatOptions;
  measureField: string;
  noDataText: string;
  label?: string;
  numberColor?: string;
  numberFontSize?: string;
  labelColor?: string;
  labelFontSize?: string;
}
```

## 5. Acceptance Criteria

- **AC-001**: Given `data-dimension1="country"` with 3 country rows, when rendered, 3 tiles appear.
- **AC-002**: Given `data-dimension1="none"`, when rendered, exactly 1 aggregate tile appears.
- **AC-003**: Given `data-wait-for-filters="true"` and uninitialised group, when rendered, no tiles appear.
- **AC-004**: Given a filter excluding all rows, `data-no-data-text` (default `"-"`) is displayed.
- **AC-005**: Given `data-format='{"style":"percent","minimumFractionDigits":1}'` and value `0.456`, then `"45.6%"` is displayed.

## 6. Test Automation Strategy

- **Test Levels**: Unit (formatting logic, dimension grouping), Integration (CSV fetch mock + filter state).
- **Frameworks**: Vitest + `@testing-library/react` + msw v2.
- **Test Data Management**: Fixture CSV files in `src/__fixtures__/`.
- **CI/CD Integration**: `pnpm --filter @devgateway/dvz-ui-react test`.
- **Coverage Requirements**: 80% line coverage.

## 7. Rationale & Context

Big number tiles are the primary summary visual for dashboards. Dimension-based tiling allows a single embeddable to render a comparative KPI set. The `wait-for-filters` flag prevents stale renders before filter state is hydrated from Redux.

## 8. Dependencies & External Integrations

### Technology Platform Dependencies
- **PLT-001**: Redux store — filter group state via `mapStateToProps`.
- **PLT-002**: `react-intl` — number formatting via `IntlShape`.

## 9. Examples & Edge Cases

```jsx
// Single aggregate KPI
<div data-component="big-number" data-csv="/data/summary.csv" data-measure="value" />

// Per-country breakdown
<div data-component="big-number"
     data-csv="/data/by-country.csv"
     data-dimension1="country"
     data-measure="beneficiaries"
     data-format='{"style":"decimal","maximumFractionDigits":0}'
     data-no-data-text="N/A" />

// Edge: proxy + filter-aware
<div data-component="big-number"
     data-dvz-proxy-dataset-id="ds-001"
     data-group="main-dashboard"
     data-wait-for-filters="true"
     data-measure="total" />
```

## 10. Validation Criteria

- **VAL-001**: Dimension grouping produces the correct tile count for unique dimension values.
- **VAL-002**: `data-no-data-text` appears when no rows match the filter.
- **VAL-003**: `data-format` JSON is correctly applied to `Intl.NumberFormat`.

## 11. Related Specifications / Further Reading

- [spec-design-dvz-ui-big-number-trend.md](./spec-design-dvz-ui-big-number-trend.md)
- [spec-design-dvz-ui-filter.md](./spec-design-dvz-ui-filter.md)

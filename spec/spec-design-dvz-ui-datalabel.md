---
title: Datalabel Embeddable Component
version: 1.0
date_created: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [design, dvz-ui, embeddable, data-visualization, kpi, label]
---

# Introduction

The `datalabel` embeddable computes and displays a single scalar value from a dataset using one of several aggregation strategies (first, total, min, max, avg). It is intended for inline data labels within text or dashboard summaries.

## 1. Purpose & Scope

**Purpose**: Define the aggregation strategy, formatting, and display contract for `datalabel`.

**Scope**: `packages/dvz-ui/src/embeddable/datalabel/index.jsx`.

**Intended Audience**: Engineers embedding computed scalars in WP post content or dashboards.

## 2. Definitions

| Term | Definition |
|------|------------|
| **valueType** | The aggregation strategy: `"first"`, `"total"`, `"min"`, `"max"`, or `"avg"`. |
| **measure** | The numeric column to aggregate. |
| **dimension1** | An optional grouping field; when set, the label displays the value for the matching dimension group. |

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: The component MUST compute the value from the loaded data using `data-value-type`: `"first"` (first row), `"total"` (sum), `"min"`, `"max"`, or `"avg"`.
- **REQ-002**: When no data matches filters, the component MUST display `data-no-data-message`.
- **REQ-003**: Number formatting MUST use `data-format` as `Intl.NumberFormat` options.
- **REQ-004**: When `data-dimension1` is set, the component MUST display the value only for the matching dimension group.
- **CON-001**: This component renders a single computed value — it MUST NOT render a list or multi-value layout.
- **GUD-001**: Use `data-value-type="total"` for sum aggregations and `data-value-type="first"` when data is pre-aggregated.

## 4. Interfaces & Data Contracts

### `data-*` Attribute Props

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data-csv` | `string` | `""` | URL to CSV data source. |
| `data-no-data-message` | `string` | `"No data matches your selection"` | No-results message. |
| `data-view-mode` | `string` | `"info"` | `"info"` or `"edit"`. |
| `data-height` | `string` | — | Container height. |
| `data-dimension1` | `string` | — | Grouping field name. |
| `data-app` | `string` | — | Redux app identifier. |
| `data-measures` | `string` (JSON) | `{}` | Measure config. |
| `data-format` | `string` (JSON) | `"{}"` | `Intl.NumberFormat` options. |
| `data-group` | `string` | — | Redux filter group. |
| `data-filters` | `string` (JSON) | `[]` | Static filter overrides. |
| `data-value-type` | `string` | `"first"` | Aggregation: `"first"`, `"total"`, `"min"`, `"max"`, `"avg"`. |

### DataFrame Sub-Component Props

```typescript
interface DataFrameProps {
  valueType: 'first' | 'total' | 'min' | 'max' | 'avg';
  measure: string;
  data: DataResult;
  format: Intl.NumberFormatOptions;
}
```

## 5. Acceptance Criteria

- **AC-001**: Given `data-value-type="total"` and rows `[10, 20, 30]`, when rendered, `"60"` is displayed.
- **AC-002**: Given `data-value-type="min"` and rows `[10, 20, 30]`, `"10"` is displayed.
- **AC-003**: Given `data-value-type="avg"` and rows `[10, 20, 30]`, `"20"` is displayed.
- **AC-004**: Given a filter excluding all rows, `data-no-data-message` is displayed.
- **AC-005**: Given `data-format='{"style":"percent"}'` and value `0.5`, `"50%"` is displayed.

## 6. Test Automation Strategy

- **Test Levels**: Unit (aggregation functions), Integration (CSV mock + filter).
- **Frameworks**: Vitest + `@testing-library/react`.
- **CI/CD Integration**: `pnpm --filter @devgateway/dvz-ui-react test`.

## 7. Rationale & Context

Datalabel provides a lightweight scalar display useful for embedding key figures inline within WP post bodies (e.g., `"In 2024, over %(total) beneficiaries were reached"`). It reuses the same data-loading infrastructure as `big-number` but with a simpler single-value contract.

## 8. Dependencies & External Integrations

### Technology Platform Dependencies
- **PLT-001**: Redux store — filter group state.
- **PLT-002**: `react-intl` — number formatting.

## 9. Examples & Edge Cases

```jsx
// Total of all beneficiary rows
<div data-component="datalabel"
     data-csv="/data/totals.csv"
     data-value-type="total"
     data-format='{"style":"decimal","maximumFractionDigits":0}' />

// Edge: NaN check for min/max when value is non-numeric → display no-data-message
```

## 10. Validation Criteria

- **VAL-001**: Each `valueType` produces the correct aggregation result.
- **VAL-002**: NaN values do not appear in output.
- **VAL-003**: `data-no-data-message` renders when data is empty.

## 11. Related Specifications / Further Reading

- [spec-design-dvz-ui-big-number.md](./spec-design-dvz-ui-big-number.md)
- [spec-design-dvz-ui-data-paragraph.md](./spec-design-dvz-ui-data-paragraph.md)

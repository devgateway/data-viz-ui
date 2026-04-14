---
title: Grouped Bars Embeddable Component
version: 1.0
date_created: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [design, dvz-ui, embeddable, chart, bar, data-visualization]
---

# Introduction

The `grouped-bars` embeddable renders a grouped or stacked horizontal/vertical bar chart from CSV or DVZ proxy data, with support for multiple measures, custom formatting, and Redux filter integration.

## 1. Purpose & Scope

**Purpose**: Define the multi-measure bar layout, colour assignment, and data binding contract for `grouped-bars`.

**Scope**: `packages/dvz-ui/src/embeddable/grouped-bars/index.jsx` and `packages/dvz-ui/src/embeddable/grouped-bars/GroupedBars.jsx`.

**Intended Audience**: Engineers building comparative bar chart visualisations.

## 2. Definitions

| Term | Definition |
|------|------------|
| **Measure** | A numeric column to render as a bar series. |
| **Group** | The category dimension for the X-axis (horizontal bars) or Y-axis (vertical bars). |
| **Selected measures** | Measures explicitly marked `selected: true` in the measures config. |
| **Custom label** | An optional override label for a measure, specified in the measures config. |

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: The component MUST render one bar group per unique dimension value.
- **REQ-002**: Selected measures MUST each render as a separate bar within each group.
- **REQ-003**: Bar colours MUST be assignable per measure from the configuration.
- **REQ-004**: Number formatting MUST use `data-format` as `Intl.NumberFormat` options, with support for `"compacted"` notation.
- **REQ-005**: Prefix and suffix strings MUST be applied to displayed values when configured.
- **REQ-006**: When `data-wait-for-filters` is `"true"`, the chart MUST NOT render until the Redux filter group is initialised.
- **REQ-007**: When no data matches filters, `data-no-data-message` MUST be displayed.
- **CON-001**: This component is client-only and MUST be wrapped in a `'use client'` boundary when used in SSR contexts.

## 4. Interfaces & Data Contracts

### Key `data-*` Attribute Props

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data-csv` | `string` | `""` | URL to CSV data source. |
| `data-dvz-proxy-dataset-id` | `string` | — | DVZ proxy dataset ID. |
| `data-group` | `string` | — | Redux filter group name. |
| `data-app` | `string` | — | Redux app identifier. |
| `data-measures` | `string` (JSON) | `"{}"` | Measures config object with selected/format/label. |
| `data-format` | `string` (JSON) | `"{}"` | `Intl.NumberFormat` base options (plus `prefix`, `suffix`). |
| `data-dimension1` | `string` | — | Category dimension field name. |
| `data-height` | `number` | — | Chart height in pixels. |
| `data-wait-for-filters` | `string` | `"false"` | Defer render until filters ready. |
| `data-no-data-message` | `string` | `"No data matches your selection"` | No-results message. |
| `data-text-color` | `string` | `"#5a5d68"` | Label text colour. |
| `data-bar-color` | `string` | `"#3182ce"` | Default bar fill colour. |

### Number Format Shape

```typescript
interface NumberFormatConfig {
  style?: 'decimal' | 'currency' | 'percent' | 'compacted';
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  prefix?: string;
  suffix?: string;
}
```

## 5. Acceptance Criteria

- **AC-001**: Given 3 dimension values and 2 selected measures, when rendered, 3 groups of 2 bars each are displayed.
- **AC-002**: Given `data-wait-for-filters="true"` and uninitialised group, no chart renders.
- **AC-003**: Given all rows filtered out, `data-no-data-message` is displayed.
- **AC-004**: Given format with `"prefix":"$"` and value `1000`, the label displays `"$1,000"`.
- **AC-005**: Given `"style":"compacted"` and value `1500000`, the label displays `"1.5M"`.

## 6. Test Automation Strategy

- **Test Levels**: Unit (measure extraction, number format, colour assignment), Integration (CSV mock + filter).
- **Frameworks**: Vitest + `@testing-library/react`.
- **CI/CD Integration**: `pnpm --filter @devgateway/dvz-ui-react test`.

## 7. Rationale & Context

Grouped bars are the standard comparison chart for multi-measure categorical data. The `compacted` notation support handles large values (millions/billions) common in development finance dashboards.

## 8. Dependencies & External Integrations

### Technology Platform Dependencies
- **PLT-001**: Redux store — filter group state.
- **PLT-002**: `react-intl` — number and locale formatting.

## 9. Examples & Edge Cases

```jsx
<div data-component="grouped-bars"
     data-csv="/data/budget.csv"
     data-dimension1="region"
     data-measures='{"csv":{"approved":{"selected":true,"label":"Approved Budget"},"disbursed":{"selected":true,"label":"Disbursed"}}}'
     data-format='{"style":"compacted"}'
     data-group="budget-dashboard" />
```

## 10. Validation Criteria

- **VAL-001**: Bar count equals `(selected measures) × (unique dimension values)`.
- **VAL-002**: Compacted notation renders `M`/`B` suffixes for large values.
- **VAL-003**: No-data message renders when all rows are filtered.

## 11. Related Specifications / Further Reading

- [spec-design-dvz-ui-chart.md](./spec-design-dvz-ui-chart.md)

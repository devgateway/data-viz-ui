---
title: Chart Embeddable Component
version: 1.0
date_created: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [design, dvz-ui, embeddable, chart, nivo, data-visualization]
---

# Introduction

The `chart` embeddable is the primary multi-type chart component for `dvz-ui`. It renders bar, line, pie, radar, bump, and other Nivo-based chart types from CSV or DVZ proxy data, with Redux filter integration and a `Delayed` mount strategy to avoid blocking renders.

## 1. Purpose & Scope

**Purpose**: Define the chart type selection, data binding, filter integration, and rendering contract for the `chart` embeddable.

**Scope**: `packages/dvz-ui/src/embeddable/chart/index.jsx` and sub-components in `packages/dvz-ui/src/embeddable/chart/`.

**Intended Audience**: Engineers building data visualisation pages using Nivo charts.

## 2. Definitions

| Term | Definition |
|------|------------|
| **Nivo** | `@nivo/*` React charting library built on D3. |
| **Delayed** | Internal React class component that defers child rendering by `waitBeforeShow` ms to avoid blocking the main thread. |
| **chart type** | The Nivo chart variant selected by `data-chart-type` (e.g., `"bar"`, `"line"`, `"pie"`). |
| **DVZ proxy** | Internal data proxy identified by `data-dvz-proxy-dataset-id`. |
| **filter group** | Redux namespace coordinating filter state across embeddables. |

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: The component MUST support at minimum the following chart types: `bar`, `line`, `pie`, `radar`, `bump`, `sunburst`, `sankey`.
- **REQ-002**: Chart data MUST be loaded from `data-csv` or `data-dvz-proxy-dataset-id`. If both are present, the proxy takes precedence.
- **REQ-003**: When `data-wait-for-filters` is `"true"`, the component MUST NOT render until the Redux filter group is initialised.
- **REQ-004**: The `Delayed` wrapper MUST defer chart rendering by `data-wait-before-show` milliseconds (default `0`) to avoid frame drops on page load.
- **REQ-005**: When no data matches filters, the component MUST display `data-no-data-message`.
- **REQ-006**: Chart dimensions MUST be controlled by `data-height` and `data-width` attributes.
- **CON-001**: Chart library rendering MUST be client-side only (`'use client'` boundary required when used in SSR contexts).
- **GUD-001**: Use `data-group` to synchronise filter state with filter embeddables on the same page.

## 4. Interfaces & Data Contracts

### `data-*` Attribute Props

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data-csv` | `string` | `""` | URL to CSV data source. |
| `data-dvz-proxy-dataset-id` | `string` | — | DVZ proxy dataset ID. |
| `data-chart-type` | `string` | `"bar"` | Nivo chart type to render. |
| `data-height` | `number` | `400` | Chart height in pixels. |
| `data-width` | `number` | — | Chart width in pixels (defaults to container width). |
| `data-group` | `string` | — | Redux filter group name. |
| `data-app` | `string` | `"csv"` | Data app identifier for Redux. |
| `data-wait-for-filters` | `string` | `"false"` | Defer render until filters ready. |
| `data-no-data-message` | `string` | `"No data matches your selection"` | No-results message. |
| `data-wait-before-show` | `number` | `0` | Milliseconds to delay initial render via `Delayed`. |
| `data-options` | `string` (JSON) | `"{}"` | Chart-specific Nivo options object. |

### Delayed Component Props

```typescript
class Delayed extends React.Component<{
  waitBeforeShow: number;
  children: React.ReactNode;
}> {}
```

## 5. Acceptance Criteria

- **AC-001**: Given `data-chart-type="bar"` and valid CSV data, when rendered, a Nivo bar chart is displayed.
- **AC-002**: Given `data-wait-for-filters="true"` and uninitialised group, when rendered, no chart content appears.
- **AC-003**: Given a filter excluding all data, `data-no-data-message` text is displayed.
- **AC-004**: Given `data-wait-before-show="500"`, the chart does not appear until 500 ms after mount.
- **AC-005**: Given `data-chart-type="pie"` and valid data, a Nivo pie chart is rendered.

## 6. Test Automation Strategy

- **Test Levels**: Unit (data transform, no-data state), Integration (CSV mock + filter state).
- **Frameworks**: Vitest + `@testing-library/react` + msw v2.
- **Test Data Management**: Fixture CSV files per chart type.
- **CI/CD Integration**: `pnpm --filter @devgateway/dvz-ui-react test`.

## 7. Rationale & Context

A single `chart` embeddable supporting multiple Nivo types reduces the number of component registrations needed. The `Delayed` wrapper prevents chart initialisation from blocking the main thread during page load, especially when multiple charts are present.

## 8. Dependencies & External Integrations

### Technology Platform Dependencies
- **PLT-001**: `@nivo/bar`, `@nivo/line`, `@nivo/pie`, `@nivo/radar`, `@nivo/bump`, `@nivo/sunburst`, `@nivo/sankey` — chart rendering.
- **PLT-002**: Redux store — filter group state.
- **PLT-003**: `react-intl` — locale-aware labels.

## 9. Examples & Edge Cases

```jsx
// Bar chart
<div data-component="chart"
     data-csv="/data/budget.csv"
     data-chart-type="bar"
     data-height="400"
     data-group="budget-dash" />

// Edge: delayed render to avoid blocking
<div data-component="chart"
     data-csv="/data/large.csv"
     data-chart-type="line"
     data-wait-before-show="300" />
```

## 10. Validation Criteria

- **VAL-001**: Each supported chart type renders without error with valid fixture data.
- **VAL-002**: `data-wait-before-show` delays appearance by the specified milliseconds.
- **VAL-003**: No-data state renders the configured message without a chart element.

## 11. Related Specifications / Further Reading

- [spec-design-dvz-ui-grouped-bars.md](./spec-design-dvz-ui-grouped-bars.md)
- [spec-design-dvz-ui-sankeychart.md](./spec-design-dvz-ui-sankeychart.md)
- [@nivo documentation](https://nivo.rocks/)

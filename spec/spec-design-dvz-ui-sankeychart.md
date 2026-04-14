---
title: Sankey Chart Embeddable Component
version: 1.0
date_created: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [design, dvz-ui, embeddable, chart, sankey, nivo, data-visualization]
---

# Introduction

The `sankeychart` embeddable renders a Sankey flow diagram using `@nivo/sankey`, with configurable nodes, links, colour legends, and tooltip support.

## 1. Purpose & Scope

**Purpose**: Define the data contract, legend rendering, and interactive filter contract for `sankeychart`.

**Scope**: `packages/dvz-ui/src/embeddable/sankeychart/index.jsx` and `packages/dvz-ui/src/embeddable/sankeychart/Sankey.tsx`.

**Intended Audience**: Engineers building flow visualisations (fund flows, programme pathways).

## 2. Definitions

| Term | Definition |
|------|------------|
| **Node** | A named entity in the Sankey graph. |
| **Link** | A directed flow connection between two nodes with a numeric value. |
| **Legend** | A colour-coded list of nodes shown outside the chart for reference. |
| **Reverse legend** | When `true`, legend items are displayed in reverse node order. |
| **Tooltip** | A custom HTML tooltip template shown on link hover. |

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: The component MUST render a Nivo Sankey chart from `options.data.nodes` and `options.data.links`.
- **REQ-002**: Legend items MUST be derived from `options.data.nodes` and displayed outside the chart.
- **REQ-003**: Clicking a legend item MUST toggle the visibility of that node's links in the chart (filter the node from the rendered data).
- **REQ-004**: When `tooltip` is set and `tooltipEnabled` is `true`, the tooltip template MUST be rendered on link hover.
- **REQ-005**: When `reverseLegend` is `true`, legend items MUST be displayed in reverse order.
- **REQ-006**: When `showLegends` is `false`, the legend MUST NOT be rendered.
- **CON-001**: `@nivo/sankey` is client-only — this component MUST be `'use client'` in SSR contexts.
- **CON-002**: Nodes and links MUST be present and non-empty before the chart renders; empty data MUST render nothing without error.

## 4. Interfaces & Data Contracts

### Options Data Shape

```typescript
interface SankeyData {
  nodes: SankeyNode[];
  links: SankeyLink[];
}

interface SankeyNode {
  id: string;
  label?: string;
  color?: string;
}

interface SankeyLink {
  source: string;
  target: string;
  value: number;
}
```

### Chart Props (from `options`)

```typescript
interface SankeyChartOptions {
  data: SankeyData;
  tooltip?: string;
  tooltipEnabled?: boolean;
  showLegends?: boolean;
  reverseLegend?: boolean;
  colors?: string[];
  nodeBorderColor?: Record<string, string>;
}
```

## 5. Acceptance Criteria

- **AC-001**: Given valid nodes and links, when rendered, the Nivo Sankey chart displays.
- **AC-002**: Given `showLegends: true`, legend items appear for each node.
- **AC-003**: Clicking a legend item removes (or restores) that node's links from the chart.
- **AC-004**: Given `reverseLegend: true`, legend items are in reverse node order.
- **AC-005**: Given empty nodes array, the chart renders nothing without throwing.

## 6. Test Automation Strategy

- **Test Levels**: Unit (legend toggle, data filtering), Integration (Nivo render mock).
- **Frameworks**: Vitest + `@testing-library/react`; mock `@nivo/sankey`.
- **CI/CD Integration**: `pnpm --filter @devgateway/dvz-ui-react test`.

## 7. Rationale & Context

Sankey diagrams are the standard visualisation for fund-flow analysis in development finance dashboards. The legend-toggle filter allows users to focus on specific funding streams without a separate filter control.

## 8. Dependencies & External Integrations

### Technology Platform Dependencies
- **PLT-001**: `@nivo/sankey` — chart rendering.

## 9. Examples & Edge Cases

```jsx
<div data-component="sankeychart"
     data-options='{"data":{"nodes":[{"id":"Donor A"},{"id":"Programme B"},{"id":"Beneficiary C"}],"links":[{"source":"Donor A","target":"Programme B","value":500},{"source":"Programme B","target":"Beneficiary C","value":500}]},"showLegends":true}' />
```

## 10. Validation Criteria

- **VAL-001**: Chart renders with valid node/link data.
- **VAL-002**: Legend toggle removes node links from rendered data.
- **VAL-003**: Empty data renders no chart without error.

## 11. Related Specifications / Further Reading

- [spec-design-dvz-ui-chart.md](./spec-design-dvz-ui-chart.md)
- [@nivo/sankey docs](https://nivo.rocks/sankey/)

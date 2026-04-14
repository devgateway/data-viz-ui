---
title: Big Number Trend Embeddable Component
version: 1.0
date_created: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [design, dvz-ui, embeddable, chart, kpi, trend, data-visualization]
---

# Introduction

The `big-number-trend` embeddable extends `big-number` with directional trend icons (up, down, neutral) to indicate change direction alongside the KPI value.

## 1. Purpose & Scope

**Purpose**: Define the additional trend icon props and directional rendering on top of the `big-number` base behaviour.

**Scope**: `packages/dvz-ui/src/embeddable/big-number-trend/index.jsx`.

**Intended Audience**: Engineers building dashboards requiring KPI tiles with trend indicators.

## 2. Definitions

| Term | Definition |
|------|------------|
| **Trend icon** | An image (up arrow, down arrow, or neutral) displayed alongside the numeric value. |
| **KPI** | Key Performance Indicator — a single numeric metric. |
| **DVZ proxy** | Internal data proxy identified by `data-dvz-proxy-dataset-id`. |

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: All requirements from `big-number` (REQ-001 through REQ-005, CON-001) apply to this component.
- **REQ-002**: The component MUST display `data-icon-up` when the trend direction is positive, `data-icon-down` when negative, and `data-icon-image` as a static decorative icon when direction is neutral or unavailable.
- **REQ-003**: Trend direction MUST be derived by comparing the current period value to the previous period value within the dataset.
- **REQ-004**: If trend data is unavailable, the component MUST render the value tile without a trend icon, without throwing.
- **CON-001**: Icon attributes accept image URLs; the component MUST NOT embed icon files directly.
- **GUD-001**: All three icon attributes (`data-icon-image`, `data-icon-up`, `data-icon-down`) are optional. If absent, no icon is rendered.

## 4. Interfaces & Data Contracts

### `data-*` Attribute Props

Inherits all props from `big-number`, plus:

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data-icon-image` | `string` | `""` | URL of a static decorative icon. |
| `data-icon-up` | `string` | `""` | URL of the upward trend icon. |
| `data-icon-down` | `string` | `""` | URL of the downward trend icon. |

### DataFrame2 Sub-Component Props

```typescript
interface DataFrame2Props {
  value: number;
  previousValue: number;
  iconImage: string;
  iconUp: string;
  iconDown: string;
  noDataText: string;
  format: Intl.NumberFormatOptions;
}
```

## 5. Acceptance Criteria

- **AC-001**: Given a positive trend (current > previous), when rendered, the `data-icon-up` image is displayed.
- **AC-002**: Given a negative trend (current < previous), when rendered, the `data-icon-down` image is displayed.
- **AC-003**: Given no trend data available, when rendered, no icon element is present and no exception is thrown.
- **AC-004**: Given `data-icon-image` is set and no directional icons are set, the decorative icon is always displayed regardless of trend.
- **AC-005**: All `big-number` acceptance criteria (AC-001 through AC-005) hold for this component.

## 6. Test Automation Strategy

- **Test Levels**: Unit (trend direction calculation, icon selection logic).
- **Frameworks**: Vitest + `@testing-library/react`.
- **Test Data Management**: Inline fixture data with current/previous period values.
- **CI/CD Integration**: `pnpm --filter @devgateway/dvz-ui-react test`.

## 7. Rationale & Context

Trend indicators are common in executive dashboards where stakeholders need to understand not just the current value but whether it represents improvement or decline. Separating this from `big-number` avoids adding icon-related complexity to the base tile component.

## 8. Dependencies & External Integrations

### Technology Platform Dependencies
- **PLT-001**: Redux store — filter group state.
- **PLT-002**: `react-intl` — number formatting.

## 9. Examples & Edge Cases

```jsx
// KPI with trend icons
<div data-component="big-number-trend"
     data-csv="/data/trend.csv"
     data-measure="beneficiaries"
     data-icon-up="/icons/up.svg"
     data-icon-down="/icons/down.svg"
     data-icon-image="/icons/people.svg" />

// Edge: only static icon, no directional icons
<div data-component="big-number-trend"
     data-csv="/data/summary.csv"
     data-measure="total"
     data-icon-image="/icons/chart.svg" />
```

## 10. Validation Criteria

- **VAL-001**: Positive trend renders `data-icon-up` image (not `data-icon-down`).
- **VAL-002**: Absent trend data renders no icon without throwing.
- **VAL-003**: TypeScript compilation succeeds with `tsc --noEmit`.

## 11. Related Specifications / Further Reading

- [spec-design-dvz-ui-big-number.md](./spec-design-dvz-ui-big-number.md)

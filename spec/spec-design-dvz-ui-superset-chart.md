---
title: Superset Chart Embeddable Component
version: 1.0
date_created: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [design, dvz-ui, embeddable, superset, chart, embedded-sdk]
---

# Introduction

The `superset-chart` embeddable renders an Apache Superset chart inside an iframe via the official Superset Embedded SDK, driven by a chart ID embedded in the page attributes.

## 1. Purpose & Scope

**Purpose**: Define the Superset SDK authentication, chart mounting, and size contract for `superset-chart`.

**Scope**: `packages/dvz-ui/src/embeddable/superset-chart/index.jsx`.

**Intended Audience**: Engineers integrating Apache Superset charts into WP pages.

## 2. Definitions

| Term | Definition |
|------|------------|
| **Selected chart data** | JSON string describing the Superset chart configuration (ID + instance URL). |
| **Embedded SDK** | `@superset-ui/embedded-sdk` package that mounts a chart inside a container element. |
| **Guest token** | A short-lived JWT obtained from the WP proxy that authorises Superset chart access. |

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: The component MUST parse `data-selected-chart-data` as JSON and extract the chart ID and Superset URL.
- **REQ-002**: The component MUST obtain a guest token via the WP proxy before mounting the SDK.
- **REQ-003**: The Superset SDK MUST mount the chart inside the component's container `div`.
- **REQ-004**: `data-height` MUST be applied as the iframe height.
- **REQ-005**: `data-width` (default `100`) and `data-margin` (default `0`) MUST be applied to the container.
- **CON-001**: Superset SDK is client-only — this component MUST be `'use client'` in SSR contexts.
- **CON-002**: Guest token fetch errors MUST be handled gracefully (error state, not blank page).

## 4. Interfaces & Data Contracts

### `data-*` Attribute Props

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data-csv` | `string` | — | URL to the data proxy (may be unused for Superset charts). |
| `data-selected-chart-data` | `string` | `"{}"` | JSON with Superset chart ID and instance URL. |
| `data-height` | `string` | — | Container height. |
| `data-width` | `number` | `100` | Container width percentage. |
| `data-margin` | `number` | `0` | Container margin. |

### Selected Chart Data Shape

```typescript
interface SupersetChartData {
  chartId: string;
  supersetUrl: string;
}
```

## 5. Acceptance Criteria

- **AC-001**: Given valid chart data, the Superset SDK mounts inside the container.
- **AC-002**: `data-height` is applied to the iframe.
- **AC-003**: Given a token fetch error, an error message is displayed instead of a blank container.
- **AC-004**: Given empty `data-selected-chart-data`, no SDK mount is attempted.

## 6. Test Automation Strategy

- **Test Levels**: Unit (JSON parsing, height prop), Integration (SDK mock + token mock).
- **Frameworks**: Vitest + `@testing-library/react`; mock `@superset-ui/embedded-sdk`.
- **CI/CD Integration**: `pnpm --filter @devgateway/dvz-ui-react test`.

## 7. Rationale & Context

Embedding Superset charts avoids duplicating chart logic in React while leveraging Superset's powerful backend analytics. The WP proxy guest token approach avoids exposing Superset credentials to the browser.

## 8. Dependencies & External Integrations

### External Systems
- **EXT-001**: Apache Superset instance — chart rendering.
- **EXT-002**: WP proxy — guest token issuance.

### Technology Platform Dependencies
- **PLT-001**: `@superset-ui/embedded-sdk` — `embedDashboard` / `embedChart`.

## 9. Examples & Edge Cases

```jsx
<div data-component="superset-chart"
     data-selected-chart-data='{"chartId":"abc123","supersetUrl":"https://superset.example.org"}'
     data-height="400"
     data-width="100"
     data-margin="16" />
```

## 10. Validation Criteria

- **VAL-001**: Superset chart mounts for valid chart data.
- **VAL-002**: Error state shown on token failure.
- **VAL-003**: Empty chart data causes no mount attempt.

## 11. Related Specifications / Further Reading

- [spec-design-dvz-ui-superset-dashboard.md](./spec-design-dvz-ui-superset-dashboard.md)
- [Apache Superset Embedded SDK](https://github.com/apache/superset/tree/master/superset-frontend/packages/superset-ui-embedded-sdk)

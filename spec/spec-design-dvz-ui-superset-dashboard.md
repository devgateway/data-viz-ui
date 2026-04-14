---
title: Superset Dashboard Embeddable Component
version: 1.0
date_created: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [design, dvz-ui, embeddable, superset, dashboard, embedded-sdk]
---

# Introduction

The `superset-dashboard` embeddable renders a full Apache Superset dashboard inside an iframe via the official Superset Embedded SDK, using a WP-provided dashboard ID.

## 1. Purpose & Scope

**Purpose**: Define the dashboard ID resolution, SDK mounting, and size contract for `superset-dashboard`.

**Scope**: `packages/dvz-ui/src/embeddable/superset-dashboard/index.jsx`.

**Intended Audience**: Engineers embedding full Superset dashboards into WP pages.

## 2. Definitions

| Term | Definition |
|------|------------|
| **Dashboard ID** | A UUID or slug identifying the Superset dashboard to embed. |
| **Embedded SDK** | `@superset-ui/embedded-sdk` — `embedDashboard` mounts the dashboard iframe. |
| **Guest token** | Short-lived JWT from WP proxy authorising dashboard access. |

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: The component MUST extract the dashboard ID from `data-selected-dashboard-id`.
- **REQ-002**: The component MUST obtain a guest token from the WP proxy before calling `embedDashboard`.
- **REQ-003**: The Superset SDK MUST mount the dashboard inside the component container.
- **REQ-004**: `data-height`, `data-width`, and `data-margin` MUST be applied to the container.
- **CON-001**: Superset SDK is client-only — this component MUST be `'use client'` in SSR contexts.
- **CON-002**: Token fetch and SDK mount errors MUST be caught and displayed as a user-facing error state.

## 4. Interfaces & Data Contracts

### `data-*` Attribute Props

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data-selected-dashboard-id` | `string` | — | Superset dashboard UUID/slug. |
| `data-height` | `string` | — | Container height. |
| `data-width` | `number` | `100` | Container width percentage. |
| `data-margin` | `number` | `0` | Container margin. |

## 5. Acceptance Criteria

- **AC-001**: Given a valid dashboard ID, `embedDashboard` is called with the ID and guest token.
- **AC-002**: Container dimensions match `data-height`/`data-width`.
- **AC-003**: Token fetch failure shows an error state.
- **AC-004**: No `data-selected-dashboard-id` — no SDK mount is attempted.

## 6. Test Automation Strategy

- **Test Levels**: Unit (prop parsing), Integration (SDK mock + token mock).
- **Frameworks**: Vitest + `@testing-library/react`; mock `@superset-ui/embedded-sdk`.
- **CI/CD Integration**: `pnpm --filter @devgateway/dvz-ui-react test`.

## 7. Rationale & Context

Full dashboard embedding allows multi-chart views to be published via WP, combining Superset's analytics power with the WP CMS publishing workflow.

## 8. Dependencies & External Integrations

### External Systems
- **EXT-001**: Apache Superset instance.
- **EXT-002**: WP proxy — guest token issuance.

### Technology Platform Dependencies
- **PLT-001**: `@superset-ui/embedded-sdk` — `embedDashboard`.

## 9. Examples & Edge Cases

```jsx
<div data-component="superset-dashboard"
     data-selected-dashboard-id="d0e7c3b1-1234-5678-abcd-ef0123456789"
     data-height="600"
     data-width="100"
     data-margin="0" />
```

## 10. Validation Criteria

- **VAL-001**: Dashboard mounts for valid ID.
- **VAL-002**: Error state shown on token failure.
- **VAL-003**: No ID causes no mount.

## 11. Related Specifications / Further Reading

- [spec-design-dvz-ui-superset-chart.md](./spec-design-dvz-ui-superset-chart.md)
- [Apache Superset Embedded SDK](https://github.com/apache/superset/tree/master/superset-frontend/packages/superset-ui-embedded-sdk)

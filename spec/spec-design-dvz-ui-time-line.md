---
title: Time Line Embeddable Component
version: 1.0
date_created: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [design, dvz-ui, embeddable, chart, timeline, d3, data-visualization]
---

# Introduction

The `time-line` embeddable renders an interactive D3-powered horizontal timeline with date-range pan/zoom, touch and mouse tooltip events, and responsive resizing.

## 1. Purpose & Scope

**Purpose**: Define the D3 rendering pipeline, touch/mouse interaction, tooltip modal, and responsive resize contract for `time-line`.

**Scope**: `packages/dvz-ui/src/embeddable/time-line/index.jsx` and sub-components `TimeLine.jsx`, `TimeLineTooltip.jsx`.

**Intended Audience**: Engineers building chronological data displays.

## 2. Definitions

| Term | Definition |
|------|------------|
| **Timeline event** | A single dated item rendered as a circle or marker on the axis. |
| **Pan** | Horizontal drag to reveal earlier or later events. |
| **Zoom** | Scroll/pinch to adjust the visible date range. |
| **Tooltip modal** | A popup overlay shown on event hover/tap with event details. |

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: The component MUST render events as D3 circles on a date-scaled axis.
- **REQ-002**: The component MUST support horizontal pan via mouse drag and touch swipe.
- **REQ-003**: The component MUST support zoom via mouse scroll and pinch gesture.
- **REQ-004**: On event hover (mouse) or tap (touch), a tooltip modal MUST appear with the event details.
- **REQ-005**: The component MUST resize responsively using `useWindowDimensionsAndDevice`.
- **REQ-006**: Data MUST be loaded via the `DataProvider`/`DataConsumer` CSV pattern.
- **CON-001**: D3 DOM manipulation is client-only — this component MUST be `'use client'` in SSR contexts.
- **CON-002**: `useWindowDimensionsAndDevice` calls `window.innerWidth` — MUST NOT run on server.

## 4. Interfaces & Data Contracts

### `data-*` Attribute Props

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data-csv` | `string` | — | Proxy URL for timeline event CSV data. |
| `data-wait-for-filters` | `boolean` | `false` | Defer render until filter selection complete. |

### CSV Data Row Shape

```typescript
interface TimelineRow {
  date: string;     // ISO-8601
  label: string;
  description?: string;
  color?: string;
  category?: string;
}
```

## 5. Acceptance Criteria

- **AC-001**: Given a CSV with 10 dated events, the D3 axis renders 10 markers.
- **AC-002**: Mouse drag pans the timeline horizontally.
- **AC-003**: Mouse scroll zooms in/out.
- **AC-004**: Hovering an event shows the tooltip modal.
- **AC-005**: Tapping an event (touch) shows the tooltip modal.
- **AC-006**: Resizing the viewport re-renders the chart to the new width.

## 6. Test Automation Strategy

- **Test Levels**: Unit (axis scale, event count), Integration (D3 mount mock + resize mock).
- **Frameworks**: Vitest + `@testing-library/react`; mock `d3`, `useWindowDimensionsAndDevice`.
- **CI/CD Integration**: `pnpm --filter @devgateway/dvz-ui-react test`.

## 7. Rationale & Context

Timelines require D3's custom scale and zoom behaviour for fine-grained date control. The modal tooltip avoids cluttering the axis with inline labels while still surfacing event details on demand.

## 8. Dependencies & External Integrations

### Technology Platform Dependencies
- **PLT-001**: `d3` — axis, scale, zoom, drag.
- **PLT-002**: `useWindowDimensionsAndDevice` — responsive width.

## 9. Examples & Edge Cases

```jsx
<div data-component="time-line"
     data-csv="/api/proxy?url=timeline.csv" />

// Edge: all events on same date → cluster rendering
// Edge: zero events → empty axis without error
```

## 10. Validation Criteria

- **VAL-001**: Axis renders correct number of events.
- **VAL-002**: Tooltip appears on hover/tap.
- **VAL-003**: Chart redraws on window resize.

## 11. Related Specifications / Further Reading

- [spec-design-dvz-ui-chart.md](./spec-design-dvz-ui-chart.md)
- [spec-design-dvz-ui-d3-map.md](./spec-design-dvz-ui-d3-map.md)

---
title: Tabbed Posts Embeddable Component
version: 1.0
date_created: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [design, dvz-ui, embeddable, wordpress, tabs, posts, accordion]
---

# Introduction

The `tabbedposts` embeddable renders WP posts inside a tabbed or accordion interface with orientation awareness and chart legend margin adjustment.

## 1. Purpose & Scope

**Purpose**: Define tab/accordion rendering, screen orientation handling, and chart integration for `tabbedposts`.

**Scope**: `packages/dvz-ui/src/embeddable/tabbedposts/index.jsx`.

**Intended Audience**: Engineers building interactive multi-category post displays.

## 2. Definitions

| Term | Definition |
|------|------------|
| **Tab mode** | Horizontal tabs where each tab title reveals post content. |
| **Accordion mode** | Collapsible sections for smaller viewports or vertical layouts. |
| **Screen orientation** | Detected via `getScreenOrientation()` — `landscape` or `portrait`. |
| **Chart legend margin** | Offset applied to embedded chart legends when inside a tab pane. |

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: The component MUST fetch WP posts by type and render them grouped by tab (one tab per taxonomy term or category).
- **REQ-002**: On portrait orientation the component SHOULD render in accordion mode; on landscape in tab mode.
- **REQ-003**: When a tab pane contains a chart, the component MUST apply a `legend-margin` offset so the legend does not overlap the tab chrome.
- **REQ-004**: The active tab MUST be reflected in the URL hash for deep-linking.
- **CON-001**: `getScreenOrientation()` uses the Window Orientation API — this component MUST be `'use client'` in SSR contexts.

## 4. Interfaces & Data Contracts

### TabbedPostsProps Interface

```typescript
export interface TabbedPostsProps {
  "data-type"?: string;
  "data-taxonomy"?: string;
  "data-categories"?: string;
  "data-height"?: string;
  "data-colors"?: string;
}
```

## 5. Acceptance Criteria

- **AC-001**: Given landscape orientation, tabs render horizontally.
- **AC-002**: Given portrait orientation, content renders in accordion mode.
- **AC-003**: When a chart is present inside a tab, legend margins are adjusted.
- **AC-004**: Selecting a tab updates the URL hash.

## 6. Test Automation Strategy

- **Test Levels**: Unit (tab count, orientation mock), Integration (WP post mock + orientation API mock).
- **Frameworks**: Vitest + `@testing-library/react`; mock `getScreenOrientation`.
- **CI/CD Integration**: `pnpm --filter @devgateway/dvz-ui-react test`.

## 7. Rationale & Context

Tabs allow editors to group posts by theme or date without separate page sections. Accordion fallback ensures usability on mobile viewports.

## 8. Dependencies & External Integrations

### External Systems
- **EXT-001**: WordPress REST API — post and taxonomy data.

### Technology Platform Dependencies
- **PLT-001**: `@devgateway/wp-react-lib` — post providers.
- **PLT-002**: Window Orientation API — `getScreenOrientation`.

## 9. Examples & Edge Cases

```jsx
<div data-component="tabbedposts"
     data-type="publication"
     data-taxonomy="category"
     data-categories="research,analysis" />
```

## 10. Validation Criteria

- **VAL-001**: Tab count equals number of resolved categories.
- **VAL-002**: Accordion renders on portrait viewport.
- **VAL-003**: URL hash reflects active tab.

## 11. Related Specifications / Further Reading

- [spec-design-dvz-ui-featuredtabs.md](./spec-design-dvz-ui-featuredtabs.md)
- [spec-design-dvz-ui-vertical-featuredtabs.md](./spec-design-dvz-ui-vertical-featuredtabs.md)

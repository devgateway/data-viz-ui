---
title: Vertical Featured Tabs Embeddable Component
version: 1.0
date_created: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [design, dvz-ui, embeddable, wordpress, tabs, featured, vertical, posts]
---

# Introduction

The `vertical-featuredtabs` embeddable renders WP posts in a vertically-stacked accordion where each item expands to show a featured image cover and post preview, with configurable colours and expand labels.

## 1. Purpose & Scope

**Purpose**: Define the accordion expand/collapse, image cover width, colour customisation, and WP post integration for `vertical-featuredtabs`.

**Scope**: `packages/dvz-ui/src/embeddable/vertical-featuredtabs/index.jsx`.

**Intended Audience**: Engineers building featured publication or highlight sections.

## 2. Definitions

| Term | Definition |
|------|------------|
| **Accordion item** | A collapsible row showing a post thumbnail and title, expanding to preview content. |
| **Cover width** | The pixel or percentage width of the featured image within each accordion item. |
| **Preview mode** | Truncated post excerpt shown in expanded state. |
| **Click to expand label** | Custom label for the expand trigger control. |

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: The component MUST fetch WP posts matching `data-type`, `data-taxonomy`, `data-categories`, limited by `data-count`.
- **REQ-002**: Each post MUST render as a vertical accordion item with featured image and title.
- **REQ-003**: `data-colors` MUST apply per-item background colours cycling through the provided list.
- **REQ-004**: `data-cover-width` MUST control the image cover width within each expanded item.
- **REQ-005**: `data-click-to-expand-label` MUST be used as the expand trigger label (default `"Click to expand"`).
- **REQ-006**: `data-preview-mode` MUST enable truncated excerpt display in expanded state.
- **CON-001**: At most `data-count` items MUST be displayed regardless of the number of fetched posts.

## 4. Interfaces & Data Contracts

### VerticalFeaturedTabsProps Interface

```typescript
export interface VerticalFeaturedTabsProps {
  "data-height"?: string;
  "data-type"?: string;
  "data-taxonomy"?: string;
  "data-categories"?: string;
  "data-count"?: number | string;
  "data-colors"?: string;
  "data-cover-width"?: string;
  "data-read-more-label"?: string;
  "data-click-to-expand-label"?: string;
  "data-preview-mode"?: boolean | string;
}
```

## 5. Acceptance Criteria

- **AC-001**: Given 4 posts and `data-count="4"`, 4 accordion items render.
- **AC-002**: Clicking an item expands it and collapses the previously expanded item.
- **AC-003**: `data-colors` cycles through provided colours for each item's background.
- **AC-004**: `data-cover-width="300"` sets the featured image width to 300px.
- **AC-005**: `data-click-to-expand-label="Open"` renders `"Open"` as the expand label.

## 6. Test Automation Strategy

- **Test Levels**: Unit (colour cycling, count capping), Integration (WP post mock).
- **Frameworks**: Vitest + `@testing-library/react`.
- **CI/CD Integration**: `pnpm --filter @devgateway/dvz-ui-react test`.

## 7. Rationale & Context

Vertical accordions give editors a compact, scannable format for featured content without the horizontal scrolling of carousel variants. Custom colours allow alignment with editorial sections.

## 8. Dependencies & External Integrations

### External Systems
- **EXT-001**: WordPress REST API — post and featured image fetching.

### Technology Platform Dependencies
- **PLT-001**: `@devgateway/wp-react-lib` — post providers.

## 9. Examples & Edge Cases

```jsx
<div data-component="vertical-featuredtabs"
     data-type="publication"
     data-taxonomy="category"
     data-categories="highlights"
     data-count="5"
     data-colors='["#003366","#005a8e","#0088cc","#00aade","#66ccee"]'
     data-cover-width="250"
     data-click-to-expand-label="Expand"
     data-preview-mode="true" />
```

## 10. Validation Criteria

- **VAL-001**: Item count capped by `data-count`.
- **VAL-002**: Colours cycle correctly.
- **VAL-003**: Only one item expanded at a time.

## 11. Related Specifications / Further Reading

- [spec-design-dvz-ui-featuredtabs.md](./spec-design-dvz-ui-featuredtabs.md)
- [spec-design-dvz-ui-tabbedposts.md](./spec-design-dvz-ui-tabbedposts.md)

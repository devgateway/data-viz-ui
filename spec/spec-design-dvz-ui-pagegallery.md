---
title: Page Gallery Embeddable Component
version: 1.0
date_created: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [design, dvz-ui, embeddable, wordpress, gallery, pages]
---

# Introduction

The `pagegallery` embeddable renders child WP pages as a visual gallery — either vertical (stacked) or horizontal (grid). Each page is displayed with its featured image and intro text.

## 1. Purpose & Scope

**Purpose**: Define the gallery layout, child page fetching, and style-variant contract for `pagegallery`.

**Scope**: `packages/dvz-ui/src/embeddable/pagegallery/index.tsx`.

**Intended Audience**: Engineers building visual page-index sections.

## 2. Definitions

| Term | Definition |
|------|------------|
| **Gallery style** | The layout variant: `"vertical"` (stacked single column) or `"horizontal"` (multi-column grid). |
| **Child page** | A WP page with `parent` matching `data-parent`. |
| **PostIntro** | A WP component rendering a post's title and excerpt. |

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: The component MUST fetch child pages whose WP parent ID matches `data-parent`.
- **REQ-002**: When `data-style` is `"horizontal"`, pages MUST be rendered in a grid with `data-columns` columns.
- **REQ-003**: When `data-style` is not `"horizontal"` (default), pages MUST be rendered vertically stacked.
- **REQ-004**: Pages MUST be sorted by `menu_order` ascending.
- **REQ-005**: Each page card MUST include `PostIntro` and a media image if available.
- **CON-001**: `data-parent` is required; if absent, no pages are fetched and an empty container renders.

## 4. Interfaces & Data Contracts

### PageGalleryProps Interface

```typescript
export interface PageGalleryProps {
  "data-height": number;
  "data-style": string;
  "data-columns": string;
  "data-parent": number;
}
```

### HorizontalDashboardGalleryProps

```typescript
interface HorizontalDashboardGalleryProps {
  pages: WpPage[];
  columns: string;
}
```

## 5. Acceptance Criteria

- **AC-001**: Given `data-parent="10"` with 6 child pages and `data-style="horizontal"` and `data-columns="3"`, when rendered, 2 rows of 3 cards appear.
- **AC-002**: Given `data-style="vertical"`, pages are stacked in a single column.
- **AC-003**: Pages are sorted by `menu_order` ascending.
- **AC-004**: Each card renders a `PostIntro` component.
- **AC-005**: Given no `data-parent`, the component renders an empty container without error.

## 6. Test Automation Strategy

- **Test Levels**: Unit (column layout, sort order), Integration (WP PageProvider mock).
- **Frameworks**: Vitest + `@testing-library/react` + msw v2.
- **CI/CD Integration**: `pnpm --filter @devgateway/dvz-ui-react test`.

## 7. Rationale & Context

Page galleries are used on programme overview pages to present multiple sub-programmes or topic areas visually. The horizontal grid is preferred for wide viewports; the vertical stack adapts well to mobile.

## 8. Dependencies & External Integrations

### External Systems
- **EXT-001**: WordPress REST API — child page fetching.

### Technology Platform Dependencies
- **PLT-001**: `@devgateway/wp-react-lib` — `PageProvider`, `PageConsumer`, `PostIntro`.

## 9. Examples & Edge Cases

```jsx
// Horizontal 3-column gallery
<div data-component="pagegallery"
     data-parent="42"
     data-style="horizontal"
     data-columns="3" />

// Vertical gallery
<div data-component="pagegallery"
     data-parent="42"
     data-style="vertical" />
```

## 10. Validation Criteria

- **VAL-001**: Grid renders correct number of columns for horizontal style.
- **VAL-002**: Pages are sorted by `menu_order`.
- **VAL-003**: Empty parent renders without error.

## 11. Related Specifications / Further Reading

- [spec-design-dvz-ui-child-page-menu.md](./spec-design-dvz-ui-child-page-menu.md)
- [spec-design-dvz-ui-pagemodules.md](./spec-design-dvz-ui-pagemodules.md)

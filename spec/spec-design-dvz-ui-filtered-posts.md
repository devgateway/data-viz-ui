---
title: Filtered Posts Embeddable Component
version: 1.0
date_created: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [design, dvz-ui, embeddable, wordpress, posts, filter, grid]
---

# Introduction

The `filtered-posts` embeddable renders WP posts in a configurable grid layout with pagination, sorting, and Redux-coordinated taxonomy filtering. It connects to a filter group to display only posts matching the current filter state.

## 1. Purpose & Scope

**Purpose**: Define the grid layout, sorting, pagination, and filter integration contract for `filtered-posts`.

**Scope**: `packages/dvz-ui/src/embeddable/filtered-posts/index.tsx`.

**Intended Audience**: Engineers building filterable post/publication listing pages.

## 2. Definitions

| Term | Definition |
|------|------------|
| **Filter group** | A Redux namespace coordinating filter state across embeddables. |
| **Taxonomy** | A WP grouping mechanism (category, tag, custom taxonomy) used to filter posts. |
| **Sort-first-by** | A category ID used to sort posts with that category to the front. |
| **Post card** | A single post rendered as a card within the grid (with image, title, excerpt). |

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: The component MUST fetch WP posts matching `data-type`, `data-taxonomy`, and `data-categories`.
- **REQ-002**: The grid MUST render `data-number-of-columns` columns per row.
- **REQ-003**: When `data-enable-sorting` is `true`, posts MUST be sorted by `data-sorting-type` using `data-sorting-taxonomy`.
- **REQ-004**: When `data-sort-first-by` is set (category ID), posts with that category MUST appear before all others.
- **REQ-005**: Pagination MUST limit posts to `data-number-of-items-per-page` per page.
- **REQ-006**: The component MUST respond to filter group state changes and re-fetch/re-filter accordingly.
- **CON-001**: Country-category sorting (`sort-first-by`) only applies when a country taxonomy is active.

## 4. Interfaces & Data Contracts

### FilteredPostsProps Interface

```typescript
export interface FilteredPostsProps extends WrappedComponentProps {
  "data-group": string;
  "data-number-of-columns": number | string;
  "data-type": string;
  "data-taxonomy": string;
  "data-categories": string;
  "data-height": number | string;
  "data-post-width": number | string;
  "data-post-height": number | string;
  "data-number-of-items-per-page": number | string;
  "data-enable-sorting": string | boolean;
  "data-sort-first-by": number | string;
  "data-sorting-type": string;
  "data-sorting-taxonomy": string;
}
```

## 5. Acceptance Criteria

- **AC-001**: Given `data-number-of-columns="3"` and 9 posts, when rendered, 3 rows of 3 cards appear.
- **AC-002**: Given `data-number-of-items-per-page="6"` and 12 posts, the first page shows 6 posts.
- **AC-003**: Given `data-sort-first-by="42"` (category ID 42), posts with category 42 appear first in the grid.
- **AC-004**: When the filter group state changes, the post grid updates to show matching posts only.
- **AC-005**: Given `data-enable-sorting="true"` and `data-sorting-type="date"`, posts are sorted by date.

## 6. Test Automation Strategy

- **Test Levels**: Unit (sort logic, column layout), Integration (WP API mock + filter state).
- **Frameworks**: Vitest + `@testing-library/react` + msw v2.
- **CI/CD Integration**: `pnpm --filter @devgateway/dvz-ui-react test`.

## 7. Rationale & Context

Filtered post grids are the primary pattern for publication/resource listing pages. Separating the grid from pagination and filter controls as independent embeddables allows flexible page composition.

## 8. Dependencies & External Integrations

### External Systems
- **EXT-001**: WordPress REST API — post fetching with taxonomy/category filters.

### Technology Platform Dependencies
- **PLT-001**: `@devgateway/wp-react-lib` — WP data providers.
- **PLT-002**: Redux store — filter group state.
- **PLT-003**: `react-intl` — `WrappedComponentProps`.

## 9. Examples & Edge Cases

```jsx
<div data-component="filtered-posts"
     data-type="publication"
     data-taxonomy="category"
     data-categories="reports"
     data-number-of-columns="3"
     data-number-of-items-per-page="9"
     data-group="pub-filters"
     data-enable-sorting="true"
     data-sorting-type="date" />

// Edge: 0 posts matching filter → empty grid, no error
```

## 10. Validation Criteria

- **VAL-001**: Grid renders correct number of columns.
- **VAL-002**: Pagination limits items correctly.
- **VAL-003**: Filter group changes trigger post re-render.

## 11. Related Specifications / Further Reading

- [spec-design-dvz-ui-posts-filter.md](./spec-design-dvz-ui-posts-filter.md)
- [spec-design-dvz-ui-posts-pagination.md](./spec-design-dvz-ui-posts-pagination.md)

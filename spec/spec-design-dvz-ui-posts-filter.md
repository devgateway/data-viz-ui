---
title: Posts Filter Embeddable Component
version: 1.0
date_created: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [design, dvz-ui, embeddable, wordpress, filter, posts, taxonomy]
---

# Introduction

The `posts-filter` embeddable renders a feature-rich dropdown filter for WordPress post taxonomy categories, countries, and years. It integrates with a shared Redux post-filter group to drive `filtered-posts` and `posts-pagination` components.

## 1. Purpose & Scope

**Purpose**: Define the filter types (categorical, country, year), dropdown behaviour, auto-apply, and Redux dispatch contract for `posts-filter`.

**Scope**: `packages/dvz-ui/src/embeddable/posts-filter/index.tsx` and sub-components `CategoricalFilter.tsx`, `YearFilter.tsx`, `PostsFilterDropdown.tsx`.

**Intended Audience**: Engineers building filterable WP post listing pages.

## 2. Definitions

| Term | Definition |
|------|------------|
| **Categorical filter** | A dropdown listing taxonomy term values for multi-select filtering. |
| **Country filter** | A special categorical filter for country-type taxonomies. |
| **Year filter** | A year-range dropdown for date-based post filtering. |
| **Auto-apply** | When `true`, filter selections are applied immediately without requiring the apply button. |
| **All/None behaviour** | Controls whether selecting "All" or "None" clears or inverts the selection. |

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: When `data-is-country-filter` is `true`, the component MUST render a country-specific filter variant.
- **REQ-002**: When `data-is-year-filter` is `true`, the component MUST render a year-range filter.
- **REQ-003**: Options MUST be sortable alphabetically (`data-alphabetical-sort`) in ascending or descending order (`data-asc-order`).
- **REQ-004**: When `data-auto-apply` is `true`, filter selections MUST immediately update the post filter group without requiring a separate apply button.
- **REQ-005**: `data-placeholder` MUST be shown when no option is selected.
- **REQ-006**: `data-all-label` MUST label the "select all" option; `data-none-label` MUST label the "clear all" option.
- **REQ-007**: When `data-close-on-select` is `true`, the dropdown MUST close after a selection is made.
- **REQ-008**: `data-default-values` MUST be pre-selected on mount.
- **CON-001**: The component MUST use a Redux post-filter group separate from the CSV/chart filter group.

## 4. Interfaces & Data Contracts

### PostsFilterProps Interface

```typescript
export interface PostsFilterProps {
  "data-alphabetical-sort": boolean | string;
  "data-asc-order": boolean | string;
  "data-group": string;
  "data-placeholder"?: string;
  "data-all-label"?: string;
  "data-none-label"?: string;
  "data-use-single-column"?: boolean | string;
  "data-enable-text-search"?: boolean | string;
  "data-filter-type"?: string;
  "data-show-no-data-option"?: boolean | string;
  "data-close-on-select"?: boolean | string;
  "data-all-none-same-behaviour"?: boolean | string;
  "data-auto-apply"?: boolean | string;
  "data-taxonomy"?: string;
  "data-categories"?: string;
  "data-is-country-filter"?: boolean | string;
  "data-is-year-filter"?: boolean | string;
  "data-selected-year"?: number | string;
  "data-type"?: string;
  "data-sort-first-by"?: string;
  "data-default-values"?: string;
}
```

## 5. Acceptance Criteria

- **AC-001**: Given `data-is-year-filter="true"`, when rendered, a year-range selector appears.
- **AC-002**: Given `data-is-country-filter="true"`, when rendered, country filter options are displayed.
- **AC-003**: Given `data-alphabetical-sort="true"` and `data-asc-order="false"`, options are sorted Z–A.
- **AC-004**: Given `data-auto-apply="true"`, selecting an option immediately updates the post filter group.
- **AC-005**: Given `data-default-values="[42,43]"`, those values are pre-selected on mount.
- **AC-006**: Given `data-close-on-select="true"`, the dropdown closes after selection.

## 6. Test Automation Strategy

- **Test Levels**: Unit (sort, default values, auto-apply logic), Integration (WP taxonomy mock + Redux).
- **Frameworks**: Vitest + `@testing-library/react` + msw v2 + Redux mock store.
- **CI/CD Integration**: `pnpm --filter @devgateway/dvz-ui-react test`.

## 7. Rationale & Context

The `posts-filter` is more feature-rich than the CSV `filter` because WP post taxonomies can include country lists and year ranges that require specialised UX patterns. Auto-apply reduces friction for simple single-select scenarios.

## 8. Dependencies & External Integrations

### External Systems
- **EXT-001**: WordPress REST API — taxonomy term fetching.

### Technology Platform Dependencies
- **PLT-001**: Redux store — post filter group state.
- **PLT-002**: `react-intl` — localisation.

## 9. Examples & Edge Cases

```jsx
// Categorical filter
<div data-component="posts-filter"
     data-taxonomy="category"
     data-group="pub-filter-group"
     data-placeholder="Select Category"
     data-alphabetical-sort="true"
     data-auto-apply="true" />

// Year filter
<div data-component="posts-filter"
     data-is-year-filter="true"
     data-group="pub-filter-group"
     data-selected-year="2023" />
```

## 10. Validation Criteria

- **VAL-001**: Country filter renders country-specific UI.
- **VAL-002**: Year filter renders year-range selector.
- **VAL-003**: `data-default-values` are selected on mount.

## 11. Related Specifications / Further Reading

- [spec-design-dvz-ui-filtered-posts.md](./spec-design-dvz-ui-filtered-posts.md)
- [spec-design-dvz-ui-posts-pagination.md](./spec-design-dvz-ui-posts-pagination.md)
- [spec-design-dvz-ui-posts-filters-reset-button.md](./spec-design-dvz-ui-posts-filters-reset-button.md)

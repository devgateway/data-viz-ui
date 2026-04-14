---
title: Posts Pagination Embeddable Component
version: 1.0
date_created: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [design, dvz-ui, embeddable, posts, pagination, redux]
---

# Introduction

The `posts-pagination` embeddable renders a page selector for paginated WP post listings. It synchronises the current page with the Redux post filter group, driving `filtered-posts` to fetch the correct page of results.

## 1. Purpose & Scope

**Purpose**: Define the page calculation, navigation dispatch, and scroll-to-top behaviour for `posts-pagination`.

**Scope**: `packages/dvz-ui/src/embeddable/posts-pagination/index.tsx`.

**Intended Audience**: Engineers building paginated WP post listing pages.

## 2. Definitions

| Term | Definition |
|------|------------|
| **Total pages** | Computed as `ceil(totalPosts / data-number-of-items-per-page)`. |
| **Current page** | The active page index stored in the Redux post filter group. |
| **Page change dispatch** | A Redux action updating the current page in the post filter group. |

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: The component MUST compute total pages from `totalPosts` (from Redux) and `data-number-of-items-per-page`.
- **REQ-002**: Clicking a page number MUST dispatch a Redux action updating the current page.
- **REQ-003**: After page navigation, the component MUST scroll to the top of the post listing container.
- **REQ-004**: The component MUST stay in sync with the Redux page state (e.g., if another component changes the page, pagination MUST reflect it).
- **CON-001**: The component MUST use `useAppDispatch` and `useAppSelector`.

## 4. Interfaces & Data Contracts

### PostsPaginationProps Interface

```typescript
export interface PostsPaginationProps extends WrappedComponentProps {
  "data-group": string;
  "data-number-of-items-per-page": number;
}
```

### Page Change Action

```typescript
interface SetPageAction {
  type: 'SET_PAGE';
  group: string;
  page: number;
}
```

## 5. Acceptance Criteria

- **AC-001**: Given 30 total posts and `data-number-of-items-per-page="10"`, when rendered, 3 page buttons appear.
- **AC-002**: Clicking page 2 dispatches `SET_PAGE` with `page: 2` for the group.
- **AC-003**: After page change, the window scrolls to the top of the listing.
- **AC-004**: When Redux page state changes externally, the active page indicator updates.

## 6. Test Automation Strategy

- **Test Levels**: Unit (page count calculation, scroll trigger), Integration (Redux store).
- **Frameworks**: Vitest + `@testing-library/react` + RTK mock store.
- **CI/CD Integration**: `pnpm --filter @devgateway/dvz-ui-react test`.

## 7. Rationale & Context

Decoupling pagination from the post grid allows them to be placed at different positions on the page (e.g., top and bottom). Redux-based page state ensures both instances stay synchronised.

## 8. Dependencies & External Integrations

### Technology Platform Dependencies
- **PLT-001**: `@reduxjs/toolkit` — page state dispatch.
- **PLT-002**: `react-intl` — `WrappedComponentProps`.

## 9. Examples & Edge Cases

```jsx
<div data-component="posts-pagination"
     data-group="pub-filter-group"
     data-number-of-items-per-page="9" />

// Edge: 0 total posts → no pagination rendered
// Edge: 1 page total → no pagination rendered (single page)
```

## 10. Validation Criteria

- **VAL-001**: Page button count equals `ceil(total / perPage)`.
- **VAL-002**: Dispatch fires with correct page number.
- **VAL-003**: Single-page results show no pagination.

## 11. Related Specifications / Further Reading

- [spec-design-dvz-ui-filtered-posts.md](./spec-design-dvz-ui-filtered-posts.md)
- [spec-design-dvz-ui-posts-filter.md](./spec-design-dvz-ui-posts-filter.md)

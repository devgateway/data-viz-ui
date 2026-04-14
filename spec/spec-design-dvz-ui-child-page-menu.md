---
title: Child Page Menu Embeddable Component
version: 1.0
date_created: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [design, dvz-ui, embeddable, wordpress, navigation, layout]
---

# Introduction

The `child-page-menu` embeddable renders a two-panel layout: a vertical navigation menu of child pages (with optional group/subgroup hierarchy) on the left, and the selected page's content on the right.

## 1. Purpose & Scope

**Purpose**: Define the hierarchy rendering, page selection, and content display contract for `child-page-menu`.

**Scope**: `packages/dvz-ui/src/embeddable/child-page-menu/index.tsx`.

**Intended Audience**: Engineers building multi-section documentation or programme pages in WordPress.

## 2. Definitions

| Term | Definition |
|------|------------|
| **Child page** | A WP page whose `parent` field matches `data-parent`. |
| **Group** | A top-level menu item with expandable sub-pages. |
| **SubPage** | A second-level child page rendered inside an expanded group. |
| **PostContent** | The rendered body of the selected page, displayed in the right panel. |

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: The component MUST fetch all child pages whose WP parent ID matches `data-parent`, ordered by `menu_order`.
- **REQ-002**: The left panel MUST render a vertical menu; each item represents a child page group.
- **REQ-003**: Clicking a group MUST expand it to reveal its sub-pages (fetched via a nested `PageProvider`).
- **REQ-004**: Clicking a sub-page MUST update the right panel to display that page's `PostContent`.
- **REQ-005**: The first sub-page of the first expanded group MUST be auto-selected on initial render.
- **REQ-006**: If `data-parent` is not provided, the component MUST render an error segment (`"No child pages here"`) without throwing.
- **REQ-007**: Each group item MUST display an icon from `meta_fields.icon` if available.
- **CON-001**: The component MUST use `locale` from `react-intl` (via `injectIntl`) for all WP API requests.
- **GUD-001**: Keep `data-parent` pointing to a WP page with a well-defined child hierarchy.

## 4. Interfaces & Data Contracts

### `data-*` Attribute Props

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data-height` | `string` | — | Container height. |
| `data-style` | `string` | — | Visual style variant. |
| `data-columns` | `string` | — | Column layout hint. |
| `data-parent` | `string` | — | WP parent page ID for child page fetching. |
| `data-title` | `string` | `"Menu"` | Label shown at the top of the navigation panel. |

### ChildNavigatorProps

```typescript
interface ChildNavigatorProps {
  pages?: WpPage[];
  title: string;
  selected: WpPage | null;
  onPageSelected: (page: WpPage) => void;
}
```

### SubPagesSubPagesProps

```typescript
interface SubPagesSubPagesProps {
  pages?: WpPage[];
  selected: WpPage | null;
  expanded: boolean;
}
```

## 5. Acceptance Criteria

- **AC-001**: Given `data-parent="10"` with 3 child pages, when rendered, the left panel shows 3 group items.
- **AC-002**: When a group is clicked, its sub-pages are fetched and displayed.
- **AC-003**: When a sub-page is clicked, the right panel renders that page's content.
- **AC-004**: On initial render, the first sub-page of the first group is auto-selected and its content is displayed.
- **AC-005**: Given no `data-parent`, the component renders `"No child pages here"` without throwing.
- **AC-006**: Group items with `meta_fields.icon` display the resolved icon image.

## 6. Test Automation Strategy

- **Test Levels**: Unit (auto-selection logic, group expand), Integration (WP PageProvider mock).
- **Frameworks**: Vitest + `@testing-library/react` + msw v2.
- **Test Data Management**: Fixture WP page trees with parent/child relationships.
- **CI/CD Integration**: `pnpm --filter @devgateway/dvz-ui-react test`.

## 7. Rationale & Context

The two-panel child-page layout is a standard pattern for programme documentation sites where a parent page groups multiple sub-sections. Fetching sub-pages lazily (on group expand) reduces the initial payload for deep hierarchies.

## 8. Dependencies & External Integrations

### External Systems
- **EXT-001**: WordPress REST API — child page fetching via `/wp/v2/pages?parent={id}`.

### Technology Platform Dependencies
- **PLT-001**: `@devgateway/wp-react-lib` — `PageProvider`, `PageConsumer`, `PostIntro`.
- **PLT-002**: `@devgateway/ui` — `Container`, `Grid`, `GridColumn`, `GridRow`, `Menu`, `MenuItem`, `Segment`.
- **PLT-003**: `react-intl` — locale injection via `injectIntl`.

## 9. Examples & Edge Cases

```jsx
// Standard two-panel layout
<div data-component="child-page-menu"
     data-parent="42"
     data-title="Programme Areas" />

// Edge: parent with no children — shows error segment
<div data-component="child-page-menu"
     data-parent="999" />
```

## 10. Validation Criteria

- **VAL-001**: Left panel renders exactly `N` groups where `N` is the number of direct child pages.
- **VAL-002**: Right panel updates on sub-page selection.
- **VAL-003**: No WP API request is made when `data-parent` is absent.

## 11. Related Specifications / Further Reading

- [spec-design-dvz-ui-pagegallery.md](./spec-design-dvz-ui-pagegallery.md)
- [spec-tool-wp-react-lib-typed-api.md](./spec-tool-wp-react-lib-typed-api.md)

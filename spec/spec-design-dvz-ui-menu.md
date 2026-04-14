---
title: Menu Embeddable Component
version: 1.0
date_created: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [design, dvz-ui, embeddable, wordpress, navigation, menu]
---

# Introduction

The `menu` embeddable renders a WordPress navigation menu fetched from the WP menus API, with support for icons, labels, and locale-prefixed URL rewriting.

## 1. Purpose & Scope

**Purpose**: Define the menu fetching, URL rewriting, icon/label rendering, and locale-awareness contract for `menu`.

**Scope**: `packages/dvz-ui/src/embeddable/menu/index.tsx`.

**Intended Audience**: Engineers embedding WP navigation menus in React-rendered pages.

## 2. Definitions

| Term | Definition |
|------|------------|
| **WP menu** | A navigation menu registered in WordPress and fetched via the menus REST API. |
| **Locale prefix** | The BCP 47 language tag prepended to menu item URLs (e.g., `/en/`). |
| **Menu item** | A single navigable link within the WP menu, potentially with child items. |

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: The component MUST fetch the WP menu identified by `data-name` from the menus API.
- **REQ-002**: All menu item URLs MUST be rewritten to include the active locale prefix (e.g., `/en/about`).
- **REQ-003**: When `data-show-icons` is truthy, menu items MUST display their associated icon.
- **REQ-004**: When `data-show-labels` is truthy, menu items MUST display their text labels.
- **REQ-005**: Child items MUST be rendered as nested menu items.
- **REQ-006**: The active route MUST be visually indicated on the matching menu item.
- **CON-001**: URL rewriting MUST handle the case where the locale prefix is already present in the URL.
- **GUD-001**: Use `data-name` matching the menu slug registered in WordPress.

## 4. Interfaces & Data Contracts

### `data-*` Attribute Props

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data-name` | `string` | `"main"` | WP menu slug to fetch. |
| `data-label` | `string` | — | Optional label shown above the menu. |
| `data-icon` | `string` | — | Icon URL for the menu container. |
| `data-icon-id` | `string` | — | WP media ID to resolve an icon. |
| `data-show-icons` | `string` | — | Show item icons when `"true"`. |
| `data-show-labels` | `string` | — | Show item labels when `"true"`. |

### URL Rewriting Rule

```
Input:  https://example.com/wp/about
Output: /en/about   (where "en" is the active locale)

Input:  https://example.com/wp/en/about  (locale already present)
Output: /en/about   (no duplication)
```

## 5. Acceptance Criteria

- **AC-001**: Given `data-name="main"`, when rendered, the `main` WP menu items are displayed.
- **AC-002**: Each menu item URL is locale-prefixed (e.g., `/en/about`).
- **AC-003**: If the locale is already in the URL, it is not duplicated.
- **AC-004**: Given `data-show-icons="true"`, icon elements are rendered for items that have icons.
- **AC-005**: Child items are rendered as nested list items beneath their parent.
- **AC-006**: The currently active route item has the `"active"` CSS class.

## 6. Test Automation Strategy

- **Test Levels**: Unit (URL rewriting function), Integration (WP menu API mock).
- **Frameworks**: Vitest + `@testing-library/react` + msw v2.
- **CI/CD Integration**: `pnpm --filter @devgateway/dvz-ui-react test`.

## 7. Rationale & Context

WP menu integration enables content editors to manage navigation in WordPress without code changes. Locale-prefixed URL rewriting ensures correct routing in multilingual SPA deployments.

## 8. Dependencies & External Integrations

### External Systems
- **EXT-001**: WP Menus REST API (`/menus/v1/menus/{slug}`) — requires WP-REST-API V2 Menus plugin.

### Technology Platform Dependencies
- **PLT-001**: `@devgateway/wp-react-lib` — `MenuProvider`, `MenuConsumer`.
- **PLT-002**: `@devgateway/ui` — `Container`, `Menu`, `MenuItem`.
- **PLT-003**: `react-intl` — locale injection via `injectIntl`.

## 9. Examples & Edge Cases

```jsx
<div data-component="menu"
     data-name="main-navigation"
     data-show-icons="true"
     data-show-labels="true" />

// Edge: menu slug not found in WP → renders empty menu container without error
```

## 10. Validation Criteria

- **VAL-001**: `localReplaceLink` does not duplicate the locale prefix.
- **VAL-002**: Menu items render for every entry in the fetched menu.
- **VAL-003**: Active route item has `"active"` class.

## 11. Related Specifications / Further Reading

- [spec-tool-wp-react-lib-typed-api.md](./spec-tool-wp-react-lib-typed-api.md)
- [WP-REST-API V2 Menus plugin](https://wordpress.org/plugins/wp-rest-api-v2-menus/)

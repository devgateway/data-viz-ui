---
title: Featured Tabs Embeddable Component
version: 1.0
date_created: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [design, dvz-ui, embeddable, wordpress, tabs, accordion, posts]
---

# Introduction

The `featuredtabs` embeddable renders WP posts as a horizontal accordion/tab strip. Each tab card shows a featured image and excerpt; clicking a card expands it to reveal the full post content.

## 1. Purpose & Scope

**Purpose**: Define the post-fetching, expand/collapse animation, and media rendering contract for `featuredtabs`.

**Scope**: `packages/dvz-ui/src/embeddable/featuredtabs/index.tsx`.

**Intended Audience**: Engineers building featured content sections on editorial pages.

## 2. Definitions

| Term | Definition |
|------|------------|
| **Tab card** | A single post displayed as a collapsed card in the horizontal strip. |
| **Accordion expand** | The animation revealing the full post content when a tab card is clicked. |
| **Preview mode** | A `data-preview-mode` value that controls how post cards are rendered before expansion. |

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: The component MUST fetch WP posts matching `data-type`, `data-taxonomy`, `data-categories`, limited by `data-items` count.
- **REQ-002**: Posts MUST be rendered as horizontal tab cards with a featured image extracted from post content.
- **REQ-003**: Clicking a card MUST expand it with animation to show the full post content; all other cards MUST collapse.
- **REQ-004**: The first card MUST be auto-expanded on initial render (after a `window.setTimeout` delay for scroll safety).
- **REQ-005**: `data-color` MUST control the accent colour applied to expanded card decorations.
- **REQ-006**: `data-read-more-label` and `data-close-label` MUST be used for the expand/collapse buttons.
- **CON-001**: Requires `window.setTimeout` for initial card expansion — this component MUST be `'use client'`.
- **GUD-001**: Set `data-use-scrolls="true"` to enable scrolling behaviour on tab overflow.

## 4. Interfaces & Data Contracts

### `data-*` Attribute Props

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data-width` | `number` | — | Container width. |
| `data-height` | `number` | — | Card height. |
| `data-type` | `string` | — | WP post type to fetch. |
| `data-taxonomy` | `string` | — | Taxonomy for filtering. |
| `data-categories` | `string` | — | Category slugs (comma-separated). |
| `data-items` | `string` | — | Number of posts to fetch. |
| `data-color` | `string` | — | Accent colour (hex or CSS colour). |
| `data-read-more-label` | `string` | — | Label for expand action. |
| `data-close-label` | `string` | — | Label for collapse action. |
| `data-use-scrolls` | `string` | — | Enable horizontal scroll on tab overflow. |
| `data-preview-mode` | `string` | — | Card preview rendering mode. |

### FeaturedTabsProps

```typescript
interface FeaturedTabsProps {
  posts: WpPost[];
  width: number;
  height: number;
  color: string;
  moreLabel: string;
  closeLabel: string;
}
```

## 5. Acceptance Criteria

- **AC-001**: Given 4 posts fetched, when rendered, 4 tab cards are displayed in a horizontal strip.
- **AC-002**: On initial render, the first card is auto-expanded after the timeout.
- **AC-003**: Clicking a collapsed card expands it and collapses any previously expanded card.
- **AC-004**: Given `data-color="#e63946"`, the expanded card accent colour is `#e63946`.
- **AC-005**: `data-read-more-label` and `data-close-label` appear on the respective action buttons.

## 6. Test Automation Strategy

- **Test Levels**: Unit (expand/collapse state), Integration (WP post fetch mock).
- **Frameworks**: Vitest + `@testing-library/react` + msw v2.
- **CI/CD Integration**: `pnpm --filter @devgateway/dvz-ui-react test`.

## 7. Rationale & Context

The featured tabs pattern condenses multiple posts into a compact horizontal layout, suitable for programme highlights sections. Auto-expanding the first card gives users an immediate sense of the content format.

## 8. Dependencies & External Integrations

### External Systems
- **EXT-001**: WordPress REST API — post fetching with taxonomy filters.

### Technology Platform Dependencies
- **PLT-001**: `@devgateway/wp-react-lib` — post data providers.

## 9. Examples & Edge Cases

```jsx
<div data-component="featuredtabs"
     data-type="publication"
     data-taxonomy="category"
     data-categories="research"
     data-items="5"
     data-color="#1a73e8"
     data-read-more-label="Read More"
     data-close-label="Close" />

// Edge: 0 posts returned — renders empty container without error
```

## 10. Validation Criteria

- **VAL-001**: Exactly `data-items` cards render when sufficient posts are available.
- **VAL-002**: First card is expanded on mount.
- **VAL-003**: Only one card is expanded at any time.

## 11. Related Specifications / Further Reading

- [spec-design-dvz-ui-vertical-featuredtabs.md](./spec-design-dvz-ui-vertical-featuredtabs.md)
- [spec-design-dvz-ui-tabbedposts.md](./spec-design-dvz-ui-tabbedposts.md)

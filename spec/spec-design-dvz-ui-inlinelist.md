---
title: Inline List Embeddable Component
version: 1.0
date_created: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [design, dvz-ui, embeddable, wordpress, posts, list]
---

# Introduction

The `inlinelist` embeddable renders WP posts as a vertical list with optional icons, expandable content toggles, and hash-based anchor scrolling support.

## 1. Purpose & Scope

**Purpose**: Define the post list rendering, content toggle, icon display, and anchor-scroll contract for `inlinelist`.

**Scope**: `packages/dvz-ui/src/embeddable/inlinelist/index.tsx`.

**Intended Audience**: Engineers building post/resource listing sections within WP pages.

## 2. Definitions

| Term | Definition |
|------|------------|
| **Content toggle** | An expandable section revealing the full post body beneath the post intro. |
| **Post icon** | A media image attached to a post via WP media API, displayed next to the title. |
| **Hash scroll** | Browser hash navigation to a specific post by its slug anchor on page load. |

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: The component MUST fetch WP posts matching `data-type`, `data-taxonomy`, `data-categories`, limited by `data-items` count.
- **REQ-002**: When `data-show-post-icons` is `"true"`, the component MUST display the post's media icon.
- **REQ-003**: When `data-show-content-toggle` is `"true"`, each post MUST have a read-more/read-less toggle.
- **REQ-004**: `data-read-more-label` and `data-read-less-label` MUST be used for toggle button labels.
- **REQ-005**: On mount, if `window.location.hash` matches a post slug, the component MUST scroll to that post.
- **REQ-006**: The content toggle MUST scroll back to the post top when collapsing.
- **CON-001**: Hash scroll uses `window.setTimeout` — this component MUST be `'use client'` in SSR contexts.
- **GUD-001**: Use `data-content-toggle-h-position` to control the horizontal alignment of the toggle button.

## 4. Interfaces & Data Contracts

### InlineListProps Interface

```typescript
export interface InlineListProps {
  "data-width"?: string;
  "data-height"?: string;
  "data-type"?: string;
  "data-taxonomy"?: string;
  "data-categories"?: string;
  "data-items"?: string;
  "data-color"?: string;
  "data-show-post-icons"?: string;
  "data-show-content-toggle"?: string;
  "data-content-toggle-h-position"?: string;
  "data-read-more-label"?: string;
  "data-read-less-label"?: string;
}
```

### ListOfPostProps

```typescript
interface ListOfPostProps {
  posts: WpPost[];
  showIcons: boolean;
  showContentToggle: boolean;
  contentToggleHPosition: number;
  locale: string;
  readMoreLabel?: string;
  readLessLabel?: string;
}
```

## 5. Acceptance Criteria

- **AC-001**: Given 5 posts fetched, when rendered, 5 list items appear.
- **AC-002**: Given `data-show-post-icons="true"`, each post item displays its media icon.
- **AC-003**: Given `data-show-content-toggle="true"`, each post has a read-more button; clicking it expands the full body.
- **AC-004**: Given `data-read-more-label="Expand"`, the toggle button shows `"Expand"`.
- **AC-005**: On mount with `window.location.hash="#annual-report"`, the component scrolls to the post with slug `annual-report`.
- **AC-006**: Collapsing an expanded post scrolls back to its top.

## 6. Test Automation Strategy

- **Test Levels**: Unit (toggle state, label fallback), Integration (WP post mock).
- **Frameworks**: Vitest + `@testing-library/react` + msw v2.
- **CI/CD Integration**: `pnpm --filter @devgateway/dvz-ui-react test`.

## 7. Rationale & Context

Inline lists are the standard pattern for publication index pages where users need to read summaries and optionally expand to full content without navigating away. Hash scroll enables direct linking to specific publications.

## 8. Dependencies & External Integrations

### External Systems
- **EXT-001**: WordPress REST API — post fetching.

### Technology Platform Dependencies
- **PLT-001**: `@devgateway/wp-react-lib` — `PostProvider`, `PostConsumer`, `PostIcon`.
- **PLT-002**: `@devgateway/ui` — `Container`, `Grid`, `Badge`.

## 9. Examples & Edge Cases

```jsx
<div data-component="inlinelist"
     data-type="publication"
     data-taxonomy="category"
     data-categories="reports"
     data-items="10"
     data-show-post-icons="true"
     data-show-content-toggle="true"
     data-read-more-label="Read More"
     data-read-less-label="Collapse" />

// Edge: hash scroll to non-existent slug → no scroll, no error
```

## 10. Validation Criteria

- **VAL-001**: Toggle expands/collapses post body correctly.
- **VAL-002**: Hash scroll fires on mount when hash matches a post slug.
- **VAL-003**: Missing label attributes fall back to defaults `"Read More"` / `"Collapse"`.

## 11. Related Specifications / Further Reading

- [spec-design-dvz-ui-postscarousel.md](./spec-design-dvz-ui-postscarousel.md)
- [spec-design-dvz-ui-filtered-posts.md](./spec-design-dvz-ui-filtered-posts.md)

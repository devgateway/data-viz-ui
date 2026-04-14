---
title: Parallax Embeddable Component
version: 1.0
date_created: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [design, dvz-ui, embeddable, wordpress, parallax, posts]
---

# Introduction

The `parallax` embeddable renders WP posts using `@react-spring/parallax` to create a scrollable parallax effect, with configurable sticky and non-sticky layer behaviours per post.

## 1. Purpose & Scope

**Purpose**: Define the post-fetching, layer configuration, and parallax rendering contract for `parallax`.

**Scope**: `packages/dvz-ui/src/embeddable/parallax/index.tsx`.

**Intended Audience**: Engineers building visually immersive scroll sections.

## 2. Definitions

| Term | Definition |
|------|------------|
| **Parallax layer** | A `@react-spring/parallax` `ParallaxLayer` with configurable `offset`, `speed`, and `sticky` properties. |
| **Sticky layer** | A layer that stays fixed in view during a range of the scroll. |
| **`data-scrolls`** | Number of full-page scroll lengths allocated for the parallax container. |
| **Configuration** | A JSON array (from `data-configuration`) mapping post positions to parallax layer props. |

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: The component MUST fetch WP posts matching `data-type`, `data-taxonomy`, `data-categories`, limited by `data-count`.
- **REQ-002**: Each post MUST be rendered inside a `ParallaxLayer` with configuration derived from `data-configuration`.
- **REQ-003**: When a configuration entry has `sticky: true`, the layer MUST use the `sticky` prop with `startOffset` and `endOffset`.
- **REQ-004**: `data-scrolls` MUST set the total number of scroll pages on the `Parallax` container.
- **REQ-005**: When `data-horizontal` is `true`, the parallax MUST scroll horizontally.
- **CON-001**: `@react-spring/parallax` is client-only — this component MUST be `'use client'` in SSR contexts.
- **GUD-001**: Set `data-scrolls` to match the number of posts for a one-post-per-scroll-page layout.

## 4. Interfaces & Data Contracts

### `data-*` Attribute Props

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data-width` | `string` | — | Container width. |
| `data-height` | `string` | — | Container height. |
| `data-type` | `string` | — | WP post type. |
| `data-taxonomy` | `string` | — | Taxonomy for filtering. |
| `data-categories` | `string` | — | Category slugs. |
| `data-count` | `string` | — | Number of posts. |
| `data-horizontal` | `boolean\|string` | `false` | Enable horizontal scrolling. |
| `data-scrolls` | `string` | — | Number of scroll pages. |
| `data-configuration` | `string` (JSON) | — | Array of per-post `ParallaxLayer` props. |

### Layer Config Shape

```typescript
interface LayerConfig {
  sticky?: { start: number; end: number };
  offset?: number;
  speed?: number;
  factor?: number;
}
```

## 5. Acceptance Criteria

- **AC-001**: Given 3 posts and a matching configuration, when rendered, 3 `ParallaxLayer` elements are mounted.
- **AC-002**: Given a configuration entry with `sticky: { start: 0, end: 1 }`, that layer uses the `sticky` prop.
- **AC-003**: Given `data-horizontal="true"`, the Parallax container scrolls horizontally.
- **AC-004**: `data-scrolls` value is passed to the `Parallax` component as the `pages` prop.

## 6. Test Automation Strategy

- **Test Levels**: Unit (layer config parsing, sticky/non-sticky prop assignment).
- **Frameworks**: Vitest + `@testing-library/react`; mock `@react-spring/parallax`.
- **CI/CD Integration**: `pnpm --filter @devgateway/dvz-ui-react test`.

## 7. Rationale & Context

Parallax scrolling is used for immersive highlight sections, annual review headers, and feature showcases. The `data-configuration` JSON approach gives editors fine-grained control over layer behaviour without code changes.

## 8. Dependencies & External Integrations

### External Systems
- **EXT-001**: WordPress REST API — post fetching.

### Technology Platform Dependencies
- **PLT-001**: `@react-spring/parallax` — `Parallax`, `ParallaxLayer`.
- **PLT-002**: `@devgateway/wp-react-lib` — post data providers.

## 9. Examples & Edge Cases

```jsx
<div data-component="parallax"
     data-type="highlight"
     data-count="4"
     data-scrolls="4"
     data-configuration='[{"offset":0,"speed":0.5},{"sticky":{"start":1,"end":2}},{"offset":2},{"offset":3}]' />
```

## 10. Validation Criteria

- **VAL-001**: One `ParallaxLayer` per post.
- **VAL-002**: Sticky config maps to the `sticky` prop.
- **VAL-003**: `pages` prop on `Parallax` matches `data-scrolls`.

## 11. Related Specifications / Further Reading

- [@react-spring/parallax docs](https://www.react-spring.dev/docs/components/parallax)

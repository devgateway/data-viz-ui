---
title: Posts Carousel Embeddable Component
version: 1.0
date_created: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [design, dvz-ui, embeddable, wordpress, carousel, posts]
---

# Introduction

The `postscarousel` embeddable renders WP posts in a horizontally-sliding carousel with optional auto-advance and configurable transition interval.

## 1. Purpose & Scope

**Purpose**: Define the post-fetching, carousel variants, auto-advance, and height contract for `postscarousel`.

**Scope**: `packages/dvz-ui/src/embeddable/postscarousel/index.tsx`.

**Intended Audience**: Engineers building featured post carousels on landing pages.

## 2. Definitions

| Term | Definition |
|------|------------|
| **Auto-switch** | Automatic carousel advancement controlled by `data-auto-switch` and `data-interval`. |
| **Interval** | Time in milliseconds between automatic slide advances. |
| **Carousel variant** | The internal carousel implementation used (`Carousel`, `Carousel1`, `_Carousel`). |

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: The component MUST fetch WP posts matching `data-type`, `data-taxonomy`, `data-categories`, limited by `data-items`.
- **REQ-002**: Posts MUST be rendered as carousel slides using `pure-react-carousel`.
- **REQ-003**: When `data-auto-switch` is `"true"`, slides MUST advance automatically at `data-interval` milliseconds (default `10000`).
- **REQ-004**: `data-height` MUST control the carousel height.
- **CON-001**: `pure-react-carousel` is client-only — this component MUST be `'use client'` in SSR contexts.

## 4. Interfaces & Data Contracts

### PostCarouselProps Interface

```typescript
export interface PostCarouselProps {
  "data-type": string;
  "data-taxonomy": string;
  "data-categories": string;
  "data-items": string;
  "data-height": string;
  "data-auto-switch": string;
  "data-interval": string | number;
}
```

### Carousel Props

```typescript
interface CarouselProps {
  posts: WpPost[];
  height: string;
  interval?: number | string;
  autoSwitch?: string;
}
```

## 5. Acceptance Criteria

- **AC-001**: Given 4 posts, when rendered, 4 slides are present in the carousel.
- **AC-002**: Given `data-auto-switch="true"` and `data-interval="5000"`, slides advance every 5 seconds.
- **AC-003**: Given `data-auto-switch="false"`, slides do not advance automatically.
- **AC-004**: `data-height` is applied to the carousel container.
- **AC-005**: Given 0 posts, an empty carousel renders without error.

## 6. Test Automation Strategy

- **Test Levels**: Unit (slide count, auto-switch configuration).
- **Frameworks**: Vitest + `@testing-library/react`; mock `pure-react-carousel`.
- **CI/CD Integration**: `pnpm --filter @devgateway/dvz-ui-react test`.

## 7. Rationale & Context

Carousels are used for featured post highlights on home pages and section landings. Auto-advance with a configurable interval gives editors control over pacing without code changes.

## 8. Dependencies & External Integrations

### External Systems
- **EXT-001**: WordPress REST API — post fetching.

### Technology Platform Dependencies
- **PLT-001**: `pure-react-carousel` — `CarouselProvider`, `Slider`, `Slide`.
- **PLT-002**: `@devgateway/wp-react-lib` — post data providers.

## 9. Examples & Edge Cases

```jsx
<div data-component="postscarousel"
     data-type="publication"
     data-taxonomy="category"
     data-categories="featured"
     data-items="5"
     data-height="400"
     data-auto-switch="true"
     data-interval="8000" />
```

## 10. Validation Criteria

- **VAL-001**: Slide count equals number of fetched posts.
- **VAL-002**: Auto-advance fires at the specified interval.
- **VAL-003**: Disabled auto-switch does not fire automatic transitions.

## 11. Related Specifications / Further Reading

- [spec-design-dvz-ui-inlinelist.md](./spec-design-dvz-ui-inlinelist.md)
- [spec-design-dvz-ui-featuredtabs.md](./spec-design-dvz-ui-featuredtabs.md)

---
title: Page Modules Embeddable Component
version: 1.0
date_created: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [design, dvz-ui, embeddable, wordpress, pages, sections, navigation]
---

# Introduction

The `pagemodules` embeddable renders WP pages as scrollable full-page sections with intersection-observer-based active-section tracking and optional sticky side navigation.

## 1. Purpose & Scope

**Purpose**: Define the section rendering, intersection tracking, nav label, and scroll-to-top contract for `pagemodules`.

**Scope**: `packages/dvz-ui/src/embeddable/pagemodules/index.tsx`.

**Intended Audience**: Engineers building long-form sectioned pages with sticky navigation.

## 2. Definitions

| Term | Definition |
|------|------------|
| **Module** | A single WP page rendered as a full-height section. |
| **Section nav** | A sticky side navigation indicating which section is currently in view. |
| **IntersectionObserver** | Browser API used to detect when a module enters the viewport. |
| **navTitle** | The label used in the side navigation for each section. |

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: The component MUST fetch WP pages matching `data-type`, `data-taxonomy`, `data-categories`, limited by `data-items`.
- **REQ-002**: Each page MUST be rendered as a `Module` section with a `SectionHeader`.
- **REQ-003**: When a module enters the viewport (`IntersectionObserver`), the side navigation MUST highlight the corresponding item.
- **REQ-004**: `data-nav-label` MUST set the label used in the side navigation (falls back to page title).
- **REQ-005**: `data-to-top-label` MUST set the label for the scroll-to-top button at the bottom of each section.
- **REQ-006**: Section headers MUST display the page title, subtitle, and icon (from `meta_fields`).
- **CON-001**: This component uses `IntersectionObserver` and `useEffect` — it MUST be `'use client'` in SSR contexts.
- **GUD-001**: Use `data-preview-mode` to control how sections are rendered in CMS preview.

## 4. Interfaces & Data Contracts

### PageModuleProps Interface

```typescript
export interface PageModuleProps {
  "data-type": string;
  "data-taxonomy": string;
  "data-categories": string;
  "data-items": string;
  "data-nav-label": string;
  "data-to-top-label": string;
  "data-preview-mode": string;
}
```

### SectionHeaderProps

```typescript
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
  media?: WpMedia;
}
```

## 5. Acceptance Criteria

- **AC-001**: Given 4 pages, when rendered, 4 sections appear in scroll order.
- **AC-002**: When a section enters the viewport, the side nav highlights that section's item.
- **AC-003**: Given `data-to-top-label="Back to Top"`, the scroll-to-top button shows that label.
- **AC-004**: Each section header renders the page title.
- **AC-005**: The side navigation is fixed/sticky and remains visible while scrolling.

## 6. Test Automation Strategy

- **Test Levels**: Unit (intersection state tracking), Integration (WP page mock).
- **Frameworks**: Vitest + `@testing-library/react`; mock `IntersectionObserver`.
- **CI/CD Integration**: `pnpm --filter @devgateway/dvz-ui-react test`.

## 7. Rationale & Context

Page modules are used for long-form reports and annual reviews where content is divided into clearly navigable chapters. Intersection-observer tracking provides passive scroll-spy without polling.

## 8. Dependencies & External Integrations

### External Systems
- **EXT-001**: WordPress REST API — page fetching.

### Technology Platform Dependencies
- **PLT-001**: `@devgateway/wp-react-lib` — page data providers.
- **PLT-002**: `react-intersection-observer` — `InView` component.

## 9. Examples & Edge Cases

```jsx
<div data-component="pagemodules"
     data-type="page"
     data-taxonomy="category"
     data-categories="chapters"
     data-items="6"
     data-nav-label="Navigation"
     data-to-top-label="Back to Top" />
```

## 10. Validation Criteria

- **VAL-001**: Active section nav item changes as the user scrolls.
- **VAL-002**: Each section renders page title and content.
- **VAL-003**: `IntersectionObserver` mock does not cause test failures.

## 11. Related Specifications / Further Reading

- [spec-design-dvz-ui-pagegallery.md](./spec-design-dvz-ui-pagegallery.md)

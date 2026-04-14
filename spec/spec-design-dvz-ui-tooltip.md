---
title: Tooltip Embeddable Component
version: 1.0
date_created: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [design, dvz-ui, embeddable, tooltip, ui]
---

# Introduction

The `tooltip` embeddable renders a simple inline tooltip icon that, when hovered or focused, displays a decoded description string.

## 1. Purpose & Scope

**Purpose**: Define the description decoding, display trigger, and accessibility contract for the `tooltip` component.

**Scope**: `packages/dvz-ui/src/embeddable/tooltip/index.tsx`.

**Intended Audience**: Engineers adding contextual help text to WP pages.

## 2. Definitions

| Term | Definition |
|------|------------|
| **URI-encoded description** | The `data-description` value is URI-encoded to survive HTML attribute serialisation. |
| **Tooltip trigger** | The icon element that activates the tooltip on hover/focus. |

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: `data-description` MUST be decoded from URI encoding before display.
- **REQ-002**: The tooltip MUST be visible on hover and keyboard focus.
- **REQ-003**: The tooltip MUST be dismissible on mouse-out and blur.
- **REQ-004**: The tooltip trigger MUST have an accessible `aria-label` or `title`.
- **CON-001**: No external library required — pure CSS/React implementation.

## 4. Interfaces & Data Contracts

### `data-*` Attribute Props

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `data-description` | `string` | ✅ | URI-encoded tooltip text. |

## 5. Acceptance Criteria

- **AC-001**: `data-description` is decoded and displayed as tooltip content.
- **AC-002**: Tooltip appears on hover.
- **AC-003**: Tooltip appears on keyboard focus.
- **AC-004**: Tooltip hides on mouse-out and blur.
- **AC-005**: Empty `data-description` renders no tooltip.

## 6. Test Automation Strategy

- **Test Levels**: Unit (decoding, visibility toggle), Accessibility (axe-core).
- **Frameworks**: Vitest + `@testing-library/react` + `jest-axe`.
- **CI/CD Integration**: `pnpm --filter @devgateway/dvz-ui-react test`.

## 7. Rationale & Context

URI encoding is required because tooltip content often includes special characters (ampersands, quotes) that would break HTML attribute parsing. Decoding at render time ensures safe display.

## 8. Dependencies & External Integrations

No external dependencies.

## 9. Examples & Edge Cases

```jsx
<div data-component="tooltip"
     data-description="Gross%20National%20Income%20(GNI)%20per%20capita" />

// Renders: tooltip with text "Gross National Income (GNI) per capita"
// Edge: malformed URI encoding → display raw string without throwing
```

## 10. Validation Criteria

- **VAL-001**: Decoded text appears in tooltip popup.
- **VAL-002**: Tooltip visible on hover/focus.
- **VAL-003**: No tooltip for empty description.

## 11. Related Specifications / Further Reading

- [spec-design-dvz-ui-datalabel.md](./spec-design-dvz-ui-datalabel.md)

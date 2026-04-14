---
title: Wrapped Embeddable Component
version: 1.0
date_created: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [design, dvz-ui, embeddable, dynamic, wrapper, registry]
---

# Introduction

The `wrapped` embeddable is a dynamic dispatcher that resolves a component by name from the embeddable registry and renders it with the provided dimensions, enabling WP editors to embed any registered component using a single generic block.

## 1. Purpose & Scope

**Purpose**: Define the component registry lookup, prop forwarding, and error handling contract for the `wrapped` dynamic dispatcher.

**Scope**: `packages/dvz-ui/src/embeddable/wrapped/index.jsx`.

**Intended Audience**: Engineers building generic WP embed blocks and editors using them.

## 2. Definitions

| Term | Definition |
|------|------------|
| **Embeddable registry** | A map of component name strings to React component references. |
| **Dynamic dispatch** | Resolving and rendering a component class/function at runtime by name. |
| **Forwarded props** | All `data-*` attributes except `data-name`, `data-width`, and `data-height` are forwarded. |

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: The component MUST look up `data-name` in the embeddable registry and render the resolved component.
- **REQ-002**: `data-width` and `data-height` MUST be applied as dimensions to the wrapper container.
- **REQ-003**: All additional `data-*` attributes MUST be forwarded as props to the resolved component.
- **REQ-004**: If `data-name` is not found in the registry, the component MUST render an error/fallback state instead of throwing.
- **CON-001**: The registry is defined at build time — dynamically adding components at runtime is out of scope.

## 4. Interfaces & Data Contracts

### `data-*` Attribute Props

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `data-name` | `string` | ✅ | Registry key of the component to render. |
| `data-width` | `string` | — | Width applied to the wrapper container. |
| `data-height` | `string` | — | Height applied to the wrapper container. |
| `...rest` | `data-*` | — | Forwarded to the resolved component. |

### Registry Shape

```typescript
type EmbeddableRegistry = Record<string, React.ComponentType<any>>;
```

## 5. Acceptance Criteria

- **AC-001**: Given `data-name="chart"`, the `chart` embeddable is rendered inside the wrapper.
- **AC-002**: Given `data-width="800"` and `data-height="400"`, the wrapper container has those dimensions.
- **AC-003**: Additional `data-*` attributes are forwarded to the resolved component.
- **AC-004**: Given an unknown `data-name`, a user-facing error/fallback is rendered instead of throwing.

## 6. Test Automation Strategy

- **Test Levels**: Unit (registry lookup, prop forwarding, unknown name fallback).
- **Frameworks**: Vitest + `@testing-library/react`; mock registry.
- **CI/CD Integration**: `pnpm --filter @devgateway/dvz-ui-react test`.

## 7. Rationale & Context

The `wrapped` dispatcher allows editors to use a single "generic component" WP block with a name parameter, reducing the number of custom Gutenberg blocks while keeping all embeddable components available.

## 8. Dependencies & External Integrations

No external dependencies — uses the internal embeddable registry.

## 9. Examples & Edge Cases

```jsx
<div data-component="wrapped"
     data-name="big-number"
     data-width="400"
     data-height="200"
     data-csv="/api/proxy?url=stats.csv"
     data-indicator="Total" />

// Edge: unknown data-name → shows "Component 'xyz' not found" fallback
// Edge: no data-name → shows fallback
```

## 10. Validation Criteria

- **VAL-001**: Known component name renders the correct component.
- **VAL-002**: Wrapper dimensions applied correctly.
- **VAL-003**: Unknown name shows fallback without JS error.

## 11. Related Specifications / Further Reading

- All other `spec-design-dvz-ui-*.md` specs (components that can be dispatched via `wrapped`).

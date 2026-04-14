---
title: D3 Map Embeddable Component
version: 1.0
date_created: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [design, dvz-ui, embeddable, d3, map, data-visualization, geo]
---

# Introduction

The `d3Map` embeddable renders an interactive D3-based geographic map with support for multiple layer types: base (TopoJSON geography), data (choropleth), flow (connection lines), and dataPoints (lat/long scatter). It supports zoom/pan, legends, tooltips, and responsive width measurement.

## 1. Purpose & Scope

**Purpose**: Define the layer architecture, projection support, responsive sizing, and interaction contract for `d3Map`.

**Scope**: `packages/dvz-ui/src/embeddable/d3Map/` — `index.jsx`, `Map.jsx`, `BaseLayer.jsx`, `DataLayer.jsx`, `FlowLayer.jsx`, `LatLongLayer.jsx`, `ZoomControl.jsx`, `Legends.jsx`, `ProjectedContainer.jsx`, `Tooltip.jsx`.

**Intended Audience**: Engineers building geographic data visualisations.

## 2. Definitions

| Term | Definition |
|------|------------|
| **Layer** | A single visual element rendered within the map (base geography, choropleth data, flow lines, or scatter points). |
| **TopoJSON** | A compact geographic data format; used for base and data layers. |
| **Projection** | A D3 geographic projection (e.g., `geoMercator`) mapping lat/long to screen coordinates. |
| **`data-layers`** | A JSON array of layer configuration objects passed as an attribute. |
| **Transform** | A D3 zoom transform `{ k, x, y }` applied to all layers simultaneously. |
| **ResizeObserver** | Browser API used to measure the container width for responsive layout. |

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: The component MUST measure its container width using `ResizeObserver` and defer rendering until a positive width is obtained.
- **REQ-002**: Each layer in `data-layers` MUST be rendered as the appropriate sub-component based on `layer.type`: `"base"` → `BaseLayer`, `"data"` → `DataLayer`, `"flow"` → `FlowLayer`, `"dataPoints"` → `LatLongLayer`.
- **REQ-003**: The D3 projection MUST be configurable via `data-projection` (default `"geoMercator"`).
- **REQ-004**: Zoom and pan MUST be controlled by `ZoomControl`; enable/disable via `data-zoom-enabled`.
- **REQ-005**: Layer visibility MUST be togglable at runtime via legend item clicks.
- **REQ-006**: `data-wait-for-filters` when `"true"` MUST prevent data layer requests until Redux filters are ready.
- **REQ-007**: The component MUST track when all layers have signalled `onReady` before enabling zoom-to-fit.
- **CON-001**: This component is client-only and MUST be wrapped in a `'use client'` boundary when used in SSR contexts.
- **CON-002**: `data-layers` MUST be a valid JSON array string; malformed JSON falls back to an empty array.
- **GUD-001**: Set `data-height` and `data-width` to define the aspect ratio; the component overrides width from the measured container.

## 4. Interfaces & Data Contracts

### `data-*` Attribute Props

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data-identifier` | `string` | — | Unique identifier for zoom coordination. |
| `data-group` | `string` | — | Redux filter group name. |
| `data-layers` | `string` (JSON) | `"[]"` | Array of layer config objects. |
| `data-height` | `number` | `400` | Map height in pixels. |
| `data-width` | `number` | `1000` | Reference width for aspect ratio. |
| `data-back-ground-color` | `string` | `"#88e8dc"` | Background fill colour. |
| `data-map-position` | `string` (JSON) | `"{}"` | Initial map position/scale object. |
| `data-projection` | `string` | `"geoMercator"` | D3 projection name. |
| `data-zoom-enabled` | `boolean\|string` | `true` | Enable zoom/pan interaction. |
| `data-rotation-enabled` | `boolean\|string` | `false` | Enable map rotation. |
| `data-wait-for-filters` | `string` | `"false"` | Defer data layer loads until filters ready. |

### Layer Config Shape

```typescript
interface LayerConfig {
  id: string;
  type: 'base' | 'data' | 'flow' | 'dataPoints';
  visible?: boolean;
  patternsVisible?: boolean;
  colorLayerVisible?: boolean;
  minLabelZoomVisible?: number;
  [key: string]: any; // layer-specific options
}
```

## 5. Acceptance Criteria

- **AC-001**: Given `data-layers` with one `base` and one `data` layer, when rendered, both `BaseLayer` and `DataLayer` components are mounted.
- **AC-002**: Given container width is zero on mount, when the `ResizeObserver` fires with a positive width, the map renders.
- **AC-003**: Given `data-zoom-enabled="false"`, when the user attempts to pinch/scroll, zoom does not change.
- **AC-004**: When a legend item is clicked, the corresponding layer's `visible` property toggles and the layer re-renders.
- **AC-005**: Given `data-wait-for-filters="true"` and uninitialised group, data layers make no network requests.
- **AC-006**: Given `data-projection="geoOrthographic"`, the D3 projection used is `geoOrthographic`.

## 6. Test Automation Strategy

- **Test Levels**: Unit (layer type dispatch, visibility toggle, resize observer behaviour).
- **Frameworks**: Vitest + `@testing-library/react`; mock `ResizeObserver` and D3.
- **CI/CD Integration**: `pnpm --filter @devgateway/dvz-ui-react test`.

## 7. Rationale & Context

A multi-layer map architecture allows a single embeddable to display complex geographic narratives (e.g., choropleth + flow lines + site points) without requiring multiple instances. `ResizeObserver` avoids the need to hardcode container widths, enabling fluid layouts.

## 8. Dependencies & External Integrations

### Technology Platform Dependencies
- **PLT-001**: `d3` — projections, zoom, path rendering.
- **PLT-002**: `topojson-client` — TopoJSON to GeoJSON conversion.
- **PLT-003**: Redux store — filter group state for `data-wait-for-filters`.

## 9. Examples & Edge Cases

```jsx
<div data-component="d3Map"
     data-height="500"
     data-projection="geoMercator"
     data-zoom-enabled="true"
     data-layers='[{"id":"base","type":"base","file":"/geo/world.json"},{"id":"data","type":"data","group":"map-dash"}]' />

// Edge: container renders placeholder until ResizeObserver fires
// Edge: malformed data-layers JSON → empty layers array, no error
```

## 10. Validation Criteria

- **VAL-001**: Map does not render until container width > 0.
- **VAL-002**: Each `layer.type` maps to the correct sub-component.
- **VAL-003**: Legend click toggles `layer.visible` and triggers re-render.

## 11. Related Specifications / Further Reading

- [D3 Geographic Projections](https://d3js.org/d3-geo/projection)
- [TopoJSON specification](https://github.com/topojson/topojson-specification)

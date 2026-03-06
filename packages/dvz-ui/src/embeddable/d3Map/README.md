> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# D3 Map (UI Component)

## Purpose
An interactive, fluid-width SVG map built with D3. Supports multiple composable layer types (base geographic boundaries, data-driven choropleth, flow arrows, and lat/long point clusters), zoom/pan controls, globe rotation, responsive resizing via `ResizeObserver`, and tooltip interactions.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-identifier` | `string \| number` | — | Unique map instance ID; used for postMessage coordination with the parent frame. |
| `data-group` | `string` | — | Filter group name for connecting to shared Redux filter state. |
| `data-layers` | `string` (JSON) | `'[]'` | URI-encoded JSON array of layer configuration objects. Each layer has a `type` (`base`, `data`, `flow`, `dataPoints`) plus type-specific settings. |
| `data-height` | `string \| number` | `400` | Map height in pixels. |
| `data-width` | `string \| number` | `1000` | Logical reference width for aspect-ratio calculations. |
| `data-back-ground-color` | `string` | `'#88e8dc'` | URI-encoded background hex/rgba colour of the map canvas. |
| `data-map-position` | `string` (JSON) | `'{}'` | Serialised `{k, x, y}` D3 zoom transform; sets the initial viewport. |
| `data-projection` | `string` | `'geoMercator'` | D3 geo-projection name. |
| `data-zoom-enabled` | `boolean \| string` | `true` | Show the zoom-in/out control widget. |
| `data-rotation-enabled` | `boolean \| string` | `false` | Enable globe-rotation drag on the SVG. |
| `data-wait-for-filters` | `boolean \| string` | `'false'` | Delay layer data fetching until filters are applied. |
| `editing` | `boolean` | `false` | Set to `true` in Gutenberg editor context. |
| `unique` | `string` | — | Per-instance key for namespacing Redux store slices. |

## Usage Example
The component is mounted by the embeddable runtime via a `data-component="newMap"` host element:

```html
<div
  data-component="newMap"
  data-identifier="83729102"
  data-height="500"
  data-projection="geoMercator"
  data-group="default"
  data-layers="[%7B%22type%22%3A%22base%22%2C...%7D]"
  data-back-ground-color="%23347ba2"
  data-zoom-enabled="true"
  data-rotation-enabled="false"
  data-wait-for-filters="false">
</div>
```

Or directly in JSX:

```jsx
import D3Map from '@devgateway/dvz-ui/embeddable/d3Map';

<D3Map
  data-identifier="1"
  data-height={500}
  data-projection="geoMercator"
  data-group="default"
  data-layers={JSON.stringify(layers)}
  unique="map-1"
/>
```

## Related
- WordPress Block: `d3Map` (`wp-react-blocks-plugin/blocks/d3Map`)

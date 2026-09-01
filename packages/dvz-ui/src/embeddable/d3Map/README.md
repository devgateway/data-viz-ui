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

## Tooltip templates & data variables
Each `data` and `dataPoints` layer's `tooltip` config is a template string that is rendered against the row currently being hovered. Every column present on the joined CSV row (or, in API mode, every measure/key on the matched dimension item) is available as a `{ColumnName}` variable — including column names containing spaces, e.g. `{GDP Growth}`.

Numeric and currency values can be formatted inline with these markers, wrapped around the variable's already-substituted value:
| Marker | Formats as | Example |
|---|---|---|
| `%(field)` | Percent | `%({value},2)` |
| `#(field)` | Decimal | `#({value},1)` |
| `#C(field)` | Compact notation | `#C({value},0)` |
| `$(codeOrName)` | Currency symbol lookup | `$(USD)` → `$`, `$(ZMW)` → `ZK` |

### Row-level color override
A `data` layer's choropleth/centroid/pattern fill is normally computed from the active break scale or gradient. A row can override its own computed color by including a column named `_Color_<measureName>` (matching the layer's active `measures[0]`), e.g. a column `_Color_gdp` with value `#ff0000` forces that row's shape/marker to render red regardless of which break or gradient bucket its value falls into.

### Extra tooltip columns (API mode)
In API mode, the stats endpoint only returns the field(s) implied by the layer's configured dimension(s)/measure(s) — it will not include an arbitrary extra column just because it exists in the dataset. A layer config's `extraTooltipColumns` field (an array of API field/column names, defaulting to `[]`) requests additional fields purely for tooltip display, without adding them as query dimensions: they're sent to the backend as `includeColumns=field1,field2` and, once returned, are available the same way as any other joined-row column, i.e. as `{ColumnName}`.

## Related
- WordPress Block: `d3Map` (`wp-react-blocks-plugin/blocks/d3Map`)

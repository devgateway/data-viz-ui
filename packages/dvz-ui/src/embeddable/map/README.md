> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Map (UI Embeddable Component)

## Purpose
A React embeddable that renders an interactive choropleth and/or symbol map using D3 and TopoJSON. It fetches geographic and data layers from an API or inline CSV, generates a colour legend with configurable breaks, and supports tooltips, zoom/pan, multi-measure selection, and multiple overlaid map layers.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-app` | `string` | `"csv"` | Data source identifier (`"csv"` or an API app slug). |
| `data-csv` | `string` | `""` | URL-encoded inline CSV data used when `data-app` is `"csv"`. |
| `data-dimension1` | `string` | `""` | Primary geographic field (matched against TopoJSON feature IDs). |
| `data-dimension2` | `string` | `""` | Secondary dimension field for disaggregated data. |
| `data-measures` | `string` | `'["prevalenceSmokeAny"]'` | URL-encoded JSON array of measure fields to visualise. |
| `data-filters` | `string` (JSON) | `"{}"` | URL-encoded JSON array/object of active filter values. |
| `data-height` | `string` | `"600"` | Map container height in pixels. |
| `data-map-file` | `string` | — | Path to the TopoJSON file relative to the UI app root. |
| `data-map-center` | `string` | `"NGA"` | Key identifying the initial map centre/scale (e.g. `"NGA"`, `"KEN"`, `"Africa"`, `"World"`). |
| `data-mapping-field` | `string` | `"zone"` | Field in the dataset matched to TopoJSON feature IDs. |
| `data-map-label-field` | `string` | `"admin"` | TopoJSON feature property used as the hover/label text. |
| `data-group` | `string` | `"default"` | Shared key linking this component to filter/measures components on the page. |
| `data-legend-title` | `string` | `"Tobacco Prevalence Rate"` | Title above the legend. |
| `data-legend-breaks` | `string` (JSON) | `"[]"` | URL-encoded JSON array of `{min, max, color, label, filters}` objects. |
| `data-show-legend-labels` | `string` | `"false"` | Set to `"true"` to show text labels next to legend swatches. |
| `data-show-no-data-legend-item` | `string` | `"false"` | Set to `"true"` to add a "No Data" legend entry. |
| `data-auto-generate-breaks` | `string` | `"false"` | Set to `"true"` to auto-calculate legend breaks from the data. |
| `data-number-of-breaks` | `string` | `"5"` | Number of breaks when auto-generating. |
| `data-scheme` | `string` | `"reds"` | Named d3/ColorBrewer colour scheme for auto-generated breaks. |
| `data-has-multiple-measures` | `string` | `"false"` | Set to `"true"` to show an in-map measure selector. |
| `data-measure-selector-label` | `string` | `""` | Label for the measure selector. |
| `data-zoom-enabled` | `string` | `"false"` | Set to `"true"` to enable zoom and pan. |
| `data-show-tooltip` | `string` | `"true"` | Set to `"false"` to disable hover tooltips. |
| `data-tooltip-theme` | `string` | `"map-tooltip-dark"` | CSS class applied to the tooltip element. |
| `data-tooltip-font-size` | `string` | `"14"` | Font size (px) for tooltip text. |
| `data-tooltip-format` | `string` | `"{locationName} %({value},2) \n {label}: %({value},2)"` | Template for tooltip content; supports `{locationName}`, `{value}`, `{label}`. |
| `data-custom-tooltips` | `string` (JSON) | `"[]"` | Per-measure custom tooltip template overrides. |
| `data-show-no-data-tooltip` | `string` | `"false"` | Set to `"true"` to show tooltips even for features with no data. |
| `data-show-overall-value` | `string` | `"false"` | Set to `"true"` to display a national/overall average annotation. |
| `data-national-average-label` | `string` | `"National Prevalence Avg"` | Label for the overall value annotation. |
| `data-data-source-label` | `string` | `"Source"` | Prefix label for the data credit. |
| `data-data-source-text` | `string` | `"NIDS"` | Data source credit text. |
| `data-label-font-size` | `string` | `"12"` | Font size (px) for admin unit labels. |
| `data-label-font-weight` | `string` | `"normal"` | Font weight for admin unit labels. |
| `data-label-font-color` | `string` | `"#595959"` (URL-encoded) | Colour for admin unit labels. |
| `data-legend-font-size` | `string` | `"12"` | Font size (px) for legend text. |
| `data-legend-font-weight` | `string` | `"normal"` | Font weight for legend text. |
| `data-show-admin-unit-label` | `string` | `"showAll"` | When to show admin labels: `"showAll"`, `"ifUnitHasData"`, or `"none"`. |
| `data-map-label-show-value` | `string` | `"false"` | Append the data value to each admin unit label. |
| `data-value-format` | `string` | `"%({value},2)"` | Value format template used in labels. |
| `data-format-style` | `string` | `"decimal"` | Number format style: `"decimal"`, `"percent"`, `"currency"`, `"compacted"`. |
| `data-decimals` | `string` | `"2"` | Decimal places for number formatting. |
| `data-currency` | `string` | `""` | Currency code used when `data-format-style` is `"currency"`. |
| `data-enabled-layers` | `string` (JSON) | — | URL-encoded JSON array of additional map layer definitions. |
| `data-main-layer-id` | `string` | `""` | ID of the primary data layer. |
| `data-map-symbols` | `string` (JSON) | `"[]"` | Symbol layer definitions for point/symbol overlays. |
| `data-map-no-data-color` | `string` | `"#f8f8f8"` | Fill colour for features with no data. |
| `data-map-boundary-color` | `string` | `"#000"` | Stroke colour for map boundaries. |
| `data-map-focus-boundary-color` | `string` | `"#000"` | Stroke colour for the focused boundary. |
| `data-highlighted-location` | `string` | `""` | Feature code to highlight on load. |
| `data-highlighted-loc-label-format` | `string` | `"{locationName} - Score: #({value},2)"` | Label format for the highlighted location. |
| `data-show-no-data-label` | `string` | `"false"` | Set to `"true"` to display a "No Data" label on empty features. |
| `data-map-container-bg-color` | `string` | `"#fff"` | Background colour of the map container element. |
| `data-map-position` | `string` (JSON) | `"{}"` | Override the initial map position/scale. |
| `data-map-type` | `string` | `"DEFAULT"` | Map rendering mode (e.g. `"DEFAULT"` choropleth, point-cluster). |
| `data-aggregation-formula` | `string` | `"COUNT"` | Aggregation function used for point-cluster maps. |
| `data-zoom-level-to-show-points` | `string` | `"2"` | Minimum zoom level at which point symbols are shown. |
| `data-zoom-on-filter` | `string` | `"false"` | Set to `"true"` to auto-zoom when a filter changes. |
| `data-zoom-on-filter-field` | `string` | `""` | Field used to determine the zoom target when `data-zoom-on-filter` is `"true"`. |
| `data-no-data-text` | `string` | `"No Data"` | Text displayed in tooltips/labels for missing data. |
| `data-labels-exclusion-list` | `string` | `""` | Comma-separated list of feature codes to exclude from label rendering. |
| `data-custom-measure-labels` | `string` (JSON) | `"{}"` | Map of measure IDs to custom display labels. |
| `data-show-shading-layer-labels` | `string` | `"ifUnitHasData"` | When to show shading layer labels: `"showAll"`, `"ifUnitHasData"`, or `"none"`. |
| `data-dvz-proxy-dataset-id` | `string` | — | Dataset ID for the DVZ proxy data source. |
| `data-point-label-color` | `string` | `"#fff"` | Colour for point/symbol labels. |
| `data-point-label-format` | `string` | `"{locationName} %({value},2)"` | Template for point labels. |
| `data-enable-summary-view` | `string` | `"false"` | Set to `"true"` to render a summary/sparkline view. |
| `editing` | `boolean` | `false` | Internal flag set to `true` inside the Gutenberg editor iframe. |
| `unique` | `string` | — | Unique instance identifier for Redux store scoping. |

## Usage Example

```html
<div
  class="viz-component"
  data-component="map"
  data-app="csv"
  data-csv="zone%2CValue%0Anorth%2C45%0Asouth%2C30"
  data-map-file="/maps/nigeria.json"
  data-map-center="NGA"
  data-dimension1="zone"
  data-measures="%5B%22Value%22%5D"
  data-height="500"
  data-legend-title="Regional Values"
  data-legend-breaks="%5B%7B%22min%22%3A0%2C%22max%22%3A40%2C%22color%22%3A%22%2366A3D9%22%7D%5D"
></div>
```

Or as a React component:

```jsx
import MapEmbeddable from '@devgateway/dvz-ui/embeddable/map';

<MapEmbeddable
  data-app="csv"
  data-csv="zone,Value\nnorth,45\nsouth,30"
  data-map-file="/maps/nigeria.json"
  data-map-center="NGA"
  data-dimension1="zone"
  data-measures='["Value"]'
  data-height="500"
  editing={false}
  unique="map-1"
/>
```

## Related
- WordPress Block: `dvz/map` (`data-viz-wordpress/.../blocks/map`)

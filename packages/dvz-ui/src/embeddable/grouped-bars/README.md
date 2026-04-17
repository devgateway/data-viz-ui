> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Grouped Bars (UI Embeddable Component)

## Purpose
A React embeddable that renders a horizontal grouped-bar chart from API or CSV data. It supports multiple measures, custom colours (including per-dimension/measure manual overrides), sorting, top-N filtering, and flexible label/value positioning.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-app` | `string` | `"csv"` | Data source identifier (`"csv"` or an API app slug). |
| `data-csv` | `string` | `""` | Inline CSV string used when `data-app` is `"csv"`. |
| `data-dimension1` | `string` | `"none"` | Primary dimension field used to label bars. |
| `data-measures` | `string` (JSON) | `"[]"` | URL-encoded JSON array of measure field names to render. |
| `data-filters` | `string` (JSON) | `"[]"` | URL-encoded JSON array of active filter objects (`{param, value}`). |
| `data-dvz-proxy-dataset-id` | `string` | `""` | Dataset ID for the DVZ proxy data source. |
| `data-format` | `string` (JSON) | `{"style":"decimal","minimumFractionDigits":0,"maximumFractionDigits":0,"currency":"USD"}` | `Intl.NumberFormat` options for formatting bar values. |
| `data-height` | `string` | `"120"` | Component height in pixels. |
| `data-group` | `string` | `"default"` | Shared key that links this component to filter/measures components on the page. |
| `data-text-color` | `string` | `"#5a5d68"` | Colour for dimension label text. |
| `data-measure-text-color` | `string` | `"#ffffff"` | Colour for value text rendered inside bars. |
| `data-font-size` | `string` | `"14"` | Font size (px) for labels. |
| `data-main-value-font-size` | `string` | `"24"` | Font size (px) for the highlighted measure value. |
| `data-default-bar-color` | `string` | `"#3182ce"` | Default fill colour for bars. |
| `data-bar-background-color` | `string` | `"#e0e0e0"` | Background track colour behind bars. |
| `data-label-position` | `string` | `"top"` | Position of dimension labels (`"top"` or `"left"`). |
| `data-label-width` | `string` | `"30"` | Percentage width allocated to labels when `data-label-position` is `"left"`. |
| `data-label-height` | `string` | `"32"` | Height in pixels of the label area. |
| `data-value-position` | `string` | `"top"` | Where to render the formatted value (`"top"` or `"bar"`). |
| `data-label-format` | `string` | `"{value}"` | Template string for labels; `{value}` is replaced with the dimension value. |
| `data-show-measure-labels` | `string` | `"false"` | Set to `"true"` to show measure name headings. |
| `data-sorting` | `string` | `"none"` | Sorting strategy: `"none"`, `"dimension"`, or `"measure"`. |
| `data-sort-direction` | `string` | `"asc"` | Sort direction: `"asc"` or `"desc"`. |
| `data-sort-measure` | `string` | `""` | Measure field to sort by when `data-sorting` is `"measure"`. |
| `data-top-n` | `string` | `""` | Limit displayed bars to the top N items after sorting. |
| `data-bar-size-criteria` | `string` | `"relative_max"` | Bar width calculation mode (`"relative_max"` or `"absolute"`). |
| `data-bar-size-use-group` | `string` | `"false"` | Set to `"true"` to make bar sizes relative within each measure group. |
| `data-enable-manual-colors` | `string` | `"false"` | Set to `"true"` to enable manual colour overrides. |
| `data-manual-colors` | `string` (JSON) | `"{}"` | URL-encoded JSON map of dimension/measure values to hex colour strings. |
| `data-manual-colors-mode` | `string` | `"dimension"` | Whether manual colours apply per `"dimension"` or `"measure"`. |
| `data-enable-custom-measure-formats` | `string` | `"false"` | Allow each measure to carry its own number format. |
| `data-main-measure` | `string` | `""` | Primary measure to highlight when multiple measures are present. |
| `data-wait-for-filters` | `string` | `"false"` | Delay rendering until a filter value is selected. |
| `data-no-data-text` | `string` | `"-"` | Text shown when a value is null or zero. |
| `data-show-zero-null-measures` | `string` | `"false"` | Set to `"true"` to render bars for zero/null values. |
| `editing` | `boolean` | `false` | Internal flag set to `true` in the Gutenberg editor iframe preview. |
| `unique` | `string` | — | Unique instance identifier used for Redux store scoping. |
| `parent` | `string` | — | Parent block identifier for cross-block communication. |

## Usage Example
Mount the component on any `div` using the standard embeddable bootstrap:

```html
<div
  class="viz-component"
  data-component="groupedBars"
  data-app="csv"
  data-csv="Country,Value%0AKenya,45%0ANigeria,30"
  data-dimension1="Country"
  data-measures="%5B%22Value%22%5D"
  data-height="300"
  data-default-bar-color="#3182ce"
  data-label-position="left"
></div>
```

Or import directly in a React application:

```jsx
import GroupedBars from '@devgateway/dvz-ui/embeddable/grouped-bars';

<GroupedBars
  data-app="csv"
  data-csv="Country,Value\nKenya,45\nNigeria,30"
  data-dimension1="Country"
  data-measures='["Value"]'
  data-height="300"
  editing={false}
  unique="my-chart"
/>
```

## Related
- WordPress Block: `dvz/groupedbars` (`data-viz-wordpress/.../blocks/grouped-bars`)

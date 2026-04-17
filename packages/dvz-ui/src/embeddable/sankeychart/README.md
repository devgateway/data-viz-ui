> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# SankeyChart (UI Embeddable Component)

## Purpose
Renders an interactive Sankey flow diagram using Nivo's `ResponsiveSankey`. Data is loaded via `DataProvider` from an API (multi-dimensional hierarchy) or an inline CSV string. Nodes are color-coded, filterable via a built-in legend, and support configurable tooltips.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-app` | string | — | Data source key. Use `"csv"` for inline CSV or an API application identifier. |
| `data-csv` | string | `""` | Inline CSV data (used when `data-app` is `"csv"`). First column = target, subsequent columns = sources. |
| `data-group` | string | — | Redux filter group key for coordinating shared filter state. |
| `data-height` | string \| number | — | Total component height in pixels. |
| `data-dimension1` | string | — | First hierarchy dimension (use `"none"` to skip). |
| `data-dimension2` | string | — | Second hierarchy dimension. |
| `data-dimension3` | string | — | Third hierarchy dimension. |
| `data-measures` | string | — | URL-encoded JSON array of measure keys. |
| `data-filters` | string | `"[]"` | URL-encoded JSON array of pre-applied filter objects `{ param, value }`. |
| `data-scheme` | string | `"nivo"` | Nivo color scheme. |
| `data-layout` | string | `"horizontal"` | `"horizontal"` or `"vertical"`. |
| `data-show-legends` | string \| boolean | — | `"true"` to render the legend. |
| `data-legend-label` | string | — | Legend section title. |
| `data-legend-position` | string | — | `"top"`, `"bottom"`, `"left"`, or `"right"`. |
| `data-margin-left` | string | — | Left chart margin in pixels. |
| `data-margin-top` | string | — | Top chart margin in pixels. |
| `data-margin-right` | string | — | Right chart margin in pixels. |
| `data-margin-bottom` | string | — | Bottom chart margin in pixels. |
| `data-tooltip-html` | string | — | URL-encoded HTML/Markdown tooltip template. |
| `data-tooltip-enabled` | string \| boolean | — | Enable the custom tooltip. |
| `data-tooltip-enable-markdown` | string \| boolean | — | Parse tooltip as Markdown. |
| `data-format` | string | — | URL-encoded JSON Intl.NumberFormat options object. |
| `data-node-thickness` | string | — | Node width in pixels. |
| `data-node-opacity` | string | — | Default node opacity (0–1). |
| `data-node-hover-opacity` | string | — | Hovered node opacity. |
| `data-node-hover-others-opacity` | string | — | Non-hovered node opacity during hover. |
| `data-node-inner-padding` | string | — | Padding inside nodes. |
| `data-node-spacing` | string | — | Vertical spacing between nodes. |
| `data-node-border-width` | string | — | Node border width. |
| `data-node-border-radius` | string | — | Node border radius. |
| `data-link-opacity` | string | — | Default link opacity. |
| `data-link-hover-opacity` | string | — | Link opacity on hover. |
| `data-link-hover-others-opacity` | string | — | Non-hovered link opacity during hover. |
| `data-link-contract` | string | — | Link contraction amount. |
| `data-enable-link-gradient` | string \| boolean | — | Render links with a gradient. |
| `data-enable-labels` | string \| boolean | — | Show node labels. |
| `data-label-position` | string | — | `"inside"` or `"outside"`. |
| `data-label-padding` | string | — | Label padding from node edge. |
| `data-label-orientation` | string | — | `"horizontal"` or `"vertical"`. |
| `data-use-custom-label-color` | string \| boolean | — | Use `data-label-text-color` for labels. |
| `data-label-text-color` | string | — | Custom label color (hex/rgba). |
| `data-reverse-legend` | string \| boolean | — | Reverse the legend item order. |
| `data-sort` | string | — | Node sort mode passed to Nivo. |
| `data-manual-colors` | string | `"{}"` | URL-encoded JSON map of app → color array overrides. |
| `data-source` | string | — | API source path override. |
| `data-no-data-message` | string | `"No data matches your selection"` | Message shown when the chart has no data. |
| `editing` | boolean | `false` | Skip URL-decoding of attribute values when `true` (editor preview). |

## Usage Example
The component is mounted automatically by the front-end bundle when it finds a `[data-component="sankeyChart"]` element, or it can be used directly in JSX:

```jsx
import SankeyChartEmbed from '@/embeddable/sankeychart';

<SankeyChartEmbed
  data-app="csv"
  data-csv="dimension,Source A,Source B\nTarget 1,40,20\nTarget 2,10,30"
  data-height="500"
  data-layout="horizontal"
  data-scheme="nivo"
  data-show-legends="true"
  data-legend-position="bottom"
  data-group="default"
  data-format="%7B%22style%22%3A%22decimal%22%7D"
  parent="page-1"
  unique="block-1"
/>
```

## Related
- WordPress Block: `sankey-chart` (`wp-react-blocks-plugin/blocks/sankey-chart`)

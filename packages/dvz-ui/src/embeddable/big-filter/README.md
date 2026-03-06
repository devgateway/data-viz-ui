> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# BigFilter Component

## Purpose
An embeddable React component that displays a grid of clickable big-number filter chips. Each chip shows a dimension value and its associated measure. Selecting a chip dispatches a Redux filter action that drives other connected chart and big-number components in the same filter group.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-app` | string | — | Data source / API identifier |
| `data-group` | string | — | Filter group key written to Redux on selection |
| `data-parent` | string | `""` | Parent block name; inherits filters from this ancestor group |
| `data-block-name` | string | — | Unique key for this block's own Redux filter slice |
| `data-dimension1` | string | `"none"` | Primary dimension used to generate chips |
| `data-dimension2` | string | `"none"` | Secondary dimension |
| `data-dvz-proxy-dataset-id` | string | — | Superset/proxy dataset ID |
| `data-height` | number | — | Container height in pixels |
| `data-measures` | string (JSON) | `"{}"` | Encoded measures configuration |
| `data-filters` | string (JSON) | `"[]"` | Pre-applied filter definitions |
| `data-csv` | string | `""` | Inline CSV data |
| `data-n-columns` | number | `4` | Number of columns in the chip grid |
| `data-number-font-size` | number | `20` | Font size (px) for the chip number |
| `data-label-font-size` | number | `20` | Font size (px) for the chip label |
| `data-number-color` | string | `"#000000"` | Number colour for selected chips |
| `data-label-color` | string | `"#000000"` | Label colour for selected chips |
| `data-background-color` | string | `"#ffffffff"` | Background colour for selected chips |
| `data-unselected-number-color` | string | `"#000000"` | Number colour for unselected chips |
| `data-unselected-label-color` | string | `"#000000"` | Label colour for unselected chips |
| `data-unselected-background-color` | string | `"#fdfdfdff"` | Background colour for unselected chips |
| `data-sort` | string | `"alpha"` | Sort mode: `"alpha"` or `"value"` |
| `data-order` | string | `"asc"` | Sort order: `"asc"` or `"desc"` |
| `data-wait-for-filters` | string | `"false"` | `"true"` to wait for upstream filters before fetching |
| `data-show-zero-values` | string | `"false"` | `"true"` to show chips with a zero count |
| `editing` | boolean | `false` | When `true`, disables filter dispatch (editor preview mode) |
| `intl` | object | — | `react-intl` intl object for number formatting |

## Usage Example
```jsx
import BigFilter from './embeddable/big-filter';

<BigFilter
  data-app="my-api"
  data-group="main-filters"
  data-block-name="region-filter"
  data-dimension1="region"
  data-height={200}
  data-measures={encodeURIComponent(JSON.stringify({ 'my-api': { format: { style: 'decimal' } } }))}
  data-n-columns={4}
  data-number-color="#aaaf23"
  data-label-color="#3a62f0"
  intl={intl}
/>
```

State management is handled via Redux; use `setFilter` / `unsetFilter` actions from `reducers/data` to programmatically interact with filter state.

## Related
- WordPress Block: `big-filter` (`data-viz-wordpress/…/blocks/big-filter`)

> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Data Label (UI Component)

## Purpose
Fetches data from an API or CSV source and renders a single, richly formatted numeric value. The aggregation strategy (first row, total, min, max, or average) and the `Intl.NumberFormat` options are fully configurable, making this component useful for KPI callouts and headline statistics inside a dashboard page.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-app` | `string` | — | Data source / API identifier (e.g. `"csv"` or a named API key). |
| `data-group` | `string` | — | Filter group name for connecting to shared Redux filter state. |
| `data-height` | `string \| number` | — | Component height in pixels. |
| `data-dimension1` | `string` | — | Primary dimension field; set to `'none'` to skip dimension filtering. |
| `data-measures` | `string` (URI-encoded JSON) | `'{}'` | JSON array of measure field names; the first element is used for display. |
| `data-format` | `string` (URI-encoded JSON) | `'{}'` | URI-encoded `Intl.NumberFormat`-compatible options. Supports an extra `"compacted"` style that maps to `notation: "compact"`. |
| `data-filters` | `string` (URI-encoded JSON) | `'[]'` | URI-encoded array of `{ param, value }` filter objects applied to the data request. |
| `data-value-type` | `string` | — | Aggregation: `first` (first child row), `total` (root total), `min`, `max`, or `avg` across child rows. |
| `data-no-data-message` | `string` | `"No data matches your selection"` | Message shown when no data is available. |
| `data-csv` | `string` | `""` | Path or URL to a CSV file (used when `data-app` is `"csv"`). |
| `editing` | `boolean` | `false` | Set to `true` in Gutenberg editor context to skip URI-decoding of attribute values. |
| `unique` | `string` | — | Per-instance key for namespacing the Redux data store. |

## Usage Example
Host element (rendered by the WP block):

```html
<div
  data-component="datalabel"
  data-app="myApi"
  data-group="default"
  data-height="40"
  data-dimension1="year"
  data-measures="%5B%22value%22%5D"
  data-format="%7B%22style%22%3A%22percent%22%2C%22minimumFractionDigits%22%3A1%7D"
  data-filters="%5B%5D"
  data-value-type="first">
</div>
```

Or in JSX:

```jsx
import DataLabel from '@devgateway/dvz-ui/embeddable/datalabel';

<DataLabel
  data-app="myApi"
  data-group="default"
  data-height={40}
  data-dimension1="year"
  data-measures={encodeURIComponent(JSON.stringify(['value']))}
  data-format={encodeURIComponent(JSON.stringify({ style: 'percent', minimumFractionDigits: 1 }))}
  data-filters={encodeURIComponent(JSON.stringify([]))}
  data-value-type="first"
  unique="kpi-1"
/>
```

## Related
- WordPress Block: `data-labels` (`wp-react-blocks-plugin/blocks/data-labels`)

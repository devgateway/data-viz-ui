> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# BigNumberTrend Component

## Purpose
An embeddable React component that displays a large KPI number and a period-over-period percentage change indicator (trend arrow). Delegates rendering to either the `Classic` or `Alternative` sub-component based on the `data-style-option` prop. Supports an optional tooltip with token-based text interpolation.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-style-option` | string | `"classic"` | Visual variant: `"classic"` or `"alternative"` |
| `data-app` | string | — | Data source / API identifier |
| `data-group` | string | — | Filter group key |
| `data-dimension1` | string | — | Time/period dimension field name |
| `data-dvz-proxy-dataset-id` | string | — | Superset/proxy dataset ID |
| `data-height` | number | — | Container height in pixels |
| `data-measures` | string (JSON, encoded) | `"{}"` | Measures configuration |
| `data-filters` | string (JSON, encoded) | `"[]"` | Pre-applied filter definitions |
| `data-format` | string (JSON, encoded) | `"{}"` | `Intl.NumberFormat` options |
| `data-csv` | string | `""` | Inline CSV (two or more rows: current + previous period) |
| `data-label` | string | `""` | Descriptive label shown below the number |
| `data-text-color` | string | `"#5a5d68"` | General text colour |
| `data-number-color` | string | `"#5a5d68"` | Colour of the main KPI number |
| `data-percent-color` | string | `"#5a5d68"` | Colour of the percentage change value |
| `data-back-ground-color` | string | `"none"` | Container background colour |
| `data-big-number-font-size` | number | `20` | Font size (px) for the main number |
| `data-label-font-size` | number | `20` | Font size (px) for the label |
| `data-percent-font-size` | number | `20` | Font size (px) for the percentage change |
| `data-show-percentage-change` | string | `"false"` | `"true"` to show the trend percentage |
| `data-wait-for-filters` | string | `"false"` | `"true"` to wait for upstream filter state before fetching |
| `data-no-data-text` | string | `"-"` | Text shown when no data is returned |
| `data-icon-image` | string | `""` | URL of a static icon (alternative layout) |
| `data-icon-up` | string | `""` | URL of the "trend up" icon |
| `data-icon-down` | string | `""` | URL of the "trend down" icon |
| `data-show-tooltip` | string | `"false"` | `"true"` to show an info tooltip |
| `data-tooltip-text` | string | `""` | Tooltip template; supports `{previous_year}` / `{current_year}` tokens |
| `data-tooltip-style` | string | `"light"` | Tooltip theme: `"light"` or `"dark"` |
| `editing` | boolean | `false` | Editor preview mode (skips URL-decoding) |
| `intl` | object | — | `react-intl` intl object |

## Usage Example
```jsx
import BigNumberTrend from './embeddable/big-number-trend';

<BigNumberTrend
  data-app="my-api"
  data-group="default"
  data-dimension1="year"
  data-height={150}
  data-measures={encodeURIComponent(JSON.stringify([{ field: 'total', label: 'Total' }]))}
  data-format={encodeURIComponent(JSON.stringify({ style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }))}
  data-label="Total Population"
  data-number-color="#1a1a2e"
  data-show-percentage-change="true"
  data-style-option="classic"
  intl={intl}
/>
```

## Related
- WordPress Block: `big-number-trend` (`data-viz-wordpress/…/blocks/big-number-trend`)

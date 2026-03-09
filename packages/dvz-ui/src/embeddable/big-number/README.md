> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# BigNumber Component

## Purpose
An embeddable React component that renders one or more large, animated numeric KPI values. Numbers count up from zero using `@react-spring/web` and are formatted with the browser's `Intl.NumberFormat`. Data is fetched from an API or parsed from inline CSV via a Redux `DataProvider`.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-app` | string | — | Data source / API identifier |
| `data-group` | string | — | Filter group; component re-fetches when this group's filters change |
| `data-dimension1` | string | `"none"` | Dimension used to split KPIs into rows |
| `data-dvz-proxy-dataset-id` | string | — | Superset/proxy dataset ID |
| `data-height` | number | — | Container height in pixels |
| `data-measures` | string (JSON, encoded) | `"{}"` | Measures configuration; keyed by app |
| `data-filters` | string (JSON, encoded) | `"[]"` | Pre-applied filter definitions |
| `data-csv` | string | `""` | Inline CSV data |
| `data-format` | string (JSON, encoded) | `"{}"` | `Intl.NumberFormat` options (fallback when measure has no format) |
| `data-number-font-size` | number | `20` | Font size (px) for the number value |
| `data-number-color` | string | `"#000000"` | Colour of the number value |
| `data-label-font-size` | number | `20` | Font size (px) for the measure label |
| `data-label-color` | string | `"#000000"` | Colour of the measure label |
| `data-label` | string | `""` | Static label text |
| `data-group-label` | string | `""` | Text displayed above the number group |
| `data-group-label-color` | string | `""` | Colour of the group label |
| `data-group-label-font-size` | string | `""` | Font size for the group label |
| `data-wait-for-filters` | string | `"false"` | `"true"` to wait for upstream filters before loading |
| `data-no-data-text` | string | `"-"` | Text shown when no data is available |
| `editing` | boolean | `false` | Editor preview mode (skips URL-decoding of attributes) |
| `intl` | object | — | `react-intl` intl object for number formatting |

## Usage Example
```jsx
import BigNumber from './embeddable/big-number';

<BigNumber
  data-app="my-api"
  data-group="default"
  data-height={120}
  data-measures={encodeURIComponent(JSON.stringify({
    'my-api': { 'total_population': { selected: true, customLabel: 'Total Population' } }
  }))}
  data-number-font-size={32}
  data-number-color="#1a1a2e"
  data-label-font-size={14}
  data-label-color="#5a5d68"
  data-no-data-text="N/A"
  intl={intl}
/>
```

## Related
- WordPress Block: `big-number` (`data-viz-wordpress/…/blocks/big-number`)

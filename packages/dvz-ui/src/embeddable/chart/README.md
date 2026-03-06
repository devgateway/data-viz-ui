> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Chart Component

## Purpose
An embeddable React component that renders interactive data visualisations (Bar, Line, Pie, Radar, Bump, Diverging, Sunburst) using the Nivo library. Data is fetched from an API or parsed from inline CSV. A Redux-backed `DataProvider` manages fetching, caching, and filter-reactive re-fetching. A `ColorProvider` handles categorical, sequential, manual, and system colour schemes.

## Props / Attributes

### Core
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-type` | string | `"bar"` | Chart type: `"bar"`, `"line"`, `"pie"`, `"radar"`, `"bump"`, `"diverging"`, `"sunburst"` |
| `data-app` | string | `"csv"` | Data source / API identifier |
| `data-group` | string | `"default"` | Filter group key |
| `data-height` | number | `500` | Container height in pixels |
| `data-dimension1` / `data-dimension2` / `data-dimension3` | string | — | Dimensions used to slice data |
| `data-dvz-proxy-dataset-id` | string | — | Superset/proxy dataset ID |
| `data-measures` | string (JSON, encoded) | `"{}"` | Measure definitions per app |
| `data-filters` | string (JSON, encoded) | `"[]"` | Pre-applied filter definitions |
| `data-format` | string (JSON, encoded) | `"{}"` | `Intl.NumberFormat` options |
| `data-csv` | string | `""` | Inline CSV data |
| `data-wait-for-filters` | string | `"false"` | `"true"` to wait for upstream filters before fetching |
| `data-no-data-message` | string | `"No data matches your selection"` | Message shown when the query returns no results |

### Layout & Legends
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-left-legend` | string | `"Left Legend"` | Y-axis label |
| `data-bottom-legend` | string | `"Bottom Legend"` | X-axis label |
| `data-legend-position` | string | `"right"` | Legend placement |
| `data-show-legends` | string | `"true"` | `"false"` to hide legend |
| `data-show-legends-in-columns` | string | `"false"` | `"true"` to render legend in a column grid |
| `data-number-of-legend-columns` | number | `4` | Column count for column-mode legends |
| `data-legend-label` | string | `""` | Legend section header text |
| `data-margin-left/top/right/bottom` | number | `50/25/25/25` | Chart margin in pixels |

### Bar
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-group-mode` | string | `"grouped"` | `"grouped"` or `"stacked"` |
| `data-layout` | string | `"vertical"` | `"vertical"` or `"horizontal"` |
| `data-bar-padding` | number | `0.15` | Outer padding ratio between bar groups |
| `data-bar-inner-padding` | number | `0.7` | Inner padding ratio between bars in a group |
| `data-bar-label-position` | string | `"middle"` | `"middle"`, `"top"`, or `"none"` |
| `data-bar-label-color` | string | `"#000"` | Bar label text colour |
| `data-show-group-total` | string | `"true"` | Show group total annotations |
| `data-group-total-measure` | string | `""` | Measure field for group totals |

### Line
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-line-label-position` | string | `"none"` | End-of-line label position |
| `data-line-curve` | string | `"linear"` | Nivo curve interpolation type |
| `data-enable-area` | string | `"false"` | `"true"` to fill area under line |
| `data-show-points` | string | `"true"` | `"false"` to hide data-point dots |
| `data-line-x-axis-tick-mode` | string | `"none"` | X-axis tick mode for line charts |
| `data-confidence-intervals` | string (JSON) | `"[]"` | Confidence interval band definitions |

### Pie / Donut
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-start-angle` / `data-end-angle` | number | `0` / `360` | Pie arc angles |
| `data-show-arc-labels` | string | `"true"` | Show labels on arc slices |
| `data-show-arc-link-labels` | string | `"true"` | Show link labels outside arcs |
| `data-center-label` | string | `""` | Text at the donut centre |
| `data-slice-padding` | number | `1` | Padding between pie slices |

### Radar
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-radar-curve` | string | `"linearClosed"` | Radar polygon curve |
| `data-radar-fill-opacity` | number | `0.25` | Radar area fill opacity |
| `data-radar-grid-levels` | number | `3` | Concentric grid ring count |
| `data-radar-grid-shape` | string | `"circular"` | `"circular"` or `"linear"` |
| `data-radar-enable-dots` | string | `"true"` | Show data-point dots |
| `data-radar-dot-size` | number | `8` | Dot diameter in pixels |

### Colours & Style
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-scheme` | string | `"system"` | Colour scheme: `"system"`, `"categorical"`, `"sequential"`, `"manual"` |
| `data-color-by` | string | `"index"` | Colour assignment: `"index"` or `"id"` |
| `data-manual-colors` | string (JSON) | `"{}"` | Per-series manual colour map |
| `data-tick-color` | string | `"rgb(92,93,99)"` | Axis tick label colour |

### Mobile & View Modes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-mobile-customization` | string (JSON, encoded) | `"{}"` | Mobile-specific overrides applied when viewport ≤ 1250 px |
| `data-preview-mode` | string | `"Desktop"` | Editor preview size: `"Desktop"` or `"Mobile"` |
| `data-dualmode` | string | — | Enable info/chart toggle view |
| `data-toggle-info-label` | string | `"Info Graphic"` | Label for info mode toggle |
| `data-toggle-chart-label` | string | `"Chart"` | Label for chart mode toggle |
| `editing` | boolean | `false` | Editor preview mode; skips URL-decoding |

## Usage Example
```jsx
import Chart from './embeddable/chart';

<Chart
  data-app="my-api"
  data-group="default"
  data-type="bar"
  data-height={400}
  data-dimension1="region"
  data-measures={encodeURIComponent(JSON.stringify({ 'my-api': { total: { selected: true } } }))}
  data-format={encodeURIComponent(JSON.stringify({ style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }))}
  data-left-legend="Population"
  data-bottom-legend="Region"
  data-show-legends="true"
  data-scheme="system"
  intl={intl}
/>
```

## Related
- WordPress Block: `charts` (`data-viz-wordpress/…/blocks/charts`)

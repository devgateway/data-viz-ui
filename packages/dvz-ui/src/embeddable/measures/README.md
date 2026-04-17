> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Measures (UI Embeddable Component)

## Purpose
A React embeddable that renders a group of radio buttons enabling users to switch between pre-configured measure groups (indicators/metrics). On selection it dispatches a Redux action (`setMeasures`) so that chart components sharing the same `data-group` key update their displayed data automatically.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-app` | `string` | — | Data source identifier that scopes the measure groups (matches the `app` attribute of paired chart blocks). |
| `data-group` | `string` | — | Shared key linking this component to chart components that respond to measure changes. **Required.** |
| `data-label` | `string` | — | Optional heading displayed above the radio group. |
| `data-measures-groups` | `string` (JSON) | — | URL-encoded JSON object of shape `{ [app]: MeasureGroup[] }`. Each `MeasureGroup` contains `label`, `measures`, `format`, `defaultSelected`, `leftTitle`, `rightTitle`, `customTooltip`. |
| `editing` | `boolean` | `false` | Internal flag set to `true` inside the Gutenberg editor iframe. |
| `parent` | `string` | — | Parent block identifier for store scoping. |
| `unique` | `string` | — | Unique instance key. |

### `MeasureGroup` object shape (inside `data-measures-groups`)
| Field | Type | Description |
|-------|------|-------------|
| `idx` | `number` | Index used as the radio button key and Redux identifier. |
| `label` | `string` | Display text for the radio option. |
| `measures` | `object` | Map of measure field names to `{ selected: boolean }`. |
| `format` | `object` | `Intl.NumberFormat` options for chart values when this group is selected. |
| `defaultSelected` | `boolean` | Auto-select this group on mount. |
| `leftTitle` | `string` | Y-axis left title forwarded to linked chart components. |
| `rightTitle` | `string` | Y-axis right title forwarded to linked chart components. |
| `customTooltip` | `string` | Tooltip template override forwarded to linked charts. |

## Usage Example

```html
<div
  class="viz-component"
  data-component="measures"
  data-app="csv"
  data-label="Select Indicator"
  data-group="my-chart-group"
  data-measures-groups="%7B%22csv%22%3A%5B%7B%22idx%22%3A0%2C%22label%22%3A%22GDP%22%2C%22measures%22%3A%7B%22gdp%22%3A%7B%22selected%22%3Atrue%7D%7D%2C%22defaultSelected%22%3Atrue%7D%5D%7D"
></div>
```

Or as a React component:

```tsx
import Measures from '@devgateway/dvz-ui/embeddable/measures';

<Measures
  data-app="csv"
  data-group="my-chart-group"
  data-label="Select Indicator"
  data-measures-groups={JSON.stringify({
    csv: [
      { idx: 0, label: 'GDP', measures: { gdp: { selected: true } }, defaultSelected: true },
      { idx: 1, label: 'Inflation', measures: { inflation: { selected: true } } }
    ]
  })}
  editing={false}
  unique="measures-1"
/>
```

## Related
- WordPress Block: `dvz/measures` (`data-viz-wordpress/.../blocks/measures`)

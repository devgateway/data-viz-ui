> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Filter (UI Embeddable)

## Purpose
Renders an interactive data-filter widget (checkbox list, single-select dropdown, or range selector) that writes its selected values to a shared Redux store, allowing connected chart components in the same `group` to reactively re-fetch and re-render their data.

## Props / Attributes
All props are received as `data-*` HTML attributes plus a few runtime props.

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `app` | `string` | — | Data source type (`"csv"` or Superset API slug). Used to scope Redux state. |
| `group` | `string` | — | Filter group; all components sharing this group react to filter changes. |
| `param` | `string` | — | Redux / URL parameter key this filter writes to. |
| `placeholder` | `string` | `""` | Placeholder text when nothing is selected. |
| `options` | `array` | — | Pre-computed option list `[{ key, value, text, icon, position }]` (populated from API by `CategoriesProvider`). |
| `filterType` | `string` | `"multi-select"` | `"multi-select"` or `"single-select"`. |
| `isRange` | `boolean` | `false` | Render as a start/end range picker instead of a checkbox list. |
| `allLabel` | `string` | — | "Select All" button label. |
| `noneLabel` | `string` | — | "Select None" button label. |
| `startLabel` | `string` | — | Start label for range mode. |
| `endLabel` | `string` | — | End label for range mode. |
| `useSingleColumn` | `boolean` | `false` | Render options in one column. |
| `enableTextSearch` | `boolean` | `false` | Show a search input above the options list. |
| `showNoDataOption` | `boolean` | `true` | Include a "No Data" option. |
| `defaultValues` | `string` | `""` | Comma-separated pre-selected values. |
| `defaultValueCriteria` | `string` | `"DEFAULT_VALUE_INPUT"` | Strategy for defaults: `DEFAULT_VALUE_INPUT`, `LOWEST_VALUE`, `HIGHEST_VALUE`, or `NO_DATA`. |
| `hiddenFilters` | `array` | `[]` | Silently applied filter values (not shown to users). |
| `allNoneSameBehaviour` | `boolean` | `false` | Treat "All" and "None" the same way. |
| `alphabeticalSort` | `boolean` | `true` | Sort options alphabetically. |
| `ascOrder` | `boolean` | `true` | Ascending sort order. |
| `closeOnSelect` | `boolean` | `false` | Close dropdown immediately after selection. |
| `autoApply` | `boolean` | `true` | Apply on every selection change (no confirm step). |
| `childFilter` | `string` | `""` | ID of a dependent child filter to reset on change. |
| `childFilterParam` | `string` | `""` | Param of the dependent child filter. |
| `dvzProxyDatasetId` | `string` | — | Superset proxy dataset ID for scoped category loading. |
| `defaultTopNEnabled` | `boolean` | — | Pre-select top N values on mount. |
| `defaultTopNCount` | `number` | — | How many top values to pre-select. |
| `current` | `any[]` | — | Currently selected values (injected from Redux state). |
| `onChange` | `function` | — | Redux action to update the filter value (`setFilter`). |
| `onInit` | `function` | — | Redux action to initialise filter defaults (`setInitialFilters`). |

### Option sorting
Options are sorted alphabetically (when `alphabeticalSort` is `true`) or by their `position` field (API ordering), in ascending or descending order based on `ascOrder`.

## Usage Example

```html
<span
  class="viz-component"
  data-component="filter"
  data-app="superset"
  data-group="dashboard-1"
  data-param="country_id"
  data-filter-type="multi-select"
  data-all-label="Select All"
  data-none-label="Select None"
  data-enable-text-search="true"
  data-alphabetical-sort="true"
  data-asc-order="true"
  data-auto-apply="true"
></span>
```

Or via the React embeddable entry point:
```jsx
import Filter from 'dvz-ui/embeddable/filter';

<Filter
  app="superset"
  group="dashboard-1"
  param="country_id"
  filterType="multi-select"
  allLabel="Select All"
  noneLabel="Select None"
  enableTextSearch={true}
  alphabeticalSort={true}
  autoApply={true}
/>
```

## Related
- WordPress Block: `filter` (`data-viz-wordpress/…/blocks/filter/`)

> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Filter Reset Button (UI Component)

## Purpose
A Redux-connected reset button that becomes active when the applied filters differ from their initial (default) values. Clicking it dispatches both `cleanFilter` and `applyFilter` for the specified app/group, restoring all connected visualisations to their default data view in a single action.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-group` | `string` | — | Filter group name. Must match the group used by filter dropdowns and charts on the same page. |
| `data-app` | `string` | `"csv"` | Data source / API identifier that scopes the filter state. |
| `data-reset-label` | `string` | `"Reset All Filters"` | Text shown inside the button. |

> **State-driven props (injected by Redux)**
>
> | Name | Source | Description |
> |------|--------|-------------|
> | `appliedFilters` | `state.data.filters[app][group]` | Currently applied filter values. |
> | `initialFilters` | `state.data.filters.initial[app][group]` | Default filter values set on page load. |

The `enabled` flag is derived via `useMemo`: the button is active only when `appliedFilters` meaningfully differs from `initialFilters` (ignoring `Number.MIN_SAFE_INTEGER` sentinel values).

## Usage Example
Host element (rendered by the WP block):

```html
<div
  data-component="dataFiltersReset"
  data-group="default"
  data-app="csv"
  data-reset-label="Reset All Filters">
</div>
```

Or in JSX:

```jsx
import FilterResetButton from '@devgateway/dvz-ui/embeddable/filter-reset-button';

<FilterResetButton
  data-group="default"
  data-app="csv"
  data-reset-label="Clear Filters"
/>
```

The button renders with CSS class `disabled` when filters are already at their default values.

## Related
- WordPress Block: `data-filters-reset` (`wp-react-blocks-plugin/blocks/data-filters-reset`)

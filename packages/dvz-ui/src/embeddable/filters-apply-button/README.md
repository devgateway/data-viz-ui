> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Filters Apply Button (UI Component)

## Purpose
A Redux-connected button that becomes active when the user has made filter changes that have not yet been applied. Clicking it dispatches the `applyFilter` action for the specified app/group, causing connected data visualisations to reload with the new filter selection.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-group` | `string` | — | Filter group name. Must match the group used by filter dropdowns and charts on the same page. |
| `data-app` | `string` | `"csv"` | Data source / API identifier that scopes the filter state. |
| `data-label` | `string` | `"Apply"` | Text shown inside the button. |
| `editing` | `boolean` | `false` | When `true` applies editor-mode styling. |

> **State-driven props (injected by Redux)**
>
> | Name | Source | Description |
> |------|--------|-------------|
> | `filters` | `state.data.filters[app][group]` | Current (pending) filter selections. |
> | `initialFilters` | `state.data.filters.initial[app][group]` | Baseline filters on page load; used to determine if anything changed. |
> | `apply` | `state.data.filters-settings[app][group].apply` | Timestamp/token of the last applied action; resets the enabled state. |

## Usage Example
Host element (rendered by the WP block):

```html
<div
  data-component="dataFiltersApply"
  data-group="default"
  data-app="csv"
  data-label="Apply Filters">
</div>
```

Or in JSX:

```jsx
import FiltersApplyButton from '@devgateway/dvz-ui/embeddable/filters-apply-button';

<FiltersApplyButton
  data-group="default"
  data-app="csv"
  data-label="Apply Filters"
/>
```

The button renders as disabled (CSS class `disabled`) until pending filter changes are detected.

## Related
- WordPress Block: `data-filters-apply` (`wp-react-blocks-plugin/blocks/data-filters-apply`)

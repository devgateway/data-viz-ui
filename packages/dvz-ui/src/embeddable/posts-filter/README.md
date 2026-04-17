> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# PostsFilter (UI Embeddable Component)

## Purpose
A Redux-connected dropdown filter component that dispatches `SET_POSTS_FILTER` actions to narrow a post list by taxonomy, category, year, or country. Supports both single-select and multi-select modes and delegates to `CategoricalFilter` or `YearFilter` sub-components depending on configuration.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-group` | string | — | **Required.** Links this filter to posts, pagination, and reset-button blocks sharing the same group name. |
| `data-filter-type` | string | — | `"single-select"` or `"multi-select"`. |
| `data-taxonomy` | string | — | Taxonomy slug to load filter options from. |
| `data-categories` | string | `"[]"` | JSON array (or comma-separated string) of category IDs to restrict options. |
| `data-type` | string | — | Post type to query. |
| `data-is-country-filter` | boolean \| string | — | Render as a country filter. Mutually exclusive with `data-is-year-filter`. |
| `data-is-year-filter` | boolean \| string | — | Render as a year-range filter. Mutually exclusive with `data-is-country-filter`. |
| `data-selected-year` | number \| string | — | Pre-selected year (used with `data-is-year-filter`). |
| `data-placeholder` | string | — | Placeholder text shown when nothing is selected. |
| `data-all-label` | string | — | Label for the "all" option. |
| `data-none-label` | string | — | Label for the "none" option. |
| `data-alphabetical-sort` | boolean \| string | — | Sort options alphabetically. |
| `data-asc-order` | boolean \| string | — | Sort options in ascending order. |
| `data-use-single-column` | boolean \| string | — | Render dropdown items in a single column. |
| `data-enable-text-search` | boolean \| string | — | Show a search box inside the dropdown. |
| `data-show-no-data-option` | boolean \| string | — | Include a "No Data" option when available. |
| `data-close-on-select` | boolean \| string | — | Close dropdown after each selection (multi-select). |
| `data-all-none-same-behaviour` | boolean \| string | — | Make "All" and "None" behave identically (multi-select). |
| `data-auto-apply` | boolean \| string | — | Apply filter changes immediately. |
| `data-sort-first-by` | string | — | Field to sort options by first. |
| `data-default-values` | string | `"[]"` | JSON-encoded array of pre-selected values. |
| `editing` | boolean | `false` | Skip URL-decoding of encoded attribute values when `true`. |

## Usage Example
The component is mounted automatically by the front-end bundle when it finds a `[data-component="postsFilter"]` element, or it can be used directly in TSX:

```tsx
import PostsFilter from '@/embeddable/posts-filter';

<PostsFilter
  data-group="news"
  data-filter-type="multi-select"
  data-taxonomy="category"
  data-categories="[]"
  data-placeholder="All Categories"
  data-all-label="Select All"
  data-none-label="Select None"
  data-alphabetical-sort="true"
  data-asc-order="true"
  data-auto-apply="true"
/>
```

## Related
- WordPress Block: `posts-filter` (`wp-react-blocks-plugin/blocks/posts-filter`)

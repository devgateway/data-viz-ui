> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Filtered Posts (UI Embeddable)

## Purpose
Renders a responsive grid of WordPress posts fetched from the REST API, with support for taxonomy filtering (year, country, category), pagination, and sort-first ordering. The component subscribes to a shared Redux filter store so that sibling `filter` components on the same page can dynamically narrow the post list.

## Props / Attributes
All props are received as `data-*` HTML attributes (plus `WrappedComponentProps` from `react-intl`).

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-group` | `string` | — | Redux store key; filter blocks with the same group control this component. |
| `data-number-of-columns` | `number\|string` | — | Number of grid columns. |
| `data-type` | `string` | — | WordPress post type to query (e.g. `"posts"`, `"resource"`). |
| `data-taxonomy` | `string` | — | Taxonomy slug used as the category filter taxonomy. |
| `data-categories` | `string` (JSON) | — | URL-encoded JSON array (or comma-separated string) of default term IDs. |
| `data-height` | `number\|string` | — | Container height hint (not applied directly to layout). |
| `data-post-width` | `number\|string` | — | Width (px) of each post card. |
| `data-post-height` | `number\|string` | — | Height (px) of each post card. |
| `data-number-of-items-per-page` | `number\|string` | `10` | Posts per API request / page. |
| `data-enable-sorting` | `string\|boolean` | — | `"true"` to enable sort-first ordering. |
| `data-sort-first-by` | `number\|string` | — | Term ID of the category whose posts are pinned to the top. |
| `data-sorting-taxonomy` | `string` | — | Taxonomy used for the sort-first behaviour. |
| `editing` | `boolean` | `false` | Set by the runtime when rendered inside the block editor. |

### Redux filter state
The component reads from `state.data.posts[group]` and reacts to changes in:
- `yearFilter` – date range (year → ISO date range via `getStartDateAndEndDateFromYear`)
- `categoryFilter` / `categoryTaxonomy` – category term IDs
- `countryFilter` / `countryTaxonomy` – country term IDs
- `page` / `itemsPerPage` – pagination
- When a filter is explicitly set to `Number.MIN_SAFE_INTEGER`, the component returns an empty set.

### Pagination
Dispatches `SET_POSTS_PAGINATION` with `totalPages` and `totalItems` from the API `x-wp-totalpages` / `x-wp-total` response headers.

### No-data state
When no posts match or loading fails, a `NoData` component is shown with a "Clear Filter" button that resets the group's filter state.

## Usage Example

```html
<div
  class="viz-component"
  data-component="filteredPosts"
  data-group="resources"
  data-type="resource"
  data-taxonomy="resource_type"
  data-categories="%5B12%2C15%5D"
  data-number-of-columns="3"
  data-post-width="420"
  data-post-height="240"
  data-number-of-items-per-page="9"
  data-enable-sorting="false"
  data-sort-first-by="none"
></div>
```

Or via the React embeddable entry point:
```tsx
import FilteredPosts from 'dvz-ui/embeddable/filtered-posts';

<FilteredPosts
  data-group="resources"
  data-type="resource"
  data-taxonomy="resource_type"
  data-categories={encodeURIComponent(JSON.stringify([12, 15]))}
  data-number-of-columns={3}
  data-post-width={420}
  data-post-height={240}
  data-number-of-items-per-page={9}
  data-enable-sorting="false"
  data-sort-first-by="none"
  intl={intl}
/>
```

## Related
- WordPress Block: `filtered-posts` (`data-viz-wordpress/…/blocks/filtered-posts/`)

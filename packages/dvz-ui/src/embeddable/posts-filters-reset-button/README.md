> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# PostsFiltersResetButton (UI Embeddable Component)

## Purpose
A Redux-connected button that resets all post filters in a named group back to their initial values. The button is automatically disabled (and visually dimmed) when no filters have been changed from their defaults.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-group` | string | — | The filter group name to reset. Must match the `data-group` on the associated `PostsFilter` components. |
| `data-reset-label` | string | `"Reset All Filters"` | Label text rendered inside the button. |

## Usage Example
The component is mounted automatically by the front-end bundle when it finds a `[data-component="postsFiltersReset"]` element, or it can be used directly in TSX:

```tsx
import PostsFiltersResetButton from '@/embeddable/posts-filters-reset-button';

<PostsFiltersResetButton
  data-group="news"
  data-reset-label="Clear all filters"
/>
```

The button reads `state.data.posts[group]` and `state.data.posts.initialFilters[group]` from the Redux store. When the two are identical the button is rendered as disabled. Clicking dispatches `SET_INITIAL_POSTS_FILTER` to restore the initial state.

## Related
- WordPress Block: `post-filters-reset-button` (`wp-react-blocks-plugin/blocks/post-filters-reset-button`)

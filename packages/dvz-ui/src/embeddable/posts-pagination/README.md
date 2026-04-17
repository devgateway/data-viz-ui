> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# PostsPagination (UI Embeddable Component)

## Purpose
A Redux-connected pagination component that renders previous/next arrow buttons and a page-number dropdown for navigating paginated post listings. It reads total page count from the Redux store and dispatches `SET_POSTS_FILTER` to update the active page.

Automatically respects the current language/locale from `react-intl`.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-group` | string | — | **Required.** Identifies which post filter group this pagination control belongs to. Must match the `data-group` on associated `PostsFilter` and carousel blocks. |
| `data-number-of-items-per-page` | number | — | Number of posts per page; informs the data layer how many items to fetch per request. |

## Usage Example
The component is mounted automatically by the front-end bundle when it finds a `[data-component="postsPagination"]` element, or it can be used directly in TSX:

```tsx
import PostsPagination from '@/embeddable/posts-pagination';

<PostsPagination
  data-group="news"
  data-number-of-items-per-page={10}
/>
```

The component reads `state.data.postsPagination[group].totalPages` to build the page selector and `state.data.posts[group].page` to track the current page.

## Related
- WordPress Block: `posts-pagination` (`wp-react-blocks-plugin/blocks/posts-pagination`)

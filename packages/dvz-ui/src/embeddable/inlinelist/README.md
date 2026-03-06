> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Inline List (UI Embeddable Component)

## Purpose
A React embeddable that fetches and renders a paginated list of WordPress posts, optionally displaying post icons and an in-page expandable content toggle (read more / read less). It integrates with the `@devgateway/wp-react-lib` `PostProvider` to load posts from the WP REST API.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-type` | `string` | `"posts"` | WordPress post type to query. |
| `data-taxonomy` | `string` | — | Taxonomy slug used to filter posts. |
| `data-categories` | `string` | — | Comma-separated list of term IDs/slugs to filter by. |
| `data-items` | `string` | — | Maximum number of posts to fetch and display. |
| `data-height` | `string` | — | Container height (informational; layout is controlled by the host page). |
| `data-width` | `string` | — | Container width (informational). |
| `data-color` | `string` | — | Comma-separated hex colour values passed to the component palette. |
| `data-show-post-icons` | `string` | `"false"` | Set to `"true"` to display the post icon image (requires `icon` custom meta field). |
| `data-show-content-toggle` | `string` | `"false"` | Set to `"true"` to show an inline "Read More / Read Less" toggle instead of a link. |
| `data-content-toggle-h-position` | `string` | `"50"` | Horizontal alignment (0–100 %) of the toggle link: `<33` = left, `33–66` = centre, `>66` = right. |
| `data-read-more-label` | `string` | `"Read More"` | Custom label for the expand action. |
| `data-read-less-label` | `string` | `"Read less"` | Custom label for the collapse action. |
| `editing` | `boolean` | `false` | Internal flag set to `true` when rendered inside the Gutenberg editor iframe. |
| `parent` | `string` | — | Parent block identifier used for Redux store scoping. |
| `unique` | `string` | — | Unique instance key for the Redux post store (`"inline_list_{parent}_{unique}"`). |

## Usage Example
Mount the component via the standard embeddable `div`:

```html
<div
  class="viz-component"
  data-component="inlineList"
  data-type="posts"
  data-taxonomy="category"
  data-categories="5,12"
  data-items="6"
  data-show-post-icons="true"
  data-show-content-toggle="true"
  data-content-toggle-h-position="50"
  data-read-more-label="Expand"
  data-read-less-label="Collapse"
></div>
```

Or import directly in a React application:

```tsx
import InlineList from '@devgateway/dvz-ui/embeddable/inlinelist';

<InlineList
  data-type="posts"
  data-items="6"
  data-show-post-icons="true"
  data-show-content-toggle="true"
  editing={false}
  unique="list-1"
/>
```

## Related
- WordPress Block: `dvz/inline-list` (`data-viz-wordpress/.../blocks/inline-list`)

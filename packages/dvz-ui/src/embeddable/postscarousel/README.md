> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# PostCarousel (UI Embeddable Component)

## Purpose
Renders a paginated, auto-playing carousel of WordPress posts using `pure-react-carousel` and the `PostProvider`/`PostConsumer` pattern. Posts are fetched by type, taxonomy, and category and displayed as slides with dot navigation.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-type` | string | — | Post type to query (e.g. `"posts"`). |
| `data-taxonomy` | string | — | Taxonomy slug used to filter posts. |
| `data-categories` | string | — | Comma-separated category IDs/slugs to filter by. |
| `data-items` | string | — | Number of posts (slides) to display. |
| `data-height` | string | — | Height of the carousel container in pixels. |
| `data-auto-switch` | string | `"false"` | `"true"` to automatically advance slides. |
| `data-interval` | string \| number | `10000` | Milliseconds between auto-advances (used when `data-auto-switch` is `"true"`). |
| `editing` | string | — | Pass `"true"` when rendered inside the block editor preview. |
| `parent` | string | — | Unique parent identifier used to namespace the Redux store key. |
| `unique` | string | — | Unique block identifier used alongside `parent` to namespace the Redux store key. |

## Usage Example
The component is mounted automatically by the front-end bundle when it finds a `[data-component="postsCarousel"]` element, or it can be used directly in TSX:

```tsx
import PostCarousel from '@/embeddable/postscarousel';

<PostCarousel
  data-type="posts"
  data-taxonomy="category"
  data-categories="3,7"
  data-items="5"
  data-height="400"
  data-auto-switch="true"
  data-interval="6000"
  parent="page-1"
  unique="block-1"
/>
```

## Related
- WordPress Block: `post-carousel` (`wp-react-blocks-plugin/blocks/post-carousel`)

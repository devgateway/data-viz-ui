> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# New Time Line (UI Embeddable)

## Purpose
An embeddable React component that combines a post carousel (using `pure-react-carousel`) with an interactive D3-powered horizontal timeline. Clicking a timeline node navigates the carousel to the corresponding post.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-type` | string | — | WordPress post type to query |
| `data-taxonomy` | string | — | Taxonomy slug for filtering |
| `data-categories` | string (JSON-encoded array) | — | JSON-encoded array of category IDs |
| `data-count` | string/number | — | Number of posts to fetch |
| `data-height` | string/number | — | Total component height in pixels |
| `data-line-color` | string | `"#000"` | Color of the horizontal timeline line |
| `data-config` | string (JSON) | `"{}"` | URL-encoded JSON config per post (circleColor, titleColor, offset, speed, etc.) |
| `data-position` | string | `"middle"` | Vertical position of timeline: `"top"`, `"middle"`, `"bottom"` |
| `data-line-width` | string/number | `"1"` | Stroke width of the timeline line |
| `data-margin-left` | number | `50` | Left margin in pixels |
| `data-margin-top` | number | `25` | Top margin in pixels |
| `data-margin-right` | number | `50` | Right margin in pixels |
| `data-margin-bottom` | number | `25` | Bottom margin in pixels |
| `data-font-size` | number | `14` | Base font size for labels |
| `data-title-width` | number | `100` | Width for post title labels (px) |
| `data-subtitle-width` | number | `50` | Width for post subtitle labels (px) |
| `editing` | boolean | — | When `true`, disables URL decoding of encoded props |
| `parent` | string/number | — | WordPress parent post/page ID for namespacing the Redux store |
| `unique` | string | — | Unique suffix for the Redux store key |

## Usage Example
```html
<!-- Embedded via data attributes on a host page -->
<div
  class="viz-component"
  data-component="newTimeLine"
  data-type="posts"
  data-count="7"
  data-height="500"
  data-line-color="%23a7a9ac"
  data-config="%5B%7B%22circleColor%22%3A%22%236acbd5%22%7D%5D"
  data-parent="42"
></div>
```

```jsx
// Direct React usage
import NewTimeLine from 'dvz-ui/src/embeddable/new-time-line';

<NewTimeLine
  data-type="posts"
  data-count="7"
  data-height="500"
  data-line-color="#a7a9ac"
  data-config="{}"
  parent="42"
  unique="instance1"
/>
```

## Related
- WordPress Block: `new-time-line` (`data-viz-wordpress/.../blocks/new-time-line`)

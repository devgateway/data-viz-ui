> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Parallax Container (UI Embeddable)

## Purpose
An embeddable React/TypeScript component that renders WordPress posts as layered `ParallaxLayer` elements inside a `@react-spring/parallax` container, with per-post speed, offset, and sticky configuration driving the scroll animation.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-type` | string | — | WordPress post type to query (e.g. `"posts"`) |
| `data-taxonomy` | string | — | Taxonomy slug for filtering |
| `data-categories` | string | — | Comma-separated or JSON-encoded category IDs |
| `data-count` | string/number | — | Number of posts to fetch |
| `data-scrolls` | string/number | — | Total parallax scroll pages passed to `<Parallax pages={}>` |
| `data-horizontal` | string/boolean | `false` | When `"true"`, enables horizontal parallax scrolling |
| `data-height` | string/number | — | Container height in pixels |
| `data-width` | string/number | — | Container width hint in pixels |
| `data-configuration` | string (URL-encoded JSON) | — | URL-encoded JSON array of per-post config objects: `{ offset, speed, sticky, stickyStart, stickyEnd }` |
| `parent` | string/number | — | WordPress parent page ID used for Redux store namespacing |
| `unique` | string | — | Unique suffix for the post-provider Redux store key |
| `editing` | boolean | — | When `true`, indicates editor context |
| `component` | string | — | Component identifier string |

### Per-post configuration object (`data-configuration` array item)
| Key | Type | Description |
|-----|------|-------------|
| `offset` | number | Scroll page offset where the layer appears |
| `speed` | number | Parallax speed factor (negative = reverse) |
| `sticky` | boolean | When `true`, uses sticky behaviour instead of offset/speed |
| `stickyStart` | number | Scroll page where sticky begins |
| `stickyEnd` | number | Scroll page where sticky ends |

## Usage Example
```html
<!-- Embedded via data attributes -->
<div
  class="viz-component"
  data-component="parallaxContainer"
  data-type="posts"
  data-count="5"
  data-scrolls="7"
  data-height="600"
  data-configuration="%5B%7B%22offset%22%3A0%2C%22speed%22%3A0.5%7D%5D"
  data-parent="1"
></div>
```

```jsx
// Direct React usage
import Parallax from 'dvz-ui/src/embeddable/parallax';

<Parallax
  data-type="posts"
  data-count="5"
  data-scrolls="7"
  data-height="600"
  data-configuration={encodeURIComponent(JSON.stringify([{ offset: 0, speed: 0.5 }]))}
  parent="1"
  unique="home-parallax"
/>
```

## Related
- WordPress Block: `parallax-container` (`data-viz-wordpress/.../blocks/parallax-container`)

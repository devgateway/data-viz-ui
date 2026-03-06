> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Tabbed Posts (UI Component)

## Purpose
An embeddable React component that renders WordPress posts in a tabbed layout. On desktop it renders either a single-tab menu view (`light` theme) or a button-grid view (`buttons` theme); on mobile/tablet (≤ 1024 px) or in mobile preview mode it falls back to an accordion layout.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-type` | `string` | — | WordPress post type to fetch (e.g. `"posts"`). |
| `data-taxonomy` | `string` | — | Taxonomy slug used for filtering. |
| `data-categories` | `string` | — | Comma-separated category IDs/slugs. |
| `data-items` | `string \| number` | — | Number of posts to load. |
| `data-theme` | `string` | `"light"` | Tab style: `"light"` (menu) or `"buttons"` (grid). |
| `data-show-icons` | `string` | — | `"true"` to display the post icon in each tab button. |
| `data-show-labels` | `string` | — | `"true"` to display the post label in each tab button. |
| `data-use-scrolls` | `string` | — | `"true"` to allow the content area to scroll. |
| `data-height` | `string \| number` | — | Height of the content area in pixels. |
| `data-preview-mode` | `string` | `"Desktop"` | Forces a specific render mode in editor: `"Desktop"` or `"Mobile"`. |
| `editing` | `boolean` | — | `true` when rendered inside the Gutenberg editor. |
| `parent` | `string` | — | Parent block identifier used to namespace the Redux post store. |
| `unique` | `string` | — | Unique instance key to prevent store collisions. |
| `pageModuleProps` | `object` | — | Redux-injected editor state (overrides `previewMode` and `editing`). |

## Usage Example
```jsx
import TabbedPosts from 'dvz-ui/src/embeddable/tabbedposts';

<TabbedPosts
  data-type="posts"
  data-items="5"
  data-theme="light"
  data-show-labels="true"
  data-height="700"
  parent="my-page"
  unique="block-1"
/>
```

## Related
- WordPress Block: `tabbed-posts` (`data-viz-wordpress/…/blocks/tabbed-posts`)

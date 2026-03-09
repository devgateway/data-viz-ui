> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Time Line (UI Component)

## Purpose
An embeddable React component that renders an interactive D3-powered horizontal timeline of WordPress posts. The root `index.jsx` selects between `DesktopCarousel` and `MobileCarousel` sub-components based on the device type or the editor's `previewMode` setting.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-count` | `string \| number` | — | Number of timeline items to fetch and render. |
| `data-height` | `string \| number` | — | Height of the timeline SVG/container in pixels. |
| `data-type` | `string` | — | WordPress post type to query. |
| `data-taxonomy` | `string` | — | Taxonomy slug used for filtering. |
| `data-categories` | `string` | — | Encoded category IDs/slugs. |
| `data-line-color` | `string` | — | Hex colour for the horizontal axis line. |
| `data-line-width` | `string \| number` | — | Stroke width of the axis line (px). |
| `data-position` | `string` | — | Default label position: `"top"`, `"middle"`, or `"bottom"`. |
| `data-config` | `string` | — | URL-encoded JSON array of per-series configuration objects. |
| `data-preview-mode` | `string` | `"Desktop"` | Forces desktop or mobile carousel in editor: `"Desktop"` or `"Mobile"`. |
| `editing` | `boolean` | — | `true` when rendered inside the Gutenberg editor. |
| `parent` | `string` | — | Parent block identifier for Redux store namespacing. |
| `unique` | `string` | — | Unique instance key. |
| `pageModuleProps` | `object` | — | Redux-injected editor state (overrides `previewMode` and `editing`). |

## Usage Example
```jsx
import TimeLine from 'dvz-ui/src/embeddable/time-line';

<TimeLine
  data-type="posts"
  data-count="7"
  data-height="500"
  data-line-color="#a7a9ac"
  data-preview-mode="Desktop"
  parent="my-page"
  unique="block-1"
/>
```

The component automatically switches to the mobile carousel when the viewport width is ≤ 1024 px (tablet/mobile device types).

## Related
- WordPress Block: `time-line` (`data-viz-wordpress/…/blocks/time-line`)

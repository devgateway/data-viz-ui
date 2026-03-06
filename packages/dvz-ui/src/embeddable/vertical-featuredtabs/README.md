> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Vertical Featured Tabs (UI Component)

## Purpose
An embeddable TypeScript/React component that renders WordPress posts as vertically-stacked expandable panels with full-bleed featured cover images. On desktop it shows the `FeaturedTabs` layout (collapsing/expanding panels); on mobile/tablet (≤ 1365 px) or in mobile preview mode it renders an `AccordionContent` fallback.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-height` | `number` | — | Minimum height of each panel in pixels. |
| `data-type` | `string` | — | WordPress post type to fetch. |
| `data-taxonomy` | `string` | — | Taxonomy slug for filtering. |
| `data-categories` | `string` | — | URL-encoded JSON array of category IDs/slugs. |
| `data-count` | `any` | — | Number of posts to load. |
| `data-colors` | `string` | — | URL-encoded JSON object of per-tab colours: `{"color_0": "#hex", ...}`. |
| `data-cover-width` | `number` | `50` | Width (px) of each collapsed cover panel. |
| `data-read-more-label` | `string` | `"READ More"` | Label for read-more links inside expanded content. |
| `data-click-to-expand-label` | `string` | `"CLICK TO EXPAND"` | Hover overlay label on collapsed tabs. |
| `data-preview-mode` | `string` | `"Desktop"` | Forces desktop or mobile layout in editor preview. |
| `editing` | `boolean` | — | `true` when inside the Gutenberg editor; opens the first tab by default. |
| `parent` | `string` | — | Parent identifier for Redux post store namespacing. |
| `unique` | `string` | — | Unique instance key to prevent store collisions. |
| `pageModuleProps` | `object` | — | Redux-injected editor state (overrides `previewMode` and `editing`). |

## Usage Example
```tsx
import VerticalFeaturedTabs from 'dvz-ui/src/embeddable/vertical-featuredtabs';

<VerticalFeaturedTabs
  data-type="posts"
  data-count={3}
  data-height={500}
  data-colors={encodeURIComponent(JSON.stringify({ color_0: '#6acbd5', color_1: '#fcb535', color_2: '#f79132' }))}
  data-cover-width={80}
  data-click-to-expand-label="CLICK TO EXPAND"
  editing={false}
  parent="my-page"
  unique="block-1"
/>
```

## Related
- WordPress Block: `vertical-featured-tabs` (`data-viz-wordpress/…/blocks/vertical-featured-tabs`)

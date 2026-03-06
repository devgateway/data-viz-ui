> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Featured Tabs (UI Embeddable)

## Purpose
Renders WordPress posts as an interactive tabbed panel (desktop) or an accordion (mobile / preview mode). Each tab displays a cover image and post intro; expanding a tab shows the full post content. The component is fully responsive and respects a configurable break-point (≤ 1250 px → mobile).

## Props / Attributes
All props are received as `data-*` HTML attributes.

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-type` | `string` | — | WordPress post type to fetch (e.g. `"posts"`). |
| `data-taxonomy` | `string` | — | Taxonomy slug for filtering posts. |
| `data-categories` | `string` | — | Comma-separated term IDs to filter by. |
| `data-items` | `number\|string` | — | Maximum number of posts to display. |
| `data-height` | `number` | — | Minimum height (px) of the tabs container. |
| `data-color` | `string` | — | Comma-separated hex/CSS colours for tab backgrounds (one per tab, e.g. `"#e63b2e,#adcb49,#3bbfbf"`). |
| `data-read-more-label` | `string` | `"READ More"` | Expand-tab button label. |
| `data-close-label` | `string` | `"Close"` | Collapse-tab button label. |
| `data-use-scrolls` | `string` | `"false"` | `"true"` to enable scrollable overflow on the container. |
| `data-preview-mode` | `string` | `"Desktop"` | Force `"Desktop"` or `"Mobile"` layout (overrides device detection when editing). |
| `editing` | `boolean` | `false` | Passed by the runtime when rendered inside the block editor. |
| `parent` | `number` | — | WordPress parent post/page ID (used as part of the Redux store key). |
| `unique` | `number` | — | Unique block instance ID (used as part of the Redux store key). |
| `intl` | `object` | — | `react-intl` IntlShape object for locale-aware rendering. |

### Deep-link support
If the URL hash matches a post slug (e.g. `#my-post-slug`) and that slug is in the current post set, the corresponding tab is auto-expanded on mount and the page scrolls to it.

## Usage Example

```html
<div
  class="viz-component"
  data-component="featuredTabs"
  data-type="posts"
  data-taxonomy="category"
  data-categories="12,15"
  data-items="3"
  data-height="500"
  data-color="%23e63b2e,%23adcb49,%233bbfbf"
  data-read-more-label="Read More"
  data-close-label="Close"
  data-use-scrolls="false"
  data-preview-mode="Desktop"
></div>
```

Or via the React embeddable entry point:
```tsx
import FeaturedTabs from 'dvz-ui/embeddable/featuredtabs';

<FeaturedTabs
  data-type="posts"
  data-taxonomy="category"
  data-categories="12,15"
  data-items={3}
  data-height={500}
  data-color="#e63b2e,#adcb49,#3bbfbf"
  data-read-more-label="Read More"
  data-close-label="Close"
  data-use-scrolls="false"
  data-preview-mode="Desktop"
  editing={false}
  parent={1}
  unique={1}
  intl={intl}
/>
```

## Related
- WordPress Block: `featured-tabs` (`data-viz-wordpress/…/blocks/featured-tabs/`)

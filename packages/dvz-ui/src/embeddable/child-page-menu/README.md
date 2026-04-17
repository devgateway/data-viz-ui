> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Child Page Menu (UI Component)

## Purpose
Renders a two-level, vertically stacked navigation menu for WordPress child pages. Each top-level item represents a page group (with optional SVG icon fetched via the Media API); clicking a group expands its sub-pages and loads the selected sub-page's content in an adjacent content area.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-parent` | `string \| number` | — | WordPress post ID of the parent page. Required — without it a red "No child pages here" segment is shown. |
| `data-title` | `string` | `'Menu'` | Heading text displayed at the top of the navigation panel. |
| `data-height` | `string \| number` | — | Container height (pixels). Passed through from the host page. |
| `data-style` | `string` | — | Optional CSS style string applied to the root container. |
| `data-columns` | `string \| number` | — | Column count used by the `VerticalDashboardGallery` sub-layout. |
| `editing` | `boolean` | `false` | When `true` applies compact inline styles suited for the Gutenberg editor preview. |
| `unique` | `string` | — | Unique instance key used to namespace the Redux store slice. |

## Usage Example
The component is mounted by the embeddable runtime. The host `div` carries `data-*` attributes:

```html
<div
  data-component="childPagesMenu"
  data-parent="42"
  data-title="Explore Dashboards">
</div>
```

Or inside a React tree:

```jsx
import ChildPageMenu from '@devgateway/dvz-ui/embeddable/child-page-menu';

<ChildPageMenu
  data-parent={42}
  data-title="Explore Dashboards"
  unique="nav-1"
/>
```

## Related
- WordPress Block: `child-pages-navigator` (`wp-react-blocks-plugin/blocks/child-pages-navigator`)

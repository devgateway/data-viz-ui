> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Page Gallery (UI Embeddable)

## Purpose
An embeddable React/TypeScript component that fetches and displays child WordPress pages in a responsive multi-column grid, sorted by `menu_order`. Each page is rendered using the `PostIntro` component.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-height` | number | — | Height of the container in pixels |
| `data-style` | string | — | CSS style variant applied to the gallery container class |
| `data-columns` | string | — | Number of columns as a string (e.g. `"3"`) |
| `data-parent` | number | — | WordPress parent page ID whose child pages are displayed |
| `editing` | boolean | — | When `true`, indicates the component is rendered inside the block editor |
| `unique` | string | — | Unique suffix used to namespace the Redux/WP-lib page store |
| `intl` | object | — | `react-intl` injected object providing `locale` |
| `parent` *(alias)* | string | — | Alternative parent reference used for store key namespacing |

## Usage Example
```html
<!-- Embedded via data attributes -->
<div
  class="viz-component"
  data-component="pageGallery"
  data-parent="10"
  data-columns="3"
  data-height="400"
></div>
```

```jsx
// Direct React usage
import PageGallery from 'dvz-ui/src/embeddable/pagegallery';
import { injectIntl } from 'react-intl';

const WrappedGallery = injectIntl(PageGallery);

<WrappedGallery
  data-parent={10}
  data-columns="3"
  data-height={400}
  unique="home-gallery"
/>
```

## Related
- WordPress Block: `page-gallery` (`data-viz-wordpress/.../blocks/page-gallery`)

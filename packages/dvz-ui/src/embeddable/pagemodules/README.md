> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Page Modules (UI Embeddable)

## Purpose
An embeddable React/TypeScript component that fetches child WordPress pages and renders each as a full-width content section. A floating side navigator (with smooth-scroll links) and a "back to top" button are automatically generated, with active-section tracking via Intersection Observer.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-nav-label` | string | `"Sections"` | Heading label for the floating side navigator |
| `data-to-top-label` | string | `"TO THE TOP"` | Label for the scroll-to-top button |
| `data-preview-mode` | string | `"Desktop"` | Viewport preview mode (passed through to Redux action) |
| `editing` | string | — | Set to `"true"` when rendered inside the block editor; hides the floating navigator |
| `parent` | string/number | — | WordPress parent page ID whose child pages are fetched |
| `unique` | string | — | Unique suffix for the Redux page-provider store key |
| `intl` | object | — | `react-intl` injected object providing `locale` |

### FloatingNavigator sub-component props
| Name | Type | Description |
|------|------|-------------|
| `navTitle` | string | Navigator panel heading |
| `toTopLabel` | string | "Scroll to top" button label |
| `sections` | `{ id, label, active, iconComponent }[]` | List of sections with active state and icon |

## Usage Example
```html
<!-- Embedded via data attributes -->
<div
  class="viz-component"
  data-component="pageModules"
  data-parent="15"
  data-nav-label="Chapters"
  data-to-top-label="Back to top"
></div>
```

```jsx
// Direct React usage
import PageModules from 'dvz-ui/src/embeddable/pagemodules';
import { injectIntl } from 'react-intl';
import { Provider } from 'react-redux';

<Provider store={store}>
  <PageModules
    parent="15"
    unique="modules-home"
    data-nav-label="Chapters"
    data-to-top-label="Back to top"
    editing="false"
    intl={intl}
  />
</Provider>
```

## Related
- WordPress Block: `page-modules` (`data-viz-wordpress/.../blocks/page-modules`)

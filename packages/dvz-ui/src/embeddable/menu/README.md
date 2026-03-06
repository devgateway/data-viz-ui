> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Inline Menu (UI Embeddable Component)

## Purpose
A React embeddable that renders an inline horizontal navigation menu by fetching a named WordPress menu via the `@devgateway/wp-react-lib` `MenuProvider`. It supports an optional icon, a heading label, and highlights the currently active menu item based on the URL.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-name` | `string` | `"main"` | Slug/name of the WordPress menu to load. |
| `data-label` | `string` | — | Heading label displayed at the start of the menu bar. |
| `data-icon` | `string` | — | URL-encoded URL of the icon image displayed before the label. |
| `data-icon-id` | `string` | — | WordPress media ID of the icon (informational). |
| `data-show-icons` | `string` | — | Set to `"true"` to display per-item icons (requires custom `icon` meta on items). |
| `data-show-labels` | `string` | — | Set to `"true"` to display item text labels. |
| `locale` | `string` | — | Active locale string (e.g. `"en"`) used to build localised link paths. |
| `editing` | `boolean` | `false` | Internal flag set to `true` inside the Gutenberg editor iframe. |
| `parent` | `string` | — | Parent block identifier for store scoping. |
| `unique` | `string` | — | Unique instance identifier. |
| `onChange` | `function` | — | Optional callback invoked when the selected menu item changes. |

## Usage Example

```html
<div
  class="viz-component"
  data-component="menu"
  data-name="main-nav"
  data-label="Navigation"
  data-show-icons="false"
  data-show-labels="true"
></div>
```

Or as a React component:

```tsx
import InlineMenu from '@devgateway/dvz-ui/embeddable/menu';

<InlineMenu
  data-name="main-nav"
  data-label="Navigation"
  data-show-icons="false"
  data-show-labels="true"
  locale="en"
  editing={false}
  unique="menu-1"
/>
```

### Menu item link format
Item URLs are rewritten to remove the WordPress path prefix and prepend the active locale:

```
https://example.com/wp/en/about  →  /en/about
```

## Related
- WordPress Block: `dvz/menu` (`data-viz-wordpress/.../blocks/menu`)

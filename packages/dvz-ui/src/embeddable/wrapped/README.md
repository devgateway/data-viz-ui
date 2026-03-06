> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Wrapped (UI Component)

## Purpose
An embeddable TypeScript/React component that acts as a dynamic loader: given a `data-name` prop it lazily imports and renders any other embeddable component from the `../` directory, passing all received props through. This enables the `wrapped-component` Gutenberg block to target any UI component without a 1-to-1 block mapping.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-name` | `string` | — | Directory name of the target embeddable to load (e.g. `"tabbedposts"`, `"showcase"`). The component is resolved as `../[data-name]/index`. |
| `data-height` | `string \| number` | — | Height of the outer wrapper `<div>` in pixels. |
| `data-width` | `string \| number` | — | Width passed through to the wrapped component. |
| `parent` | `string` | — | Parent identifier forwarded to the wrapped component. |
| `editing` | `boolean` | — | Editor mode flag forwarded to the wrapped component. |
| `component` | `string` | — | Component identifier forwarded to the wrapped component. |
| `unique` | `string` | — | Unique instance key forwarded to the wrapped component. |
| *...rest* | `any` | — | All additional props are spread onto the dynamically loaded component. |

## Usage Example
```tsx
import Wrapped from 'dvz-ui/src/embeddable/wrapped';

<Wrapped
  data-name="tabbedposts"
  data-height="600"
  data-type="posts"
  data-items="4"
  parent="my-page"
  unique="block-1"
  editing={false}
/>
```

> **Note:** The inner component is loaded with `React.lazy`. Ensure a `<React.Suspense>` boundary exists higher in the tree (currently commented out in source — add one if needed).

## Related
- WordPress Block: `wrapped-component` (`data-viz-wordpress/…/blocks/wrapped-component`)

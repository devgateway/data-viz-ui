> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Data Paragraph (UI Embeddable)

## Purpose
Renders a data-driven inline paragraph by evaluating a template string against a live data feed from a Superset API or a CSV snippet. Supports rich number formatting, auto-height iframe messaging, and full HTML template composition with per-field format helpers.

## Props / Attributes
All props are received as `data-*` HTML attributes (the component is mounted by the embeddable runtime).

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-app` | `string` | — | Data source type (`"csv"` or Superset API slug). |
| `data-csv` | `string` | `""` | Raw CSV string; used when `data-app` is `"csv"`. |
| `data-dvz-proxy-dataset-id` | `string` | — | Superset proxy dataset ID. |
| `data-measures` | `string` (JSON) | `"{}"` | URL-encoded JSON array of measure field definitions. First element is used. |
| `data-format` | `string` (JSON) | `"{}"` | URL-encoded JSON `Intl.NumberFormat` options (`style`, `minimumFractionDigits`, `maximumFractionDigits`, `currency`). |
| `data-group` | `string` | — | Filter group key; subscribes to shared filter state. |
| `data-filters` | `string` (JSON) | `"[]"` | URL-encoded JSON array of active filters to apply to the data query. |
| `data-number-font-size` | `number` | `20` | Font size (px) of the output span. |
| `data-number-color` | `string` | `"#000000"` | URL-encoded CSS color of the output span. |
| `data-wait-for-filters` | `string` | `"false"` | Set to `"true"` to hold rendering until filter values are present. |
| `data-no-data-text` | `string` | `"-"` | Fallback text when the data value is `null`. |
| `data-text-template` | `string` | `""` | URL-encoded HTML template string. Supports `{field}`, `#({field},d)`, `%({field},d)`, and `#C({field},d)` variable syntax. |

### Auto-height
When the URL query parameter `autoHeight=1` (or `true`) is present, the component posts a `dvz-embed-height` message to its parent window, allowing the WordPress block to dynamically resize its iframe.

## Usage Example

```html
<!-- Rendered by the embeddable runtime on the page -->
<span
  class="viz-component"
  data-component="dataparagraph"
  data-app="csv"
  data-csv="total_projects%0A42"
  data-text-template="%7BThere%20are%20%23(%7Btotal_projects%7D%2C0)%20active%20projects.%7D"
  data-number-font-size="18"
  data-number-color="%235a5d68"
  data-no-data-text="-"
></span>
```

Or via the React embeddable entry point:
```jsx
import DataParagraph from 'dvz-ui/embeddable/data-paragraph';

<DataParagraph
  data-app="csv"
  data-csv={"total_projects\n42"}
  data-text-template={encodeURIComponent("There are <strong>#({total_projects},0)</strong> active projects.")}
  data-number-font-size={18}
  data-number-color={encodeURIComponent("#5a5d68")}
  data-no-data-text="-"
  intl={intl}
  unique="dp-1"
/>
```

## Related
- WordPress Block: `data-paragraph` (`data-viz-wordpress/…/blocks/data-paragraph/`)

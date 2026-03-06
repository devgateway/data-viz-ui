> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Download (UI Embeddable)

## Purpose
Renders an interactive download button that exports the surrounding page content (charts, post content, etc.) as a PNG or JPG image using `dom-to-image`. Supports a format-selector dropdown, an optional section title, source-URL watermarking, and selective exclusion of filter UI from exports.

## Props / Attributes
All props are received as `data-*` HTML attributes.

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-height` | `string\|number` | — | Height hint passed from the block (not directly used in layout). |
| `data-button-label` | `string` | — | Label on the primary download button (e.g. `"Download"`). |
| `data-default-format` | `string` | `"PNG"` | Pre-selected format; `"PNG"` or `"JPG"`. |
| `data-check-png` | `string` | `"true"` | `"true"` to enable PNG option. |
| `data-check-jpg` | `string` | `"true"` | `"true"` to enable JPG option. |
| `data-png-label` | `string` | — | Filename for PNG downloads (e.g. `"export.png"`). |
| `data-jpg-label` | `string` | — | Filename for JPG downloads (e.g. `"export.jpg"`). |
| `data-png-text` | `string` | — | Dropdown label for PNG option (e.g. `"Download PNG"`). |
| `data-jpg-text` | `string` | — | Dropdown label for JPG option (e.g. `"Download JPG"`). |
| `data-title` | `string` | — | Header text shown inside the format-selector dropdown. |
| `data-use-title` | `string` | `"false"` | `"true"` to render the section title above the button. |
| `data-section-title` | `string` | `""` | URL-encoded HTML for the section title. |
| `data-style` | `string` | `"heavy"` | Button style variant; `"heavy"` or `"light"`. |
| `data-download-tooltip` | `string` | `""` | URL-encoded tooltip text for the dropdown trigger. |
| `data-include-source-url` | `string` | `"false"` | `"true"` to append the current URL as a watermark. |
| `data-source-urlmargin-left` | `number` | `70` | Left margin (px) of the URL watermark. |
| `data-source-urlmargin-top` | `number` | `10` | Top margin (px) of the URL watermark. |
| `data-source-urlfont-size` | `number` | `18` | Font size (px) of the URL watermark. |
| `data-include-filters` | `string` | `"false"` | `"true"` to include filter UI elements in the exported image. |

### Export behaviour
- Nodes with class `ignore` are always excluded.
- When `data-include-filters` is `"false"`, elements with classes `filter-component`, `data-filters-reset`, `data-filters-apply`, and `filter-search` are stripped from the snapshot.
- A 50 px padding is added around the exported node.
- A transparent PNG placeholder is used for images that fail to load, preventing blank exports.

## Usage Example

```html
<div
  class="viz-component self-render-component"
  data-component="download"
  data-button-label="Download"
  data-default-format="PNG"
  data-check-png="true"
  data-check-jpg="true"
  data-png-label="chart-export.png"
  data-jpg-label="chart-export.jpg"
  data-png-text="Download PNG"
  data-jpg-text="Download JPG"
  data-style="heavy"
  data-include-source-url="false"
  data-include-filters="false"
>
  <!-- inner blocks / chart markup goes here -->
</div>
```

## Related
- WordPress Block: `downloads` (`data-viz-wordpress/…/blocks/downloads/`)

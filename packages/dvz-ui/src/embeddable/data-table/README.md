# Data Table Component

A flexible data table block for WordPress that can consume data from multiple sources:

- **CSV** – static data pasted directly in the block settings.
- **API** – any microservice registered via Eureka that exposes `/dimensions`, `/measures`, `/filters`, `/stats/:source`.
- **Superset Proxy** – connects through the `superset-proxy` API to expose Apache Superset datasets.

## How it works

### WordPress side (Gutenberg block)

The block is registered as `dvz/datatable` and renders a `<div>` in the page HTML with the following `data-*` attributes:

```html
<div
  class="data-table viz-component"
  data-component="datatable"
  data-app="<api|csv|superset-proxy>"
  data-csv="..."
  data-dvz-proxy-dataset-id="..."
  data-dimension1="<field_name|none>"
  data-measures="<url-encoded JSON>"
  data-filters="<url-encoded JSON>"
  data-group="default"
  data-wait-for-filters="false"
  data-height="400"
  data-font-size="14"
  data-header-bg-color="%23f0f4f8"
  data-header-text-color="%232d3748"
  data-striped-rows="true"
  data-border-style="rows"
  data-show-export-button="false"
  data-export-file-name="budget-table"
  data-default-sort-column="measure:population"
  data-default-sort-direction="desc"
  data-no-data-text="No data available"
></div>
```

The `EmbeddedGateway` picks up elements with `class="viz-component"`, reads `data-component`, and renders the matching React component.

### React side (dvz-ui)

The component (`src/embeddable/data-table/index.jsx`) uses:

- `DataProvider` – fetches data from the configured source (CSV parsing, REST API, Superset proxy).
- `DataConsumer` – receives the fetched dataset and passes it to the inner table renderer.
- The inner `DataTableInner` component builds a proper `<table>` with:
  - One header column for the primary **dimension** (rows).
  - One header column per **selected measure** (columns) in the default layout.
  - A pivot-style layout when exactly one measure and two dimensions are selected: the first dimension stays as rows and the second dimension becomes dynamic columns.
  - Formatted numbers using `Intl.NumberFormat` respecting each measure's format configuration.
  - Frontend-only sortable headers so end users can sort by any visible column.
  - An optional CSV export button that downloads the currently displayed table.
  - Optional initial sort column/direction settings applied on first render.

## Block Editor Configuration

| Panel | What you configure |
|---|---|
| Group | Internal group name, wait-for-filters toggle |
| Size | Table container max-height |
| API & Source | Select data source app (CSV / API / Superset) |
| CSV Data | Paste raw CSV (first row = headers, first column = dimension) |
| Dimension (rows) | Pick one or two dimensions. When two dimensions are selected and exactly one measure is enabled, the second dimension becomes dynamic table columns |
| Measures (columns) | Toggle which numeric fields appear as columns; set custom labels & number formats per measure |
| Filters | Add/remove API filters to pre-filter the dataset |
| Display | Font size, striped rows, border style, no-data text, show/hide CSV export button, export filename, default sort column, default sort direction |
| Header Colors | Background and text color for the header row |

## Measures format

The `measures` attribute is a JSON object keyed by app name, with each measure keyed by field name:

```json
{
  "my-api": {
    "population": {
      "selected": true,
      "hasCustomLabel": true,
      "customLabel": "Population",
      "format": {
        "style": "decimal",
        "minimumFractionDigits": 0,
        "maximumFractionDigits": 0
      }
    },
    "gdp": {
      "selected": true,
      "hasCustomLabel": false,
      "format": {
        "style": "currency",
        "currency": "USD",
        "minimumFractionDigits": 2,
        "maximumFractionDigits": 2
      }
    }
  }
}
```


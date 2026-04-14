---
title: Data Paragraph Embeddable Component
version: 1.0
date_created: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [design, dvz-ui, embeddable, data-visualization, template, text]
---

# Introduction

The `data-paragraph` embeddable renders a text template in which variables are replaced with formatted values from CSV or DVZ proxy data. This enables narrative paragraphs that dynamically embed data values inline.

## 1. Purpose & Scope

**Purpose**: Define the template interpolation syntax, data binding, and rendering contract for `data-paragraph`.

**Scope**: `packages/dvz-ui/src/embeddable/data-paragraph/index.jsx`.

**Intended Audience**: Engineers building data-driven narrative sections.

## 2. Definitions

| Term | Definition |
|------|------------|
| **Text template** | A string with `%(field)` or `#(field)` interpolation markers replaced with formatted data values. |
| **Interpolation marker** | `%(fieldName)` for standard values, `#C(fieldName)` for currency values. |
| **DVZ proxy** | Internal data proxy identified by `data-dvz-proxy-dataset-id`. |
| **AutoHeight** | A mode where the component reports its rendered height via `postMessage` for iframe embedding. |

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: The component MUST load data from `data-csv` or `data-dvz-proxy-dataset-id`.
- **REQ-002**: The component MUST replace all `%(field)`, `#(field)`, and `#C(field)` markers in `data-text-template` with the corresponding formatted data values.
- **REQ-003**: All interpolated HTML MUST be sanitised before rendering (DOMPurify or equivalent).
- **REQ-004**: When `data-wait-for-filters` is `"true"`, the component MUST NOT render text until filters are initialised.
- **REQ-005**: When no data matches filters, `data-no-data-text` (default `"-"`) MUST replace each interpolation marker.
- **REQ-006**: Number formatting MUST use `data-format` as `Intl.NumberFormat` options.
- **CON-001**: Interpolated content MUST be rendered via `dangerouslySetInnerHTML` only after sanitisation.
- **GUD-001**: Use `%(fieldName)` for plain values and `#C(fieldName)` for currency-formatted values.

## 4. Interfaces & Data Contracts

### `data-*` Attribute Props

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data-csv` | `string` | `""` | URL to CSV data source. |
| `data-dvz-proxy-dataset-id` | `string` | — | DVZ proxy dataset ID. |
| `data-view-mode` | `string` | `"info"` | `"info"` or `"edit"`. |
| `data-app` | `string` | — | Redux app identifier. |
| `data-measures` | `string` (JSON) | `"{}"` | Measures config for data extraction. |
| `data-format` | `string` (JSON) | `"{}"` | `Intl.NumberFormat` options. |
| `data-group` | `string` | — | Redux filter group name. |
| `data-filters` | `string` (JSON) | `"[]"` | Static filter overrides. |
| `data-wait-for-filters` | `string` | `"false"` | Defer render until filters ready. |
| `data-no-data-text` | `string` | `"-"` | Placeholder for absent values. |
| `data-text-template` | `string` | `""` | HTML template with interpolation markers. |
| `data-number-font-size` | `number` | `20` | Font size for numeric values. |
| `data-number-color` | `string` | `"#000000"` | Colour for numeric values. |

### Interpolation Syntax

```
%(fieldName)    → formatted numeric value from the data row
#(fieldName)    → same as %() — alternative syntax
#C(fieldName)   → currency-formatted value
```

## 5. Acceptance Criteria

- **AC-001**: Given template `"Total beneficiaries: %(total)"` and `total=12500`, when rendered, the output is `"Total beneficiaries: 12,500"`.
- **AC-002**: Given `data-wait-for-filters="true"` and uninitialised group, when rendered, no text appears.
- **AC-003**: Given a filter excluding all rows, each marker is replaced with `data-no-data-text`.
- **AC-004**: Given a template containing `<script>` tags in the data, when rendered, the script is stripped before output.
- **AC-005**: Given `data-format='{"style":"currency","currency":"USD"}'` and `value=1500`, `#C(value)` renders as `"$1,500.00"`.

## 6. Test Automation Strategy

- **Test Levels**: Unit (interpolation logic, sanitisation), Integration (CSV mock + filter state).
- **Frameworks**: Vitest + `@testing-library/react` + msw v2.
- **CI/CD Integration**: `pnpm --filter @devgateway/dvz-ui-react test`.

## 7. Rationale & Context

Data paragraphs allow content editors to write narrative copy that stays in sync with live data without manual updates. The sanitisation requirement prevents XSS when data values contain HTML.

## 8. Dependencies & External Integrations

### Technology Platform Dependencies
- **PLT-001**: Redux store — filter group state.
- **PLT-002**: `react-intl` — locale-aware formatting.

## 9. Examples & Edge Cases

```jsx
<div data-component="data-paragraph"
     data-csv="/data/summary.csv"
     data-text-template="In %(year), %(country) reached %(beneficiaries) beneficiaries."
     data-format='{"style":"decimal","maximumFractionDigits":0}' />

// Edge: marker with no matching field → replaced with data-no-data-text
// Edge: XSS attempt in data value → stripped by sanitiser
```

## 10. Validation Criteria

- **VAL-001**: All interpolation markers in the template are replaced after data load.
- **VAL-002**: `<script>` content in data values is stripped before render.
- **VAL-003**: `data-no-data-text` replaces markers when no data matches the filter.

## 11. Related Specifications / Further Reading

- [spec-design-dvz-ui-big-number.md](./spec-design-dvz-ui-big-number.md)
- [spec-design-dvz-ui-datalabel.md](./spec-design-dvz-ui-datalabel.md)

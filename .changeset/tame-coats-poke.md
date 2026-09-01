---
"@devgateway/dvz-ui-react": patch
---

Add extra tooltips configuration in d3Map

- Column names with spaces and currency-symbol formatting ($()) now work in tooltip
  templates.
- Fix FlowLayer's origin-marker tooltip to use the configured template and
  full row data instead of a hardcoded `{name_en}`.
- Add extractVariables/extractVariablesDeep (Utils.jsx) to flatten the API's
  nested dimension-tree children into flat tooltip variables - the actual
  root cause blocking "extra" API columns from ever reaching a tooltip.
- Add a per-layer `extraTooltipColumns` config that requests additional
  fields via `includeColumns`, across DataLayer/LatLongLayer/FlowLayer/
  Legends, and exclude columns already used as a query dimension (the API
  500s if a column is requested both ways).
- Fix D3MapDataProvider's componentDidUpdate: a dead code path meant
  non-filter param changes (e.g. editing extraTooltipColumns in the block
  editor) never triggered a refetch.
- Fix Legends.jsx racing DataLayer.jsx for the same Redux store slot with
  mismatched params, letting the legend's fetch silently clobber the map's
  correctly-parameterized data.

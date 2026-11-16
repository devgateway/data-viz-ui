---
"@devgateway/dvz-ui-react": patch
---

Fix body component hover error (`selectAll(...).transition is not a function`) by importing `d3-transition` explicitly so its selection patch is always bundled.

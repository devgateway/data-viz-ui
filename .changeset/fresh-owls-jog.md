---
"@devgateway/dvz-ui-react": patch
---

Improve map tooltip and data transformation behavior by:

- implementing dynamic tooltip variables
- refactoring the map component from class-based to functional
- adding support for an extra tooltip-only dimension (dimension3) while keeping query source dimensions unchanged
- enhancing API-backed variable extraction using metadata types and flat key/value variables for tooltips
- removing debug console.log statements from map components

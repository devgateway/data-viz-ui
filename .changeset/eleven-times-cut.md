---
"@devgateway/dvz-ui-react": patch
---

Normalized category taxonomy handling to prevent invalid "none" values from being passed to `getCustomPosts`. Both filter-provided and block-configured taxonomy values now exclude "none" before use, ensuring consistent behavior across `taxonomy` arg and `taxonomyFilters` map. Fixes issue where "none" could appear as a query parameter key.
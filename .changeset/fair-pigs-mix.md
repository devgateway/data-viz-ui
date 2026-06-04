---
"@devgateway/dvz-ui-react": patch
---

Fix filtered-posts requests to support discrete multi-year filtering via the years query parameter instead of date-range expansion.

This prevents unrelated years from being included when users select non-consecutive years, and keeps request argument compatibility for custom posts fetching.
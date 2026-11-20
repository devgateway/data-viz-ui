---
"@devgateway/dvz-ui-react": patch
---

Fix filter dropdown values disappearing on reload when a map and a filter share a superset-proxy dataset, by sending `dvzProxyDatasetId` in the map's categories request.

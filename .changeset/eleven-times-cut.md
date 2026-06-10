---
"@devgateway/dvz-ui-react": patch
---

Added a guard flag to detect whether category taxonomy is actually configured (not "none").
Updated taxonomy argument selection logic to use filter taxonomy only when valid, otherwise fall back to configured taxonomy.
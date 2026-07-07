---
"@devgateway/dvz-ui-react": patch
---

Update showcase and newsletter embeddables to read data-* props via postMessage. Previously read flat lowercase props from URL querystring; now consistent with all other embeddables. Fixed newsletter submit() to use props["data-list"] and props["data-tag"].

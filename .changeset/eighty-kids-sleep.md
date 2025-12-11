---
"@devgateway/dvz-ui-react": patch
---

- Fix `data-api` endpoint to use host URL if `VITE_REACT_APP_API_ROOT` env variable is not set.
- Add purgeCSS plugin to remove unused CSS which helps in reducing the bundle size of CSS.
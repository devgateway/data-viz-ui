---
"@devgateway/dvz-ui-react": minor
---

This release syncs the [data-viz-front](https://github.com/devgateway/data-viz-front) code to data-viz related repos

### Features

- Add new CategoricalFilter and YearFilter components for enhanced post filtering capabilities
- Add ordering and orderingDirection parameters to `getCustomPosts` API for custom post sorting
- Add window.location.origin as fallback for API_ROOT when VITE_REACT_APP_API_ROOT is not configured

### Improvements

- Refactor PostsFilter component with improved architecture and filter management
- Refactor Bar chart component with better TypeScript support and structure
- Update filtered-posts component with better filtering logic and state management
- Improve posts pagination with enhanced pagination controls
- Update chart styling with refined visual appearance
- Add credentials: 'include' to custom posts API requests for better authentication support

### Bug Fixes

- Fix empty taxonomy filter values not being skipped in query parameters
- Improve SSR compatibility with window.location.origin check
- Update translations for better internationalization support


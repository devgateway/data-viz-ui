# @devgateway/dvz-ui-react

## 1.1.1

### Patch Changes

- [#32](https://github.com/devgateway/data-viz-ui/pull/32) [`18eac8d`](https://github.com/devgateway/data-viz-ui/commit/18eac8d657e5867d8898ede72d2f30563d7e5440) Thanks [@timothygachengo](https://github.com/timothygachengo)! - Fix Nivo Imports

## 1.1.0

### Minor Changes

- [#30](https://github.com/devgateway/data-viz-ui/pull/30) [`8bb29d6`](https://github.com/devgateway/data-viz-ui/commit/8bb29d6afb3a91a7a286c06314e5ad01bfff32f7) Thanks [@timothygachengo](https://github.com/timothygachengo)! - # Changelog

  - This release contains updated code from [`data-viz-front`](https://github.com/devgateway/data-viz-front).

  ## Added

  - **New Component**: `posts-with-filters` - A comprehensive posts display component with filtering capabilities

    - Supports category filtering, country filtering, date filtering
    - Includes pagination and posts per page options
    - Posts with country category appear first in display order
    - Added `Post.tsx` component for individual post rendering
    - Added utility functions for date handling

  - **New Map Utilities**: Enhanced d3Map functionality

    - `GradientColors.js` - Sequential color palettes for map visualizations (blues, greens, greys, oranges, purples, etc.)
    - `Utils.jsx` - Additional utility functions for map operations

  - **New Data Utilities**: `src/utils/data.ts`
    - `toBoolean()` - Safe boolean conversion from various data types
    - `toNumber()` - Safe number conversion with fallback to 0
    - `uriStringToArray()` - URI string to array conversion with JSON parsing
    - `decodeHtmlEntitiesToText()` - HTML entity decoding to plain text
    - `decodeHtmlEntitiesToHtml()` - HTML entity decoding with DOMPurify sanitization

  ## Changed

  - **Chart Components**: Major refactoring and improvements

    - Updated `Bar.tsx`, `Bump.jsx`, `Diverging.jsx`, `Line.jsx` components
    - Enhanced `Tooltip.jsx` with improved functionality
    - Updated chart data handling in `Bar.tsx` and `Line.jsx`
    - Improved color management in `ManualColors.js`
    - Significant refactoring of main chart `index.jsx`

  - **Map Components**: Extensive d3Map improvements

    - Enhanced `BaseLayer.jsx` and `DataLayer.jsx` with better rendering
    - Improved `FlowLayer.jsx`, `LatLongLayer.jsx` functionality
    - Updated `Legends.jsx` with better legend handling
    - Enhanced `ZoomControl.jsx` with improved zoom functionality
    - Updated main map `index.jsx` with better integration

  - **Data Management**: Improved data providers and handling

    - Enhanced `CategoriesProvider.jsx` with better category management
    - Improved `DataProvider.jsx` with enhanced data fetching and processing

  - **Filter System**: Comprehensive filter improvements

    - Major refactoring of main filter `index.tsx` (1381 line changes)
    - Enhanced filter reset and apply button functionality
    - Improved filter state management

  - **UI Components**: Various component improvements
    - Updated `big-number` and `big-number-trend` components
    - Enhanced timeline components (`new-time-line`, `time-line`)
    - Improved carousel, gallery, and navigation components
    - Better menu and parallax functionality

## 1.0.7

### Patch Changes

- [#29](https://github.com/devgateway/data-viz-ui/pull/29) [`ae3acd8`](https://github.com/devgateway/data-viz-ui/commit/ae3acd87ca119fc5c45e7e40f162ee0e97123f26) Thanks [@timothygachengo](https://github.com/timothygachengo)! - ## Fixes

  - Add missing stylesheet
  - Migrate `useKeyOnly, useValueAndKey, getUnhandledProps` from semantic-ui-react to the repo to prevent semantic-react from being bundled.

## 1.0.6

### Patch Changes

- [#24](https://github.com/devgateway/data-viz-ui/pull/24) [`0c81a74`](https://github.com/devgateway/data-viz-ui/commit/0c81a742d54f194172a36e3f937da62e7540cfbf) Thanks [@timothygachengo](https://github.com/timothygachengo)! - Update wp-react-lib

## 1.0.5

### Patch Changes

- [`23c615b`](https://github.com/devgateway/data-viz-ui/commit/23c615b94a8cfd344bc70baee803d0219205721b) Thanks [@sdimunzio](https://github.com/sdimunzio)! - Updating repo history in order to prepare it for public access
  - Removed the Wordpress, custom and pre-render folders from git.

## 1.0.4

### Patch Changes

- [#17](https://github.com/devgateway/data-viz-ui/pull/17) [`486c7da`](https://github.com/devgateway/data-viz-ui/commit/486c7daff5b4e8736f9f15ae5a44249fce1298a3) Thanks [@timothygachengo](https://github.com/timothygachengo)! - # Changes

  - Add `header` and `footer` props in the PreviewPageContainers, PreviewTypeContainers, SlugContainer and SlugPostContainer to be injected in the `ResponsiveContainer` component.

## 1.0.3

### Patch Changes

- [#15](https://github.com/devgateway/data-viz-ui/pull/15) [`5b38023`](https://github.com/devgateway/data-viz-ui/commit/5b3802368ec7740cb87cd4b12cdb9d741b5fa9fb) Thanks [@timothygachengo](https://github.com/timothygachengo)! - Bump @devgateway/wp-react-lib by upating the wp-react-lib submodule

## 1.0.2

### Patch Changes

- [#13](https://github.com/devgateway/data-viz-ui/pull/13) [`f05850f`](https://github.com/devgateway/data-viz-ui/commit/f05850f118831b5ec3e3162c8509e823be78852d) Thanks [@timothygachengo](https://github.com/timothygachengo)! - Bump wp-react-lib version

## 1.0.1

### Patch Changes

- [`b0e91fd`](https://github.com/devgateway/data-viz-ui/commit/b0e91fd8f83d37a3c0379eb183ea15b97fbe36eb) Thanks [@timothygachengo](https://github.com/timothygachengo)! - Add typings to the data-api reducer

## 1.0.1

### Patch Changes

- [#2](https://github.com/devgateway/data-viz-ui/pull/2) [`e11b6f1`](https://github.com/devgateway/data-viz-ui/commit/e11b6f11596b1311a47478ce354e7786da8e0b18) Thanks [@timothygachengo](https://github.com/timothygachengo)! - ### 🐛 Bug Fixes

  - _(TCDICORE-258)_ Fix page module component showing mobile styles
  - _(TCDING-708)_ Fix measures component in data charts

  ### ⚙️ Miscellaneous Tasks

  - _(TCDICORE-234)_ Merged tree of tcdi official main into main
  - _(TCDICORE-234)_ Modify nginx dockerfile to make build work
  - _(TCDICORE-234)_ Update nginx dockerfileg
  - _(TCDICORE-254)_ Chart rendered in editor and preview but not in UI
  - _(TCDIKE-722)_ Radar mobile responsiveness
  - _(TCDIKE-722)_ Radar responsiveness
  - _(TCDIKE-723)_ Responsive map component
  - _(TCDIKE-722)_ Remove conflicting has-standard-14-font-size class
  - _(DVIZ-43)_ Update react-lib submodule path and initialize example project
  - _(DVIZ-43)_ Update pnpm workspace configuration, modify app styles, and enhance dvz-ui dependencies
  - _(DVIZ-43)_ Update dvz-ui package configuration and improve component structure
  - _(DVIZ-43)_ Make dvz-ui build successfully. Add vite configuration and remove unused dependencies
  - _(DVIZ-43)_ Fix build, typing and linting issues in the dvz-ui. Try to integrate dvz-ui in the example app
  - _(DVIZ-43)_ Fix build, typing and linting issues in the dvz-ui. Try to integrate dvz-ui in the example app
  - _(DVIZ-43)_ Fix package exports and minor bug fixes
  - _(DVIZ-43)_ Update dependencies and enhance example app configuration. Fix some issues in the dvz ui
  - _(DVIZ-43)_ Update dependencies and clean up example app. Add a loading component, add common css for shared stylines.
  - _(DVIZ-43)_ Implement locale redirection in root loader and refactor routing structure.
  - _(DVIZ-43)_ Refactor data and category provider components to use hooks and improve API handling
  - _(DVIZ-43)_ Enable custom components to be registered in the library
  - _(DVIZ-43)_ Update lockfile
  - _(DVIZ-43)_ Fix build issues
  - _(DVIZ-43)_ Enable SSR
  - _(DVIZ-43)_ Configure github actions
  - _(DVIZ-43)_ Configure github actions
  - _(DVIZ-43)_ Remove old-ui folder
  - _(DVIZ-43)_ Configure dvz-ui for release
  - _(DVIZ-43)_ Add home index route and loading fallback component
  - _(DVIZ-43)_ implement default locale constant and enhance routing with loading fallbacks
  - \*(DVIZ-43): enable custom header and footer

# @devgateway/dvz-ui-react

## 2.0.0-beta.0

### Major Changes

- This pull request introduces the initial Server Side Rendering (SSR) Work.
  The main changes focus on better server-side rendering support for favicons, a migration to use route loaders instead of client loaders, and improved flexibility for page and post containers. There are also fixes to type exports and configuration updates.

  **SSR Favicon and Loader Integration:**

  - Added a new `SSRFavicon` component to handle favicons in SSR contexts, and integrated it into the example app's layout, fetching the favicon URL using a new route `loader` function. (`example/app/root.tsx`, `packages/dvz-ui/src/layout/SSRFavicon.tsx`, `packages/dvz-ui/src/layout/index.ts`, [[1]](diffhunk://#diff-0e710716db1ef10619bfa9b1aeef70f91db0c12a600f3cc2202756d335c5e2bdR8-L20) [[2]](diffhunk://#diff-0e710716db1ef10619bfa9b1aeef70f91db0c12a600f3cc2202756d335c5e2bdR47-R86) [[3]](diffhunk://#diff-cbee2b57dccdf4c9346e7a4338519123d6a127e73296c4d4886b005f19b21ec2R1-R17) [[4]](diffhunk://#diff-f27ef4fd16d5bcc237f2e17c5f39f4d3169ec18408b8d31b3f8be323dad51bedR12)
  - The layout now displays a loading spinner during navigation transitions using `useNavigation`. (`example/app/root.tsx`, [example/app/root.tsxR47-R86](diffhunk://#diff-0e710716db1ef10619bfa9b1aeef70f91db0c12a600f3cc2202756d335c5e2bdR47-R86))

  **Migration from Client Loader to Loader:**

  - Updated route files to use the standard `loader` function instead of `clientLoader`, aligning with modern React Router data loading patterns. (`example/app/routes/home.tsx`, `example/app/routes/slug.tsx`, [[1]](diffhunk://#diff-0019b189bf560c2ff25048eaa3ae232ad68b7f978b10bed36cbbf04f6d60f7a1L3-R10) [[2]](diffhunk://#diff-8703ab07731e128d54737297c886a3ecb179029a346394ad698312953030593bL1-R7)

  **Container Component Flexibility and Bug Fixes:**

  - Enhanced `SlugContainer` and `SlugPostContainer` to accept pre-fetched `pages` or `posts` props, enabling server-passed data and simplifying SSR. (`packages/dvz-ui/src/layout/containers/SlugContainer.tsx`, `packages/dvz-ui/src/layout/containers/SlugPostContainer.tsx`, [[1]](diffhunk://#diff-5ba4a6b647dcffca9e57d83451be546fb1958b262fee743697b711b9bd3604f2L4-R28) [[2]](diffhunk://#diff-3b407a45c5543e2f777f15734a3a70a2eb3f81a68fa13325b54a2f097cd535ccL7-R25)
  - Fixed prop usage in `PreviewTypeContainer` to correctly use route parameters for previewing content. (`packages/dvz-ui/src/layout/containers/PreviewTypeContainer.tsx`, [[1]](diffhunk://#diff-5082dc5d7ad5b3a09b06ead1a89da73147dc7594330f20b7207d5cf8d3070cd5L15-R22) [[2]](diffhunk://#diff-5082dc5d7ad5b3a09b06ead1a89da73147dc7594330f20b7207d5cf8d3070cd5L30-R33)

  **Example Application Improvements:**

  - Improved error handling and fallback UI in the `slug` route to display a "Page not found" message when appropriate. (`example/app/routes/slug.tsx`, [example/app/routes/slug.tsxL46-R43](diffhunk://#diff-8703ab07731e128d54737297c886a3ecb179029a346394ad698312953030593bL46-R43))
  - Enabled prerendering for the home route in the example app config. (`example/react-router.config.ts`, [example/react-router.config.tsL12-R12](diffhunk://#diff-1f45d01a4a414bdca4031e14141356281755c3fb1d7b6e46b171a927208de9ecL12-R12))
  - Updated Vite config to improve module resolution for development. (`example/vite.config.example.ts`, [example/vite.config.example.tsL89-R89](diffhunk://#diff-addf82a1f05611e3f2e4f335fcd7f19bb5087dea9508e735adc0c03d8fefa44fL89-R89))

  **Type and Export Fixes:**

  - Fixed type export paths in the `dvz-ui` package to point to the correct locations in the build output. (`packages/dvz-ui/package.json`, [packages/dvz-ui/package.jsonL134-R156](diffhunk://#diff-3db8fdb10038f4527fb49aeb768d5a3028b31b17e9f1daca9dcfc87d72e27d8bL134-R156))

  **Minor Improvements:**

  - Improved logging and parameter handling in `RootLayout` for better development debugging. (`packages/dvz-ui/src/layout/Layout.tsx`, [packages/dvz-ui/src/layout/Layout.tsxL41-R41](diffhunk://#diff-9a9cbafb73862afdd87a5a27a3711dbcfffc5a4a4d66a183970a11490f5ee910L41-R41))

  These changes collectively improve SSR support, developer experience, and code maintainability.

### Patch Changes

- Updated dependencies []:
  - @devgateway/wp-react-lib@1.0.0-beta.0

## 1.3.1

### Patch Changes

- [#49](https://github.com/devgateway/data-viz-ui/pull/49) [`528d75f`](https://github.com/devgateway/data-viz-ui/commit/528d75f46ac8735f4621f6128fb59d4381285532) Thanks [@timothygachengo](https://github.com/timothygachengo)! - #### Feature

  - Move the following components into the core

  1. Favicon
  2. RootLayout component
  3. Loading Component
  4. Preview Component Parser

  #### Chores

  - update some dependenices

  #### Internal Improvements

  - Create testing and prod environment for data-viz-ui
  - Add dockerfiles for each deployment

## 1.3.0

### Minor Changes

- [`fe6d3e5`](https://github.com/devgateway/data-viz-ui/commit/fe6d3e59e9c3fade15b98d590e37637873ab0af2) Thanks [@sdimunzio](https://github.com/sdimunzio)! - Removing static image from big number with trend component

## 1.2.1

### Patch Changes

- [#43](https://github.com/devgateway/data-viz-ui/pull/43) [`e4c2cb8`](https://github.com/devgateway/data-viz-ui/commit/e4c2cb88e7d402634225e3779d1f993a769d17db) Thanks [@timothygachengo](https://github.com/timothygachengo)! - - Update wp-react-lib
  - Move pure-react-carousel to the css imports
  - Fix content links when parsing the HTML

## 1.2.0

### Minor Changes

- [#37](https://github.com/devgateway/data-viz-ui/pull/37) [`7e29fba`](https://github.com/devgateway/data-viz-ui/commit/7e29fba906db77d15e449090e250f9ebea2c0d32) Thanks [@sdimunzio](https://github.com/sdimunzio)! - Updates from alive

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

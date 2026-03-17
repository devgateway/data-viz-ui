# @devgateway/dvz-ui-react

## 1.7.1

### Patch Changes

- [#177](https://github.com/devgateway/data-viz-ui/pull/177) [`e1fb629`](https://github.com/devgateway/data-viz-ui/commit/e1fb62960ae3977c475b247ae1df56f6cec203b9) Thanks [@timothygachengo](https://github.com/timothygachengo)! - Fix floating search input

## 1.7.0

### Minor Changes

- [#170](https://github.com/devgateway/data-viz-ui/pull/170) [`a81ccee`](https://github.com/devgateway/data-viz-ui/commit/a81ccee0bedfc732f576cf315a571c6e3074cb98) Thanks [@sdimunzio](https://github.com/sdimunzio)! - New embedded components created: Big Filter, Big Numbers, custom bars etc. + Bug fixing

## 1.6.19

### Patch Changes

- [#152](https://github.com/devgateway/data-viz-ui/pull/152) [`c681989`](https://github.com/devgateway/data-viz-ui/commit/c68198912793c068e78c7fd7ed59fc384b220f28) Thanks [@timothygachengo](https://github.com/timothygachengo)! - Fix Inline List link width to not exceed the screen width

## 1.6.12

### Patch Changes

- [#144](https://github.com/devgateway/data-viz-ui/pull/144) [`cb11b1c`](https://github.com/devgateway/data-viz-ui/commit/cb11b1c4f4a7de33c32d60b766057837e9419848) Thanks [@timothygachengo](https://github.com/timothygachengo)! - remove height from slider in postcarousel

## 1.6.11

### Patch Changes

- [#142](https://github.com/devgateway/data-viz-ui/pull/142) [`bceaa08`](https://github.com/devgateway/data-viz-ui/commit/bceaa0859a7f6cad2edbc5049ebf3f0a95bf24fb) Thanks [@timothygachengo](https://github.com/timothygachengo)! - fix floating search to stop hiding child themes after it is closed

## 1.6.10

### Patch Changes

- [#140](https://github.com/devgateway/data-viz-ui/pull/140) [`df67e3f`](https://github.com/devgateway/data-viz-ui/commit/df67e3f07fe35a9d2ee9b837beebe451e3aa6271) Thanks [@timothygachengo](https://github.com/timothygachengo)! - fix floating header to prevent it from covering the child items

## 1.6.9

### Patch Changes

- [#133](https://github.com/devgateway/data-viz-ui/pull/133) [`164bb32`](https://github.com/devgateway/data-viz-ui/commit/164bb32df62d430abfc525636490a2b4576cb24f) Thanks [@timothygachengo](https://github.com/timothygachengo)! - Fix featured tabs featured media loading

## 1.6.7

### Patch Changes

- [#126](https://github.com/devgateway/data-viz-ui/pull/126) [`8b12127`](https://github.com/devgateway/data-viz-ui/commit/8b121277aac810263227dfd12156465e95dc4a9a) Thanks [@timothygachengo](https://github.com/timothygachengo)! - - Expose utils to be imported from data-viz
  - Fix download button

## 1.6.6

### Patch Changes

- [#122](https://github.com/devgateway/data-viz-ui/pull/122) [`6729a96`](https://github.com/devgateway/data-viz-ui/commit/6729a965370cdabe34b09eb0921b3bfc5d8e6a8d) Thanks [@timothygachengo](https://github.com/timothygachengo)! - Fix type import paths

## 1.6.5

### Patch Changes

- [#120](https://github.com/devgateway/data-viz-ui/pull/120) [`f1fe884`](https://github.com/devgateway/data-viz-ui/commit/f1fe884321c340cdb8393c4d768885a082c7aa60) Thanks [@timothygachengo](https://github.com/timothygachengo)! - Fix posts handling in the SlugPostContainer

## 1.6.4

### Patch Changes

- [#117](https://github.com/devgateway/data-viz-ui/pull/117) [`dceb62a`](https://github.com/devgateway/data-viz-ui/commit/dceb62a3d7eabdd2937b0b8e7c7b4df4ef45f006) Thanks [@timothygachengo](https://github.com/timothygachengo)! - - Refactor posts filter components to streamline props passing
  - Fix React Markdown to render CSS in production

## 1.6.1

### Patch Changes

- [#104](https://github.com/devgateway/data-viz-ui/pull/104) [`bc71679`](https://github.com/devgateway/data-viz-ui/commit/bc7167988dd580c9ae3ec84048c0ebe00c117575) Thanks [@timothygachengo](https://github.com/timothygachengo)! - Fix filtered posts

## 1.6.0

### Minor Changes

- [#99](https://github.com/devgateway/data-viz-ui/pull/99) [`56780ae`](https://github.com/devgateway/data-viz-ui/commit/56780ae1c121f4f85137ad73df64d43903f76757) Thanks [@timothygachengo](https://github.com/timothygachengo)! - This release syncs the [data-viz-front](https://github.com/devgateway/data-viz-front) code to data-viz related repos

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

## 1.5.4

### Patch Changes

- [#94](https://github.com/devgateway/data-viz-ui/pull/94) [`f00592c`](https://github.com/devgateway/data-viz-ui/commit/f00592c000eca492afbd41fb324558c09865deee) Thanks [@timothygachengo](https://github.com/timothygachengo)! - FIx data API for charts

## 1.5.3

### Patch Changes

- [#92](https://github.com/devgateway/data-viz-ui/pull/92) [`5c2155e`](https://github.com/devgateway/data-viz-ui/commit/5c2155efc01e1aee29248e227e3804902236e0d5) Thanks [@timothygachengo](https://github.com/timothygachengo)! - Use window location for API

## 1.5.2

### Patch Changes

- [#86](https://github.com/devgateway/data-viz-ui/pull/86) [`cda0d1b`](https://github.com/devgateway/data-viz-ui/commit/cda0d1bc4f3786b34f01ae22807e2151643e995c) Thanks [@timothygachengo](https://github.com/timothygachengo)! - - Fix `data-api` endpoint to use host URL if `VITE_REACT_APP_API_ROOT` env variable is not set.
  - Add purgeCSS plugin to remove unused CSS which helps in reducing the bundle size of CSS.

## 1.5.1

### Patch Changes

- [#75](https://github.com/devgateway/data-viz-ui/pull/75) [`88bafca`](https://github.com/devgateway/data-viz-ui/commit/88bafcaa2d8901d474039aea72508ae0f6c7aee4) Thanks [@timothygachengo](https://github.com/timothygachengo)! - - Add `process.env` in the config file for SSR context
  - Move `pure-react-carousel` css into the common CSS to fix carousel rendering issues
  - Update some packages
  - Fix import leaks in the dist
  - Expose `layout` and `conf` packages.

## 1.5.0

### Minor Changes

- [#73](https://github.com/devgateway/data-viz-ui/pull/73) [`32da4c6`](https://github.com/devgateway/data-viz-ui/commit/32da4c6d61811b266a672cddfdcd213ec2404ba1) Thanks [@timothygachengo](https://github.com/timothygachengo)! - - _(TCDICORE-350)_ Sync embeddables from data-viz-front to data-viz-ui
  - _(TCDICORE-350)_ Sync scss from data-viz-front to daata-viz-ui
  - _(TCDICORE-350)_ Fix header rendering, fix search control and update example to have a div with id root
  - _(TCDICORE-350)_ Update example
  - _(TCDICORE-350)_ Update router config, clean up TypeScript paths, and fix imports to fix build errors

  ## New Change
  - _(TCDICORE-350)_ Upgrade react router version to 7.9.4. (Upgrade your project to react-router ~v7.9.4)

## 1.4.0

### Minor Changes

- [#70](https://github.com/devgateway/data-viz-ui/pull/70) [`9c97e20`](https://github.com/devgateway/data-viz-ui/commit/9c97e20ad91467397217336a35068432ff79adc6) Thanks [@timothygachengo](https://github.com/timothygachengo)! - Update wp-react-lib to be SSR friendly

## 1.3.5

### Patch Changes

- [#66](https://github.com/devgateway/data-viz-ui/pull/66) [`868dce8`](https://github.com/devgateway/data-viz-ui/commit/868dce8405df2e587db294e721a01e8d1569a614) Thanks [@timothygachengo](https://github.com/timothygachengo)! - Fix environment variables import

## 1.3.4

### Patch Changes

- [#63](https://github.com/devgateway/data-viz-ui/pull/63) [`740799f`](https://github.com/devgateway/data-viz-ui/commit/740799f87ddf3c944e700ac881185935a6f3c3d0) Thanks [@timothygachengo](https://github.com/timothygachengo)! - - Update wp-react-lib
  - Standardize package verions
  - Add missing exports in the `layout`

## 1.3.3

### Patch Changes

- [#60](https://github.com/devgateway/data-viz-ui/pull/60) [`72220d1`](https://github.com/devgateway/data-viz-ui/commit/72220d1543a5d61dcababbbe0de41c5dad1a79ea) Thanks [@timothygachengo](https://github.com/timothygachengo)! - Standardize react-router versions

## 1.3.2

### Patch Changes

- [#58](https://github.com/devgateway/data-viz-ui/pull/58) [`b5c0a01`](https://github.com/devgateway/data-viz-ui/commit/b5c0a01bdc9ec18a1afd16c47fbb59a86d7689d1) Thanks [@timothygachengo](https://github.com/timothygachengo)! - Upgrade dependencies to fix CVEs

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

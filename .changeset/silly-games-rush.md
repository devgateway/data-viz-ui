---
"@devgateway/dvz-ui-react": minor
---

# Changelog

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

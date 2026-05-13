# @devgateway/dvz-ui-react

A modular, embeddable React component library for data visualization and UI, built with TypeScript. This package provides a suite of reusable, customizable components and utilities for building rich data-driven applications, with a focus on embeddability and extensibility.

## Features

- **Rich Data Visualization**: Charting, mapping, dashboards, and more, powered by Nivo, D3, and custom components.
- **Embeddable Components**: Easily integrate visualizations and UI modules into your React apps.
- **Customizability**: Register your own components and reducers for extensibility.
- **Internationalization**: Built-in support for `react-intl`.
- **Redux Integration**: Utilities and reducers for state management.
- **TypeScript Support**: Fully typed API and components.
- **Modern Build**: Uses Vite for fast builds and development.

## Installation

```bash
npm install @devgateway/dvz-ui-react
# or
yarn add @devgateway/dvz-ui-react
```

> **Peer dependencies:**
> You must have `react` and `react-dom` (v18.3.1 or compatible) installed in your project.

## Usage

```tsx
import { components, getComponentByNameIgnoreCase } from '@devgateway/dvz-ui-react';

// Example: Render a chart component
const Chart = getComponentByNameIgnoreCase('chart');
<Chart {...props} />

// Or use directly from the components map
const { chart: ChartComponent } = components;
<ChartComponent {...props} />
```

### Usage Example: Chart Component

The `Chart` component is one of the core embeddable components. It supports a wide range of chart types and is highly configurable via props and data attributes.

```tsx
import { getComponentByNameIgnoreCase } from '@devgateway/dvz-ui-react';

const Chart = getComponentByNameIgnoreCase('chart');

// Example usage with minimal props
<Chart
  data-type="bar"
  data-height={400}
  data-csv={`category,value
A,30
B,50
C,20`}
  data-measures='{"csv": {"value": {"selected": true, "format": {"style": "decimal", "minimumFractionDigits": 0, "maximumFractionDigits": 0}}}}'
  data-color-by="index"
  data-show-legends="true"
  data-legend-position="right"
  data-x-label-color="#333"
  data-bar-color="#007bff"
  data-title="Sample Bar Chart"
/>
```

**Key Props and Data Attributes:**

- `data-type`: Chart type (`bar`, `line`, `pie`, `radar`, etc.)
- `data-csv`: CSV string with your data
- `data-measures`: JSON string defining which measures to display and their format
- `data-color-by`: How to color the chart (`index`, `category`, etc.)
- `data-show-legends`: Show/hide legends (`"true"`/`"false"`)
- `data-legend-position`: Position of the legend (`"right"`, `"bottom"`, etc.)
- `data-x-label-color`, `data-bar-color`: Color customizations
- `data-height`: Chart height in pixels

> **Tip:** Many more attributes are supported for advanced customization. See the source of `src/embeddable/chart/index.jsx` for the full list.

### Embeddable Components

Some of the main embeddable components include:

- `Chart`
- `MapView`
- `PageGallery`
- `PostsCarousel`
- `TabbedPosts`
- `Download`
- `NewsLetter`
- `SankeyChart`
- `SupersetChart`
- `SupersetDashboard`
- `BigNumber`
- `BigNumberTrend`
- ...and many more!

See the `src/embeddable` directory for the full list.

### Customization

You can register your own custom components and reducers:

```tsx
import { customizer } from '@devgateway/dvz-ui-react';

customizer.registerCustomEmbeddables({
  myCustomComponent: MyComponent,
});

const MyComponent = customizer.getComponentByNameIgnoreCase('myCustomComponent');
```

## Directory Structure

- `src/embeddable/` — Main embeddable React components
- `src/redux/` — Redux utilities and reducers
- `src/lib/` — Shared utilities and helpers
- `src/layout/` — Layout components
- `src/tracker/` — Tracking and analytics utilities
- `src/translations/` — Internationalization files

## Development

### Scripts

- `npm run dev` — Start development mode (watch mode for TypeScript and Vite)
- `npm run build` — Build the library for production

### TypeScript

This project uses strict TypeScript settings. See `tsconfig.json` for details.

### Build

The library is built with [Vite](https://vitejs.dev/) and outputs both CommonJS and ES modules, as well as type declarations.

## Contributing

We welcome contributions! To get started:

1. **Clone the repo** and install dependencies:
   ```bash
   git clone <repo-url>
   cd data-viz-ui/packages/dvz-ui
   npm install
   ```
2. **Start development mode**:
   ```bash
   npm run dev
   ```
3. **Build the package**:
   ```bash
   npm run build
   ```
4. **Lint and check types**:
   ```bash
   npm run lint
   npm run typecheck
   ```
5. **Submit a pull request** with your changes.

### Guidelines

- Use TypeScript for all source files.
- Write clear, descriptive commit messages.
- Add or update documentation and usage examples as needed.
- Ensure all tests and builds pass before submitting.

## License

Apache-2.0

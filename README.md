# data-viz-ui

A TypeScript pnpm monorepo that provides a library of embeddable React components for data visualization. Components can run both as a standalone React application and as WordPress Gutenberg blocks, all sharing a single Redux store at runtime.

## How It Works

Each visualization component (chart, filter, map, big-number, etc.) exists as a self-contained React component in `packages/dvz-ui/src/embeddable/`. These components are consumed by the `data-viz-wordpress` submodule, which registers one Gutenberg block per component.

### Edit Mode (WordPress Gutenberg Editor)

When a content editor adds a block to a page, the block's `BlockEdit` component renders a configuration UI in the sidebar. The editor can set data sources, dimensions, measures, filter bindings, chart types, colors, labels, and more. All settings are stored as **block attributes** in WordPress.

### Frontend Rendering (Shared Redux Context)

`BlockSave` serializes each component's configuration as `data-*` attributes on a plain `<div class="viz-component">`. When a visitor loads the page, `dvz-ui` boots a single React application that:

1. Scans the DOM for all `.viz-component` elements
2. Reads their `data-*` attributes to reconstruct props
3. Mounts every component under a **single shared Redux `<Provider>`** and `<IntlProvider>`

Because all components share one Redux store, filter selections automatically propagate to every chart, map, and indicator on the page — with no extra wiring required. WordPress handles layout and content authoring; React and Redux handle the interactive runtime.

## Requirements

- Docker
- NodeJS v22+
- PNPM v9+
- Intellij IDEA/ Visual Studio Code / WebStorm

## Setup

- Clone the repo

```bash
git clone --recurse-submodules git@github.com:devgateway/data-viz-ui.git
```

- Install

```bash
pnpm install
```

- Run the example project

```bash
cd example && pnpm run dev
```


## Contributing

For details about how to send pull requests, please read CONTRIBUTING.md.

## Author

- **Sebastian Dimunzio** - *Architecture and code* - [sdimunzio](https://github.com/sdimunzio)

## Co Author

- **Timothy Mugo** - *Architecture and code* - [timothymugo](https://github.com/timothygachengo)

## License
This project is under - MIT - for more details please check [MIT](https://opensource.org/license/mit)

## Contact information
For any comments or suggestions, please contact us
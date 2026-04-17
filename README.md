# data-viz-ui

Data Viz Front provides a generic UI which utilizes the react-wp-lib library, which allows React components to be embedded into WordPress Gutenberg blocks, enabling dynamic content visualization.

The data-viz-ui submodule offers a set of embeddable React components that can be used in WordPress during the page editing mode. Each component is available as a separate WordPress plugin, making it easy for users to embed and configure these React components within the Gutenberg editor. React-wp-lib ensures seamless integration of these components during the UI render process, connecting them with the Redux store to manage state and data flow across the application.

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
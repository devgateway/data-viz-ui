const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  webpack: {
    alias: {
      assets: path.resolve(__dirname, "public/assets"),
    },

    configure: (webpackConfig) => {
     webpackConfig.plugins.push(new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }));

      // Updating the Sass rule setup
      const rules = webpackConfig.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
      const sassRule = rules.find(rule => String(rule.test).includes('sass'));

      if (sassRule) {
        sassRule.use = [
            {
                loader: MiniCssExtractPlugin.loader,
            },
          {
            loader: require.resolve('css-loader'),
            options: { importLoaders: 2, sourceMap: true }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              postcssOptions: {
                plugins: [require('autoprefixer')],
              },
              sourceMap: true,
            }
          },
          {
            loader: require.resolve('resolve-url-loader'),
            options: {
              sourceMap: true,
              root: path.resolve(__dirname, 'public')
            }
          },
          {
            loader: require.resolve('sass-loader'),
            options: {
              sourceMap: true
            },
          }
        ];
      }
      webpackConfig.stats = 'errors-only';

      webpackConfig.output.publicPath = '/';

      return webpackConfig;
    },
  },
};

const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtraxtPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: './lib/renderers/domRender.js',
  },

  output: {
    path: path.resolve(__dirname, 'public', 'build'),
    filename: 'js_[name].[contentHash].js',
  },

  module: {
    rules: [
      {
        test: /\.(sass|scss|css)$/,
        // use: [MiniCssExtraxtPlugin.loader, 'css-loader', 'sass-loader'], // in case we use sass
        use: [MiniCssExtraxtPlugin.loader, 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: ['@babel/transform-runtime'],
        },
      },
    ],
  },

  plugins: [
    // for assets.json list on public folder
    new AssetsPlugin({
      filename: 'assets.json',
      path: path.join(__dirname, 'public'),
    }),
    // to clean public/build folder each time webpack outputs files
    new CleanWebpackPlugin(),
    new MiniCssExtraxtPlugin({
      filename: 'css_[name].[contentHash].css',
    }),
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true,
        },
      },
    },
    minimizer: [new OptimizeCssAssetsWebpackPlugin(), new TerserPlugin()],
  },
};

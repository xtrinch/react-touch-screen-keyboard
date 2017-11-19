const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProvidePlugin = require('provide-plugin');

module.exports = {
  entry: path.resolve(__dirname, './index.js'),
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname),
    port: 8080,
    publicPath: '/',
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
    ],
  },
  watch: true,
  plugins: [
    new ExtractTextPlugin('style.css'),
    new ProvidePlugin({
      CustomEvent: 'custom-event-polyfill',
    }),
  ],
};

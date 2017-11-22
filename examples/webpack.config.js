var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

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
      {
          test: /\.scss$/,
          loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ],
  },
  watch: true,
  plugins: [
    new ExtractTextPlugin('style.css'),
  ]
};

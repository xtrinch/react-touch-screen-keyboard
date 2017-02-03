var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: "./KeyboardedInput.js",
  devtool: "source-map",
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'KeyboardedInput.js',
    library: "KeyboardedInput",
    libraryTarget: "var"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
      }, {
        test: /\.css$/,
        include: path.join(__dirname, 'src'),
        loaders: ['style-loader', 'css-loader'],
      },
    ]
  },
  externals: {
    "react": "React",
    "react-dom": "react-dom",
  }
};

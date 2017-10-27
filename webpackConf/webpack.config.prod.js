/**
* @file: webpack prod config
* @author: wangsy1987@126.com
*/

var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  cache: true,
  entry: {
    'index': ['babel-polyfill', path.join(__dirname, '../src/index.js')]
  },
  output: {
    path: '/',
    filename: 'hope.0.1.js',
    publicPath: '/'
  },
  node: {
    fs: 'empty'
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        // exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        drop_console: true
      },
      output: {
        comments: false
      }
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  stats: {
    colors: true
  }
}

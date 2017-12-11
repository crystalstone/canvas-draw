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
    'index': path.join(__dirname, '../src/index.js')
  },
  output: {
    path: '/',
    filename: 'hope.0.2.js',
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
        loader: ['es3ify-loader', 'babel-loader']
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        properties: false,
        warnings: false,
        drop_console: true
      },
      output: {
        beautify: true,
        quote_keys: true,
        comments: false
      },
      sourceMap: false,
      mangle: {
        screw_ie8: false
      }
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  stats: {
    colors: true
  }
}

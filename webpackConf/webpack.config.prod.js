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
    'index': ['babel-polyfill', path.join(__dirname, '../example/index.js')]
  },
  output: {
    path: '/',
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[hash].js',
    publicPath: '/'
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    alias: {
      'Hope': path.join(__dirname, '../src/index')
    }
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.less/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!less-loader'
        })
      },
      {
        test: /\.css/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        loader: 'url-loader?limit=100000&name=[name].[ext]'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'map editor',
      hash: false,
      inject: false,
      appMountId: 'map',
      filename: 'index.html',
      template: path.join(__dirname, '../example/index.ejs')
    }),
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
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('css/index.[hash].css')
  ],
  stats: {
    colors: true
  }
}

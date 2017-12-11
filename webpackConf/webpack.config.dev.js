/**
* @file: webpack dev config
* @author: wangsy1987@126.com
*/

var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  cache: true,
  entry: {
    'index': [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      'babel-polyfill',
      path.join(__dirname, '../example/reactExample/index.js')
    ]
  },
  output: {
    path: '/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    publicPath: '/'
  },
  node: {
    fs: "empty"
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'map editor',
      hash: false,
      inject: false,
      appMountId: 'map',
      filename: 'index.html',
      template: path.join(__dirname, '../example/reactExample/index.ejs')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '../example/reactExample/mock/img/'),
        to: 'img/'
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '../example/htmlExample/'),
        to: 'htmlExample/'
      },
      {
        from: path.join(__dirname, '../asset/'),
        to: 'asset/'
      }
    ])
  ],
  resolve: {
    alias: {
      'Hope': path.join(__dirname, '../src/index')
    }
  },
  module: {
    loaders: [
      {
        test: /\.rt$/,
        loader: ['babel-loader', 'react-templates-loader?modules=amd'],
        include: path.join(__dirname, '../example/reactExample/')
      },
      {
        test: /\.js[x]?$/,
        // exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.css/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        loader: 'url-loader?limit=100000&name=[name].[ext]'
      }
    ]
  },
  stats: {
    colors: true
  }
}

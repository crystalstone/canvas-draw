var conf = require('./webpack.config.dev.js')
var WebpackDevServer = require('webpack-dev-server')
var Webpack = require('webpack')
var apiMiddleware = require('../middleware/mockapi')
var bodyParser = require('body-parser')

var server = new WebpackDevServer(Webpack(conf), {
  disableHostCheck: true,
  hot: true
})
server.app.use(bodyParser.urlencoded({ extended: false }))
server.app.use(bodyParser.json())
server.app.use(apiMiddleware)

server.listen(3000, function () {
  console.log('server start')
})

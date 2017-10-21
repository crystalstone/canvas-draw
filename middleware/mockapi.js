/**
* @file: mock api middleware
* @author: wangsy1987@126.com
*/

var path = require('path')

module.exports = function (req, res, next) {
  if (/\/api\//.test(req.originalUrl)) {
    console.log('请求api:' + req.originalUrl)
    console.log(req.originalUrl)
    console.log(req.body)
    console.log(req.query)
    var data = require(path.join(__dirname, '../example/mock') + req.path + '.js')(req, res)
    res.send(data)

  } else {
    next()
  }
}

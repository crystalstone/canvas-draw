export default {

  /**
  * generate uuid
  */
  guid: function () {
    function S4 () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
  },

  /**
  * get angel between 2vector
  * @param {Array} v1 [x, y]
  * @param {Array} v1 [x, y]
  */
  AngleBetween2Vector: function (v1, v2) {
    let v1v2 = v1[0] * v2[0] + v1[1] * v2[1]
    let v1length = Math.sqrt(Math.pow(v1[0], 2) + Math.pow(v1[1], 2))
    let v2length = Math.sqrt(Math.pow(v2[0], 2) + Math.pow(v2[1], 2))
    let cosangel = v1v2 / (v1length * v2length)
    return Math.acos(cosangel) * 180 / Math.PI
  },

  /**
  * canvas xy 2 img xy
  * @param {Array} point point [x, y]
  * @param {Object} ratio ratio
  */
  canvas2imgxy: function (point, ratio) {
    if (point && point.length) {
      if (Object.prototype.toString.call(point[0]) === '[object Array]') {
        let points = []
        point.forEach(item => {
          points.push([
            Math.round(item[0] * ratio.x),
            Math.round(item[1] * ratio.y)
          ])
        })
        return points
      }
      return [
        Math.round(point[0] * ratio.x),
        Math.round(point[1] * ratio.y)
      ]
    }
    return point
  },

  /**
  * img xy 2 canvas xy
  * @param {Array} point point [x, y]
  * @param {Object} ratio ratio
  */
  img2canvasxy: function (point, ratio) {
    if (point && point.length) {
      if (Object.prototype.toString.call(point[0]) === '[object Array]') {
        let points = []
        point.forEach(item => {
          points.push([
            Math.round(item[0] / ratio.x),
            Math.round(item[1] / ratio.y)
          ])
        })
        return points
      }
      return [
        Math.round(point[0] / ratio.x),
        Math.round(point[1] / ratio.y)
      ]
    }
    return point
  },

  /**
  * transform screen xy 2 canvas xy
  * @param {Array} point point [x, y]
  * @param {Object} canvas canvas
  */
  screen2canvasxy: function (point, canvas) {
    if (point && point.length === 2 && canvas) {
      let bbox = canvas.getBoundingClientRect()
      return [
        point[0] - bbox.left * (canvas.width / bbox.width),
        point[1] - bbox.top * (canvas.height / bbox.height)
      ]
    }
    return null
  },

  /**
  * check a point whether in the circle
  * @param {Array} point [x, y]
  * @param {Array} coordinates
  */
  checkPointInCircle: function (point, coordinates, radius) {
    let x = point[0]
    let y = point[1]
    return !!(Math.pow(coordinates[0] - x, 2) + Math.pow(coordinates[1] - y, 2) <= Math.pow(radius, 2))
  },

  /**
  * check a point whether in the polygon
  * @param {Array} point [x, y]
  * @param {Array} coordinates
  */
  checkPointPolygon: function (point, coordinates) {
    let len = coordinates.length
    let w = 0
    for (let i = 0, j = len - 1; i < len; i++) {
      let x0 = coordinates[j][0]
      let y0 = coordinates[j][1]
      let x1 = coordinates[i][0]
      let y1 = coordinates[i][1]
      w += this.windingLine(x0, y0, x1, y1, point[0], point[1])
      j = i
    }
    return w !== 0

    // Ray algorithm
    // if (point && point.length && point.length === 2) {
    //   let crossNum = 0
    //   for (let i = 0, len = coordinates.length - 1; i < len; i++) {
    //     let slope = (coordinates[i + 1][1] - coordinates[i][1]) / (coordinates[i + 1][0] - coordinates[i][0])
    //     let condition1 = (coordinates[i][0] <= point[0]) && (point[0] < coordinates[i + 1][0])
    //     let condition2 = (coordinates[i][0] > point[0]) && (point[0] >= coordinates[i + 1][0])
    //     let above = point[1] < slope * (point[0] - coordinates[i][0]) + coordinates[i][1]
    //
    //     if ((condition1 || condition2) && above) {
    //       ++crossNum
    //     }
    //   }
    //   return (crossNum % 2 !== 0)
    // }
    // return false
  },

  windingLine: function (x0, y0, x1, y1, x, y) {
    // x = x * DEFAULT_PIXEL_RATIO
    // y = y * DEFAULT_PIXEL_RATIO
    if ((y > y0 && y > y1) || (y < y0 && y < y1)) {
      return 0
    }
    if (y1 == y0) {
      return 0
    }
    var dir = y1 < y0 ? 1 : -1
    var t = (y - y0) / (y1 - y0)
    var x_ = t * (x1 - x0) + x0
    return x_ > x ? dir : 0
  }
}

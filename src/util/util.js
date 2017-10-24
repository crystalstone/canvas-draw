export default {

  AngleBetween2Vector: function (v1, v2) {
    let v1v2 = v1[0] * v2[0] + v1[1] * v2[1]
    let v1length = Math.sqrt(Math.pow(v1[0], 2) + Math.pow(v1[1], 2))
    let v2length = Math.sqrt(Math.pow(v2[0], 2) + Math.pow(v2[1], 2))
    let cosangel = v1v2 / (v1length * v2length)
    return Math.acos(cosangel) * 180 / Math.PI
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
    // Ray algorithm
    if (point && point.length && point.length === 2) {
      let crossNum = 0
      for (let i = 0, len = coordinates.length - 1; i < len; i++) {
        let slope = (coordinates[i + 1][1] - coordinates[i][1]) / (coordinates[i + 1][0] - coordinates[i][0])
        let condition1 = (coordinates[i][0] <= point[0]) && (point[0] < coordinates[i + 1][0])
        let condition2 = (coordinates[i][0] > point[0]) && (point[0] >= coordinates[i + 1][0])
        let above = point[1] < slope * (point[0] - coordinates[i][0]) + coordinates[i][1]

        if ((condition1 || condition2) && above) {
          ++crossNum
        }
      }
      return (crossNum % 2 !== 0)
    }
    return false
  }
}

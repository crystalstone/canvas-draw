/**
 * @file: polygon
 * @author: wangshiying@126.com
 */

export default class Polygon {
  constructor (ctx, properties, coordinates) {
    // super(props)
    this.ctx = ctx
    this.uuid = `Polygon_${(new Date()).getTime()}`
    this.state = 'selected' // [show, selected, hover]
    this.tempPoint = null // for mouse move
    this.geojson = {
      type: 'Feature',
      properties: Object.assign({}, properties),
      geometry: {
        type: 'Polygon',
        coordinates: coordinates || []
      }
    }
  }

  /**
  * change polygon state
  * @param {string} state state
  */
  changeState (state) {
    this.state = state
  }

  /**
  * add a temp point to this polygon for mouse moving
  * @param {Array} point [x, y]
  */
  setTempPoint (point) {
    if (point) {
      let canvas = this.ctx.canvas
      var bbox = canvas.getBoundingClientRect()
      this.tempPoint = [
        point[0] - bbox.left * (canvas.width / bbox.width),
        point[1] - bbox.top * (canvas.height / bbox.height)
      ]
    } else {
      this.tempPoint = null
    }
  }

  /**
  * add a point to this polygon
  * @param {Array} point [x, y]
  */
  addPoint (point) {
    // TODO extract transform util

    let canvas = this.ctx.canvas
    var bbox = canvas.getBoundingClientRect()
    let transformPoint = [
      point[0] - bbox.left * (canvas.width / bbox.width),
      point[1] - bbox.top * (canvas.height / bbox.height)
    ]
    let lastPoint = this.geojson.geometry.coordinates[this.geojson.geometry.coordinates.length - 1]
    // if the point is not equal the last point, then add it
    if (!(lastPoint && transformPoint[0] === lastPoint[0] && transformPoint[1] === lastPoint[1])) {
      this.geojson.geometry.coordinates.push(transformPoint)
    }
  }

  /**
  * check a point whether in the polygon
  * @param {HTMLElement} container container
  */
  checkPointInside (point) {
    // Ray algorithm
    if (point && point.length && point.length === 2) {
      let crossNum = 0
      let canvas = this.ctx.canvas
      var bbox = canvas.getBoundingClientRect()
      let transformPoint = [
        point[0] - bbox.left * (canvas.width / bbox.width),
        point[1] - bbox.top * (canvas.height / bbox.height)
      ]

      let coordinates = this.geojson.geometry.coordinates || []
      for (let i = 0, len = coordinates.length - 1; i < len; i++) {
        let slope = (coordinates[i + 1][1] - coordinates[i][1]) / (coordinates[i + 1][0] - coordinates[i][0])
        let condition1 = (coordinates[i][0] <= transformPoint[0]) && (transformPoint[0] < coordinates[i + 1][0])
        let condition2 = (coordinates[i][0] > transformPoint[0]) && (transformPoint[0] >= coordinates[i + 1][0])
        let above = transformPoint[1] < slope * (transformPoint[0] - coordinates[i][0]) + coordinates[i][1]

        if ((condition1 || condition2) && above) {
          ++crossNum
        }
      }
      return (crossNum % 2 !== 0)
    }

    return false
  }

  draw () {
    // TODO extract common part
    switch (this.state) {
      case 'show':
        this.drawSimple()
        break
      case 'selected':
        this.drawSelected()
        break
      case 'hover':
        this.drawHover()
        break
      default:
        this.drawSimple()
    }
  }

  /**
  * draw show state
  */
  drawSimple () {
    let coordinate = this.geojson.geometry.coordinates || []
    if (coordinate && coordinate.length) {
      let point0 = coordinate[0]

      this.ctx.beginPath()
      this.ctx.moveTo(
        point0[0],
        point0[1]
      )

      for (var i = 1, len = coordinate.length; i < len; i++) {
        try {
          let point = coordinate[i]
          this.ctx.lineTo(point[0], point[1])
        } catch (e) {
          console.log(e)
        }
      }

      this.ctx.strokeStyle = '#fff'
      this.ctx.lineWidth = 1
      this.ctx.setLineDash([0, 0])
      this.ctx.lineDashOffset = 0

      this.ctx.closePath()
      this.ctx.stroke()
    }
  }

  /**
  * draw hover state
  */
  drawHover () {
    let coordinate = this.geojson.geometry.coordinates || []
    if (coordinate && coordinate.length) {
      let point0 = coordinate[0]

      this.ctx.beginPath()
      this.ctx.moveTo(
        point0[0],
        point0[1]
      )

      for (var i = 1, len = coordinate.length; i < len; i++) {
        try {
          let point = coordinate[i]
          this.ctx.lineTo(point[0], point[1])
        } catch (e) {
          console.log(e)
        }
      }

      this.ctx.strokeStyle = '#fff000'
      this.ctx.lineWidth = 1
      this.ctx.setLineDash([0, 0])
      this.ctx.lineDashOffset = 0

      this.ctx.closePath()
      this.ctx.stroke()
    }
  }

  /**
  * draw selected state
  */
  drawSelected () {
    let coordinate = this.geojson.geometry.coordinates || []
    if (coordinate && coordinate.length) {
      let point0 = coordinate[0]

      this.ctx.beginPath()
      this.ctx.moveTo(
        point0[0],
        point0[1]
      )

      for (var i = 1, len = coordinate.length; i < len; i++) {
        try {
          let point = coordinate[i]
          this.ctx.lineTo(point[0], point[1])
        } catch (e) {
          console.log(e)
        }
      }

      if (this.tempPoint && this.tempPoint.length && this.tempPoint.length === 2) { // is mouse moveing
        this.ctx.lineTo(this.tempPoint[0], this.tempPoint[1])
      }

      this.ctx.strokeStyle = '#fff'
      this.ctx.lineWidth = 1
      this.ctx.setLineDash([10, 4])
      this.ctx.lineDashOffset = 0

      this.ctx.closePath()
      this.ctx.stroke()

      // 画圆圈
      coordinate && coordinate.forEach(item => {
        this.ctx.beginPath()
        this.ctx.arc(item[0], item[1], 5, 0, 2 * Math.PI)
        this.ctx.fillStyle = '#fff'
        this.ctx.fill()
      })
    }
  }

}

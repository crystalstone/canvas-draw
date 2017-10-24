/**
 * @file: rectangel
 * @author: wangshiying@126.com
 */
import Util from '../util/util'
import BaseShape from './base'

export default class Rectangle extends BaseShape {
  constructor (ctx, properties, imgcoordinates) {
    super(ctx, properties, imgcoordinates)
    this.uuid = `Rectangle_${Util.guid()}`
    this.geojson = {
      type: 'Feature',
      properties: Object.assign({}, properties),
      geometry: {
        type: 'Rectangle',
        imgcoordinates: [],
        coordinates: []
      }
    }

    if (imgcoordinates && imgcoordinates.length) {
      this.geojson.geometry.imgcoordinates = imgcoordinates
      let nodes = Util.img2canvasxy(imgcoordinates, this.getImg2canvasRatio())
      this.geojson.geometry.coordinates = [nodes[0]]
      this.generateCoordinates(nodes[0], nodes[1])
    }
  }

  /**
  * draw out line
  */
  drawOutline (showLabel) {
    let coordinate = this.geojson.geometry.coordinates || []
    let imgcoordinate = this.geojson.geometry.imgcoordinates || []
    let center = [0, 0]
    if (coordinate && coordinate.length) {
      let point0 = coordinate[0]
      center[0] += point0[0]
      center[1] += point0[1]

      this.ctx.beginPath()
      this.ctx.moveTo(
        point0[0],
        point0[1]
      )

      if (this.props.showPointLabel && showLabel) {
        this.drawText(this.fontStyle, `{x: ${imgcoordinate[0][0]}, y: ${imgcoordinate[0][1]}}`, [point0[0], point0[1]])
      }

      for (var i = 1, len = coordinate.length; i < len; i++) {
        try {
          let point = coordinate[i]
          center[0] += point[0]
          center[1] += point[1]

          if (this.props.showPointLabel && showLabel && i === 4) {
            this.drawText(this.fontStyle, `{x: ${imgcoordinate[i][0]}, y: ${imgcoordinate[i][1]}}`, [point[0], point[1]])
          }

          this.ctx.lineTo(point[0], point[1])
        } catch (e) {
          console.log(e)
        }
      }

      if (this.props.showLabel && this.props.label && showLabel) {
        this.drawText(this.fontStyle, this.props.label, [center[0] / coordinate.length, center[1] / coordinate.length])
      }
    }
  }

  /**
  * drag a node of the feature
  * @param {Array} point point
  */
  drag (point) {
    setTimeout(() => {
      if (!this.drapPoint) {
        this.drapPoint = this.checkPointOnNode(point)
      }

      if (this.drapPoint && this.geojson && this.geojson.geometry &&
        this.geojson.geometry.coordinates[this.drapPoint.index]) {
          let index = this.drapPoint.index
          let transformPoint = Util.screen2canvasxy(point, this.ctx.canvas)
          if (!(index % 2)) { // corner point
            let firstPoint = index - 4 >= 0 ? this.geojson.geometry.coordinates[index - 4]
              : this.geojson.geometry.coordinates[index + 4]
            let thirdPoint = transformPoint
            this.drapPoint = { // must change
              index: 4,
              node: thirdPoint
            }
            this.generateCoordinates(firstPoint, thirdPoint)
          } else { // line point drag
            let point1 = this.geojson.geometry.coordinates[index - 1]
            let point2 = index + 1 > 7 ? this.geojson.geometry.coordinates[0]
              : this.geojson.geometry.coordinates[index + 1]
            this.geojson.geometry.coordinates[this.drapPoint.index]

            if (Math.abs(point1[0] - point2[0]) > Math.abs(point1[1] - point2[1])) { // y equal
              point1[1] = point2[1] = this.geojson.geometry.coordinates[this.drapPoint.index][1] = transformPoint[1]
            } else { // x equql
              point1[0] = point2[0] = this.geojson.geometry.coordinates[this.drapPoint.index][0] = transformPoint[0]
            }

            this.generateCoordinates(
              this.geojson.geometry.coordinates[0],
              this.geojson.geometry.coordinates[4]
            )

          }
      }
    }, 0)
  }

  /**
  * stop drag
  */
  stopDrag () {
    this.drapPoint = null
  }

  /**
  * check a point whether in the polygon
  * @param {HTMLElement} container container
  */
  checkPointInside (point) {
    let transformPoint = Util.screen2canvasxy(point, this.ctx.canvas)
    let coordinates = this.geojson.geometry.coordinates || []
    return Util.checkPointPolygon(transformPoint, coordinates)
  }

  /**
  * generate 4 points for rectangle
  * @param {Array} firstPoint the first point
  * @param {Array} thirdPoint the third point
  */
  generateCoordinates (firstPoint, thirdPoint) {
    // let firstPoint = this.geojson.geometry.coordinates[0]
    if (firstPoint && firstPoint.length === 2 && thirdPoint && thirdPoint.length === 2) {
      let isSameDireaction = true
      let point1 = null
      let point2 = null

      let angle = Util.AngleBetween2Vector(
        [1, 0],
        [thirdPoint[0] - firstPoint[0], thirdPoint[1] - firstPoint[1]]
      )

      let vangle = Util.AngleBetween2Vector(
        [0, 1],
        [thirdPoint[0] - firstPoint[0], thirdPoint[1] - firstPoint[1]]
      )

      let c = Math.sqrt(Math.pow((thirdPoint[0] - firstPoint[0]), 2) +
        Math.pow((thirdPoint[1] - firstPoint[1]), 2))

      if (angle > 90) {
        angle = 180 - angle
        isSameDireaction = false
      }

      let width = c * Math.cos(Math.PI / 180 * angle)
      let height = c * Math.sin(Math.PI / 180 * angle)

      if (vangle > 90) {
        height = height * -1
      }

      if (isSameDireaction) {
        point1 = [(firstPoint[0] + width), firstPoint[1]]
        point2 = [firstPoint[0], (firstPoint[1] + height)]
      } else {
        point1 = [firstPoint[0] - width, firstPoint[1]]
        point2 = [firstPoint[0], (firstPoint[1] + height)]
      }

      let nodes = [
        firstPoint,
        [(firstPoint[0] + point1[0]) / 2, (firstPoint[1] + point1[1]) / 2],
        point1,
        [(thirdPoint[0] + point1[0]) / 2, (thirdPoint[1] + point1[1]) / 2],
        thirdPoint,
        [(thirdPoint[0] + point2[0]) / 2, (thirdPoint[1] + point2[1]) / 2],
        point2,
        [(firstPoint[0] + point2[0]) / 2, (firstPoint[1] + point2[1]) / 2]
      ]

      this.geojson.geometry.coordinates = nodes
      let transNodes = Util.canvas2imgxy(nodes, this.getImg2canvasRatio())
      this.geojson.geometry.imgcoordinates = transNodes
    }
  }

  /**
  * add a temp point to this polygon for mouse moving
  * @param {Array} point [x, y]
  */
  setTempPoint (point) {
    if (point) {
      this.tempPoint = Util.screen2canvasxy(point, this.ctx.canvas)
      this.generateCoordinates(this.geojson.geometry.coordinates[0], this.tempPoint)
    } else {
      this.tempPoint = null
    }
  }

  /**
  * add a point to this polygon
  * @param {Array} point [x, y]
  */
  addPoint (point) {
    this.state = 'selected'
    let transformPoint = Util.screen2canvasxy(point, this.ctx.canvas)
    // if the point is not equal the last point, then add it
    if (this.geojson.geometry.coordinates.length > 0) {
      this.generateCoordinates(this.geojson.geometry.coordinates[0], transformPoint)
    } else {
      this.geojson.geometry.coordinates.push(transformPoint)
    }
  }

  /**
  * draw selected state
  */
  drawSelected () {
    this.drawOutline()
    this.ctx.closePath()
    this.drawStyle(this.selectedStyle)
    let coordinate = this.geojson.geometry.coordinates || []

    // 画圆圈
    coordinate && coordinate.forEach((item, index) => {
      this.ctx.beginPath()

      if (index % 2) {
        this.ctx.rect(item[0] - 4, item[1] - 4, 8, 8)
        this.ctx.fillStyle = this.selectedStyle && this.selectedStyle.strokeColor ||
          this.selectedStyle && this.selectedStyle.fillColor
        this.ctx.fill()
      } else {
        this.ctx.arc(item[0], item[1], 3, 0, 2 * Math.PI)
        this.ctx.fillStyle = this.selectedStyle && this.selectedStyle.strokeColor ||
          this.selectedStyle && this.selectedStyle.fillColor
        this.ctx.fill()
      }
    })
    this.ctx.closePath()
  }
}

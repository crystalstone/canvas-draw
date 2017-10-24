/**
 * @file: polygon
 * @author: wangshiying@126.com
 */
import Util from '../util/util'
import BaseShape from './base'

export default class Polygon extends BaseShape {
  constructor (ctx, properties, imgcoordinates) {
    super(ctx, properties, imgcoordinates)

    this.uuid = `Polygon_${(new Date()).getTime()}`
    this.geojson = {
      type: 'Feature',
      properties: Object.assign({}, properties),
      geometry: {
        type: 'Polygon',
        imgcoordinates: imgcoordinates || [],
        coordinates: Util.img2canvasxy(imgcoordinates, this.getImg2canvasRatio()) || []
      }
    }
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
  * draw selected state
  */
  drawSelected () {
    this.drawOutline()
    if (this.tempPoint && this.tempPoint.length && this.tempPoint.length === 2) { // is mouse moveing
      this.ctx.lineTo(this.tempPoint[0], this.tempPoint[1])
    }
    this.ctx.closePath()
    this.drawStyle(this.selectedStyle)
    let coordinate = this.geojson.geometry.coordinates || []

    // 画圆圈
    coordinate && coordinate.forEach(item => {
      this.ctx.beginPath()
      this.ctx.arc(item[0], item[1], 3, 0, 2 * Math.PI)
      this.ctx.fillStyle = this.selectedStyle && this.selectedStyle.strokeColor ||
        this.selectedStyle && this.selectedStyle.fillColor
      this.ctx.fill()
    })
    this.ctx.closePath()
  }
}

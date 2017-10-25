/**
 * @file: base shape
 * @author: wangshiying@126.com
 */
import Util from '../util/util'

export default class BaseShape {
  constructor (ctx, properties, imgcoordinates) {
    this.ctx = ctx.ctx
    this.img = ctx.img

    this.state = 'show' // 'selected' // [show, selected, hover]
    this.tempPoint = null // for mouse move
    this.movePoint = null
    this.drapPoint = null
    this.props = properties || {}

    this.changePorprities()
  }

  /**
  * change properties
  * @param {string} key string
  * @param {string|number} v v
  */
  changePorprities (key, v) {
    if (arguments.length === 2) {
      this.props[key] = v
    }

    this.fontStyle = Object.assign({}, {
      fillColor: '#ffffe0',
      font: '15px serif'
    }, this.props.fontStyle || {})

    this.baseStyle = Object.assign({}, {
      strokeColor: '#ffffe0',
      lineWidth: 1,
      lineCap: 'round',
      lineJoin: 'round'
    }, this.props.baseStyle || {})

    this.hoverStyle = Object.assign({}, this.baseStyle, this.props.hoverStyle || {
      strokeColor: '#fffff0',
      lineWidth: 2
    })

    this.selectedStyle = Object.assign({}, this.baseStyle, this.props.selectedStyle || {
      lineDashOffset: 0,
      lineDash: [10, 4]
    })

  }

  /**
  * getImg2canvasRatio
  */
  getImg2canvasRatio () {
    return {
      x: this.img.width / this.ctx.canvas.width,
      y: this.img.height / this.ctx.canvas.height
    }
  }

  /**
  * drag a node of the feature
  * @param {Array} point point
  */
  drag (point) {
    if (!this.drapPoint) {
      this.drapPoint = this.checkPointOnNode(point)
    }

    if (this.drapPoint && this.geojson && this.geojson.geometry &&
      this.geojson.geometry.coordinates[this.drapPoint.index]) {
      this.geojson.geometry.coordinates[this.drapPoint.index] = Util.screen2canvasxy(point, this.ctx.canvas)
      this.geojson.geometry.imgcoordinates[this.drapPoint.index] = Util.canvas2imgxy(
        this.geojson.geometry.coordinates[this.drapPoint.index],
        this.getImg2canvasRatio()
      )
    }
  }

  /**
  * stop drag
  */
  stopDrag () {
    this.drapPoint = null
  }

  /**
  * move the feature
  * @param {Array} point point
  */
  move (point) {
    if (!this.movePoint) {
      this.movePoint = point
      return
    }

    let range = [
      point[0] - this.movePoint[0],
      point[1] - this.movePoint[1]
    ]
    this.geojson && this.geojson.geometry && this.geojson.geometry.coordinates.forEach(coordinate => {
      coordinate[0] += range[0]
      coordinate[1] += range[1]
    })

    this.movePoint = point
  }

  /**
  * stop move the feature
  */
  stopMove () {
    this.geojson.geometry.imgcoordinates = Util.canvas2imgxy(
      this.geojson.geometry.coordinates,
      this.getImg2canvasRatio()
    )
    this.movePoint = null
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
      this.tempPoint = Util.screen2canvasxy(point, this.ctx.canvas)
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
    let lastPoint = this.geojson.geometry.coordinates[this.geojson.geometry.coordinates.length - 1]
    // if the point is not equal the last point, then add it
    if (!(lastPoint && transformPoint && transformPoint[0] === lastPoint[0] && transformPoint[1] === lastPoint[1])) {
      this.geojson.geometry.coordinates.push(transformPoint)
      this.geojson.geometry.imgcoordinates.push(Util.canvas2imgxy(transformPoint, this.getImg2canvasRatio()))
    }
  }

  /**
  * check a point whether in the nodes
  * @param {Array} point point
  */
  checkPointOnNode (point) {
    let transformPoint = Util.screen2canvasxy(point, this.ctx.canvas)

    for (let i = 0, len = this.geojson.geometry.coordinates.length; i < len; i++) {
      let coordinate = this.geojson.geometry.coordinates[i]
      if (Util.checkPointInCircle(transformPoint, coordinate, 3)) {
        return {
          index: i,
          node: coordinate
        }
      }
    }
    return null
  }

  /**
  * check a point whether inside
  * @param {Array} point point
  */
  checkPointInside (point) {
    let transformPoint = Util.screen2canvasxy(point, this.ctx.canvas)
    return !!this.ctx.isPointInPath(transformPoint[0], transformPoint[1])
  }

  /**
  * draw
  */
  draw () {
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
  * draw text
  */
  drawText (style, text, point) {
    if (style.fillColor) {
      this.ctx.fillStyle = style.fillColor
    }

    if (style.strokeColor) {
      this.ctx.strokeStyle = style.strokeColor
    }

    if (style.font) {
      this.ctx.font = style.font
    }

    if (style.fillColor) {
      this.ctx.fillText(text, point[0], point[1])
    }

    if (style.strokeColor) {
      this.ctx.strokeText(text, point[0], point[1])
    }
  }

  /**
  * draw style
  */
  drawStyle (style) {
    if (style.fillColor) {
      this.ctx.fillStyle = style.fillColor
    }

    if (style.strokeColor) {
      this.ctx.strokeStyle = style.strokeColor
    }

    if (style.lineWidth) {
      this.ctx.lineWidth = style.lineWidth
    }

    this.ctx.setLineDash(style.lineDash || [10, 0])
    this.ctx.lineDashOffset = style.lineDashOffset || 0

    if (style.fillColor) {
      this.ctx.fill()
    }

    if (style.strokeColor) {
      this.ctx.stroke()
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

          if (this.props.showPointLabel && showLabel) {
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
  * draw show state
  */
  drawSimple () {
    this.drawOutline(true)
    this.ctx.closePath()
    this.drawStyle(this.baseStyle)
  }

  /**
  * draw hover state
  */
  drawHover () {
    this.drawOutline(true)
    this.ctx.closePath()
    this.drawStyle(this.hoverStyle)
  }

  /**
  * draw selected state
  */
  drawSelected () {}
}

/**
 * @file: main file
 * @author: wangshiying@126.com
 */

import Polygon from './shape/Polygon'
// device pixel
const ration = (typeof window !== 'undefined' && window.devicePixelRatio) || 1
const CANVAS_MOEL = {
  'Polygon': Polygon
}

export default class Hope {

  /**
  * constructor of hope
  * @param {string} containerId containerId
  * @param {Object} options
  * {
  *   width: 500, // container width
  *   height: 800, // container height
  *   ration: 1 // retaina screen is 2
  * }
  */
  constructor (containerId, options) {
    if (containerId && document.getElementById(containerId)) {
      this.model = null
      this.optState = 'prepareing' // [prepareing, prepared, drawing, editing]

      this.container = document.getElementById(containerId)
      this.options = Object.assign({}, {
        width: this.container.offsetWidth,
        height: this.container.offsetHeight,
        ration: ration
      }, options || {})

      this.featureList = {}
      this.currentFeature = null

      // this.options.width = this.options.width * this.options.ration
      // this.options.height = this.options.height * this.options.ration

      this.options.width = this.options.width
      this.options.height = this.options.height

      this.container.style.width = `${this.options.width}px`
      this.container.style.height = `${this.options.height}px`

      this.initContext()
      this.initEvent()

    } else {
      console.error('please confirm the container ID is useful!')
    }
  }

  /**
  * append a canvas ele to container
  */
  initContext () {
    let canvas = document.createElement('canvas')
    let imgCanvas = document.createElement('canvas')
    canvas.width = this.options.width
    canvas.height = this.options.height
    canvas.style.position = 'absolute'
    canvas.style.top = '0px'
    canvas.style.left = '0px'
    canvas.id = `${(new Date()).getTime()}_draw_canvas`

    imgCanvas.width = this.options.width
    imgCanvas.height = this.options.height
    imgCanvas.style.position = 'absolute'
    imgCanvas.style.top = '0px'
    imgCanvas.style.left = '0px'
    imgCanvas.id = `${(new Date()).getTime()}_img_canvas`

    this.container.style.position = 'relative'

    this.container && this.container.appendChild(imgCanvas)
    this.container && this.container.appendChild(canvas)

    this.canvas = canvas
    this.imgCanvas = imgCanvas
    this.ctx = this.canvas.getContext('2d')
    this.imgCtx = this.imgCanvas.getContext('2d')
  }

  /**
  * add img to canvas
  * @param {string} imgUrl img url
  */
  loadImg (imgUrl) {
    if (imgUrl) {
      let img = new Image()
      img.src = imgUrl
      img.onload = () => {
        this.imgCtx.drawImage(img, 0, 0, this.imgCanvas.width, this.imgCanvas.height)
      }

    } else {
      console.error('please confirm the img url ID is useful!')
    }
  }

  /**
  * change draw type
  * @param {String} type type must belong CANVAS_MOEL
  * @param {Object} options model options
  */
  changeModel (type, options) {
    if (CANVAS_MOEL[type]) {
      this.model = {
        type: type,
        options: options
      }
      this.changeOptState('prepared')
    } else if (!type) {
      this.model = null
      this.changeOptState('prepareing')
    } else {
      console.error(`can not draw ${type}`)
    }
  }

  /**
  * change opt state
  * @param {String} type type [prepareing, prepared, drawing, editing]
  */
  changeOptState (type) {
    this.optState = type
    // TODO: MOUSE TYPE
  }

  /**
  * add event to canvas
  */
  initEvent () {
    this.container.addEventListener('click', (e) => { this.clickHandler(e) })
    this.container.addEventListener('dblclick', (e) => { this.dblclickHandler(e) })
    this.container.addEventListener('mousemove', (e) => { this.mouseMoveHandler(e) })
  }

  /**
  * click handler for canvas
  * @param {Object} e event
  */
  clickHandler (e) {
    switch (this.optState) {
      case 'prepared': // add a new feature
        this.optState = 'drawing'
        let feature = this.currentFeature = new CANVAS_MOEL[this.model.type](this.ctx, this.model.options)
        feature.addPoint([
          e.pageX,
          e.pageY
        ])
        this.featureList[feature.uuid] = feature
        this.reRender()
        break
      case 'drawing': // drawing feature
        this.currentFeature.addPoint([
            e.pageX,
            e.pageY
        ])
        this.reRender()
        break
      default:
    }
  }

  /**
  * double click handler for canvas
  * @param {Object} e event
  */
  dblclickHandler (e) {
    this.currentFeature && this.currentFeature.setTempPoint(null)
    this.currentFeature && this.currentFeature.changeState('show')
    this.reRender()
    this.changeOptState('prepared') // exit drawing
  }

  /**
  * mouse move handler for canvas
  * @param {Object} e event
  */
  mouseMoveHandler (e) {
    switch (this.optState) {
      case 'prepareing':
      case 'prepared':
        this.hoverRender(e)
        break
      case 'drawing': // drawing feature
        if (this.currentFeature) {
          this.currentFeature.setTempPoint([
              e.pageX,
              e.pageY
          ])
          this.reRender()
        }
        break
      default:
    }
  }

  /**
  * hover render
  */
  hoverRender (e) {
    let hoverFeatureUuid = null
    for (let key in this.featureList) {
      if (this.featureList.hasOwnProperty(key) &&
        this.featureList[key].checkPointInside([e.pageX, e.pageY])) {
        hoverFeatureUuid = key
        break
      }
    }

    for (let key in this.featureList) {
      if (this.featureList.hasOwnProperty(key) &&
        hoverFeatureUuid === key) {
        this.featureList[key].changeState('hover')
      } else {
        this.featureList[key].changeState('show')
      }
    }

    this.reRender()
  }

  /**
  * render again
  */
  reRender () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    for (let key in this.featureList) {
      if (this.featureList.hasOwnProperty(key)) {
        this.featureList[key].draw()
      }
    }
  }

}

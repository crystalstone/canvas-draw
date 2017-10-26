/**
 * @file: main file
 * @author: wangshiying@126.com
 */

import Polygon from './shape/Polygon'
import Rectangle from './shape/Rectangle'
import EventEmit from 'event-emitter'

// device pixel
const ration = (typeof window !== 'undefined' && window.devicePixelRatio) || 1
const CANVAS_MOEL = {
  'Polygon': Polygon,
  'Rectangle': Rectangle
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
      this.filter = null
      this.hoverFeatureUuid = null
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
    canvas.width = this.options.width
    canvas.height = this.options.height
    canvas.style.position = 'absolute'
    canvas.style.top = '0px'
    canvas.style.left = '0px'
    canvas.id = `${(new Date()).getTime()}_draw_canvas`

    this.container.style.position = 'relative'
    this.container && this.container.appendChild(canvas)
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
  }

  /**
  * add img to canvas
  * @param {string} imgUrl img url
  * @param {Function} cb cb
  */
  loadImg (imgUrl, cb) {
    this.img = null
    if (imgUrl) {
      let img = new Image()
      img.src = imgUrl
      img.onload = () => {
        if (!this.imgCtx) {
          let imgCanvas = document.createElement('canvas')
          imgCanvas.width = this.options.width
          imgCanvas.height = this.options.height
          imgCanvas.style.position = 'absolute'
          imgCanvas.style.top = '0px'
          imgCanvas.style.left = '0px'
          imgCanvas.id = `${(new Date()).getTime()}_img_canvas`
          this.container && this.container.insertBefore(imgCanvas, this.canvas)
          this.imgCanvas = imgCanvas
          this.img = img
          this.imgCtx = this.imgCanvas.getContext('2d')
        }
        this.imgCtx.drawImage(img, 0, 0, this.imgCanvas.width, this.imgCanvas.height)
        cb && cb()
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
  }

  /**
  * delete a feature
  * @param {Object} feature feature
  */
  deleteFeature (feature) {
    if (feature && feature.uuid) {
      delete this.featureList[feature.uuid]
      this.reRender()
    }
  }

  /**
  * add feature
  * @param {Array|Object} feature feature
  */
  addFeature (feature) {
    if (!this.img) {
      console.error('img is not prepared or loaded, please addfeature after load img')
    }
    if (Object.prototype.toString.call(feature) === '[object Array]') {
      feature && feature.length && feature.forEach(item => {
        if (item.type && CANVAS_MOEL[item.type]) {
          let newFeature = new CANVAS_MOEL[item.type](
            {
              ctx: this.ctx,
              img: this.img
            },
            item.properties || {},
            item.coordinate || []
          )
          this.featureList[newFeature.uuid] = newFeature
        }
      })
    } else {
      if (feature.type && CANVAS_MOEL[feature.type]) {
        let newFeature = new CANVAS_MOEL[feature.type](
          {
            ctx: this.ctx,
            img: this.img
          },
          feature.properties || {},
          feature.coordinate || []
        )
        this.featureList[newFeature.uuid] = newFeature
      }
    }

    this.reRender()
  }

  /**
  * add event to canvas
  */
  initEvent () {
    this.container.addEventListener('click', (e) => { this.clickHandler(e) })
    this.container.addEventListener('dblclick', (e) => { this.dblclickHandler(e) })
    this.container.addEventListener('mousemove', (e) => { this.mouseMoveHandler(e) })
    this.container.addEventListener('mousedown', (e) => { this.mouseDownHandler(e) })
    document.addEventListener('keydown', (e) => { this.onkeydownHandler(e) })
  }

  /**
  * key down handler
  * @param {Object} e event
  */
  onkeydownHandler (e) {
    if (e && e.keyCode === 27 && this.optState === 'editing') { // exit drawing or editing
      this.finish()
    }

    if (e && e.keyCode === 67 && this.optState === 'drawing') { // c 67 cancel
      this.deleteFeature(this.currentFeature)
      this.currentFeature = null
      this.reRender()
      if (this.model) {
        this.changeOptState('prepared')
      } else {
        this.changeOptState('prepareing')
      }
    }
  }

  /**
  * click handler for canvas
  * @param {Object} e event
  */
  clickHandler (e) {
    e.preventDefault()
  　e.stopPropagation()

    switch (this.optState) {
      case 'prepareing': // selected a feature
        for (let key in this.featureList) {
          if (this.featureList.hasOwnProperty(key) &&
            this.featureList[key].checkPointInside([e.pageX, e.pageY])) {
            this.currentFeature = this.featureList[key]
            this.featureList[key].changeState('selected')
            this.optState = 'editing'

            this.emit('select', this.currentFeature.uuid)
            break
          }
        }
        this.reRender()
        break
      case 'prepared': // add a new feature
        this.optState = 'drawing'
        let feature = this.currentFeature = new CANVAS_MOEL[this.model.type](
          {
            ctx: this.ctx,
            img: this.img
          },
          this.model.options
        )
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
        break
    }
    return false
  }

  /**
  * double click handler for canvas
  * @param {Object} e event
  */
  dblclickHandler (e) {
    e.preventDefault()
  　e.stopPropagation()
    switch (this.optState) {
      case 'prepareing': // selected a feature
        break
      case 'prepared': // add a new feature
        break
      case 'drawing':
        this.changeOptState('editing')
      case 'editing': // drawing feature
        this.currentFeature && this.currentFeature.setTempPoint(null)
        break
      default:
        break
    }
    return false
  }

  mouseDownHandler (e) {
    e.preventDefault()
  　e.stopPropagation()
    e.cancelBubble = true
    e.returnValue = false
    return false
  }

  /**
  * mouse move handler for canvas
  * @param {Object} e event
  */
  mouseMoveHandler (e) {
    e.preventDefault()
  　e.stopPropagation()
    e.cancelBubble = true
    e.returnValue = false

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
      case 'editing': // editing feature
        if (this.currentFeature) {
          if (this.currentFeature.drapPoint || this.currentFeature.checkPointOnNode([e.pageX, e.pageY])) {
            this.container.style.cursor = 'crosshair'
            if (e.buttons === 1) {
              this.currentFeature.drag([e.pageX, e.pageY])
              this.reRender()
            } else {
              this.currentFeature.stopDrag()
            }

            return false

          } else if (this.currentFeature.checkPointInside([e.pageX, e.pageY])) {
            this.container.style.cursor = 'move'
            if (e.buttons === 1) {
              this.currentFeature.move([e.pageX, e.pageY])
              this.reRender()
            } else {
              this.currentFeature.stopMove()
            }

            return false
          }
        }

        if (this.model) {
          this.container.style.cursor = 'auto'
        } else {
          this.container.style.cursor = 'pointer'
        }

        break
      default:
        break
    }
    return false
  }

  /**
  * hover render
  * @param {Object} e event
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

    if (hoverFeatureUuid) {
      this.container.style.cursor = 'move'
    } else {
      if (this.model) {
        this.container.style.cursor = 'auto'
      } else {
        this.container.style.cursor = 'pointer'
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

    if (this.hoverFeatureUuid !== hoverFeatureUuid) {
      this.reRender()
      this.hoverFeatureUuid = hoverFeatureUuid
    }
  }

  /**
  * render again
  */
  reRender () {
    setTimeout(() => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      for (let key in this.featureList) {
        if (this.featureList.hasOwnProperty(key) && this.matchFilter(this.featureList[key], this.filter)) {
          this.featureList[key].draw()
        }
      }
    }, 0)
  }

  /**
  * is match the filter
  * @param {Object} feature feature
  * @param {Object} filter filter
  */
  matchFilter (feature, filter) {
    if (!this.filter) {
      return true
    }
    let v = feature.props[this.filter.key]
    switch (this.filter.opt) {
      case 'in':
        let flag = false
        this.filter.value && this.filter.value.forEach(item => {
          if (item === v) {
            flag = true
          }
        })
        return flag
        break
      case 'not-in':
        let flag1 = true
        this.filter.value && this.filter.value.forEach(item => {
          if (item === v) {
            flag1 = false
          }
        })
        return flag1
        break
      case 'equal':
        return !!(feature.props[this.filter.key] === this.filter.value)
        break
      case 'not-equal':
        return !!(feature.props[this.filter.key] !== this.filter.value)
        break
      default:
        return true
    }
  }

  /**
  * set filter
  * @param {string} key properties key
  * @param {string} opt [in, not-in, equal, not-equal]
  * @param {string|number} v key value
  */
  setFilter (key, opt, v) {
    if (arguments.length === 3) {
      this.filter = {
        key,
        opt,
        value: v
      }
    } else {
      this.filter = null
    }
    this.reRender()
  }

  /**
  * change properties
  * @param {Object} filter filter
  * @param {string} key key
  * @param {string|number} value value
  */
  changePorprities (filter, propskey, value) {
    for (let key in this.featureList) {
      if (this.featureList.hasOwnProperty(key) && this.matchFilter(this.featureList[key], filter)) {
        this.featureList[key].changePorprities(propskey, value)
      }
    }

    this.reRender()
  }

  /**
  * finish current draw|edit
  */
  finish () {
    if (this.currentFeature) {
      this.currentFeature.changeState('show')
      this.reRender()
    }

    this.emit('finish', this.currentFeature.uuid)
    if (this.model) {
      this.changeOptState('prepared')
    } else {
      this.changeOptState('prepareing')
    }
    this.currentFeature = null
  }

}

EventEmit(Hope.prototype)

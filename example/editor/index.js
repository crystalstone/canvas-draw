/**
 * @file: lane editor
 * @author: wangshying@didichuxing.com
 */

import {Component} from 'react'
import Theme from './theme'
import tpl from './tpl.rt'
import './style.less'

export default class App extends Component {

  constructor (props) {
    super(props)

    this.state = {
      shape: '-1',
      label: 'show',
      pointLabel: 'show',
      filter: '-1',
      labelType: 'Person'
    }

  }

  componentWillReceiveProps (nextProps) {}

  componentDidMount () {
    http.get('getData').then(
      function (res) {
        let data = res.data
        if (data.code === 200) {
          let shapes = []
          // 处理下数据
          data.data[0].label.forEach(item => {
            let type = item.position.length === 2 ? 'Rectangle' : 'Polygon'
            let label = item.name
            let theme = JSON.parse(JSON.stringify(Theme[type][label] || {baseStyle: {}})) // 为了防止传入引用
            theme.baseStyle.strokeColor = item.color
            let coordinate = []
            item.position.forEach(item => {
              coordinate.push([item.x, item.y])
            })

            shapes.push({ // 必须说明，添加shape的类型、属性、坐标，属性的各种配置，请看theme文件
              type: type,
              properties: theme,
              coordinate: coordinate
            })
          })

          hope.loadImg(data.data[0].imgUrl, () => { // 加载一张图片
            // 将shape 进行绘制
            hope.addFeature(shapes)
          })
        }
      },
      function (res) {

      }
    )
  }

  change (type, v) {
    this.state[type] = v
    this.setState(this.state, () => {
      if (this.state.shape == -1) {
        hope && hope.changeModel(null)
      } else {
        let conf = Theme[this.state.shape][this.state.labelType] || {}
        conf.showLabel = this.state.label === 'show' ? true : false
        conf.showPointLabel = this.state.pointLabel === 'show' ? true : false

        hope && hope.changeModel(
          this.state.shape,
          Theme[this.state.shape][this.state.labelType]
        )
      }
    })
  }

  /**
  * label 是不是显示
  */
  changeLabel (v) {
    this.setState({
      label: v
    })

    hope.changePorprities({
      key: 'showLabel',
      opt: 'in',
      value: [true, false]
    }, 'showLabel', (v === 'show' ? true : false))
  }

  /**
  * pointLabel 是不是显示
  */
  changepointLabel (v) {
    this.setState({
      pointLabel: v
    })

    hope.changePorprities({
      key: 'showPointLabel',
      opt: 'in',
      value: [true, false]
    }, 'showPointLabel', (v === 'show' ? true : false))
  }

  changeFilter (v) {
    this.setState({
      filter: v
    })
    if (v == -1) {
      hope.setFilter()
      return
    }
    hope.setFilter('label', 'equal', v)
  }

  /**
   * delete
   */
  delete () {
    hope.deleteFeature(hope.currentFeature)
  }

  save () {

  }

  render () {
    return tpl.apply(this)
  }
}

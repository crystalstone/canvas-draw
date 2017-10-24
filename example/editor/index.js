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

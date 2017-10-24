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
        hope && hope.changeModel(
          this.state.shape,
          Theme[this.state.shape][this.state.labelType]
        )
      }
    })
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

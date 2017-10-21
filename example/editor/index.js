/**
 * @file: lane editor
 * @author: wangshying@didichuxing.com
 */

import {Component} from 'react'
import tpl from './tpl.rt'
import './style.less'

export default class App extends Component {

  constructor (props) {
    super(props)

    this.state = {
      shape: 'Polygon',
      labelType: 'Person'
    }

    // begin to draw, so you must change draw model
    hope && hope.changeModel(
      this.state.shape,
      {
        label: this.state.labelType
      }
    )
  }

  componentWillReceiveProps (nextProps) {}


  change (type, v) {
    this.state[type] = v
    this.setState(this.state)
  }

  render () {
    return tpl.apply(this)
  }
}

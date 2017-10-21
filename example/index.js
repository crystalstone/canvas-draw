import Hope from 'Hope'
import './style.less'

let hope = window.hope = new Hope(
  'root', // canvas container id
  {
    showAxis: false // show or hide axis
  }
)

hope.loadImg('/img/002.jpg')



// for example
import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.less'
import Editor from './editor'

ReactDOM.render(
  <Editor />,
  document.getElementById('editor')
)

import Hope from 'Hope'
import './style.less'
import axios from 'axios'
window.http = axios.create({
  baseURL: '/api/',
  timeout: 3000,
  headers: {
    'x-requested-with': 'XMLHttpRequest'
  }
})


let hope = window.hope = new Hope(
  'root', // canvas container id
  {
    width: 800, // 设置画布大小
    height: 500
  }
)

// for example
import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.less'
import Editor from './editor'

ReactDOM.render(
  <Editor />,
  document.getElementById('editor')
)

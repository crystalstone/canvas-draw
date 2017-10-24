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
)

hope.loadImg('/img/002.jpg', () => {
  // load 这个图片上的数据
})



// for example
import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.less'
import Editor from './editor'

ReactDOM.render(
  <Editor />,
  document.getElementById('editor')
)

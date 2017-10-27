
var hope = new Hope(
  'root', // canvas container id
  {
    // width: 800, 设置画布大小
    // height: 500
  }
)


var testData = [
  {
    imgUrl: './002.jpg',
    label: [
      {
        position: [{x: 5, y: 5}, {x: 30, y: 30}],
        name: 'Police',
        color: 'blue'
      },
      {
        position: [{x: 55, y: 35}, {x: 160, y: 50}],
        name: 'Person',
        color: 'red'
      },
      {
        position: [{x: 135, y: 85}, {x: 200, y: 30}, {x: 145, y: 65}, {x: 100, y: 100}],
        name: 'Police',
        color: 'yellow'
      },
      {
        position: [{x: 105, y: 105}, {x: 155, y: 155}],
        name: 'Person',
        color: 'yellow'
      }
    ]
  }
]

var Theme = {
  Polygon: {
    Person: {
      label: 'Person',
      showLabel: true,
      showPointLabel: true,
      fontStyle: {
        fillColor: '#fff'
      },
      baseStyle: {
        strokeColor: 'rgba(255, 255, 255, 0.8)',
        lineWidth: 1,
        lineCap: 'round',
        lineJoin: 'round'
      },
      hoverStyle: {
        fillColor: null,
        strokeColor: 'rgba(255, 255, 255, 1)',
        lineWidth: 2
      },
      selectedStyle: {
        fillColor: null,
        strokeColor: '#fff',
        lineDashOffset: 0,
        lineDash: [10, 4]
      }
    },
    Police: {
      label: 'Police',
      showLabel: true,
      showPointLabel: true,
      fontStyle: {
        fillColor: '#ff0000'
      },
      baseStyle: {
        fillColor: 'rgba(255, 205, 205, 0.3)',
        strokeColor: 'rgba(255, 205, 205, 0.8)',
        lineWidth: 1,
        lineCap: 'round',
        lineJoin: 'round'
      },
      hoverStyle: {
        fillColor: null,
        strokeColor: 'rgba(255, 205, 205, 0.9)',
        lineWidth: 2
      },
      selectedStyle: {
        fillColor: null,
        strokeColor: 'rgba(255, 205, 205, 1)',
        lineDashOffset: 5,
        lineDash: [10, 4]
      }
    }
  },
  Rectangle: {
    Person: {
      label: 'Person',
      showLabel: true,
      showPointLabel: true,
      fontStyle: {
        fillColor: '#fff'
      },
      baseStyle: {
        strokeColor: 'rgba(255, 105, 255, 0.8)',
        lineWidth: 1,
        lineCap: 'round',
        lineJoin: 'round'
      },
      hoverStyle: {
        fillColor: null,
        strokeColor: 'rgba(255, 105, 255, 1)',
        lineWidth: 2
      },
      selectedStyle: {
        fillColor: null,
        strokeColor: '#fff',
        lineDashOffset: 0,
        lineDash: [10, 4]
      }
    },
    Police: null
  }
}

var shapes = []
for (var i = 0, len = testData[0].label.length; i < len; i++) {
  var item = testData[0].label[i]
  let type = item.position.length === 2 ? 'Rectangle' : 'Polygon'
  let label = item.name
  let theme = JSON.parse(JSON.stringify(Theme[type][label] || {baseStyle: {}})) // 为了防止传入引用
  theme.baseStyle.strokeColor = item.color
  let coordinate = []
  item.position.forEach(item => {
    coordinate.push([item.x, item.y])
  })

  shapes.push({ // 必须说明，添加shape的类型、属性、坐标，属性的各种配置，请看theme
    type: type,
    properties: theme,
    coordinate: coordinate
  })
}

hope.loadImg(testData[0].imgUrl, function () { // 加载一张图片
  // 将shape 进行绘制
  hope.addFeature(shapes)
})

$('#shape').on('change', function (e) {
  var shape = e.target.value
  if (shape != -1) {
    hope && hope.changeModel(
      shape,
      Theme[shape][$('#label-type').val()]
    )
  } else {
    hope && hope.changeModel()
  }
})

$('#label-type').on('change', function (e) {
  var shape = $('#shape').val()
  if (shape != -1) {
    hope && hope.changeModel(
      shape,
      Theme[shape][$('#label-type').val()]
    )
  } else {
    hope && hope.changeModel()
  }
})

$('#filter').on('change', function (e) {
  var filter = e.target.value
  if (filter != -1) {
    hope.setFilter('label', 'equal', filter)
  } else {
    hope && hope.setFilter()
  }
})

$('#label').on('change', function (e) {
  var v = e.target.value
  hope.changePorprities({
    key: 'showLabel',
    opt: 'in',
    value: [true, false]
  }, 'showLabel', (v === 'show' ? true : false))
})

$('#point-label').on('change', function (e) {
  var v = e.target.value
  hope && hope.changePorprities({
    key: 'showPointLabel',
    opt: 'in',
    value: [true, false]
  }, 'showPointLabel', (v === 'show' ? true : false))
})

$('#save-btn').on('click', function (e) {
  // 接口 保存，完了之后，调 hope.finish()
  hope.finish()
})

$('#delete-btn').on('change', function (e) {
  hope && hope.deleteFeature(hope.currentFeature)
})

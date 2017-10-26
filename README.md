a library for canvas to draw basic shape, such as, polygon...

## 1. prepare environment to run the example

install node and npm

cd canvas-draw // come into the base dir

npm i // install the Dependency

## 2. how to use

### (1) 基本环境安装好后，在根目录，npm start，可启动example

http://localhost:3000/ 可以看例子

### (2) 一些快捷键

c：添加shape时，在没有双击前，按c取消当前添加

双击：添加shape时，单击添加点，双击，这个shape绘制完成，当前shape进入编辑状态，可以进行调整大小等

esc：当前的shape退出编辑状态

### (3）例子的使用

选择某种shape，

选中某种label  

在canvas就可以进行绘制  

如果，想选中之前绘制的图形，要将shape设置为‘请选择’，这样组件会设置为prepareing状态

单击一个图形，可以选中，进行编辑、拖拽、删除

## 3. API

### (1) 初始化

```
let hope = window.hope = new Hope(
  'root', // container id（比如一个div的id）
  {
    // width: 800, 设置画布大小 如果不设置，则为 container的 宽高
    // height: 500
  }
)

```
### (2) 添加已有的shape

注意：type 只能是Polygon、Rectangle中的一个！！！！

添加一个：
```
hope.addFeature({
  type: 'Polygon', // 只可以是 Polygon、Rectangle中的一个 !!!!
  properties: { // 如果，你不设置fontStyle等样式，则安装默认显示
    label: 'Person', // 标签显示什么
    showLabel: true, // 标签是否显示
    showPointLabel: true, // 坐标点标签是否显示
    fontStyle: { // 指定标签的颜色
      fillColor: '#fff'
    },
    baseStyle: { // 指定中普通状态下，shape的样式
      strokeColor: 'rgba(255, 255, 255, 0.8)', // 边框颜色
      fillColor: 'rgba(255, 255, 255, 0.8)', // 填充颜色
      lineWidth: 1, // 边框线的宽度
      lineCap: 'round', // 可以忽略
      lineJoin: 'round' // 可以忽略
    },
    hoverStyle: { // 指定鼠标经过shape状态下，shape的样式, 在baseStyle基础上，进行部分项目的更新，
      fillColor: null, // 如果你在baseStyle中设置了fillcolor，中hover状态下，不想显示背景色，则需要这里制空
      strokeColor: 'rgba(255, 255, 255, 1)',
      lineWidth: 2
    },
    selectedStyle: {// 指定鼠标选中、或者添加shape状态下，shape的样式, 在baseStyle基础上，进行部分项目的更新，
      fillColor: null,
      strokeColor: '#fff',
      lineDashOffset: 0,
      lineDash: [10, 4]
    }
  }, // 指定绘制成什么样子的
  coordinate: coordinate // 在图片中的真实坐标, 格式为：[[3，10], [20，4]...]
})

```
添加多个：
```
hope.addFeature([
    {
      type: type,
      properties: properties,
      coordinate: coordinate
    },
    {
      ......
    }
])

```
### (3) 改变绘制模型
```
hope.changeModel(
  type, // 只可以是 Polygon、Rectangle中的一个!!!!!!
  properties // 同2 介绍的
)

```

表明，当前，一旦出现点击画布这种事件，绘制的就是type，并且绘制的样式是按照properties来进行的
当什么参数都不传的时候，则表明，停止绘制了

eg：
```
hope.changeModel()

```

### (4) 筛选
```
hope.setFilter(key, opt, value)

```
key：必须是properties中的某个key

opt：[in、not-in、equal、not-equal]中的一个

value：值

eg：
```
hope.setFilter('label', 'equal', v)
hope.setFilter('label', 'in', ['Person', 'Police'])

```
### (5) 改变某些shape的属性

```
hope.changePorprities(filter, key, value)

```
filter：定义同3

key：要改变的properties中的哪个key

value：改成什么值

eg：改变 showLabel 的值为true || false的所有shape，将showLabel 设为 true

```
hope.changePorprities({
  key: 'showLabel',
  opt: 'in',
  value: [true, false]
}, 'showLabel', true)

```
### (6) 删除一个feature
```
hope.deleteFeature(hopeInstance)

```

eg:

```
hope.deleteFeature(hope.currentFeature)

```

###（7）结束当前shape的添加 或者编辑

```
hope.finish()

```
例如，你编辑完一个shape后，保存，调用hope.finish()，就可以添加或编辑下一个shape了，否则不可进行下一个的添加编辑

###（8）抛出来事件

a. select: 选中某个shape后，会抛出这个事件

```
hope.on('select', (featureUuid) => {
  // do someing
})
```
a. finish: 按esc、或者调用 hope.finish 后触发

## 4. 如何build（发布新的lib的版本、打成一个lib包供）

// todo

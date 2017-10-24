a library for canvas to draw basic shape, such as, polygon...

1. prepare environment to run the example

install node and npm

cd canvas-draw // come into the base dir

npm i // install the Dependency

2. how to use

(1) 基本环境安装好后，在跟目录，npm start，可启动example

http://localhost:3000/ 可以看例子

选择某种shape，在canvas就可以进行绘制，双击，结束绘制，可以编辑绘制的图形，按esc键，可以结束当前这个图片的绘制和编辑。如果，你正在画一个图形，你不想画它了，可以按c，取消当前的绘制。

鼠标点击canvas，进行下一个图片的绘制；

如果，想选中之前绘制的图形，要将shape设置为‘请选择’，这样组件会设置为prepareing状态，单击一个图形，可以选中，进行编辑和拖拽。

选中一个图形，点击删除，删除这个图形

（2）

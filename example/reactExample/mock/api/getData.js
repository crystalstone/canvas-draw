module.exports = function (req, res) {
  return {
    code: 200,
    data: [
      {
        imgUrl: '/img/002.jpg',
        label: [
          {
            // 590 392
            position: [{x: 406, y: 323}, {x: 305, y: 376}],
            name: 'Person',
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
      },
      {
        imgUrl: '/img/timg.jpeg',
        label: [
          {
            // 590 392
            position: [{x: 406, y: 323}, {x: 305, y: 376}],
            name: 'Person',
            color: 'blue'
          },
          {
            position: [{x: 55, y: 35}, {x: 160, y: 50}],
            name: 'Person',
            color: 'red'
          } //,
          // {
          //   position: [{x: 135, y: 85}, {x: 200, y: 30}, {x: 145, y: 65}, {x: 100, y: 100}],
          //   name: 'Police',
          //   color: 'yellow'
          // },
          // {
          //   position: [{x: 105, y: 105}, {x: 155, y: 155}],
          //   name: 'Person',
          //   color: 'yellow'
          // }
        ]
      }
    ]
  }
}

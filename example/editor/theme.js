export default {
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
    Person: null,
    Police: null
  }
}

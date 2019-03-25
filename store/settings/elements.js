'use strict'

module.exports = {
  elements: [
    {
      id: 'area2030',
      clip: '',
      type: 'area',
      data: [[[2020, 0, 0], [2030, 0, 0]], [[2020, 0, 0], [2030, 0, 0]]],
      label: '',
      marker: [2025, 32500]
    },
    {
      id: 'markercross',
      type: 'marker',
      data: [[[2046, 12000]], [[2046, 12000]]],
      label: 'Marker of crossing'
    },
    {
      id: 'markerplateau',
      type: 'dot',
      data: [[[2025, 57000]]],
      label: 'Plateau'
    },
    {
      id: 'today',
      type: 'verticalLine',
      data: [[[2019, 0]]],
      label: ''
    },
    {
      id: 'ndc',
      type: 'verticalLine',
      data: [[[2030, 0]]],
      label: 'Latest point of action'
    },
    {
      id: 'markerpolicy',
      type: 'dot',
      data: [[[2020, 62500]]],
      label: 'Change'
    },
    {
      id: 'negative',
      type: 'horizontalLine',
      data: [[[2030, 0]]]
    },
    {
      id: 'line30',
      type: 'verticalLine',
      data: [[[2030, 0]]],
      label: '2030'
    },
    {
      id: 'line25',
      type: 'verticalLine',
      data: [[[2025, 0]]],
      label: '2025'
    }
  ]
}

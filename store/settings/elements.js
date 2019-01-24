'use strict'

module.exports = {
  elements: [
    {
      id: 'area2030',
      clip: '',
      type: 'area',
      data: [[[2020, 0, 65000], [2030, 0, 65000]], [[2020, 0, 65000], [2030, 0, 6500]]],
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
      data: [[[2025, 62000]]],
      label: 'Plateau'
    },
    {
      id: 'markerpolicy',
      type: 'dot',
      data: [[[2020, 62500]]],
      label: 'Change'
    },
    // {
    //   id: 'linetarget2',
    //   type: 'horizontalLine',
    //   data: [[[2010, 20]]],
    //   label: 'Line 2'
    // },
    {
      id: 'line30',
      type: 'verticalLine',
      data: [[[2030, 20]]],
      label: '2030'
    },
    {
      id: 'line25',
      type: 'verticalLine',
      data: [[[2025, 20]]],
      label: '2025'
    }
  ]
}

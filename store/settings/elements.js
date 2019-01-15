'use strict'

module.exports = {
  elements: [
    {
      id: 'linehistoric',
      clip: '',
      type: 'line',
      data: [[[2010, 50], [2015, 57], [2020, 62]]],
      attribute: 'historic'
    },
    {
      id: 'area2030',
      clip: '',
      type: 'area',
      data: [[[2020, 0, 68], [2030, 0, 68]], [[2020, 0, 68], [2030, 0, 68]]],
      label: 'Area of interest',
      marker: [2025, 23]
    },
    {
      id: 'linendc',
      clip: '',
      type: 'line',
      data: [[[2020, 62], [2025, 61], [2030, 60], [2045, 27], [2050, 18]]],
      attribute: 'ndc'
    },
    {
      id: 'linecep',
      clip: '',
      type: 'line',
      data: [[[2020, 58], [2025, 51], [2030, 43], [2045, 24], [2050, 19]]],
      attribute: 'cep'
    },
    {
      id: 'areandccep',
      clip: '',
      type: 'area',
      data: [[[2010, 50, 50], [2015, 57, 57], [2020, 58, 62], [2025, 51, 61], [2030, 43, 60], [2045, 24, 27], [2050, 19, 18]], [[2010, 50, 50], [2015, 57, 57], [2020, 58, 62], [2025, 51, 61], [2030, 43, 60], [2045, 18, 20], [2050, 17, 15]]]
    },
    {
      id: 'linegp',
      clip: '',
      type: 'line',
      data: [[[2010, 50], [2015, 56], [2020, 58], [2030, 54], [2045, 26], [2050, 18.5]], [[2010, 50], [2015, 56], [2020, 58], [2030, 54], [2045, 24], [2050, 17]]],
      attribute: 'gp'
    },
    {
      id: 'linenz',
      clip: '',
      type: 'line',
      data: [[[2010, 50], [2015, 56], [2020, 58], [2030, 48], [2045, 25], [2050, 18.5]], [[2010, 50], [2015, 56], [2020, 58], [2030, 48], [2045, 22], [2050, 17]]],
      attribute: 'nz'
    },
    {
      id: 'markerinter',
      type: 'marker',
      data: [[[2045, 26]], [[2045, 19]]],
      label: 'Marker of interest'
    },
    {
      id: 'linetarget1',
      type: 'horizontalLine',
      data: [[[2010, 26]]],
      label: 'Line 1'
    },
    {
      id: 'linetarget2',
      type: 'horizontalLine',
      data: [[[2010, 20]]],
      label: 'Line 2'
    },
    {
      id: 'line30',
      type: 'verticalLine',
      data: [[[2030, 20]]],
      label: 'Line 3'
    }
  ]
}

'use strict'

export const elements = [
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
  },
  {
    id: 'landuse',
    type: 'addition'
  },
  {
    id: 'budget',
    type: 'area',
    data: [[[2020, 0], [2080, 0]]],
    label: 'Budget'
  },
  {
    id: 'arrowup',
    type: 'arrow',
    data: [[[2020, 0], [2075, 0], [2070, 0], [2080, 0]]],
    label: '2° C'
  },
  {
    id: 'arrowdown',
    type: 'arrow',
    data: [[[2020, 0], [2050, 0], [2045, 0], [2055, 0]]],
    label: '1.5° C'
  },
  {
    id: 'bracket',
    type: 'bracket',
    data: [[[2020, 0]]],
    label: 'Emissions gap'
  }
]

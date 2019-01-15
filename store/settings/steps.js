'use strict'

module.exports = {
  steps: [{
    title: 'Are we doing enough?',
    clips: {
      1: 0,
      2: 0,
      3: 0,
      4: 0
    },
    visibility: ['linehistoric'],
    attributes: ['historic'],
    data: {
      scenario: '2full',
      measure: 'GHG'
    }
  }, {
    title: 'What is the collective outcome of the NDCs in terms of global emissions in 2030?',
    clips: {
      1: 2030,
      2: 0,
      3: 2030,
      4: 0
    },
    visibility: ['linehistoric', 'linendc'],
    attributes: ['historic', 'ndc'],
    data: {
      scenario: '2red',
      measure: 'GHG'
    }
  }, {
    title: 'What would cost-optimal immediate action towards 2°C/1.5°C look like in contrast?',
    clips: {
      1: 2030,
      2: 2030,
      3: 2030,
      4: 0
    },
    visibility: ['linehistoric', 'linendc', 'linecep'],
    attributes: ['historic', 'ndc', 'cep'],
    data: {
      scenario: '1.5full',
      measure: 'CO2'
    }
  }, {
    title: 'What strengthening of action after 2030 would be required to reach the 1.5°C and 2°C goals after targeting the NDCs by 2030?',
    clips: {
      1: 2050,
      2: 2050,
      3: 2050,
      4: 0
    },
    visibility: ['linehistoric', 'linendc', 'linecep'],
    attributes: ['historic', 'ndc', 'cep'],
    data: {
      scenario: '2full',
      measure: 'CO"'
    }
  }, {
    title: 'To what extent would mitigation challenges be reduced by strengthening action/NDCs before 2030?',
    clips: {
      1: 2050,
      2: 2050,
      3: 2050,
      4: 2050
    },
    visibility: ['linehistoric', 'linendc', 'linecep', 'linegp', 'linenz'],
    attributes: ['historic', 'ndc', 'cep', 'gp', 'nz'],
    data: {
      scenario: '2full',
      measure: 'GHG'
    }
  }, {
    title: 'Geführtes Explore',
    visibility: ['linehistoric', 'linendc', 'linecep', 'linegp', 'linenz', 'options'],
    attributes: ['historic', 'ndc', 'cep', 'gp', 'nz'],
    data: {
      scenario: '2full',
      measure: 'GHG'
    }
  }]
}

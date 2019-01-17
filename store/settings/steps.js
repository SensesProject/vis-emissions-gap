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
      model: 'REMIND-MAgPIE 1.7-3.0',
      scenario: 'PEP_1p5C_full_eff',
      region: 'World',
      variable: 'Emissions|Kyoto Gases'
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
      model: 'REMIND-MAgPIE 1.7-3.0',
      scenario: 'PEP_1p5C_full_eff',
      region: 'World',
      variable: 'Emissions|Kyoto Gases'
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
      model: 'REMIND-MAgPIE 1.7-3.0',
      scenario: 'PEP_1p5C_full_eff',
      region: 'World',
      variable: 'Emissions|Kyoto Gases'
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
      model: 'REMIND-MAgPIE 1.7-3.0',
      scenario: 'PEP_1p5C_full_eff',
      region: 'World',
      variable: 'Emissions|Kyoto Gases'
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
      model: 'REMIND-MAgPIE 1.7-3.0',
      scenario: 'PEP_1p5C_full_eff',
      region: 'World',
      variable: 'Emissions|Kyoto Gases'
    }
  }, {
    title: 'Geführtes Explore',
    visibility: ['linehistoric', 'linendc', 'linecep', 'linegp', 'linenz', 'options'],
    attributes: ['historic', 'ndc', 'cep', 'gp', 'nz'],
    data: {
      model: 'REMIND-MAgPIE 1.7-3.0',
      scenario: 'PEP_1p5C_full_eff',
      region: 'World',
      variable: 'Emissions|Kyoto Gases'
    }
  }]
}

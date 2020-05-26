'use strict'

module.exports = {
  steps: [{
    clips: {
      NDC: 'start',
      eff: 'start',
      goodpractice: 'start',
      netzero: 'start',
      'historic-landuse-addition': 2030,
      'historic-landuse': 'end'
    },
    visibility: ['landuse'],
    legend: ['historic', 'landuse'],
    yLabel: 'historic-landuse-addition',
    goal: 0,
    data: {
      aside: 'investment',
      model: 'REMIND-MAgPIE 1.7-3.0',
      scenario: 'PEP',
      degree: '1p5C',
      part: 'full',
      region: 'World',
      variable: 'CO2|Energy and Industrial Processes',
      range: [1990, 2050]
    }
  }, {
    clips: {
      NDC: 'start',
      eff: 'start',
      goodpractice: 'start',
      netzero: 'start',
      'historic-landuse-addition': 2030,
      'historic-landuse': 'end'
    },
    visibility: ['landuse'],
    legend: ['historic', 'landuse'],
    yLabel: 'historic-landuse-addition',
    goal: 0,
    data: {
      aside: 'investment',
      model: 'REMIND-MAgPIE 1.7-3.0',
      scenario: 'PEP',
      degree: '1p5C',
      part: 'full',
      region: 'World',
      variable: 'CO2|Energy and Industrial Processes',
      range: [1990, 2050]
    }
  }, {
    clips: {
      NDC: 'start',
      eff: 'start',
      goodpractice: 'start',
      netzero: 'start',
      'historic-landuse-addition': 2030,
      'historic-landuse': 'end'
    },
    visibility: ['budget', 'arrowup', 'arrowdown', 'landuse'],
    legend: [],
    yLabel: 'historic-landuse-addition',
    goal: 0,
    data: {
      aside: 'investment',
      model: 'REMIND-MAgPIE 1.7-3.0',
      scenario: 'PEP',
      degree: '1p5C',
      part: 'full',
      region: 'World',
      variable: 'CO2|Energy and Industrial Processes',
      range: [1990, 2050]
    }
  }, {
    clips: {
      NDC: 2030,
      eff: 'start',
      goodpractice: 'start',
      netzero: 'start',
      'historic-landuse-addition': 'start',
      'historic-landuse': 'end'
    },
    visibility: [],
    legend: ['NDC'],
    yLabel: 'historic',
    goal: 2030,
    data: {
      aside: 'investment',
      model: 'REMIND-MAgPIE 1.7-3.0',
      scenario: 'PEP',
      degree: '1p5C',
      part: 'full',
      region: 'World',
      variable: 'CO2|Energy and Industrial Processes',
      range: [1990, 2050]
    }
  }, {
    clips: {
      NDC: 2030,
      eff: 2030,
      goodpractice: 'start',
      netzero: 'start',
      'historic-landuse-addition': 'start',
      'historic-landuse': 'end'
    },
    visibility: ['bracket'],
    legend: [],
    yLabel: 'historic',
    goal: 2030,
    data: {
      aside: 'investment',
      model: 'REMIND-MAgPIE 1.7-3.0',
      scenario: 'PEP',
      degree: '1p5C',
      part: 'full',
      region: 'World',
      variable: 'CO2|Energy and Industrial Processes',
      range: [1990, 2050]
    }
  }, {
    clips: {
      NDC: 'end',
      eff: 'end',
      goodpractice: 'start',
      netzero: 'start',
      'historic-landuse-addition': 'start',
      'historic-landuse': 'end'
    },
    visibility: [],
    legend: ['NDC', 'eff'],
    yLabel: 'historic',
    goal: 2050,
    data: {
      aside: 'investment',
      model: 'REMIND-MAgPIE 1.7-3.0',
      scenario: 'PEP',
      degree: '1p5C',
      part: 'full',
      region: 'World',
      variable: 'CO2|Energy and Industrial Processes',
      range: [1990, 2050]
    }
  }, {
    clips: {
      NDC: 'end',
      eff: 'end',
      goodpractice: 'start',
      netzero: 2050,
      'historic-landuse-addition': 'start',
      'historic-landuse': 'end'
    },
    visibility: [],
    legend: ['NDC', 'eff'],
    yLabel: 'historic',
    goal: 2050,
    data: {
      aside: 'investment',
      model: 'REMIND-MAgPIE 1.7-3.0',
      scenario: 'PEP',
      degree: '1p5C',
      part: 'full',
      region: 'World',
      variable: 'CO2|Energy and Industrial Processes',
      range: [1990, 2050]
    }
  }, {
    visibility: [],
    legend: ['NDC', 'eff', 'goodpractice', 'netzero'],
    yLabel: 'historic',
    goal: 2050,
    clips: {
      NDC: 'end',
      eff: 'end',
      goodpractice: 'end',
      netzero: 'end',
      'historic-landuse-addition': 'start',
      'historic-landuse': 'end'
    },
    data: {
      aside: 'strandedAssests',
      model: 'REMIND-MAgPIE 1.7-3.0',
      scenario: 'PEP',
      degree: '1p5C',
      part: 'full',
      region: 'World',
      variable: 'CO2|Energy and Industrial Processes',
      range: [1990, 2050]
    }
  }, {
    visibility: [],
    legend: ['NDC', 'eff', 'goodpractice', 'netzero'],
    yLabel: 'historic',
    goal: 2100,
    clips: {
      NDC: 'end',
      eff: 'end',
      goodpractice: 'end',
      netzero: 'end',
      'historic-landuse-addition': 'start',
      'historic-landuse': 'end'
    },
    data: {
      aside: 'temperature',
      model: 'REMIND-MAgPIE 1.7-3.0',
      scenario: 'PEP',
      degree: '1p5C',
      part: 'full',
      region: 'World',
      variable: 'CO2|Energy and Industrial Processes',
      range: [1990, 2100]
    }
  }, {
    visibility: [],
    legend: ['NDC', 'eff', 'goodpractice', 'netzero'],
    yLabel: 'historic',
    goal: 2100,
    clips: {
      NDC: 'end',
      eff: 'end',
      goodpractice: 'end',
      netzero: 'end',
      'historic-landuse-addition': 'start',
      'historic-landuse': 'end'
    },
    data: {
      aside: 'landuse',
      model: 'REMIND-MAgPIE 1.7-3.0',
      scenario: 'PEP',
      degree: '1p5C',
      part: 'full',
      region: 'World',
      variable: 'CO2|Energy and Industrial Processes',
      range: [1990, 2100]
    }
  }]
}

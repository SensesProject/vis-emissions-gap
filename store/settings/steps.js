'use strict'

module.exports = {
  steps: [{
    title: 'Are we doing enough?',
    clips: {
      NDC: 'start',
      eff: 'start',
      goodpractice: 'start',
      netzero: 'start'
    },
    visibility: ['linehistoric'],
    legend: ['historic'],
    data: {
      model: 'REMIND-MAgPIE 1.7-3.0',
      scenario: 'PEP',
      degree: '1p5C',
      part: 'full',
      region: 'World',
      variable: 'Kyoto Gases'
    }
  }, {
    title: 'What is the collective outcome of the NDCs in terms of global emissions in 2030?',
    clips: {
      NDC: 2030,
      eff: 'start',
      goodpractice: 'start',
      netzero: 'start'
    },
    visibility: ['linehistoric', 'area2030', 'markerplateau'],
    legend: ['historic', 'NDC'],
    data: {
      model: 'REMIND-MAgPIE 1.7-3.0',
      scenario: 'PEP',
      degree: '1p5C',
      part: 'full',
      region: 'World',
      variable: 'Kyoto Gases'
    }
  }, {
    title: 'What would cost-optimal immediate action towards 2°C/1.5°C look like in contrast?',
    clips: {
      NDC: 2030,
      eff: 2030,
      goodpractice: 'start',
      netzero: 'start'
    },
    visibility: ['linehistoric', 'area2030', 'markerpolicy'],
    legend: ['historic', 'NDC', 'eff'],
    data: {
      model: 'REMIND-MAgPIE 1.7-3.0',
      scenario: 'PEP',
      degree: '1p5C',
      part: 'full',
      region: 'World',
      variable: 'Kyoto Gases'
    }
  }, {
    title: 'What strengthening of action after 2030 would be required to reach the 1.5°C and 2°C goals after targeting the NDCs by 2030?',
    clips: {
      NDC: 'end',
      eff: 'end',
      goodpractice: 'start',
      netzero: 'start'
    },
    visibility: ['linehistoric', 'markercross'],
    legend: ['historic', 'NDC', 'eff'],
    data: {
      model: 'REMIND-MAgPIE 1.7-3.0',
      scenario: 'PEP',
      degree: '1p5C',
      part: 'full',
      region: 'World',
      variable: 'Kyoto Gases'
    }
  }, {
    title: 'To what extent would mitigation challenges be reduced by strengthening action/NDCs before 2030?',
    clips: {
      NDC: 'end',
      eff: 'end',
      goodpractice: 'end',
      netzero: 'end'
    },
    visibility: ['linehistoric', 'line25'],
    legend: ['historic', 'NDC', 'eff', 'goodpractice', 'netzero'],
    data: {
      model: 'REMIND-MAgPIE 1.7-3.0',
      scenario: 'PEP',
      degree: '1p5C',
      part: 'full',
      region: 'World',
      variable: 'Kyoto Gases'
    }
  }, {
    title: 'Geführtes Explore',
    visibility: ['linehistoric'],
    legend: ['historic', 'NDC', 'eff', 'goodpractice', 'netzero'],
    clips: {
      NDC: 'end',
      eff: 'end',
      goodpractice: 'end',
      netzero: 'end'
    },
    data: {
      model: 'REMIND-MAgPIE 1.7-3.0',
      scenario: 'PEP',
      degree: '1p5C',
      part: 'full',
      region: 'World',
      variable: 'Kyoto Gases'
    }
  }]
}

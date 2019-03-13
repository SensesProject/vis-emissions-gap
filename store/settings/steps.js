'use strict'

module.exports = {
  steps: [{
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
      variable: 'Kyoto Gases',
      range: [1990, 2050]
    }
  }, {
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
      variable: 'Kyoto Gases',
      range: [1990, 2050]
    }
  }, {
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
      variable: 'Kyoto Gases',
      range: [1990, 2050]
    }
  }, {
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
      variable: 'Kyoto Gases',
      range: [1990, 2050]
    }
  }, {
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
      variable: 'Kyoto Gases',
      range: [1990, 2050]
    }
  }, {
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
      variable: 'Kyoto Gases',
      range: [1990, 2050]
    }
  }]
}

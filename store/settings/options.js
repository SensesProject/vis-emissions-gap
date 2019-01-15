'use strict'

module.exports = {
  options: {
    models: ['REMIND-MAgPIE 1.7-3.0'],
    scenarios: [
      'PEP_2C_full_NDC',
      'PEP_2C_full_eff',
      'PEP_2C_full_goodpractice',
      'PEP_2C_full_netzero',
      'PEP_1p5C_full_NDC',
      'PEP_1p5C_full_eff',
      'PEP_1p5C_full_goodpractice',
      'PEP_1p5C_full_netzero',
      'PEP_2C_red_NDC',
      'PEP_2C_red_eff',
      'PEP_2C_red_goodpractice',
      'PEP_2C_red_netzero',
      'PEP_1p5C_red_NDC',
      'PEP_1p5C_red_eff',
      'PEP_1p5C_red_goodpractice',
      'PEP_1p5C_red_netzero'
    ],
    regions: ['World'],
    variables: ['Emissions|CO2', 'Emissions|Kyoto Gases', 'Emissions|CO2|Fossil Fuels and Industry']
  }
}

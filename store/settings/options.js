'use strict'

module.exports = {
  options: {
    models: ['REMIND-MAgPIE 1.7-3.0'],
    scenarios: ['PEP'],
    degrees: ['1p5C', '2C'],
    parts: ['full', 'red'],
    regions: ['World', 'China', 'USA', 'EU', 'India', 'Russia', 'Japan'],
    variables: ['CO2|Energy and Industrial Processes', 'CO2|AFOLU'],
    range: [2050, 2100]
  }
}

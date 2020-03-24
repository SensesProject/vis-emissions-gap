import Vue from 'vue'
import Vuex from 'vuex'
import VTooltip from 'v-tooltip'
import { map, find, compact, filter, get } from 'lodash'
import highlight from './modules/highlight'
import scenario from './modules/scenario'
import navigation from './modules/navigation'
import data from './modules/data'
import aside from './modules/aside'
import { elements } from './settings/elements.js'
const { steps } = require('./settings/steps.js')
const { legend } = require('./settings/legend.js')
const { options } = require('./settings/options.js')

Vue.use(VTooltip)
Vue.use(Vuex)

export const state = () => {
  return {
    steps,
    legend,
    elements,
    options
  }
}

export const modules = {
  aside,
  data,
  highlight,
  navigation,
  scenario
}

export const getters = {
  paths: (state) => {
    const { model, scenario, degree, part, variable, range, region } = state.scenario.scenario
    const { data } = state.data.data
    // Find items in the data that match the current options
    const paths = compact(map(state.legend, (policy) => {
      let obj
      let label = policy.label
      if (policy.attribute === 'historic') {
        if (variable === 'CO2|AFOLU') { // Leave out normal land use for AFOLU as it stretches the y-scale too much
          return false
        }
        obj = {
          scenario: 'historic',
          region,
          variable
        }
        label = 'Historic'
      } else if (policy.attribute === 'historic-landuse-addition') {
        if (variable === 'CO2|AFOLU') { // Leave out normal land use for AFOLU as it stretches the y-scale too much
          return false
        }
        obj = {
          scenario: 'historic-landuse-addition',
          region,
          variable: 'CO2|AFOLU'
        }
        label = 'Historic Land Use'
      } else if (policy.attribute === 'historic-landuse') {
        if (variable !== 'CO2|AFOLU') { // Leave out normal land use for AFOLU as it stretches the y-scale too much
          return false
        }
        obj = {
          scenario: 'historic-landuse',
          region,
          variable: 'CO2|AFOLU'
        }
        label = 'Historic Land Use'
      } else {
        obj = {
          model,
          scenario,
          degree,
          part,
          policy: policy.attribute,
          region,
          variable
        }
      }
      const datum = find(data, obj)
      return {
        ...datum,
        ...policy,
        label
      }
    }))

    // Filter the data for the given years
    const [l, h] = range
    return map(paths, (path) => {
      const values = filter(path.values, (d) => {
        return d[0] <= h && d[0] >= l
      })
      return {
        ...path,
        values,
        range
      }
    })
  },
  currentPaths: (state, getters) => {
    const { paths } = getters
    const { steps } = state
    const { step } = state.navigation

    return map(paths, (path) => {
      return {
        ...path,
        clip: get(steps, `${step}.clips.${path.policy}`)
      }
    })
  }
}

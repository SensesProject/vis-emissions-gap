import Vue from 'vue'
import Vuex from 'vuex'
import VTooltip from 'v-tooltip'
import highlight from './modules/highlight'
import scenario from './modules/scenario'
import navigation from './modules/navigation'
import data from './modules/data'
import prices from './modules/prices'
import { map, find, compact, filter, get } from 'lodash'
const { config } = require('./../config.js')
const { steps } = require('./settings/steps.js')
const { legend } = require('./settings/legend.js')
const { elements } = require('./settings/elements.js')
const { axis } = require('./settings/axis.js')
const { options } = require('./settings/options.js')

Vue.use(VTooltip)
Vue.use(Vuex)

export const state = () => {
  return {
    ...config,
    steps,
    axis,
    legend,
    elements,
    options,
    policies: ['historic', 'NDC', 'eff', 'goodpractice', 'netzero']
  }
}

export const modules = {
  prices,
  data,
  highlight,
  navigation,
  scenario
}

export const getters = {
  paths: state => {
    const { model, scenario, degree, part, variable, range, region } = state.scenario.scenario
    const { data } = state.data.data

    // Find items in the data that match the current options
    const paths = compact(map(state.policies, policy => {
      const obj = policy === 'historic'
        ? {
          scenario: 'historic',
          region,
          variable
        }
        : {
          model,
          scenario,
          degree,
          part,
          policy,
          region,
          variable
        }
      return find(data, obj)
    }))

    // Filter the data for the given years
    const [l, h] = range
    console.log(range)
    return map(paths, path => {
      const values = filter(path.values, d => {
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

    return map(paths, path => {
      return {
        ...path,
        clip: get(steps, `${step}.clips.${path.policy}`)
      }
    })
  }
}

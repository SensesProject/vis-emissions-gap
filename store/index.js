import Vue from 'vue'
import Vuex from 'vuex'
import VTooltip from 'v-tooltip'
import highlight from './modules/highlight'
import scenario from './modules/scenario'
import navigation from './modules/navigation'
import data from './modules/data'
import map from 'lodash/map'
import find from 'lodash/find'
import compact from 'lodash/compact'
const { config } = require('./../config.js')
const { steps } = require('./settings/steps.js')
const { legend } = require('./settings/legend.js')
const { elements } = require('./settings/elements.js')
const { axis } = require('./settings/axis.js')
const { options } = require('./settings/options.js')

Vue.use(VTooltip)
Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    data,
    highlight,
    navigation,
    scenario
  },
  state: {
    ...config,
    steps,
    axis,
    legend,
    elements,
    options,
    policies: ['historic', 'eff', 'goodpractice', 'NDC', 'netzero']
  },
  getters: {
    paths: state => {
      const { model, scenario, degree, part, variable } = state.scenario.scenario
      const { data } = state.data.data
      return compact(map(state.policies, policy => {
        const obj = policy === 'historic'
          ? {
            scenario: 'historic',
            variable
          }
          : {
            model,
            scenario,
            degree,
            part,
            policy,
            variable
          }
        return find(data, obj)
      }))
    }
  }
})

export default store

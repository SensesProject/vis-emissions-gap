import Vue from 'vue'
import Vuex from 'vuex'
import VTooltip from 'v-tooltip'
import highlight from './modules/highlight'
import scenario from './modules/scenario'
import navigation from './modules/navigation'
import assign from 'lodash/assign'
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
    navigation,
    highlight,
    scenario
  },
  state: {
    ...config,
    steps,
    axis,
    legend,
    elements,
    options,
    dataset: 0,
    data: {
      model: 'REMIND-MAgPIE 1.7-3.0',
      scenario: 'PEP_1p5C_full_eff',
      region: 'World',
      variable: 'Emissions|Kyoto Gases',
      unit: 'Mt CO2-equiv/yr'
    }
  },
  mutations: {
    SET_DATASET (state, value) {
      state.dataset = value
    },
    SET_DATA (state, value) {
      state.data = value
    }
  },
  actions: {
    toggleDataset ({ commit, state }, id) {
      const { dataset } = state
      commit('SET_DATASET', dataset === 0 ? 1 : 0)
    },
    setData ({ commit, state }, change) {
      commit('SET_DATA', assign(state.data, change))
    }
  }
})

export default store

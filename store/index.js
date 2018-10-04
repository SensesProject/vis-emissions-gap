import Vue from 'vue'
import Vuex from 'vuex'
import * as data from '../data/data.json'
const { config } = require('./../config.js')

Vue.use(Vuex)

data.forEach((datum, n) => {
  data[n]['sum'] = datum.values.reduce((pv, cv) => pv + cv, 0)
})

const store = () => new Vuex.Store({
  state: {
    ...config,
    steps: [{
      'label': 'Einführung',
      'clips': [0, 0, 0, 0]
    }, {
      'label': 'Schritt 1',
      'clips': [0.4, 0, 0, 0]
    }, {
      'label': 'Schritt 2',
      'clips': [0.7, 0.2, 0, 0]
    }, {
      'label': 'Schritt 3',
      'clips': [0.9, 0.4, 0, 0]
    }],
    data: [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5]],
    step: 0
  },
  mutations: {
    SET_STEP (state, value) {
      state.step = value
    }
  },
  actions: {
    nextStep ({ commit, state }) {
      const nextStep = state.step === state.steps.length - 1 ? 0 : state.step + 1
      commit('SET_STEP', nextStep)
    },
    previousStep ({ commit, state }) {
      const nextStep = state.step === 0 ? state.steps.length - 1 : state.step - 1
      commit('SET_STEP', nextStep)
    }
  }
})

export default store

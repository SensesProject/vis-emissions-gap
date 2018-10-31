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
      'title': 'Einführung',
      'text': 'What is the collective outcome of the NDCs in terms of global emissions in 2030?',
      'clips': [0, 0, 0, 0]
    }, {
      'title': 'Schritt 1',
      'text': 'What would cost-optimal immediate action towards 2°C look like in contrast?',
      'clips': [0.4, 0, 0, 0]
    }, {
      'title': 'Schritt 2',
      'text': 'What strengthening of action after 2030 would be required to reach the 1.5°C and 2°C goals after targeting the NDCs by 2030?',
      'clips': [0.7, 0.2, 0, 0]
    }, {
      'title': 'Schritt 3',
      'text': 'To what extent would mitigation challenges be reduced by strengthening action/NDCs before 2030?',
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

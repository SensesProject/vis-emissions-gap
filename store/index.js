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
      'title': 'Introduction',
      'text': 'What is the collective outcome of the NDCs in terms of global emissions in 2030?',
      clips: {
        1: 0,
        2: 0,
        3: 0,
        4: 0
      }
    }, {
      'title': 'Step 1',
      'text': 'What would cost-optimal immediate action towards 2°C look like in contrast?',
      clips: {
        1: 0.4,
        2: 0,
        3: 0,
        4: 0
      }
    }, {
      'title': 'Step 2',
      'text': 'What strengthening of action after 2030 would be required to reach the 1.5°C and 2°C goals after targeting the NDCs by 2030?',
      clips: {
        1: 0.7,
        2: 0.2,
        3: 0,
        4: 0
      }
    }, {
      'title': 'Step 3',
      'text': 'To what extent would mitigation challenges be reduced by strengthening action/NDCs before 2030?',
      clips: {
        1: 0.9,
        2: 0.4,
        3: 0,
        4: 0
      }
    }],
    elements: [
      {
        clip: '1',
        type: 'line',
        data: [[0, 0], [1.7, 1.2], [1.5, 2], [3.2, 3], [4, 3.5], [5, 5]]
      },
      {
        clip: '2',
        type: 'line',
        data: [[0, 0], [1, 0.7], [2.2, 2], [3, 2.4], [4, 4], [5, 5]]
      },
      {
        clip: '3',
        type: 'area',
        data: [[0, 0], [1, 0.5], [2, 0.2], [3, 1], [4, 1.2], [5, 5]]
      }
    ],
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

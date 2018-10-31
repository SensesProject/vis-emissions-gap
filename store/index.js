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
        1: 2020,
        2: 0,
        3: 2050,
        4: 0
      }
    }, {
      'title': 'Step 2',
      'text': 'What strengthening of action after 2030 would be required to reach the 1.5°C and 2°C goals after targeting the NDCs by 2030?',
      clips: {
        1: 2030,
        2: 2020,
        3: 2050,
        4: 0
      }
    }, {
      'title': 'Step 3',
      'text': 'To what extent would mitigation challenges be reduced by strengthening action/NDCs before 2030?',
      clips: {
        1: 2040,
        2: 2030,
        3: 2050,
        4: 0
      }
    }],
    elements: [
      {
        clip: '3',
        type: 'area',
        data: [[2020, 0, 68], [2030, 0, 68]]
      },
      {
        clip: '1',
        type: 'line',
        data: [[2010, 50], [2015, 58], [2020, 62], [2025, 61], [2030, 60], [2035, 50], [2040, 40], [2045, 27], [2050, 18]]
      },
      {
        clip: '2',
        type: 'line',
        data: [[2010, 50], [2015, 58], [2020, 58], [2025, 50], [2030, 43], [2035, 36], [2040, 50], [2045, 26], [2050, 18]]
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

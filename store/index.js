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
      'title': 'Are we doing enough?',
      'text': 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
      clips: {
        1: 0,
        2: 0,
        3: 0,
        4: 0
      },
      visibility: [],
      attributes: []
    }, {
      'title': 'What is the collective outcome of the NDCs in terms of global emissions in 2030?',
      'text': 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
      clips: {
        1: 2030,
        2: 0,
        3: 2030,
        4: 0
      },
      visibility: [],
      attributes: ['ndc']
    }, {
      'title': 'What would cost-optimal immediate action towards 2°C look like in contrast?',
      'text': 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
      clips: {
        1: 2030,
        2: 2030,
        3: 2030,
        4: 0
      },
      visibility: ['2', '3'],
      attributes: ['ndc', 'cep']
    }, {
      'title': 'What strengthening of action after 2030 would be required to reach the 1.5°C and 2°C goals after targeting the NDCs by 2030?',
      'text': 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
      clips: {
        1: 2050,
        2: 2050,
        3: 2050,
        4: 0
      },
      visibility: ['1', '2', '3'],
      attributes: ['ndc', 'cep']
    }, {
      'title': 'To what extent would mitigation challenges be reduced by strengthening action/NDCs before 2030?',
      'text': 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
      clips: {
        1: 2050,
        2: 2050,
        3: 2050,
        4: 2050
      },
      visibility: [],
      attributes: ['ndc', 'cep', 'gp', 'nz']
    }],
    legend: [{
      type: 'line',
      attribute: 'ndc',
      label: 'NDC'
    }, {
      type: 'line',
      attribute: 'cep',
      label: 'Cost-effective pricing'
    }, {
      type: 'line',
      attribute: 'gp',
      label: 'Good Pratice'
    }, {
      type: 'line',
      attribute: 'nz',
      label: 'Net Zero'
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
        data: [[2010, 50], [2015, 57], [2020, 62], [2025, 61], [2030, 60], [2045, 27], [2050, 18]],
        attribute: 'ndc'
      },
      {
        clip: '2',
        type: 'line',
        data: [[2010, 50], [2015, 57], [2020, 58], [2025, 51], [2030, 43], [2045, 24], [2050, 19]],
        attribute: 'cep'
      },
      {
        clip: '2',
        type: 'area',
        data: [[2010, 50, 50], [2015, 57, 57], [2020, 58, 62], [2025, 51, 61], [2030, 43, 60], [2045, 24, 27], [2050, 19, 18]]
      },
      {
        clip: '4',
        type: 'line',
        data: [[2010, 50], [2015, 56], [2020, 58], [2030, 54], [2045, 26], [2050, 18.5]],
        attribute: 'gp'
      },
      {
        clip: '4',
        type: 'line',
        data: [[2010, 50], [2015, 56], [2020, 58], [2030, 48], [2045, 25], [2050, 18.5]],
        attribute: 'nz'
      },
      {
        id: '1',
        type: 'marker',
        data: [[2045, 26]]
      },
      {
        id: '2',
        type: 'horizontalLine',
        data: [[2010, 26]],
        label: 'Line 1'
      },
      {
        id: '3',
        type: 'horizontalLine',
        data: [[2010, 20]],
        label: 'Line 2'
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
    },
    setStep ({ commit, state }, step) {
      if (step > 0 && step < state.steps.length) {
        commit('SET_STEP', step)
      }
    }
  }
})

export default store

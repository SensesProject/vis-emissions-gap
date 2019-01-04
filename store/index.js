import Vue from 'vue'
import Vuex from 'vuex'
import VTooltip from 'v-tooltip'
import assign from 'lodash/assign'
import get from 'lodash/get'
const { config } = require('./../config.js')

Vue.use(VTooltip)
Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    ...config,
    steps: [{
      title: 'Are we doing enough?',
      clips: {
        1: 0,
        2: 0,
        3: 0,
        4: 0
      },
      visibility: ['linehistoric'],
      attributes: ['historic'],
      data: {
        scenario: '2full',
        measure: 'GHG'
      }
    }, {
      title: 'What is the collective outcome of the NDCs in terms of global emissions in 2030?',
      clips: {
        1: 2030,
        2: 0,
        3: 2030,
        4: 0
      },
      visibility: ['linehistoric', 'linendc'],
      attributes: ['historic', 'ndc'],
      data: {
        scenario: '2red',
        measure: 'GHG'
      }
    }, {
      title: 'What would cost-optimal immediate action towards 2°C/1.5°C look like in contrast?',
      clips: {
        1: 2030,
        2: 2030,
        3: 2030,
        4: 0
      },
      visibility: ['linehistoric', 'linendc', 'linecep'],
      attributes: ['historic', 'ndc', 'cep'],
      data: {
        scenario: '1.5full',
        measure: 'CO2'
      }
    }, {
      title: 'What strengthening of action after 2030 would be required to reach the 1.5°C and 2°C goals after targeting the NDCs by 2030?',
      clips: {
        1: 2050,
        2: 2050,
        3: 2050,
        4: 0
      },
      visibility: ['linehistoric', 'linendc', 'linecep'],
      attributes: ['historic', 'ndc', 'cep'],
      data: {
        scenario: '2full',
        measure: 'CO"'
      }
    }, {
      title: 'To what extent would mitigation challenges be reduced by strengthening action/NDCs before 2030?',
      clips: {
        1: 2050,
        2: 2050,
        3: 2050,
        4: 2050
      },
      visibility: ['linehistoric', 'linendc', 'linecep', 'linegp', 'linenz'],
      attributes: ['historic', 'ndc', 'cep', 'gp', 'nz'],
      data: {
        scenario: '2full',
        measure: 'GHG'
      }
    }, {
      title: 'Explore',
      visibility: ['linehistoric', 'linendc', 'linecep', 'linegp', 'linenz', 'options'],
      attributes: ['historic', 'ndc', 'cep', 'gp', 'nz'],
      data: {
        scenario: '2full',
        measure: 'GHG'
      }
    }],
    axis: {
      x: {
        label: 'Time'
      },
      y: {
        label: 'Gt CO2eq/year'
      }
    },
    legend: [{
      type: 'line',
      attribute: 'historic',
      label: 'Historic'
    }, {
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
        id: 'linehistoric',
        clip: '',
        type: 'line',
        data: [[[2010, 50], [2015, 57], [2020, 62]]],
        attribute: 'historic'
      },
      {
        id: 'area2030',
        clip: '',
        type: 'area',
        data: [[[2020, 0, 68], [2030, 0, 68]], [[2020, 0, 68], [2030, 0, 68]]],
        label: 'Area of interest',
        marker: [2025, 23]
      },
      {
        id: 'linendc',
        clip: '',
        type: 'line',
        data: [[[2020, 62], [2025, 61], [2030, 60], [2045, 27], [2050, 18]]],
        attribute: 'ndc'
      },
      {
        id: 'linecep',
        clip: '',
        type: 'line',
        data: [[[2020, 58], [2025, 51], [2030, 43], [2045, 24], [2050, 19]]],
        attribute: 'cep'
      },
      {
        id: 'areandccep',
        clip: '',
        type: 'area',
        data: [[[2010, 50, 50], [2015, 57, 57], [2020, 58, 62], [2025, 51, 61], [2030, 43, 60], [2045, 24, 27], [2050, 19, 18]], [[2010, 50, 50], [2015, 57, 57], [2020, 58, 62], [2025, 51, 61], [2030, 43, 60], [2045, 18, 20], [2050, 17, 15]]]
      },
      {
        id: 'linegp',
        clip: '',
        type: 'line',
        data: [[[2010, 50], [2015, 56], [2020, 58], [2030, 54], [2045, 26], [2050, 18.5]], [[2010, 50], [2015, 56], [2020, 58], [2030, 54], [2045, 24], [2050, 17]]],
        attribute: 'gp'
      },
      {
        id: 'linenz',
        clip: '',
        type: 'line',
        data: [[[2010, 50], [2015, 56], [2020, 58], [2030, 48], [2045, 25], [2050, 18.5]], [[2010, 50], [2015, 56], [2020, 58], [2030, 48], [2045, 22], [2050, 17]]],
        attribute: 'nz'
      },
      {
        id: 'markerinter',
        type: 'marker',
        data: [[[2045, 26]], [[2045, 19]]],
        label: 'Marker of interest'
      },
      {
        id: 'linetarget1',
        type: 'horizontalLine',
        data: [[[2010, 26]]],
        label: 'Line 1'
      },
      {
        id: 'linetarget2',
        type: 'horizontalLine',
        data: [[[2010, 20]]],
        label: 'Line 2'
      },
      {
        id: 'line30',
        type: 'verticalLine',
        data: [[[2030, 20]]],
        label: 'Line 3'
      }
    ],
    step: 0,
    dataset: 0,
    data: {
      scenario: '2full',
      measure: 'GHG'
    },
    highlight: false
  },
  mutations: {
    SET_STEP (state, value) {
      state.step = value
    },
    SET_DATASET (state, value) {
      state.dataset = value
    },
    SET_DATA (state, value) {
      state.data = value
    },
    SET_HIGHLIGHT (state, id) {
      state.highlight = id
    }
  },
  actions: {
    setStep ({ commit, state }, step) {
      if (step > -1 && step < state.steps.length) {
        commit('SET_STEP', step)
      }
      const data = get(state, `steps[${step}].data`, false)
      if (data) {
        commit('SET_DATA', assign(state.data, data))
      }
    },
    nextStep ({ dispatch, state }) {
      const nextStep = state.step === state.steps.length - 1 ? 0 : state.step + 1
      dispatch('setStep', nextStep)
    },
    previousStep ({ dispatch, state }) {
      const nextStep = state.step === 0 ? state.steps.length - 1 : state.step - 1
      dispatch('setStep', nextStep)
    },
    toggleDataset ({ commit, state }, id) {
      const { dataset } = state
      commit('SET_DATASET', dataset === 0 ? 1 : 0)
    },
    setData ({ commit, state }, change) {
      commit('SET_DATA', assign(state.data, change))
    },
    setHighlight ({ commit, state }, id) {
      commit('SET_HIGHLIGHT', id)
    }
  }
})

export default store

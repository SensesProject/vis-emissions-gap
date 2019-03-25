import assign from 'lodash/assign'

const state = () => {
  return {
    scenario: {
      model: 'REMIND-MAgPIE 1.7-3.0',
      scenario: 'PEP',
      degree: '1p5C',
      part: 'full',
      region: 'World',
      variable: 'Kyoto Gases',
      range: [1990, 2050]
    }
  }
}

const mutations = {
  SET_SCENARIO (state, value) {
    state.scenario = value
  }
}

const actions = {
  setScenario ({ commit, state }, change) {
    commit('SET_SCENARIO', assign({}, state.scenario, change))
  }
}

export default {
  state,
  mutations,
  actions
}

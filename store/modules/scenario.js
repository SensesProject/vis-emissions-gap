import assign from 'lodash/assign'

const state = {
  scenario: {
    model: 'REMIND-MAgPIE 1.7-3.0',
    scenario: 'PEP_1p5C_full_eff',
    region: 'World',
    variable: 'Emissions|Kyoto Gases'
  }
}

const mutations = {
  SET_SCENARIO (state, value) {
    state.scenario = value
  }
}

const actions = {
  setScenario ({ commit, state }, change) {
    commit('SET_SCENARIO', assign(state.scenario, change))
  }
}

export default {
  state,
  mutations,
  actions
}

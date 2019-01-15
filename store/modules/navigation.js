import assign from 'lodash/assign'
import get from 'lodash/get'

const state = {
  step: 0
}

const mutations = {
  SET_STEP (state, value) {
    state.step = value
  }
}

const actions = {
  setStep ({ commit, state, rootState }, step) {
    if (step > -1 && step < rootState.steps.length) {
      commit('SET_STEP', step)
    }
    const data = get(rootState, `steps[${step}].data`, false)
    if (data) {
      commit('SET_DATA', assign(rootState.data, data))
    }
  },
  nextStep ({ dispatch, state, rootState }) {
    const nextStep = state.step === rootState.steps.length - 1 ? 0 : state.step + 1
    dispatch('setStep', nextStep)
  },
  previousStep ({ dispatch, state, rootState }) {
    const nextStep = state.step === 0 ? rootState.steps.length - 1 : state.step - 1
    dispatch('setStep', nextStep)
  }
}

export default {
  state,
  mutations,
  actions
}

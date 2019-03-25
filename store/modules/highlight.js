const state = () => {
  return {
    highlight: false
  }
}

const mutations = {
  SET_HIGHLIGHT (state, id) {
    state.highlight = id
  }
}

const actions = {
  setHighlight ({ commit, state }, id) {
    commit('SET_HIGHLIGHT', id)
  }
}

export default {
  state,
  mutations,
  actions
}

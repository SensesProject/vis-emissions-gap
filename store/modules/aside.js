import { assign } from 'lodash'
import axios from 'axios'

const defaultState = {
  status: 'idle',
  data: false,
  message: false
}

const state = () => {
  return {
    data: defaultState
  }
}

const mutations = {
  DATA_ASIDE_CHANGE (state, data) {
    state.data = assign(defaultState, data)
  }
}

const actions = {
  loadData ({ commit, state }) {
    commit('DATA_ASIDE_CHANGE', { status: 'loading' })
    const url = `./data/aside.json`
    axios.get(url)
      .then(response => {
        commit('DATA_ASIDE_CHANGE', { status: 'success', data: response.data.data })
      })
      .catch(error => {
        console.log(error)
        commit('DATA_ASIDE_CHANGE', { status: 'error', message: error })
      })
  }
}

export default {
  state,
  mutations,
  actions
}

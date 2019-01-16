import axios from 'axios'
import get from 'lodash/get'
import assign from 'lodash/assign'

const state = {
  data: {}
}

const mutations = {
  DATA_CHANGE (state, data) {
    const obj = {
      status: 'idle',
      data: false,
      message: false
    }
    state.data = assign(obj, data)
  }
}

const actions = {
  loadData ({ commit, state }) {
    const { dataRank } = state
    const status = get(dataRank, 'status', false)
    if (status !== 'loading') {
      commit('DATA_CHANGE', { status: 'loading' })
      const url = 'http://localhost:3000/data'
      axios.get(url)
        .then(response => {
          const { data } = response
          console.log(data)
          commit('DATA_CHANGE', { status: 'success', data })
        })
        .catch(error => {
          console.log('error', error)
          commit('DATA_CHANGE', { status: 'error', message: error })
        })
    }
  }
}

export default {
  state,
  mutations,
  actions
}

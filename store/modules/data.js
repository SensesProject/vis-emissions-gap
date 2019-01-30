import assign from 'lodash/assign'
import axios from 'axios'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import map from 'lodash/map'
import filter from 'lodash/filter'

function processData (data) {
  return map(data, datum => {
    const [scenario, degree, part, policy] = datum.scenario.split('_')
    const values = filter(datum.values, d => {
      return d[0] <= 2050
    })
    return {
      ...datum,
      values,
      scenario,
      degree,
      part,
      policy
    }
  })
}

const state = {
  data: {}
}

const getters = {
  policies: state => {
    const data = get(state.data, 'data', [])
    return groupBy(data, 'policy')
  }
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
      const url = 'https://gist.githubusercontent.com/z3to/bcd5cf832188938e27f263034e9b9107/raw/03704477b492a0076ead09b09c3a59d391d705f1/data.json'
      axios.get(url)
        .then(response => {
          commit('DATA_CHANGE', { status: 'success', data: processData(response.data.data) })
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
  getters,
  mutations,
  actions
}

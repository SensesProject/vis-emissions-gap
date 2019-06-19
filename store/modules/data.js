import assign from 'lodash/assign'
import axios from 'axios'
import get from 'lodash/get'
import map from 'lodash/map'

function processData (data) {
  return map(data, datum => {
    let [scenario, degree, part, policy] = datum.scenario.split('_')
    if (datum.scenario === 'historic') {
      policy = 'historic'
    }
    return {
      ...datum,
      scenario,
      degree,
      part,
      policy
    }
  })
}

const state = () => {
  return {
    data: []
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
      const url = `./data/data.json`
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
  mutations,
  actions
}

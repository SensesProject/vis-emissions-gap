import { assign, map } from 'lodash'
import axios from 'axios'

function processData (data) {
  return map(data, datum => {
    const values = [datum.values[0], datum.values[0] + datum.values[1]]
    return {
      ...datum,
      values
    }
  })
}

const state = () => {
  return {
    prices: []
  }
}

const mutations = {
  PRICES_CHANGE (state, data) {
    const obj = {
      status: 'idle',
      data: false,
      message: false
    }
    state.prices = assign(obj, data)
  }
}

const actions = {
  loadData ({ commit, state }) {
    commit('PRICES_CHANGE', { status: 'loading' })
    const url = 'https://gist.githubusercontent.com/z3to/9034afe96d6cccdac94859d1ac410504/raw/c2e9f26f258440f2414b948ebc43826521f4c1e9/prices.json'
    axios.get(url)
      .then(response => {
        commit('PRICES_CHANGE', { status: 'success', data: processData(response.data.prices) })
      })
      .catch(error => {
        console.log(error)
        commit('PRICES_CHANGE', { status: 'error', message: error })
      })
  }
}

export default {
  state,
  mutations,
  actions
}

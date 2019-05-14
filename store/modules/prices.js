import { assign } from 'lodash'
import axios from 'axios'

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
    const url = `${process.env.dataURL}/data/prices.json`
    axios.get(url)
      .then(response => {
        commit('PRICES_CHANGE', { status: 'success', data: response.data.prices })
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

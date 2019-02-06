import Vue from 'vue'
import Vuex from 'vuex'
import VTooltip from 'v-tooltip'
import highlight from './modules/highlight'
import scenario from './modules/scenario'
import navigation from './modules/navigation'
import data from './modules/data'
import map from 'lodash/map'
import find from 'lodash/find'
import compact from 'lodash/compact'
import filter from 'lodash/filter'
import reverse from 'lodash/reverse'
import get from 'lodash/get'
const { config } = require('./../config.js')
const { steps } = require('./settings/steps.js')
const { legend } = require('./settings/legend.js')
const { elements } = require('./settings/elements.js')
const { axis } = require('./settings/axis.js')
const { options } = require('./settings/options.js')

Vue.use(VTooltip)
Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    data,
    highlight,
    navigation,
    scenario
  },
  state: {
    ...config,
    steps,
    axis,
    legend,
    elements,
    options,
    policies: ['historic', 'eff', 'goodpractice', 'NDC', 'netzero']
  },
  getters: {
    paths: state => {
      const { model, scenario, degree, part, variable, range, region } = state.scenario.scenario
      const { data } = state.data.data

      // Find items in the data that match the current options
      const paths = compact(map(reverse(state.policies), policy => {
        const obj = policy === 'historic'
          ? {
            scenario: 'historic',
            region,
            variable
          }
          : {
            model,
            scenario,
            degree,
            part,
            policy,
            region,
            variable
          }
        return find(data, obj)
      }))

      // Filter the data for the given years
      const [l, h] = range
      return map(paths, path => {
        const values = filter(path.values, d => {
          return d[0] <= h && d[0] >= l
        })
        return {
          ...path,
          values
        }
      })
    },
    currentPaths: (state, getters) => {
      const { paths } = getters
      const { steps } = state
      const { step } = state.navigation

      // console.log('currentPaths', paths, steps, step)

      return map(paths, path => {
        const { policy } = path
        console.log(get(steps, `${step}.clips.${policy}`), step, policy)
        return {
          ...path,
          clip: get(steps, `${step}.clips.${policy}`)
        }
      })
    }
  }
})

export default store

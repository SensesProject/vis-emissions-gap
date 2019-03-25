<template>
  <svg class="vis-prices" ref="vis">
  	<g
      v-for="dot in dots"
      :class="dot.policy"
      :key="dot.policy">
     <circle
      class="short"
      :r="dot.short"
      :cx="dot.x"
      :cy="height / 2" />
    <circle
      class="long"
      :r="dot.long"
      :cx="dot.x"
      :cy="height / 2" />
    </g>
  </svg>
</template>

<script>
  import { mapState } from 'vuex'
  import { map, pull, find, flatten, get, clone } from 'lodash'
  import { scaleLinear, scaleBand } from 'd3-scale'
  import { extent } from 'd3-array'

  export default {
    data: function () {
      return {
        width: 0,
        height: 0
      }
    },
    computed: {
      ...mapState({
        'prices': state => state.prices.prices.data,
        'scenario': state => state.scenario.scenario,
        'policiesRaw': state => state.policies
      }),
      policies: function () {
        const { policiesRaw } = this
        const policies = clone(policiesRaw)
        pull(policies, 'historic')
        return policies
      },
      extentPrices: function () {
        return extent(flatten(map(this.prices, 'values')))
      },
      scaleX: function () {
        return scaleBand()
          .paddingInner(0.05)
          .rangeRound([0, this.width])
          .domain(this.policies)
      },
      scaleR: function () {
        return scaleLinear()
          .range([10, this.height / 2])
          .domain(this.extentPrices)
      },
      dots: function () {
        const { policies, scenario, prices } = this
        const { degree, part } = scenario
        return map(policies, policy => {
          const item = find(prices, { policy, degree, part })
          const [short, long] = map(get(item, 'values'), value => {
            return this.scaleR(value)
          })
          const x = this.scaleX(policy) + this.scaleX.bandwidth() / 2
          return {
            short,
            long,
            x,
            policy
          }
        })
      }
    },
    mounted () {
      this.calcSizes()
      window.addEventListener('resize', this.calcSizes, false)
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.calcSizes, false)
    },
    methods: {
      calcSizes: function () {
        const { vis: el } = this.$refs
        const width = el.clientWidth || el.parentNode.clientWidth
        const height = el.clientHeight || el.parentNode.clientHeight
        this.width = width
        this.height = height
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  .vis-prices {
    width: 100%;
  	height: 10vh;
    color: palette(grey, 30);
    font-weight: $font-weight-bold;
    font-size: $size-default;
  }
</style>
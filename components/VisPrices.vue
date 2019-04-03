<template>
  <svg class="vis-prices" ref="vis">
  	<g
      v-if="isReady"
      v-for="dot in dots"
      :class="{ [dot.policy]: true, isVisible: visibility.indexOf(dot.policy) >= 0 }"
      :key="dot.policy">
    <text
      text-anchor="middle"
      y="10"
      :x="dot.labelX">{{ dot.policy }}</text>
    <rect
      v-if="goal >= 2030"
      class="short"
      :height="dot.short"
      :width="dot.width"
      :x="dot.x"
      :y="height - dot.short" />
    <rect
      v-if="goal >= 2050"
      class="long"
      :height="dot.long"
      :width="dot.width"
      :x="dot.x"
      :y="height - dot.long" />
    </g>
  </svg>
</template>

<script>
  import { mapState } from 'vuex'
  import { map, find, flatten, get } from 'lodash'
  import { scaleLinear, scaleBand } from 'd3-scale'
  import { extent } from 'd3-array'

  export default {
    data: function () {
      return {
        width: 0,
        height: 0,
        policies: ['NDC', 'goodpractice', 'netzero', 'eff']
      }
    },
    computed: {
      ...mapState({
        'prices': state => state.prices.prices.data,
        'scenario': state => state.scenario.scenario,
        'step': state => state.navigation.step
      }),
      ...mapState([
        'steps'
      ]),
      visibility: function () {
        return get(this.steps, `${this.step}.legend`, [])
      },
      goal: function () {
        return get(this.steps, `${this.step}.goal`, [])
      },
      extentPrices: function () {
        return extent(flatten(map(this.prices, 'values')))
      },
      scaleX: function () {
        return scaleBand()
          .padding(0.5)
          .rangeRound([0, this.width])
          .domain(this.policies)
      },
      scaleY: function () {
        return scaleLinear()
          .range([0, this.height - 15])
          .domain([0, this.extentPrices[1]])
      },
      isReady: function () {
        return this.scaleY.domain()[1] && this.width && this.height
      },
      dots: function () {
        const { policies, scenario, prices } = this
        const { degree, part } = scenario
        return map(policies, policy => {
          const item = find(prices, { policy, degree, part })
          const [short, long] = map(get(item, 'values'), value => {
            return this.scaleY(value)
          })
          const x = this.scaleX(policy)
          const width = this.scaleX.bandwidth()
          const labelX = x + width / 2
          return {
            short,
            long,
            width,
            x,
            policy,
            labelX
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

    g {
      opacity: 0;

      &.isVisible {
        opacity: 1;
      }
    }
  }
</style>
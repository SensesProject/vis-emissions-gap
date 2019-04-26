<template>
  <svg class="vis-prices" ref="vis">
    <g>
      <line
        :x1="axis.x1"
        :x2="axis.x2"
        :y1="axis.y"
        :y2="axis.y"
        class="axis" />
      <line
        :x1="axis.x1"
        :x2="axis.x1"
        :y1="axis.y"
        :y2="height - margin.bottom"
        class="tick" />
      <g>
        <g v-for="item in labels">
          <line
            :x1="item.x"
            :x2="item.x"
            :y1="item.y1"
            :y2="item.y2"
            class="label" />
          <text
            :x="item.x"
            :y="item.y"
            text-anchor="middle"
            class="label label--background">
            {{ item.label }}
          </text>
          <text
            :x="item.x"
            :y="item.y"
            text-anchor="middle"
            class="label">
            {{ item.label }}
          </text>
        </g>
      </g>
      <g>
        <g v-for="tick in axis.ticks">
          <line
            :x1="tick.x"
            :x2="tick.x"
            :y1="tick.y1"
            :y2="tick.y2"
            class="tick" />
          <text
            :x="tick.x"
            :y="tick.y3"
            class="tick"
            text-anchor="middle">
            {{ tick.label }}
          </text>
        </g>
      </g>
    </g>
  	<g
      v-if="isReady"
      v-for="dot in dots"
      :class="{ bar: true, [dot.policy]: true, isVisible: visibility.indexOf(dot.policy) >= 0 }"
      :key="dot.policy">
    <text
      text-anchor="middle"
      :x="width / 2"
      :y="dot.labelY">{{ dot.label }}</text>
    <rect
      v-if="goal >= 2030"
      class="short"
      :width="dot.short"
      :height="dot.height"
      :y="dot.y"
      :x="dot.x" />
    <rect
      v-if="goal >= 2050"
      class="long"
      :width="dot.long"
      :height="dot.height"
      :y="dot.y"
      :x="dot.x" />
    </g>
  </svg>
</template>

<script>
  import { mapState } from 'vuex'
  import { map, find, flatten, get, filter, first } from 'lodash'
  import { scaleLinear, scaleBand } from 'd3-scale'
  import { extent } from 'd3-array'

  export default {
    data: function () {
      return {
        width: 0,
        height: 0,
        margin: {
          left: 10,
          right: 10,
          top: 120,
          bottom: 30
        }
      }
    },
    computed: {
      ...mapState({
        'prices': state => state.prices.prices.data,
        'scenario': state => state.scenario.scenario,
        'step': state => state.navigation.step
      }),
      ...mapState([
        'steps',
        'legend'
      ]),
      policies: function () {
        return filter(this.legend, item => {
          return item.attribute !== 'historic'
        })
      },
      visibility: function () {
        return get(this.steps, `${this.step}.legend`, [])
      },
      goal: function () {
        return get(this.steps, `${this.step}.goal`, [])
      },
      extentPrices: function () {
        return extent(flatten(map(this.prices, 'values')))
      },
      scaleY: function () {
        return scaleBand()
          .padding(0.5)
          .rangeRound([this.margin.top, this.height])
          .domain(map(this.policies, 'attribute'))
      },
      scaleX: function () {
        return scaleLinear()
          .range([this.margin.left, this.width - this.margin.right - this.margin.left])
          .domain([0, this.extentPrices[1]]).nice(3)
      },
      isReady: function () {
        return this.scaleX.domain()[1] && this.width && this.height
      },
      dots: function () {
        const { policies, scenario, prices } = this
        const { degree, part } = scenario
        return map(policies, policy => {
          const item = find(prices, { policy: policy.attribute, degree, part })
          const [short, long] = map(get(item, 'values'), value => {
            return this.scaleX(value)
          })
          const y = this.scaleY(policy.attribute)
          const x = this.scaleX(0)
          const height = this.scaleY.bandwidth()
          const labelY = y - 20
          return {
            x,
            short,
            long,
            height,
            y,
            policy: policy.attribute,
            labelY,
            label: policy.label
          }
        })
      },
      labels: function () {
        const item = first(this.dots)
        return [{
          x: item.x + (item.short / 2),
          y: this.scaleY(item.policy) - 50,
          y1: this.scaleY(item.policy) - 45,
          y2: this.scaleY(item.policy) - 5,
          label: 'Short term'
        }, {
          x: item.x + (item.long / 2),
          y: this.scaleY(item.policy) - 50,
          y1: this.scaleY(item.policy) - 45,
          y2: this.scaleY(item.policy) - 5,
          label: 'Long term'
        }]
      },
      axis: function () {
        const [x1, x2] = this.scaleX.range()
        const y = this.margin.top / 2
        const ticks = map(this.scaleX.ticks(3), tick => {
          return {
            x: this.scaleX(tick),
            y1: y,
            y2: y - 10,
            y3: y - 20,
            label: tick
          }
        })
        return {
          y,
          x1,
          x2,
          ticks
        }
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
  	height: 100%;
    color: palette(grey, 30);
    font-weight: $font-weight-bold;
    font-size: $size-default;

    g.bar {
      opacity: 0;

      &.isVisible {
        opacity: 1;
      }
    }
  }
</style>
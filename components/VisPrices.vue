<template>
  <svg class="vis-prices" ref="vis">
    <g v-if="goal >= 2030">
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
      <text
        :x="axis.labelX"
        :y="this.margin.top / 6 * 4"
        dy="-1.5em"
        class="axis"
        text-anchor="middle">Average yearly low-carbon power sector investments (billion US$)</text>
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
      v-for="bar in elements"
      :class="bar.klass"
      :key="bar.key"
      @mouseover="setHighlight(bar.policy)"
      @mouseleave="setHighlight(false)">
      <text
        text-anchor="start"
        :x="bar.x + 5"
        :y="bar.labelY">{{ bar.label }}</text>
      <rect
        v-if="goal >= 2030"
        class="short"
        :width="bar.x1"
        :height="bar.height"
        :y="bar.y1"
        :x="bar.x" />
      <rect
        v-if="goal >= 2050"
        class="long"
        :width="bar.x2"
        :height="bar.height"
        :y="bar.y2"
        :x="bar.x" />
    </g>
  </svg>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { map, find, flatten, get, filter, first, mean } from 'lodash'
  import { scaleLinear, scaleBand } from 'd3-scale'
  import { extent } from 'd3-array'

  export default {
    data: function () {
      return {
        width: 0,
        height: 0,
        margin: {
          left: 20,
          right: 10,
          top: 60,
          bottom: 10
        }
      }
    },
    computed: {
      ...mapState({
        'prices': state => state.prices.prices.data,
        'scenario': state => state.scenario.scenario,
        'step': state => state.navigation.step,
        'highlight': state => state.highlight.highlight
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
        return get(this.steps, `${this.step}.clips`, [])
      },
      goal: function () {
        return get(this.steps, `${this.step}.goal`, [])
      },
      scaleY: function () {
        return scaleBand()
          .paddingInner(0.4)
          .paddingOuter(0.3)
          .rangeRound([this.margin.top, this.height - this.margin.bottom])
          .domain(map(this.policies, 'attribute'))
      },
      scaleY1: function () {
        return scaleBand()
          .paddingInner(0.2)
          .paddingOuter(0.1)
          .rangeRound([0, this.scaleY.bandwidth()])
          .domain([0, 1])
      },
      bars: function () {
        const { policies, scenario, prices } = this
        const { degree, part } = scenario

        return map(policies, policy => {
          return {
            ...policy,
            ...find(prices, { policy: policy.attribute, degree, part })
          }
        })
      },
      extentPrices: function () {
        return extent(flatten(map(this.bars, 'values')))
      },
      scaleX: function () {
        return scaleLinear()
          .range([this.margin.left, this.width - this.margin.right - this.margin.left])
          .domain([0, this.extentPrices[1]]).nice(3)
      },
      isReady: function () {
        return this.scaleX.domain()[1] && this.width && this.height
      },
      elements: function () {
        const { bars } = this
        return map(bars, (item, i) => {
          const y = this.scaleY(get(item, 'policy', ''))
          const [short, long] = map(get(item, 'values'), (value, i) => {
            return [y + this.scaleY1(i), this.scaleX(value)]
          })
          const [y1, x1] = short
          const [y2, x2] = long
          const x = this.scaleX(0)
          const height = this.scaleY1.bandwidth()
          const labelY = y - 10
          const policy = get(item, 'policy', '')
          const klass = [
            'bar',
            policy
          ]

          if (get(this.visibility, policy, false) !== 'start') {
            klass.push('isVisible')
          }
          if (this.highlight) {
            klass.push(this.highlight === policy ? 'isHighlight' : 'hasHighlight')
          }

          return {
            height,
            x,
            x1,
            y1,
            x2,
            y2,
            klass: klass.join(' '),
            policy,
            key: get(item, 'policy', '') + i,
            labelY,
            label: get(item, 'label', '')
          }
        })
      },
      labels: function () {
        const item = first(this.elements)
        const labels = []
        if (this.goal >= 2030) {
          const y = this.scaleY(item.policy) - this.scaleY1(0)
          labels.push({
            x: item.x + (item.x1 * 0.9),
            y: y - 6,
            y1: y - 2,
            y2: y + 6,
            label: '2020–2030'
          })
        }
        if (this.goal >= 2050) {
          labels.push({
            x: item.x + (item.x2 * 0.62),
            y: this.scaleY(item.policy) + this.scaleY1(1) + item.height + 22,
            y1: this.scaleY(item.policy) + this.scaleY1(1) + item.height + 10,
            y2: this.scaleY(item.policy) + this.scaleY1(1) + item.height + 2,
            label: '2030–2050'
          })
        }
        return labels
      },
      axis: function () {
        const [x1, x2] = this.scaleX.range()
        const y = this.margin.top
        const labelX = mean(this.scaleX.range())
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
          ticks,
          labelX
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
      },
      ...mapActions([
        'setHighlight'
      ])
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
      visibility: hidden;
      pointer-events: none;

      &.isVisible {
        visibility: visible;
        pointer-events: all;
        opacity: 1;

        &.hasHighlight {
          opacity: 0.2;
        }
      }
    }
  }
</style>
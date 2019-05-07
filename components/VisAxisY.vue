<template>
	<g>
    <line
      class="axis"
      :x1="axis.x"
      :x2="axis.x"
      :y1="margin.top"
      :y2="height - margin.bottom" />
    <g
      v-for="tick in axis.ticks"
      :key="tick.key"
      v-if="tick.isVisible">
      <text
        :y="tick.y + 'px'"
        :x="d * 5.5 + 'px'"
        text-anchor="end"
        dominant-baseline="middle"
        class="tick">
        {{ tick.label }}
      </text>
      <line
        :x1="margin.left + 'px'"
        :y1="tick.y + 'px'"
        :x2="d * 6 + 'px'"
        :y2="tick.y + 'px'"
        class="tick" />
    </g>
    <g>
      <rect
        class="background"
        x="0"
        :width="boxMaxWidth"
        :height="boxHeight + boxMargin"
        :y="boxY - boxOffset" />
      <text
        v-for="group in ['label label--background', 'axis']"
        :class="`${group} axis--reading`"
        :y="label.today[1] + 'px'"
        text-anchor="start"
        ref="text">
        <tspan
          v-for="(text, i) in label.texts"
          :dominant-baseline="i === 0 ? 'middle' : 'baseline'"
          ref="texts"
          :x="0 + 'px'"
          :dy="i === 0 ? '' : '1.5em'"
          v-html="text" />
      </text>
      <line
        class="swoop"
        :x1="boxWidth + 5"
        :x2="label.today[0]"
        :y1="label.today[1]"
        :y2="label.today[1]" />
    </g>
  </g>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import { map, mean, last, find, get, inRange } from 'lodash'
  import { format } from 'd3-format'

  const f = format(`,.2r`)

  export default {
    props: ['margin', 'height', 'scaleY', 'scaleX'],
    data: function () {
      return {
        boxY: 0,
        boxWidth: 0,
        boxHeight: 0,
        boxMaxWidth: 0,
        boxOffset: 5,
        boxMargin: 20
      }
    },
    computed: {
      ...mapState({
        'variable': state => state.scenario.scenario.variable,
        'region': state => state.scenario.scenario.region
      }),
      ...mapGetters([
        'currentPaths'
      ]),
      d: function () {
        return this.margin.left / 7
      },
      axis: function () {
        const { scaleY, scaleX, d } = this
        const label = `Gt CO2/yr (${this.region})` // variable === 'CO2' ? 'Gt CO2/yr' : 'Gt CO2eq/yr'
        const y = scaleY(mean(scaleY.domain()))
        const x = scaleX(scaleX.domain()[0])
        return {
          label,
          x,
          y,
          ticks: map(scaleY.ticks(6), (tick, i) => {
            const y = scaleY(tick)
            const threshold = 10
            const isVisible = !inRange(y, this.boxY - this.boxOffset - threshold, this.boxY + this.boxHeight + this.boxMargin + threshold)
            return {
              key: i,
              label: f(tick),
              y,
              isVisible,
              x: d
            }
          })
        }
      },
      label: function () {
        const today = last(get(find(this.currentPaths, { scenario: 'historic' }), 'values', []))
        const x = this.scaleX(this.scaleX.domain()[0])
        const texts = [`${format(`,.3r`)(today[1])} Gt`, `CO2/year (${this.region})`, `from ${this.variable}`]

        return {
          today: [this.scaleX(new Date(today[0], 0, 1)), this.scaleY(today[1])],
          x,
          texts
        }
      }
    },
    mounted () {
      this.calcSizes()
      window.addEventListener('resize', this.calcSizes, false)
    },
    updated () {
      this.calcSizes()
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.calcSizes, false)
    },
    methods: {
      calcSizes: function () {
        const { texts, text } = this.$refs
        this.boxWidth = texts[0].getComputedTextLength() || 0
        this.boxMaxWidth = Math.max(...map(texts, text => {
          return text.getComputedTextLength()
        }))
        this.boxHeight = text[0].getBBox().height || 0
        this.boxY = text[0].getBBox().y || 0
      }
    }
  }
</script>

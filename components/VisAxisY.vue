<template>
	<g>
    <line
      class="axis"
      :x1="axis.x"
      :x2="axis.x"
      :y1="margin.top"
      :y2="height - margin.bottom" />
    <text
      class="axis"
      :x="d * 1.5 + 'px'"
      :y="axis.y + 'px'"
      :transform="`rotate(-90 ${d * 1.5} ${axis.y})`"
      text-anchor="middle"
      dominant-baseline="baseline">
      {{ axis.label }}
    </text>
    <g
      v-for="tick in axis.ticks"
      :key="tick.key">
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
  </g>
</template>

<script>
  import { mapState } from 'vuex'
  import map from 'lodash/map'
  import mean from 'lodash/mean'
  import { format } from 'd3-format'

  const f = format(`.1s`)

  export default {
    props: ['margin', 'height', 'scaleY', 'scaleX'],
    computed: {
      ...mapState({
        'variable': state => state.scenario.scenario.variable
      }),
      d: function () {
        return this.margin.left / 7
      },
      axis: function () {
        const { scaleY, scaleX, d } = this
        const label = 'Gt CO2/yr' // variable === 'CO2' ? 'Gt CO2/yr' : 'Gt CO2eq/yr'
        const y = scaleY(mean(scaleY.domain()))
        const x = scaleX(scaleX.domain()[0])
        return {
          label,
          x,
          y,
          ticks: map(scaleY.ticks(), (tick, i) => {
            return {
              key: i,
              label: f(tick),
              y: scaleY(tick),
              x: d
            }
          })
        }
      }
    }
  }
</script>

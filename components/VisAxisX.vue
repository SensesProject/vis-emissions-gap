<template>
  <g>
    <line
      class="axis"
      :x1="margin[0]"
      :x2="width - margin[0]"
      :y1="height - margin[1]"
      :y2="height - margin[1]" />
    <g
      v-for="tick in axis.ticks"
      :key="tick.key">
      <text
        :y="tick.y + 'px'"
        :x="tick.x + 'px'"
        text-anchor="middle"
        class="tick">
        {{ tick.label }}
      </text>
      <line
        :y1="height - margin[1] + 'px'"
        :x1="tick.x + 'px'"
        :y2="height - margin[1] + margin[1] / 5 + 'px'"
        :x2="tick.x + 'px'"
        class="tick" />
    </g>
  </g>
</template>

<script>
  import map from 'lodash/map'
  import mean from 'lodash/mean'
  import { timeFormat } from 'd3-time-format'

  export default {
    props: ['margin', 'height', 'width', 'scaleX'],
    computed: {
      axis: function () {
        const { scaleX, height } = this
        const label = 'time'
        const x = scaleX(mean(scaleX.domain()))
        return {
          label,
          x,
          y: height - 20,
          ticks: map(scaleX.ticks(), (tick, i) => {
            return {
              key: i,
              label: timeFormat('%Y')(tick),
              y: this.height - this.margin[1] / 2,
              x: scaleX(tick)
            }
          })
        }
      }
    }
  }
</script>

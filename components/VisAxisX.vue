<template>
  <g>
    <line
      class="axis"
      :x1="margin[0]"
      :x2="width - margin[0]"
      :y1="margin[1]"
      :y2="margin[1]" />
    <g
      v-for="tick in ticks"
      :key="tick.key">
      <text
        :y="tick.y + 'px'"
        :x="tick.x + 'px'"
        text-anchor="middle"
        class="tick">
        {{ tick.label }}
      </text>
      <line
        :y1="margin[1] + 'px'"
        :x1="tick.x + 'px'"
        :y2="margin[1] - margin[1] / 5 + 'px'"
        :x2="tick.x + 'px'"
        class="tick" />
    </g>
  </g>
</template>

<script>
  import map from 'lodash/map'
  import { timeFormat } from 'd3-time-format'

  export default {
    props: ['margin', 'height', 'width', 'scaleX'],
    computed: {
      ticks: function () {
        const { scaleX } = this
        return map(scaleX.ticks(), (tick, i) => {
          return {
            key: i,
            label: timeFormat('%Y')(tick),
            y: this.margin[1] / 2,
            x: scaleX(tick)
          }
        })
      }
    }
  }
</script>

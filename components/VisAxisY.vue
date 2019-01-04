<template>
	<g>
    <line
      class="axis"
      :x1="margin[0]"
      :x2="margin[0]"
      :y1="margin[1]"
      :y2="height - margin[1]" />
    <text
      class="axis"
      :x="axis.x"
      :y="axis.y"
      :transform="`rotate(-90 ${axis.x} ${axis.y})`"
      text-anchor="middle">
      {{ axis.label }}
    </text>
    <g
      v-for="tick in axis.ticks"
      :key="tick.key">
      <text
        :y="tick.y + 'px'"
        :x="tick.x + 'px'"
        text-anchor="end"
        dominant-baseline="middle"
        class="tick">
        {{ tick.label }}
      </text>
      <line
        :x1="margin[0] + 'px'"
        :y1="tick.y + 'px'"
        :x2="margin[0] - margin[0] / 5 + 'px'"
        :y2="tick.y + 'px'"
        class="tick" />
    </g>
  </g>
</template>

<script>
  import { mapState } from 'vuex'
  import map from 'lodash/map'
  import mean from 'lodash/mean'
  import get from 'lodash/get'

  export default {
    props: ['margin', 'height', 'scaleY'],
    computed: {
      ...mapState([
        'data'
      ]),
      axis: function () {
        const { scaleY, data } = this
        const label = get(data, 'measure') === 'GHG' ? 'Gt CO2eq/yr' : 'Gt CO2/yr'
        const y = scaleY(mean(scaleY.domain()))
        return {
          label,
          x: 20,
          y,
          ticks: map(scaleY.ticks(), (tick, i) => {
            return {
              key: i,
              label: tick,
              y: scaleY(tick),
              x: this.margin[0] / 2
            }
          })
        }
      }
    }
  }
</script>

<template>
  <g class="axisY">
    <line
      class="axis"
      :x1="margin[0]"
      :x2="width - margin[0]"
      :y1="margin[1]"
      :y2="margin[1]" />
    <g class="lables">
      <g v-for="label in labels">
        <text
          :y="label.y + 'px'"
          text-anchor="middle">
          <tspan
            :x="label.x + 'px'"
            dy="-0.5em"
            class="tick"
            v-html="label.label" />
          <tspan
            class="info"
            :x="label.x + 'px'"
            dy="1.5em"
            v-html="label.year" />
        </text>
        <line
          :y1="margin[1] + 'px'"
          :x1="label.x + 'px'"
          :y2="margin[1] - margin[1] / 5 + 'px'"
          :x2="label.x + 'px'"
          class="tick" />
      </g>
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
      },
      labels: function () {
        const labels = [
          [2019, 'Today'],
          [2030, 'Short term goals'],
          [2050, 'Long term goals']
        ]

        return map(labels, pair => {
          const [year, label] = pair
          return {
            x: this.scaleX(new Date(year, 1, 1)),
            y: this.margin[1] / 2,
            year,
            label
          }
        })
      }
    }
  }
</script>

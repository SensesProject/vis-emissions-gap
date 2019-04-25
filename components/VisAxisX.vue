<template>
  <g class="axisY">
    <line
      class="axis"
      :x1="margin.left"
      :x2="width - margin.right"
      :y1="margin.top"
      :y2="margin.top" />
    <g class="lables">
      <g v-for="label in labels">
        <text
          :y="label.y + 'px'"
          text-anchor="middle">
          <tspan
            class="tick"
            :x="label.x + 'px'"
            dy="0"
            v-html="label.year" />
          <tspan
            :x="label.x + 'px'"
            dy="-1.5em"
            class="tick important"
            v-html="label.label" />
        </text>
        <line
          :y1="margin.top + 'px'"
          :x1="label.x + 'px'"
          :y2="margin.top - margin.top / 7 + 'px'"
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
            y: this.margin.top / 5,
            x: scaleX(tick)
          }
        })
      },
      labels: function () {
        const labels = [
          [1990, ''],
          [2000, ''],
          [2010, ''],
          [2019, 'Today'],
          [2030, 'Short term goals'],
          [2040, ''],
          [2050, 'Long term goals']
        ]

        return map(labels, pair => {
          const [year, label] = pair
          return {
            x: this.scaleX(new Date(year, 0, 1)),
            y: this.margin.top / 6 * 4,
            year,
            label
          }
        })
      }
    }
  }
</script>

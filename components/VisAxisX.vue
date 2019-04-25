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
          :y1="margin.top + 'px'"
          :x1="label.x + 'px'"
          :y2="margin.top - margin.top / 5 + 'px'"
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
            y: this.margin.top / 2,
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
            x: this.scaleX(new Date(year, 1, 1)),
            y: this.margin.top / 2,
            year,
            label
          }
        })
      }
    }
  }
</script>

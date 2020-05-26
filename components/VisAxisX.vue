<template>
  <g class="axisY">
    <line
      class="axis"
      :x1="margin.left"
      :x2="width"
      :y1="margin.top"
      :y2="margin.top"
    />
    <g class="lables">
      <transition-group name="fade" tag="g">
        <g v-for="label in labels" :key="label.year">
          <text
            :y="label.y + 'px'"
            text-anchor="middle"
          >
            <tspan
              class="tick"
              :x="label.x + 'px'"
              dy="0"
            >
              {{ label.year }}
            </tspan>
            <tspan
              v-if="label.label"
              :x="label.x + 'px'"
              dy="-1.4em"
              class="tick important"
            >
              {{ label.label + (!isLongTerm && label.long ? label.long : '') }}
            </tspan>
          </text>
          <line
            :y1="margin.top + 'px'"
            :x1="label.x + 'px'"
            :y2="margin.top - 10 + 'px'"
            :x2="label.x + 'px'"
            class="tick"
          />
        </g>
      </transition-group>
    </g>
  </g>
</template>

<script>
import map from 'lodash/map'
import { timeFormat } from 'd3-time-format'

export default {
  props: ['margin', 'height', 'width', 'scaleX'],
  computed: {
    ticks () {
      const { scaleX } = this
      return map(scaleX.ticks(), (tick, i) => {
        return {
          key: i,
          label: timeFormat('%Y')(tick),
          y: this.margin.top / 10,
          x: scaleX(tick)
        }
      })
    },
    isLongTerm () {
      return new Date(2050, 0, 1) < this.scaleX.domain()[1]
    },
    labels () {
      const labels = [
        [1990],
        [2000],
        [2010],
        [2020],
        [2030, 'Near-term', ' plans'],
        [2040],
        [2050, 'Long-term', ' targets'],
        [2075],
        [2100]
      ]

      return map(labels, (pair) => {
        const [year, label, long] = pair
        return {
          x: this.scaleX(new Date(year, 0, 1)),
          y: this.margin.top / 6 * 4,
          year,
          label,
          long
        }
      })
    }
  }
}
</script>

<template>
  <g v-if="isUsed">
    <path
      class="arrow arrow--area"
      :d="area"
    />
    <path
      class="arrow arrow--path"
      :d="path"
    />
    <text
      :x="center[0]"
      :y="center[1]"
      class="label label--path label--background"
      text-anchor="middle"
    >
      {{ el.label }}
    </text>
    <text
      :x="center[0]"
      :y="center[1]"
      class="label label--path"
      text-anchor="middle"
    >
      {{ el.label }}
    </text>
  </g>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { timeParse } from 'd3-time-format'
import { find, get, last, mean } from 'lodash'

export default {
  props: ['el', 'scaleX', 'scaleY', 'data'],
  computed: {
    ...mapState({
      variable: state => state.scenario.scenario.variable
    }),
    ...mapGetters([
      'currentPaths'
    ]),
    isUsed () { // Will hide some elements
      return this.variable === 'CO2|Energy and Industrial Processes'
    },
    today () {
      const [x, y] = last(get(find(this.currentPaths, { scenario: 'historic-landuse-addition' }), 'values', []))
      return [this.scaleX(timeParse('%Y')(x)), this.scaleY(y)]
    },
    start () {
      const [, y] = last(get(find(this.currentPaths, { scenario: 'historic-landuse-addition' }), 'values', []))
      return [this.scaleX(timeParse('%Y')(this.data[0][0])), this.scaleY(y)]
    },
    x () {
      return this.scaleX(timeParse('%Y')(this.data[1][0]))
    },
    y () {
      return this.scaleY(this.data[1][1])
    },
    path () {
      return `M${this.today.join(' ')} L ${this.start.join(' ')} L ${this.x} ${this.y}`
    },
    area () {
      const x1 = this.scaleX(timeParse('%Y')(this.data[2][0]))
      const x2 = this.scaleX(timeParse('%Y')(this.data[3][0]))
      return `M${this.start.join(' ')} L ${x1} ${this.y} L ${x2} ${this.y} Z`
    },
    center () {
      const x = mean([this.x, this.start[0]])
      const y = mean([this.y, this.start[1]])
      return [x, y]
    }
  }
}
</script>

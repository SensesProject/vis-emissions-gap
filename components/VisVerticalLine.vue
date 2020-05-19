<template>
  <g>
    <line
      class="verticalLine"
      :x1="x"
      :x2="x"
      :y1="y1"
      :y2="y2"
    />
    <text
      v-if="el.label"
      class="verticalLine marker"
      :x="x"
      :y="y2 - 5"
      text-anchor="middle"
    >
      {{ el.label }}
    </text>
  </g>
</template>

<script>
import { timeParse } from 'd3-time-format'

export default {
  props: {
    el: {
      type: Object,
      default: () => {
        return {}
      }
    },
    data: {
      type: Array,
      default: () => []
    },
    scaleX: {
      type: Function,
      default: () => {}
    },
    scaleY: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    y1 () {
      return this.scaleY.range()[0]
    },
    y2 () {
      return this.scaleY.range()[1]
    },
    x () {
      return this.scaleX(timeParse('%Y')(this.data[0][0]))
    }
  }
}
</script>

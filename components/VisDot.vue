<template>
  <g>
    <circle
      v-if="false"
      class="dot"
      :cx="x + 'px'"
      :cy="y + 'px'"
      :r="r"
      :title="el.id"
    />
    <text
      v-if="el.label"
      :x="x"
      :y="y - r - offset"
      text-anchor="middle"
      class="dot"
    >
      {{ el.label }}
    </text>
  </g>
</template>

<script>
import { timeParse } from 'd3-time-format'

export default {
  props: ['el', 'scaleX', 'scaleY', 'data'],
  data () {
    return {
      r: 7,
      offset: 0
    }
  },
  computed: {
    x () {
      return this.scaleX(timeParse('%Y')(this.data[0][0]))
    },
    y () {
      return this.scaleY(this.data[0][1])
    }
  }
}
</script>

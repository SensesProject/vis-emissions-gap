<template>
  <g>
    <circle
      class="marker"
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
      class="marker"
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
      type: Object
    },
    scaleX: {
      type: Function
    },
    scaleY: {
      type: Function
    },
    data: {
      type: Array
    }
  },
  data () {
    return {
      r: 40,
      offset: 15
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

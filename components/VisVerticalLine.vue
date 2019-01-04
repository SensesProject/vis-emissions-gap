<template>
  <g>
    <line
      class="verticalLine"
      :x1="x"
      :x2="x"
      :y1="y1"
      :y2="y2" />
    <text
      v-if="el.label"
      class="verticalLine"
      :x="x"
      :y="y2 - 10"
      text-anchor="middle"
    >{{ el.label }}</text>
  </g>
</template>

<script>
  import { timeParse } from 'd3-time-format'

  export default {
    props: ['el', 'scaleX', 'scaleY', 'data'],
    computed: {
      y1: function () {
        return this.scaleY.range()[0]
      },
      y2: function () {
        return this.scaleY.range()[1]
      },
      x: function () {
        return this.scaleX(timeParse('%Y')(this.data[0][0]))
      }
    }
  }
</script>

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
    data: function () {
      return {
        x: 0,
        y1: 0,
        y2: 0
      }
    },
    methods: {
      render: function () {
        const { scaleX, scaleY, data } = this
        const [y1, y2] = scaleY.range()
        console.log('verticalLine', data[0][0])
        this.y1 = y1
        this.y2 = y2
        this.x = scaleX(timeParse('%Y')(data[0][0]))
      }
    }
  }
</script>

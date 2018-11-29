<template>
  <path
    :class="'line ' + el.attribute"
    :d="d" />
</template>

<script>
  import { line } from 'd3-shape'
  import { timeParse } from 'd3-time-format'

  export default {
    props: ['el', 'scaleX', 'scaleY', 'data'],
    data: function () {
      return {
        d: 'M0 0'
      }
    },
    methods: {
      drawLine: function () {
        const { scaleX, scaleY } = this
        return line()
          .x((d, i) => {
            return scaleX(timeParse('%Y')(d[0]))
          })
          .y((d, i) => {
            return scaleY(d[1])
          })
      },
      render: function () {
        console.log(this.el)
        this.d = this.drawLine()(this.data)
      }
    }
  }
</script>

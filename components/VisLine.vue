<template>
  <path
    :class="'line ' + el.attribute"
    :d="d" />
</template>

<script>
  import { line } from 'd3-shape'

  export default {
    props: ['el', 'scaleX', 'scaleY', 'data'],
    computed: {
      d: function () {
        return this.drawLine()(this.data)
      }
    },
    methods: {
      drawLine: function () {
        const { scaleX, scaleY } = this
        return line()
          .x((d, i) => {
            return scaleX(new Date(d[0], 1, 1))
          })
          .y((d, i) => {
            return scaleY(d[1])
          })
      }
    }
  }
</script>

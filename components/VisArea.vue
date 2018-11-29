<template>
	<g>
  	<path
      class="area"
      :d="d" />
  	<text
  		v-if="el.label"
  		:x="x"
  		:y="y"
  		text-anchor="middle"
  		class="area">
  		{{ el.label }}
  	</text>
  </g>
</template>

<script>
  import { area } from 'd3-shape'
  import { timeParse } from 'd3-time-format'

  export default {
    props: ['el', 'scaleX', 'scaleY', 'data'],
    data: function () {
      return {
        d: 'M0 0',
        x: 0,
        y: 0
      }
    },
    methods: {
      drawArea: function () {
        const { scaleX, scaleY } = this
        return area()
          .x((d, i) => {
            return scaleX(timeParse('%Y')(d[0]))
          })
          .y1((d, i) => {
            return scaleY(d[2])
          })
          .y0((d, i) => {
            return scaleY(d[1])
          })
      },
      render: function () {
        const { scaleX, scaleY, drawArea, data } = this
        const [x, y] = this.el.marker || [0, 0]
        this.d = drawArea()(data)
        this.x = scaleX(timeParse('%Y')(x))
        this.y = scaleY(y)
      }
    }
  }
</script>

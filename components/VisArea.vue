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
  import get from 'lodash/get'

  export default {
    props: ['el', 'scaleX', 'scaleY', 'data'],
    computed: {
      d: function () {
        return this.drawArea()(this.data)
      },
      x: function () {
        const x = get(this.el.marker, '0', 0)
        return this.scaleX(timeParse('%Y')(x))
      },
      y: function () {
        const y = get(this.el.marker, '1', 0)
        return this.scaleY(y)
      }
    },
    methods: {
      drawArea: function () {
        const { scaleX, scaleY } = this
        const [l, h] = this.scaleY.domain()
        return area()
          .x((d, i) => {
            return scaleX(timeParse('%Y')(d[0]))
          })
          .y1(scaleY(l))
          .y0(scaleY(h))
      }
    }
  }
</script>

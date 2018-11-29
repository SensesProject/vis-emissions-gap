<template>
	<g>
	  <circle
	    class="marker"
	    :cx="x + 'px'"
	    :cy="y + 'px'"
	    :r="r"
	    :title="el.id" />
	  <text
  		v-if="el.label"
  		:x="x"
  		:y="y - r - offset"
  		text-anchor="middle"
  		class="marker">
  		{{ el.label }}
  	</text>
	</g>
</template>

<script>
  import { timeParse } from 'd3-time-format'

  export default {
    props: ['el', 'scaleX', 'scaleY', 'data'],
    data: function () {
      return {
        x: 0,
        y: 0,
        r: 40,
        offset: 15
      }
    },
    methods: {
      render: function () {
        const { scaleX, scaleY, data } = this
        console.log('data', data)
        this.x = scaleX(timeParse('%Y')(data[0][0]))
        this.y = scaleY(data[0][1])
      }
    }
  }
</script>

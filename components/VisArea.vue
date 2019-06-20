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
  import { mapGetters } from 'vuex'
  import { area } from 'd3-shape'
  import { timeParse } from 'd3-time-format'
  import { get, last, find, map } from 'lodash'

  export default {
    props: ['el', 'scaleX', 'scaleY', 'data'],
    computed: {
      ...mapGetters([
        'currentPaths'
      ]),
      today: function () {
        const [x, y] = last(get(find(this.currentPaths, { scenario: 'historic-landuse' }), 'values', []))
        return [this.scaleX(timeParse('%Y')(x)), this.scaleY(y)]
      },
      area: function () {
        const data = map(this.data, (datum, i) => {
          return [this.scaleX(timeParse('%Y')(datum[0])), i === 0 ? this.today[1] : this.scaleY(0)]
        })
        const foo = [this.today, ...data]
        return foo
      },
      d: function () {
        return this.drawArea()(this.area)
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
        const { scaleY } = this
        return area()
          .x((d, i) => {
            return d[0]
          })
          .y1((d, i) => {
            return d[1]
          })
          .y0(scaleY(0))
      }
    }
  }
</script>

<template>
	<g v-if="isUsed">
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
  import { mapState, mapGetters } from 'vuex'
  import { area } from 'd3-shape'
  import { timeParse } from 'd3-time-format'
  import { get, last, find, map } from 'lodash'

  export default {
    props: ['el', 'scaleX', 'scaleY', 'data'],
    computed: {
      ...mapState({
        variable: state => state.scenario.scenario.variable
      }),
      ...mapGetters([
        'currentPaths'
      ]),
      isUsed: function () { // Will hide some elements
        return this.variable === 'CO2|Energy and Industrial Processes'
      },
      today: function () {
        const [x, y] = last(get(find(this.currentPaths, { scenario: 'historic-landuse-addition' }), 'values', []))
        return [this.scaleX(timeParse('%Y')(x)), this.scaleY(y)]
      },
      area: function () {
        const data = map(this.data, (datum, i) => {
          return [this.scaleX(timeParse('%Y')(datum[0])), i === 0 ? this.today[1] : this.scaleY(0)]
        })
        return [this.today, ...data]
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

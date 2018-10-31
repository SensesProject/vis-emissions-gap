<template>
  <section ref="vis">
    <svg :width="width + 'px'" :height="height + 'px'">
      <defs>
        <clipPath
          v-for="(el, i) in clipPathElements"
          :id="'clip' + i">
          <rect
            class="clip"
            x="0%"
            y="0%"
            :height="el.height"
            :width="el.width" />
        </clipPath>
      </defs>
      <g v-if="width && height">
        <path class="area" :d="areaElement" clip-path="url(#clip1)" />
        <path class="line" :d="lineElement" clip-path="url(#clip0)" />
      </g>
    </svg>
  </section>
</template>

<script>
  import { mapState } from 'vuex'
  import { scaleLinear } from 'd3-scale'
  import { area, line } from 'd3-shape'
  import maxBy from 'lodash/maxBy'
  import map from 'lodash/map'

  export default {
    data: function () {
      const scaleX = scaleLinear()
      const scaleY = scaleLinear()

      return {
        width: 0,
        height: 0,
        scaleX,
        scaleY
      }
    },
    created () {
      this.setScales()
    },
    mounted () {
      this.calcSizes()
      window.addEventListener('resize', this.calcSizes, false)
    },
    computed: {
      ...mapState([
        'step',
        'data',
        'steps'
      ]),
      lineElement () {
        const { drawLine, data } = this
        return drawLine()(data)
      },
      areaElement () {
        const { drawArea, data } = this
        return drawArea()(data)
      },
      clipPathElements: function () {
        const { steps, step } = this

        return map(steps[step].clips, clip => {
          return {
            'height': 100 + '%',
            'width': 100 * clip + '%'
          }
        })
      }
    },
    methods: {
      drawLine: function () {
        const { scaleX, scaleY } = this
        return line()
          .x((d, i) => {
            return scaleX(d[0])
          })
          .y((d, i) => {
            return scaleY(d[1])
          })
      },
      drawArea: function () {
        const { scaleX, scaleY } = this
        return area()
          .x((d, i) => {
            return scaleX(d[0])
          })
          .y1((d, i) => {
            return scaleY(d[1])
          })
          .y0((d, i) => {
            return scaleY(0)
          })
      },
      setScales: function () {
        const { data } = this
        const maxX = maxBy(data, d => { return d[0] })[0]
        const maxY = maxBy(data, d => { return d[1] })[1]
        this.scaleX.domain([0, maxX])
        this.scaleY.domain([0, maxY])
        console.log('set scale domains to', this.scaleX.domain(), this.scaleY.domain())
      },
      calcSizes: function () {
        const { vis: el } = this.$refs
        this.width = el.clientWidth || el.parentNode.clientWidth
        this.height = el.clientHeight || el.parentNode.clientHeight
        this.scaleY.range([this.height, 0])
        this.scaleX.range([0, this.width])
        console.log('set scale ranges to', this.scaleX.range(), this.scaleY.range())
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  path.line {
    stroke: #000;
    stroke-width: 3px;
  }

  path.area {
    fill: red;
  }

  rect {
    &.clip {
      transition-duration: 0.3s;
    }
  }

</style>

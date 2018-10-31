<template>
  <section ref="vis">
    <svg :width="width + 'px'" :height="height + 'px'">
      <defs>
        <clipPath
          v-for="(el, i) in clipPathElements"
          :id="el.clip">
          <rect
            class="clip"
            x="0%"
            y="0%"
            :height="el.height"
            :width="el.width" />
        </clipPath>
      </defs>
      <g v-if="width && height">
        <path v-for="el in visualElements" :class="el.klass" :d="el.d" :clip-path="`url(#${el.clip})`" />
      </g>
    </svg>
  </section>
</template>

<script>
  import { mapState } from 'vuex'
  import { scaleLinear, scaleTime } from 'd3-scale'
  import { area, line } from 'd3-shape'
  import map from 'lodash/map'
  import get from 'lodash/get'
  import flatten from 'lodash/flatten'

  function extractValues (arr, path) {
    return flatten(map(arr, a => {
      return map(a.data, d => {
        return get(d, path)
      })
    }))
  }

  export default {
    data: function () {
      const scaleX = scaleTime()
      const scaleY = scaleLinear()

      return {
        marginPercent: 0.1,
        width: 0,
        height: 0,
        margin: [0, 0],
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
        'steps',
        'elements'
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
        const { steps, step, scaleX } = this

        return map(steps[step].clips, (clip, id) => {
          return {
            'clip': `clip${id}`,
            'height': 100 + '%',
            'width': clip ? scaleX(clip) : 0
          }
        })
      },
      visualElements () {
        return map(this.elements, element => {
          const { type, data, clip } = element
          const d = type === 'line' ? this.drawLine()(data) : this.drawArea()(data)
          const klass = type
          return {
            d,
            klass,
            clip: `clip${clip}`
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
            return scaleY(d[2])
          })
          .y0((d, i) => {
            return scaleY(d[1])
          })
      },
      setScales: function () {
        const { elements } = this
        const xValues = extractValues(elements, '0')
        const yValues = extractValues(elements, '1')
        const minX = Math.min(...xValues)
        const maxX = Math.max(...xValues)
        const maxY = Math.max(...yValues)
        this.scaleX.domain([minX, maxX])
        this.scaleY.domain([0, maxY])
        console.log('set scale domains to', this.scaleX.domain(), this.scaleY.domain())
      },
      calcSizes: function () {
        const { vis: el } = this.$refs
        const { marginPercent } = this
        const width = el.clientWidth || el.parentNode.clientWidth
        const height = el.clientHeight || el.parentNode.clientHeight
        this.width = width
        this.height = height
        const marginVertical = height * marginPercent
        const marginHorizontal = width * marginPercent
        this.margin = [marginHorizontal, marginVertical]
        this.scaleY.range([height - marginVertical, marginVertical]) // Because upside down
        this.scaleX.range([marginHorizontal, width - marginHorizontal]) // Because left -> right
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
    fill: none;
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

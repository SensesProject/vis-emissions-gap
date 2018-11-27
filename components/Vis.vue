<template>
  <section class="vis-wrapper">
    <div class="vis-container" ref="vis">
      <transition name="fade">
        <svg :width="width + 'px'" :height="height + 'px'" class="vis">
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
            <component
              v-for="el in visualElements"
              v-tooltip="'This is a tooltip.'"
              :key="el.i"
              v-bind:is="el.comp"
              :el="el"
              :visibility="steps[step].visibility" />
          </g>
          <g>
            <line
              class="axis"
              :x1="margin[0]"
              :x2="width - margin[0]"
              :y1="height - margin[1]"
              :y2="height - margin[1]" />
            <g
              v-for="tick in ticksX"
              :key="tick.key">
              <text
                :y="tick.y + 'px'"
                :x="tick.x + 'px'"
                text-anchor="middle"
                class="tick">
                {{ tick.label }}
              </text>
              <line
                :y1="height - margin[1] + 'px'"
                :x1="tick.x + 'px'"
                :y2="height - margin[1] + margin[1] / 5 + 'px'"
                :x2="tick.x + 'px'"
                class="tick" />
            </g>
          </g>
          <g v-if="axisY">
            <line
              class="axis"
              :x1="margin[0]"
              :x2="margin[0]"
              :y1="margin[1]"
              :y2="height - margin[1]" />
            <text
              class="axis"
              :x="axisY.x"
              :y="axisY.y"
              :transform="`rotate(-90 ${axisY.x} ${axisY.y})`"
              text-anchor="middle">
              {{ axisY.label }}
            </text>
            <g
              v-for="tick in axisY.ticks"
              :key="tick.key">
              <text
                :y="tick.y + 'px'"
                :x="tick.x + 'px'"
                text-anchor="end"
                dominant-baseline="middle"
                class="tick">
                {{ tick.label }}
              </text>
              <line
                :x1="margin[0] + 'px'"
                :y1="tick.y + 'px'"
                :x2="margin[0] - margin[0] / 5 + 'px'"
                :y2="tick.y + 'px'"
                class="tick" />
            </g>
          </g>
        </svg>
      </transition>
    </div>
    <footer class="vis-footer">
      <VisLegend :elements="legend" :visibility="steps[step].attributes" />
      <VisOptions :visibility="steps[step].visibility" />
    </footer>
  </section>
</template>

<script>
  import { mapState } from 'vuex'
  import { scaleLinear, scaleTime } from 'd3-scale'
  import { area, line } from 'd3-shape'
  import { timeFormat, timeParse } from 'd3-time-format'
  import map from 'lodash/map'
  import get from 'lodash/get'
  import mean from 'lodash/mean'
  import flattenDeep from 'lodash/flattenDeep'
  import VisMarker from '~/components/VisMarker.vue'
  import VisLine from '~/components/VisLine.vue'
  import VisHorizontalLine from '~/components/VisHorizontalLine.vue'
  import VisVerticalLine from '~/components/VisVerticalLine.vue'
  import VisArea from '~/components/VisArea.vue'
  import VisLegend from '~/components/VisLegend.vue'
  import VisOptions from '~/components/VisOptions.vue'

  function extractValues (arr, path, func) {
    return flattenDeep(map(arr, a => {
      return map(a.data, set => {
        return map(set, d => {
          return func(get(d, path))
        })
      })
    }))
  }

  function capitalizeFirstLetter (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
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
        scaleY,
        ticksX: [],
        axisY: false,
        clipPathElements: [],
        visualElements: []
      }
    },
    created () {
      this.setScales()
    },
    mounted () {
      this.calcSizes()
      window.addEventListener('resize', this.calcSizes, false)
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.calcSizes, false)
    },
    computed: {
      ...mapState([
        'step',
        'steps',
        'elements',
        'legend',
        'axis',
        'dataset'
      ])
    },
    watch: {
      width: function () {
        this.calcSizes()
        this.update()
      },
      height: function () {
        this.calcSizes()
        this.update()
      },
      step: function () {
        this.update()
      },
      dataset: function () {
        this.update()
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
      drawMarker: function (data) {
        const { scaleX, scaleY } = this
        return [scaleX(timeParse('%Y')(data[0])), scaleY(data[1])]
      },
      drawHorizontalLine: function (data) {
        const { scaleX, scaleY } = this
        const [x1, x2] = scaleX.domain()
        return [scaleX(x1), scaleX(x2), scaleY(data[1])]
      },
      drawVerticalLine: function (data) {
        const { scaleX, scaleY } = this
        const [y1, y2] = scaleY.domain()
        return [scaleY(y1), scaleY(y2), scaleX(timeParse('%Y')(data[0]))]
      },
      drawClipPathElements: function () {
        const { steps, step, scaleX } = this

        return map(steps[step].clips, (clip, id) => {
          return {
            'clip': `clip${id}`,
            'height': 100 + '%',
            'width': clip ? scaleX(timeParse('%Y')(clip)) : 0
          }
        })
      },
      calcMarkerPosition: function (marker = [0, 0]) {
        const { scaleY, scaleX } = this
        const [x, y] = marker
        return [scaleX(timeParse('%Y')(x)), scaleY(y)]
      },
      drawVisualElements: function () {
        const { dataset } = this
        return map(this.elements, element => {
          const { type, data, clip, id, label, attribute, marker } = element
          const datum = get(data, dataset, get(data, 0))
          let d
          switch (type) {
            case 'line':
              d = this.drawLine()(datum)
              break
            case 'area':
              d = this.drawArea()(datum)
              break
            case 'marker':
              d = this.drawMarker(datum[0])
              break
            case 'horizontalLine':
              d = this.drawHorizontalLine(datum[0])
              break
            case 'verticalLine':
              d = this.drawVerticalLine(datum[0])
              break
          }
          const klass = [type, attribute].join(' ')
          return {
            d,
            klass,
            clip: `clip${clip}`,
            comp: 'Vis' + capitalizeFirstLetter(type),
            label,
            id,
            marker: this.calcMarkerPosition(marker)
          }
        })
      },
      drawAxisY: function () {
        const { scaleY, axis, drawTicksY } = this
        const { label } = axis.y
        const y = scaleY(mean(scaleY.domain()))
        return {
          label,
          x: 20,
          y,
          ticks: drawTicksY()
        }
      },
      drawTicksY: function () {
        const { scaleY } = this
        return map(scaleY.ticks(), (tick, i) => {
          return {
            key: i,
            label: tick,
            y: scaleY(tick),
            x: this.margin[0] / 2
          }
        })
      },
      drawTicksX: function () {
        const { scaleX } = this
        return map(scaleX.ticks(), (tick, i) => {
          return {
            key: i,
            label: timeFormat('%Y')(tick),
            y: this.height - this.margin[1] / 2,
            x: scaleX(tick)
          }
        })
      },
      setScales: function () {
        const { elements } = this
        const xValues = extractValues(elements, '0', d => {
          return timeParse('%Y')(d)
        })
        const yValues = extractValues(elements, '1', d => {
          return d
        })
        const minX = Math.min(...xValues)
        const maxX = Math.max(...xValues)
        const maxY = Math.max(...yValues)
        this.scaleX.domain([minX, maxX])
        this.scaleY.domain([0, maxY])
        console.log('set scale domains to', this.scaleX.domain(), this.scaleY.domain())
      },
      calcSizes: function () {
        const { vis: el } = this.$refs
        const width = el.clientWidth || el.parentNode.clientWidth
        const height = el.clientHeight || el.parentNode.clientHeight
        this.width = width
        this.height = height
        const { marginPercent } = this
        const marginVertical = height * marginPercent
        const marginHorizontal = width * marginPercent
        this.margin = [marginHorizontal, marginVertical]
        this.scaleY.range([height - marginVertical, marginVertical]) // Because upside down
        this.scaleX.range([marginHorizontal, width - marginHorizontal]) // Because left -> right
        console.log('set scale ranges to', this.scaleX.range(), this.scaleY.range())
      },
      update: function () {
        console.log('update')
        this.clipPathElements = this.drawClipPathElements()
        this.visualElements = this.drawVisualElements()
        this.ticksX = this.drawTicksX()
        this.axisY = this.drawAxisY()
      }
    },
    components: {
      VisMarker,
      VisLine,
      VisArea,
      VisHorizontalLine,
      VisVerticalLine,
      VisLegend,
      VisOptions
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

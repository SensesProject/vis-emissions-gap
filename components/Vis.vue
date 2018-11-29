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
            <g>
              <VisElement
                v-for="el in elements"
                :scaleX="scaleX"
                :scaleY="scaleY"
                :key="el.i"
                :el="el"
                :visibility="steps[step].visibility"
                :dataset="dataset" />
            </g>
            <VisAxis
              :margin="margin"
              :height="height"
              :width="width"
              :scaleX="scaleX"
              :scaleY="scaleY" />
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
  import map from 'lodash/map'
  import get from 'lodash/get'
  import { timeParse } from 'd3-time-format'
  import flattenDeep from 'lodash/flattenDeep'
  import VisLegend from '~/components/VisLegend.vue'
  import VisOptions from '~/components/VisOptions.vue'
  import VisAxis from '~/components/VisAxis.vue'
  import VisElement from '~/components/VisElement.vue'

  function extractValues (arr, path, func) {
    return flattenDeep(map(arr, a => {
      return map(a.data, set => {
        return map(set, d => {
          return func(get(d, path))
        })
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
        scaleY,
        clipPathElements: []
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
      },
      scaleX: {
        deep: true,
        handler: function () {
          this.bus.$emit('update')
        }
      },
      scaleY: {
        deep: true,
        handler: function () {
          this.bus.$emit('update')
        }
      }
    },
    methods: {
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
        // this.visualElements = this.drawVisualElements()
        // this.axisX = this.drawAxisX()
        // this.axisY = this.drawAxisY()
      }
    },
    components: {
      VisLegend,
      VisOptions,
      VisAxis,
      VisElement
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

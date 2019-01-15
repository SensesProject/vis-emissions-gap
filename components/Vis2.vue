<template>
  <section class="vis-wrapper">
    <div class="vis-container" ref="vis">
      <transition name="fade">
        <svg width="100%" height="100%" class="vis">
          <defs>
            <clipPath
              v-for="(el, i) in clipPathElements"
              :id="el.clip">
              <rect
                class="clip"
                x="0"
                y="0"
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
    </footer>
  </section>
</template>

<script>
  import { mapState } from 'vuex'
  import { scaleLinear, scaleTime } from 'd3-scale'
  import { extent } from 'd3-array'
  import map from 'lodash/map'
  import get from 'lodash/get'
  import { timeParse } from 'd3-time-format'
  import flattenDeep from 'lodash/flattenDeep'
  import VisLegend from '~/components/VisLegend.vue'
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
      return {
        marginPercent: 0.1,
        width: 0,
        height: 0,
        margin: [0, 0]
      }
    },
    mounted () {
      this.calcSizes()
      window.addEventListener('resize', this.calcSizes, false)
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.calcSizes, false)
    },
    computed: {
      ...mapState({
        'step': state => state.navigation.step
      }),
      ...mapState([
        'steps',
        'elements',
        'legend',
        'dataset'
      ]),
      extentX: function () {
        return extent(extractValues(this.elements, '0', d => {
          return timeParse('%Y')(d)
        }))
      },
      scaleX: function () {
        return scaleTime()
          .range([this.margin[0], this.width - this.margin[0]])
          .domain(this.extentX)
      },
      extentY: function () {
        const yValues = extractValues(this.elements, '1', d => {
          return d
        })

        const maxY = Math.max(...yValues)
        return [0, maxY]
      },
      scaleY: function () {
        return scaleLinear()
          .range([this.height - this.margin[1], this.margin[1]])
          .domain(this.extentY)
      },
      clipPathElements: function () {
        return map(this.steps[this.step].clips, (clip, id) => {
          return {
            'clip': `clip${id}`,
            'height': this.height,
            'width': clip ? this.scaleX(timeParse('%Y')(clip)) : 0
          }
        })
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
        // console.log('set scale ranges to', width, height, marginVertical, marginHorizontal)
      }
    },
    components: {
      VisLegend,
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

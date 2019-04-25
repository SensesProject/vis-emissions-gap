<template>
  <section class="vis-wrapper">
    <div class="vis-container" ref="vis">
      <transition name="fade">
        <svg width="100%" height="100%" class="vis" v-if="isLoaded">
          <g v-if="width && height">
            <g>
              <VisElement
                v-for="el in elements"
                :scaleX="scaleX"
                :scaleY="scaleY"
                :key="el.i"
                :el="el"
                :visibility="visiblity"
                :dataset="dataset" />
            </g>
            <g>
              <VisPath
                v-for="el in currentPaths"
                :el="el"
                :key="el.policy"
                :scaleX="scaleX"
                :scaleY="scaleY" />
            </g>
            <VisAxis
              :margin="margin"
              :height="height"
              :width="width"
              :scaleX="scaleX"
              :scaleY="scaleY" />
            <VisZeroLine
              :margin="margin"
              :height="height"
              :width="width"
              :scaleX="scaleX"
              :scaleY="scaleY" />
          </g>
          </g>
        </svg>
      </transition>
    </div>
    <footer class="vis-footer">
      <VisPrices />
    </footer>
  </section>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import { scaleLinear, scaleTime } from 'd3-scale'
  import { extent } from 'd3-array'
  import map from 'lodash/map'
  import get from 'lodash/get'
  import isEmpty from 'lodash/isEmpty'
  import { timeParse } from 'd3-time-format'
  import flattenDeep from 'lodash/flattenDeep'
  import VisPrices from '~/components/VisPrices.vue'
  import VisAxis from '~/components/VisAxis.vue'
  import VisElement from '~/components/VisElement.vue'
  import VisPath from '~/components/VisPath.vue'
  import VisZeroLine from '~/components/VisZeroLine.vue'

  function extractValues (arr, path, func) {
    return flattenDeep(map(arr, a => {
      return map(a.values, d => {
        return func(get(d, path))
      })
    }))
  }

  export default {
    data: function () {
      return {
        width: 0,
        height: 0,
        margin: {
          left: 80,
          right: 50,
          top: 60,
          bottom: 10
        }
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
        'step': state => state.navigation.step,
        'data': state => state.data.data.data,
        'range': state => state.scenario.scenario.range
      }),
      ...mapState([
        'steps',
        'elements',
        'legend',
        'dataset'
      ]),
      ...mapGetters([
        'currentPaths'
      ]),
      visiblity: function () {
        return get(this.steps, `${this.step}.visibility`, [])
      },
      clips: function () {
        return get(this.steps, `${this.step}.clips`, [])
      },
      isLoaded: function () {
        return !isEmpty(this.data)
      },
      extentX: function () {
        if (!this.isLoaded) {
          return [timeParse('%Y')(1950), timeParse('%Y')(2100)]
        }
        return extent(extractValues(this.currentPaths, '0', d => {
          return timeParse('%Y')(d)
        }))
      },
      scaleX: function () {
        return scaleTime()
          .range([this.margin.left, this.width - this.margin.right])
          .domain(this.extentX).nice()
      },
      extentY: function () {
        if (!this.isLoaded) {
          return [0, 0]
        }
        const yValues = extractValues(this.currentPaths, '1', d => {
          return d
        })

        const maxY = Math.max(...yValues)
        let minY = Math.min(...yValues)
        const buffer = -maxY * 0.1
        return [minY < buffer ? minY : buffer, maxY]
      },
      scaleY: function () {
        return scaleLinear()
          .range([this.height - this.margin.bottom, this.margin.top])
          .domain(this.extentY).nice()
      }
    },
    methods: {
      drawClipPathElements: function () {
        return map(this.clips, (clip, id) => {
          return {
            'clip': `clip${id}`,
            'height': 100 + '%',
            'width': clip ? this.scaleX(timeParse('%Y')(clip)) : 0
          }
        })
      },
      calcSizes: function () {
        const { vis: el } = this.$refs
        const width = el.clientWidth || el.parentNode.clientWidth
        const height = el.clientHeight || el.parentNode.clientHeight
        this.width = width
        this.height = height
      }
    },
    components: {
      VisAxis,
      VisElement,
      VisPrices,
      VisPath,
      VisZeroLine
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

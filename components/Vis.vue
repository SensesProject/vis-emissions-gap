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
                :width="width"
                :key="el.i"
                :el="el"
                :visibility="visiblity"
                :dataset="dataset" />
            </g>
            <VisZeroLine
              :margin="margin"
              :height="height"
              :width="width"
              :scaleX="scaleX"
              :scaleY="scaleY" />
            <g>
              <VisLabels
                :els="currentPaths"
                :scaleX="scaleX"
                :scaleY="scaleY"
                :legend="legend" />
              <VisPath
                v-for="el in currentPaths"
                ref="path"
                :el="el"
                :key="`${el.policy}-${el.variable}-${el.attribute}`"
                :scaleX="scaleX"
                :scaleY="scaleY"
                :legend="legend" />
            </g>
            <VisAxis
              :margin="margin"
              :height="height"
              :width="width"
              :scaleX="scaleX"
              :scaleY="scaleY" />
            <ConditionalElements
              :scaleX="scaleX"
              :scaleY="scaleY" />
          </g>
        </svg>
      </transition>
    </div>
    <footer class="vis-footer">
      <VisAside />
    </footer>
  </section>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import { scaleLinear, scaleTime } from 'd3-scale'
  import { extent } from 'd3-array'
  import { map, get, isEmpty, filter, sortBy, forEach, slice } from 'lodash'
  import { timeParse } from 'd3-time-format'
  import flattenDeep from 'lodash/flattenDeep'
  import VisAside from '~/components/VisAside.vue'
  import VisAxis from '~/components/VisAxis.vue'
  import VisElement from '~/components/VisElement.vue'
  import VisPath from '~/components/VisPath.vue'
  import VisLabels from '~/components/VisLabels.vue'
  import VisZeroLine from '~/components/VisZeroLine.vue'
  import ConditionalElements from '~/components/ConditionalElements.vue'

  function extractValues (arr, path, func) {
    return flattenDeep(map(arr, a => {
      return map(a.values, d => {
        return func(get(d, path))
      })
    }))
  }

  function moveEls (els, direction) {
    for (let i = 1; i < els.length; i++) {
      const previous = els[i - 1]
      const current = els[i]
      const min = direction ? (previous.y + previous.height - 3) : (previous.y - previous.height + 3)
      if ((direction && current.y < min) || (!direction && current.y > min)) {
        els[i].y = min
      }
    }
    return els
  }

  export default {
    data: function () {
      return {
        width: 0,
        height: 0,
        margin: {
          left: 80,
          right: 150,
          top: 70,
          bottom: 10
        }
      }
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
      legend: function () {
        return get(this.steps, `${this.step}.legend`, [])
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
          .domain(this.extentY).nice(6)
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
      },
      positionLabels: function () {
        let labels = sortBy(filter(map(this.$refs.path, path => {
          const el = get(path, '$el').getElementsByTagName('text')[0]
          const y = parseFloat(el.getAttribute('data-y'))
          const { height } = el.getBBox()
          return { height, y, el }
        }), label => {
          return label.height && label.y
        }), label => {
          return label.y
        })

        if (labels.length > 1) {
          if (labels.length === 2) {
            labels = moveEls(labels, true)
          } else {
            const middle = Math.floor(labels.length / 2)
            const topLabels = slice(labels, 0, middle + 1)
            const bottomLabels = slice(labels, middle, labels.length)
            labels = [...moveEls(topLabels, true), ...moveEls(bottomLabels, true)]
          }

          forEach(labels, label => {
            label.el.setAttribute('y', label.y)
          })
        }
      }
    },
    mounted () {
      this.calcSizes()
      window.addEventListener('resize', this.calcSizes, false)
    },
    updated () {
      this.positionLabels()
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.calcSizes, false)
    },
    components: {
      VisAxis,
      VisElement,
      VisAside,
      VisPath,
      VisZeroLine,
      ConditionalElements,
      VisLabels
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

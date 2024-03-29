<template>
  <section class="vis-wrapper">
    <div ref="vis" class="vis-container">
      <transition name="fade">
        <svg
          v-if="isLoaded"
          class="vis"
          :width="width + 'px'"
          :height="height + 'px'"
          :viewBox="`0 0 ${width} ${height}`"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g v-if="width && height">
            <g>
              <VisElement
                v-for="el in elements"
                :key="el.i"
                :scaleX="scaleX"
                :scaleY="scaleY"
                :width="width"
                :el="el"
                :visibility="visiblity"
                :dataset="dataset"
              />
            </g>
            <VisZeroLine
              :margin="margin"
              :height="height"
              :width="width"
              :scaleX="scaleX"
              :scaleY="scaleY"
            />
            <g>
              <VisPath
                v-for="el in currentPaths"
                ref="path"
                :key="`${el.policy}-${el.variable}-${el.attribute}`"
                :el="el"
                :scaleX="scaleX"
                :scaleY="scaleY"
                :legend="legend"
              />
            </g>
            <VisAxis
              :margin="margin"
              :height="height"
              :width="width"
              :scaleX="scaleX"
              :scaleY="scaleY"
            />
            <ConditionalElements
              :scaleX="scaleX"
              :scaleY="scaleY"
            />
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
import VisZeroLine from '~/components/VisZeroLine.vue'
import ConditionalElements from '~/components/ConditionalElements.vue'

function extractValues (arr, path, func) {
  return flattenDeep(map(arr, (a) => {
    return map(a.values, (d) => {
      return func(get(d, path))
    })
  }))
}

function moveEls (els, direction) {
  const lineHeight = 3
  for (let i = 1; i < els.length; i++) {
    const previous = els[i - 1]
    const current = els[i]
    const min = direction ? (previous.y + previous.height - lineHeight) : (previous.y - previous.height + lineHeight)
    if ((direction && current.y < min) || (!direction && current.y > min)) {
      els[i].y = min
    }
  }
  return els
}

export default {
  components: {
    VisAxis,
    VisElement,
    VisAside,
    VisPath,
    VisZeroLine,
    ConditionalElements
  },
  data () {
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
      step: state => state.navigation.step,
      data: state => state.data.data.data,
      range: state => state.scenario.scenario.range
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
    visiblity () {
      return get(this.steps, `${this.step}.visibility`, [])
    },
    legend () {
      return get(this.steps, `${this.step}.legend`, [])
    },
    clips () {
      return get(this.steps, `${this.step}.clips`, [])
    },
    isLoaded () {
      return !isEmpty(this.data)
    },
    extentX () {
      if (!this.isLoaded) {
        return [timeParse('%Y')(1950), timeParse('%Y')(2100)]
      }
      return extent(extractValues(this.currentPaths, '0', (d) => {
        return timeParse('%Y')(d)
      }))
    },
    scaleX () {
      return scaleTime()
        .range([this.margin.left, this.width - this.margin.right])
        .domain(this.extentX).nice()
    },
    extentY () {
      if (!this.isLoaded) {
        return [0, 0]
      }
      const yValues = extractValues(this.currentPaths, '1', (d) => {
        return d
      })

      const maxY = Math.max(...yValues)
      const minY = Math.min(...yValues)
      const buffer = -maxY * 0.1
      return [minY < buffer ? minY : buffer, maxY]
    },
    scaleY () {
      return scaleLinear()
        .range([this.height - this.margin.bottom, this.margin.top])
        .domain(this.extentY).nice(6)
    }
  },
  mounted () {
    this.calcSizes()
    window.addEventListener('resize', this.calcSizes, false)
  },
  updated () {
    this.calcSizes()
    this.positionLabels()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.calcSizes, false)
  },
  methods: {
    drawClipPathElements () {
      return map(this.clips, (clip, id) => {
        return {
          clip: `clip${id}`,
          height: 100 + '%',
          width: clip ? this.scaleX(timeParse('%Y')(clip)) : 0
        }
      })
    },
    calcSizes () {
      const { vis: el } = this.$refs
      if (el !== 'undefined' && this.width === 0 && this.height === 0) {
        const width = el.clientWidth || el.parentNode.clientWidth
        const height = el.clientHeight || el.parentNode.clientHeight
        this.width = width
        this.height = Math.max(height, 500)
      }
    },
    positionLabels () {
      let labels = sortBy(filter(map(this.$refs.path, (path) => {
        if (path.isVisible) { // Is the path currently visible
          const ref = get(path, '$el')
          const el = ref.getElementsByTagName('text')[0]
          const line = ref.getElementsByTagName('line')[0]
          if (el && line) {
            const y = parseFloat(el.getAttribute('data-y'))
            const { height } = el.getBBox()
            return { height, y, el, line }
          } else {
            return false
          }
        } else { // Return false if path is not visible
          return false
        }
      }), (label) => {
        return label && label.height && label.y
      }), (label) => {
        return label.y
      })

      // Move labels to correct y position based on height
      for (let i = 0; i < labels.length; i++) {
        labels[i].y = labels[i].y + labels[i].height * 0.25
      }

      // Reposition labels based on surrounding elements
      if (labels.length > 1) {
        if (labels.length === 2) {
          labels = moveEls(labels, true)
        } else {
          const middle = Math.floor(labels.length / 2)
          const topLabels = slice(labels, 0, middle + 1).reverse()
          const bottomLabels = slice(labels, middle, labels.length)
          labels = [...moveEls(topLabels, false), ...moveEls(bottomLabels, true)]
        }
      }

      forEach(labels, (label) => {
        label.el.setAttribute('y', label.y)
        const lineY1 = label.line.getAttribute('y1')
        const lineY2 = label.y - label.height * 0.25
        label.line.setAttribute('y2', lineY2)
        if (Math.abs(lineY2 - lineY1) > 5) {
          label.line.setAttribute('style', 'opacity: 1;')
        } else {
          label.line.setAttribute('style', 'opacity: 0;')
        }
      })
    }
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

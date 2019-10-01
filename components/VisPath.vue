<template>
  <g
    @mouseover="setHighlight(label.policy)"
    @mouseleave="setHighlight(false)"
    v-if="isVisible">
    <path
      :class="klass"
      :d="d"
      stroke-linecap="round"
      :style="{ strokeDasharray: `${totalLength}px`, strokeDashoffset: `${currentLength}px` }" />
    <line
      v-if="label"
      class="lead"
      :x1="label.x + 3"
      :x2="label.x + 5"
      :y1="label.y"
      :y2="label.y" />
    <text
      v-if="label"
      :x="label.x + 7"
      :y="label.y"
      :class="klass"
      :data-y="label.y">{{ label.label }}</text>
  </g>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { line } from 'd3-shape'
  import { timeParse } from 'd3-time-format'
  import { isNumber, last } from 'lodash'
  import isString from 'lodash/isString'
  import isNull from 'lodash/isNull'
  import filter from 'lodash/filter'
  import * as pathHelper from 'svg-path-properties'

  export default {
    props: ['el', 'scaleX', 'scaleY', 'legend'],
    computed: {
      ...mapState({
        'highlight': state => state.highlight.highlight,
        'range': state => state.scenario.scenario.range
      }),
      d: function () {
        return this.drawLine()(this.el.values)
      },
      isVisible: function () {
        return !isNull(this.d)
      },
      totalLength: function () {
        if (this.isVisible) {
          return pathHelper.svgPathProperties(this.d).getTotalLength() + 1
        } else {
          return 0
        }
      },
      end: function () {
        const { clip } = this.el
        const [l, h] = this.range
        let value = h
        if (isNumber(clip) && clip) {
          value = clip
        } else if (isString(clip)) {
          if (clip === 'end') {
            value = h
          } else if (clip === 'start') {
            value = l
          }
        }
        return value
      },
      values: function () {
        return filter(this.el.values, value => {
          return value[0] <= this.end
        })
      },
      currentLength: function () {
        const path = this.drawLine()(this.values)

        if (isNull(path)) {
          return this.totalLength
        }

        const length = pathHelper.svgPathProperties(path).getTotalLength()
        return this.totalLength - length
      },
      label: function () {
        if (this.values.length && this.legend.indexOf(this.el.policy) >= 0) {
          const lastValues = last(this.values)
          return {
            label: this.el.label,
            policy: this.el.policy,
            x: this.scaleX(timeParse('%Y')(lastValues[0])),
            y: this.scaleY(lastValues[1])
          }
        } else {
          return false
        }
      },
      klass: function () {
        const { el, highlight } = this
        const { policy } = el
        const klass = [
          'graphic',
          'line',
          'label',
          'label--path',
          'outline',
          policy
        ]

        if (highlight) {
          klass.push(highlight === policy ? 'isHighlight' : 'hasHighlight')
        }

        return klass.join(' ')
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
      ...mapActions([
        'setHighlight'
      ])
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  path {
    animation: all 5s linear;
  }
</style>

<template>
  <path
    :clip-path="clip"
    :class="klass"
    :d="d" />
</template>

<script>
  import { mapState } from 'vuex'
  import { line } from 'd3-shape'
  import { timeParse } from 'd3-time-format'

  export default {
    props: ['el', 'scaleX', 'scaleY'],
    computed: {
      ...mapState({
        'highlight': state => state.highlight.highlight
      }),
      d: function () {
        return this.drawLine()(this.el.values)
      },
      clip: function () {
        return `url(#clip${this.el.policy})`
      },
      klass: function () {
        const { el, highlight } = this
        const { policy } = el
        const klass = [
          'graphic',
          'line',
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
      }
    }
  }
</script>

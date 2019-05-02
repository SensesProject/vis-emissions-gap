<template>
  <g>
    <path
      class="arrow"
      :d="path" />
    <line
      :x1="start[0]"
      :y1="start[1]"
      :x2="x"
      :y2="y"
      class="arrow" />
  </g>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { timeParse } from 'd3-time-format'
  import { find, get, last } from 'lodash'

  export default {
    props: ['el', 'scaleX', 'scaleY', 'data'],
    computed: {
      ...mapGetters([
        'currentPaths'
      ]),
      start: function () {
        const [x, y] = last(get(find(this.currentPaths, { scenario: 'historic' }), 'values', []))
        return [this.scaleX(timeParse('%Y')(x)), this.scaleY(y)]
      },
      x: function () {
        return this.scaleX(timeParse('%Y')(this.data[0][0]))
      },
      y: function () {
        return this.scaleY(this.data[0][1])
      },
      path: function () {
        const x1 = this.scaleX(timeParse('%Y')(this.data[1][0]))
        const x2 = this.scaleX(timeParse('%Y')(this.data[2][0]))
        return `M${this.start.join(' ')} L ${x1} ${this.y} L ${x2} ${this.y} Z`
      }
    }
  }
</script>

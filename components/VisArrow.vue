<template>
  <g>
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
      }
    }
  }
</script>

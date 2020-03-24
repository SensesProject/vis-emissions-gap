<template>
  <g :style="{ transform: `translateY(${y}px)` }">
    <line
      class="horizontalLine"
      :x1="x1"
      :x2="x2"
      :y1="0"
      :y2="0"
    />
    <text
      v-if="el.label"
      class="horizontalLine marker"
      :x="x2 + 10"
      :y="0"
      dominant-baseline="middle"
    >
      {{ el.label }}
    </text>
  </g>
</template>

<script>
import mean from 'lodash/mean'

export default {
  props: ['el', 'scaleX', 'scaleY', 'data', 'width'],
  data () {
    return {
      r: 7,
      offset: 15
    }
  },
  computed: {
    x1 () {
      return this.scaleX.range()[0]
    },
    x2 () {
      return this.width
    },
    y () {
      return this.scaleY(this.data[0][1])
    },
    mx1 () {
      return mean(this.scaleX.range())
    }
  }
}
</script>

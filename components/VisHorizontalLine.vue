<template>
  <g>
    <line
      class="horizontalLine"
      :x1="x1"
      :x2="x2"
      :y1="y"
      :y2="y" />
    <text
      v-if="el.label"
      class="horizontalLine"
      :x="x2 + 10"
      :y="y"
      dominant-baseline="middle"
    >{{ el.label }}</text>
  </g>
</template>

<script>
  export default {
    props: ['el', 'scaleX', 'scaleY', 'data'],
    computed: {
      x1: function () {
        return this.scaleX.range()[0]
      },
      x2: function () {
        return this.scaleX.range()[1]
      },
      y: function () {
        return this.scaleY(this.data[0][1])
      }
    }
  }
</script>

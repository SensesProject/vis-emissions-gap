<template>
  <g>
    <line
      class="horizontalLine"
      :x1="x1"
      :x2="x2"
      :y1="y"
      :y2="y" />
    <VisPulse
      :x="mx1"
      :y="y - 20"
    />
    <text
      v-if="el.label"
      class="horizontalLine marker"
      :x="x2 + 10"
      :y="y"
      dominant-baseline="middle"
    >{{ el.label }}</text>
  </g>
</template>

<script>
  import mean from 'lodash/mean'
  import VisPulse from '~/components/VisPulse.vue'

  export default {
    props: ['el', 'scaleX', 'scaleY', 'data'],
    data: function () {
      return {
        r: 7,
        offset: 15
      }
    },
    computed: {
      x1: function () {
        return this.scaleX.range()[0]
      },
      x2: function () {
        return this.scaleX.range()[1]
      },
      y: function () {
        return this.scaleY(this.data[0][1])
      },
      mx1: function () {
        return mean(this.scaleX.range())
      }
    },
    components: {
      VisPulse
    }
  }
</script>

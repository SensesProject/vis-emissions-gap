<template>
  <g>
    <line
      class="horizontalLine"
      :x1="x1"
      :x2="x2"
      :y1="y"
      :y2="y" />
    <VisPulse
      :x="(x2 - x1) / 3"
      :y="y - 20"
      label="Due to the long lifetime of CO2 in the atmosphere, the concentration of CO2 which causes the warming effect will increase as long as yearly emissions are positive. This means that yearly emissions have to be reduced to zero in order to stability the concentration in the atmosphere and thus warming. If net negative emissions are reached by employing more carbon dioxide removal than residual positive emissions, the concentration of CO2 in the atmosphere can be reduced and thus the warming reduced."
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

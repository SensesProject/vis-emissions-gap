<template>
  <g class="zeroLine" :style="{ transform: `translateY(${zero}px)` }">
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:rgb(55, 200, 137);stop-opacity:0.05" />
        <stop offset="100%" style="stop-color:rgb(0,0,0);stop-opacity:0" />
      </linearGradient>
    </defs>
    <path
      class="negative"
      :d="`M${margin.left} ${0} H${width} V${0 + 5} H${margin.left} V${0}`" />
    <path
      class="positive"
      :d="`M${margin.left} ${0} H${width} V${0 - 5} H${margin.left} V${0}`" />
    <path
      v-if="isUsed"
      class="negative--area"
      fill="url(#grad1)"
      :d="`M${margin.left} ${0 + 5} H${width} V${end} H${margin.left} V${0 + 5}`" />
    <text
      v-if="isUsed"
      class="positive marker"
      :x="today"
      :y="0 - 10"
      dominant-baseline="baseline"
      text-anchor="middle">
      Adding CO₂ to the atmosphere
    </text>
    <text
      v-if="isUsed"
      class="negative marker"
      :x="today"
      :y="0 + 10"
      dominant-baseline="hanging"
      text-anchor="middle">
      Extracting CO₂ from the atmosphere
    </text>
  </g>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    props: ['margin', 'height', 'width', 'scaleX', 'scaleY'],
    computed: {
      ...mapState({
        variable: state => state.scenario.scenario.variable
      }),
      isUsed: function () { // Will hide some elements
        return this.variable === 'CO2|Energy and Industrial Processes'
      },
      center: function () {
        const { width, margin } = this
        return margin.left + ((width - margin.right) / 2)
      },
      zero: function () {
        return this.scaleY(0)
      },
      today: function () {
        return this.scaleX(new Date(2019, 1, 1))
      },
      end: function () {
        return this.scaleY.range()[0]
      }
    }
  }
</script>

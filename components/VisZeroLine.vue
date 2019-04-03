<template>
  <g>
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:rgb(55, 200, 137);stop-opacity:0.05" />
        <stop offset="100%" style="stop-color:rgb(0,0,0);stop-opacity:0" />
      </linearGradient>
    </defs>
    <line
      class="zero"
      :x1="margin.left"
      :x2="width - margin.right"
      :y1="zero"
      :y2="zero" />
    <path
      class="positive"
      :d="`M${margin.left} ${zero} H${width - margin.right} V${zero - 5} H${margin.left} V${zero}`" />
    <path
      class="negative"
      :d="`M${margin.left} ${zero} H${width - margin.right} V${zero + 5} H${margin.left} V${zero}`" />
    <path
      class="negative--area"
      fill="url(#grad1)"
      :d="`M${margin.left} ${zero + 5} H${width - margin.right} V${end} H${margin.left} V${zero + 5}`" />
    <text
      class="positive marker"
      :x="today"
      :y="zero - 10"
      dominant-baseline="baseline"
      text-anchor="middle">
      Emitting CO<tspan class="super" baseline-shift="super">2</tspan>
    </text>
    <text
      class="negative marker"
      :x="today"
      :y="zero + 10"
      dominant-baseline="hanging"
      text-anchor="middle">
      Extracting CO<tspan class="super" baseline-shift="super">2</tspan>
    </text>
  </g>
</template>

<script>
  export default {
    props: ['margin', 'height', 'width', 'scaleX', 'scaleY'],
    computed: {
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

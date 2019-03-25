<template>
  <g>
    <line
      class="zero"
      :x1="margin[0]"
      :x2="width - margin[0]"
      :y1="zero"
      :y2="zero" />
    <path
      class="positive"
      :d="`M${margin[0]} ${zero} H${width - margin[0]} V${zero - 5} H${margin[0]} V${zero}`" />
    <path
      class="negative"
      :d="`M${margin[0]} ${zero} H${width - margin[0]} V${zero + 5} H${margin[0]} V${zero}`" />
    <text
      class="negative marker"
      :x="center"
      :y="zero + 10"
      dominant-baseline="hanging"
      text-anchor="middle">
      negative
    </text>
    <text
      class="positive marker"
      :x="center"
      :y="zero - 10"
      dominant-baseline="baseline"
      text-anchor="middle">
      positive
    </text>
  </g>
</template>

<script>
  export default {
    props: ['margin', 'height', 'width', 'scaleX', 'scaleY'],
    computed: {
      center: function () {
        const { width, margin } = this
        return margin[0] + ((width - margin[0]) / 2)
      },
      zero: function () {
        return this.scaleY(0)
      }
    }
  }
</script>

<template>
	<g v-if="axisY">
    <line
      class="axis"
      :x1="margin[0]"
      :x2="margin[0]"
      :y1="margin[1]"
      :y2="height - margin[1]" />
    <text
      class="axis"
      :x="axisY.x"
      :y="axisY.y"
      :transform="`rotate(-90 ${axisY.x} ${axisY.y})`"
      text-anchor="middle">
      {{ axisY.label }}
    </text>
    <g
      v-for="tick in axisY.ticks"
      :key="tick.key">
      <text
        :y="tick.y + 'px'"
        :x="tick.x + 'px'"
        text-anchor="end"
        dominant-baseline="middle"
        class="tick">
        {{ tick.label }}
      </text>
      <line
        :x1="margin[0] + 'px'"
        :y1="tick.y + 'px'"
        :x2="margin[0] - margin[0] / 5 + 'px'"
        :y2="tick.y + 'px'"
        class="tick" />
    </g>
  </g>
</template>

<script>
  export default {
    props: ['margin', 'height', 'axisY']
  }
</script>

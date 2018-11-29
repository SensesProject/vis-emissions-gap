<template>
	<g>
    <line
      class="axis"
      :x1="margin[0]"
      :x2="width - margin[0]"
      :y1="height - margin[1]"
      :y2="height - margin[1]" />
    <g
      v-for="tick in axisX.ticks"
      :key="tick.key">
      <text
        :y="tick.y + 'px'"
        :x="tick.x + 'px'"
        text-anchor="middle"
        class="tick">
        {{ tick.label }}
      </text>
      <line
        :y1="height - margin[1] + 'px'"
        :x1="tick.x + 'px'"
        :y2="height - margin[1] + margin[1] / 5 + 'px'"
        :x2="tick.x + 'px'"
        class="tick" />
    </g>
  </g>
</template>

<script>
  export default {
    props: ['margin', 'height', 'width', 'axisX']
  }
</script>

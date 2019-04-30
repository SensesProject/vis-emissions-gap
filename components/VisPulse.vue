<template>
	<g v-tooltip="label">
    <circle
      class="p2"
      :cx="x + 'px'"
      :cy="y + 'px'"
      r="12" />
	  <circle
	    class="p1"
	    :cx="x + 'px'"
	    :cy="y + 'px'"
	    r="4" />
    <circle
      class="p3"
      :cx="x + 'px'"
      :cy="y + 'px'"
      r="10" />
    <circle
      :style="{ transformOrigin: `${x}px ${y}px`}"
      class="p4"
      :cx="x + 'px'"
      :cy="y + 'px'"
      r="10" />

	</g>
</template>

<script>
  export default {
    props: ['x', 'y', 'label'],
    data: function () {
      return {
        r: 5
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  @keyframes pulse {
    0% {
      transform: scale(1.0);
      opacity: 1;
    }
    100% {
      transform: scale(1.8);
      opacity: 0;
    }
  }

  circle {
    &.p1 {
      fill: $color-blue;
    }

    &.p2 {
      fill: #fff;
      fill-opacity: 0.7;
    }

    &.p3 {
      fill: $color-blue;
      fill-opacity: 0.3;
      stroke: $color-blue;
      stroke-opacity: 0.4;
    }

    &.p4 {
      fill: transparent;
      stroke: $color-blue;
      stroke-opacity: 0.4;
      animation: pulse 1.5s ease infinite;
    }
  }

</style>
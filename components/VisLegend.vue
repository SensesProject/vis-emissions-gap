<template>
  <ul class="vis-legend">
  	<li
      v-for="el in elements"
      :class="{ isVisible: visibility.indexOf(el.attribute) >= 0 }"
      @mouseover="setHighlight(el.attribute)"
      @mouseleave="setHighlight(false)">
  		<svg width="10" height="10">
  			<line x1="0%" x2="100%" y1="50%" y2="50%" :class="{ legend: true, [el.attribute]: true }" />
  		</svg>
  	{{ el.label }}</li>
  </ul>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    props: ['elements', 'visibility'],
    methods: {
      ...mapActions([
        'setHighlight'
      ])
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  .vis-legend {
  	display: flex;
  	flex-direction: row;
  	align-content: space-around;
  	height: 10vh;
    color: palette(grey, 30);
    font-weight: $font-weight-bold;
    font-size: $size-default;

  	& > * {
  		display: inline-block;
  		flex: 1;
  		text-align: center;
  		opacity: 0;
	    transition-duration: 0.3s;
      line-height: 1.2;

	    &.isVisible {
	      opacity: 1;
	    }
  	}
  }
</style>
<template>
  <ul class="legend">
  	<li v-for="el in elements" :class="{ isVisible: visibility.indexOf(el.attribute) >= 0 }">
  		<svg width="10" height="10">
  			<line x1="0%" x2="100%" y1="50%" y2="50%" :class="{ legend: true, [el.attribute]: true }" />
  		</svg>
  	{{ el.label }}</li>
  </ul>
</template>

<script>
  export default {
    props: ['elements', 'visibility']
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  .legend {
  	display: flex;
  	flex-direction: row;
  	align-content: space-around;
  	height: 10vh;

  	& > * {
  		display: inline-block;
  		flex: 1;
  		text-align: center;
  		opacity: 0;
	    transition-duration: 0.3s;

	    &.isVisible {
	      opacity: 1;
	    }
  	}
  }
</style>
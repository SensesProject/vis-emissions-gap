<template>
	<g :class="visibility.indexOf(el.id) >= 0 ? 'isVisible' : 'isNotVisible'">
	  <circle
	    :class="el.klass"
	    :cx="el.d[0] + 'px'"
	    :cy="el.d[1] + 'px'"
	    r="40"
	    :title="el.id" />
	  <text
  		v-if="el.label"
  		:x="el.d[0]"
  		:y="el.d[1] - 55"
  		text-anchor="middle"
  		class="marker">
  		{{ el.label }}
  	</text>
	</g>
</template>

<script>
  export default {
    props: ['el', 'visibility']
  }
</script>

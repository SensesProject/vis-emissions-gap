<template>
	<g :class="{ [el.klass]: true, isVisible: visibility.indexOf(el.id) >= 0 }">
	  <line
	  	:class="{ [el.klass]: true }"
	  	:x1="el.d[2]"
	  	:x2="el.d[2]"
	  	:y1="el.d[0]"
	  	:y2="el.d[1]" />
	  <text
	  	:class="{ [el.klass]: true }"
	  	:x="el.d[2]"
	  	:y="el.d[1] - 10"
	  	text-anchor="middle"
	  >{{ el.label }}</text>
	</g>
</template>

<script>
  export default {
    props: ['el', 'visibility']
  }
</script>

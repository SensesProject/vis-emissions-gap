<template>
	<g :class="{ [el.klass]: true, isVisible: visibility.indexOf(el.id) >= 0 }">
	  <line
	  	:class="{ [el.klass]: true }"
	  	:x1="el.d[0]"
	  	:x2="el.d[1]"
	  	:y1="el.d[2]"
	  	:y2="el.d[2]" />
	  <text
	  	:class="{ [el.klass]: true }"
	  	:x="el.d[1] + 10"
	  	:y="el.d[2]"
	  	dominant-baseline="middle"
	  >{{ el.label }}</text>
	</g>
</template>

<script>
  export default {
    props: ['el', 'visibility']
  }
</script>

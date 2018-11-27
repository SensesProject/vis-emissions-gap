<template>
	<g :clip-path="`url(#${el.clip})`">
  	<path :class="el.klass" :d="el.d" />
  	<text
  		v-if="el.label"
  		:x="el.marker[0]"
  		:y="el.marker[1]"
  		text-anchor="middle"
  		class="area">
  		{{ el.label }}
  	</text>
  </g>
</template>

<script>
  export default {
    props: ['el']
  }
</script>

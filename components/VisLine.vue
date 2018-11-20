<template>
  <path :class="el.klass" :d="el.d" :clip-path="`url(#${el.clip})`" />
</template>

<script>
  export default {
    props: ['el']
  }
</script>

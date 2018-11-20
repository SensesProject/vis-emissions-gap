<template>
  <circle
    :class="{ [el.klass]: true, isVisible: visibility.indexOf(el.id) >= 0 }"
    :cx="el.d[0] + 'px'"
    :cy="el.d[1] + 'px'"
    r="40"
    :title="el.id" />
</template>

<script>
  export default {
    props: ['el', 'visibility']
  }
</script>

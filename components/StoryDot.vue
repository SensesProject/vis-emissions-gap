<template>
  <svg>
    <circle
      class="dot"
      cx="0.5em"
      cy="0.5em"
      r="0.4em"
    />
  </svg>
</template>

<script>
export default {
  data () {
    return {
      r: 7
    }
  }
}
</script>

<style lang="scss" scoped>
  svg {
    width: 1em;
    height: 1em;
    margin: 0 0.1em;
  }
</style>

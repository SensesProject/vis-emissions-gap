<template slot-scope="{signal}">
  <section class="option">
    <span class="description">{{ label }}</span>
    <ul>
      <slot />
    </ul>
  </section>
</template>

<script>
  export default {
    props: ['label']
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  .option {
    margin: $spacing 0;

    .description {
      font-weight: $font-weight-bold;
    }
  }
</style>

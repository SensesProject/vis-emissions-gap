<template slot-scope="{signal}">
  <section :class="{ option: true, isWide }">
    <span class="description">{{ label }}</span> <span v-if="tooltip" class="detail" v-tooltip="tooltip">?</span>
    <ul>
      <slot />
    </ul>
  </section>
</template>

<script>
  export default {
    props: ['label', 'isWide', 'tooltip']
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  .option {
    .description, .detail {
      font-weight: $font-weight-bold;
      text-transform: uppercase;
      letter-spacing: $spacing-wider;
      font-size: $size-smallest;
      display: inline-block;
    }

    .detail {
      color: palette(grey, 40);
    }

    ul {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: $spacing / 2;
    }

    &.isWide {
      grid-column: 1 / 3;

      ul {
        grid-template-columns: repeat(4, 1fr);
        grid-row-gap: $spacing / 2;
      }
    }
  }
</style>

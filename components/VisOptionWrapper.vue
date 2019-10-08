<template slot-scope="{ signal }">
  <section :class="{ option: true, isWide }">
    <span class="description">{{ label }}</span> <span v-if="tooltip" class="detail" v-tooltip="tooltip">?</span>
    <section v-if="isDropdown">
      <v-popover>
        <button class="block">{{ currentLabel }} <i class="icon-angle-right" /></button>
        <ul class="list" slot="popover">
          <slot />
        </ul>
      </v-popover>
    </section>
    <section v-else>
      <ul>
        <slot />
      </ul>
    </section>
  </section>
</template>

<script>
  import { get, lowerCase, startCase } from 'lodash'

  export default {
    props: ['label', 'isWide', 'tooltip', 'isDropdown', 'current'],
    computed: {
      currentLabel: function () {
        return startCase(lowerCase(get(this, 'current', '')))
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  .option {
    .description, .detail, button.block {
      font-weight: $font-weight-bold;
      // letter-spacing: $spacing-wider;
      font-size: $size-smaller;
      display: inline-block;
      border: none;

      &:focus, &:active {
        outline: 0;
      }
    }

    .detail {
      color: getColor(gray, 40);
    }

    button.block {
      font-size: $size-default;
      color: $color-blue;
      line-height: 1.1;
      padding: 0;
    }

    ul {
      max-width: 200px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: $spacing / 6;
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

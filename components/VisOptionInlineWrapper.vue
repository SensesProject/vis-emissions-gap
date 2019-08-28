<template slot-scope="{signal}">
  <section class="option">
    <v-popover>
      <button class="inline">{{ currentLabel }} <i class="icon-angle-right" /></button>
      <ul class="list" slot="popover">
        <slot />
      </ul>
    </v-popover>
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

<style lang="scss">
  @import "~@/assets/style/global";

  .option {
    &, & > * {
      display: inline;
    }

    button.inline {
      padding: 0;
      padding-left: $spacing / 8;
      font-weight: $font-weight-bold;
      color: $color-blue;
      margin: 0;
      display: inline-block;
      border: none;

      &:focus, &:active {
        outline: 0;
      }

      i::before {
        margin: 0;
      }
    }
  }

  .list {
    li {
      font-weight: $font-weight-bold;
      color: palette(grey, 60);
      cursor: pointer;
      display: block;

      &:hover, &:focus {
        color: palette(grey, 30);
      }

      &.isActive {
        cursor: default;
        color: $color-blue;
      }
    }
  }
</style>

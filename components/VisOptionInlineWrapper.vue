<template slot-scope="{signal}">
  <section class="option">
    <v-popover>
      <button class="inline"><span v-bind:style="{ 'min-width': minWidth }">{{ currentLabel }}</span> <i class="icon-angle-right" /></button>
      <ul class="list" slot="popover">
        <li
          v-for="option in options"
          :class="{ isActive: isEqual(current, option[0]), 'option': true }"
          @click="setScenario({ [slug]: option[0] })">
          {{ option[1] }}
        </li>
      </ul>
    </v-popover>
  </section>
</template>

<script>
  import { mapActions } from 'vuex'
  import { get, isEqual, find, map } from 'lodash'

  export default {
    props: ['options', 'current', 'slug'],
    computed: {
      currentLabel: function () {
        return get(find(this.options, option => {
          return option[0] === this.current
        }), '1', this.current)
      },
      minWidth: function () {
        const max = Math.max(...map(this.options, option => {
          return option[1].length
        }))
        console.log({max})

        return `${max * 9}px`
      }
    },
    methods: {
      ...mapActions([
        'setScenario'
      ]),
      isEqual
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

      span {
        display: inline-block;
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

<template slot-scope="{signal}">
  <section class="option">
    <v-popover>
      <button class="inline">
        <span :style="{ 'min-width': minWidth }">{{ currentLabel }}</span> <i class="icon-angle-right" />
      </button>
      <ul slot="popover" class="list">
        <li
          v-for="[key, label] in options"
          :key="key"
          :class="{ isActive: isEqual(current, key), 'option': true }"
          @click="setScenario({ [slug]: key })"
        >
          {{ label }}
        </li>
      </ul>
    </v-popover>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import { get, isEqual, find, map } from 'lodash'

export default {
  name: 'VisOptionInlineWrapper',
  props: {
    options: {
      type: Array,
      default: () => []
    },
    current: {
      type: String,
      default: ''
    },
    slug: {
      type: String,
      default: ''
    }
  },
  computed: {
    currentLabel () {
      return get(find(this.options, (option) => {
        return option[0] === this.current
      }), '1', this.current)
    },
    minWidth () {
      const max = Math.max(...map(this.options, (option) => {
        return option[1].length
      }))
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
      color: $color-neon;
      margin: 0;
      display: inline-block;
      border: none;
      cursor: pointer;
      background-color: rgba($color-neon, 0.05);
      border: 1px solid rgba($color-neon, 0.1);
      line-height: 1.4;
      border-radius: 5px;
      transition: background-color 0.2s ease;

      &:focus, &:active, &:hover {
        outline: 0;
        background-color: #fff;
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
      color: getColor(gray, 60);
      cursor: pointer;
      display: block;

      &:hover, &:focus {
        color: getColor(gray, 30);
      }

      &.isActive {
        cursor: default;
        color: $color-neon;
      }
    }
  }
</style>

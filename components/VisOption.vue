<template>
  <li
    :class="{ isActive: isEqual(current, option), option: true }"
    @click="setScenario({ [slug]: option })">
    <slot />
  </li>
</template>

<script>
  import isEqual from 'lodash/isEqual'
  import { mapActions } from 'vuex'

  export default {
    props: ['option', 'slug', 'current'],
    methods: {
      ...mapActions([
        'setScenario'
      ]),
      isEqual
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

</style>

<template>
  <div class="module">
    <Vis />
    <Navigation />
    <SensesMeta id="emissions-gap" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SensesMeta from 'library/src/components/SensesMeta.vue'
import Vis from '~/components/Vis.vue'
import Navigation from '~/components/Navigation.vue'

export default {
  components: {
    Vis,
    Navigation,
    SensesMeta
  },
  created () {
    this.loadData()
  },
  methods: {
    ...mapActions([
      'loadData'
    ])
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  .module {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-height: calc(100% - #{$spacing});
    width: 100%;
  }

</style>

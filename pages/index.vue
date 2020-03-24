<template>
  <div class="module">
    <Vis />
    <Navigation />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Vis from '~/components/Vis.vue'
import Navigation from '~/components/Navigation.vue'

export default {
  components: {
    Vis,
    Navigation
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

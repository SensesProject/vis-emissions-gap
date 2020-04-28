<template>
  <div class="module">
    <Intro v-if="step === 0" />
    <Vis v-if="step !== 0" />
    <Navigation />
    <SensesMeta id="emissions-gap" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import SensesMeta from 'library/src/components/SensesMeta.vue'
import Vis from '~/components/Vis.vue'
import Navigation from '~/components/Navigation.vue'
import Intro from '~/components/Intro.vue'

export default {
  components: {
    Vis,
    Navigation,
    SensesMeta,
    Intro
  },
  computed: {
    ...mapState({
      step: state => state.navigation.step
    })
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

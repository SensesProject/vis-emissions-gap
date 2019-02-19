<template>
  <div class="module">
    <section class="wrapper">
      <Vis />
      <Story />
    </section>
    <Navigation />
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import Vis from '~/components/Vis.vue'
  import Story from '~/components/Story.vue'
  import Navigation from '~/components/Navigation.vue'

  export default {
    components: {
      Vis,
      Story,
      Navigation
    },
    methods: {
      ...mapActions([
        'loadData'
      ])
    },
    created () {
      this.loadData()
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/variables";

  .module {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-height: 100%;
    margin-top: $spacing;

    .wrapper {
      height: 60vh;
      max-width: 1400px;
      width: 100%;
      display: flex;
      flex: 1;
      align-self: center;

      & > * {
        flex: 1;
      }
    }
  }

</style>

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
    align-content: space-between;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .wrapper {
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

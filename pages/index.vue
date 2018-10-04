<template>
  <div class="wrapper">
    <Vis />
    <Story />
  </div>
</template>

<script>
  import Vis from '~/components/Vis.vue'
  import Story from '~/components/Story.vue'

  export default {
    components: {
      Vis,
      Story
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/variables";

  .wrapper {
    width: 100vw;
    height: 100vh;
    display: flex;

    & > * {
      flex: 1;
    }
  }

</style>

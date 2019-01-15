<template>
  <div class="wrapper">
    <Vis2 />
    <Story />
  </div>
</template>

<script>
  import Vis2 from '~/components/Vis2.vue'
  import Story from '~/components/Story.vue'

  export default {
    components: {
      Vis2,
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

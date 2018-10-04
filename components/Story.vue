<template>
  <section>
    <h1>Text</h1>
    <h2>{{ step }}</h2>
    <h3>{{ steps[step].label }}</h3>
    <ul>
      <li @click="previousStep">Previous</li>
      <li @click="nextStep">Next</li>
    </ul>
  </section>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapState([
        'step',
        'steps'
      ])
    },
    methods: {
      ...mapActions([
        'nextStep',
        'previousStep'
      ])
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/variables";

</style>

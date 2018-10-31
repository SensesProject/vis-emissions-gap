<template>
  <section class="page-aside">
    <div class="content">
      <h1>{{ steps[step].title }}</h1>
      <p>{{ steps[step].text }}</p>
    </div>
    <ul class="nav">
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
  @import "~@/assets/style/global";

  .page-aside {
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: space-between;
  }

  .content {
    padding: 2rem 0;
  }

  .nav {
    display: flex;
    height: 20vh;

    & > * {
      flex: 1;
      @include center();

      cursor: pointer;
      color: #2E2F3B;
      font-weight: bold;
      transition: all 0.2s;

      &:last-child {
        background-color: #D2E7F0;
      }

      &:hover {
        background-color: #2DB4E7;
        color: #fff;
      }
    }
  }

</style>

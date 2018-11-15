<template>
  <section class="page-aside">
    <section class="aside-wrapper">
      <div class="content">
        <h1>{{ steps[step].title }}</h1>
        <p>{{ steps[step].text }}</p>
      </div>
      <ul class="nav">
        <li @click="previousStep">Backwards</li>
        <li @click="nextStep">Continue</li>
      </ul>
    </section>
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

  .aside-wrapper {
    background-color: palette(grey, 100);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    // padding: $spacing;
    box-shadow: 0 1px 30px 0 rgba(0, 0, 0, 0.2);
  }

  .page-aside {
    height: auto;
    margin: $spacing;
  }

  .content {
    padding: $spacing;
  }

  .nav {
    display: flex;
    height: 10vh;

    & > * {
      flex: 1;
      @include center();

      cursor: pointer;
      color: palette(grey, 40);
      font-weight: $font-weight-bold;
      font-size: $size-big;
      transition: all 0.2s;

      &:last-child {
        color: palette(grey, 100);
        background-color: palette(primary, 83);
      }

      &:hover {
        background-color: palette(primary, 50);
        color: #fff;
      }
    }
  }

</style>

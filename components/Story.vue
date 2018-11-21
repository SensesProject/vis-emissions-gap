<template>
  <section class="page-aside">
    <section class="aside-wrapper">
      <div class="content">
        <transition name="fade" mode="out-in">
          <h1 :key="step" :class="{ intro: step === 0 }">{{ steps[step].title }}</h1>
        </transition>
        <transition name="fade" mode="out-in">
          <p v-if="step === 0">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
          <p v-if="step === 1">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            <span class="ndc">NDC</span>
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
          <p v-if="step === 2">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
            <span class="cep">Cost-effective pricing</span> sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
          <p v-if="step === 3">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
          <p v-if="step === 4">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd <span class="gp">Good Pratice</span> gubergren, no sea takimata <span class="nz">Net Zero</span> sanctus est Lorem ipsum dolor sit amet.</p>
        </transition>
      </div>
      <footer>
        <ul class="progress">
          <li
            v-for="(s, i) in steps"
            :class="{ 'isPast': step > i, 'isActive': step === i }">{{ i }}</li>
        </ul>
        <ul class="nav">
          <li @click="previousStep">Backwards</li>
          <li @click="nextStep">Continue</li>
        </ul>
      </footer>
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

  .fade-enter-active, .fade-leave-active {
    transition: opacity .15s ease;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .aside-wrapper {
    background-color: palette(grey, 100);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    // padding: $spacing;
    box-shadow: 0 1px 30px 0 rgba(0, 0, 0, 0.03);
    border: 1px solid palette(grey, 80);
  }

  .page-aside {
    height: auto;
    margin: $spacing;
  }

  .content {
    padding: $spacing * 1.8 $spacing * 2;
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
      text-transform: uppercase;
      letter-spacing: $spacing-widest;
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

  .progress {
    display: flex;
    @include center();
    justify-content: space-between;
    width: 20%;
    margin: $spacing auto;

    & > * {
      background-color: palette(grey, 80);
      border-radius: 50%;
      width: 10px;
      height: 10px;
      text-indent: -9999px;

      &.isPast {
        background-color: palette(grey, 50);
      }

      &.isActive {
        background-color: palette(primary, 50);
      }
    }
  }

</style>

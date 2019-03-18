<template>
  <footer>
    <ul class="nav">
      <li @click="previousStep" :class="{ inactive: step === 0 }">
        <section>
          <span>Previous step</span>
          <small>Title of previous step</small>
        </section>
        <i class="icon-angle-left" />
      </li>
      <li @click="nextStep" :class="{ inactive: step === steps.length - 1 }">
        <section>
          <span>Next step</span>
          <small>Title of next step</small>
        </section>
        <i class="icon-angle-right" />
      </li>
    </ul>
    <svg class="progress">
      <line x1="0%" :x2="`${100 / steps.length * (step + 1)}%`" y1="50%" y2="50%" />
    </svg>
  </footer>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapState({
        'step': state => state.navigation.step
      }),
      ...mapState([
        'steps'
      ])
    },
    methods: {
      ...mapActions([
        'nextStep',
        'previousStep',
        'setStep'
      ])
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  footer {
    align-self: flex-end;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .nav {
    border-top: 1px solid rgba(47, 54, 82, 0.1);
    display: flex;
    height: 8vh;
    justify-content: space-between;
    align-items: center;
    @include wrapper-primary();

    & > * {
      cursor: pointer;
      color: palette(grey, 40);
      font-size: $size-big;
      display: flex;
      align-items: center;

      span, small {
        display: block;
        line-height: 1.2;
        transition: all 0.2s;
      }

      span {
        font-weight: $font-weight-bold;
      }

      i {
        line-height: 1;
        font-size: 1.3rem;
      }

      &:first-child {
        flex-direction: row-reverse;
        text-align: left;
      }

      &:last-child {
        text-align: right;

        span, i {
          color: #39C88A;
        }
      }

      &:hover {
        span, small {
          color: #2F3652;
        }
      }

      &.inactive {
        pointer-events: none;
        color: palette(grey, 70);
      }
    }
  }

  .progress {
    width: 100%;
    height: 5px;

    line {
      stroke: #39C88A;
      stroke-width: 5px;
      transition: all 0.5s;
    }
  }
</style>

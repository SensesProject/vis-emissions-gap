<template>
  <footer>
    <ul class="nav">
      <li @click="previousStep" :class="{ inactive: step === 0 }">
        <span>Previous step</span>
        <small>Title of previous step</small>
      </li>
      <li @click="nextStep" :class="{ inactive: step === steps.length - 1 }">
        <span>Next step</span>
        <small>Title of next step</small>
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

      span, small {
        display: block;
        line-height: 1.2;
        transition: all 0.2s;
      }

      span {
        font-weight: $font-weight-bold;
      }

      &:last-child {
        text-align: right;

        span {
          color: #39C88A;
        }
      }

      &:first-child {
        text-align: left;

        span {
          // color: palette(grey, 100);
        }
      }

      &:hover {
        // background-color: palette(primary, 50);
        span, small {
          color: #2F3652;
        }
      }

      &.inactive {
        pointer-events: none;
        color: palette(grey, 70);

        // &:last-child {
        //   background-color: palette(grey, 90);
        //   color: palette(grey, 70);
        // }
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

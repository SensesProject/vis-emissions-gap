<template>
  <footer>
    <ul class="nav">
      <li @click="previousStep" :class="{ 'nav-item': true, inactive: step === 0 }">
        <i class="icon-angle-left" />
      </li>
      <li class="content"><Story /></li>
      <li @click="nextStep" :class="{ 'nav-item': true, inactive: step === steps.length - 1, start: step === 0 }">
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
  import Story from '~/components/Story.vue'

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
    },
    components: {
      Story
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  @keyframes pulse {
    0% {
      opacity: 0.7;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
    100% {
      opacity: 0.7;
      transform: scale(1);
    }
  }

  footer {
    align-self: flex-end;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .nav {
    // border-top: 1px solid rgba(47, 54, 82, 0.1);
    display: flex;
    min-height: 30vh;
    justify-content: space-between;
    @include wrapper-primary();
    min-height: 270px;

    .content {
      flex: 10;
      align-items: flex-start;
    }

    & > .nav-item {
      flex: 1;
      cursor: pointer;
      color: getColor(gray, 40);
      font-size: $size-big;
      display: flex;
      align-items: center;
      opacity: 0.85;

      &.start {
        animation: pulse 2.5s ease infinite;
      }

      &:hover, &:focus {
        opacity: 1;
        animation: none;
      }

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
        font-size: 2.8rem;
      }

      &:first-child {
        // flex-direction: row-reverse;
        text-align: left;
      }

      &:last-child {
        text-align: right;
        justify-content: flex-end;

        span, i {
          color: $color-blue;
        }
      }

      &:hover {
        span, small {
          color: #2F3652;
        }
      }

      &.inactive {
        pointer-events: none;

        i {
          color: getColor(gray, 70);
        }
      }
    }
  }

  .progress {
    width: 100%;
    height: 5px;

    line {
      stroke: $color-blue;
      stroke-width: 5px;
      transition: all 0.5s;
    }
  }
</style>

<template>
  <footer>
    <ul class="nav">
      <li :class="{ 'nav-item': true, inactive: step === 0 }" @click="previousStep">
        <i class="glyph-angle-left" />
      </li>
      <li class="content">
        <Story />
      </li>
      <li :class="{ 'nav-item': true, inactive: step === steps.length - 1, start: step === 0 }" @click="nextStep">
        <i class="glyph-angle-right" />
      </li>
    </ul>
    <nav class="steps">
      <button v-for="{ key, isCurrent, isPast } in elements" :key="key" :class="['step', { isCurrent, isPast }]" @click="() => setStep(key)" />
    </nav>
  </footer>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { range, map } from 'lodash'
import Story from '~/components/Story.vue'

export default {
  components: {
    Story
  },
  computed: {
    ...mapState({
      step: state => state.navigation.step
    }),
    ...mapState([
      'steps'
    ]),
    elements () {
      return map(range(this.steps.length), (i) => {
        return {
          key: i,
          isCurrent: i === this.step,
          isPast: i < this.step
        }
      })
    }
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
    margin-bottom: $spacing * 2;
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
          color: $color-neon;
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

  .steps {
    @include wrapper-primary();
    @include center();
    justify-content: space-between;
    max-width: 400px;
    margin-top: $spacing / 2;

    .step {
      width: 10px;
      height: 10px;
      border: none;
      background-color: getColor(gray, 80);
      border-radius: 50%;
      transition: background-color $transition;
      cursor: pointer;

      &.isPast {
        background-color: getColor(gray, 60);
      }

      &:hover, &:focus {
        background-color: getColor(neon, 60);
        outline: none;
      }

      &.isCurrent {
        background-color: $color-neon;
        cursor: default;
      }
    }
  }
</style>

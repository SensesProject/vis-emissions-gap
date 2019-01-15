<template>
  <div :class="{ 'vis-options': true, 'isVisible': visibility.indexOf('options') >= 0 }">
    <p>Montes est felis ea ac facilisi id doming elementum te commodo praesent ea stet condimentum, luptatum mi cum ultricies nibh erat voluptua differentiation at nonummy eum differentiated justointeger.</p>
    <ul>
      <li
        v-for="option in options.scenarios"
        :class="{ isActive: scenario === option }"
        @click="setScenario({ scenario: option })">{{ option }}</li>
    </ul>
    <p>Montes est felis ea ac facilisi id doming elementum te commodo praesent ea stet condimentum, luptatum mi cum ultricies nibh erat voluptua differentiation at nonummy eum differentiated justointeger.</p>
    <ul>
      <li
        v-for="option in options.variables"
        :class="{ isActive: variable === option }"
        @click="setScenario({ variable: option })">{{ option }}</li>
    </ul>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    props: ['visibility'],
    computed: {
      ...mapState({
        'scenario': state => state.scenario.scenario.scenario,
        'variable': state => state.scenario.scenario.variable
      }),
      ...mapState([
        'options'
      ])
    },
    methods: {
      ...mapActions([
        'setScenario'
      ])
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  .vis-options {
    line-height: 1.2;
    opacity: 0;
    transition-duration: 0.3s;

    &.isVisible {
      opacity: 1;
    }

    ul {
      text-align: center;

      li {
        background-color: transparent;
        padding-bottom: 2px;
        margin: 0 $spacing / 4;
        display: inline-block;
        cursor: pointer;
        color: palette(grey, 40);
        font-weight: $font-weight-bold;
        font-size: $size-default;

        &:first-child {
          margin-left: 0;
        }

        &:last-child {
          margin-right: 0;
        }

        &:hover, &:focus {
          color: palette(grey, 30);
        }

        &.isActive {
          color: palette(grey, 20);
          cursor: default;
          border-bottom: 2px solid #03A6DC;
        }
      }
    }
  }
</style>

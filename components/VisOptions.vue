<template>
  <div class="vis-options">
    <p>Montes est felis ea ac facilisi id doming elementum te commodo praesent ea stet condimentum, luptatum mi cum ultricies nibh erat voluptua differentiation at nonummy eum differentiated justointeger.</p>
    <ul>
      <li
        v-for="option in options.degrees"
        :class="{ isActive: degree === option }"
        @click="setScenario({ degree: option })">{{ option }}</li>
    </ul>
    <ul>
      <li
        v-for="option in options.parts"
        :class="{ isActive: part === option }"
        @click="setScenario({ part: option })">{{ option }}</li>
    </ul>
    <p>Montes est felis ea ac facilisi id doming elementum te commodo praesent ea stet condimentum, luptatum mi cum ultricies nibh erat voluptua differentiation at nonummy eum differentiated justointeger.</p>
    <ul>
      <li
        v-for="option in options.variables"
        :class="{ isActive: variable === option }"
        @click="setScenario({ variable: option })">{{ option }}</li>
    </ul>
    <p>Montes est felis ea ac facilisi id doming elementum te commodo praesent ea stet condimentum, luptatum mi cum ultricies nibh erat voluptua differentiation at nonummy eum differentiated justointeger.</p>
    <ul>
      <li
        v-for="option in options.range"
        :class="{ isActive: range === option }"
        @click="setScenario({ range: [1950, option] })">{{ option }}</li>
    </ul>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapState({
        'degree': state => state.scenario.scenario.degree,
        'part': state => state.scenario.scenario.part,
        'variable': state => state.scenario.scenario.variable,
        'range': state => state.scenario.scenario.range[1]
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
    transition-duration: 0.3s;

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

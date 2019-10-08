<template>
  <div class="vis-options">
    <p>The study has looked further into the sensitivities, exploring not only <VisOptionInlineWrapper slug="degree" :options="optionsDegree" :current="degree" /> trajectories for <VisOptionInlineWrapper :options="optionsRegion" slug="region" :current="region" />, scenarios with <VisOptionInlineWrapper slug="part" :options="optionsPart" :current="part" /> availability of carbon dioxide removal options, but also <VisOptionInlineWrapper slug="variable" :options="optionsVariable" :current="variable" /> emissions. To explore the data even further head over to the <a target="_blank" class="bold" href="https://data.ene.iiasa.ac.at/iamc-1.5c-explorer//#/workspaces/share/1a6e44c8-0963-4f28-a871-2b81bfb11def">IIASA Explorer</a> and <a class="bold" href="#">download static graphics</a> of this module.</p>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import VisOptionInlineWrapper from '~/components/VisOptionInlineWrapper.vue'
  import VisOptionWrapper from '~/components/VisOptionWrapper.vue'
  import VisOption from '~/components/VisOption.vue'

  const optionsDegree = [
    ['1p5C', '1.5° C'],
    ['2C', '2.0° C']
  ]

  const optionsRegion = [
    ['World', 'World'],
    ['China', 'China'],
    ['USA', 'USA'],
    ['EU', 'EU'],
    ['India', 'India'],
    ['Russia', 'Russia'],
    ['Japan', 'Japan']
  ]

  const optionsPart = [
    ['full', 'full'],
    ['red', 'reduced']
  ]

  const optionsVariable = [
    ['CO2|Energy and Industrial Processes', 'Energy and Industrial Processes'],
    ['CO2|AFOLU', 'AFOLU']
  ]

  export default {
    data: function () {
      return {
        optionsDegree,
        optionsRegion,
        optionsPart,
        optionsVariable
      }
    },
    computed: {
      ...mapState({
        'degree': state => state.scenario.scenario.degree,
        'part': state => state.scenario.scenario.part,
        'variable': state => state.scenario.scenario.variable,
        'range': state => state.scenario.scenario.range,
        'region': state => state.scenario.scenario.region,
        'aside': state => state.scenario.scenario.aside
      }),
      ...mapState([
        'options'
      ])
    },
    methods: {
      ...mapActions([
        'setScenario'
      ])
    },
    components: {
      VisOptionWrapper,
      VisOptionInlineWrapper,
      VisOption
    }
  }
</script>

<style lang="scss">
  @import "~@/assets/style/global";

  .vis-options {
    .options-wrapper {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: $spacing / 2;
      grid-row-gap: $spacing / 4;
    }

    ul {
      li {
        border-bottom: 1px solid transparent;
        display: inline-block;
        text-align: center;
        cursor: pointer;
        color: getColor(gray, 60);
        font-weight: $font-weight-bold;
        font-size: $size-default;
        transition: all 0.5s ease;

        &:first-child {
          margin-left: 0;
        }

        &:last-child {
          margin-right: 0;
        }

        &:hover, &:focus {
          color: getColor(gray, 30);
          border-color: getColor(gray, 70);
        }

        &.isActive {
          cursor: default;
          background-color: #fff;
          border-color: $color-blue;
          color: $color-blue;
        }
      }
    }
  }

  .list {
    li {
      font-weight: $font-weight-bold;
      color: getColor(gray, 60);
      cursor: pointer;

      &:hover, &:focus {
        color: getColor(gray, 30);
      }

      &.isActive {
        cursor: default;
        color: $color-blue;
      }
    }
  }
</style>

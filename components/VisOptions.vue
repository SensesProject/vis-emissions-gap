<template>
  <div class="vis-options">
    <p>The study has looked further into the sensitivities, exploring not only <VisOptionInlineWrapper :current="degree">
        <VisOption option="1p5C" slug="degree" :current="degree">1.5° C</VisOption>
        <VisOption option="2C" slug="degree" :current="degree">2° C</VisOption>
      </VisOptionInlineWrapper> trajectories for <VisOptionInlineWrapper :current="region">
        <VisOption option="World" slug="region" :current="region">World</VisOption>
        <VisOption option="China" slug="region" :current="region">China</VisOption>
        <VisOption option="USA" slug="region" :current="region">USA</VisOption>
        <VisOption option="EU" slug="region" :current="region">EU</VisOption>
        <VisOption option="India" slug="region" :current="region">India</VisOption>
        <VisOption option="Russia" slug="region" :current="region">Russia</VisOption>
        <VisOption option="Japan" slug="region" :current="region">Japan</VisOption>
      </VisOptionInlineWrapper> and scenarios with alternative assumptions leading to a <VisOptionInlineWrapper :current="part">
        <VisOption option="full" slug="part" :current="part">Full</VisOption>
        <VisOption option="red" slug="part" :current="part">Reduced</VisOption>
      </VisOptionInlineWrapper> availability of carbon dioxide removal options, but also <VisOptionInlineWrapper :current="variable">
        <VisOption option="CO2|Energy and Industrial Processes" slug="variable" :current="variable">Energy and Industrial Processes</VisOption>
        <VisOption option="CO2|AFOLU" slug="variable" :current="variable">AFOLU</VisOption>
      </VisOptionInlineWrapper> emissions. To explore the data even further head over to the <a target="_blank" class="bold" href="https://data.ene.iiasa.ac.at/iamc-1.5c-explorer//#/workspaces/share/1a6e44c8-0963-4f28-a871-2b81bfb11def">IIASA Explorer</a> and <a class="bold" href="#">download static graphics</a> of this module.</p>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import VisOptionInlineWrapper from '~/components/VisOptionInlineWrapper.vue'
  import VisOptionWrapper from '~/components/VisOptionWrapper.vue'
  import VisOption from '~/components/VisOption.vue'

  export default {
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
        color: palette(grey, 60);
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
          color: palette(grey, 30);
          border-color: palette(grey, 70);
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
      color: palette(grey, 60);
      cursor: pointer;

      &:hover, &:focus {
        color: palette(grey, 30);
      }

      &.isActive {
        cursor: default;
        color: $color-blue;
      }
    }
  }
</style>

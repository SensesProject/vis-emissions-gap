<template>
  <div class="vis-options">
    <p>The study has looked further into the sensitivities, exploring not only 1.5°C trajectories but also 2°C trajectories, and scenarios with alternative assumptions leading to a lower availability of carbon dioxide removal options. The fields below allow you to explore the emission profiles and investment implications of these alternative scenarios, as well as the emission profiles for major economies (both CO2 from fossil fuels and cement, and ….)</p>
    <section class="options-wrapper">
      <VisOptionWrapper label="Climate Target" tooltip="The study Kriegler et al. 2018 implemented the 1.5°C target as a carbon budget of 400 Gt CO2 from 2011-2100 (including all anthropogenic CO2 emissions). For the 2°C, the carbon budget is 1000 Gt CO2.">
        <VisOption option="1p5C" slug="degree" :current="degree">1.5° C</VisOption>
        <VisOption option="2C" slug="degree" :current="degree">2° C</VisOption>
      </VisOptionWrapper>
      <VisOptionWrapper label="CDR Availability" tooltip="Under full CDR (carbon dioxide removal) availability, the existing geological reservoirs suitable for carbon storage can be filled with 1% of the overall capacity per year (which roughly equates to 16 Gt per year globally), and no explicit restrictions apply to afforestation and bio-energy. The assumptions of reduced availability are 0.5% yearly injection for the geological storage, an absolute bound of 375 million ha of area suitable for afforestation and a maximum of 100 EJ purpose-grown bioenergy per year.">
        <VisOption option="full" slug="part" :current="part">Full</VisOption>
        <VisOption option="red" slug="part" :current="part">Reduced</VisOption>
      </VisOptionWrapper>
      <VisOptionWrapper label="Timeframe" tooltip="The modeling captures the entire 21st century.">
        <VisOption :option="[1990, 2050]" slug="range" :current="range">Until 2050</VisOption>
        <VisOption :option="[1990, 2100]" slug="range" :current="range">Until 2100</VisOption>
      </VisOptionWrapper>
      <VisOptionWrapper :isDropdown="true" label="Emissions" :current="variable" tooltip="The previous views showed CO2 emissions from fossil fuels and cement. CO2 from the land-use system also are part of the total anthropogenic emissions.">
        <VisOption option="CO2|Energy and Industrial Processes" slug="variable" :current="variable">Energy and Industrial Processes</VisOption>
        <VisOption option="CO2|AFOLU" slug="variable" :current="variable">AFOLU</VisOption>
      </VisOptionWrapper>
      <VisOptionWrapper :isDropdown="true" label="Region" :current="region">
        <VisOption option="World" slug="region" :current="region">World</VisOption>
        <VisOption option="China" slug="region" :current="region">China</VisOption>
        <VisOption option="USA" slug="region" :current="region">USA</VisOption>
        <VisOption option="EU" slug="region" :current="region">EU</VisOption>
        <VisOption option="India" slug="region" :current="region">India</VisOption>
        <VisOption option="Russia" slug="region" :current="region">Russia</VisOption>
        <VisOption option="Japan" slug="region" :current="region">Japan</VisOption>
      </VisOptionWrapper>
      <a class="btn btn--inline" href="https://data.ene.iiasa.ac.at/iamc-1.5c-explorer//#/workspaces/share/1a6e44c8-0963-4f28-a871-2b81bfb11def">See this data in the IIASA Database Workspace: PEP Emissions by major economies ↗</a>
    </section>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import VisOptionWrapper from '~/components/VisOptionWrapper.vue'
  import VisOption from '~/components/VisOption.vue'

  export default {
    computed: {
      ...mapState({
        'degree': state => state.scenario.scenario.degree,
        'part': state => state.scenario.scenario.part,
        'variable': state => state.scenario.scenario.variable,
        'range': state => state.scenario.scenario.range,
        'region': state => state.scenario.scenario.region
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
      VisOption
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  .vis-options {
    .options-wrapper {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: $spacing / 2;
      grid-row-gap: $spacing / 2;
    }

    ul {
      // margin-top: $spacing;

      li {
        border-bottom: 1px solid transparent;
        // background-color: $color-bg-default;
        // padding: $spacing / 4 $spacing;
        // padding-bottom: 2px;
        // margin: 0 $spacing / 4;
        display: inline-block;
        text-align: center;
        cursor: pointer;
        color: palette(grey, 60);
        font-weight: $font-weight-bold;
        font-size: $size-default;
        // border-radius: $radius-default;
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
          color: palette(grey, 20);
          cursor: default;
          background-color: #fff;
          border-color: $color-blue;
          color: $color-blue;
        }
      }
    }
  }
</style>

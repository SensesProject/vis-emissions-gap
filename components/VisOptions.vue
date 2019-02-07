<template>
  <div class="vis-options">
    <p>Montes est felis ea ac facilisi id doming elementum te commodo praesent ea stet condimentum, luptatum mi cum ultricies nibh erat voluptua differentiation at nonummy eum differentiated justointeger.</p>
    <VisOptionWrapper label="Climate Target">
      <VisOption option="1p5C" slug="degree" :current="degree">1.5 C</VisOption>
      <VisOption option="2C" slug="degree" :current="degree">2 C</VisOption>
    </VisOptionWrapper>
    <VisOptionWrapper label="Climate Target">
      <VisOption option="full" slug="part" :current="part">Full</VisOption>
      <VisOption option="red" slug="part" :current="part">Reduced</VisOption>
    </VisOptionWrapper>
    <VisOptionWrapper label="Emissions">
      <VisOption option="CO2" slug="variable" :current="variable">CO<sub>2</sub></VisOption>
      <VisOption option="Kyoto Gases" slug="variable" :current="variable">Kyoto Gases</VisOption>
    </VisOptionWrapper>
    <VisOptionWrapper label="Timeframe">
      <VisOption :option="[1990, 2050]" slug="range" :current="range">Until 2050</VisOption>
      <VisOption :option="[1990, 2100]" slug="range" :current="range">Until 2100</VisOption>
    </VisOptionWrapper>
    <VisOptionWrapper label="Region">
      <VisOption option="World" slug="region" :current="region">World</VisOption>
      <VisOption option="China" slug="region" :current="region">China</VisOption>
      <VisOption option="USA" slug="region" :current="region">USA</VisOption>
      <VisOption option="EU" slug="region" :current="region">EU</VisOption>
      <VisOption option="India" slug="region" :current="region">India</VisOption>
      <VisOption option="Russia" slug="region" :current="region">Russia</VisOption>
      <VisOption option="Japan" slug="region" :current="region">Japan</VisOption>
    </VisOptionWrapper>
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
    ul {
      margin-top: $spacing;

      li {
        border: 1px solid palette(grey, 80);
        background-color: $color-bg-default;
        padding: $spacing / 4 $spacing;
        // padding-bottom: 2px;
        margin: 0 $spacing / 4;
        display: inline-block;
        cursor: pointer;
        color: palette(grey, 60);
        font-weight: $font-weight-bold;
        font-size: $size-default;
        border-radius: $radius-default;
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
          border-color: $color-red;
          color: $color-red;
        }
      }
    }
  }
</style>

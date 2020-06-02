<template>
  <div class="intro">
    <header>
      <h1>Closing the emissions gap</h1>
    </header>
    <div>
      <p>In the Paris Agreement of 2015, the international community has agreed to the long-term target of keeping temperature increase to well below 2°C and pursue efforts to even keeping it below 1.5°C. To implement this, the Agreement foresees all countries to periodically submit "<span v-tooltip="'These NDCs contain - among other things - decarbonization targets for the year 2025 or 2030'" class="info">Nationally Determined Contributions</span>" (NDC). This learn module explores how the aggregate of the first set of these national decarbonization plans for 2030 relate to the long-term targets, and how additional implementation of strengthened sectoral policies after 2020 could bend the curve further down towards the required trajectory. It illustrates model-based findings as also synthesized in publications like the <a href="https://www.unenvironment.org/resources/emissions-gap-report-2019" target="_blank">UNEP gap report</a> or earlier in the <a href="https://unfccc.int/process/the-paris-agreement/nationally-determined-contributions/synthesis-report-on-the-aggregate-effect-of-intended-nationally-determined-contributions" target="_blank">UNFCCC synthesis report</a>. It is targeted at stakeholders interested in the international climate policy situation.</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      step: state => state.navigation.step
    })
  },
  methods: {
    ...mapActions([
      'setHighlight'
    ])
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  .intro {
    max-width: 900px;
    margin: 0 auto;
    flex: 1;
    @include center();
    flex-direction: column;

    header {
      width: 100%;
      text-align: left;
      margin-bottom: $spacing;

      h1 {
        font-size: 3rem;
        margin: 0 $spacing / 2;
      }
    }

    // & > * {
    //   margin: 0 $spacing / 2;
    // }

    p {
      line-height: 1.9;
      margin: 0 $spacing / 2;
    }
  }

</style>

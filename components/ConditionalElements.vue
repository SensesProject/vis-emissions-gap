<template>
  <g>
    <VisPulse
      :x="(x2 - x1) / 3"
      :y="y - 20"
      label="Due to the long lifetime of CO2 in the atmosphere, the concentration of CO2 which causes the warming effect will increase as long as yearly emissions are positive. This means that yearly emissions have to be reduced to zero in order to stability the concentration in the atmosphere and thus warming. If net negative emissions are reached by employing more carbon dioxide removal than residual positive emissions, the concentration of CO2 in the atmosphere can be reduced and thus the warming reduced."
    />
    <VisPulse
      v-if="region !== 'World'"
      :x="year2035"
      :y="middle"
      label="The cost-effective pathway assumes that marginal abatement costs are equalized across regions. This leads to higher mitigation costs (in %-point of baseline GDP or consumption) in developing regions, as these tend to have higher emission intensities of GDP and furthermore still need to complete the emission intensive build-up of infrastructure. Therefore, this cost-effective pathway represent a fair burden sharing only when transfers from richer to poorer regions offset these higher losses. If these transfers turn out to be impossible for political reasons, emission reductions in developed regions under cost-effective policies might need to be faster."
    />
    <VisPulse
      :x="year2075"
      :y="middleNegative"
      label="…"
    />
    <VisPulse
      :x="year2025"
      :y="top"
      v-if="part === 'red' && degree === '1p5C'"
      label="Achieving the very demanding emission reductions implied by the 1.5°C target with only reduced availability of CDR is only possible with the model specifications when assuming cost-effective policies already in 2025."
    />
    <VisPulse
      :x="year2020"
      :y="middle"
      v-if="step === 1"
      label="Carbon Budget"
    />
    <VisPulse
      :x="trajectoriesMiddle[0]"
      :y="trajectoriesMiddle[1]"
      v-if="step === 1"
      label="Trajectories…"
    />
  </g>
</template>

<script>
  import VisPulse from '~/components/VisPulse.vue'
  import { mapState, mapGetters } from 'vuex'
  import { mean, get, last, find } from 'lodash'

  export default {
    props: ['margin', 'height', 'width', 'scaleX', 'scaleY'],
    computed: {
      ...mapState({
        'degree': state => state.scenario.scenario.degree,
        'step': state => state.navigation.step,
        'part': state => state.scenario.scenario.part,
        'variable': state => state.scenario.scenario.variable,
        'range': state => state.scenario.scenario.range,
        'region': state => state.scenario.scenario.region
      }),
      ...mapGetters([
        'currentPaths'
      ]),
      middle: function () {
        return mean([this.scaleY(0), this.scaleY.range()[1]])
      },
      top: function () {
        return mean([this.scaleY(0), this.scaleY.range()[1], this.scaleY.range()[1]])
      },
      middleNegative: function () {
        return mean([this.scaleY(0), this.scaleY.range()[0]])
      },
      zero: function () {
        return this.scaleY(0)
      },
      today: function () {
        return this.scaleX(new Date(2019, 0, 1))
      },
      end: function () {
        return this.scaleY.range()[0]
      },
      x1: function () {
        return this.scaleX.range()[0]
      },
      x2: function () {
        return this.scaleX.range()[1]
      },
      y: function () {
        return this.scaleY(0)
      },
      year2020: function () {
        return this.scaleX(new Date(2020, 0, 1))
      },
      year2025: function () {
        return this.scaleX(new Date(2025, 0, 1))
      },
      year2035: function () {
        return this.scaleX(new Date(2035, 0, 1))
      },
      year2075: function () {
        return this.scaleX(new Date(2075, 0, 1))
      },
      trajectoriesMiddle: function () {
        const x1 = mean([2020, 2050])
        const x2 = mean([2020, 2075])
        const [, y] = last(get(find(this.currentPaths, { scenario: 'historic' }), 'values', []))
        return [this.scaleX(new Date(mean([x1, x2]), 0, 1)), this.scaleY(mean([y || 0, 0]))]
      }
    },
    components: {
      VisPulse
    }
  }
</script>

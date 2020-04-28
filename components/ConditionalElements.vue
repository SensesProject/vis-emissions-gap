<template>
  <transition-group name="fade" tag="g">
<!--     <VisPulse
      v-if="step === 1"
      key="negativeEmission"
      :x="(x2 - x1) / 3"
      :y="y - 20"
      label="Due to the long lifetime of CO₂ in the atmosphere, the concentration of CO₂, which causes the warming effect will increase as long as yearly emissions are positive. This means that yearly emissions have to be reduced to zero in order to stabilize the concentration in the atmosphere and thus warming. If net negative emissions are reached by employing more carbon dioxide removal than positive residual emissions, the concentration of CO₂ in the atmosphere can be reduced and thus the warming reduced."
    /> -->
    <VisPulse
      v-if="region !== 'World'"
      key="nonWorld"
      :x="year2035"
      :y="middle"
      label="The cost-effective pathway assumes that marginal abatement costs are equalized across regions. This leads to higher mitigation costs (in %-point of baseline GDP or consumption) in developing regions, as these tend to have higher emission intensities of GDP and furthermore still need to complete the emission-intensive build-up of infrastructure. Therefore, this cost-effective pathway represents a fair burden-sharing only when transfers from richer to poorer regions offset these higher losses. If these transfers turn out to be impossible for political reasons, emission reductions in developed regions under cost-effective policies might need to be faster."
    />
    <VisPulse
      v-if="part === 'red' && degree === '1p5C'"
      key="year2025"
      :x="year2025"
      :y="top"
      label="Achieving the very demanding emission reductions implied by the 1.5°C target with only reduced availability of CDR is only possible with the model specifications when assuming cost-effective policies already in 2025."
    />
    <VisPulse
      v-if="step === 1"
      key="landUse"
      :x="middleHistoric[0]"
      :y="middleHistoric[1]"
      label="Land Use emissions are shown in the green shaded area. The rest of this learn module however focuses on the CO2 emissions from fossil fuel use and industrial processes shown in grey"
    />
    <VisPulse
      v-if="step === 2"
      key="budget"
      :x="year2045"
      :y="lowerThird"
      label="The IPCC special report on 1.5°C scenarios states that the median for the remaining budget for limiting warming to 1.5°C is 580 Gt CO₂ from 2018 until the time of net-zero. Assuming that roughly 120 Gt is still emitted in the three years 2018–2020, this roughly leaves 460 Gt. This equates to a triangle that represents a linear reduction from 40 Gt per year to 0 within 23 years. On the other hand, various uncertainties are in the order of magnitude of 200 Gt, which equates to uncertainty in the timing of reaching net-zero of 5 years."
    />
  </transition-group>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { mean, get, last, find } from 'lodash'
import VisPulse from '~/components/VisPulse.vue'

export default {
  props: ['margin', 'height', 'width', 'scaleX', 'scaleY'],
  computed: {
    ...mapState({
      degree: state => state.scenario.scenario.degree,
      step: state => state.navigation.step,
      part: state => state.scenario.scenario.part,
      variable: state => state.scenario.scenario.variable,
      range: state => state.scenario.scenario.range,
      region: state => state.scenario.scenario.region
    }),
    ...mapGetters([
      'currentPaths'
    ]),
    middle () {
      return mean([this.scaleY(0), this.scaleY.range()[1]])
    },
    lowerThird () {
      return mean([this.scaleY(0), this.scaleY(0), this.scaleY.range()[1]])
    },
    top () {
      return mean([this.scaleY(0), this.scaleY.range()[1], this.scaleY.range()[1]])
    },
    middleNegative () {
      return mean([this.scaleY(0), this.scaleY.range()[0]])
    },
    zero () {
      return this.scaleY(0)
    },
    today () {
      return this.scaleX(new Date(2019, 0, 1))
    },
    end () {
      return this.scaleY.range()[0]
    },
    x1 () {
      return this.scaleX.range()[0]
    },
    x2 () {
      return this.scaleX.range()[1]
    },
    y () {
      return this.scaleY(0)
    },
    year2020 () {
      return this.scaleX(new Date(2020, 0, 1))
    },
    year2025 () {
      return this.scaleX(new Date(2025, 0, 1))
    },
    year2035 () {
      return this.scaleX(new Date(2035, 0, 1))
    },
    year2045 () {
      return this.scaleX(new Date(2045, 0, 1))
    },
    year2075 () {
      return this.scaleX(new Date(2075, 0, 1))
    },
    trajectoriesMiddle () {
      const x1 = mean([2020, 2050])
      const x2 = mean([2020, 2075])
      const [, y] = last(get(find(this.currentPaths, { scenario: 'historic' }), 'values', []))
      return [this.scaleX(new Date(mean([x1, x2]), 0, 1)), this.scaleY(mean([y || 0, 0]))]
    },
    middleHistoric () {
      const historic = get(find(this.currentPaths, { scenario: 'historic' }), 'values', [])
      const historicLandUse = get(find(this.currentPaths, { scenario: 'historic-landuse-addition' }), 'values', [])

      const i = Math.floor(historic.length / 2)

      const [x, y1] = historic[i]
      const [, y2] = historicLandUse[i]
      const y = mean([y1, y2])

      return [this.scaleX(new Date(x, 0, 1)), this.scaleY(y)]
    }
  },
  components: {
    VisPulse
  }
}
</script>

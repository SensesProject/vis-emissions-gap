<template>
  <div class="content">
    <transition name="fade" mode="out-in">
      <article v-if="step === 1" key="step0">
        <header>
          <h1>Where are we coming from?</h1>
        </header>
        <section>
          <p>
            Let’s start with the historical CO₂ emissions from 1990 until 2016, coming from the combustion of fossil fuels (coal, oil and natural gas) and cement production, and from land-use. As we can see, these emissions have increased sharply in the first decade of the 21st century, and are still on an upward trajectory (at least before COVID-19).
          </p>
        </section>
      </article>
      <article v-if="step === 2" key="step1">
        <header>
          <h1>Where do we want to go?</h1>
        </header>
        <section>
          <p>The Paris Agreement set the long-term target of keeping a global temperature rise this century well below 2 degrees Celsius above pre-industrial levels and to pursue efforts to limit the temperature increase even further to 1.5 degrees Celsius.</p>
          <p>From climate physics, we know that reaching these targets implies limiting the cumulative CO₂ emissions to a very tight <span v-tooltip="'The cumulative emissions correspond to the area below the emissions curve in the graph. Obviously, this area can only be limited to a restricted size by reducing emissions to zero.'" class="info">carbon budget</span>. The latest <a href="https://www.ipcc.ch/sr15/" target="_blank">IPCC report</a> has shown that therefore the 2°C target means that CO₂ emission has to be reduced to zero around 2075. For limiting warming to 1.5°C, CO₂ emissions have to be reduced to zero around 2050.</p>
        </section>
      </article>
      <article v-if="step === 3" key="step2">
        <header>
          <h1>How do we get there?</h1>
          <h3>Are the Paris Agreement’s near-term plans appropriate?</h3>
        </header>
        <section>
          <p><a href="https://www.climatescenarios.org/primer/">Scenarios from integrated assessment models</a> help us explore what near-term and long-term targets imply in terms of emission trajectories. With the mitigation efforts pledged by countries in their nationally determined contributions (<span class="ndc" @mouseover="setHighlight('NDC')" @mouseleave="setHighlight(false)">NDCs</span>), global emissions would reach a plateau from 2020–2030, so that 2030 emissions are only slightly higher than todays.</p>
          <p>The problem is: As we have seen in the previous step, we need to reduce emissions dramatically and not stay at the same level in order to not breach the long-term temperature targets.</p>
          <p>Scenario source: <span v-tooltip="'The scenarios shown in coloured lines in this module are from a recent scientific publication with the REMIND-MAgPIE modelling framework (Kriegler et al. 2018). The qualitative insights are identical to similar studies with other models (Luderer et al. 2018, Rogelj et al. 2015)'" class="info">REMIND-MAgPIE</span>.</p>
        </section>
      </article>
      <article v-if="step === 4" key="step3">
        <h1>How do we get there?</h1>
        <h3>What would immediate action look like in contrast?</h3>
        <p>Under the assumption that some strengthening of policies is achieved already in 2020 and that globally coordinated <span v-tooltip="'Under the assumption of functioning markets and perfect foresight, pricing of all greenhouse-gas emissions, either via a carbon tax or a scheme of tradable emission permits are the cost-effective policy.'" class="info ndc" @mouseover="setHighlight('eff')" @mouseleave="setHighlight(false)">cost-effective policies</span> are in place in 2025, sharp reductions of emissions already until 2030 would result. This would mean that the rate of warming is reduced early on, reducing climate impacts, and would furthermore mean an early push for <span v-tooltip="'Key strategies for decarbonization are 1) early decarbonization of power supply, mostly via renewables but also via nuclear or combination of efficient natural gas plants with carbon capture and storage. 2) Secondly, substantial electrification of energy end-uses (via battery-electric or fuel-cell vehicles in transport, heat pumps in buildings and industry, etc.) and 3) the reduction of carbon-intensity of remaining solid, liquid and gaseous fuel the use via use of bio-energy, synthetic fuels and or employment of carbon capture and storage (CCS).'" class="info">mitigation technologies</span>, requiring more than a doubling of low-carbon power sector investments in the coming years (see right-hand side panel).</p>
      </article>
      <article v-if="step === 5" key="step4">
        <h1>How do we get there?</h1>
        <h3>What do these short-term alternatives imply for achieving the long-term target of 1.5°C?</h3>
        <p>If coordinated policies only start after following the <span class="ndc" @mouseover="setHighlight('NDC')" @mouseleave="setHighlight(false)">NDC</span> trajectory until 2030, very abrupt emission reductions would be required between 2030 and 2050, and more <span v-tooltip="'Combining bioenergy with carbon capture and storage leads to a removal of CO₂ from the atmosphere, as the CO₂ that plants take up during growth is eventually stored in geological reservoirs. Similarly, active afforestation can reduce the concentration of CO₂ in the atmosphere, by increasing the stock of CO₂ bound within standing trees. The need for CDR is higher in the NDC scenario than in the cost-effective one, as the additional emissions before the point of crossing of the two trajectories have to be compensated by lower emissions (or even more negative emissions) after this point of crossing.'" class="info">carbon dioxide removal</span> (CDR) would be needed in the second half of the century. It would also mean that low-carbon power sector investments would stay at about today's level for 10 more years, and would then need to triple (see right-hand side panel).</p>
      </article>
      <article v-if="step === 6" key="step6">
        <header>
          <h1>How do we get there?</h1>
          <h3>What are the alternatives?</h3>
        </header>
        <section>
          <p>Therefore, the question is how an intermediate scenario could look like that neither requires full global policy harmonization within the next few years nor requires massive abrupt strengthening in 2030. One such scenario is the <span class="nz" @mouseover="setHighlight('netzero')" @mouseleave="setHighlight(false)">“Bridge” scenario</span> that explores how country-specific strengthening of policies can lead to early emission reductions and thus come closer to the cost-effective. Policies that can contribute to such a Bridge scenario could be based on an analysis of policy successes as already observed in some legislations. Or policies that target the requirements to achieve net-zero emissions in all sectors in the second half of the century. As can be seen on the graph, the more nuanced policy assumptions in the <span class="nz" @mouseover="setHighlight('netzero')" @mouseleave="setHighlight(false)">Bridge scenario</span> lead to a smoother emissions trajectory without pronounced kinks. Also, the extreme jumps in investment numbers as shown on the right side are mitigated, and investments gradually increase over the coming decades.</p>
        </section>
      </article>
      <article v-if="step === 7" key="step5">
        <header>
          <h1>How do we get there?</h1>
          <h3>What are the alternatives?</h3>
        </header>
        <section>
          <p>Abrupt emission reduction (as seen in the <span class="ndc" @mouseover="setHighlight('NDC')" @mouseleave="setHighlight(false)">NDC scenario</span> in 2030 and the <span class="eff" @mouseover="setHighlight('eff')" @mouseleave="setHighlight(false)">cost-effective scenario</span> in 2020) also result in higher levels of pre-mature retirement of carbon-intensive infrastructure, especially coal-fired power plants. In the NDC scenario, these are exacerbated by continued investments in new coal-fired capacities until 2030 in some regions. The strengthened policies results such continued lock-in, but also alleviate the effects of immediately shocking the current system, build without anticipation of stringent policies, with abruptly rising carbon prices.</p>
        </section>
      </article>
      <article v-if="step === 8" key="step7">
        <header>
          <h1>Looking at the full century</h1>
        </header>
        <section>
          <p>The 1.5°C scenario shown here belongs to the class of 1.5°C scenarios with high overshoot within the IPCC report on 1.5°C scenarios. “Overshoot” means that the allowable carbon budget is temporarily exceeded, which is compensated by net negative CO₂ emissions in the second half of the century. Scenarios with lower overshoot (as e.g. the 1.5°C with lower CDR that you can select in the next frame) need less of such negative emissions in the 2nd half of the century, but then need even faster emissions reductions in the following decades.</p>
        </section>
      </article>
      <article v-if="step === 9" key="step8">
        <h1>Exploring further</h1>
        <VisOptions />
      </article>
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import VisOptions from '~/components/VisOptions.vue'

export default {
  components: {
    VisOptions
  },
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

  .page-aside {
    position: absolute;
    display: flex; // make us of Flexbox
    align-items: center; // does vertically center the desired content
    justify-content: flex-end; // horizontally centers single line items
    pointer-events: none;
    height: 100%;
    width: 100%;

    &.isLeft {
      justify-content: flex-start;
    }
  }

  .aside-wrapper {
    pointer-events: all;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: rgba(245, 245, 245, 0.8);
    $padding: 20px;
    width: calc(50% + #{$padding * 2});
    padding: $padding;

    .content {
      height: 100%;
    }
  }

  article {
    counter-reset: footnotes;
    display: flex;
    flex-direction: column;
    height: 100%;
    max-width: 900px;
    margin: 0 auto;

    a {
      color: $color-blue;
      background: none;

      &.bold {
        text-decoration: underline;
        font-weight: $font-weight-bold;
      }

      &:hover, &:focus {
        color: getColor(blue, 40);
        background: none;
        text-decoration: underline;
      }
    }

    & > * {
      width: 100%;
    }

    section {
      flex: 1;
    }

    h1 {
      font-size: $size-biggest;
      line-height: 1.1;
      margin-bottom: $spacing / 3;
    }

    h3 {
      font-size: $size-big;
      margin-bottom: $spacing / 4;
    }
  }
</style>

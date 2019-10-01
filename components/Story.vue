<template>
  <div class="content">
    <transition name="fade" mode="out-in">
      <article v-if="step === 0" key="step0">
        <header>
          <h1>Where are we coming from?</h1>
        </header>
        <section>
          <p>
            This module explores how current <span class="info" v-tooltip="'Each country has submitted a “Nationally determined contribution” (NDC), which contains - inter alia - decarbonization targets for the year 2025 or 2030'">decarbonization plans until 2030</span> relate to the <span class="info" v-tooltip="'Holding the increase in the global average temperature to well below 2 °C above pre-industrial levels and pursuing efforts to limit the temperature increase to 1.5 °C above pre-industrial levels'">long-term targets of the Paris Agreement</span>.
          </p>
          <p>
            Let’s start with the historic CO2 emissions from 1990 until 2016, coming from the combustion of fossil fuels (coal, oil and natural gas) and cement production, and from land-use. As we can see, these emissions have increased strongly in the first decade of the 21st century, and are still on an upward trajectory.
          </p>
        </section>
      </article>
      <article v-if="step === 1" key="step1">
        <header>
          <h1>Where do we want to go?</h1>
        </header>
        <section>
          <p>Paris Agreement set the long-term target of keeping a global temperature rise this century well below 2 degrees Celsius above pre-industrial levels and to pursue efforts to limit the temperature increase even further to 1.5 degrees Celsius.</p>
          <p>From climate physics, we know that reaching these targets implies limiting the cumulative CO2 emissions to a very tight <span class="info" v-tooltip="'The cumulative emissions correspond to the area below the emissions curve in the graph. Obviously, this area can only be limited to a restricted size by reducing emissions to zero'">carbon budget</span>. The latest <a href="https://www.ipcc.ch/sr15/" target="_blank">IPCC report</a> has shown that therefore the 2°C target implies that CO2 emission have to be reduced to zero around 2075. For limiting warming to 1.5°C, CO2 emissions have to be reduced to zero around 2050.</p>
        </section>
      </article>
      <article v-if="step === 2" key="step2">
        <header>
          <h1>How do we get there?</h1>
          <h3>Are the Paris Agreement’s near-term plans appropriate?</h3>
        </header>
        <section>
          <p><a href="https://www.climatescenarios.org/primer/">Scenarios from integrated assessment models</a> help us explore what near-term and long-term targets. With the mitigation efforts pledged by countries in their nationally determined contributions (<span class="ndc" @mouseover="setHighlight('NDC')" @mouseleave="setHighlight(false)">NDCs</span>), global emissions would reach a plateau from 2020–2030, so that 2030 emissions are only slightly higher than todays.</p>
          <p>The problem is: As we have seen in the previous step, we need to dramatically reduce emissions and not stay on the same level.</p>
          <p>Scenario source: <span class="info" v-tooltip="'The scenarios shown in coloured lines in this module are from a recent scientific publication with the REMIND-MAgPIE modeling framework (Kriegler et al. 2018 plus link). The qualitative insights are identical to similar studies with other models (Luderer et al. 2018 plus link, Rogelj et al. 2015 plus link)'">REMIND-MAgPIE</span>.</p>
        </section>
      </article>
      <article v-if="step === 3" key="step3">
        <h1>How do we get there?</h1>
        <h3>What would immediate action look like in contrast?</h3>
        <p>Under the assumption that some strengthening of policies is achieved already in 2020 and that globally coordinated <span class="info ndc" v-tooltip="'Under the assumption of functioning markets and perfect foresight, pricing of all greenhouse-gas emissions, either via a carbon tax or a scheme of tradable emission permits are the cost-effective policy.'" @mouseover="setHighlight('eff')" @mouseleave="setHighlight(false)">cost-effective policies</span> are in place in 2025, strong reductions of emissions already until 2030 would result. This would mean that the rate of warming is reduced early on, reducing climate impacts, and would furthermore mean an early push for <span class="info" v-tooltip="'Key strategies for decarbonization are 1) early decarbonization of power supply, mostly via renewables but also via nuclear or combination of efficient natural gas plants with carbon capture and storage. 2) Secondly, strong electrification of energy end-uses (via battery-electric or fuel-cell vehicles in transport, heat pumps in buildings and industry, etc.) and 3) the reduction of carbon-intensity of remaining solid, liquid and gaseous fuel use via use of bio-energy, synthetic fuels and or employment of carbon capture and storage (CCS).'">mitigation technologies</span></p>
      </article>
      <article v-if="step === 4" key="step4">
        <h1>How do we get there?</h1>
        <h3>What do these short-term alternatives imply for achieving the long-term target of 1.5°C?</h3>
        <p>If coordinated policies only start after following the <span class="ndc" @mouseover="setHighlight('NDC')" @mouseleave="setHighlight(false)">NDC</span> trajectory until 2030, very abrupt emission reductions would be required between 2030 and 2050, and more <span class="info" v-tooltip="'Combining bioenergy with carbon capture and storage leads to a removal of CO2 from the atmosphere, as the CO2 that plants take up during growth is eventually stored in geological reservoirs. Similarly, active afforestation can reduce the concentration of CO2 in the atmosphere, by increasing the stock of CO2 bound within standing trees. The need for CDR is higher in the NDC scenario than in the cost-effective one, as the additional emissions before the point of crossing of the two trajectories have to be compensated by lower emissions (or even more negative emissions) after this point of crossing.'">carbon dioxide removal</span> (CDR) would be needed in the second half of the century.</p>
      </article>
      <article v-if="step === 5" key="step5">
        <header>
          <h1>How do we get there?</h1>
          <h3>What are the alternatives?</h3>
        </header>
        <section>
          <p>Abrupt emission reduction (as seen in the <span class="ndc" @mouseover="setHighlight('NDC')" @mouseleave="setHighlight(false)">NDC scenario</span> in 2030 and in the <span class="eff" @mouseover="setHighlight('eff')" @mouseleave="setHighlight(false)">cost-effective scenario</span> would require the pre-mature retirement of carbon-intensive infrastructure, especially coal-fired power plants and an enormously fast ramp-up of low-carbon alternatives.</p>
          <p>This is also reflected in the investment requirements shown on the right side: The NDC scenario would require a huge jump in investments after 2030, while in the cost-effective scenario a huge jump would be needed now.<p>
          <p>For these reason, both these pathways seem an unlikely way to reach the long-term targets.</p>
        </section>
      </article>
      <article v-if="step === 6" key="step6">
        <header>
          <h1>How do we get there?</h1>
          <h3>What are the alternatives?</h3>
        </header>
        <section>
          <p>Therefore, the question is how an intermediate scenario could look like that neither requires full global policy harmonization within the next few years, nor requires massive abrupt strengthening in 2030. One such scenario is the <span class="nz" @mouseover="setHighlight('netzero')" @mouseleave="setHighlight(false)">“Bridge” scenario</span> that explores how country-specific strengthening of policies can lead to early emission reductions and thus come closer to the cost-effective. Policies that can contribute to such a Bridge scenario could be based on an analysis of policy successes as already observed in some legislations, or policies that target of the requirements to achieve net-zero emissions in all sectors in the second half of the century. As can be seen on the graph, the more nuanced policy assumptions in the <span class="nz" @mouseover="setHighlight('netzero')" @mouseleave="setHighlight(false)">Bridge scenario</span> lead to a smoother emissions trajectory without pronounced kinks, and also the extreme breaks in investment numbers as shown on the right side are mitigated.</p>
        </section>
      </article>
      <article v-if="step === 7" key="step7">
        <header>
          <h1>Looking at the full century</h1>
        </header>
        <section>
          <p>The 1.5°C scenario shown here belongs to the class of 1.5°C scenarios with high overshoot within the IPCC report on 1.5°C scenarios. “Overshoot” means that the allowable carbon budget is temporarily exceeded, which is compensated by net negative CO2 emissions in the second half of the century. Scenarios with lower overshoot (as e.g. the 1.5°C with lower CDR that you can select in the next frame) need less of such negative emissions in the 2nd half of the century, but then need even faster emissions reductions in the next decades.</p>
        </section>
      </article>
      <article v-if="step === 8" key="step8">
        <h1>Exploring further</h1>
        <VisOptions />
      </article>
    </transition>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import VisOptions from '~/components/VisOptions.vue'
  import StoryDot from '~/components/StoryDot.vue'

  export default {
    computed: {
      ...mapState({
        'step': state => state.navigation.step
      })
    },
    methods: {
      ...mapActions([
        'setHighlight'
      ])
    },
    components: {
      VisOptions,
      StoryDot
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

    & > * {
      width: 100%;
    }

    section {
      flex: 1;
    }

    .footnotes {
      align-self: flex-end;
      padding-left: 1em;
      margin-bottom: $spacing;
    }
  }

  [aria-describedby="footnotes"] {
    counter-increment: footnotes;
    text-decoration: none;
    color: inherit;
    cursor: default;
    outline: none;
  }

  [aria-describedby="footnotes"]::after {
    content: '[' counter(footnotes) ']';
    vertical-align: super;
    font-size: 0.6em;
    margin-left: 2px;
    cursor: default;
  }
</style>

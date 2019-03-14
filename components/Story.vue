<template>
  <section class="page-aside">
    <section class="aside-wrapper">
      <div class="content">
        <transition name="fade" mode="out-in">
          <article v-if="step === 0">
            <header>
              <h1>Where are we coming from?</h1>
            </header>
            <section>
              <p>This module explores how current <span class="info" v-tooltip="'The …'">decarbonization</span> efforts relate to the long-term targets of the <span class="info" v-tooltip="'Holding the increase in the global average temperature to well below 2 °C above pre-industrial levels and pursuing efforts to limit the temperature increase to 1.5 °C above pre-industrial levels'">Paris Agreement</span>. It is based on a <a aria-describedby="footnotes" href="#fn-paper" id="fn-paper-ref">modeling</a> of the effect of detailed countries pledges until 2030, and three scenarios with strengthening of ambition from 2020 onwards.</p>
              <p>Let’s start with the historic global greenhouse gas emissions from 1990 and see how alternative future pathways develop unter the year <a aria-describedby="footnotes" href="#fn-year" id="fn-year-ref">2050</a>…</p>
            </section>
            <footer id="footnotes" class="footnotes">
              <ol>
                <li id="fn-paper">Published in <a href="http://iopscience.iop.org/article/10.1088/1748-9326/aac4f1">Kriegler et al. 2018</a> and described in Figure 1 of that paper.</li>
                <li id="fn-year">The actual modeling is done out to 2100 so to guarantee adherence to the long-term climate targets, but the graphs focus on the next decades for which current actions are decisive. The long-term targets are implemented as bounds of cumulative emissions (carbon budgets) of 1000 Gt CO<sub>2</sub> for 2°C, and 400 Gt CO<sub>2</sub> for 1.5°C, from 2011&ndash;2100 respectively.</li>
              </ol>
            </footer>
          </article>
          <article v-if="step === 1">
            <h1>What is the collective outcome of the NDCs in terms of global emissions in 2030?</h1>
            <p>Currenty, global emissions continue to rise, though at a slower rate than in the years from 2000-2014. With the mitigation efforts pledged by countries in their nationally determined contributions (<span class="ndc" @mouseover="setHighlight('NDC')" @mouseleave="setHighlight(false)">NDCs</span>), global emissions would reach a <strong>plateau</strong> <StoryDot /> from 2020-2030, so that 2030 emissions are only slightly higher than todays. This plateau is the result of emissions decreasing in some countries and still growing emissions especially in fast-growing countries, so that emission trends beyond 2030 are uncertain.</p>
          </article>
          <article v-if="step === 2">
            <h1>What would immediate action look like in contrast?</h1>
            <p>Under the assumption that some strengthening of <span class="eff" @mouseover="setHighlight('eff')" @mouseleave="setHighlight(false)">policies</span> is achieved already in <StoryDot /> <strong>2020</strong> and that globally coordinated carbon pricing is in place in 2025, strong reductions of emissions already until 2030 would result. This would mean that the rate of warming is reduced early on, reducing climate impacts, and would furthermore mean an early push for mitigation technologies.</p>
          </article>
          <article v-if="step === 3">
            <h1>What strengthening of action after 2030 would be required to reach the 1.5°C and 2°C goals after targeting the NDCs by 2030?</h1>
            <p>If coordinated policies only start after following the NDC trajectory until 2030, very abrupt emission reductions would be required between 2030 and 2050, and more carbon dioxide removal (CDR) would be needed in the second half of the century. Abrupt emission reductiosn would require the pre-mature retirement of carbon-intensive infrastructure, especially coal-fired power plants. CDR options include afforestation or the combination of bio-energy with carbon capture and storage. The need for those increases, as the additional emissions before the point of crossing of the two trajectories [dies könnte ja mit einem highlight in der grafik verbunden werden, über hover over...] have to be compensated by lower emissions (or even more negative emissions) after this point of crossing.</p>
          </article>
          <article v-if="step === 4">
            <h1>To what extent would mitigation challenges be reduced by strengthening action/NDCs before 2030?</h1>
            <p>The policy assumption in the "immediate" scenarios are very optimistic, as it currently seems unlikely that globally coordinated carbon pricing is in place in 2025. Therefore, the two additional scenario <span class="gp" @mouseover="setHighlight('goodpractice')" @mouseleave="setHighlight(false)">"GoodPractice"</span> and <span class="nz" @mouseover="setHighlight('netzero')" @mouseleave="setHighlight(false)">NetZero"</span> show how country-specific strengthening of policies can lead to early emission reductions and thus come closer to the cost-optimal "immediate" scenario. In both scenarios, there are specific policies in place in all energy supply and demand sectors, such as efficiency standards, renewable quotas or target shares for electric vehicles (see table 2 in <a href="http://iopscience.iop.org/article/10.1088/1748-9326/aac4f1">Kriegler et al. 2018</a>).</p>
            <p><span class="gp" @mouseover="setHighlight('goodpractice')" @mouseleave="setHighlight(false)">"GoodPractice"</span> values are based on an analysis of policy successes as already observed in some legislation, extended to all countries with some regional differentiation to account for differentiated capabilities.</p>
            <p>In <span class="nz" @mouseover="setHighlight('netzero')" @mouseleave="setHighlight(false)">NetZero"</span>, the ambition of these policies is further increased, in view of the requirements to achive net-zero emissions in all sectors in the second half of the century.</p>
          </article>
          <article v-if="step === 5">
            <h1>Geführtes Explore</h1>
            <VisOptions />
            <a class="btn" href="https://data.ene.iiasa.ac.at/iamc-1.5c-explorer//#/workspaces/share/1a6e44c8-0963-4f28-a871-2b81bfb11def">See this data in the IIASA Database Workspace: PEP Emissions by major economies ↗</a>
            <a class="btn">Download static graphics from this module</a>
          </article>
        </transition>
      </div>
    </section>
  </section>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import VisOptions from '~/components/VisOptions.vue'
  import StoryDot from '~/components/StoryDot.vue'

  export default {
    computed: {
      ...mapState({
        'step': state => state.navigation.step
      }),
      ...mapState([
        'steps'
      ])
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

  .fade-enter-active, .fade-leave-active {
    transition: opacity .15s ease;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .aside-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    .content {
      height: 100%;
    }
  }

  article {
    counter-reset: footnotes;
    display: flex;
    flex-direction: column;
    height: 100%;

    section {
      flex: 1;
    }

    footer {
      align-self: flex-end;
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

  .footnotes {
    margin-left: 1em;
  }

</style>

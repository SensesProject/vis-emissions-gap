<template>
  <section class="page-aside">
    <section class="aside-wrapper">
      <div class="content">
        <transition name="fade" mode="out-in">
          <h1 :key="step" :class="{ intro: step === 0 }">{{ steps[step].title }}</h1>
        </transition>
        <transition name="fade" mode="out-in">
          <p v-if="step === 0">This interactive visualization explores the question of how current aggregate decarbonization efforts relate to the long-term targets of the <span class="info"v-tooltip="'Holding the increase in the global average temperature to well below 2 °C above pre-industrial levels and pursuing efforts to limit the temperature increase to 1.5 °C above pre-industrial levels'">Paris Agreement</span>. It is based on a modeling of the effect of detailed countries pledges until 2030, and three scenarios with strengthening of ambition from 2020 onwards, as published in the publication <a href="http://iopscience.iop.org/article/10.1088/1748-9326/aac4f1">Kriegler et al. 2018</a>. The visualization represents an interactive and more detailed version of Figure 1 of that paper.<br /><br />The graphs show alternative future pathways for global greenhouse gas / CO<sub>2</sub> emissions until the year 2050. The actual modeling is done out to 2100 so to guarantee adherence to the long-term climate targets, but the graphs focus on the next decades for which current actions are decisive. The long-term targets are implemented as bounds of cumulative emissions (carbon budgets) of 1000 Gt CO<sub>2</sub> for 2°C, and 400 Gt CO<sub>2</sub> for 1.5°C, from 2011&ndash;2100 respectively.</p>
          <p v-if="step === 1">Currenty, global emissions continue to rise, though at a slower rate than in the years from 2000-2014. With the mitigation efforts pledged by countries in their nationally determined contributions (<span class="ndc">NDCs</span>), global emissions would reach a plateau from 2020-2030, so that 2030 emissions are only slightly higher than todays. This plateau is the result of emissions decreasing in some countries and still growing emissions especially in fast-growing countries, so that emission trends beyond 2030 are uncertain.</p>
          <p v-if="step === 2">Under the assumption that some strengthening of policies is achieved already in 2020 and that globally coordinated carbon pricing is in place in 2025, strong reductions of emissions already until 2030 would result. This would mean that the rate of warming is reduced early on, reducing climate impacts, and would furthermore mean an early push for mitigation technologies.</p>
          <p v-if="step === 3">If coordinated policies only start after following the NDC trajectory until 2030, very abrupt emission reductions would be required between 2030 and 2050, and more carbon dioxide removal (CDR) would be needed in the second half of the century. Abrupt emission reductiosn would require the pre-mature retirement of carbon-intensive infrastructure, especially coal-fired power plants. CDR options include afforestation or the combination of bio-energy with carbon capture and storage. The need for those increases, as the additional emissions before the point of crossing of the two trajectories [dies könnte ja mit einem highlight in der grafik verbunden werden, über hover over...] have to be compensated by lower emissions (or even more negative emissions) after this point of crossing.</p>
          <p v-if="step === 4">The policy assumption in the "immediate" scenarios are very optimistic, as it currently seems unlikely that globally coordinated carbon pricing is in place in 2025. Therefore, the two additional scenario "GoodPractice" and "NetZero" show how country-specific strengthening of policies can lead to early emission reductions and thus come closer to the cost-optimal "immediate" scenario. In both scenarios, there are specific policies in place in all energy supply and demand sectors, such as efficiency standards, renewable quotas or target shares for electric vehicles (see table 2 in Kriegler et al) [oder noch besser, hier die Tabelle als pop-up window innerhalb der Seite einfügen]. "GoodPractice" values are based on an analysis of policy successes as already observed in some legislation, extended to all countries with some regional differentiation to account for differentiated capabilities. In "NetZero", the ambition of these policies is further increased, in view of the requirements to achive net-zero emissions in all sectors in the second half of the century.</p>
        </transition>
      </div>
      <footer>
        <ul class="progress">
          <li
            v-for="(s, i) in steps"
            :key="i"
            @click="setStep(i)"
            :class="{ 'isPast': step > i, 'isActive': step === i, 'clickable': true }">{{ i }}</li>
        </ul>
        <ul class="nav">
          <li @click="previousStep">Backwards</li>
          <li @click="nextStep">Continue</li>
        </ul>
      </footer>
    </section>
  </section>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapState([
        'step',
        'steps'
      ])
    },
    methods: {
      ...mapActions([
        'nextStep',
        'previousStep',
        'setStep'
      ])
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
    background-color: palette(grey, 100);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    // padding: $spacing;
    box-shadow: 0 1px 30px 0 rgba(0, 0, 0, 0.03);
    border: 1px solid palette(grey, 80);
  }

  .page-aside {
    height: auto;
    margin: $spacing;
  }

  .content {
    padding: $spacing * 1.8 $spacing * 2;
  }

  .nav {
    display: flex;
    height: 10vh;

    & > * {
      flex: 1;
      @include center();

      cursor: pointer;
      color: palette(grey, 40);
      font-weight: $font-weight-bold;
      text-transform: uppercase;
      letter-spacing: $spacing-widest;
      font-size: $size-big;
      transition: all 0.2s;

      &:last-child {
        color: palette(grey, 100);
        background-color: palette(primary, 83);
      }

      &:hover {
        background-color: palette(primary, 50);
        color: #fff;
      }
    }
  }

  .progress {
    display: flex;
    @include center();
    justify-content: space-between;
    width: 20%;
    margin: $spacing auto;

    & > * {
      background-color: palette(grey, 80);
      border-radius: 50%;
      width: 10px;
      height: 10px;
      text-indent: -9999px;

      &.isPast {
        background-color: palette(grey, 50);
      }

      &.isActive {
        background-color: palette(primary, 50);
      }
    }
  }

</style>

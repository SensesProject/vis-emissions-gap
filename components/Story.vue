<template>
  <section class="page-aside">
    <section class="aside-wrapper">
      <div class="content">
        <transition name="fade" mode="out-in">
          <h1 :key="step" :class="{ intro: step === 0 }">{{ steps[step].title }}</h1>
        </transition>
        <transition name="fade" mode="out-in">
          <div v-if="step === 0">
            <p>This interactive visualization explores the question of how current aggregate decarbonization efforts relate to the long-term targets of the <span class="info"v-tooltip="'Holding the increase in the global average temperature to well below 2 °C above pre-industrial levels and pursuing efforts to limit the temperature increase to 1.5 °C above pre-industrial levels'">Paris Agreement</span>. It is based on a modeling of the effect of detailed countries pledges until 2030, and three scenarios with strengthening of ambition from 2020 onwards, as published in the publication <a href="http://iopscience.iop.org/article/10.1088/1748-9326/aac4f1">Kriegler et al. 2018</a>. The visualization represents an interactive and more detailed version of Figure 1 of that paper.</p>
            <p>The graphs show alternative future pathways for global greenhouse gas / CO<sub>2</sub> emissions until the year 2050. The actual modeling is done out to 2100 so to guarantee adherence to the long-term climate targets, but the graphs focus on the next decades for which current actions are decisive. The long-term targets are implemented as bounds of cumulative emissions (carbon budgets) of 1000 Gt CO<sub>2</sub> for 2°C, and 400 Gt CO<sub>2</sub> for 1.5°C, from 2011&ndash;2100 respectively.</p>
          </div>
          <div v-if="step === 1">
            <p>Currenty, global emissions continue to rise, though at a slower rate than in the years from 2000-2014. With the mitigation efforts pledged by countries in their nationally determined contributions (<span class="ndc" @mouseover="setHighlight('NDC')" @mouseleave="setHighlight(false)">NDCs</span>), global emissions would reach a <strong>plateau</strong> <StoryDot /> from 2020-2030, so that 2030 emissions are only slightly higher than todays. This plateau is the result of emissions decreasing in some countries and still growing emissions especially in fast-growing countries, so that emission trends beyond 2030 are uncertain.</p>
          </div>
          <div v-if="step === 2">
            <p>Under the assumption that some strengthening of <span class="eff" @mouseover="setHighlight('eff')" @mouseleave="setHighlight(false)">policies</span> is achieved already in <StoryDot /> <strong>2020</strong> and that globally coordinated carbon pricing is in place in 2025, strong reductions of emissions already until 2030 would result. This would mean that the rate of warming is reduced early on, reducing climate impacts, and would furthermore mean an early push for mitigation technologies.</p>
          </div>
          <div v-if="step === 3">
            <p>If coordinated policies only start after following the NDC trajectory until 2030, very abrupt emission reductions would be required between 2030 and 2050, and more carbon dioxide removal (CDR) would be needed in the second half of the century. Abrupt emission reductiosn would require the pre-mature retirement of carbon-intensive infrastructure, especially coal-fired power plants. CDR options include afforestation or the combination of bio-energy with carbon capture and storage. The need for those increases, as the additional emissions before the point of crossing of the two trajectories [dies könnte ja mit einem highlight in der grafik verbunden werden, über hover over...] have to be compensated by lower emissions (or even more negative emissions) after this point of crossing.</p>
          </div>
          <div v-if="step === 4">
            <p>The policy assumption in the "immediate" scenarios are very optimistic, as it currently seems unlikely that globally coordinated carbon pricing is in place in 2025. Therefore, the two additional scenario <span class="gp" @mouseover="setHighlight('goodpractice')" @mouseleave="setHighlight(false)">"GoodPractice"</span> and <span class="nz" @mouseover="setHighlight('netzero')" @mouseleave="setHighlight(false)">NetZero"</span> show how country-specific strengthening of policies can lead to early emission reductions and thus come closer to the cost-optimal "immediate" scenario. In both scenarios, there are specific policies in place in all energy supply and demand sectors, such as efficiency standards, renewable quotas or target shares for electric vehicles (see table 2 in <a href="http://iopscience.iop.org/article/10.1088/1748-9326/aac4f1">Kriegler et al. 2018</a>).</p>
            <p><span class="gp" @mouseover="setHighlight('goodpractice')" @mouseleave="setHighlight(false)">"GoodPractice"</span> values are based on an analysis of policy successes as already observed in some legislation, extended to all countries with some regional differentiation to account for differentiated capabilities.</p>
            <p>In <span class="nz" @mouseover="setHighlight('netzero')" @mouseleave="setHighlight(false)">NetZero"</span>, the ambition of these policies is further increased, in view of the requirements to achive net-zero emissions in all sectors in the second half of the century.</p>
          </div>
          <div v-if="step === 5"><VisOptions :visibility="steps[step].visibility" /></div>
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
          <li @click="previousStep" :class="{ inactive: step === 0 }">Backwards</li>
          <li @click="nextStep" :class="{ inactive: step === steps.length - 1 }">Continue</li>
        </ul>
      </footer>
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
        'nextStep',
        'previousStep',
        'setStep',
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
    margin: $spacing * 0.4;

    @include media-query($on-tablet-landscape) {
      & {
        margin: $spacing * 0.6;
      }
    }

    @include media-query($on-laptop) {
      & {
        margin: $spacing * 0.8;
      }
    }

    @include media-query($on-desktop) {
      & {
        margin: $spacing * 1.0;
      }
    }
  }

  .content {
    padding: $spacing * 0.7 $spacing * 0.9;

    @include media-query($on-tablet-landscape) {
      & {
        padding: $spacing * 1 $spacing * 1.3;
      }
    }

    @include media-query($on-laptop) {
      & {
        padding: $spacing * 1.4 $spacing * 1.7;
      }
    }

    @include media-query($on-desktop) {
      & {
        padding: $spacing * 1.8 $spacing * 2;
      }
    }
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

      &.inactive {
        pointer-events: none;
        color: palette(grey, 70);

        &:last-child {
          background-color: palette(grey, 90);
          color: palette(grey, 70);
        }
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

      &:hover {
        background-color: palette(grey, 70);
      }

      &.isActive {
        background-color: palette(primary, 50);
      }
    }
  }

</style>

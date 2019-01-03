<template>
  <div :class="{ 'vis-options': true, 'isVisible': visibility.indexOf('options') >= 0 }">
    <ul>
      <li :class="{ isActive: scenario === '2full' }" @click="setData({ scenario: '2full' })">2° full</li>
      <li :class="{ isActive: scenario === '2red' }" @click="setData({ scenario: '2red' })">2° red</li>
      <li :class="{ isActive: scenario === '1.5full' }" @click="setData({ scenario: '1.5full' })">1.5° full</li>
      <li :class="{ isActive: measure === 'GHG' }" @click="setData({ measure: 'GHG' })">GHG</li>
      <li :class="{ isActive: measure === 'CO2' }" @click="setData({ measure: 'CO2' })">CO2</li>
    </ul>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import get from 'lodash/get'

  export default {
    props: ['visibility'],
    computed: {
      ...mapState([
        'dataset',
        'data'
      ]),
      scenario: function () {
        return get(this.data, 'scenario', '2full')
      },
      measure: function () {
        return get(this.data, 'measure', 'GHG')
      }
    },
    methods: {
      ...mapActions([
        'toggleDataset',
        'setData'
      ])
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  .vis-options {
    line-height: 1.2;
    text-align: center;
    opacity: 0;
    transition-duration: 0.3s;

    &.isVisible {
      opacity: 1;
    }

    ul {
      li {
        background-color: transparent;
        padding-bottom: 2px;
        margin: 0 $spacing / 4;
        display: inline-block;
        cursor: pointer;
        color: palette(grey, 40);
        font-weight: $font-weight-bold;
        font-size: $size-default;

        &:first-child {
          margin-left: 0;
        }

        &:last-child {
          margin-right: 0;
        }

        &:hover, &:focus {
          color: palette(grey, 30);
        }

        &.isActive {
          color: palette(grey, 20);
          cursor: default;
          border-bottom: 2px solid #03A6DC;
        }
      }
    }
  }
</style>

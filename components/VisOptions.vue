<template>
  <div :class="{ 'vis-options': true, 'isVisible': visibility.indexOf('options') >= 0 }">
    <ul @click="toggleDataset">
      <li :class="{ isActive: dataset === 0 }">2 C°</li>
      <li :class="{ isActive: dataset === 1 }">1.5 C°</li>
    </ul>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    props: ['visibility'],
    computed: {
      ...mapState([
        'dataset'
      ])
    },
    methods: {
      ...mapActions([
        'toggleDataset'
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

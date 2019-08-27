<template>
  <g class="test">
    <text
      v-for="label in labels"
      @mouseover="setHighlight(label.policy)"
      @mouseleave="setHighlight(false)"
      v-if="label"
      :x="label.x"
      :y="label.y">
      {{ label.label }}
    </text>
  </g>
</template>

<script>
  import { mapActions } from 'vuex'
  import { timeParse } from 'd3-time-format'
  import { last, map, filter } from 'lodash'

  export default {
    props: ['els', 'scaleX', 'scaleY', 'legend'],
    computed: {
      labels: function () {
        return map(this.els, el => {
          // console.log(el)
          const values = filter(el.values, value => {
            return value[0] <= this.end
          })
          // console.log(values)
          if (values.length && this.legend.indexOf(el.policy) >= 0) {
            const lastValues = last(values)
            return {
              label: el.label,
              policy: el.policy,
              x: this.scaleX(timeParse('%Y')(lastValues[0])) + 5,
              y: this.scaleY(lastValues[1]) + 4
            }
          } else {
            // console.log('empty')
            return {}
          }
        })
      }
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

</style>

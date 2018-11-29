<template>
  <g v-if="axisX && axisY">
    <VisAxisX :margin="margin" :height="height" :width="width" :axisX="axisX" />
    <VisAxisY :margin="margin" :height="height" :axisY="axisY" />
  </g>
</template>

<script>
  import { mapState } from 'vuex'
  import VisAxisY from '~/components/VisAxisY.vue'
  import VisAxisX from '~/components/VisAxisX.vue'
  import mean from 'lodash/mean'
  import map from 'lodash/map'
  import { timeFormat } from 'd3-time-format'

  export default {
    props: ['el', 'scaleX', 'scaleY', 'margin', 'height', 'width', 'axisX', 'axisY'],
    computed: {
      ...mapState([
        'axis'
      ])
    },
    data: function () {
      return {
        axisX: false,
        axisY: false
      }
    },
    methods: {
      drawAxisY: function () {
        const { scaleY, axis, drawTicksY } = this
        const { label } = axis.y
        const y = scaleY(mean(scaleY.domain()))
        return {
          label,
          x: 20,
          y,
          ticks: drawTicksY()
        }
      },
      drawTicksY: function () {
        const { scaleY } = this
        return map(scaleY.ticks(), (tick, i) => {
          return {
            key: i,
            label: tick,
            y: scaleY(tick),
            x: this.margin[0] / 2
          }
        })
      },
      drawAxisX: function () {
        const { scaleX, axis, drawTicksX, height } = this
        const { label } = axis.x
        const x = scaleX(mean(scaleX.domain()))
        return {
          label,
          x,
          y: height - 20,
          ticks: drawTicksX()
        }
      },
      drawTicksX: function () {
        const { scaleX } = this
        return map(scaleX.ticks(), (tick, i) => {
          return {
            key: i,
            label: timeFormat('%Y')(tick),
            y: this.height - this.margin[1] / 2,
            x: scaleX(tick)
          }
        })
      },
      render: function () {
        const { drawAxisX, drawAxisY } = this
        this.axisX = drawAxisX()
        this.axisY = drawAxisY()
      }
    },
    mounted () {
      this.render()
    },
    components: {
      VisAxisY,
      VisAxisX
    }
  }
</script>

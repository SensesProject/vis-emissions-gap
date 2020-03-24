<template>
  <g v-if="dataNDC && dataEFF">
    <path
      class="bracket"
      :d="bracket"
    />
    <text
      class="label"
      :x="middle[0] + d"
      :y="middle[1] + 4"
    >
      {{ el.label }}
    </text>
  </g>
</template>

<script>
import { mapGetters } from 'vuex'
import { timeParse } from 'd3-time-format'
import { find, get, mean } from 'lodash'

export default {
  props: ['el', 'scaleX', 'scaleY', 'data'],
  data () {
    return {
      width: 8,
      d: 5
    }
  },
  computed: {
    ...mapGetters([
      'currentPaths'
    ]),
    year2035 () {
      return this.scaleX(new Date(2035, 0, 1))
    },
    dataNDC () {
      return find(get(find(this.currentPaths, { policy: 'NDC' }), 'values', []), [0, 2030])
    },
    dataEFF () {
      return find(get(find(this.currentPaths, { policy: 'eff' }), 'values', []), [0, 2030])
    },
    ndc () {
      const [x, y] = this.dataNDC
      return [this.scaleX(timeParse('%Y')(x)) + this.d, this.scaleY(y)]
    },
    eff () {
      const [x, y] = this.dataEFF
      return [this.scaleX(timeParse('%Y')(x)) + this.d, this.scaleY(y)]
    },
    andc () {
      const [x, y] = this.ndc
      return [x + this.width, y + this.width]
    },
    aeff () {
      const [x, y] = this.eff
      return [x + this.width, y - this.width]
    },
    middle () {
      const x = mean([this.ndc[0], this.eff[0]])
      const y = mean([this.ndc[1], this.eff[1]])
      return [x + this.width * 2, y]
    },
    mndc () {
      const [x, y] = this.middle
      return [x - this.width, y - this.width]
    },
    meff () {
      const [x, y] = this.middle
      return [x - this.width, y + this.width]
    },
    bracket () {
      const { width } = this
      const w = width / 2
      const [xndc, yndc] = this.ndc
      const [xandc, yandc] = this.andc
      const [xmndc, ymndc] = this.mndc
      const [xmiddle, ymiddle] = this.middle
      const [xmeff, ymeff] = this.meff
      const [xaeff, yaeff] = this.aeff
      const [xeff, yeff] = this.eff
      return `M ${xndc} ${yndc} C ${xndc + w} ${yndc} ${xandc} ${yandc - w} ${xandc} ${yandc} L ${xmndc} ${ymndc} C ${xmndc} ${ymndc + w} ${xmiddle - w} ${ymiddle} ${xmiddle} ${ymiddle} C ${xmiddle - w} ${ymiddle} ${xmeff} ${ymeff - w} ${xmeff} ${ymeff} L ${xaeff} ${yaeff} C ${xaeff} ${yaeff + w} ${xeff + w} ${yeff} ${xeff} ${yeff}`
    },
    pulse () {
      return [this.scaleX(new Date(2035, 0, 1)) + this.d, mean([this.middle[1], this.ndc[1]]) + this.d * 2]
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

</style>

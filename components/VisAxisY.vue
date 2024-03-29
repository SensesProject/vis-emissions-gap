<template>
  <g>
    <line
      class="axis"
      :x1="axis.x"
      :x2="axis.x"
      :y1="margin.top"
      :y2="height - margin.bottom"
    />
    <transition-group name="fade" tag="g">
      <g
        v-for="tick in axis.ticks"
        :key="tick.key"
      >
        <text
          :y="tick.y + 'px'"
          :x="d * 5.5 + 'px'"
          text-anchor="end"
          dominant-baseline="middle"
          class="tick"
        >
          {{ tick.label }}
        </text>
        <line
          :x1="margin.left + 'px'"
          :y1="tick.y + 'px'"
          :x2="d * 6 + 'px'"
          :y2="tick.y + 'px'"
          class="tick"
        />
      </g>
    </transition-group>
    <g>
      <rect
        class="background"
        :x="scaleX.range()[0] - 1"
        :width="2"
        :height="boxHeight + boxMargin"
        :y="boxY - boxOffset"
      />
      <text
        v-for="group in ['label label--background', 'axis']"
        :key="group"
        ref="text"
        :class="`${group} axis--reading outline`"
        :y="label.today[1] + 'px'"
        text-anchor="start"
      >
        <tspan
          v-for="(text, i) in label.texts"
          :key="text"
          :ref="i === 0 ? 'value' : 'texts'"
          :dominant-baseline="i === 0 ? 'middle' : 'baseline'"
          :x="0 + 'px'"
          :dy="i === 0 ? '' : '1.5em'"
        >
          {{ text }}
        </tspan>
      </text>
      <line
        class="swoop"
        :x1="boxWidth + 5"
        :x2="label.today[0]"
        :y1="label.today[1]"
        :y2="label.today[1]"
      />
    </g>
  </g>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { map, mean, last, find, get, inRange } from 'lodash'
import { format } from 'd3-format'

const f = format(',.2r')

const replacements = {
  'CO2|Energy and Industrial Processes': 'fossil fuels and industry',
  'CO2|AFOLU': 'Agriculture, Forestry and Other Land Use'
}

export default {
  props: ['margin', 'height', 'scaleY', 'scaleX'],
  data () {
    return {
      boxY: 0,
      boxWidth: 0,
      boxHeight: 0,
      boxMaxWidth: 0,
      boxOffset: 5,
      boxMargin: 20
    }
  },
  computed: {
    ...mapState({
      variable: state => state.scenario.scenario.variable,
      region: state => state.scenario.scenario.region,
      step: state => state.navigation.step
    }),
    ...mapGetters([
      'currentPaths'
    ]),
    ...mapState([
      'steps'
    ]),
    d () {
      return this.margin.left / 7
    },
    axis () {
      const { scaleY, scaleX, d } = this
      const label = `Gt CO2/yr (${this.region})` // variable === 'CO2' ? 'Gt CO2/yr' : 'Gt CO2eq/yr'
      const y = scaleY(mean(scaleY.domain()))
      const x = scaleX(scaleX.domain()[0])
      return {
        label,
        x,
        y,
        ticks: map(scaleY.ticks(6), (tick, i) => {
          const y = scaleY(tick)
          const threshold = 10
          const isVisible = !inRange(y, this.boxY - this.boxOffset - threshold, this.boxY + this.boxHeight + this.boxMargin + threshold)
          return {
            key: i,
            label: f(tick / 1000),
            y,
            isVisible,
            x: d
          }
        }).filter(d => d.isVisible)
      }
    },
    yLabel () {
      return get(this.steps, `${this.step}.yLabel`, 'historic')
    },
    label () {
      const today = last(get(find(this.currentPaths, (path) => {
        if (this.yLabel === 'historic') {
          return path.scenario === 'historic' || path.scenario === 'historic-landuse' || path.scenario === 'historic-landuse-addition'
        } else {
          return path.scenario === this.yLabel
        }
      }), 'values', []))
      const x = this.scaleX(this.scaleX.domain()[0])
      const texts = [
          `${format('.2')(today[1] / 1000)} Gt`,
          `${this.region === 'World' ? 'Global' : this.region} CO₂ emissions (Gt CO₂/yr) `,
          `from ${get(replacements, this.variable, this.variable)}`,
          this.yLabel === 'historic-landuse' ? 'and additionally from land-use' : false
      ].filter(d => d)

      return {
        today: [this.scaleX(new Date(today[0], 0, 1)), this.scaleY(today[1])],
        x,
        texts
      }
    }
  },
  mounted () {
    this.calcSizes()
    window.addEventListener('resize', this.calcSizes, false)
  },
  updated () {
    this.calcSizes()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.calcSizes, false)
  },
  methods: {
    calcSizes () {
      const { texts, text, value } = this.$refs
      this.boxWidth = value[0].getComputedTextLength() || 0
      this.boxMaxWidth = Math.max(...map(texts, (text) => {
        return text.getComputedTextLength()
      }))
      this.boxHeight = text[0].getBBox().height || 0
      this.boxY = text[0].getBBox().y || 0
    }
  }
}
</script>

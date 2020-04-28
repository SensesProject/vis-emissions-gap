<template>
  <div :class="{ 'vis-footer-wrapper': true, 'vis-footer-wrapper--visible': goal >= 2030 }">
    <header class="vis-footer-header">
      <ul class="tabs tabs-disruptions">
        <li
          v-for="tab in tabs"
          :class="{
            'tab': true,
            'tab--active': variable === tab[0],
            'tab--disabled': !tab[3]
          }"
          @click="setScenario({ aside: tab[0] })"
        >
          <img :src="require(`~/assets/img/${tab[2]}.png`)">
          {{ tab[1] }}
        </li>
      </ul>
    </header>
    <div class="vis-aside-wrapper">
      <svg ref="vis" class="vis-aside">
        <g v-if="goal >= 2030">
          <line
            :x1="axis.x1"
            :x2="axis.x2"
            :y1="axis.y"
            :y2="axis.y"
            class="axis"
          />
          <line
            :x1="axis.x1"
            :x2="axis.x1"
            :y1="axis.y"
            :y2="height - margin.bottom"
            class="tick"
          />
          <text
            v-for="(title, i) in titles"
            :x="axis.labelX"
            :y="0"
            :dy="`${i * 1.2 + (i === titles.length - 1 ? 2.2 : 1.2)}em`"
            :class="i === titles.length - 1 ? 'axis small' : 'axis'"
            text-anchor="middle"
          >{{ title }}</text>
          <transition-group name="fade" tag="g">
            <g v-for="tick in axis.ticks" :key="tick.label">
              <line
                :x1="tick.x"
                :x2="tick.x"
                :y1="tick.y1"
                :y2="tick.y2"
                class="tick"
              />
              <text
                :x="tick.x"
                :y="tick.y3"
                class="tick"
                text-anchor="middle"
              >
                {{ tick.label }}
              </text>
            </g>
          </transition-group>
        </g>
        <transition-group name="fade" tag="g">
          <g
            v-for="group in elements"
            v-if="isReady"
            :key="group.key"
            :class="group.klass"
            @mouseover="setHighlight(group.policy)"
            @mouseleave="setHighlight(false)"
          >
            <text
              text-anchor="start"
              :x="group.x + 5"
              :y="group.labelY"
            >{{ group.label }}</text>
            <g v-for="bar in group.bars">
              <rect
                v-if="goal >= bar.year"
                v-tooltip="{ content: `${bar.policyLabel}: ${bar.valueLabel}`, offset: 5 }"
                :class="`bar-${bar.year}`"
                :width="bar.width"
                :height="group.singleBarHeight"
                :y="bar.y"
                :x="group.x"
              />
              <g v-if="bar.label && goal >= bar.year">
                <line
                  :x1="bar.label.x"
                  :x2="bar.label.x"
                  :y1="bar.label.y1"
                  :y2="bar.label.y2"
                  class="label"
                />
                <text
                  :text-anchor="bar.label.anchor"
                  class="label"
                  :x="bar.label.xLabel"
                  :y="bar.label.y"
                >{{ bar.label.label }}</text>
              </g>
            </g>
          </g>
        </transition-group>
      </svg>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { map, find, flatten, get, mean, compact, isUndefined, times, slice, some } from 'lodash'
import { scaleLinear, scaleBand } from 'd3-scale'
import { extent } from 'd3-array'
import { format } from 'd3-format'

const titles = {
  temperature: ['Increase in global mean temparature', '(rel. to 2015, in °C, global)'],
  investment: ['Average yearly low-carbon', 'power sector investments', '(billion US$, rel. to 2015: 474bn US$)'],
  landuse: ['Area for bioenergy and afforestation', '(2050, million ha, global)'],
  strandedAssests: ['Maximum idle coal capacity', '(GW, global)']
}

const barLabels = {
  temperature: ['2030', '2050'],
  investment: ['2020–2030', '2030–2050'],
  landuse: false,
  strandedAssests: false
}

const tabs = [
  ['investment', 'Investment', 'icon-investment'],
  ['strandedAssests', 'Stranded Assests', 'icon-assets'],
  ['temperature', 'Temperature', 'icon-temperature'],
  ['landuse', 'Land Use', 'icon-landuse']
]

const policies = {
  NDC: 'NDC',
  netzero: 'Strengthened action',
  eff: 'Cost-effective pricing'
}

const f = format('.0f')
const f2 = format('.2f')

export default {
  data () {
    return {
      width: 0,
      height: 0,
      margin: {
        left: 20,
        right: 20,
        top: 120,
        bottom: 0
      },
      labelSizes: []
    }
  },
  computed: {
    ...mapState({
      data: state => state.aside.data.data,
      scenario: state => state.scenario.scenario,
      step: state => state.navigation.step,
      highlight: state => state.highlight.highlight,
      // Defines which data is shown; e.g. temperature, investments, …
      variable: state => state.scenario.scenario.aside
    }),
    ...mapState([
      'steps',
      'legend'
    ]),
    policies () {
      // Get a list of policies to be displayed
      return map(this.legend, 'attribute').filter((value) => {
        return value !== 'historic' && value !== 'historic-landuse' && value !== 'historic-landuse-addition'
      })
    },
    visibility () {
      // Defines which bar is shown
      return get(this.steps, `${this.step}.clips`, [])
    },
    titles () {
      return get(titles, this.variable, this.variable)
    },
    barLabels () {
      return get(barLabels, this.variable, this.variable)
    },
    goal () {
      // Defines which year is shown. This decides which bar is shown
      return get(this.steps, `${this.step}.goal`, [])
    },
    scaleYPolicy () {
      // Defines the general vertical position. Each attribute has it’s own row
      return scaleBand()
        .paddingInner(0.4)
        .paddingOuter(0.3)
        .rangeRound([this.margin.top, this.height - this.margin.bottom])
        .domain(this.policies)
    },
    scaleYBar () {
      // Within each row, each policy might have one or two bars for different periods/goals
      // Default is two bars: [0, 1]
      return scaleBand()
        .paddingInner(0.2)
        .paddingOuter(0.1)
        .rangeRound([0, this.scaleYPolicy.bandwidth()])
        .domain([0, 1])
    },
    bars () {
      // Create an array of displayed graphs
      const { policies, scenario, data, variable } = this
      const { degree, part } = scenario
      return compact(map(policies, (policy) => {
        // Based on the policy, degree, part, region and variable a fitting data set is selected
        const datum = find(data, { policy, degree, part, region: 'World', variable })
        if (isUndefined(datum)) {
          return false
        } else {
          return datum
        }
      }))
    },
    extentValues () {
      // Used to calculate the domain in the x-direction
      return extent(flatten(map(this.bars, (policy) => {
        const values = get(policy, 'values', [[0, 0]])
        return map(values, (value) => {
          return get(value, '1', 0)
        })
      })))
    },
    scaleX () {
      // Scale for the x-axis
      return scaleLinear()
        .range([this.margin.left, this.width - this.margin.right])
        .domain([0, this.extentValues[1]]).nice(3)
    },
    isReady () {
      // Check if graph is ready to be displayed
      return this.scaleX.domain()[1] && this.width && this.height
    },
    elements () {
      // Custom labels might be present for this variable
      const labelsX = this.barLabels
      const hasLabel = !!labelsX

      // Label line length
      const d1 = 10
      const d2 = 2

      // Starting x positions on the left hand side
      const x = this.scaleX(0)

      // These are the bar groups which consist of one or two bars
      // Setting up the properties of each group
      return map(this.bars, (item, i) => {
        // Get the current policy for the y position
        const policy = get(item, 'policy', '')
        const policyLabel = get(policies, policy, policy)
        const yPolicy = this.scaleYPolicy(policy)
        // Get the current values. The default is one bar with the value 0
        const values = get(item, 'values', [0])
        // Redefines the domain of the inner-group-y-scale according to the number of values for this policy
        this.scaleYBar.domain(times(values.length, Number))
        // Calculate the properties for each bar
        const singleBarHeight = Math.min(this.scaleYBar.bandwidth(), 25)
        const bars = map(values, (datum, n) => {
          const isTop = n === 0
          const [year, value] = datum
          const valueLabel = f2(value)
          const labelText = get(labelsX, n, f(value))
          const width = this.scaleX(value) - x
          const y = yPolicy + this.scaleYBar(n)
          const centerX = x + (hasLabel ? width / 2 : width)
          const labelY = y + (isTop ? 0 : singleBarHeight)
          // Maybe use this additionally:
          // const [anchor, translate1] = placeLabel(x1, [leftBorder, rightBorder], bar2030Width)
          const label = (hasLabel && i === 0) || !hasLabel ? {
            x: centerX + (hasLabel ? 0 : -10),
            xLabel: centerX,
            y: labelY + (isTop ? -14 : 22),
            label: `${hasLabel ? '' : policyLabel + ': '}${labelText}`,
            y1: labelY + (isTop ? -d1 : d1),
            y2: labelY + (isTop ? -d2 : d2),
            anchor: hasLabel ? 'middle' : 'end'
          } : false
          return {
            year,
            width,
            y,
            value,
            policy,
            label,
            policyLabel,
            valueLabel
          }
        })
        const labelY = yPolicy - 10
        const klass = [
          'bar',
          policy
        ]

        if (get(this.visibility, policy, false) !== 'start') {
          klass.push('isVisible')
        }
        if (this.highlight) {
          klass.push(this.highlight === policy ? 'isHighlight' : 'hasHighlight')
        }

        return {
          singleBarHeight,
          x,
          bars,
          klass: klass.join(' '),
          policy,
          key: get(item, 'policy', '') + i,
          labelY,
          label: get(item, 'label', '')
        }
      })
    },
    axis () {
      const [x1, x2] = this.scaleX.range()
      const y = this.margin.top
      const labelX = mean(this.scaleX.range())
      const ticks = map(this.scaleX.ticks(3), (tick) => {
        return {
          x: this.scaleX(tick),
          y1: y,
          y2: y - 10,
          y3: y - 20,
          label: tick
        }
      })
      return {
        y,
        x1,
        x2,
        ticks,
        labelX
      }
    },
    tabs () {
      // Check if aside option has been present in any of the previous steps
      const previousSteps = slice(this.steps, 0, this.step + 1)
      return map(tabs, (tab) => {
        return [...tab, some(previousSteps, (step) => {
          return get(step, ['data', 'aside']) === tab[0]
        })]
      })
    }
  },
  mounted () {
    this.calcSizes()
    window.addEventListener('resize', this.calcSizes, false)
    this.labelSizes = map(get(this, '$refs.labels', []), (label) => {
      const { width } = label.getBBox()
      return width
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.calcSizes, false)
  },
  methods: {
    calcSizes () {
      const { vis: el } = this.$refs
      const width = el.clientWidth || el.parentNode.clientWidth
      const height = el.clientHeight || el.parentNode.clientHeight
      this.width = width
      this.height = height
    },
    ...mapActions([
      'setHighlight',
      'setScenario'
    ])
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  .vis-footer-wrapper {
    background-color: rgba(0, 0, 0, 0.04);
    opacity: 0;
    visibility: hidden;
    animation: 1s all;

    &.vis-footer-wrapper--visible {
      opacity: 1;
      visibility: visible;
    }
  }

  .vis-aside-wrapper {
    height: auto;
    margin-bottom: $spacing / 2;
  }

  .vis-aside {
    width: 100%;
    height: 100%;
    color: getColor(gray, 30);
    font-weight: $font-weight-bold;
    font-size: $size-default;

    g.bar {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;

      &.isVisible {
        visibility: visible;
        pointer-events: all;
        opacity: 1;

        &.hasHighlight {
          opacity: 0.2;
        }
      }
    }
  }
</style>

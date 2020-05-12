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
        <defs>
          <pattern id="diagonal-stripe-more" patternUnits="userSpaceOnUse" width="4" height="4">
            <path
              d="M-1,1 l2,-2
                M0,4 l4,-4
                M3,5 l2,-2"
              stroke="#fff"
              style="opacity: 0.8"
              stroke-width="1.5"
            />
          </pattern>
        </defs>
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
          <g v-for="reference in references">
            <text
              :x="reference.x"
              :y="reference.labelY"
              text-anchor="middle"
              class="reference">{{ reference.label }}</text>
            <line
              :x1="reference.x"
              :x2="reference.x"
              :y1="reference.y1"
              :y2="reference.y2"
              class="reference"
              stroke-dasharray="1"
            />
          </g>
          <g v-for="area in areas">
            <text
              :x="area.labelX"
              :y="area.labelY"
              text-anchor="middle"
              class="reference">{{ area.label }}</text>
            <path
              :d="area.d"
              class="reference"
            />
          </g>
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
                v-if="goal >= bar.year && bar.widthP95"
                v-tooltip="{ content: bar.tooltip[2], offset: 5 }"
                :class="`bar-${bar.year}`"
                :style="{ opacity: 0.33 }"
                :width="bar.widthP95 - bar.widthP66"
                :height="group.singleBarHeight"
                :y="bar.y"
                :x="group.x + bar.widthP66"
              />
              <rect
                v-if="goal >= bar.year && bar.widthP66"
                v-tooltip="{ content: bar.tooltip[1], offset: 5 }"
                :class="`bar-${bar.year}`"
                :style="{ opacity: 0.66 }"
                :width="bar.widthP66 - bar.width"
                :height="group.singleBarHeight"
                :y="bar.y"
                :x="group.x + bar.width"
              />
              <rect
                v-if="goal >= bar.year"
                v-tooltip="{ content: bar.tooltip[0], offset: 5 }"
                :class="`bar-${bar.year}`"
                :width="bar.width"
                :height="group.singleBarHeight"
                :y="bar.y"
                :x="group.x"
              />
              <rect
                v-if="goal >= bar.year && bar.refX1"
                :class="`bar-ref`"
                :style="{ fill: 'url(#diagonal-stripe-more)' }"
                :width="bar.refX1 - group.x"
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
        <VisPulse
          v-if="variable === 'temperature'"
          :x="margin.left + (width - margin.left - margin.right) / 5 * 4"
          :y="margin.top + (height - margin.top - margin.bottom) / 3"
          label='Due to inherent uncertainties about warming related to a particular emissions pathways, the temperature outcome for 2050 and 2100 can only be described probabilistically. The "median" values show the temperature value that lies in the middle of the distribution. The "95%" percentile values show hoch much higher the temperature outcomes are, that have a very high likelihood of not beeing exceeded. On the other hand, even with a stringend pathway aiming at staying below 2°C with 66% likelihood, there is a 5% probability of 2100 temperature exceeding 2.5°C.'
        />
        <VisPulse
          v-if="variable === 'temperature'"
          key="info"
          :isSmall="true"
          :x="axis.labelX + (titles[titles.length - 1].length / 2 * 6)"
          :y="`${(2 * 1.2 + (2 === titles.length - 1 ? 2.2 : 1.2)) * 12}`"
          label='Total human-induced warming with respect to pre-industrial levels until 2015 was approximately 1.0°C (1.8 °Fahrenheit), according to HadCRUT4.'
        />
        <VisPulse
          v-if="variable === 'strandedAssests'"
          key="info"
          :isSmall="true"
          :x="axis.labelX + (titles[titles.length - 1].length / 2 * 6)"
          :y="`${(2 * 1.2 + (2 === titles.length - 1 ? 2.2 : 1.2)) * 12}`"
          label='To put the capacities risking being stranded into context: The total global coal power fleet currently in operation has a capacity of 2079 GW, according to IEA.'
        />
        <VisPulse
          v-if="variable === 'landuse'"
          key="info"
          :isSmall="true"
          :x="axis.labelX + (titles[titles.length - 1].length / 2 * 6)"
          :y="`${(2 * 1.2 + (2 === titles.length - 1 ? 2.2 : 1.2)) * 12}`"
          label='To put the required areas into context: global cropland area as of 2010 was around 1500 Mio ha, and pasture area an additional 3300 Mio ha, according to FAO.'
        />
      </svg>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { map, find, flatten, get, mean, compact, isUndefined, times, slice, some, filter } from 'lodash'
import { scaleLinear, scaleBand } from 'd3-scale'
import { extent } from 'd3-array'
import { format } from 'd3-format'
import VisPulse from '~/components/VisPulse.vue'

const titles = {
  temperature: ['Increase in global mean temparature', '(rel. to 2015, in °C, global)'],
  investment: ['Average yearly low-carbon', 'power sector investments', '(billion US$, rel. to 2015: 474bn US$)'],
  landuse: ['Area for bioenergy and afforestation', '(2050, million ha, global)'],
  strandedAssests: ['Maximum idle coal capacity', '(GW, global)']
}

const barLabels = {
  temperature: ['2050', '2100'],
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
        if (this.variable === 'temperature') {
          return flatten(map(values, (value) => {
            return [get(value, ['1', 'med'], 0), get(value, ['1', 'p66'], 0), get(value, ['1', 'p95'], 0)]
          }))
        } else {
          return map(values, (value) => {
            return get(value, '1', 0)
          })
        }
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
      const references = {
        investment: 363
      }
      const reference = get(references, this.variable)
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

          // Get the year
          const year = datum[0]

          // Value could be a value or an object for temperature values
          let value = datum[1]
          if (this.variable === 'temperature') {
            value = value.med
          }

          // Format the value
          const valueLabel = f2(value)
          const labelText = get(labelsX, n, f(value))

          const width = this.scaleX(value) - x
          const y = yPolicy + this.scaleYBar(n)
          const centerX = x + (hasLabel ? width / 2 : width)
          const labelY = y + (isTop ? 0 : singleBarHeight)

          // This is used for the temperature
          let widthP66
          let widthP95
          let tooltip
          if (this.variable === 'temperature') {
            widthP66 = this.scaleX(datum[1].p66) - x
            widthP95 = this.scaleX(datum[1].p95) - x

            // Create multiple tooltips for temperature
            tooltip = [
              `${policyLabel} (${year}): ${valueLabel} (Median)`,
              `${policyLabel} (${year}): ${f2(datum[1].p66)} (66% percentile)`,
              `${policyLabel} (${year}): ${f2(datum[1].p95)} (95% percentile)`
            ]
          } else {
            // Create only one tooltip for other variables
            tooltip = [`${policyLabel} (${year}): ${valueLabel}`]
          }

          // Create reference bars
          let refX1
          let refX2
          let refY

          if (!isUndefined(reference)) {
            if (isTop) {
              refX1 = this.scaleX(reference)
            } else {
              // This will cause problems if not only investment has reference values but also temperature
              refX1 = this.scaleX(get(values, [n - 1, 1]))
            }
            refX2 = this.scaleX(value)
            refY = y + singleBarHeight / 2
          }

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
            tooltip,
            year,
            width,
            widthP66,
            widthP95,
            y,
            value,
            policy,
            label,
            policyLabel,
            valueLabel,
            refX1,
            refX2,
            refY
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
    },
    references () {
      const values = [
        ['2019', 1.1, 'temperature'],
        ['2019', 363, 'investment']
      ]
      const ticks = filter(values, ([, , variable]) => {
        return variable === this.variable
      })
      return map(ticks, ([label, value]) => {
        return {
          label,
          x: this.scaleX(value),
          y1: this.margin.top - 35,
          y2: this.height - this.margin.bottom,
          labelY: this.margin.top - 40
        }
      })
    },
    areas () {
      if (this.variable === 'temperature') {
        const values = [
          ['Paris Target Area', 1.5, 2.0]
        ]
        return map(values, ([label, start, end]) => {
          const x1 = this.scaleX(start)
          const x2 = this.scaleX(end)
          const y1 = this.margin.top - 35
          const y2 = this.height - this.margin.bottom
          const d = `M${x1} ${y1} V ${y2} H ${x2} V ${y1} Z`
          return {
            label,
            d,
            labelX: this.scaleX(start + ((end - start) / 2)),
            labelY: this.margin.top - 40
          }
        })
      } else {
        return []
      }
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
  },
  components: {
    VisPulse
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
    min-height: 360px;
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

<template>
  <g
    :class="klass"
  >
    <transition name="fade">
      <component
        :is="comp"
        ref="element"
        :el="el"
        :scale-x="scaleX"
        :scale-y="scaleY"
        :width="width"
        :data="data"
      />
    </transition>
  </g>
</template>

<script>
import { mapState } from 'vuex'
import get from 'lodash/get'
import VisMarker from '~/components/VisMarker.vue'
import VisLine from '~/components/VisLine.vue'
import VisHorizontalLine from '~/components/VisHorizontalLine.vue'
import VisVerticalLine from '~/components/VisVerticalLine.vue'
import VisArea from '~/components/VisArea.vue'
import VisDot from '~/components/VisDot.vue'
import VisArrow from '~/components/VisArrow.vue'
import VisBracket from '~/components/VisBracket.vue'
import VisAddition from '~/components/VisAddition.vue'

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default {
  components: {
    VisMarker,
    VisLine,
    VisArea,
    VisDot,
    VisArrow,
    VisHorizontalLine,
    VisVerticalLine,
    VisBracket,
    VisAddition
  },
  props: ['el', 'scaleX', 'scaleY', 'visibility', 'dataset', 'width'],
  computed: {
    ...mapState({
      highlight: state => state.highlight.highlight
    }),
    klass () {
      const { visibility, el, highlight, scaleY } = this
      const { type, attribute, id } = el

      let isVisible = visibility.includes(id) ? 'isVisible' : 'isNotVisible'
      if (id === 'negative') {
        if (scaleY.domain()[0] < 0) {
          isVisible = 'isVisible'
        }
      }

      const klass = [
        isVisible,
        'graphic',
        'graphic-element',
        type,
        attribute
      ]

      if (highlight) {
        klass.push(highlight === id ? 'isHighlight' : 'hasHighlight')
      }

      return klass.join(' ')
    },
    comp () {
      return 'Vis' + capitalizeFirstLetter(this.el.type)
    },
    data () {
      const { dataset, el } = this
      const data = el.data
      return get(data, dataset, get(data, 0))
    }
  }
}
</script>

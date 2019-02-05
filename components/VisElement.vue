<template>
  <g
    :class="klass">
    <component
      ref="element"
      v-bind:is="comp"
      :el="el"
      :scaleX="scaleX"
      :scaleY="scaleY"
      :data="data" />
  </g>
</template>

<script>
  import { mapState } from 'vuex'
  import VisMarker from '~/components/VisMarker.vue'
  import VisLine from '~/components/VisLine.vue'
  import VisHorizontalLine from '~/components/VisHorizontalLine.vue'
  import VisVerticalLine from '~/components/VisVerticalLine.vue'
  import VisArea from '~/components/VisArea.vue'
  import VisDot from '~/components/VisDot.vue'
  import get from 'lodash/get'

  function capitalizeFirstLetter (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  export default {
    props: ['el', 'scaleX', 'scaleY', 'visibility', 'dataset'],
    computed: {
      ...mapState({
        'highlight': state => state.highlight.highlight
      }),
      klass: function () {
        const { visibility, el, highlight, scaleY } = this
        const { type, attribute, id } = el

        let isVisible = visibility.indexOf(id) >= 0 ? 'isVisible' : 'isNotVisible'
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
      comp: function () {
        return 'Vis' + capitalizeFirstLetter(this.el.type)
      },
      data: function () {
        const { dataset, el } = this
        const data = el.data
        return get(data, dataset, get(data, 0))
      }
    },
    components: {
      VisMarker,
      VisLine,
      VisArea,
      VisDot,
      VisHorizontalLine,
      VisVerticalLine
    }
  }
</script>

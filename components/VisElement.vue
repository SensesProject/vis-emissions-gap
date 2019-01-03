<template>
  <g
    :clip-path="clip"
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
  import VisMarker from '~/components/VisMarker.vue'
  import VisLine from '~/components/VisLine.vue'
  import VisHorizontalLine from '~/components/VisHorizontalLine.vue'
  import VisVerticalLine from '~/components/VisVerticalLine.vue'
  import VisArea from '~/components/VisArea.vue'
  import get from 'lodash/get'

  function capitalizeFirstLetter (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  export default {
    props: ['el', 'scaleX', 'scaleY', 'visibility', 'dataset'],
    computed: {
      klass: function () {
        const { visibility, el } = this
        const { type, attribute, id } = el
        console.log('visibility', visibility)
        return [
          visibility.indexOf(id) >= 0 ? 'isVisible' : 'isNotVisible',
          'graphic',
          'graphic-element',
          type,
          attribute
        ].join(' ')
      },
      clip: function () {
        return `url(#clip${this.el.clip})`
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
      VisHorizontalLine,
      VisVerticalLine
    },
    mounted () {
      this.$refs.element.render()
      // this.bus.$on('update', this.$refs.element.render)
    }
  }
</script>

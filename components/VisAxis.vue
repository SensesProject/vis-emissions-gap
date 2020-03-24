<template>
  <g>
    <VisAxisX
      :margin="margin"
      :height="height"
      :width="width"
      :scale-x="scaleX"
    />
    <VisAxisY
      :margin="margin"
      :height="height"
      :scale-y="scaleY"
      :scale-x="scaleX"
    />
  </g>
</template>

<script>
import VisAxisY from '~/components/VisAxisY.vue'
import VisAxisX from '~/components/VisAxisX.vue'

export default {
  components: {
    VisAxisY,
    VisAxisX
  },
  props: ['el', 'scaleX', 'scaleY', 'margin', 'height', 'width']
}
</script>

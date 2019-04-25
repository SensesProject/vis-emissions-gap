<template>
  <g>
    <VisAxisX
      :margin="margin"
      :height="height"
      :width="width"
      :scaleX="scaleX" />
    <VisAxisY
      :margin="margin"
      :height="height"
      :scaleY="scaleY"
      :scaleX="scaleX" />
  </g>
</template>

<script>
  import VisAxisY from '~/components/VisAxisY.vue'
  import VisAxisX from '~/components/VisAxisX.vue'

  export default {
    props: ['el', 'scaleX', 'scaleY', 'margin', 'height', 'width'],
    components: {
      VisAxisY,
      VisAxisX
    }
  }
</script>

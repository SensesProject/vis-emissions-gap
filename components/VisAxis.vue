<template>
  <g>
    <line
      :class="el.klass"
      :x1="x1"
      :x2="x2"
      :y1="y"
      :y2="y" />
    <text
      v-if="el.label"
      :class="el.klass"
      :x="x2 + 10"
      :y="y"
      dominant-baseline="middle"
    >{{ el.label }}</text>
  </g>
</template>

<script>
  export default {
    props: ['el', 'scaleX', 'scaleY', 'data'],
    data: function () {
      return {
        x1: 0,
        x2: 0,
        y: 0
      }
    },
    methods: {
      render: function () {
        const { scaleX, scaleY, data } = this
        const [x1, x2] = scaleX.range()
        this.x1 = x1
        this.x2 = x2
        this.y = scaleY(data[0][1])
      }
    }
  }
</script>

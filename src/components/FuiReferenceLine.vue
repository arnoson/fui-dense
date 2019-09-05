<template lang="pug">
  svg.fui-reference-line
    line(
      v-if="from && to"
      :x1="from.x"
      :y1="from.y"
      :x2="to.x"
      :y2="to.y"
    )
  </svg>
</template>

<script language="scss">
export default {
  props: {
    from: Object,
    to: Object
  }
}
</script>

<style lang="scss">
.fui-reference-line {
  position: fixed;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  stroke-width: 1;
  stroke: white;
  mix-blend-mode: difference;
}
</style>

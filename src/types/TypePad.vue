<template lang="pug">
  .type-pad(
    @mousedown="startSlide"
  )
    .type-pad-handle(
      ref="handle"
      :style="handlePosition"
    )
</template>

<script>
import { isArray } from '@/utils'
import sliderMixin from '@/mixins/sliderMixin'
import { FuiType } from 'vue-fui'

export default {
  extends: FuiType,

  mixins: [sliderMixin],

  data() {
    return {
      defaultOptions: {
        rangeX: { min: 0, max: 1 },
        rangeY: { min: 0, max: 1 }
      }
    }
  },

  computed: {
    values() {
      const { value } = this
      const values = isArray(value)
        ? { x: value[0], y: value[1] }
        : value

      return values || {}
    },

    factors() {
      const { values } = this
      return {
        x: this.valueToFactor(values.x, this.options.rangeX),
        y: this.valueToFactor(values.y, this.options.rangeY),
      }
    },

    handlePosition() {
      const { factors, handleSize } = this
      return {
        top: `calc(${1 - factors.y} * (100% - ${handleSize.height}px))`,
        left: `calc(${factors.x} * (100% - ${handleSize.width}px))`
      }
    }
  },

  methods: {
    slide(event) {
      event.preventDefault()

      const { top, left, width, height } = this.sliderBounds
      const { pageX, pageY } = event
      const x = pageX - left
      const y = pageY - top

      const factors = {
        x: this.constrainFactor(x / width),
        y: this.constrainFactor(1 - (y / height))
      }

      const values = {
        x: this.factorToValue(factors.x, this.options.rangeX),
        y: this.factorToValue(factors.y, this.options.rangeY)
      }

      this.valueProxy = isArray(this.value)
        ? [values.x, values.y]
        : values
    }
  }
}
</script>

<style lang="scss" scoped>
.type-pad {
  position: relative;
  min-width: 50px;
  min-height: 50px;
  box-sizing: border-box;
  border: 1px solid black;

  &-handle {
    position: absolute;
    width: 0.6em;
    height: 0.6em;
    border: 1px solid;
    border-radius: 50%;
  }

  &-scale-vertical {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
</style>

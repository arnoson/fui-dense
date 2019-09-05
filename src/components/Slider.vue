<template lang="pug">
  .slider(
    :class="[direction, customClass]"
  )
    .slider-handle(
      ref="handle"
      :style="handlePosition"
      :class="direction"
      @mousedown="startSlide"
    )
      slot(name="handle")
</template>

<script>
import { mapValue } from '@/utils'

export default {
  props: {
    value: {
      type: Number,
      default: 0
    },

    range: {
      type: Object,
      default: () => ({ min: 0, max: 1 })
    },

    direction: {
      type: String,
      validator: value => ['vertical', 'horizontal'].includes(value),
      default: 'horizontal'
    }
  },

  data() {
    return {
      handleSize: { width: 0, height: 0 },
      sliderBounds: { width: 0, height: 0, top: 0, left: 0 },
      customClass: ''
    }
  },

  computed: {
    factor() {
      return this.valueToFactor(this.value, this.range)
    },

    isVertical() {
      return this.direction === 'vertical'
    },

    handlePosition() {
      const { width, height } = this.handleSize
      return this.isVertical
        ? { top: `calc(${this.factor} * (100% - ${height}px))` }
        : { left: `calc(${this.factor} * (100% - ${width}px))` }
    }
  },

  beforeDestroy() {
    // Make sure listeners allways get removed.
    this.removeListeners()
  },

  methods: {
    valueToFactor(value, range) {
      return mapValue(value, range, { min: 0, max: 1 })
    },

    factorToValue(value, range) {
      return mapValue(value, { min: 0, max: 1 }, range)
    },

    constrainFactor(factor) {
      if (factor < 0) {
        factor = 0
      }
      if (factor > 1) {
        factor = 1
      }
      return factor
    },

    addListeners() {
      window.addEventListener('mousemove', this.slide)
      window.addEventListener('mouseup', this.endSlide)
    },

    removeListeners() {
      window.removeEventListener('mousemove', this.slide)
      window.removeEventListener('mouseup', this.endSlide)
    },

    startSlide() {
      let bounds = this.$el.getBoundingClientRect()
      this.sliderBounds = {
        width: bounds.width,
        height: bounds.height,
        top: bounds.top,
        left: bounds.left
      }

      bounds = this.$refs.handle.getBoundingClientRect()
      this.handleSize = { width: bounds.width, height: bounds.height }

      this.addListeners()
    },

    slide(event) {
      event.preventDefault()

      const { top, left, width, height } = this.sliderBounds
      const { pageX, pageY } = event
      const x = pageX - left
      const y = pageY - top

      const factor = this.constrainFactor(
        this.isVertical
          ? y / height
          : x / width
      )

      this.$emit('input', this.factorToValue(factor, this.range))
      // this.value = this.factorToValue(factor, this.range)
    },

    endSlide(event) {
      this.slide(event)
      this.removeListeners()
    }
  }
}
</script>

<style lang="scss" scoped>
.slider {
  position: relative;
}

.slider-handle {
  position: absolute;
  top: 0;
  left: 0;
}
</style>

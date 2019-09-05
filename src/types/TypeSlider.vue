<template lang="pug">
  .type-slider(
    :class="options.direction"
    @mousedown="startSlide"
  )
    .type-slider-range
    .type-slider-handle(
      ref="handle"
      :style="handlePosition"
    )
</template>

<script>
import sliderMixin from '@/mixins/sliderMixin'
import { FuiType } from 'vue-fui'

export default {
  extends: FuiType,

  mixins: [sliderMixin],

  data() {
    return {
      defaultOptions: {
        direction: 'horizontal',
        range: { min: 0, max: 1 }
      }
    }
  },

  computed: {
    factor() {
      return this.valueToFactor(this.value, this.options.range)
    },

    isHorizontal() {
      return this.options.direction === 'horizontal'
    },

    isVertical() {
      return this.options.direction === 'vertical'
    },

    handlePosition() {
      const { width, height } = this.handleSize
      return this.isVertical
        ? { top: `calc(${1 - this.factor} * (100% - ${height}px))` }
        : { left: `calc(${this.factor} * (100% - ${width}px))` }
    }
  },

  methods: {
    slide(event) {
      event.preventDefault()

      const { top, left, width, height } = this.sliderBounds
      const { pageX, pageY } = event
      const x = pageX - left
      const y = pageY - top

      const factor = this.constrainFactor(
        this.isHorizontal
          ? x / width
          : 1 - (y / height)
      )

      this.valueProxy = this.factorToValue(factor, this.options.range)
    }
  }
}
</script>

<style lang="scss">
.type-slider {
  position: relative;

  &-range {
    position: absolute;
    background: black;
  }

  &-handle {
    position: absolute;
    border-radius: 50%;
    width: 0.5em;
    height: 0.5em;
    background: black;
  }
}

.type-slider.horizontal {
  min-width: 5em;
  width: 100%;
  height: 1em;

  .type-slider-handle {
    top: 50%;
    transform: translateY(-50%);
  }

  .type-slider-range {
    width: 100%;
    height: 1px;
    top: 50%;
    transform: translateY(-50%);
  }
}

.type-slider.vertical {
  min-height: 5em;
  height: 100%;
  width: 1em;

  .type-slider-handle {
    left: 50%;
    transform: translateX(-50%);
  }

  .type-slider-range {
    width: 1px;
    height: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>

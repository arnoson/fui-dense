<template lang="pug">
  .type-colorpicker
    ColorSaturationBrightness.type-colorpicker-saturation-brightness(
      v-model="colorProxy"
    )
    ColorHue.type-colorpicker-hue(
      :schema="{ direction: 'vertical' }"
      v-model="colorProxy"
    )
    .type-colorpicker-alpha-none
      ColorAlpha.type-colorpicker-alpha(
        :schema="{ direction: 'vertical' }"
        v-model="colorProxy"
      )
      svg.type-colorpicker-none(
        viewBox="0 0 10 10"
      )
        line(
          vector-effect="non-scaling-stroke"
          fill="none"
          stroke="red"
          stroke-width="1"
          stroke-miterlimit="10"
          x1="0" y1="10"
          x2="10" y2="0"
        )
      </svg>
</template>

<script>
import { valueToColor, colorToValue } from '@/utils'
import { FuiType } from 'vue-fui'
import ColorSaturationBrightness from './TypeColorSaturationBrightness'
import ColorHue from './TypeColorHue'
import ColorAlpha from './TypeColorAlpha'

export default {
  extends: FuiType,

  components: {
    ColorHue,
    ColorAlpha,
    ColorSaturationBrightness
  },

  data() {
    return {
      color: {}
    }
  },

  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.color = valueToColor(value, this.color)
      }
    }
  },

  computed: {
    colorProxy: {
      get() {
        return this.color
      },
      set(color) {
        this.$emit('input', colorToValue(color))
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.type-colorpicker {
  $column-width: 0.85em;

  display: grid;
  grid-template-columns: auto repeat(2, $column-width);
  min-height: 100px;
  min-width: 100px;

  .type-color-component {
    border: none;
    width: 100%;
  }

  &-hue, &-alpha-none {
    width: $column-width;
    height: 100%;
  }

  &-hue.type-color-hue {
    border-right: none;
  }

  &-saturation-brightness {
    border: none;
  }

  &-alpha-none {
    display: grid;
    grid-template-rows: auto $column-width;
  }
}
</style>

<template lang="pug">
  Slider.type-color-component(
    v-bind="{ schema }"
    v-model="valueProxy"
  )
</template>

<script>
import { FuiType } from 'vue-fui'
import Slider from '@/types/TypeSlider'

export default {
  components: {
    Slider
  },

  extends: FuiType,
}
</script>

<style lang="scss" scoped>
.type-color-component {
  position: relative;
  box-sizing: border-box;
  border: 1px solid black;
}

::v-deep .type-slider-handle {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 0;
  background: white;
  box-sizing: border-box;
}

::v-deep .type-slider-range {
  display: none;
}

.type-color-component.vertical {
  ::v-deep .type-slider-handle {
    width: 100%;
    height: 5px;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
  }
}

.type-color-component.horizontal {
  ::v-deep .type-slider-handle {
    width: 5px;
    height: 100%;
    border-left: 1px solid black;
    border-right: 1px solid black;
  }
}
</style>

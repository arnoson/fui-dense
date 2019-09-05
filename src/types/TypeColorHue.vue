<template lang="pug">
  ColorComponent.type-color-hue(
    v-bind="{ schema: { ...schema, range: { min: 0, max: 360 } } }"
    v-model="hue"
  )
</template>

<script>
import { FuiType } from 'vue-fui'
import ColorComponent from '@/types/TypeColorComponent'

export default {
  components: {
    ColorComponent
  },

  computed: {
    color() {
      return this.value
    },

    hue: {
      get() {
        return this.color.hue
      },

      set(hue) {
        this.$emit('input', { ...this.color, hue })
      }
    }
  },

  extends: FuiType
}
</script>

<style lang="scss">
.type-color-hue.vertical {
  background: linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
}

.type-color-hue.horizontal {
  background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
}
</style>

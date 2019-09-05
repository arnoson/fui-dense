<template lang="pug">
  TypePad.type-color-saturation-brightness(
    :style="{ backgroundColor }"
    v-bind="{ schema }"
    v-model="valueProxy"
  )
</template>

<script>
import { FuiType } from 'vue-fui'
import TypePad from '@/types/TypePad'

export default {
  components: {
    TypePad
  },

  extends: FuiType,

  computed: {
    valueProxy: {
      get() {
        return [this.color.saturation, this.color.brightness]
      },

      set(value) {
        const [saturation, brightness] = value
        this.$emit('input', { ...this.color, saturation, brightness })
      }
    },

    color() {
      return this.value
    },

    backgroundColor() {
      return `hsl(${this.color.hue}, 100%, 50%)`
    }
  },
}
</script>

<style scoped>
.type-color-saturation-brightness {
  background: linear-gradient(0deg, black, transparent), linear-gradient(90deg, white, transparent);
}
</style>

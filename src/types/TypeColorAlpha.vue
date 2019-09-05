<template lang="pug">
  ColorComponent.type-color-alpha(
    :style="{ background }"
    v-bind="{ schema }"
    v-model="alpha"
  )
</template>

<script>
import { colorToCss } from '@/utils'
import { FuiType } from 'vue-fui'
import ColorComponent from '@/types/TypeColorComponent'

export default {
  components: {
    ColorComponent
  },

  extends: FuiType,

  computed: {
    color() {
      return this.value
    },

    alpha: {
      get() {
        return this.color.alpha
      },

      set(alpha) {
        this.$emit('input', { ...this.color, alpha })
      }
    },

    opaqueColor() {
      return colorToCss({ ...this.color, alpha: 1 })
    },

    direction() {
      return this.options.direction
    },

    background() {
      const side = this.direction === 'vertical' ? 'top' : 'right'
      const checkboard= `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='lightgray'%3E%3Cpath d='M0 0h10v10H0zm10 10h10v10H10z'/%3E%3C/svg%3E")`

      return `linear-gradient(to ${side}, transparent, ${this.opaqueColor}), ${checkboard}`
    }
  }
}
</script>

<style lang="scss" scoped>
.type-color-alpha {
  background-repeat: repeat;
  background-size: 1em 1em;
  background-color: #fff;
}
</style>

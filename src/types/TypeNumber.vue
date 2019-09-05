<template lang="pug">
  input.type-number(
    type="number"
    v-model.number="valueProxy"
    v-input-autowidth
    :min="options.min"
    :max="options.max"
    :step="options.step"
  )
</template>

<script language="scss">
import { FuiType } from 'vue-fui'

export default {
  extends: FuiType
}
</script>

<style lang="scss" scoed>
.type-number {
  width: 2em;
  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    display: none;
  }
}
</style>

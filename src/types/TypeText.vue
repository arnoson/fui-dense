<template lang="pug">
  .type-text
    span.quotes(v-if="quotes") {{ quotes }}
    input(
      v-model="valueProxy"
      v-on="options.on"
      v-input-autowidth="{ maxWidth }"
    )
    span.quotes(v-if="quotes") {{ quotes }}
</template>

<script>
import { FuiType } from 'vue-fui'

export default {
  extends: FuiType,

  computed: {
    quotes() {
      const { quotes } = this.options
      return quotes === true ? '"' : quotes
    },

    maxWidth() {
      return this.options.maxWidth
    }
  }
}
</script>

<style lang="scss" scoped>
.type-text {
  input {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>

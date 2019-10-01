<template lang="pug">
  .type-color(
    @click="openColorPicker"
    :data-id="id"
  ) color
</template>

<script>
import { windowManager, FuiType } from 'vue-fui'

export default {
  extends: FuiType,

  inject: ['schemaRoot'],

  data() {
    return {
      colorPickerId: null
    }
  },

  computed: {
    color() {
      return this.value
    }
  },

  methods: {
    openColorPicker() {
      const schema = {
        autoClose: true,
        reference: this.id,
        components: {
          color: {
            type: 'color-picker'
          }
        }
      }

      if (!windowManager.isOpen(this.colorPickerId)) {
        const { color } = this
        this.colorPickerId = windowManager.open({
          schema,
          data: this.data,
          parent: this.schemaRoot.id,
          reference: this.id
        })
      } else {
        windowManager.focus(this.colorPickerId)
      }
    }
  }
}
</script>

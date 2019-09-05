<template lang="pug">
  .type-window-link(
    @click="openWindow"
  ) {{ options.caption }}
</template>

<script>
import { FuiType, windowManager } from 'vue-fui'

export default {
  extends: FuiType,

  data() {
    return {
      windowId: null
    }
  },

  computed: {
    parsedDataPath() {
      return parseDataPath(this.dataPath)
    },
  },

  methods: {
    openWindow() {
      if (!windowManager.isOpen(this.windowId)) {
        this.windowId = windowManager.open({
          data: this.value,
          reference: this.id,
          parent: this.windowId,
          schema: this.options.window
        })
      } else {
        windowManager.focus(this.windowId)
      }
    }
  }
}
</script>

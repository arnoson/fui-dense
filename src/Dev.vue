<template lang="pug">
  .dev
    Fui(
      :collection="collection"
      :data="data"
      :schema="schema"
    )
</template>

<script>
import { Fui } from 'vue-fui'
import 'vue-fui/dist/vue-fui.css'
import collection from '@'

const data = {
  hallo: { red: 1, green: 0, blue: 0 },
  stroke: {
    width: 1,
    color: 'blue'
  }
}

const schema = {
  // layout: 'comma-separated',
  components: {
    stroke: {
      type: 'window-link',
      caption: 'stroke',
      window: {
        autoClose: true,
        components: {
          width: {
            type: 'number',
            label: 'stroke width'
          },
          color: {
            type: 'color',
            label: 'stroke color'
          }
        }
      }
    }
  }
}

export default {
  components: {
    Fui
  },

  data() {
    return {
      data,
      schema,
      collection
    }
  }
}
</script>

<style lang="scss">
html, body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  background: white;
}

.fui {
  padding: 50vw;
}
</style>

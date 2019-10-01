<template lang="pug">
  .dev
    .monitor
      .monitor-row(
        v-for="(value, key) in data"
      )
        div {{ key }}
        div {{ value }}
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
  boolean: false,
  color: { red: 1, green: 0, blue: 0 },
  number: 12,
  select: '1',
  slider: 0,
  text: 'Mhhhh naja',
  window: {
    name: 'Fuuu'
  }
}

const schema = {
  layout: 'comma-separated',
  components: {
    boolean: {
      type: 'check-box',
      label: 'Ja?'
    },
    color: {
      type: 'color',
      label: 'Color'
    },
    number: {
      type: 'number',
      label: 'Number'
    },
    select: {
      type: 'select',
      label: 'select',
      options: ['1', '2', 'oder 3']
    },
    slider: {
      type: 'slider',
      label: 'Slider'
    },
    text: {
      type: 'text',
      label: 'Text'
    },
    window: {
      type: 'window-link',
      components: {
        name: {
          type: 'text',
          label: 'Window name'
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
  padding: 2em;
}

.monitor {
  display: table;
  border-collapse: collapse;
  &-row {
    display: table-row;
    border: 1px solid;
    > * {
      padding: 0.1em 0.2em;
      border: 1px solid;
      display: table-cell;
    }
  }
}
</style>

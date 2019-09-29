<template lang="pug">
  .type-select(
    v-outside:mousedown="collapse"
  )
    .type-select-title(
      v-if="!expanded"
      @click="expand"
    ) {{ placeholder }}
    .type-select-options(
      v-else
    )
      .type-select-option(
        v-for="option in options.options"
        @click="selectOption(option)"
      )
        span.type-select-icon(
          v-html="(selectedOption === option) ? '&#10004;' : '–'"
        )
        span {{ option }}
</template>

<script>
import { FuiType } from 'vue-fui'

export default {
  extends: FuiType,

  data() {
    return {
      expanded: false,
      selectedOption: null,
      hoveredOption: null
    }
  },

  computed: {
    placeholder() {
      return this.selectedOption || this.options.placeholder
    }
  },

  methods: {
    expand() {
      this.expanded = true
    },

    collapse() {
      this.expanded = false
    },

    selectOption(option) {
      this.selectedOption = option
      this.collapse()
    }
  }
}
</script>

<style lang="scss">
.type-select {
  &-options {
    position: absolute;
    border: 1px solid black;
    margin-top: -1px;
    margin-left: calc(-1px - 0.2em - 1em);
  }

  &-option, &-title {
    user-select: none;
  }

  &-title {
    text-decoration: underline;
    cursor: pointer;
  }

  &-option {
    padding: 0 0.2em;
    cursor: pointer;
  }

  &-option:hover {
    background: yellow;
  }

  &-icon {
    display: inline-block;
    width: 1em;
  }
}



.type-select.highlight-hover {
  .type-select-option {
    &:hover {
      background: yellow;
    }
  }
}
</style>

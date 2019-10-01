<template lang="pug">
  //- Set a tab index to enable key events on the div.
  .type-select(
    tabindex="0"
    v-outside:mousedown="collapse"
    @keydown.up="onArrowUp"
    @keydown.down="onArrowDown"
    @keydown.enter="selectHighlightedOption"
  )
    .type-select-title(
      v-if="!expanded"
      @click="expand"
    ) {{ placeholder }}
    .type-select-options(
      v-else
    )
      .type-select-option(
        v-for="(option, index) in options.options"
        :class="{ highlighted: highlightedIndex === index }"
        @click="selectOption(option)"
        @mousemove="highlightedIndex = index"
        @mouseleave="highlightedIndex = null"
      )
        span.type-select-icon.type-select-check(
          v-if="selectedOption === option"
        ) &#10004;
        span.type-select-icon.type-select-dash(
          v-else
        ) –
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
      highlightedIndex: null
    }
  },

  computed: {
    placeholder() {
      return this.selectedOption || this.options.placeholder
    }
  },

  created() {
    this.selectedOption = this.value
  },

  methods: {
    expand() {
      this.expanded = true

      // Highlight the selected option (if it exists) insted of the hovered
      // one.
      const { options } = this.options
      this.highlightedIndex = this.selectedOption
        ? options.indexOf(this.selectedOption)
        : this.expandHoveredIndex
    },

    collapse() {
      this.expanded = false
      this.mouseMoved = false
    },

    selectOption(option) {
      this.selectedOption = option
      this.collapse()
    },

    selectHighlightedOption() {
      const { options } = this.options
      this.selectOption(options[this.highlightedIndex])
    },

    /* Highlight the previous option. */
    onArrowUp() {
      if (this.highlightedIndex > 0) {
        this.highlightedIndex -= 1
      }
    },

    /* Highlight the next option. */
    onArrowDown() {
      const { options } = this.options
      if (this.highlightedIndex < options.length - 1) {
        this.highlightedIndex += 1
      }
    }
  }
}
</script>

<style lang="scss">
.type-select {
  outline: none;

  &-options {
    position: absolute;
    border: 1px solid black;
    margin-top: -1px;
    margin-left: calc(-1px - 0.2em - 1em);
    background: white;
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

  &-option.highlighted {
    background: yellow;
  }

  &-icon {
    display: inline-block;
    width: 1em;
  }

  &-dash {
    // Optically center the dash.
    padding-left: 0.14em;
  }
}
</style>

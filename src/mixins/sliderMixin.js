import { mapValue } from '@/utils'

export default {
  data() {
    return {
      sliding: false,
      handleSize: { width: 0, height: 0 },
      sliderBounds: { width: 0, height: 0, top: 0, left: 0 }
    }
  },

  mounted() {
    this.handleSize = this.$_getHandleSize()
  },

  beforeDestroy() {
    // Make sure listeners allways get removed.
    this.$_removeListeners()
  },

  methods: {
    valueToFactor(value, range) {
      return mapValue(value, range, { min: 0, max: 1 })
    },

    factorToValue(value, range) {
      return mapValue(value, { min: 0, max: 1 }, range)
    },

    constrainFactor(factor) {
      if (factor < 0) {
        factor = 0
      }
      if (factor > 1) {
        factor = 1
      }
      return factor
    },

    $_addListeners() {
      window.addEventListener('mousemove', this.slide)
      window.addEventListener('mouseup', this.$_endSlide)
    },

    $_removeListeners() {
      window.removeEventListener('mousemove', this.slide)
      window.removeEventListener('mouseup', this.$_endSlide)
    },

    /**
     * Calculate all necessary data for sliding. This method should be
     * called in a mousedown event on the slider handle.
     */
    startSlide(event) {
      this.sliding = true
      let bounds = this.$el.getBoundingClientRect()
      this.sliderBounds = {
        width: bounds.width,
        height: bounds.height,
        top: bounds.top,
        left: bounds.left
      }

      this.handleSize = this.$_getHandleSize()

      this.$_addListeners()
      // Trigger slide, so also a mousedown in an empty space of the slider will
      // move to handle.
      this.slide(event)
    },

    $_getHandleSize() {
      const bounds = this.$refs.handle.getBoundingClientRect()
      return { width: bounds.width, height: bounds.height }
    },

    /**
     * Slide is not yet defined and must be overwritten in the component.
     */
    slide() {},

    $_endSlide() {
      this.sliding = false
      this.slide(event)
      this.$_removeListeners()
    }
  }
}

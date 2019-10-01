<template lang="pug">
  .fui-dense-window(
    @mousedown="onMouseDown"
    :style="style"
    :class="{ 'no-title': !schema.title }"
    :data-id="id"
    v-outside:mousedown="outsideOptions"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  )
    FuiReferenceLine(
      v-if="showReferenceLine"
      :from="referencePoint"
      :to="referenceCorner"
    )
    .fui-title-bar(
      :class="{ dragging }"
      @mousedown="startDrag"
    )
      .fui-title(
        v-if="schema.title"
      ) {{ schema.title }}
      .fui-lock(
        :class="{ locked }"
        @click="toggleLock"
      )
    FuiForm(
      v-bind="{ schema, data }"
      v-if="expanded"
      :id="`window-${id}`"
      :collection="collection"
    )
</template>

<script>
import { isInViewport, getClosestPoint } from '@/utils'
import { FuiWindow, windowManager } from 'vue-fui'
import FuiReferenceLine from '@/components/FuiReferenceLine'

export default {
  components: {
    FuiReferenceLine
  },

  extends: FuiWindow,

  props: {
    reference: String
  },

  provide() {
    return {
      schemaParent: this,
      schemaRoot: this
    }
  },

  data() {
    return {
      hover: false,
      referenceHover: false,
      locked: false,
      referencePoint: { x: 0, y: 0 },
      referenceCorner: { x: 0, y: 0 },
      listeners: {
        referenceMouseEnter: () => this.referenceHover = true,
        referenceMouseLeave: () => this.referenceHover = false,
        resize: () => this.updateReferencePoint()
      }
    }
  },

  computed: {
    showReferenceLine() {
      return !this.locked || this.hover || this.referenceHover
      // return (
      //   !this.dragging &&
      //   (!this.locked || this.hover || this.referenceHover)
      // )
    },

    // Calculate the bounds based on the position and size, so we don't have
    // to call `getBoundingClientRect()` everytime we drag the window.
    bounds() {
      const { x, y } = this.absolutePosition
      const { width, height } = this.size

      const top = y
      const left = x
      const bottom = y + height
      const right = x + width
      const topLeft = { y: top, x: left }
      const topRight = { y: top, x: right }
      const bottomLeft = { y: bottom, x: left }
      const bottomRight = { y: bottom, x: right }

      return {
        top, left, bottom, right, topLeft, topRight, bottomLeft, bottomRight
      }
    }
  },

  watch: {
    positionCss() {
      this.updateReferenceCorner()
    }
  },

  mounted() {
    if (this.reference) {
      this.alignWithReference()
      this.updateReferencePoint()
      this.updateReferenceCorner()
    }
    window.addEventListener('resize', this.listeners.resize)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.listeners.resize)
  },

  methods: {
    toggleLock() {
      this.locked = !this.locked
    },

    onMouseEnter() {
      this.hover = true
      // Dragging might cause multiple mouse enter events we wan't to ignore.
      if (!this.dragging) {
        this.updateReferencePoint()
        this.updateReferenceCorner()
      }
    },

    onMouseLeave() {
      this.hover = false
    },

    onMouseDownOutside(event) {
      const targetWindow = event.target.closest('.fui-window')

      if (
        !targetWindow ||
        !windowManager.isChildOf(targetWindow.dataset.id, this.id)
      ) {
        this.close()
      }
    },

    alignWithReference() {
      const { $el, reference } = this
      const referenceEl = document.querySelector(`[data-id='${reference}']`)

      const referenceBounds = referenceEl.getBoundingClientRect()
      const { width, height } = $el.getBoundingClientRect()
      const margin = 10

      // All possble x and y values for the position. Position specifies
      // the top left corner of the window, therefor we incorporate the window's
      // size.
      const left = referenceBounds.left - width - margin
      const right = referenceBounds.right + margin
      const top = referenceBounds.top - height - margin
      const bottom = referenceBounds.bottom + margin

      // All possible positions (in desired order).
      const positions = [
        { x: right, y: top },
        { x: right, y: bottom },
        { x: left, y: top },
        { x: left, y: bottom }
      ]

      // Find the first position, where the window would be fully inside the
      // viewport.
      const position = positions.find(position => isInViewport({
        top: position.y,
        left: position.x,
        bottom: position.y + height,
        right: position.x + width
      }))

      // For the unlikely case, that no position fits, we position the window
      // in the top left corner of the browser.
      this.setAbsolutePosition(position || { x: margin, y: margin })
    },

    updateReferencePoint() {
      const { reference } = this
      const referenceEl = document.querySelector(`[data-id='${reference}']`)

      if (referenceEl) {
        const { referenceMouseEnter, referenceMouseLeave } = this.listeners
        referenceEl.addEventListener('mouseenter', referenceMouseEnter)
        referenceEl.addEventListener('mouseleave', referenceMouseLeave)

        const bounds = referenceEl.getBoundingClientRect()
        this.referencePoint = {
          x: bounds.x + bounds.width / 2,
          y: bounds.y + bounds.height / 2
        }
      } else {
        this.referencePoint = undefined
      }
    },

    updateReferenceCorner(checkVisibility = false) {
      const { bounds, referencePoint } = this

      const isAbove = bounds.bottom < referencePoint.y
      const isBelow = bounds.top > referencePoint.y
      const isLeft = bounds.right < referencePoint.x
      const isRight = bounds.left > referencePoint.x

      // Select all possible corners where the reference line wouldn't cross
      // this window.
      let corners
      if (isAbove) {
        if (isRight) {
          corners = [bounds.bottomLeft, bounds.topLeft, bounds.bottomRight]
        } else if (isLeft) {
          corners = [bounds.bottomRight, bounds.topRight, bounds.bottomLeft]
        } else {
          corners = [bounds.bottomLeft, bounds.bottomRight]
        }
      } else if (isBelow) {
        if (isRight) {
          corners = [bounds.topLeft, bounds.topRight, bounds.bottomLeft]
        } else if (isLeft) {
          corners = [bounds.topRight, bounds.topLeft, bounds.bottomRight]
        } else {
          corners = [bounds.topLeft, bounds.topRight]
        }
      } else {
        if (isRight) {
          corners = [bounds.topLeft, bounds.bottomLeft]
        } else if (isLeft) {
          corners = [bounds.topRight, bounds.bottomRight]
        } else {
          // Window overlays reference completely.
        }
      }

      // Now we have a list of possible corners and select the best fitting one.
      let corner
      if (corners) {
        // Other windows may be overlaying this window, so we check which
        // corners are visible.
        if (corners && checkVisibility) {
          console.log('check')
          corners = corners.filter(({x, y}) => (
            document.elementFromPoint(x, y) === this.$el
          ))
        }

        // Select the nearest corner.
        corner = getClosestPoint(corners, referencePoint)
      }

      this.referenceCorner = corner
    }
  }
}
</script>

<style lang="scss" scoped>
.test {
  position: fixed;
  top: 0;
  left: 0;
}

.fui-dense-window {
  position: absolute;
  border: 1px solid;
  background: white;
  display: flex;
  flex-direction: column;

  .fui-title-bar {
    user-select: none;
    display: flex;
    flex-direction: row;
  }

  .fui-lock {
    border-radius: 50%;
    border: 1px solid black;
    width: 0.6em;
    height: 0.6em;
    box-sizing: border-box;

    &.locked {
      background: black
    }
  }
}

.fui-dense-window.no-title {
  flex-direction: row-reverse;

  .fui-title-bar {
    width: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.2em 0;
  }

  .fui-form {
    flex: 1;
  }
}
</style>

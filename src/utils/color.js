import { isObject } from '@/utils'
import Color from 'color'

/**
 * We use written-out component names and normalized values (red: 1),
 * but Color.js's constructor needs abbreviations and scaled values (r: 255).
 */
function formatColorComponents(components) {
  const formats = {
    red: ['r', 255],
    green: ['g', 255],
    blue: ['b', 255],
    hue: ['h'],
    saturation: ['s', 100],
    brightness: ['v', 100]
  }

  const formatted = {}
  for (const [name, value] of Object.entries(components)) {
    const format = formats[name]
    if (format) {
      const [abbreviation, scale] = format
      formatted[abbreviation] = value * (scale || 1)
    } else {
      formatted[name] = value
    }
  }

  return formatted
}

export function valueToColor(value, oldColor = {}) {
  const converter = new Color(
    isObject(value)
      ? formatColorComponents(value)
      : value
  )

  let hue = converter.hue()
  let saturation = converter.saturationv() / 100
  const brightness = converter.value() / 100 // value = brightness
  const alpha = converter.alpha()


  // If saturation or brightness is zero, we'll loose the hue information.
  if (saturation === 0)  {
    hue = oldColor.hue || 0
  }
  if (brightness === 0) {
    saturation = oldColor.saturation || 0
  }
  // For the color hue, 0 and 360 mean the same. But for a slider, there is a
  // difference. So we try to guess which one makes more sense based on the
  // previous value.
  if (hue === 0) {
    hue = (oldColor.hue > 180) ? 360 : 0
  }

  return { hue, saturation, brightness, alpha }
}


export function colorToValue(color) {
  const converter = new Color(formatColorComponents(color))

  const red = converter.red() / 255
  const green = converter.green() / 255
  const blue = converter.blue() / 255
  const alpha = converter.alpha()

  return { red, green, blue, alpha }
}

export function colorToCss(color) {
  return new Color(formatColorComponents(color)).string()
}

export const { isArray } = Array

export function isObject(val) {
  return !!val && typeof val === 'object' && !isArray(val)
}

export function isFunction(val) {
  return !!val && typeof val === 'function'
}

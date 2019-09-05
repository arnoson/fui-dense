export const mapValue = (value, rangeIn, rangeOut) => (
  (value - rangeIn.min) * (rangeOut.max - rangeOut.min) /
  (rangeIn.max - rangeIn.min) + rangeOut.min
)

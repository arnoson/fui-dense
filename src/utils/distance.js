export function getDistance(point1, point2) {
  const a = point1.x - point2.x
  const b = point1.y - point2.y
  const c = Math.sqrt(a * a + b * b)
  return c
}

export function getClosestPoint(points, targetPoint)  {
  const distances = points.map(point => getDistance(point, targetPoint))
  return points[distances.indexOf(Math.min(...distances))]
}

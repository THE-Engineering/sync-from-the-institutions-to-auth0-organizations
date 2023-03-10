const {
  memoryUsage
} = process

export function getHeapUsed () {
  const {
    heapUsed
  } = memoryUsage()

  return heapUsed
}

export function toKB (bytes) {
  return bytes / 1024
}

export function toMB (bytes) {
  return toKB(bytes) / 1024
}

export function toGB (bytes) {
  return toMB(bytes) / 1024
}

export function toPlaces (number, decimalPlaces = 0) {
  const n = Math.pow(10, decimalPlaces)

  return (
    Math.round(number * n) / n
  )
}

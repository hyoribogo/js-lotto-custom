const deepClone = (value) => {
  if (value === null || typeof value !== 'object') {
    return value
  }

  if (Array.isArray(value)) {
    return value.map(deepClone)
  }

  if (value instanceof Date) {
    return new Date(value)
  }

  if (value instanceof Map) {
    return new Map(
      Array.from(value.entries()).map(([k, v]) => [deepClone(k), deepClone(v)])
    )
  }

  if (value instanceof Set) {
    return new Set(Array.from(value.values()).map(deepClone))
  }

  const copiedObject = {}
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      copiedObject[key] = deepClone(value[key])
    }
  }

  return copiedObject
}

export default deepClone

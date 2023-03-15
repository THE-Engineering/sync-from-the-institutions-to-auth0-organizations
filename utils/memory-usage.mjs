import v8 from 'node:v8'

const {
  memoryUsage
} = process

export function getHeapTotal () {
  const {
    heapTotal
  } = memoryUsage()

  return heapTotal
}

export function getHeapUsed () {
  const {
    heapUsed
  } = memoryUsage()

  return heapUsed
}

export function getHeapSpaceNewSpacePercent () {
  const {
    space_size: spaceSize,
    space_used_size: spaceUsedSize
  } = getHeapSpaceNewSpaceStatistics()

  return (
    spaceUsedSize
      ? Math.round(100 / (spaceSize * spaceUsedSize))
      : 0
  )
}

export function getHeapSpaceOldSpacePercent () {
  const {
    space_size: spaceSize,
    space_used_size: spaceUsedSize
  } = getHeapSpaceOldSpaceStatistics()

  return spaceUsedSize ? Math.round(100 / (spaceSize * spaceUsedSize)) : 0
}

export function getHeapSpacePercent () {
  return {
    new_space: getHeapSpaceNewSpacePercent(),
    old_space: getHeapSpaceOldSpacePercent()
  }
}

const isNewSpace = ({ space_name: spaceName }) => spaceName === 'new_space'

const isOldSpace = ({ space_name: spaceName }) => spaceName === 'old_space'

export function getHeapSpaceNewSpaceStatistics (decimalPlaces) {
  const statistics = v8.getHeapSpaceStatistics()

  if (statistics.some(isNewSpace)) {
    const {
      space_size: spaceSize,
      space_used_size: spaceUsedSize,
      space_available_size: spaceAvailableSize,
      physical_space_size: physicalSpaceSize
    } = statistics.find(isNewSpace)

    return {
      space_size: toPlaces(toMB(spaceSize), decimalPlaces),
      space_used_size: toPlaces(toMB(spaceUsedSize), decimalPlaces),
      space_available_size: toPlaces(toMB(spaceAvailableSize), decimalPlaces),
      physical_space_size: toPlaces(toMB(physicalSpaceSize), decimalPlaces)
    }
  }
}

export function getHeapSpaceOldSpaceStatistics (decimalPlaces) {
  const statistics = v8.getHeapSpaceStatistics()

  if (statistics.some(isOldSpace)) {
    const {
      space_size: spaceSize,
      space_used_size: spaceUsedSize,
      space_available_size: spaceAvailableSize,
      physical_space_size: physicalSpaceSize
    } = statistics.find(isOldSpace)

    return {
      space_size: toPlaces(toMB(spaceSize), decimalPlaces),
      space_used_size: toPlaces(toMB(spaceUsedSize), decimalPlaces),
      space_available_size: toPlaces(toMB(spaceAvailableSize), decimalPlaces),
      physical_space_size: toPlaces(toMB(physicalSpaceSize), decimalPlaces)
    }
  }
}

export function getHeapStatisticsMB (decimalPlaces) {
  const {
    total_heap_size: totalHeapSize,
    total_heap_size_executable: totalHeapSizeExecutable,
    total_physical_size: totalPhysicalSize,
    total_available_size: totalAvailableSize,
    used_heap_size: usedHeapSize,
    heap_size_limit: heapSizeLimit,
    malloced_memory: mallocedMemory,
    peak_malloced_memory: peakMallocedMemory,
    does_zap_garbage: doesZapGarbage,
    number_of_native_contexts: numberOfNativeContexts,
    number_of_detached_contexts: numberOfDetachedContexts,
    total_global_handles_size: totalGlobalHandlesSize,
    used_global_handles_size: usedGlobalHandlesSize,
    external_memory: externalMemory
  } = v8.getHeapStatistics()

  return {
    total_heap_size: toPlaces(toMB(totalHeapSize), decimalPlaces),
    total_heap_size_executable: toPlaces(toMB(totalHeapSizeExecutable), decimalPlaces),
    total_physical_size: toPlaces(toMB(totalPhysicalSize), decimalPlaces),
    total_available_size: toPlaces(toMB(totalAvailableSize), decimalPlaces),
    used_heap_size: toPlaces(toMB(usedHeapSize), decimalPlaces),
    heap_size_limit: toPlaces(toMB(heapSizeLimit), decimalPlaces),
    malloced_memory: toPlaces(toMB(mallocedMemory), decimalPlaces),
    peak_malloced_memory: toPlaces(toMB(peakMallocedMemory), decimalPlaces),
    does_zap_garbage: doesZapGarbage,
    number_of_native_contexts: numberOfNativeContexts,
    number_of_detached_contexts: numberOfDetachedContexts,
    total_global_handles_size: toPlaces(toMB(totalGlobalHandlesSize), decimalPlaces),
    used_global_handles_size: toPlaces(toMB(usedGlobalHandlesSize), decimalPlaces),
    external_memory: toPlaces(toMB(externalMemory), decimalPlaces)
  }
}

export function getHeapTotalMB (decimalPlaces) {
  return toPlaces(toMB(getHeapTotal()), decimalPlaces)
}

export function getHeapUsedMB (decimalPlaces) {
  return toPlaces(toMB(getHeapUsed()), decimalPlaces)
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

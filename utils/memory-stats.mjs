import args from '#config/args'

import {
  getHeapStatisticsMB,
  getHeapTotalMB,
  getHeapUsedMB,
  getHeapSpacePercent,
} from './memory-usage.mjs'

export default function memoryStats() {
  const decimalPlaces = args.get('MEMORY_STATS_DECIMAL_PLACES')

  if (args.get('heap-statistics')) console.table(getHeapStatisticsMB(decimalPlaces))
  if (args.get('heap-total')) console.log(getHeapTotalMB(decimalPlaces))
  if (args.get('heap-used')) console.log(getHeapUsedMB(decimalPlaces))
  if (args.get('heap-percent')) console.table(getHeapSpacePercent())
}

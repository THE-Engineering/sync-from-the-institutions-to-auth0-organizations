#!/usr/bin/env node

import {
  isDeepStrictEqual
} from 'node:util'
import args from '#config/args'
import {
  THE_INSTITUTIONS_FILE_PATH as FILE_PATH,
  THE_INSTITUTIONS_ENDPOINT as ENDPOINT,
  THE_INSTITUTIONS_ENDPOINT_LIMIT as LIMIT,
  THE_INSTITUTIONS_ENDPOINT_COUNT as COUNT
} from '#config'
import sleepFor from '#utils/sleep-for'
import memoryStats from '#utils/memory-stats'
import {
  readInstitutionsFromFilePath,
  readInstitutionsFromEndpoint,
  writeInstitutionsToFilePath,
  getChangedInstitutions,
  getRemovedInstitutions,
  getAddedInstitutions
} from '#application/institutions'
import change from '#application/change'
import remove from '#application/remove'

async function app () {
  console.log('🚀')

  const was = await readInstitutionsFromFilePath(FILE_PATH)
  const now = await readInstitutionsFromEndpoint(ENDPOINT, LIMIT, COUNT)

  if (!isDeepStrictEqual(was, now)) {
    await change(getChangedInstitutions(was, now))
    await remove(getRemovedInstitutions(was, now))
    await change(getAddedInstitutions(was, now))

    await writeInstitutionsToFilePath(FILE_PATH, now)
  }
}

async function run () {
  if ('gc' in global) gc()

  await app()

  if (args.has('NAP')) {
    const nap = args.get('NAP')

    console.log(`😴 "I'm just resting my eyes until ${(new Date(Date.now() + nap)).toLocaleTimeString()}"`)

    memoryStats()

    await sleepFor(nap)
    setImmediate(run)
  }
}

const {
  pid
} = process

console.log(`🫡 in process ${pid}`)

export default run()

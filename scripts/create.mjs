#!/usr/bin/env node

import {
  THE_INSTITUTIONS_FILE_PATH as FILE_PATH,
  THE_INSTITUTIONS_ENDPOINT as ENDPOINT,
  THE_INSTITUTIONS_ENDPOINT_LIMIT as LIMIT,
  THE_INSTITUTIONS_ENDPOINT_COUNT as COUNT
} from '#config'
import {
  getRows,
  readInstitutionsFromEndpoint,
  writeInstitutionsToFilePath
} from '#application/institutions'
import change from '#application/change'

async function app () {
  console.log('🚀')

  const INSTITUTIONS = await readInstitutionsFromEndpoint(ENDPOINT, LIMIT, COUNT)

  await change([...getRows(INSTITUTIONS)]) // duplicate the array

  await writeInstitutionsToFilePath(FILE_PATH, INSTITUTIONS)

  console.log('👍')
}

const {
  pid
} = process

console.log(`🫡 in process ${pid}`)

export default app()

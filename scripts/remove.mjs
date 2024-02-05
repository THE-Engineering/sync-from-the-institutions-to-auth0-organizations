#!/usr/bin/env node

import {
  THE_INSTITUTIONS_FILE_PATH as FILE_PATH,
  THE_INSTITUTIONS_ENDPOINT as ENDPOINT,
  THE_INSTITUTIONS_ENDPOINT_LIMIT as LIMIT,
  THE_INSTITUTIONS_ENDPOINT_COUNT as COUNT,
} from '#config'
import {
  getRows,
  readInstitutionsFromEndpoint,
  deleteInstitutionsFromFilePath,
} from '#application/institutions'
import remove from '#application/remove'

async function app() {
  console.log('🚀')

  const INSTITUTIONS = await readInstitutionsFromEndpoint(ENDPOINT, LIMIT, COUNT)

  await remove(getRows(INSTITUTIONS)) // no need to duplicate the array

  await deleteInstitutionsFromFilePath(FILE_PATH)

  console.log('👍')
}

const { pid } = process

console.log(`🫡 in process ${pid}`)

export default app()

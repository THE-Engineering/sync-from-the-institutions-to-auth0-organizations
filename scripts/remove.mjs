#!/usr/bin/env node

import {
  THE_INSTITUTIONS_FILE_PATH as FILE_PATH,
  THE_INSTITUTIONS_ENDPOINT as ENDPOINT,
  THE_INSTITUTIONS_ENDPOINT_LIMIT as LIMIT,
  THE_INSTITUTIONS_ENDPOINT_COUNT as COUNT
} from '#config'
import {
  readInstitutionsFromEndpoint,
  deleteInstitutionsFromFilePath
} from '#application/institutions'
import remove from '#application/remove'

async function app () {
  console.log('🚀')

  const INSTIUTIONS = await readInstitutionsFromEndpoint(ENDPOINT, LIMIT, COUNT)
  const {
    rows: institutions = []
  } = INSTIUTIONS

  await remove(institutions) // no need to duplicate the array

  await deleteInstitutionsFromFilePath(FILE_PATH)

  console.log('👍')
}

const {
  pid
} = process

console.log(`🫡 in process ${pid}`)

export default app()

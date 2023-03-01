#!/usr/bin/env node

import {
  THE_INSTITUTIONS_FILE_PATH as FILE_PATH
} from '#config'
import {
  getOrganizations
} from '#application/organizations'
import {
  readInstitutionsFromFilePath
} from '#application/institutions'
import validate from '#application/validate'

async function app () {
  console.log('🚀')

  const organizations = await getOrganizations()
  const institutions = await readInstitutionsFromFilePath(FILE_PATH)

  const isValid = validate(organizations, institutions)

  console.log(isValid ? '👍' : '👎')

  return isValid
}

const {
  pid
} = process

console.log(`🫡 in process ${pid}`)

export default app()

#!/usr/bin/env node

import {
  THE_INSTITUTIONS_FILE_PATH as FILE_PATH
} from '#config'
import {
  readInstitutionsFromFilePath,
  getRows
} from '#application/institutions'
import {
  getOrganizations,
  validate
} from '#application/organizations'

function transformFromInstitutionToOrganization ({ iid: name, name: displayName }) {
  return {
    name,
    display_name: displayName
  }
}

function transformOrganization ({ name, display_name: displayName }) {
  return {
    name,
    display_name: displayName
  }
}

async function app () {
  console.log('🚀')

  const organizations = await getOrganizations()
  const institutions = await readInstitutionsFromFilePath(FILE_PATH)

  const was = organizations.map(transformOrganization)
  const now = getRows(institutions).map(transformFromInstitutionToOrganization)

  const isValid = validate(was, now)

  console.log(isValid ? '👍' : '👎')

  return isValid
}

const {
  pid
} = process

console.log(`🫡 in process ${pid}`)

export default app()

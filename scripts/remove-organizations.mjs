#!/usr/bin/env node

import { THE_INSTITUTIONS_FILE_PATH as FILE_PATH } from '#config'
import { getOrganizations } from '#application/organizations'
import { deleteInstitutionsFromFilePath } from '#application/institutions'
import removeOrganizations from '#application/remove-organizations'

async function app() {
  console.log('🚀')

  const ORGANIZATIONS = await getOrganizations()

  await removeOrganizations(ORGANIZATIONS)

  await deleteInstitutionsFromFilePath(FILE_PATH)

  console.log('👍')
}

const { pid } = process

console.log(`🫡 in process ${pid}`)

export default app()

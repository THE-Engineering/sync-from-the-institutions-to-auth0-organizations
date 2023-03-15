import {
  unlink
} from 'node:fs/promises'
import {
  STATUS_DIRECTORY_PATH
} from '#config'
import toStatusFilePath from '#utils/to-status-file-path'
import handleFilePathError from '#utils/handle-file-path-error'
import sleepFor, {
  ONE_SECOND,
  QUARTER_SECOND
} from '#utils/sleep-for'
import {
  getId as getInstitutionId
} from './institution.mjs'
import {
  getId as getOrganizationId,
  getOrganizationByName,
  deleteOrganizationById,
  getStatusCode
} from './organization.mjs'

const DURATION = ONE_SECOND + QUARTER_SECOND

export default async function remove (institutions) {
  while (institutions.length) {
    const institution = institutions.shift()
    const institutionId = getInstitutionId(institution)
    const organization = await getOrganizationByName(institutionId)

    console.log(`👉 ${institutionId}`)
    if (getStatusCode(organization) !== 404) {
      const organizationId = getOrganizationId(organization)

      try {
        await deleteOrganizationById(organizationId)
      } catch {
        institutions.push(institution)
      }

      try {
        await unlink(toStatusFilePath(STATUS_DIRECTORY_PATH, institutionId))
      } catch (e) {
        handleFilePathError(e)
      }
    }

    await sleepFor(DURATION)
  }
}

import {
  isDeepStrictEqual
} from 'node:util'
import {
  STATUS_PATH
} from '#config'
import toStatusFilePath from '#utils/to-status-file-path'
import toStatusFromError from '#utils/to-status-from-error'
import writeStatusToFilePath from '#utils/write-status-to-file-path'
import sleepFor, {
  ONE_SECOND,
  QUARTER_SECOND
} from '#utils/sleep-for'
import {
  getId as getInstitutionId,
  getDisplayName as getDisplayNameFromInstitution,
  getMetadata as getMetadataFromInstitution
} from './institution.mjs'
import {
  getDisplayName as getDisplayNameFromOrganization,
  getMetadata as getMetadataFromOrganization,
  createOrganization,
  getOrganizationByName,
  updateOrganizationById,
  getStatusCode
} from './organization.mjs'

const DURATION = ONE_SECOND + QUARTER_SECOND

export default async function change (institutions) {
  while (institutions.length) {
    const institution = institutions.shift()
    const institutionId = getInstitutionId(institution)
    const organization = await getOrganizationByName(institutionId)
    const displayName = getDisplayNameFromInstitution(institution)
    const metadata = getMetadataFromInstitution(institution)

    console.log(`👉 ${institutionId}`)
    if (getStatusCode(organization) === 404) {
      let status
      try {
        status = await createOrganization({ name: institutionId, display_name: displayName, metadata })
      } catch (e) {
        status = toStatusFromError(e)

        institutions.push(institution)
      }

      await writeStatusToFilePath(toStatusFilePath(STATUS_PATH, institutionId), status)
    } else {
      if (
        displayName !== getDisplayNameFromOrganization(organization) ||
        !isDeepStrictEqual(metadata, getMetadataFromOrganization(organization))) {
        const {
          id,
          ...rest
        } = organization

        let status
        try {
          status = await updateOrganizationById(id, { ...rest, name: institutionId, display_name: displayName, metadata })
        } catch (e) {
          status = toStatusFromError(e)

          institutions.push(institution)
        }

        await writeStatusToFilePath(toStatusFilePath(STATUS_PATH, institutionId), status)
      }
    }

    await sleepFor(DURATION)
  }
}

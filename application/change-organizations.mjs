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
  getDisplayName as getDisplayNameFromInstitution
} from './institution.mjs'
import {
  getDisplayName as getDisplayNameFromOrganization,
  createOrganization,
  updateOrganizationById
} from './organization.mjs'

const DURATION = ONE_SECOND + QUARTER_SECOND

export default async function changeOrganizations (organizations, institutions) {
  while (institutions.length) {
    const institution = institutions.shift()
    const institutionId = getInstitutionId(institution)

    function hasName ({ name }) {
      return name === institutionId
    }

    console.log(`👉 ${institutionId}`)
    if (organizations.some(hasName)) {
      const organization = organizations.find(hasName)
      const displayName = getDisplayNameFromInstitution(institution)

      if (
        displayName !== getDisplayNameFromOrganization(organization)) {
        const {
          id,
          ...rest
        } = organization

        let status
        try {
          status = await updateOrganizationById(id, { ...rest, name: institutionId, display_name: displayName })
        } catch (e) {
          status = toStatusFromError(e)

          institutions.push(institution)
        }

        await writeStatusToFilePath(toStatusFilePath(STATUS_PATH, institutionId), status)
      }
    } else {
      let status
      try {
        status = await createOrganization({ name: institutionId, display_name: getDisplayNameFromInstitution(institution) })
      } catch (e) {
        status = toStatusFromError(e)

        institutions.push(institution)
      }

      await writeStatusToFilePath(toStatusFilePath(STATUS_PATH, institutionId), status)
    }

    await sleepFor(DURATION)
  }
}

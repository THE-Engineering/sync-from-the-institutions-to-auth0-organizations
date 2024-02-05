import { STATUS_DIRECTORY_PATH } from '#config'
import toStatusFilePath from '#utils/to-status-file-path'
import toStatusFromError from '#utils/to-status-from-error'
import writeStatusToFilePath from '#utils/write-status-to-file-path'
import sleepFor, { ONE_SECOND, QUARTER_SECOND } from '#utils/sleep-for'
import {
  getId as getInstitutionId,
  getName as getInstitutionName,
  createMetaData,
} from './institution.mjs'
import {
  getDisplayName as getOrganizationDisplayName,
  createOrganization,
  getOrganizationByName,
  updateOrganizationById,
  getStatusCode,
  getMetadata,
} from './organization.mjs'
import { hasChangedMetaData } from './organization.mjs'

const DURATION = ONE_SECOND + QUARTER_SECOND

export default async function change(institutions) {
  while (institutions.length) {
    const institution = institutions.shift()
    const institutionId = getInstitutionId(institution)
    const institutionName = getInstitutionName(institution)
    const organization = await getOrganizationByName(institutionId)
    const organizationMetaData = getMetadata(organization)
    const targetInstitutionMetaData = createMetaData(institution, organizationMetaData)
    const statusCode = getStatusCode(organization)

    if (statusCode === 403) throw new Error('FORBIDDEN')

    console.log(`👉 ${institutionId || '-'} "${(institutionName || '-').trim()}"`)
    if (statusCode === 404) {
      let status
      try {
        status = await createOrganization({
          name: institutionId,
          display_name: institutionName,
          metadata: targetInstitutionMetaData,
        })
      } catch (e) {
        status = toStatusFromError(e)

        institutions.push(institution)
      }

      await writeStatusToFilePath(
        toStatusFilePath(STATUS_DIRECTORY_PATH, institutionId),
        status,
      )
    } else {
      const institutionId = getInstitutionId(institution)
      const institutionName = getInstitutionName(institution)
      const organizationMetaData = getMetadata(organization)
      const targetInstitutionMetaData = createMetaData(institution, organizationMetaData)

      if (
        institutionName !== getOrganizationDisplayName(organization) ||
        hasChangedMetaData(organizationMetaData, targetInstitutionMetaData)
      ) {
        const { id, ...rest } = organization

        let status
        try {
          status = await updateOrganizationById(id, {
            ...rest,
            name: institutionId,
            display_name: institutionName,
            metadata: targetInstitutionMetaData,
          })
        } catch (e) {
          status = toStatusFromError(e)

          institutions.push(institution)
        }

        await writeStatusToFilePath(
          toStatusFilePath(STATUS_DIRECTORY_PATH, institutionId),
          status,
        )
      }
    }

    await sleepFor(DURATION)
  }
}

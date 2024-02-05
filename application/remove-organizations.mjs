import { STATUS_DIRECTORY_PATH } from '#config'
import toStatusFromError from '#utils/to-status-from-error'
import toStatusFilePath from '#utils/to-status-file-path'
import writeStatusToFilePath from '#utils/write-status-to-file-path'
import sleepFor, { ONE_SECOND, QUARTER_SECOND } from '#utils/sleep-for'
import { deleteOrganizationById } from './organization.mjs'

const DURATION = ONE_SECOND + QUARTER_SECOND

export default async function removeOrganizations(organizations) {
  while (organizations.length) {
    const organization = organizations.shift()
    const { name, id } = organization

    console.log(`👉 ${name}`)

    let status
    try {
      status = await deleteOrganizationById(id)
    } catch (e) {
      status = toStatusFromError(e)

      organizations.push(organization)
    }

    await writeStatusToFilePath(toStatusFilePath(STATUS_DIRECTORY_PATH, name), status)

    await sleepFor(DURATION)
  }
}

import { STATUS_DIRECTORY_PATH } from '#config';
import toStatusFromError from '#utils/to-status-from-error';
import toStatusFilePath from '#utils/to-status-file-path';
import writeStatusToFilePath from '#utils/write-status-to-file-path';
import sleepFor, { ONE_SECOND, QUARTER_SECOND } from '#utils/sleep-for';
import { getId as getInstitutionId } from './institution.mjs';
import {
  getId as getOrganizationId,
  getOrganizationByName,
  deleteOrganizationById,
  getStatusCode,
} from './organization.mjs';

const DURATION = ONE_SECOND + QUARTER_SECOND;

export default async function remove(institutions) {
  while (institutions.length) {
    const institution = institutions.shift();
    const institutionId = getInstitutionId(institution);
    const organization = await getOrganizationByName(institutionId);
    const statusCode = getStatusCode(organization);

    if (statusCode === 403) throw new Error('FORBIDDEN');

    console.log(`👉 ${institutionId || '-'}`);
    if (getStatusCode(organization) !== 404) {
      const organizationId = getOrganizationId(organization);

      let status;
      try {
        status = await deleteOrganizationById(organizationId);
      } catch (e) {
        status = toStatusFromError(e);

        institutions.push(institution);
      }

      await writeStatusToFilePath(
        toStatusFilePath(STATUS_DIRECTORY_PATH, institutionId),
        status,
      );
    }

    await sleepFor(DURATION);
  }
}

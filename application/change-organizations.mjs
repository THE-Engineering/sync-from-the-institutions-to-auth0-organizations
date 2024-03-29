import { STATUS_DIRECTORY_PATH } from '#config';
import toStatusFromError from '#utils/to-status-from-error';
import toStatusFilePath from '#utils/to-status-file-path';
import writeStatusToFilePath from '#utils/write-status-to-file-path';
import sleepFor, { ONE_SECOND, QUARTER_SECOND } from '#utils/sleep-for';
import {
  getId as getInstitutionId,
  getName as getInstitutionName,
  createMetaData,
} from './institution.mjs';
import {
  getDisplayName as getOrganizationDisplayName,
  createOrganization,
  updateOrganizationById,
  hasChangedMetaData,
  getMetadata,
} from './organization.mjs';

const DURATION = ONE_SECOND + QUARTER_SECOND;

export default async function changeOrganizations(institutions, organizations) {
  while (institutions.length) {
    const institution = institutions.shift();
    const institutionId = getInstitutionId(institution);

    function hasName({ name }) {
      return name === institutionId;
    }

    console.log(`👉 ${institutionId}`);

    const organization = organizations.find(hasName);

    if (organization) {
      const institutionName = getInstitutionName(institution);
      const organizationMetaData = getMetadata(organization);
      const targetInstitutionMetaData = createMetaData(institution, organizationMetaData);

      if (
        institutionName !== getOrganizationDisplayName(organization) ||
        hasChangedMetaData(organizationMetaData, targetInstitutionMetaData)
      ) {
        const { id, ...rest } = organization;

        let status;
        try {
          status = await updateOrganizationById(id, {
            ...rest,
            name: institutionId,
            display_name: institutionName,
            metadata: targetInstitutionMetaData,
          });
        } catch (e) {
          status = toStatusFromError(e);

          institutions.push(institution);
        }

        await writeStatusToFilePath(
          toStatusFilePath(STATUS_DIRECTORY_PATH, institutionId),
          status,
        );
      }
    } else {
      let status;
      try {
        status = await createOrganization({
          name: institutionId,
          display_name: getInstitutionName(institution),
          metadata: createMetaData(institution),
        });
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

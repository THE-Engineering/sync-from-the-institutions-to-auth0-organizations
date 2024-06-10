import { STATUS_DIRECTORY_PATH, CONNECTION_NAME } from '#config';
import toStatusFilePath from '#utils/to-status-file-path';
import toStatusFromError from '#utils/to-status-from-error';
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
  getOrganizationByName,
  updateOrganizationById,
  addConnectionToOrg,
  getStatusCode,
  getMetadata,
  hasChangedMetaData,
} from './organization.mjs';
import { getConnectionByName, connectionIsEnabledForOrg } from '#application/connection';

const DURATION = ONE_SECOND + QUARTER_SECOND;

export default async function change(institutions) {
  let connection;

  if (CONNECTION_NAME) {
    connection = await getConnectionByName(CONNECTION_NAME);

    if (!connection) {
      throw new Error(`Connection "${CONNECTION_NAME}" not found`);
    }
  }

  while (institutions.length) {
    const institution = institutions.shift();
    const institutionId = getInstitutionId(institution);
    const institutionName = getInstitutionName(institution);
    const organization = await getOrganizationByName(institutionId);
    const organizationMetaData = getMetadata(organization);
    const targetInstitutionMetaData = createMetaData(institution, organizationMetaData);
    const statusCode = getStatusCode(organization);

    if (statusCode === 403) throw new Error('FORBIDDEN');

    console.log(`👉 ${institutionId || '-'} "${(institutionName || '-').trim()}"`);

    if (statusCode === 404) {
      let status;
      try {
        status = await createOrganization({
          name: institutionId,
          display_name: institutionName,
          metadata: targetInstitutionMetaData,
          ...(connection
            ? {
                enabled_connections: [
                  {
                    connection_id: connection.id,
                    assign_membership_on_login: false,
                  },
                ],
              }
            : {}),
        });
      } catch (e) {
        status = toStatusFromError(e);

        institutions.push(institution);
      }

      await writeStatusToFilePath(
        toStatusFilePath(STATUS_DIRECTORY_PATH, institutionId),
        status,
      );
    } else {
      const institutionId = getInstitutionId(institution);
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

      if (connection) {
        try {
          if (await connectionIsEnabledForOrg(organization.id, connection.id)) {
            console.log(
              `💪 Connection "${connection.id}" is already enabled for "${organization.id}" (${institutionName})`,
            );
          } else {
            console.log(
              `👉 Connection "${connection.id}" is not enabled for "${organization.id} (${institutionName}), enabling...`,
            );

            const status = addConnectionToOrg(organization.id, {
              connection_id: connection.id,
              assign_membership_on_login: false,
            });

            await writeStatusToFilePath(
              toStatusFilePath(STATUS_DIRECTORY_PATH, `${institutionId}-connection`),
              status,
            );
          }
        } catch (e) {
          institutions.push(institution);
          await writeStatusToFilePath(
            toStatusFilePath(STATUS_DIRECTORY_PATH, `${institutionId}-connection`),
            toStatusFromError(e),
          );
        }
      }
    }

    await sleepFor(DURATION);
  }
}

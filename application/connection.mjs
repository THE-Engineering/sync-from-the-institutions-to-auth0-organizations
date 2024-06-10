import { AUTH0_DOMAIN } from '#config';
import getHeaders from '#utils/get-headers';
import { throwOnError } from '#utils/throw-on-error';
import { withRetries } from '#utils/with-retries';

export async function getConnectionByName(name) {
  /**
   *  https://auth0.com/docs/api/management/v2/connections/get-connections
   */
  return withRetries({
    operation: async () => {
      const url = new URL(`https://${AUTH0_DOMAIN}/api/v2/connections`);
      url.searchParams.set('name', name);

      const response = await fetch(url, { headers: await getHeaders() });
      await throwOnError(response);
      const connections = await response.json();
      return connections[0];
    },
    operationDescription: 'getConnectionByName',
  });
}

export async function connectionIsEnabledForOrg(organizationId, connectionId) {
  /**
   *  https://auth0.com/docs/api/management/v2/organizations/get-enabled-connections-by-connection-id
   */
  return withRetries({
    operation: async () => {
      const url = new URL(
        `https://${AUTH0_DOMAIN}/api/v2/organizations/${organizationId}/enabled_connections/${connectionId}`,
      );
      const response = await fetch(url, { headers: await getHeaders() });
      await throwOnError(response);

      return response.ok;
    },
    operationDescription: 'connectionIsEnabledForOrg',
  });
}

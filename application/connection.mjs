import { AUTH0_DOMAIN } from '#config';
import getHeaders from '#utils/get-headers';

export async function getConnectionByName(name) {
  /**
   *  https://auth0.com/docs/api/management/v2/connections/get-connections
   */
  const url = new URL(`https://${AUTH0_DOMAIN}/api/v2/connections`);
  url.searchParams.set('name', name);

  const response = await fetch(url, { headers: await getHeaders() });
  const connections = await response.json();
  return connections[0];
}

export async function connectionIsEnabledForOrg(organizationId, connectionId) {
  /**
   *  https://auth0.com/docs/api/management/v2/organizations/get-enabled-connections-by-connection-id
   */
  const url = new URL(
    `https://${AUTH0_DOMAIN}/api/v2/organizations/${organizationId}/enabled_connections/${connectionId}`,
  );
  const response = await fetch(url, { headers: await getHeaders() });

  return response.ok;
}

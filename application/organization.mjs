import { isDeepStrictEqual } from 'node:util';
import { AUTH0_DOMAIN } from '#config';
import getHeaders from '#utils/get-headers';
import { throwOnError } from '#utils/throw-on-error';
import { withRetries } from '#utils/with-retries';

export function getId({ id }) {
  return id;
}

export function getName({ name }) {
  return name;
}

export function getDisplayName({ display_name: displayName }) {
  return displayName;
}

export function getMetadata({ metadata }) {
  return metadata;
}

export function getStatusCode({ statusCode }) {
  return statusCode;
}

export async function createOrganization(organization) {
  const operation = async () => {
    const response = await fetch(`https://${AUTH0_DOMAIN}/api/v2/organizations`, {
      method: 'POST',
      headers: await getHeaders(),
      body: JSON.stringify(organization),
    });

    await throwOnError(response);
    return response.json();
  };

  return withRetries({
    operation,
    operationDescription: 'createOrganization'
  })
}

export async function getOrganizationByName(name) {
  const operation = async () => {
    const response = await fetch(
      `https://${AUTH0_DOMAIN}/api/v2/organizations/name/${name}`,
      {
        headers: await getHeaders(),
      },
    );

    await throwOnError(response);
    return response.json();
  }

  return withRetries({
    operation,
    operationDescription: 'createOrganization'
  })
}

export async function updateOrganizationById(id, organization) {
  const operation = async () => {
    const response = await fetch(`https://${AUTH0_DOMAIN}/api/v2/organizations/${id}`, {
      method: 'PATCH',
      headers: await getHeaders(),
      body: JSON.stringify(organization),
    });

    await throwOnError(response);
    return response.json();
  }

  return withRetries({
    operation,
    operationDescription: 'updateOrganizationById'
  })
}

export async function addConnectionToOrg(id, connection) {
  const operation = async () => {
    /**
     *  https://auth0.com/docs/api/management/organizations/{id}/enabled_connections
     */
    const url = new URL(
      `https://${AUTH0_DOMAIN}/api/v2/organizations/${id}/enabled_connections`,
    );

    const response = await fetch(url, {
      method: 'POST',
      headers: await getHeaders(),
      body: JSON.stringify(connection),
    });

    await throwOnError(response);
    return response.json();
  }

  return withRetries({
    operation,
    operationDescription: 'addConnectionToOrg'
  })
}

export async function deleteOrganizationById(id) {
  const operation = async () => {

    const response = fetch(`https://${AUTH0_DOMAIN}/api/v2/organizations/${id}`, {
      method: 'DELETE',
      headers: await getHeaders(),
    });

    await throwOnError(response);
    return response;
  };

  return withRetries({
    operation,
    operationDescription: 'deleteOrganizationById'
  })
}

export function hasChangedMetaData(organizationMetaData, targetMetaData) {
  return !isDeepStrictEqual(organizationMetaData, targetMetaData);
}

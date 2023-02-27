import {
  AUTH0_DOMAIN
} from '#config'
import getHeaders from '#utils/get-headers'

export function getId ({ id }) {
  return id
}

export function getDisplayName ({ display_name: displayName }) {
  return displayName
}

export function getMetadata ({ metadata }) {
  return metadata
}

export function getStatusCode ({ statusCode }) {
  return statusCode
}

export async function createOrganization (organization) {
  const response = await fetch(`https://${AUTH0_DOMAIN}/api/v2/organizations`, {
    method: 'POST',
    headers: await getHeaders(),
    body: JSON.stringify(organization)
  })

  return response.json()
}

export async function getOrganizationByName (name) {
  const response = await fetch(`https://${AUTH0_DOMAIN}/api/v2/organizations/name/${name}`, {
    headers: await getHeaders()
  })

  return response.json()
}

export async function updateOrganizationById (id, organization) {
  const response = await fetch(`https://${AUTH0_DOMAIN}/api/v2/organizations/${id}`, {
    method: 'PATCH',
    headers: await getHeaders(),
    body: JSON.stringify(organization)
  })

  return response.json()
}

export async function deleteOrganizationById (id) {
  return fetch(`https://${AUTH0_DOMAIN}/api/v2/organizations/${id}`, {
    method: 'DELETE',
    headers: await getHeaders()
  })
}

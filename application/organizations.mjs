import { isDeepStrictEqual } from 'node:util'
import { URL } from 'node:url'
import { AUTH0_DOMAIN } from '#config'
import getHeaders from '#utils/get-headers'
import sleepFor, { ONE_SECOND } from '#utils/sleep-for'
import { getName as getOrganizationName } from './organization.mjs'

export async function getOrganizations(from, accumulator = []) {
  /**
   *  https://auth0.com/docs/api/management/v2#!/Organizations/get_organizations
   *  We use Checkpoint Pagination to get the complete list (while aware of the
   *  rate limits)
   */
  const url = new URL('/api/v2/organizations', `https://${AUTH0_DOMAIN}`)

  url.search = new URLSearchParams({
    take: 50,
    ...(from ? { from } : {}),
  })

  const response = await fetch(url, {
    headers: await getHeaders(),
  })

  const { next, organizations } = await response.json()

  if (next) {
    await sleepFor(ONE_SECOND)

    return getOrganizations(
      next,
      organizations ? accumulator.concat(organizations) : accumulator,
    )
  }

  return organizations ? accumulator.concat(organizations) : accumulator
}

export function getChangedOrganizations(alpha = [], omega = []) {
  return alpha.reduce((accumulator, organizationAlpha) => {
    const organizationName = getOrganizationName(organizationAlpha)

    function hasOrganizationName(organization) {
      return getOrganizationName(organization) === organizationName
    }

    if (omega.some(hasOrganizationName)) {
      const organizationOmega = omega.find(hasOrganizationName)

      return isDeepStrictEqual(organizationAlpha, organizationOmega)
        ? accumulator
        : accumulator.concat(organizationOmega)
    }

    return accumulator
  }, [])
}

export function hasChangedOrganizations(alpha = [], omega = []) {
  return !alpha.every((organizationAlpha) => {
    const organizationName = getOrganizationName(organizationAlpha)

    function hasOrganizationName(organization) {
      return getOrganizationName(organization) === organizationName
    }

    if (omega.some(hasOrganizationName)) {
      const organizationOmega = omega.find(hasOrganizationName)

      return isDeepStrictEqual(organizationAlpha, organizationOmega)
    }

    return true
  })
}

export function getRemovedOrganizations(alpha = [], omega = []) {
  return alpha.reduce((accumulator, organization) => {
    const organizationName = getOrganizationName(organization)

    return omega.some(
      (organization) => getOrganizationName(organization) === organizationName,
    )
      ? accumulator
      : accumulator.concat(organization)
  }, [])
}

export function hasRemovedOrganizations(alpha = [], omega = []) {
  return !alpha.every((organization) => {
    const organizationName = getOrganizationName(organization)

    return omega.some(
      (organization) => getOrganizationName(organization) === organizationName,
    )
  })
}

export function getAddedOrganizations(alpha = [], omega = []) {
  return omega.reduce((accumulator, organization) => {
    const organizationName = getOrganizationName(organization)

    return alpha.some(
      (organization) => getOrganizationName(organization) === organizationName,
    )
      ? accumulator
      : accumulator.concat(organization)
  }, [])
}

export function hasAddedOrganizations(alpha = [], omega = []) {
  return !omega.every((organization) => {
    const organizationName = getOrganizationName(organization)

    return alpha.some(
      (organization) => getOrganizationName(organization) === organizationName,
    )
  })
}

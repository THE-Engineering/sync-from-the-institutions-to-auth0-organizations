import {
  getName as getOrganizationName,
  getDisplayName as getOrganizationDisplayName,
} from './organization.mjs'
import {
  getId as getInstitutionId,
  getName as getInstitutionName,
} from './institution.mjs'
import { getRows } from './institutions.mjs'

export function hasChanged(organizations = [], institutions = {}) {
  return !organizations.every((organization) => {
    const organizationName = getOrganizationName(organization)

    function hasInstitutionId(institution) {
      return getInstitutionId(institution) === organizationName
    }

    if (getRows(institutions).some(hasInstitutionId)) {
      const institution = getRows(institutions).find(hasInstitutionId)

      return getOrganizationDisplayName(organization) === getInstitutionName(institution)
    }

    return true
  })
}

export function hasRemoved(organizations = [], institutions = {}) {
  return !organizations.every((organization) => {
    const organizationName = getOrganizationName(organization)

    return getRows(institutions).some(
      (institution) => getInstitutionId(institution) === organizationName,
    )
  })
}

export function hasAdded(organizations = [], institutions = {}) {
  return !getRows(institutions).every((institution) => {
    const institutionId = getInstitutionId(institution)

    return organizations.some(
      (organization) => getOrganizationName(organization) === institutionId,
    )
  })
}

export default function validate(organizations = [], institutions = {}) {
  return !(
    hasChanged(organizations, institutions) ||
    hasRemoved(organizations, institutions) ||
    hasAdded(organizations, institutions)
  )
}

import {
  URL
} from 'node:url'
import {
  AUTH0_DOMAIN
} from '#config'
import getHeaders from '#utils/get-headers'
import sleepFor, {
  ONE_SECOND
} from '#utils/sleep-for'

export async function getOrganizations (from, accumulator = []) {
  /**
   *  https://auth0.com/docs/api/management/v2#!/Organizations/get_organizations
   *  We use Checkpoint Pagination to get the complete list (while aware of the
   *  rate limits)
   */
  const url = new URL('/api/v2/organizations', `https://${AUTH0_DOMAIN}`)

  url.search = new URLSearchParams({
    take: 50,
    ...(from ? { from } : {})
  })

  const response = await fetch(url, {
    headers: await getHeaders()
  })

  const {
    next,
    organizations
  } = await response.json()

  if (next) {
    await sleepFor(ONE_SECOND)

    return (
      getOrganizations(next, accumulator.concat(organizations))
    )
  }

  return accumulator.concat(organizations)
}

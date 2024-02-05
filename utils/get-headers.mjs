import { AUTH0_ACCESS_TOKEN } from '#config'
import getAccessToken from './get-access-token.mjs'

export default async function getHeaders() {
  return {
    Authorization: `Bearer ${AUTH0_ACCESS_TOKEN || (await getAccessToken())}`,
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
  }
}

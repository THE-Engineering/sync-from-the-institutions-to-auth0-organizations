import {
  AUTH0_ACCESS_TOKEN_ENDPOINT,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_AUDIENCE,
} from '#config';

let AUTHORIZATION = {};
let AUTHORIZED_AT = 0;

// offset to attempt to refresh the authorisation before it actually expires,
// so we never end up with expired credentials even when there is a slight
// delay in the refresh
const EARLY_REFRESH_OFFSET = 5000;

function isExpired({ expires_in: expiresIn = 0 } = {}) {
  /*
   *  `expiresIn` is a number of SECONDS
   *  `authorisedAt` is a number representing a date in MILLISECONDS
   */
  return AUTHORIZED_AT + expiresIn * 1000 - EARLY_REFRESH_OFFSET < Date.now();
}

function isAuthorized({ access_token: accessToken } = {}) {
  /**
   *  `accessToken` is a required field in the authorisation response
   *  so its absence means we are not authorised and should halt
   */
  return Boolean(accessToken);
}

// https://auth0.com/docs/secure/tokens/access-tokens/get-management-api-access-tokens-for-production
async function getAuthorizationFromResource() {
  const response = await fetch(AUTH0_ACCESS_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: AUTH0_CLIENT_ID,
      client_secret: AUTH0_CLIENT_SECRET,
      audience: AUTH0_AUDIENCE,
      grant_type: 'client_credentials',
    }),
  });

  return await response.json();
}

async function getAuthorization() {
  if (isExpired(AUTHORIZATION)) {
    console.log("Refreshing expired authorisation from auth0...")
    AUTHORIZATION = await getAuthorizationFromResource();
    if (!isAuthorized(AUTHORIZATION)) {
      console.log("Invalid authorisation received from auth0, this is a fatal error.")
      throw new Error('NOT_AUTHORIZED');
    }
    AUTHORIZED_AT = Date.now();
  }

  return AUTHORIZATION;
}

export default async function getAccessToken() {
  const { access_token: accessToken } = await getAuthorization();

  return accessToken;
}

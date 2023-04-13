# sync-from-the-institutions-to-auth0-organizations

## `remove`

This application gets the Institutions reference data to remove matching Organizations from Auth0

It does not repeat

You may use either a [manual or programmatic access token](https://auth0.com/docs/secure/tokens/access-tokens/management-api-access-tokens)

### Starting with a manual token

With NPM

```bash
npm run remove -- \
  --AUTH0_DOMAIN '<AUTH0 DOMAIN>' \
  --AUTH0_ACCESS_TOKEN '<AUTH0 MANUAL ACCESS TOKEN>'
```

Otherwise

```bash
./scripts/remove.mjs \
  --AUTH0_DOMAIN '<AUTH0 DOMAIN>' \
  --AUTH0_ACCESS_TOKEN '<AUTH0 MANUAL ACCESS TOKEN>'
```

### Starting with a programmatic token

See `sync` for how to get a programmatic token

With NPM

```bash
npm run remove -- \
  --AUTH0_DOMAIN '<AUTH0 DOMAIN>' \
  --AUTH0_CLIENT_ID '<AUTH0 CLIENT ID>' \
  --AUTH0_CLIENT_SECRET '<AUTH0 CLIENT SECRET>' \
  --AUTH0_AUDIENCE '<AUTH0 AUDIENCE>' \
  --AUTH0_ACCESS_TOKEN_ENDPOINT '<AUTH0 RESOURCE>'
```

Otherwise

```bash
./scripts/remove.mjs \
  --AUTH0_DOMAIN '<AUTH0 DOMAIN>' \
  --AUTH0_CLIENT_ID '<AUTH0 CLIENT ID>' \
  --AUTH0_CLIENT_SECRET '<AUTH0 CLIENT SECRET>' \
  --AUTH0_AUDIENCE '<AUTH0 AUDIENCE>' \
  --AUTH0_ACCESS_TOKEN_ENDPOINT '<AUTH0 RESOURCE>'
```

# sync-from-the-institutions-to-auth0-organizations

Watches a THE reference data endpoint to syncronise with Auth0

## Features

### Start

- [Sync](docs/sync.md)

You may start with either a [manual token](docs/sync.md#starting-with-a-manual-token) or a [programmatic token](docs/sync.md#starting-with-a-programmatic-token)

### Other tasks

- [Create](docs/create.md)
- [Remove](docs/remove.md)
- [Validate](docs/validate.md)

## Parameters

- [Nap](docs/parameters/nap.md)
- [Institutions endpoint](docs/parameters/institutions-endpoint.md)
- [Stats](docs/parameters/stats.md)

## Docker

### Building the Docker image

```bash
docker build -t sync-from-the-institutions-to-auth0-organizations .
```

### Starting the Docker container

```bash
docker compose up -d
```

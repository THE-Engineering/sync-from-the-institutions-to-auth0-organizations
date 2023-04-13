import args from './args.mjs'

import {
  DEFAULT_THE_INSTITUTIONS_FILE_PATH,
  DEFAULT_THE_INSTITUTIONS_ENDPOINT,
  DEFAULT_THE_INSTITUTIONS_ENDPOINT_LIMIT,
  DEFAULT_THE_INSTITUTIONS_ENDPOINT_COUNT,
  DEFAULT_STATUS_DIRECTORY_PATH,
  DEFAULT_MEMORY_STATS_DECIMAL_PLACES
} from './defaults.mjs'

if (!args.has('AUTH0_DOMAIN')) throw new Error('Parameter `AUTH0_DOMAIN` is required')
export const AUTH0_DOMAIN = args.get('AUTH0_DOMAIN')

let AUTH0_ACCESS_TOKEN_ENDPOINT
let AUTH0_CLIENT_ID
let AUTH0_CLIENT_SECRET
let AUTH0_AUDIENCE
let AUTH0_ACCESS_TOKEN

if (args.has('AUTH0_ACCESS_TOKEN_ENDPOINT')) {
  AUTH0_ACCESS_TOKEN_ENDPOINT = args.get('AUTH0_ACCESS_TOKEN_ENDPOINT')

  if (!args.has('AUTH0_CLIENT_ID')) throw new Error('Parameter `AUTH0_CLIENT_ID` is required')
  AUTH0_CLIENT_ID = args.get('AUTH0_CLIENT_ID')

  if (!args.has('AUTH0_CLIENT_SECRET')) throw new Error('Parameter `AUTH0_CLIENT_SECRET` is required')
  AUTH0_CLIENT_SECRET = args.get('AUTH0_CLIENT_SECRET')

  if (!args.has('AUTH0_AUDIENCE')) throw new Error('Parameter `AUTH0_AUDIENCE` is required')
  AUTH0_AUDIENCE = args.get('AUTH0_AUDIENCE')
} else {
  if (!args.has('AUTH0_ACCESS_TOKEN')) throw new Error('Parameter `AUTH0_ACCESS_TOKEN` is required')
  AUTH0_ACCESS_TOKEN = args.get('AUTH0_ACCESS_TOKEN')
}

export const THE_INSTITUTIONS_FILE_PATH = (
  args.has('THE_INSTITUTIONS_FILE_PATH')
    ? args.get('THE_INSTITUTIONS_FILE_PATH')
    : DEFAULT_THE_INSTITUTIONS_FILE_PATH
)

export const THE_INSTITUTIONS_ENDPOINT = (
  args.has('THE_INSTITUTIONS_ENDPOINT')
    ? args.get('THE_INSTITUTIONS_ENDPOINT')
    : DEFAULT_THE_INSTITUTIONS_ENDPOINT // Prod, cached with Fastly
)

export const THE_INSTITUTIONS_ENDPOINT_LIMIT = (
  args.has('THE_INSTITUTIONS_ENDPOINT_LIMIT')
    ? args.get('THE_INSTITUTIONS_ENDPOINT_LIMIT')
    : DEFAULT_THE_INSTITUTIONS_ENDPOINT_LIMIT
)

export const THE_INSTITUTIONS_ENDPOINT_COUNT = (
  args.has('THE_INSTITUTIONS_ENDPOINT_COUNT')
    ? args.get('THE_INSTITUTIONS_ENDPOINT_COUNT')
    : DEFAULT_THE_INSTITUTIONS_ENDPOINT_COUNT
)

export const MEMORY_STATS_DECIMAL_PLACES = (
  args.has('MEMORY_STATS_DECIMAL_PLACES')
    ? args.get('MEMORY_STATS_DECIMAL_PLACES')
    : DEFAULT_MEMORY_STATS_DECIMAL_PLACES
)

export const STATUS_DIRECTORY_PATH = (
  args.has('STATUS_DIRECTORY_PATH')
    ? args.get('STATUS_DIRECTORY_PATH')
    : DEFAULT_STATUS_DIRECTORY_PATH
)

export {
  AUTH0_ACCESS_TOKEN_ENDPOINT,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_AUDIENCE,
  AUTH0_ACCESS_TOKEN
}

{
  const SIGNALS = [
    'SIGINT',
    'SIGQUIT',
    'SIGTERM'
  ]

  const {
    stdout
  } = process

  SIGNALS
    .forEach((signal) => {
      process.on(signal, () => {
        try {
          stdout.cursorTo(0)
          console.log('👋')
        } catch {
          console.log('✨')
        }

        process.exit()
      })
    })
}

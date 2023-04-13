# sync-from-the-institutions-to-auth0-organizations

## Nap

The `NAP` argument is a number of milliseconds. There is no default value

Without a _nap_ the `sync` application will run once and stop

With a _nap_ the `sync` application will run then halt (for the duration of the `NAP`) then run again

Neither `create` nor `remove` implement the `NAP` argument

In development you may prefer to omit the `NAP` argument, but in production you are likely to require it

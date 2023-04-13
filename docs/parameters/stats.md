# sync-from-the-institutions-to-auth0-organizations

## Stats

You can monitor _heap_ memory usage with some boolean environment variables or command line arguments

### `heap-statistics`

Prints a _table_ of memory usage statistics _in MB_ to the console

### `heap-total`

Prints a _number_ which is the heap total _size in MB_ to the console

### `heap-used`

Prints a _number_ which is the heap used _size in MB_ to the console

### `heap-percent`

Prints a _table_ which has the `old_space` and `new_space` _percent_ to the console

### As environment variables

Omission of an environment variable implies its default value of `false`

```dotenv
heap-statistics=true
heap-total=false
heap-used=false
heap-percent=true
```

### As command line arguments

Omission of a command line argument implies its default value of `false`

```shell
npm run sync -- \
  heap-statistics \
  heap-total false \
  heap-used false \
  heap-percent
```

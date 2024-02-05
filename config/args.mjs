import nconf from 'nconf';

/**
 *  We could do this with `yargs-parser`
 *
 *    new Map(Object.entries(Object.assign({}, yargsParser(process.argv), process.env)))
 *
 *  But we may as well just use `nconf`
 */

function transform({ key, value }) {
  if (
    key === 'heap-statistics' ||
    key === 'heap-total' ||
    key === 'heap-used' ||
    key === 'heap-percent'
  ) {
    return {
      key,
      value: String(value) === 'true',
    };
  }

  if (key === 'NAP') {
    return {
      key,
      value: Number(value),
    };
  }

  return {
    key,
    value,
  };
}

const args = nconf.argv({ transform }).env({ transform }).get();

export default new Map(Object.entries(args));

import nconf from 'nconf'

/**
 *  We could do this with `yargs-parser`
 *
 *    new Map(Object.entries(Object.assign({}, yargsParser(process.argv), process.env)))
 *
 *  But in that case we may as well use `nconf`
 */

export default new Map(Object.entries(nconf.argv().env().get()))

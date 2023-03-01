import {
  dirname
} from 'node:path'
import {
  readFile,
  writeFile,
  unlink
} from 'node:fs/promises'
import {
  isDeepStrictEqual
} from 'node:util'
import {
  ensureDir
} from 'fs-extra'
import {
  DEFAULT_THE_INSTITUTIONS_ENDPOINT_LIMIT,
  DEFAULT_THE_INSTITUTIONS_ENDPOINT_COUNT
} from '#config'
import handleFilePathError from '#utils/handle-file-path-error'
import {
  getId as getInstitutionId
} from './institution.mjs'

export function getRowCount ({ rowCount = 0 } = {}) {
  return rowCount
}

export function getRows ({ rows = [] } = {}) {
  return rows
}

export async function readInstitutionsFromEndpoint (
  endpoint,
  limit = DEFAULT_THE_INSTITUTIONS_ENDPOINT_LIMIT,
  count = DEFAULT_THE_INSTITUTIONS_ENDPOINT_COUNT,
  accumulator = {}
) {
  /**
   *  There is no rate limit but results are cached with a CDN (Fastly)
   *
   *  Changes to the reference data are expected to propagate in ~2hrs
   */
  const url = new URL(endpoint)

  url.search = new URLSearchParams({
    limit,
    ...(count ? { offset: count * limit } : {})
  })

  const response = await fetch(url)

  const {
    rowCount,
    rows
  } = await response.json()

  const institutions = {
    rowCount: getRowCount(accumulator) + rowCount,
    rows: getRows(accumulator).concat(rows)
  }

  if (rowCount === limit) {
    return (
      readInstitutionsFromEndpoint(
        endpoint,
        limit,
        count + 1,
        institutions
      )
    )
  }

  return institutions
}

export async function readInstitutionsFromFilePath (filePath) {
  try {
    await ensureDir(dirname(filePath))
    return JSON.parse(await readFile(filePath, 'utf8'))
  } catch (e) {
    handleFilePathError(e)
  }
}

export async function writeInstitutionsToFilePath (filePath, fileData) {
  try {
    await ensureDir(dirname(filePath))
    await writeFile(filePath, JSON.stringify(fileData, null, 2), 'utf8')
  } catch (e) {
    handleFilePathError(e)
  }
}

export async function deleteInstitutionsFromFilePath (filePath) {
  try {
    await unlink(filePath)
  } catch (e) {
    handleFilePathError(e)
  }
}

export function getChangedInstitutions ({ rows: rowsAlpha = [] } = {}, { rows: rowsOmega = [] } = {}) {
  return (
    rowsAlpha.reduce((accumulator, institutionAlpha) => {
      const institutionId = getInstitutionId(institutionAlpha)

      function hasInstitutionId (institution) {
        return getInstitutionId(institution) === institutionId
      }

      if (rowsOmega.some(hasInstitutionId)) {
        const institutionOmega = rowsOmega.find(hasInstitutionId)

        return (
          isDeepStrictEqual(institutionAlpha, institutionOmega)
            ? accumulator
            : accumulator.concat(institutionOmega)
        )
      }

      return accumulator
    }, [])
  )
}

export function hasChangedInstitutions ({ rows: rowsAlpha = [] } = {}, { rows: rowsOmega = [] } = {}) {
  return !(
    rowsAlpha.every((institutionAlpha) => {
      const institutionId = getInstitutionId(institutionAlpha)

      function hasInstitutionId (institution) {
        return getInstitutionId(institution) === institutionId
      }

      if (rowsOmega.every(hasInstitutionId)) {
        const institutionOmega = rowsOmega.find(hasInstitutionId)

        return (
          isDeepStrictEqual(institutionAlpha, institutionOmega)
        )
      }

      return true
    })
  )
}

export function getRemovedInstitutions ({ rows: rowsAlpha = [] } = {}, { rows: rowsOmega = [] } = {}) {
  return (
    rowsAlpha.reduce((accumulator, institution) => {
      const institutionId = getInstitutionId(institution)

      return (
        rowsOmega.some((institution) => getInstitutionId(institution) === institutionId)
          ? accumulator
          : accumulator.concat(institution)
      )
    }, [])
  )
}

export function hasRemovedInstitutions ({ rows: rowsAlpha = [] } = {}, { rows: rowsOmega = [] } = {}) {
  return !(
    rowsAlpha.every((institution) => {
      const institutionId = getInstitutionId(institution)

      return (
        rowsOmega.some((institution) => getInstitutionId(institution) === institutionId)
      )
    })
  )
}

export function getAddedInstitutions ({ rows: rowsAlpha = [] } = {}, { rows: rowsOmega = [] } = {}) {
  return (
    rowsOmega.reduce((accumulator, institution) => {
      const institutionId = getInstitutionId(institution)

      return (
        rowsAlpha.some((institution) => getInstitutionId(institution) === institutionId)
          ? accumulator
          : accumulator.concat(institution)
      )
    }, [])
  )
}

export function hasAddedInstitutions ({ rows: rowsAlpha = [] } = {}, { rows: rowsOmega = [] } = {}) {
  return !(
    rowsOmega.every((institution) => {
      const institutionId = getInstitutionId(institution)

      return (
        rowsAlpha.some((institution) => getInstitutionId(institution) === institutionId)
      )
    })
  )
}

export function validate (was = {}, now = {}) {
  return !(
    hasChangedInstitutions(was, now) ||
    hasRemovedInstitutions(was, now) ||
    hasAddedInstitutions(was, now)
  )
}

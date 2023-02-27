import {
  dirname
} from 'node:path'
import {
  writeFile
} from 'node:fs/promises'
import {
  ensureDir
} from 'fs-extra'
import handleFilePathError from './handle-file-path-error.mjs'

export default async function writeStatusToFilePath (filePath, status = {}) {
  try {
    await ensureDir(dirname(filePath))
    await writeFile(filePath, JSON.stringify(status, null, 2), 'utf8')
  } catch (e) {
    handleFilePathError(e)
  }
}

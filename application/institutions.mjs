import { dirname } from 'node:path';
import { readFile, writeFile, unlink } from 'node:fs/promises';
import { isDeepStrictEqual } from 'node:util';
import { ensureDir } from 'fs-extra';
import {
  THE_INSTITUTIONS_ENDPOINT_LIMIT,
  THE_INSTITUTIONS_ENDPOINT_COUNT,
} from '#config';
import handleFilePathError from '#utils/handle-file-path-error';
import { getId as getInstitutionId } from './institution.mjs';

export function getRowCount({ rowCount = 0 } = {}) {
  return rowCount;
}

export function getRows({ rows = [] } = {}) {
  return rows;
}

export async function readInstitutionsFromEndpoint(
  endpoint,
  limit = THE_INSTITUTIONS_ENDPOINT_LIMIT,
  count = THE_INSTITUTIONS_ENDPOINT_COUNT,
  accumulator = {},
) {
  /**
   *  There is no rate limit but results are cached with a CDN (Fastly)
   *
   *  Changes to the reference data are expected to propagate in ~2hrs
   */

  console.log(endpoint);
  const url = new URL(endpoint);

  url.search = new URLSearchParams({
    limit,
    ...(count ? { offset: count * limit } : {}),
  });

  const response = await fetch(url);

  const { rowCount, rows } = await response.json();

  const institutions = {
    rowCount: getRowCount(accumulator) + rowCount,
    rows: getRows(accumulator).concat(rows),
  };

  if (rowCount === limit) {
    return readInstitutionsFromEndpoint(endpoint, limit, count + 1, institutions);
  }

  return institutions;
}

export async function readInstitutionsFromFilePath(filePath) {
  try {
    await ensureDir(dirname(filePath));
    const fileData = await readFile(filePath, 'utf8');
    return JSON.parse(fileData.toString());
  } catch (e) {
    handleFilePathError(e);
  }
}

export async function writeInstitutionsToFilePath(filePath, institutions = {}) {
  try {
    await ensureDir(dirname(filePath));
    const fileData = JSON.stringify(institutions, null, 2);
    await writeFile(filePath, fileData, 'utf8');
  } catch (e) {
    handleFilePathError(e);
  }
}

export async function deleteInstitutionsFromFilePath(filePath) {
  try {
    await unlink(filePath);
  } catch (e) {
    handleFilePathError(e);
  }
}

export function getChangedInstitutions(alpha = {}, omega = {}) {
  return getRows(alpha).reduce((accumulator, institutionAlpha) => {
    const institutionId = getInstitutionId(institutionAlpha);

    function hasInstitutionId(institution) {
      return getInstitutionId(institution) === institutionId;
    }

    if (getRows(omega).some(hasInstitutionId)) {
      const institutionOmega = getRows(omega).find(hasInstitutionId);

      return isDeepStrictEqual(institutionAlpha, institutionOmega)
        ? accumulator
        : accumulator.concat(institutionOmega);
    }

    return accumulator;
  }, []);
}

export function hasChangedInstitutions(alpha = {}, omega = {}) {
  return !getRows(alpha).every((institutionAlpha) => {
    const institutionId = getInstitutionId(institutionAlpha);

    function hasInstitutionId(institution) {
      return getInstitutionId(institution) === institutionId;
    }

    if (getRows(omega).some(hasInstitutionId)) {
      const institutionOmega = getRows(omega).find(hasInstitutionId);

      return isDeepStrictEqual(institutionAlpha, institutionOmega);
    }

    return true;
  });
}

export function getRemovedInstitutions(alpha = {}, omega = {}) {
  return getRows(alpha).reduce((accumulator, institution) => {
    const institutionId = getInstitutionId(institution);

    return getRows(omega).some(
      (institution) => getInstitutionId(institution) === institutionId,
    )
      ? accumulator
      : accumulator.concat(institution);
  }, []);
}

export function hasRemovedInstitutions(alpha = {}, omega = {}) {
  return !getRows(alpha).every((institution) => {
    const institutionId = getInstitutionId(institution);

    return getRows(omega).some(
      (institution) => getInstitutionId(institution) === institutionId,
    );
  });
}

export function getAddedInstitutions(alpha = {}, omega = {}) {
  return getRows(omega).reduce((accumulator, institution) => {
    const institutionId = getInstitutionId(institution);

    return getRows(alpha).some(
      (institution) => getInstitutionId(institution) === institutionId,
    )
      ? accumulator
      : accumulator.concat(institution);
  }, []);
}

export function hasAddedInstitutions(alpha = {}, omega = {}) {
  return !getRows(omega).every((institution) => {
    const institutionId = getInstitutionId(institution);

    return getRows(alpha).some(
      (institution) => getInstitutionId(institution) === institutionId,
    );
  });
}

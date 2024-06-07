#!/usr/bin/env node

import { isDeepStrictEqual } from 'node:util';
import args from '#config/args';
import {
  THE_INSTITUTIONS_FILE_PATH as FILE_PATH,
  THE_INSTITUTIONS_ENDPOINT as ENDPOINT,
  THE_INSTITUTIONS_ENDPOINT_LIMIT as LIMIT,
  THE_INSTITUTIONS_ENDPOINT_COUNT as COUNT,
} from '#config';
import sleepFor from '#utils/sleep-for';
import memoryStats from '#utils/memory-stats';
import {
  readInstitutionsFromFilePath,
  readInstitutionsFromEndpoint,
  writeInstitutionsToFilePath,
  getChangedInstitutions,
  getRemovedInstitutions,
  getAddedInstitutions,
} from '#application/institutions';
import change from '#application/change';
import remove from '#application/remove';

async function app() {
  console.log('🚀');

  const was = await readInstitutionsFromFilePath(FILE_PATH);
  let now = undefined;

  try {
    now = await readInstitutionsFromEndpoint(ENDPOINT, LIMIT, COUNT);
  } catch(error) {
    console.error(error);
    console.error('Something went wrong reading the institutions from the refdata-api. Institution reconciliation will not work with a partial list of institutions, so I am bailing out!')
    throw error;
  }

  return;

  if (!isDeepStrictEqual(was, now)) {
    await change(getChangedInstitutions(was, now));
    await remove(getRemovedInstitutions(was, now));
    await change(getAddedInstitutions(was, now));

    await writeInstitutionsToFilePath(FILE_PATH, now);
  }
}

async function run() {
  if ('gc' in global) gc();

  if (args.has('NAP')) {
    console.log("🔄 NAP arg is set to " + args.get('NAP') + ". App will run continuously, pausing for " + args.get('NAP') + " milliseconds between runs")
  } else {
    console.log("👍 NAP arg is not set, so the process will run once and exit. If running in a pod, this may cause a restart at the end of the sync.")
  }

  await app();
  console.log("✅ Sync run completed at " + new Date().toISOString());

  if (args.has('NAP')) {
    const nap = args.get('NAP');

    console.log(
      `😴 "I'm just resting my eyes until ${new Date(Date.now() + nap).toLocaleTimeString()}"`,
    );

    memoryStats();

    await sleepFor(nap);
    setImmediate(run);
  } else {
    console.log("👍 NAP arg is not set, so I will not run the sync again. The process will end now.")
  }
}

const { pid } = process;

console.log(`🫡 in process ${pid}`);

export default run();

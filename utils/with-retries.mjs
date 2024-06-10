import pRetry from 'p-retry';

export const withRetries = async ({operation, retries = 10, operationDescription}) => {
  return pRetry(
    operation, {
      retries,
      onFailedAttempt: error => {
        console.log(operationDescription);
        console.log(`[${operationDescription}] Attempt ${error.attemptNumber} failed. ${error.retriesLeft} retries left.`);
      },
    }) ;
}
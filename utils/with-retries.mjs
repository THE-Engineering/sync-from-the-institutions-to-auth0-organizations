import pRetry from 'p-retry';

export const withRetries = async ({operation: perform, retries = 10, operationDescription}) => {
  return pRetry(
    perform, {
      retries,
      onFailedAttempt: error => {
        console.log(operationDescription);
        console.log(`[${operationDescription}] Attempt ${error.attemptNumber} failed. ${error.retriesLeft} retries left.`);
      },
    }) ;
}

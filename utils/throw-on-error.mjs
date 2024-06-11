export const throwOnError = async (response, acceptableCodes = []) => {
  if(!response.ok) {
    if(acceptableCodes instanceof Array && acceptableCodes.includes(response.status)) {
      console.log(`Got non-ok response status ${response.status}(${response.statusText}) from ${response.url}, but code is within acceptable codes: ${acceptableCodes}. Trace: ${(new Error()).stack}`);
    } else {
      console.error(`Non-ok response status ${response.status}(${response.statusText}) from ${response.url}. Trace: ${(new Error()).stack}`);
      console.error(await response.text());
      throw new Error(`Something went wrong fetching from ${response.url}!`);
    }
  }
}

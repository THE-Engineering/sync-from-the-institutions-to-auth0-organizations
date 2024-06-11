export const throwOnError = async (response, acceptableCodes = []) => {
  if(!response.ok) {
    console.error(`Non-Ok response status ${response.status}(${response.statusText}) from ${response.url}. Trace: ${(new Error()).stack}`);
    console.error(await response.text());
    if(!acceptableCodes || !acceptableCodes.contains(response.status))
      throw new Error(`Something went wrong fetching from ${response.url}!`);
  }
}

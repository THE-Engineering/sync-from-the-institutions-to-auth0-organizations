export const throwOnError = async (response) => {
  if(!response.ok) {
    console.error(`Non-Ok response status ${response.status}(${response.statusText}) from ${response.url}. Trace: ${(new Error()).stack}`);
    console.error(await response.text());
    throw new Error(`Something went wrong fetching from ${response.url}!`);
  }
}

/* global Error */

export default
async function fetchJson(scope, url) {
  const response = await scope.fetch(url)

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json()
}

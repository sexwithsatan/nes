/* globals Error */

export default
function fetchJson(scope, url) {
  return scope.fetch(url).then(function (response) {
    if (response.ok) {
      return response.json()
    }

    throw new Error(response.statusText)
  })
}

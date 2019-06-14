export default
function serialize(nameValuePairs, initialValue = {}) {
  return nameValuePairs.reduce((m, {name, value}) => ({
    ...m,
    [name]: value
  }), initialValue)
}

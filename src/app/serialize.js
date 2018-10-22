export default
function serialize(pairs, initialValue = {}) {
  return [...pairs].reduce((m, {name, value}) => ({
    ...m,
    [name]: value
  }), initialValue)
}

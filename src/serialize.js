export default
function serialize(pairs) {
  return [...pairs].reduce((a, {name, value}) => ({
    ...a,
    [name]: value
  }), {})
}

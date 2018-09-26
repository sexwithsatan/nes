export default
function serializeForm(form) {
  return [...form.elements].reduce((a, {name, value}) => ({
    ...a,
    [name]: value
  }), {})
}

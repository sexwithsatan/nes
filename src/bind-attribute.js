export default
function bindAttribute(attr, [off, on]) {
  return (el, value) => {
    switch (value) {
    default:
      throw new RangeError()
    case on:
      return el.setAttribute(attr, '')
    case off:
      return el.removeAttribute(attr)
    }
  }
}

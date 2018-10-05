export default
function bindAttribute(el, attr, [off, on]) {
  return value => {
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

/* globals RangeError */

export default
function bindAttribute(el, name, [off, on]) {
  return {
    get() {
      return el.getAttribute(name)
    },

    set(value) {
      switch (value) {
        
      case on:
        return el.setAttribute(name, '')

      case off:
        return el.removeAttribute(name)

      default:
        throw new RangeError(/* TODO */)
      }
    }
  }
}

/* global RangeError */

export default
function bindAttribute(el, name, [off, on]) {
  return {
    get() {
      return el.hasAttribute(name)
        ? on
        : off
    },

    set(value) {
      switch (value) {
      case on:
        el.setAttribute(name, '')
        return

      case off:
        el.removeAttribute(name)
        return

      default:
        throw new RangeError(/* TODO */)
      }
    }
  }
}

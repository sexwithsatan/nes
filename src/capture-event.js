export default
function captureEvent(type, el) {
  return new Promise(resolve => {
    el.addEventListener(type, function handler(e) {
      e.preventDefault()
      resolve(e)
      // el.removeEventListener(type, handler)
    })
  })
}

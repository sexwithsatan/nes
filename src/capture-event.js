/* globals Promise */

export default
function captureEvent(type, el) {
  return new Promise(resolve => {
    el.addEventListener(type, function listen(e) {
      e.preventDefault()
      el.removeEventListener(type, listen)
      resolve(e)
    })
  })
}

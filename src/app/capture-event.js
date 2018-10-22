/* globals Promise */

export default
function captureEvent(type, el) {
  return new Promise(resolve => {
    el.addEventListener(type, function handleEvent(e) {
      e.preventDefault()
      resolve(e)
      el.removeEventListener(type, handleEvent)
    })
  })
}

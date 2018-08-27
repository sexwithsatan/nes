export default
function (d) {
  return new Promise(function (resolve) {
    d.addEventListener('submit', function (e) {
      e.preventDefault()
      resolve(e.target)
    })
  })
}

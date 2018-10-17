/* globals Promise, FileReader */

export default
function uploadAsArrayBuffer(file) {
  return new Promise(resolve => {
    const reader = new FileReader()

    reader.onload = () => resolve(reader.result)
    reader.readAsArrayBuffer(file)
  })
}

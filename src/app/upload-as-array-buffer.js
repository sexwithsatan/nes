/* globals Promise, FileReader */

export default
function uploadAsArrayBuffer(file) {
  const reader = new FileReader()

  return new Promise(resolve => {

    reader.onload = () => resolve(reader.result)
    reader.readAsArrayBuffer(file)
  })
}

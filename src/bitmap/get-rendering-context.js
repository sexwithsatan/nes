import createImageData from '../create-image-data.js'

const {createImageBitmap} = self

export default
function (canvas, frames) {
  const pixels = createImageData(canvas)
  const context = canvas.getContext('bitmaprenderer')

  return {
    queue: () => frames(pixels),
    blit: frame => createImageBitmap(frame).then(bitmap => {
      context.transferFromImageBitmap(bitmap)
    })
  }
}

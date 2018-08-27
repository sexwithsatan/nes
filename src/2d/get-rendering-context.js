import createImageData from '../create-image-data.js'

export default
function (canvas, frames) {
  const pixels = createImageData(canvas)
  const context = canvas.getContext('2d', {alpha: false})

  return {
    queue: () => frames(pixels),
    blit: frame => context.putImageData(frame, 0, 0)
  }
}

/* globals ImageData, Uint8ClampedArray */
import render from '@esnes/2c02'

function* pixels(palette) {
  for (const n of render()) {
    const i = 3*(n & 0x3f)

    yield palette[i + 0]
    yield palette[i + 1]
    yield palette[i + 2]
    yield 0xff
  }
}

export default
async function repaint(scope, {
  ms,
  palette,
  width: w,
  height: h
}) {
  const g = pixels(palette)
  const array = Uint8ClampedArray.from(g)
  const imageData = new ImageData(array, w, h)
  const bitmap = await scope.createImageBitmap(imageData)

  scope.postMessage({bitmap}, [bitmap])
}

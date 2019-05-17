/* globals Object, Uint8ClampedArray, ImageData */
import render from '@esnes/2c02'

const cgram = Array.from({length: 0x20}, (_, i) => i)
const registers = {
//  '2C02': {
    H: 1, HT: 5, FH: 3,
    V: 1, VT: 5, FV: 3,
    S: 1
//  }
}

function* pixels(palette, {registers, cgram, oam}, [read]) {
  for (const color of render(registers, [read])) {
    const hue = cgram[color & 0x1f]

    yield palette[3*hue + 0]
    yield palette[3*hue + 1]
    yield palette[3*hue + 2]
    yield 0xff
  }
}

export default
async function repaint(scope, {
  ms,
  palette,
  width: w,
  height: h,
  graphics
}) {
  const read = address => graphics.read(address)
  const g = pixels(palette, {registers, cgram}, [read])
  const array = Uint8ClampedArray.from(g)
  const imageData = new ImageData(array, w, h)
  const bitmap = await scope.createImageBitmap(imageData)

  scope.postMessage(Object.freeze({bitmap}), [bitmap])
}

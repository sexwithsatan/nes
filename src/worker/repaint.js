/* global Object, Uint8ClampedArray, ImageData */
import render from '@esnes/2c02'

const cgram = Array.from({length: 0x20}, (_, i) => i)
const counters = {
//  '2C02': {
    H: 1, HT: 5,
    V: 1, VT: 5, FV: 3
}
const registers = {
    FH: 3,
    S: 1
//  }
}

function run(cpu, ppu) {

  while (true) {

    ppu.next()
    ppu.next()
    ppu.next()

    cpu.next()
  }

}

function* pixels(palette, {cgram, ...state}, [read]) {
  for (const color of render(state, [read])) {
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
  graphics,
  width: w,
  height: h
}) {
  const g = pixels(palette, {counters, registers, cgram}, graphics)
  const array = Uint8ClampedArray.from(g)
  const imageData = new ImageData(array, w, h)
  const bitmap = await scope.createImageBitmap(imageData)

  scope.postMessage({bitmap}, [bitmap])
}

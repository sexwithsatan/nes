/* global self, ImageData */
import render from '@esnes/2c02'

function* pixels(palette) {
  const g = render()

  while (true) {
    const {done, value} = g.next()
    const i = value % 64

    if (done) {
      return
    }

    yield palette[3*i + 0]
    yield palette[3*i + 1]
    yield palette[3*i + 2]
    yield 0xff
  }
}

async function repaint(scope, w, h, palette, {ms}) {
  const g = pixels(palette)
  const array = Uint8ClampedArray.from(g)
  const image = new ImageData(array, w, h)
  const bitmap = await scope.createImageBitmap(image)

  scope.postMessage(bitmap, [bitmap])
}

async function main(scope, {
  width: w,
  height: h
}) {
  const palette = await scope.fetch('../palette.json')
    .then(response => response.json())

  scope.onmessage = ({data}) => repaint(scope, w, h, palette, data)
}

self.onmessage = ({data}) => main(self, data)

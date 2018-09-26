const [w, h] = [256, 256]
const a = Array.from({length: w*h}).map((_, i) => i % 0x100)
//const b = Array.from({length: w*h}).map((_, i) => (1 + i) % 0x100)

function* emulate() {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = w*y + x

      yield 0
      yield a[i]
      yield 0
      yield 0xff
    }
  }
}

  const g = emulate()
  const pixels = Uint8ClampedArray.from(g)
  const data = new ImageData(pixels, 256, 256)

async function repaint(scope, w, h, ms) {
  const bitmap = await scope.createImageBitmap(data)

  scope.postMessage(bitmap, [bitmap])
}

self.onmessage = ({data: ms}) => repaint(self, 256, 256, ms)

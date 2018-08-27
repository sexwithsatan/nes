import emulate from './emulate.js'

export default
function* frames(pixels, ms = 1) {
  const frame = [...emulate(ms)]
  const data = pixels.data

  for (let y = 0; y < 256; y++) {
    for (let x = 0; x < 256; x++) {
      const i = 256*y + x
      const b = (frame[0] === 0)

      data[0 + 4*i] = 0
      data[1 + 4*i] = b ? frame[i] : 0
      data[2 + 4*i] = b ? 0 : frame[i]
      data[3 + 4*i] = 0
    }
  }

  /** @tail */
  yield* frames(pixels, yield pixels)
}

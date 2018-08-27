const [w, h] = [256, 256]
const a = Array.from({length: w*h}).map((_, i) => (0 + i) % 0x100)
const b = Array.from({length: w*h}).map((_, i) => (1 + i) % 0x100)

export default
function* (ms) {
  yield* (ms % 1 > 0.5) ? a : b
}

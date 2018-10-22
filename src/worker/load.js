/* globals Uint8ClampedArray */
import deserialize from '@esnes/ines2-header'
import repaint from './repaint.js'
import fetchJson from './fetch-json.js'

export default
async function load(ww, {rom, width, height}) {
  try {
    const palette = await fetchJson(ww, '../palette.json')
    const header = new Uint8ClampedArray(rom, 0, 16)
    const {size: {PRG, CHR}} = deserialize(header)
    const program = new Uint8ClampedArray(rom, 16, PRG)
    const graphics = new Uint8ClampedArray(rom, 16 + PRG, CHR)

    ww.addEventListener('repaint', function ({detail}) {

      // Close over the palette data and the <canvas> dimensions
      // and pass them to the @repaint event
      repaint(ww, {palette, width, height, ...detail})
    })
  } catch (ex) {
    // FIXME: Failed to retrieve the palette file, now what...?
  }
}

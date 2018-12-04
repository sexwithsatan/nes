/* globals Uint8ClampedArray */
import repaint from './repaint.js'
import fetchJson from './fetch-json.js'

// FIXME: Use dynamic import
import allocate from '@esnes/nes-nrom'

export default
async function emulate(scope, {rom, width, height}) {
  const palette = await fetchJson(scope, '../palette.json')
  const {
    program,
    graphics
  } = await allocate(rom)

  console.log([program, graphics])

  // scope.addEventListener('nes:repaint:program', function ({detail}) {
  //   execute(scope, {program, ...detail})
  // })

  scope.addEventListener('nes:repaint:graphics', function ({detail}) {
    repaint(scope, {graphics, palette, width, height, ...detail})
  })
}

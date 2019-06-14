import repaint from './repaint.js'
import fetchJson from './fetch-json.js'

// FIXME: Use dynamic import
import allocate from '@esnes/nes-nrom'

export default
async function loadMapper(scope, {rom, width, height}) {
  const [
    {program, graphics},
    palette
  ] = await Promise.all([
    allocate(rom),
    fetchJson(scope, '../palette.json')
  ])

  scope.addEventListener('nes:repaint:graphics', function ({detail}) {
    repaint(scope, {palette, width, height, graphics, ...detail})
  })
}

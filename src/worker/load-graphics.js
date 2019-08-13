/* global Promise */
import allocate from '@esnes/mapper-nrom'
import fetchJson from './fetch-json.js'
import repaint from './repaint.js'

export default
async function loadGraphics(scope, {rom, width, height}) {
  const [
    {graphics},
    palette
  ] = await Promise.all([
    allocate(rom),
    fetchJson(scope, '../palette.json')
  ])

  scope.addEventListener('nes:graphics:repaint', function ({detail}) {
    repaint(scope, {graphics, palette, width, height, ...detail})
  })
}

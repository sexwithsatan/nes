import repaint from './repaint.js'

// FIXME: Use dynamic import
import allocate from '@esnes/mapper-nrom'

export default
async function loadRomImage(scope, {rom, width, height, palette}) {
  const {
    program,
    graphics
  } = await allocate(rom)

  scope.addEventListener('nes:repaint:program', function ({detail}) {
    // TODO execute cpu
    console.log('hello from #program')
  })

  scope.addEventListener('nes:repaint:graphics', function ({detail}) {
    repaint(scope, {graphics, palette, width, height, ...detail})
  })
}

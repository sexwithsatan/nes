import allocate from '@esnes/mapper-nrom'

export default
async function loadProgram(scope, {rom}) {
  const {program} = await allocate(rom)

  scope.addEventListener('nes:program:repaint', function ({detail}) {
    // TODO
  })
}

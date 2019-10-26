import allocate from '@esnes/mapper-nrom'

export default
async function loadProgram(scope, {rom}) {
  const {program} = await allocate(rom)

  scope.addEventListener('nes:program:repaint', function ({detail}) {
    execute(detail)
    scope.postMessage({task: 'render', ...detail})
  })

  function execute({ms}) {
    // TODO: run 6502
  }
}

import allocate from '@esnes/mapper-nrom'

export default
async function loadProgram(scope, {rom}) {
  const {program} = await allocate(rom)

  scope.addEventListener('nes:program:repaint', function ({detail}) {
//    for (let L = 0; L < 262; L++) {
      scope.postMessage({task: 'render'/*, cc: 341/3*L*/})
      //execute(341/3)
//    }
  })
}

/* globals self, Worker, CustomEvent */
import emulate from './emulate.js'

function main(scope) {
  const fragment = scope.location.hash.replace('#', ':')

  scope.addEventListener('nes:init', function () {
    const url = 'worker.js' // TODO: scope.location.match()
    const program = new Worker(`${url}#program`)
    const graphics = new Worker(`${url}#graphics`)

    scope.addEventListener('message', function ({data}) {
      program.postMessage(data)
      graphics.postMessage(data)
    })

    graphics.addEventListener('message', function ({data}) {
      // FIXME: transfers
      scope.postMessage(data)
    })
  })

  scope.dispatchEvent(new CustomEvent(`nes:init${fragment}`))

  scope.addEventListener('nes:submit:graphics', function ({detail}) {
    emulate(scope, detail)
  })

  scope.addEventListener('message', function ({data: {task, ...detail}}) {
    scope.dispatchEvent(new CustomEvent(`nes:${task}${fragment}`, {detail}))
  })
}

main(self)

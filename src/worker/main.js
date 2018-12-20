/* globals self, Worker, CustomEvent */
import emulate from './emulate.js'

(function (scope) {
  const fragment = scope.location.hash.replace('#', ':')

  scope.addEventListener('nes:load', function () {
    const url = 'worker.js' // TODO: scope.location.match()
    const program = new Worker(`${url}#program`, {type: 'module'})
    const graphics = new Worker(`${url}#graphics`, {type: 'module'})

    scope.addEventListener('message', function ({data}) {
      program.postMessage(data)
      graphics.postMessage(data)
    })

    graphics.addEventListener('message', function ({data: {bitmap}}) {
      scope.postMessage(Object.freeze({bitmap}), [bitmap])
    })
  })

  scope.addEventListener('nes:submit:graphics', function ({detail}) {
    emulate(scope, detail)
  })

  scope.dispatchEvent(new CustomEvent(`nes:load${fragment}`))

  scope.addEventListener('message', function ({data: {task, ...detail}}) {
    scope.dispatchEvent(new CustomEvent(`nes:${task}${fragment}`, {detail}))
  })
}) (self)

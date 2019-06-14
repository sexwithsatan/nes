/* global self, Worker, CustomEvent */
import loadMapper from './load-mapper.js'

(function (scope) {
  const fragment = scope.location.hash.replace('#', ':')

  scope.addEventListener('nes:load', function () {
    const js = 'worker.js' // TODO: scope.location.match()
    const program = new Worker(`${js}#program`, {type: 'module'})
    const graphics = new Worker(`${js}#graphics`, {type: 'module'})

    scope.addEventListener('message', function ({data}) {
      program.postMessage(data)
      graphics.postMessage(data)
    })

    graphics.addEventListener('message', function ({data: {bitmap}}) {
      scope.postMessage(Object.freeze({bitmap}), [bitmap])
    })
  })

  scope.addEventListener('nes:submit:graphics', function ({detail}) {
    loadMapper(scope, detail)
  })

  scope.dispatchEvent(new CustomEvent(`nes:load${fragment}`))

  scope.addEventListener('message', function ({data: {task, ...detail}}) {
    scope.dispatchEvent(new CustomEvent(`nes:${task}${fragment}`, {detail}))
  })
}) (self)

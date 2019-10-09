/* global self, Worker, CustomEvent */
import loadProgram from './load-program.js'
import loadGraphics from './load-graphics.js'

(function (scope) {
  const fragment = scope.location.hash.replace('#', ':')

  scope.addEventListener('nes:load', function () {
    const js = scope.location.pathname /* TODO: verify origin */
    const program = new Worker(`${js}#program`, {type: 'module'})
    const graphics = new Worker(`${js}#graphics`, {type: 'module'})

    scope.addEventListener('message', function ({data}) {
      program.postMessage(data)
      graphics.postMessage(data)
    })

    program.addEventListener('message', function ({data}) {
      graphics.postMessage(data)
    })

    graphics.addEventListener('message', function ({data: {bitmap}}) {
      scope.postMessage({bitmap}, [bitmap])
    })
  })

  scope.addEventListener('nes:program:submit', function ({detail}) {
    loadProgram(scope, detail)
  })

  scope.addEventListener('nes:graphics:submit', function ({detail}) {
    loadGraphics(scope, detail)
  })

  scope.dispatchEvent(new CustomEvent(`nes${fragment}:load`))

  scope.addEventListener('message', function ({data: {task, ...detail}}) {
    scope.dispatchEvent(new CustomEvent(`nes${fragment}:${task}`, {detail}))
  })
}) (self)

/* global self, Worker, CustomEvent */
import fetchJson from './fetch-json.js'
import loadRomImage from './load-rom-image.js'

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
      scope.postMessage({bitmap}, [bitmap])
    })
  })

  scope.addEventListener('nes:submit:program', function ({detail}) {
    loadRomImage(scope, detail)
  })

  scope.addEventListener('nes:load:graphics', async function () {
    const palette = await fetchJson(scope, '../palette.json')

    scope.addEventListener('nes:submit:graphics', function ({detail}) {
      loadRomImage(scope, {palette, ...detail})
    })
  })

  scope.dispatchEvent(new CustomEvent(`nes:load${fragment}`))

  scope.addEventListener('message', function ({data: {task, ...detail}}) {
    scope.dispatchEvent(new CustomEvent(`nes:${task}${fragment}`, {detail}))
  })
}) (self)

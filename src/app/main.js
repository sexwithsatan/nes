/* global window, Worker */
import emulate from './emulate.js'
import {PLAY, PAUSE} from './emulate.js'
import serialize from './serialize.js'
import bindAttribute from './bind-attribute.js'

(function ({window, document}) {
  const ww = new Worker('js/worker.js', {type: 'module'})

  document.addEventListener('submit', function (e) {
    e.preventDefault()
    main(e.target)
  })

  function main({
    rom: {files: [rom]},
    graphics
  }) {
    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('bitmaprenderer')
    const options = serialize([...graphics.elements])
    const dimensions = serialize([...canvas.attributes])
    const paused = bindAttribute(canvas, 'data-paused', [PLAY, PAUSE])
    const fsm = emulate(ww, options)

    // Put the FSM in its initial state
    fsm.next(undefined)

    // Send the ROM file and <canvas> dimensions to the worker
    ww.postMessage({task: 'submit', rom, ...dimensions})

    canvas.addEventListener('click', function () {
      const {value} = fsm.next(undefined)

      // Update the [paused] attribute after each transition
      paused.set(value)
    })

    ww.addEventListener('message', function ({data: {bitmap}}) {

      // When the worker has finished rendering a frame, display it
      window.requestAnimationFrame(() => context.transferFromImageBitmap(bitmap))
    })
  }
}) (window)

import emulate from './emulate.js'
import serialize from './serialize.js'
import {PLAY, PAUSE} from './pause.js'
import bindAttribute from './bind-attribute.js'

(function ({window, document}) {
  const ww = new Worker('js/worker.js', {type: 'module'})

  document.addEventListener('submit', function (e) {
    e.preventDefault()

    const {
      rom: {files: [rom]},
      graphics
    } = e.target
    
    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('bitmaprenderer')
    const dimensions = serialize([...canvas.attributes])
    const paused = bindAttribute(canvas, 'data-paused', [PLAY, PAUSE])
    const fsm = emulate(ww, graphics)

    // Put the FSM in its initial state
    fsm.next()

    // Send the ROM file and <canvas> dimensions to the worker
    ww.postMessage({task: 'submit', rom, ...dimensions})

    canvas.addEventListener('click', function () {
      const {value} = fsm.next()

      // Update the [paused] attribute on each transition
      paused.set(value)
    })

    ww.addEventListener('message', function ({data: {bitmap}}) {

      // When the worker has finished rendering a frame, display it
      window.requestAnimationFrame(() => context.transferFromImageBitmap(bitmap))
    })
  })
}) (window)

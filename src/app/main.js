/* globals self */
import animate from '@esnes/animated-canvas'
import frames from './frames.js'
import serialize from './serialize.js'
import {PLAY, PAUSE} from './pause.js'
import bindAttribute from './bind-attribute.js'

function main({window, document}) {
  const ww = new Worker('js/worker.js', {type: 'module'})

  document.addEventListener('submit', function (e) {
    e.preventDefault()

    const {
      rom: {files: [rom]},
      options
    } = e.target
    
    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('bitmaprenderer')
    const dimensions = serialize(canvas.attributes)
    const paused = bindAttribute(canvas, 'data-paused', [PLAY, PAUSE])
    const fsm = animate(function* (start, stop) {

      // The animation loop is driven by a 2-state FSM:
      //  (1) Rendering begins on the PAUSE -> PLAY transition
      //  (2) Rendering is suspended on the PLAY -> PAUSE transition
      //  (1) Rendering resumes on the next PAUSE -> PLAY transition
      // ...and so forth.
      while (true) {
        const {fps} = serialize(options.elements)
        const animation = start(fps, () => frames(ww))
        yield PLAY

        stop(animation)
        yield PAUSE
      }
    })

    // Put the FSM in its initial state
    fsm.next()

    // Send the ROM file and the <canvas> dimensions to the worker
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
}

main(self)

/* globals window */
import animate from '@esnes/animated-canvas'
import serialize from './serialize.js'
import captureEvent from './capture-event.js'
import {PLAY, PAUSE} from './pause.js'
import bindAttribute from './bind-attribute.js'

function* frames(ww) {
  while (true) {

    // Ask the worker to start drawing the next frame
    ww.postMessage({ms: yield})
  }
}

void async function ({document: d}) {
  const ww = new Worker('js/worker.js')
  const {target: form} = await captureEvent('submit', d)
  const {fps} = serialize(form['options'].elements)
  const canvas = d.getElementById('canvas')
  const context = canvas.getContext('bitmaprenderer')
  const setPaused = bindAttribute(canvas, 'data-paused', [PLAY, PAUSE])
  const fsm = animate(function* (start, stop) {

    // Enter the animation loop:
    while (true) {
      const animation = start(fps, () => frames(ww))
      yield PLAY

      stop(animation)
      yield PAUSE
    }
  })

  // Set the FSM to its initial state
  fsm.next()

  // Tell the worker to get ready to begin rendering
  ww.postMessage(serialize(canvas.attributes))

  canvas.addEventListener('click', function () {
    const {value: paused} = fsm.next()

    // Bind the FSM to [data-paused] on <canvas>
    setPaused(paused)
  })

  ww.addEventListener('message', function ({data: bitmap}) {

    // The worker has finished rendering a frame, display it
    requestAnimationFrame(() => context.transferFromImageBitmap(bitmap))
  })
} (window)

import animate from '@esnes/animated-canvas'
import captureEvent from './capture-event.js'
import serializeForm from './serialize-form.js'
import {PLAY, PAUSE} from './states.js'
import bindAttribute from './bind-attribute.js'

function* frames(ww) {
  while (true) {

    // Ask the worker to start rendering the next frame
    ww.postMessage(yield)
  }
}

(async function ({document: d}) {
  const ww = new Worker('js/worker.js')
  const {target} = await captureEvent('submit', d)
  const {fps} = serializeForm(target.elements['options'])
  const canvas = d.getElementById('canvas')
  const context = canvas.getContext('bitmaprenderer')
  const setPaused = bindAttribute('data-paused', [PLAY, PAUSE])
  const g = animate(function* (start, stop) {

    // Enter the animation loop:
    while (true) {
      const handle = start(fps, () => frames(ww))
      yield PLAY

      stop(handle)
      yield PAUSE
    }
  })

  // Put the {paused} flag in its initial state
  g.next()

  canvas.addEventListener('click', function () {

    // Bind {paused} to an attribute on <canvas>
    setPaused(canvas, g.next().value)
  })

  ww.addEventListener('message', function ({data}) {

    // The worker has finished rendering a frame, display it
    requestAnimationFrame(() => context.transferFromImageBitmap(data))
  })
}) (window)

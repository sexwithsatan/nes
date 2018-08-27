import animate from './animate.js'
import states from './states.js'
import frames from './frames.js'
import getRenderingContext from './2d/get-rendering-context.js'
import captureSubmit from './capture-submit.js'
import serializeForm from '@esnes/serialize-form'

void async function main({document: d}) {
  const form = await captureSubmit(d)
  const {fps} = serializeForm(form, 'options')
  const canvas = d.getElementById('canvas')
  const raster = getRenderingContext(canvas, frames)
  const fsm = states(function () {
    return animate(fps, raster.queue, function (frame) {

      // Enter the main rendering loop:
      // We render one frame of pixel data per iteration
      raster.blit(frame)
    })
  })

  // Transition the FSM to the 'unpaused' state
  fsm.next()

  canvas.addEventListener('click', function ({target}) {
    const {value} = fsm.next()

    if (value) {
      target.removeAttribute('data-paused')
    } else {
      target.setAttribute('data-paused', '')
    }
  })
} (window)

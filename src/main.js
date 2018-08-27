import animate from './animate.js'
import states from './states.js'
import frames from './frames.js'
import serializeForm from '@esnes/serialize-form'

function getSubmittedForm(d) {
  return new Promise(function (resolve) {
    d.addEventListener('submit', function (e) {
      e.preventDefault()
      resolve(e.target)
    })
  })
}

function enqueueFrames({width: w, height: h}) {
  const pixels = new ImageData(w, h)
  const queue = () => frames(pixels)

  return queue
}

void async function main({document: d}) {
  const form = await getSubmittedForm(d)
  const {fps} = serializeForm(form.elements.options)
  const canvas = d.getElementById('canvas')
  const context = canvas.getContext('2d', {alpha: false})
  const queue = enqueueFrames(canvas)
  const fsm = states(function () {
    return animate(fps, queue, function (frame) {

      // Blit each frame onto the <canvas>
      context.putImageData(frame, 0, 0)
    })
  })

  // Transition the FSM to the 'active' state
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

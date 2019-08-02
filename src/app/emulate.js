/* global Array, Symbol */
import animate from '@esnes/animated-canvas'

export const [
  PLAY,
  PAUSE
] = Array.from({length: 2}, () => Symbol())

export default
function* emulate(ww, options) {
  while (true) {
    const sequence = frames()
    
    // The rendering loop is driven by a 2-state FSM:
    //  (1) Rendering begins on the PAUSE -> PLAY transition
    //  (2) Rendering is suspended on the PLAY -> PAUSE transition
    //  (1) Rendering resumes on the next PAUSE -> PLAY transition
    // ...and so forth.
    animate(sequence, options)
    yield PLAY

    sequence.return()
    yield PAUSE
  }

  function* frames() {
    while (true) {

      // Keep the worker synchronized with the rendering loop
      ww.postMessage({task: 'repaint', ms: yield})
    }
  }
}

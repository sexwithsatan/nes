/* global Array, Symbol */
import animate from '@esnes/animated-canvas'

export const PLAY = Symbol()
export const PAUSE = Symbol()

export default
function* emulate(ww, options) {
  while (true) {
    const sequence = frames()
    
    // The emulation loop is driven by a 2-state FSM:
    //  (1) Emulation begins on the PAUSE -> PLAY transition
    //  (2) Emulation is suspended on the PLAY -> PAUSE transition
    //  (1) Emulation resumes on the next PAUSE -> PLAY transition
    // ...and so forth.
    animate(sequence, options)
    yield PLAY

    sequence.return()
    yield PAUSE
  }

  function* frames() {
    while (true) {

      // Keep the worker synchronized with the emulation loop
      ww.postMessage({task: 'repaint', ms: yield})
    }
  }
}

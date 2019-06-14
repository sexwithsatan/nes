import animate from '@esnes/animated-canvas'
import frames from './frames.js'
import serialize from './serialize.js'
import {PLAY, PAUSE} from './pause.js'

export default
function* emulate(ww, graphics) {
  while (true) {
    const iterable = frames(ww)
    const {fps} = serialize([...graphics.elements])
    
    // The emulation loop is driven by a 2-state FSM:
    //  (1) Emulation begins on the PAUSE -> PLAY transition
    //  (2) Emulation is suspended on the PLAY -> PAUSE transition
    //  (1) Emulation resumes on the next PAUSE -> PLAY transition
    // ...and so forth.
    animate(iterable, {fps})
    yield PLAY

    iterable.return()
    yield PAUSE
  }
}

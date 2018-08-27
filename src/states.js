export default
function* (animate) {
  while (true) {
    const g = animate()
    yield true    // Transition to 'active'

    g.return()    
    yield false   // Transition to 'paused'
  }
}

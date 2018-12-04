export default
function* frames(ww) {
  while (true) {

    // Keep the worker synchronized with the animation loop
    ww.postMessage({task: 'repaint', ms: yield})
  }
}

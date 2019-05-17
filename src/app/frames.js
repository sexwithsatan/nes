export default
function* frames(ww) {
  while (true) {

    // Keep the worker synchronized with the rendering loop
    ww.postMessage({task: 'repaint', ms: yield})
  }
}

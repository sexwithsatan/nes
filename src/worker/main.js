/* globals self, CustomEvent */
import load from './load.js'

function main(ww) {
  ww.addEventListener('load', function ({detail}) {
    load(ww, detail)
  })

  ww.addEventListener('message', function ({data: {task, ...detail}}) {
    ww.dispatchEvent(new CustomEvent(task, {detail}))
  })
}

main(self)

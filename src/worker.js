/* globals self */
import repaint from './repaint.js'
import fetchJson from './fetch-json.js'

async function main(scope, {
  width: w,
  height: h,
  rom
}) {
  try {
    console.log(rom)
    const palette = await fetchJson(scope, '../palette.json')

    scope.onmessage = ({data}) => repaint(scope, palette, w, h, data)
  } catch (ex) {
    // TODO: Handle error if we fail to retrieve the palette file
  }
}

self.onmessage = ({data}) => main(self, data)

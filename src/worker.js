/* global self, ImageData */
import render from '@esnes/2c02'

async function repaint(scope, w, h, {ms}) {
  const g = render()
  const array = Uint8ClampedArray.from(g)
  const image = new ImageData(array, w, h)
  const bitmap = await scope.createImageBitmap(image)

  scope.postMessage(bitmap, [bitmap])
}

  
function main(scope, {
  width: w,
  height: h
}) {
//  const image = new ImageData(w, h)

  scope.onmessage = ({data}) => repaint(scope, w, h, data)
}

self.onmessage = ({data}) => main(self, data)

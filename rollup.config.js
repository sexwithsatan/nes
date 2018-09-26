import resolve from 'rollup-plugin-node-resolve'
import {uglify} from 'rollup-plugin-uglify'

// npm run build -> {production} is true
// npm run dev -> {production} is false
const production = !process.env.ROLLUP_WATCH

export default {
  experimentalCodeSplitting: true,
  input: ['src/app.js', 'src/worker.js'],
  output: {
    dir: 'public/js',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    resolve()/*, // tells Rollup how to find node_modules
    production && uglify() // FIXME: minify, but only in production
                           // FIXME: need minifier plugin with ES6+ syntax
*/]
}

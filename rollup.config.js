
import * as packageJson from './package.json';
import copyMinecraftPackFiles from './plugins/copyPackFiles';
import runPackScripts from './plugins/runPackScripts';
import bundlePackScripts from './plugins/bundlePackScripts';

// const banner = `
//   /**
//    * @license
//    * author: ${packageJson.author}
//    * ${packageJson.name.replace(/^@.*\//, '')}.js v${packageJson.version}
//    * Released under the ${packageJson.license} license.
//    */
// `;

export default [
  {
    input: 'src/noop.js',
    output: { dir: 'dist', format: 'esm' },
    plugins: [ copyMinecraftPackFiles() ],
  },
  {
    input: 'src/noop.js',
    output: { dir: 'dist', format: 'esm' },
    plugins: [ bundlePackScripts() ],
  },
  {
    input: 'src/noop.js',
    output: { dir: 'dist', format: 'esm' },
    plugins: [ runPackScripts() ],
  },
];

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import peggy from 'rollup-plugin-peggy';
import copy from 'rollup-plugin-copy';
import scss from 'rollup-plugin-scss';
import serve from 'rollup-plugin-serve';

export default {
  input: 'src/scripts/index.js',
  output: {
    file: 'dist/index.js',
    sourcemap: true,
    exports: 'auto'
  },
  plugins: [
    copy({
      targets: [
        { src: 'public/*', dest: 'dist/' }
      ]
    }),
    resolve({
      browser: true,
      preferBuiltins: true
    }),
    scss(),
    commonjs(),
    json(),
    peggy({ cache: true }),
    process.env.NODE_ENV === 'production' ? terser() : null,
    process.env.SERVE_APP ? serve('dist') : null
  ]
};

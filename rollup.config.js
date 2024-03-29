import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' },
  ],
  plugins: [
    resolve(),
    commonjs({
      requireReturnsDefault: 'auto',
    }),
    babel({
      exclude: 'node_modules/**', // only transpile our source code,
      babelHelpers: 'runtime',
    }),
  ],
  external: [...Object.keys(pkg.dependencies)],
};

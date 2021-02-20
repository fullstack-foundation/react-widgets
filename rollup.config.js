import path from 'path';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import nodeResolve from '@rollup/plugin-node-resolve';
import del from 'rollup-plugin-delete';
import multiInput from 'rollup-plugin-multi-input';

const isProduction = process.env.NODE_ENV === 'production';

const paths = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  cjsDist: path.join(__dirname, 'dist/cjs'),
  esDist: path.join(__dirname, 'dist/es'),
};

const plugins = [];

if (isProduction) {
  plugins.push(del({ targets: paths.dist }));
}

plugins.push(multiInput());
plugins.push(external());
plugins.push(nodeResolve());
plugins.push(
  typescript({
    typescript: require('ttypescript'),
    tsconfigDefaults: {
      compilerOptions: {
        plugins: [
          {
            transform: 'typescript-transform-paths',
          },
          {
            transform: 'typescript-transform-paths',
            afterDeclarations: true,
          },
        ],
      },
    },
  })
);
plugins.push(commonjs());

const inputs = [
  path.join(paths.src, '**/*.ts'),
  path.join(paths.src, '**/*.tsx'),
];

const outputs = [
  {
    dir: paths.cjsDist,
    format: 'cjs',
    exports: 'named',
    sourcemap: true,
  },
  {
    dir: paths.esDist,
    format: 'es',
    exports: 'named',
    sourcemap: true,
  },
];

export default {
  input: inputs,
  output: outputs,
  plugins,
};

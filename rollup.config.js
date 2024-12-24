import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js', // Entry point for your app
  output: {
    sourcemap: true,
    format: 'iife', // Immediately Invoked Function Expression for browsers
    name: 'app',
    file: 'public/build/bundle.js',
  },
  plugins: [
    svelte({
      compilerOptions: {
        dev: !production, // Enable dev mode in non-production builds
      },
    }),
    css({ output: 'bundle.css' }), // Extract CSS into a separate file
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    commonjs(),
    !production && livereload('public'),
    production && terser(), // Minify code in production
  ],
  watch: {
    clearScreen: false,
  },
};

import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'

export default {
    input: 'main.js',
    output: [
        {
            file: 'bundle.js',
            format: 'umd',
            exports: 'auto',
            name: 'myBundle'
        },
        {
            file: 'bundle.esm.js',
            format: 'esm',
            exports: 'auto',
            name: 'myBundle'
        }
    ],
    sourcemap: true,
    watch: {
        exclude: ['node_modules/**'],
    },
    plugins: [
        json(),
        resolve(),
        commonjs(),
        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: true,
            plugins: [
                [
                    '@babel/transform-runtime'
                ]
            ]
        })
    ]
}
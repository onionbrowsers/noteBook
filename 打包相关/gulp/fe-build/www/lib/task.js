/******************************************************************
 * Copyright (C) 2019 LvChengbin
 *
 * File：build/task.js
 * Author ：LvChengbin<lvchengbin59@gmail.com>
 * Time ：06/06/2019
 * Description ：
 ******************************************************************/

const imageExtensions = require( 'image-extensions' );
const image = require( './image' );
const font = require( './font' );
const vue = require( './vue' );
const njk = require( './njk' );
const css = require( './css' );
const mjs = require( './mjs' );
const js = require( './js' );

module.exports = {
    image( settings = {} ) {
        return image( {
            src : `src/**/*.{${imageExtensions.join( ',' )}}`,
            base : 'src',
            dist : 'dist/static',
            ...settings
        } );
    },
    css( settings = {} ) {
        return css( {
            src : 'src/**/*.css',
            base : 'src',
            dist : 'dist/static',
            ...settings
        } );
    },
    js( settings = {} ) {
        return js( {
            src : 'src/**/*.js',
            base : 'src',
            dist : 'dist/static',
            ...settings
        } );
    },
    mjs( settings = {} ) {
        return mjs( {
            src : 'src/**/*.mjs',
            base : 'src',
            dist : 'dist/static',
            ...settings
        } );
    },
    njk( settings = {} ) {
        return njk( {
            src : 'src/**/*.njk',
            base : 'src',
            dist : 'dist/view',
            ...settings
        } );
    },
    vue( settings = {} ) {
        return vue( {
            src : 'src/**/*.vue',
            base : 'src',
            dist : 'dist/static',
            ...settings
        } );
    },
    font( settings = {} ) {
        return font( {
            src : 'src/**/*.{woff,woff2,ttf,ttc,otf,eot,eft}',
            base : 'src',
            dist : 'dist/static',
            ...settings
        } );
    }
};

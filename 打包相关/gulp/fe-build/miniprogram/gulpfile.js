/******************************************************************
 * Copyright (C) 2019 LvChengbin
 *
 * File: gulpfile.js
 * Author: LvChengbin<lvchengbin59@gmail.com>
 * Time: 11/22/2019
 * Description:
 ******************************************************************/

const path = require( 'path' );
const { src, dest, parallel, series, watch } = require( 'gulp' );
const stylus = require( 'gulp-stylus' );
const filter = require( 'gulp-filter' );
const rename = require( 'gulp-rename' );
const clean = require( 'gulp-clean' );
const imagemin = require( 'gulp-imagemin' );
const imageExtensions = [ 'gif', 'svg', 'jpg', 'png' ];

function clear() {
    return src( 'dist/*', { read : false } )
        .pipe( filter( [ '**', '!dist/project.config.json', '!dist/sitemap.json', '!dist/miniprogram_npm' ] ) )
        .pipe( clean( { force : true } ) );
}

const tasks = {
    wxml( files = 'src/**/*.wxml' ) {
        const fn = function() {
            return src( files, { base : 'src' } ).pipe( dest( 'dist' ) );
        }
        fn.displayName = `wxml: ${files}`;
        return fn;
    },

    wxss( files = 'src/**/*.wxss' ) {
        const fn = function() {
            return src( files, { base : 'src' } ).pipe( dest( 'dist' ) );
        }
        fn.displayName = `wxss: ${files}`;
        return fn;
    },

    styl( files = 'src/**/*.styl' ) {
        const fn = function() {
            return src( files, { base : 'src' } ).pipe( stylus() )
                .pipe( rename( { extname : '.wxss' } ) )
                .pipe( dest( 'dist' ) );
        }
        fn.displayName = `styl: ${files}`;
        return fn;
    },

    js( files = 'src/**/*.js' ) {
        const fn = function() {
            return src( files, { base : 'src' } ).pipe( dest( 'dist' ) );
        }
        fn.displayName = `js: ${files}`;
        return fn;
    },

    json( files = 'src/**/*.json' ) {
        const fn = function() {
            return src( files, { base : 'src' } )
                .pipe( filter( [ '**', '!dist/project.config.json', '!dist/sitemap.json' ] ) )
                .pipe( dest( 'dist' ) );
        }
        fn.displayName = `json: ${files}`;
        return fn;
    },

    images( files = `src/**/*.{${imageExtensions.join(',')}}` ) {
        const fn = function() {
            return src( files, { base : 'src' } )
                .pipe( imagemin() )
                .pipe( dest( 'dist' ) );
        }
        fn.displayName = `images: ${files}`;
        return fn;
    }
}

const build = series( clear, parallel( tasks.wxml(), tasks.wxss(), tasks.styl(), tasks.js(), tasks.json(), tasks.images() ) );

module.exports.wxml = tasks.wxml();
module.exports.wxss = tasks.wxss();
module.exports.styl = tasks.styl();
module.exports.js = tasks.js();
module.exports.json = tasks.json();
module.exports.images = tasks.images();
module.exports.build = build;
module.exports.clear = clear;

module.exports.watch = series( build, function watching() {
    function compile( file ) {
        const ext = path.extname( file ).replace( /^\./g, '' );
        const task = imageExtensions.includes( ext ) ? 'images' : ext;
        series( tasks[ task ]( file ) )();
    }
    watch( 'src/**/*' ).on( 'add', compile );
    watch( 'src/**/*' ).on( 'change', compile );
} );

/******************************************************************
 * Copyright (C) 2019 LvChengbin
 *
 * File：gulpfile.js
 * Author ：LvChengbin<lvchengbin59@gmail.com>
 * Time ：06/06/2019
 * Description ：
 ******************************************************************/

const path = require( 'path' );
const { argv } = require( 'yargs' );
const is = require( '@lvchengbin/is' );
const { parallel, series, watch } = require( 'gulp' );
const imageExtensions = require( 'image-extensions' );
const sources = require( './lib/sources' );
const task = require( './lib/task' );
const clean = require( './lib/clean' );
const version = require( '../package.json' ).version;

const { cosmiconfigSync } = require( 'cosmiconfig' );
const root = process.cwd();

const settingsKeys = [ 'compress', 'compile', 'report', 'tag' ];

let customSettings = {};
const cliSettings = {};

settingsKeys.forEach( key => {
    if( !is.undefined( argv[ key ] ) ) {
        cliSettings[ key ] = argv[ key ];
    }
} );

try {
    const explorerSync = cosmiconfigSync( 'z-fe-build' );
    const loaded = explorerSync.load( '.z-fe-build.json' );
    customSettings = loaded.config || {};
    console.log( `using settings file in ${loaded.filepath}` );
    console.log( require( 'util' ).inspect( customSettings, { depth : 10, colors : true } ) );
} catch( e ) { customSettings = {} }

function steps( settings = {} ) {
    settings = Object.assign( { root, version }, settings, cliSettings );
    const steps = [ clean( settings ) ];
    settings.report && steps.push( sources.task( { src : `**/*.{js,css,${imageExtensions.join( ',' )}}` }, settings ) );
    steps.push( parallel(
        task.image( settings ),
        task.font( settings ),
        task.css( settings ),
        task.js( settings ),
        task.mjs( settings ),
        task.njk( settings ),
        task.vue( settings )
    ) );

    settings.report && steps.push( sources.report( settings ) );
    return series( steps );
}

module.exports.build = steps( { ...customSettings.dev } );

module.exports.production = steps( {
    tag : true,
    compile : true,
    compress : true,
    ...customSettings.production
} );

module.exports.watch = series( steps( { ...customSettings.dev, ...customSettings.watch, tag : false } ), function watching() {
    const settings = { root, version, ...customSettings.watch };

    function run( file ) {
        const ext = path.extname( file ).slice( 1 );
        const t = imageExtensions.includes( ext ) ? 'image' : ext;
        const steps = [ task[ t ]( { src : file, ...settings } ) ];
        series( steps )();
    }

    watch( 'src/**/*' ).on( 'add', run );
    watch( 'src/**/*' ).on( 'change', run );
} );

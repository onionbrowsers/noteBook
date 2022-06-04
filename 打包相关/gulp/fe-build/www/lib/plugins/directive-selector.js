/******************************************************************
 * Copyright (C) 2020 LvChengbin
 *
 * File: plugins/directive-selector.js
 * Author: LvChengbin<lvchengbin59@gmail.com>
 * Time: 10/25/2020
 * Description:
 ******************************************************************/

const path = require( 'path' );
const through = require( 'through2' );
const PluginError = require( 'plugin-error' );
const convert = require( '@lvchengbin/base-convert' );

const PLUGIN_NAME = 'z:directive:selector';

const cache = new Map();
let id = 0;

module.exports = function directiveSelector() {

    return through.obj( function( file, encode, callback ) {
        if( file.isNull() ) return callback( null, file );
        if( file.isStream() ) {
            this.emit( 'error', new PluginError( {
                plugin : PLUGIN_NAME,
                message : 'Streams are not supported'
            } ) );
            return callback();
        }

        try {
            file.contents = Buffer.from( file.contents.toString().replace( /@@selector(?:::(\.*(?![a-zA-Z_$])))?/g, ( match, dots ) => {
                let target = path.dirname( file.path );

                if( dots && dots.length > 1 ) {
                    target = path.join( '/', ...target.split( '/' ).slice( 0, 1 - dots.length ) );
                }

                if( cache.get( target ) ) return cache.get( target );

                const selector = '_' + convert( id++, 10, 64 );
                cache.set( target, selector );
                return selector;
            } ) );

            callback( null, file );
        } catch( e ) {
            this.emit( 'error', new PluginError( PLUGIN_NAME, 'In file ' + path.relative( process.cwd(), file.path ) + ':\n' + e.message ) );
            return callback();
        }
    } );
};

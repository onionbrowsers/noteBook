/******************************************************************
 * Copyright (C) 2020 LvChengbin
 *
 * File: plugins/alias.js
 * Author: LvChengbin<lvchengbin59@gmail.com>
 * Time: 10/28/2020
 * Description:
 ******************************************************************/

const path = require( 'path' );
const through = require( 'through2' );
const PluginError = require( 'plugin-error' );
const escapeRegexp = require( 'escape-string-regexp' );
const is = require( '@lvchengbin/is' );

const PLUGIN_NAME = 'z:alias';

module.exports = function alias( settings = {} ) {

    return through.obj( function( file, encode, callback ) {
        if( file.isNull() ) return callback( null, file );
        if( file.isStream() ) {
            this.emit( 'error', new PluginError( {
                plugin : PLUGIN_NAME,
                message : 'Streams are not supported'
            } ) );
            return callback();
        }

        if( !settings.alias ) return callback( null, file );

        try {

            let contents = file.contents.toString();

            for( const item of settings.alias ) {
                let [ sub, replacer ] = item;
                if( is.string( sub ) ) {
                    sub = new RegExp( escapeRegexp( sub ), 'g' );
                } else if( is.regexp( sub ) && !sub.global ) {
                    sub = new RegExp( sub.source, `${sub.flags}g` );
                }
                contents = contents.replace( sub, replacer );
            }

            file.contents = Buffer.from( contents );
            return callback( null, file );

        } catch( e ) {
            this.emit( 'error', new PluginError( PLUGIN_NAME, 'In file ' + path.relative( process.cwd(), file.path ) + ':\n' + e.message ) );
            return callback();
        }
    } );
};

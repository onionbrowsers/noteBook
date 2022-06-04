/******************************************************************
 * Copyright (C) 2020 LvChengbin
 *
 * File: lib/sources.js
 * Author: LvChengbin<lvchengbin59@gmail.com>
 * Time: 09/16/2020
 * Description:
 ******************************************************************/

const fs = require( 'fs' );
const path = require( 'path' );
const glob = require( 'glob' );
const md5File = require( 'md5-file' );
const filesize = require( 'filesize' );
const style = require( 'cli-style' ).default;
const Table = require( '@lvchengbin/cli-table' );
// const util = require( './util' );

module.exports = {
    cache : new Map(),
    task( options = {}, settings = {} ) {
        const { root } = settings;
        const src = path.join( root, 'src' );

        const fn = () => {
            glob.sync( options.src, { cwd : src } ).forEach( x => {
                const fullPath = path.join( src, x );
                this.cache.set( fullPath, {
                    fullPath,
                    path : x,
                    usageCount : 0,
                    size : fs.statSync( fullPath ).size,
                    md5 : md5File.sync( fullPath ),
                    // dist : util.src2dist( fullPath, root )
                } );
            } );

            return Promise.resolve();
        };

        fn.displayName = settings.taskName || `sources: ${settings.src}`;
        return fn;
    },
    usageCount( src ) {
        if( !this.cache.get( src ) ) return;
        this.cache.get( src ).usageCount++;
    },
    report( settings = {} ) {
        const fn = () => {
            const list = [];
            let unused = 0;
            let empty = 0;
            let md5Map = {};
            this.cache.forEach( value => {
                if( !md5Map[ value.md5 ] ) {
                    md5Map[ value.md5 ] = [];
                }
                md5Map[ value.md5 ].push( value );
                if( value.size === 0 ) empty++;
                list.push( [ value.path, filesize( value.size ), value.usageCount ] );
            } );

            list.sort( ( a, b ) => b[ 2 ] - a[ 2 ] );

            const table = new Table( list );

            for( let i = 0, l = list.length; i < l; i += 1 ) {
                const item = list[ i ];
                if( item[ 2 ] === 0 ) {
                    unused++;
                    table.rows[ i ].cells.map( x => {
                        x.style = { color : 'orange', };
                    } );
                }
            }

            let dup = 0;
            const duplicate = {};

            for( const md5 of Object.keys( md5Map ) ) {
                const files = md5Map[ md5 ];
                if( files.length <= 1 ) continue;
                dup += files.length;
                duplicate[ md5 ] = files;
            }

            table.setHeader( [ 'File Path', 'Size', 'Usage Count' ] );
            console.log( '' );
            console.log( table.inspect() );

            if( dup ) {
                console.log( '' );
                console.log( '┌ ' + style( 'Duplicate files', { color : 'orange' } ) );
                for( const md5 of Object.keys( duplicate ) ) {
                    console.log( '│ ' );
                    console.log( '│ ' + style( `md5: ${md5}`, { dim : true } ) );
                    duplicate[ md5 ].map( x => {
                        console.log( `│ ➤ ${x.path}` );
                    } );
                }
                console.log( '│ ' );
                console.log( '└ ' + style( `${dup} duplicate files`, { dim : true } ) );
            }

            console.log( '' );

            console.log( `➤ Total files: ${list.length}` );
            console.log( `➤ Unused files: ${unused}` );
            console.log( `➤ Empty files: ${empty}` );
            console.log( `➤ Duplicate files: ${dup}` );

            return Promise.resolve();
        };

        fn.displayName = settings.taskName || 'source report';
        return fn;
    }
};

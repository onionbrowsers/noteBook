/******************************************************************
 * Copyright (C) 2019 LvChengbin
 *
 * File：index.js
 * Author ：LvChengbin<lvchengbin59@gmail.com>
 * Time ：06/01/2019
 * Description ：
 ******************************************************************/

const fs = require( 'fs' );
const path = require( 'path' );
const { crc32 } = require( 'crc' );
const style = require( 'cli-style' ).default;
const urlJoin = require( '@lvchengbin/url-join' );
const convert = require( '@lvchengbin/base-convert' );
const sources = require( './sources' );

const time = +new Date;

function tagPath( name, t ) {
    const ext = /^\.[^.]+$/.test( name ) ? name : path.extname( name );
    return name.split( '.' ).slice( 0, -1 ).join( '.' ) + `.${t}${ext}`;
}

function getStaticURL( options = {} ) {
    let { filePath, p, settings = {}, match, usageCount = false } = options;
    const { host = '/', root = '/' } = settings;

    if( /^(?:https?|ftp):\/\/.*/.test( p ) ) return p;

    const i = p.indexOf( '?' );
    const search = i > -1 ? p.substr( i ) : '';
    i > -1 && ( p = p.substr( 0, i ) );

    const src = path.join( root, 'src' );
    const dist = path.join( root, 'dist' );

    const c = p.charAt( 0 );
    let target = '';

    if( c === '.' ) {
        target = path.resolve( path.dirname( filePath ), p );
    } else {
        target = path.join( src, p );
    }

    if( !fs.existsSync( target ) ) {
        const x = target.replace( root, '' ).replace( /^\//, '' );
        const y = filePath.replace( root, '' ).replace( /^\//, '' );
        console.log( style( `Cannot resolve "${x}" with "${match}" in "${y}".`, { color : 'red' } ) );
    }

    const targetDist = src2dist( target, root );
    const relativePath = path.relative( dist, targetDist ).replace( /^\//, '' );
    usageCount && sources.usageCount( target );

    let url = urlJoin( host, relativePath );

    if( settings.tag ) {
        url = tagPath( url, tag( target ) );
    }

    url = urlJoin( url, search );

    if( settings.web_test_server_id ) {
        url = urlJoin( url, '?__web_test_server_id=' + settings.web_test_server_id );
    }
    return url;
}

function src2dist( src, root ) {
    const slices = path.relative( root, src ).split( '/' ).slice( 1 );
    const dist = path.join( root, 'dist' );
    const ext = path.extname( src );
    let res = path.join( dist, ext === '.njk' ? 'view' : 'static', ...slices );
    return appendExt( res );
}

/**
 * append the target extname for a path
 * supporting to pass a .ext directly
 */
function appendExt( src ) {
    const ext = /^\.[^.]+$/.test( src ) ? src : path.extname( src );
    if( [ '.mjs', '.vue' ].includes( ext ) ) src += '.js';
    return src;
}


function tag( path ) {
    return convert( crc32( [ time, path ].join( '###' ) ).toString( 16 ), 16, 36 );
}

module.exports = { getStaticURL, src2dist, tag, tagPath, appendExt };

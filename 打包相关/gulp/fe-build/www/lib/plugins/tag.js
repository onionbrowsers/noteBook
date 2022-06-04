/******************************************************************
 * Copyright (C) 2020 LvChengbin
 *
 * File: plugins/tag.js
 * Author: LvChengbin<lvchengbin59@gmail.com>
 * Time: 10/25/2020
 * Description:
 ******************************************************************/

const path = require( 'path' );
const rename = require( 'gulp-rename' );
const util = require( '../util' );

module.exports = function tag( settings = {} ) {
    const { root = '/' } = settings;
    return rename( ( pa, file ) => {
        if( !file.originalPath ) {
            console.error( `original path not exists in ${file.path}` );
        }

        const p = file.originalPath || file.path;

        const filePath = p.startsWith( '/' ) ? p : path.join( root, p );

        const tag = util.tag( filePath );

        return {
            dirname : pa.dirname,
            basename : pa.basename,
            extname : util.tagPath( util.appendExt( pa.extname ), tag )
        };
    } );
};

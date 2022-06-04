/******************************************************************
 * Copyright (C) 2020 LvChengbin
 *
 * File: plugins/branch.js
 * Author: LvChengbin<lvchengbin59@gmail.com>
 * Time: 11/25/2020
 * Description:
 ******************************************************************/

const through = require( 'through2' );

module.exports = function branch() {
    return through.obj( function( file, encode, callback ) {
        file.originalPath = file.path;
        return callback( null, file );
    } );
};

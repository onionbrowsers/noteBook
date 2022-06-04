/******************************************************************
 * Copyright (C) 2019 LvChengbin
 *
 * File：clean.js
 * Author ：LvChengbin<lvchengbin59@gmail.com>
 * Time ：06/14/2019
 * Description ：remove all files from dist
 ******************************************************************/

const { src } = require( 'gulp' );
const clean = require( 'gulp-clean' );

module.exports = function( settings = {} ) {
    const fn = () => {
        return src( 'dist', { read : false, allowEmpty : true } )
            .pipe( clean( { force : true } ) );
    };
    fn.displayName = settings.taskName || 'clean';
    return fn;
};

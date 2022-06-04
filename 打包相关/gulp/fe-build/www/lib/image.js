/******************************************************************
 * Copyright (C) 2020 LvChengbin
 *
 * File: lib/image.js
 * Author: LvChengbin<lvchengbin59@gmail.com>
 * Time: 11/25/2020
 * Description:
 ******************************************************************/

const { src, dest } = require( 'gulp' );
const imagemin = require( 'gulp-imagemin' );
const tag = require( './plugins/tag' );
const branch = require( './plugins/branch' );

module.exports = ( settings = {} ) => {
    const fn = function image() {
        let step = src( settings.src, { base : settings.base } );

        settings.compress && ( step = step.pipe( imagemin() ) );

        if( settings.tag ) {
            /**
             * generate a file in dist dir with original name before renaming it.
             */
            step = step.pipe( branch( settings ) ).pipe( dest( settings.dist ) ).pipe( tag( settings ) );
        }

        return step.pipe( dest( settings.dist ) );
    };
    fn.displayName = settings.taskName || fn.name;
    return fn;
};

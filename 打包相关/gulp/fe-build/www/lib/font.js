/******************************************************************
 * Copyright (C) 2020 LvChengbin
 *
 * File: lib/font.js
 * Author: LvChengbin<lvchengbin59@gmail.com>
 * Time: 10/29/2020
 * Description:
 ******************************************************************/

const { src, dest } = require( 'gulp' );
const tag = require( './plugins/tag' );
const branch = require( './plugins/branch' );

module.exports = ( settings = {} ) => {
    const fn = function font() {
        let step = src( settings.src, { base : settings.base } );

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

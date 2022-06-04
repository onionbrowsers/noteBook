/******************************************************************
 * Copyright (C) 2019 LvChengbin
 *
 * File：js.js
 * Author ：LvChengbin<lvchengbin59@gmail.com>
 * Time ：05/31/2019
 * Description ：
 ******************************************************************/

const { src, dest } = require( 'gulp' );
const buble = require( 'gulp-buble' );
const uglify = require( 'gulp-uglify-es' ).default;
const directiveSelector = require( './plugins/directive-selector' );
const directiveStatic = require( './plugins/directive-static' );
const branch = require( './plugins/branch' );
const alias = require( './plugins/alias' );
const tag = require( './plugins/tag' );

/**
 * @step buble
 */
module.exports = ( settings = {} ) => {
    const fn = function js() {
        let step = src( settings.src, { base : settings.base } )
            .pipe( alias( settings ) )
            .pipe( directiveSelector( settings ) )
            .pipe( directiveStatic( settings ) );

        /**
         * sometimes, it doesn't need to compile ES6 code to ES5
         */
        settings.compile && ( step = step.pipe( buble( {
            objectAssign : 'Object.assign',
            transforms : {
                dangerousForOf : true
            }
        } ) ) );
        settings.compress && ( step = step.pipe( uglify() ) );
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

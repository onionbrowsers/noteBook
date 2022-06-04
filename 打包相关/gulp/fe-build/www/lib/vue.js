/******************************************************************
 * Copyright (C) 2020 LvChengbin
 *
 * File: lib/vue.js
 * Author: LvChengbin<lvchengbin59@gmail.com>
 * Time: 10/21/2020
 * Description:
 ******************************************************************/

const { src, dest } = require( 'gulp' );
const buble = require( 'gulp-buble' );
const babel = require( 'gulp-babel' );
const rename = require( 'gulp-rename' );
const uglify = require( 'gulp-uglify-es' ).default;
const vueCompiler = require( '@z-toolkit/gulp-vue' ).default;
const directiveSelector = require( './plugins/directive-selector' );
const directiveStatic = require( './plugins/directive-static' );
const branch = require( './plugins/branch' );
const alias = require( './plugins/alias' );
const tag = require( './plugins/tag' );

module.exports = ( settings = {} ) => {
    const fn = function vue() {
        let step = src( settings.src, { base : settings.base } )
            .pipe( alias( settings ) )
            .pipe( directiveSelector( settings ) )
            .pipe( vueCompiler() )
            .pipe( babel( { plugins : [ [ '@babel/plugin-transform-modules-amd', {
                loose : true
            } ] ] } ) )
            .pipe( directiveStatic( settings ) )
            .pipe( rename( { extname : '.vue.js' } ) );

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

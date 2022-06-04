/******************************************************************
 * Copyright (C) 2019 LvChengbin
 *
 * File：css.js
 * Author ：LvChengbin<lvchengbin59@gmail.com>
 * Time ：05/31/2019
 * Description ：
 ******************************************************************/

const { src, dest } = require( 'gulp' );
const postcss = require( 'gulp-postcss' );
const autoprefixer = require( 'autoprefixer' );
const nested = require( 'postcss-nested' );
const atimport = require( 'postcss-import' );
const cssnano = require( 'cssnano' );
const directiveSelector = require( './plugins/directive-selector' );
const directiveStatic = require( './plugins/directive-static' );
const branch = require( './plugins/branch' );
const alias = require( './plugins/alias' );
const tag = require( './plugins/tag' );

/**
 * @step replace @@selector with placeholder for suppressing errors while using cssnano.
 * @step postcss
 * @step replace placeholder with @@selector for executing directives.
 */
module.exports = ( settings = {} ) => {
    const fn = function css() {
        const processors = [
            autoprefixer(),
            atimport(),
            nested
        ];

        settings.compress && processors.push( cssnano( { preset : 'default' } ) );

        let step = src( settings.src, { base : settings.base } )
            .pipe( alias( settings ) )
            .pipe( directiveSelector( settings ) )
            .pipe( directiveStatic( settings ) )
            .pipe( postcss( processors ) );

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

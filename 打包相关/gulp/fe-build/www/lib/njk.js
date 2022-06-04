/******************************************************************
 * Copyright (C) 2019 LvChengbin
 *
 * File：njk.js
 * Author ：LvChengbin<lvchengbin59@gmail.com>
 * Time ：05/31/2019
 * Description ：
 ******************************************************************/

const { src, dest } = require( 'gulp' );
const directiveSelector = require( './plugins/directive-selector' );
const directiveStatic = require( './plugins/directive-static' );
const alias = require( './plugins/alias' );

/**
 * @step directives
 * @step strip-comments
 * @step tag
 */
module.exports = ( settings = {} ) => {
    const fn = function njk() {
        let step = src( settings.src, { base : settings.base } )
            .pipe( alias( settings ) )
            .pipe( directiveSelector( settings ) )
            .pipe( directiveStatic( settings ) );

        return step.pipe( dest( settings.dist ) );
    };
    fn.displayName = settings.taskName || fn.name;
    return fn;
};

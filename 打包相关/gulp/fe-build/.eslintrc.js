/******************************************************************
 * Copyright (C) 2020 LvChengbin
 *
 * File: fe-build/.eslintrc.js
 * Author: LvChengbin<lvchengbin59@gmail.com>
 * Time: 11/25/2020
 * Description:
 ******************************************************************/

module.exports = {
    plugins : [ '@lvchengbin/eslint-plugin-tiring' ],
    extends : [
        'plugin:@lvchengbin/eslint-plugin-tiring/recommended'
    ],
    parserOptions : {
        ecmaVersion : 2020
    },
    env : {
        browser : true,
        es6 : true,
        jest : true,
        node : true
    }
};

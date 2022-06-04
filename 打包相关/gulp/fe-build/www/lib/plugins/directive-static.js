/******************************************************************
 * Copyright (C) 2020 LvChengbin
 *
 * File: plugins/directive-static.js
 * Author: LvChengbin<lvchengbin59@gmail.com>
 * Time: 10/25/2020
 * Description:
 ******************************************************************/

const path = require( 'path' );
const { JSDOM } = require( 'jsdom' );
const through = require( 'through2' );
const PluginError = require( 'plugin-error' );
const util = require( '../util' );

const PLUGIN_NAME = 'directive:static';

const segs = {
    widget : '{%\\s*widget\\s+[\\s\\S]*?%}',
    script : '<script\\s+[^>]+>',
    link : '<link\\s+[^>]+>',
    define : '\\bdefine\\s*\\([^)]+\\)',
    require : '\\brequire\\s*\\([^)]+\\)',
    img : '<img\\s+[^>]*>',
    url : '\\burl\\([^)]+\\)',
    audio : '<audio\\s+[^>]*>',
    video : '<video\\s+[^>]*>',
    source : '<source\\s+[^>]*>'
};

const seg = `
    (?:${segs.widget})|
    (?:${segs.script})|
    (?:${segs.link})|
    (?:${segs.define})|
    (?:${segs.require})|
    (?:${segs.img})|
    (?:${segs.url})|
    (?:${segs.audio})|
    (?:${segs.video})|
    (?:${segs.source})
`;

module.exports = function directiveStatic( settings = {} ) {
    return through.obj( function( file, encode, callback ) {
        if( file.isNull() ) return callback( null, file );
        if( file.isStream() ) {
            this.emit( 'error', new PluginError( {
                plugin : PLUGIN_NAME,
                message : 'Streams are not supported'
            } ) );
            return callback();
        }

        const reg = new RegExp( seg.replace( /\n\s*/g, '' ), 'ig' );

        const trans = ( match, p ) => {
            if( !/^[a-zA-Z0-9_\-./@$#?&]+$/.test( p ) ) return p;
            /**
             * file extension is required
             */
            if( !p.includes( '.' ) ) return p;

            return util.getStaticURL( {
                usageCount : true,
                filePath : file.path,
                p, settings, match
            } );
        };

        try {
            const contents = file.contents.toString().replace( reg, match => {

                /**
                 * for nunjucks {% widget %} tag
                 * - replace attribute css=[]
                 * - replace attribute js=[]
                 */
                if( new RegExp( segs.widget ).test( match ) ) {
                    return match.replace( /(css|js)=\[([^\]]+)\]/g, ( m, t, n ) => {
                        const urls = n.split( ',' ).map( x => {
                            x = x.trim();
                            const q = x.charAt( 0 );
                            return `${q}${trans( match, x.replace( /^['"]|['"]$/g, '' ) )}${q}`;
                        } );

                        return `${t}=[ ${urls.join( ', ' )} ]`;
                    } );
                }

                /**
                 * for <script> tags
                 * - replace attribute src
                 * - modify the tag if type="module"
                 */
                if( new RegExp( segs.script ).test( match ) ) {
                    const dom = new JSDOM( match );
                    const script = dom.window.document.querySelector( 'script' );
                    const { src, type } = script;

                    if( type === 'module' ) {
                        script.removeAttribute( 'type' );
                        script.removeAttribute( 'src' );
                        return script.outerHTML.replace( /[^>]*<\/script>$/i, '' ) + `require(["${trans( match, src )}"])`;
                    }

                    return match.replace( /\ssrc=(\\?['"])(.*?)\1/i, ( m, q, n ) => {
                        return ` src=${q}${trans( match, n )}${q}`;
                    } );
                }

                /**
                 * for <img /> tags
                 * - replace attribute src
                 */
                if( new RegExp( segs.img ).test( match ) ) {
                    return match.replace( /\ssrc=(\\?['"])(.*?)\1/i, ( m, q, n ) => {
                        return ` src=${q}${trans( match, n )}${q}`;
                    } );
                }

                /**
                 * for <audio> tags
                 * - replace attribute src
                 */
                if( new RegExp( segs.audio ).test( match ) ) {
                    return match.replace( /\ssrc=(\\?['"])(.*?)\1/i, ( m, q, n ) => {
                        return ` src=${q}${trans( match, n )}${q}`;
                    } );
                }

                /**
                 * for <video> tag
                 * - replace attribute src
                 * - replace attribute poster
                 */
                if( new RegExp( segs.video ).test( match ) ) {
                    return match.replace( /\ssrc=(\\?['"])(.*?)\1/, ( m, q, n ) => {
                        return ` src=${q}${trans( match, n )}${q}`;
                    } ).replace( /\sposter=(['"])(.*?)\1/, ( m, q, n ) => {
                        return ` poster=${q}${trans( match, n )}${q}`;
                    } );
                }

                /**
                 * for <source> tag
                 * - replace attribute src
                 * - replace attribute poster
                 */
                if( new RegExp( segs.source ).test( match ) ) {
                    return match.replace( /\ssrc=(\\?['"])(.*?)\1/, ( m, q, n ) => {
                        return ` src=${q}${trans( match, n )}${q}`;
                    } );
                }

                /**
                 * for <link /> tag
                 * - replace attribute href
                 */
                if( new RegExp( segs.link ).test( match ) ) {
                    return match.replace( /\shref=(\\?['"])(.*?)\1/, ( m, q, n ) => {
                        return ` href=${q}${trans( match, n )}${q}`;
                    } );
                }

                if( new RegExp( segs.define ).test( match ) || new RegExp( segs.require ).test( match ) ) {
                    return match.replace( /\[([^\]]+)\]/g, ( m, n ) => {
                        const urls = n.split( ',' ).map( x => {
                            x = x.trim();
                            const q = x.charAt( 0 );
                            return `${q}${trans( match, x.replace( /^['"]|['"]$/g, '' ) )}${q}`;
                        } );
                        return `[ ${urls.join( ', ' )} ]`;
                    } );
                }

                if( new RegExp( segs.url ).test( match ) ) {
                    return match.replace( /url\(\s*(['"]?)(.*?)\1\s*\)/, ( m, q, n ) => {
                        return `url(${q}${trans( match, n )}${q})`;
                    } );
                }

                return match;
            } ).replace( /@@static::([^\s<>'"\\]+)/g, ( match, p ) => trans( match, p ) );

            file.contents = Buffer.from( contents );

            callback( null, file );
        } catch( e ) {
            this.emit( 'error', new PluginError( PLUGIN_NAME, 'In file ' + path.relative( process.cwd(), file.path ) + ':\n' + e.message ) );
            return callback();
        }
    } );
};

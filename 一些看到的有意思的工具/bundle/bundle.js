const fs = require('fs')
const path = require('path')

const bableParse = require('@babel/parser')
const traverse = require('@babel/traverse')
const babel = require('@babel/core')

const moduleParse = file => {
    const dependencies = {}
    const rawCode = fs.readFileSync(file, 'utf-8')
    const ast = bableParse.parse(rawCode, {
        sourceType: 'module'
    })
    traverse.default(ast, {
        ImportDeclaration({node}) {
            const dirname = path.dirname(file)
            const absoluteFile = `./${path.join(dirname, node.source.value).replace('//', '/')}.js`
            dependencies[node.source.value] = absoluteFile
        }
    })

    const {code} = babel.transformFromAst(ast, null, {
        presets: ['@babel/preset-env']
    })
    
    return {
        file,
        dependencies,
        code,
    };
}

const buildDependenceGraph = entry => {
    const entryModule = moduleParse(entry)
    const rawDependenceGraph = [entryModule]
    for (const module of rawDependenceGraph) {
        const {dependencies} = module
        if (Object.keys(dependencies).length) {
            for (const file in dependencies) {
                console.log(file, '---')
                rawDependenceGraph.push(moduleParse(dependencies[file]))
            }
        }
    }
    const dependenceGraph = {}
    rawDependenceGraph.forEach(module => {
        dependenceGraph[module.file] = {
            dependencies: module.dependencies,
            code: module.code
        }
    })
    return dependenceGraph
}

const generateCode = entry => {
    const dependenceGraph = JSON.stringify(buildDependenceGraph(entry))
    return `(function (dependenceGraph) {
            console.log(dependenceGraph)
            function require(module) {
                function localRequire(relativePath) {
                    return require(dependenceGraph[module].dependencies[relativePath])
                }
                const exports = {}
                console.log(dependenceGraph[module], '-x-')
                // (function (require, exports, code) {
                //     console.log(code, '---')
                //     eval(code)
                // })(localRequire, exports, dependenceGraph[module].code)
                return exports
            }
            require('${entry}')
        })(${dependenceGraph})`
}

console.log(generateCode('./src/index.js'))

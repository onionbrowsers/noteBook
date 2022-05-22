let proto = {
    test: 'test'
}

let obj1 = {
    a: {
        b: [{a: 3, b: 1}, 2, 3],
        c: {
            d: 4,
            e: 5
        },
        m: 'test',
        e: 1
    },
    b: 1,
    c: {},
    d: null,
    e: 4,
    [Symbol('a')]: 'SymbolA'
}
let obj2 = {
    a: {
        b: [{a: 2}, 5, 6],
        c: {
            d: 1
        },
        e: undefined
    },
    b: {
        c: 3
    },
    // d: null,
    c: 1,
    f: 5,
    testObj: {a: 1},
    [Symbol('a')]: 'Symbol'
}

let proto2 = {
    test1: 'test123'
}

Object.setPrototypeOf(obj1, proto)
Object.setPrototypeOf(obj2, proto2)

let obj3 = {
    a: {
        m: 'test1',
        c: [1, 2, 3]
    }
}

function isObject(target) {
    return Object(target) === target
}

function cloneObj(target, ...source) {
    if (!isObject(target)) throw new Error('target is not object')
    if (!source.length) return target
    function handler(target, source, cloneObj = {}) {
        cloneObj = Object.assign(Array.isArray(target) ? [] : {}, target, source)
        for (let key of Object.keys(target)) {
            if ( !source[ key ] || !isObject( target[ key ] ) ) continue
            if ( !isObject(source[key]) ) continue
            if ( Array.isArray(source[key]) && !Array.isArray(target[key]) ) continue
            cloneObj[key] = handler(target[key], source[key], cloneObj[key])
        }
        return cloneObj
    }

    return source.reduce((curObj, curSourceObj) => {
        if (!isObject(curSourceObj)) return curObj
        return handler(curObj, curSourceObj)
    }, target)
}
console.log(obj1)
console.log(cloneObj(obj1, obj2, obj3))
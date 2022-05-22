let obj1 = {
    a: undefined,
    b: 1,
    c: null,
    d: new Set([{a: 1}, {b: 2}, 3]),
    e: new Map([
        [{a: 1}, {b: 2}],
        [1, 2]
    ]),
    f: new Date(),
    g: /123/g,
    h: {
        a: 1,
        b: 2,
        c: {
            a: 1
        }
    },
    i: [1, 2, {a: 1}, {b: 2}, Symbol('456')],
    l: Symbol('123'),
    m: new Number(1),
    n: new String(1),
    [str]: 'symbol'
}
obj1.j = {
    a : obj1
}

function isObject(value) {
    return value && typeof value === 'object' 
}

const toString = Object.prototype.toString

const setTag = '[object Set]'
const mapTag = '[object Map]'
const regExpTag = '[object RegExp]'
const dateTag = '[object Date]'
const funTag = '[object Function]'

function outputVal(target, origin) {
    return !isObject(target) || toString.call(target) === funTag || target === origin
}

function deepClone(target, handle = null, origin = null) {
    if (!isObject(target)) return target
    if (!origin) origin = target
    handle = Array.isArray(target) ? [] : {}
    const keys = Reflect.ownKeys(target)
    for (let key of keys) {
        if (outputVal(target[key], origin)) {
            handle[key] = target[key]
            continue
        }
        if (toString.call(target[key]) === setTag) {
            handle[key] = new Set()
            target[key].forEach(item => {
                handle[key].add(deepClone(item, {}, origin))
            })
            continue
        }
        if (toString.call(target[key]) === mapTag) {
            handle[key] = new Map()
            const map = target[key]
            for (let [curKey, value] of map.entries()) {
                handle[key].set(curKey, deepClone(value, {}, origin))
            }
            continue
        }
        if (toString.call(target[key]) === regExpTag) {
            handle[key] = new RegExp(target[key])
            continue
        }
        if (toString.call(target[key]) === dateTag) {
            handle[key] = new Date(target[key])
            continue
        }
        if (Array.isArray(target[key])) {
            handle[key] = deepClone(target[key], [], origin)
        }
        handle[key] = deepClone(target[key], {}, origin)
    }
    return handle
}

let obj2 = deepClone(obj1)

console.log(obj2)
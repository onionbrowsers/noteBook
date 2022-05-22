Function.prototype.myBind = function (newThis, ...args) {
    const fn = this
    let protoFn = function () { }
    let res = function (...args2) {
        let uesThis = (this instanceof protoFn) ? this : newThis
        return fn.apply(uesThis, [...args, ...args2])
    }
    if (fn.prototype) protoFn.prototype = fn.prototype
    res.prototype = new protoFn()
    return res
}

class Person {
    constructor() {
        this.name = 1
    }
}

let personFunc = Person.bind()
let person = new personFunc()
console.log(person)
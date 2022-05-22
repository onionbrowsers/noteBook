Function.prototype.myNew = function (...args) {
    let obj = Object.create(this.prototype)
    let res = this.apply(obj, [...args])
    return typeof res === 'object' ? res : obj
}
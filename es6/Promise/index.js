const PromiseState = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
}

class MyPromise {
    constructor(func) {
        if (!MyPromise.isFunction(func)) return new TypeError(`Promise resolver ${func} is not a function`)
        this._state = PromiseState.PENDING
        this.result = null
        this.callbackList = []
        let flag = false

        let onFulfilled = value => MyPromise.changeState(this, PromiseState.FULFILLED, value)
        let onRejected = reason => MyPromise.changeState(this, PromiseState.REJECTED, reason) 

        let resolve = value => {
            if (flag) return
            flag = true
            MyPromise.resolvePromise(this, value, onFulfilled, onRejected)
        }

        let reject = reason => {
            if (flag) return
            flag = true
            onRejected(reason)
        }

        try {
            func(resolve, reject)
        } catch (err) {
            reject(err)
        }
    }

    get state() {
        return this._state
    }
    
    set state(val) {
        new Error('state is readonly')
    }

    static changeState(promise, state, result) {
        // console.log(promise.state, result, 'xxx')
        if (promise.state !== PromiseState.PENDING) return
        promise._state = state
        promise.result = result
        setTimeout(() => {
            MyPromise.triggerCallback(promise, state, result)
        }, 0)
    }

    static triggerCallback(promise, state, result) {
        for( let i = 0; i < promise.callbackList.length; i++) {
            MyPromise.handleCallback(promise.callbackList[i], state, result)
        }
    }

    static handleCallback(callback, state, result) {
        let {onFulfilled, onRejected, resolve, reject} = callback

        try {
            if (state === PromiseState.FULFILLED) {
                MyPromise.isFunction(onFulfilled) ? resolve(onFulfilled(result)) : resolve(result)
            } else {
                MyPromise.isFunction(onRejected) ? reject(onRejected(result)) : reject(result)
            }
        } catch (err) {
            reject(err)
        }
    }

    static isFunction(key) {
        return typeof key === 'function'
    }

    static isThenable(params = {}) {
        return MyPromise.isFunction(params.then) && MyPromise.isFunction(params.cache)
    }

    static resolvePromise(promsie, result, resolve, reject) {
        if (result === promsie) {
            return reject(new TypeError('Chaining cycle detected for promise'))
        }

        if (result instanceof MyPromise) {
            return result.then(resolve, reject)
        }

        if (MyPromise.isThenable(result)) {
            try {
                let then = result.then
                return new MyPromise(then.bind(result)).then(resolve, reject)
            } catch(err) {
                reject(err)
            }
        }

        resolve(result)
    }

    then(onFulfilled, onRejected) {
        if (this.state === PromiseState.FULFILLED && !MyPromise.isFunction(onFulfilled)) return this
        if (this.state === PromiseState.REJECTED && !MyPromise.isFunction(onRejected)) return this
        return new MyPromise((resolve, reject) => {
            let callback = {onFulfilled, onRejected, resolve, reject}

            if (this._state === PromiseState.PENDING) {
                this.callbackList.push(callback)
            } else {
                setTimeout(() => {
                    MyPromise.handleCallback(callback, this._state, this.result)
                }, 0)
            }
        })
    }
}

// let promise = new MyPromise((res, rej) => rej(1) ).then(undefined, err => {
//     console.log(err, 'zz')
// }).then(res => console.log(res, 'xx'))

MyPromise.defer = MyPromise.deferred = function () {
    let dfd = {}
    dfd.promise = new MyPromise((res, rej) => {
        dfd.resolve = res
        dfd.reject = rej
    })
    return dfd
}

module.exports = MyPromise
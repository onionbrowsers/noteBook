const debounce = function (fn, wait = 16, immediate = false) {
    let timer;
    return function (...args) {
        timer && clearTimeout(timer)
        if (immediate) {
            const callNow = !timer
            timer = setTimeout(() => {
                timer = null
            }, wait)
            return callNow && fn.apply(context, args)
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, wait)
    }
}
debounce.cancel = () => {
    timer && clearTimeout(timer)
    timer = null
}

const throttle = function (fn, wait) {
    let last = 0
    return function (...args) {
        let now = new Date().getTime()
        if (now - last > wait) {
            last = now
            fn.apply(this, args)
        }
    }
}

const throttle1 = function (fn, wait) {
    let timer;
    return function (...args) {
        if (timer) return
        timer = setTimeout(() => {
            fn.apply(this, args)
            timer = null
        }, wait)
    }
}

document.onclick = debounce(() => {
    console.log(123)
}, 1000, false)

document.onmousemove = throttle1(() => {
    console.log('throttle1')
}, 1000)
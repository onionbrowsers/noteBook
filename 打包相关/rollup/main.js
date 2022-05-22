import {add, multiply} from './a'
import {version} from './package.json'
import answer from 'the-answer'

let a = add(1, 2)

let mul = multiply(2, 5)

console.log(a)

new Promise((res, ref) => {
    res(1)
}).then(res => {
    console.log(res?.a?.b)
    console.log(res ?? 'none')
})

function *test () {
    yield a
}

test()

export default {
    a,
    version,
    mul,
    answer() {
        console.log('the answer is' + answer)
    }
}

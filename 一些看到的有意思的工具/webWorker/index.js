// let i = 1
// function simpleCount() {
//     i++
//     self.postMessage(i)
//     setTimeout(simpleCount, 5000)
// }

// simpleCount()

console.log(self)

self.onmessage = event => {
    console.log(event.data)
    event.data.obj.a = 2
    postMessage(event.data + 'aaa')
}
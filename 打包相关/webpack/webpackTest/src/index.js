import './assets/index.css'
import './assets/index.styl'
import './assets/img/icon-boy.png'
import './assets/img/1590744241568.jpg'
import {createApp} from 'vue'
import App from "./App.vue";

console.log(App, '---')
createApp(App).mount('#app')

new Promise((res, rej) => {
    res(1)
}).then(res => {
    console.log(res)
})

let a = 0
let b = 100

a ||= b

console.log(a)

console.log('webpack2')
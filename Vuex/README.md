# Vuex

第三方库，调试VUE vue dev tools

使用Ajax，npm install axios --save

 一个项目只能有一个vuex实例

 vue npm install vuex --save

vuex会注入一个$store的变量

```js
import Vuex from "vuex"
Vue.use(vuex)
// vuex 是对象 外界用vuex的state数据用计算属性
let store = new Vuex.store({
     state:{
         num:100
     }，
     // 类似于computed计算属性
     getters:{
         num1(state){
             return state.num >300 ? 300 : state.num
         }
     }
     // 在这里使用state里面的数据，不可以直接使用，不能执行异步的操作
     mutations:{
         addmutations(state){
            state.num++
         }
     },
     // 异步操作
     actions:{
         addActions(obj){
             setTimeOut(() => {
                 obj.commit('addmutations', 20)
             },)
         }
     }
 })
 // modules 注入模块化           

// 用计算属性
computed {
    func() {
        return this.$store.state.num
    }
}
// 使用VUEx的state里面的值
$store.state.num
// 使用vuex的mutations中的函数   
$store.commit(“addmutations”) 
// 使用vuex中的actions中的函数
$store.dispatch("addActions    ") 异步时使用
```
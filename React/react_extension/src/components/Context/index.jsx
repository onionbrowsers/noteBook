import React, {createContext, Component} from 'react'

/**
 * 类组件之间的通信
 */
const UserNameContext = createContext()
export default class A extends Component {
    state = {
        name: 'tom'
    }
    changeName() {
        this.setState({name: 'jerry'})
    }
    render() {
        const {name} = this.state
        return (
            <div>
                <h2>A</h2>
                <h3>用户名：{name}</h3>
                <button onClick={this.changeName.bind(this)}>修改用户名</button>
                <UserNameContext.Provider value={{name}}>
                    <B></B>
                </UserNameContext.Provider>
            </div>
        )
    }
}
class B extends Component {
    render() {
        return (
            <div>
                <h2>B</h2>
                <h3>用户名：</h3>
                <C></C>
            </div>
        )
    }
}
class C extends Component {
    static contextType = UserNameContext

    shouldComponentUpdate(...args) {
        console.log(args)
        return true
    }
    render() {
        console.log(this.context)
        return (
            <div>
                <h2>C</h2>
                <h3>用户名：{this.context.name || ''}</h3>
            </div>
        )
    }
}

console.dir(C)

/**
 * 函数式组件和类组件都可以用下面的方式
 */
// const UserNameContext = createContext()
// console.log(UserNameContext)
// export default function A() {
//     const [name] = React.useState('tom')
//     return (
//         <div>
//             <h2>A</h2>
//             <h3>用户名：{name}</h3>
//             <UserNameContext.Provider value={{name}}>
//                 <B></B>
//             </UserNameContext.Provider>
//         </div>
//     )
// }

// function B() {
//     return (
//         <div>
//             <h2>B</h2>
//             <h3>用户名：</h3>
//             <C></C>
//         </div>
//     )
// }

// function C() {
//     return (
//         <div>
//             <h2>C</h2>
//             <UserNameContext.Consumer>
//                 {
//                     value => {
//                         return (
//                             <h3>用户名：{value.name}</h3>
//                         )
//                     }
//                 }
//             </UserNameContext.Consumer>
//         </div>
//     )
// }


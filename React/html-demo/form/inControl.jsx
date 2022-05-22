class Login extends React.Component{
    state = {
        username: '',
        password: ''
    }
    render() {
        return (
            <form onSubmit={this.submitData}>
                {/* 非受控组件 */}
                {/* 用户名：<input ref={ref => this.username = ref} type="text" name="username" id="" />
                密码：<input ref={ref => this.password = ref}  type="password" name="password" id="" />
                <button>登录</button> */}
                {/* 受控组件 */}
                用户名：<input onChange={this.changeValue.bind(this, 'username')} ref={ref => this.username = ref} type="text" name="username" />
                密码：<input onChange={this.changeValue.bind(this, 'password')} ref={ref => this.password = ref}  type="password" name="password" />
                <button>登录</button>
            </form>
        )
    }
    changeValue(key, event) {
        this.setState({
            [key]: event.target.value
        })
    }
    submitData = (event) => {
        event.preventDefault()
        const {username, password} = this
        console.log(username.value, password.value)

        console.log(this.state)
    }
}

ReactDOM.render(<Login />, document.getElementById('test'))

// 函数柯里化
// function sum(a) {
//     return (b) => {
//         return (c) => {
//             return a + b + c
//         }
//     }
// }

// console.log(sum(1)(2)(3))
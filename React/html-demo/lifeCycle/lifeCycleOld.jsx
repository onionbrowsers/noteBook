/**
 *
 *
 * @class Count
 * @extends {React.Component}
 */

console.log(React.Suspense)

class Count extends React.Component {
    /**
     * 生命周期顺序如下
     * @param {*} props 
     */
    constructor(props) {
        console.log('constructor')
        super(props)
        this.state = {
            count: 0
        }
    }

    componentWillMount(...args) {
        console.log('componentWillMount', args)
    }

    /**
     * 是否允许更新组件 setState后从这里开始触发，true为允许，false为不允许
     * @returns Boolean
     */
    shouldComponentUpdate(...args) {
        console.log('shouldComponentUpdate', args)
        return true
    }

    /**
     * 强制更新后会直接走这个及之后的流程
     */   
    componentWillUpdate(...args) {
        console.log('componentWillUpdate', args)
    }

    /**
     * 更新渲染的钩子
     * 常用
     * @returns html结构
     */
    render() {
        console.log('render')
        const {count} = this.state
        return (
             <div>
                 <h2>当前值为：{count}</h2>
                 <button onClick={this.add}>点我+1</button>
                 <button onClick={this.unmount}>卸载</button>
                 <button onClick={this.force}>强制更新</button>
             </div>
        );
    }

    componentDidUpdate(...args) {
        console.log('componentDidUpdate', args)
    }

    /**
     * 常用
     * 初始化的事
     */
    componentDidMount(...args) {
        console.log('componentDidMount', args)
    }

    /**
     * 卸载的时候才会用，类似于beforeDestroy
     * 常用
     * 收尾工作
     */
    componentWillUnmount(...args) {
        console.log('componentWillUnmount', args)
    }

    add = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    unmount = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById('test'))
    }

    force = () => {
        console.log(ReactDOM, )
        this.forceUpdate()
    }
}

// 父子组件生命周期
class A extends React.Component {
    state = {
        carName: '奔驰'
    }
    render() {
        return (
            <div>
                <div>A</div>
                <button onClick={this.changeCar}>换车</button>
                <B carName={this.state.carName}></B>
            </div>
        )
    }
    changeCar = () => {
        this.setState( {
            carName: '奥拓'
        } )
    }
}

class B extends React.Component {
    // 第一次渲染不会调用这个生命周期
    componentWillReceiveProps(...args) {
        console.log('B receive props', args)
    }
    shouldComponentUpdate(...args) {
        console.log('shouldComponentUpdate', args)
        return true
    }
    render() {
        const {carName} = this.props
        return (
            <div>{carName}</div>
        )
    }
}   

ReactDOM.render(<Count test="test"></Count>, document.getElementById('test'))
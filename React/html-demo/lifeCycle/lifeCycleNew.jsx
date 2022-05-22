/**
 *
 * 新版生命周期
 * @class Count
 * @extends {React.Component}
 */

let lock = false


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

    /**
     * 少用，组件的state的所有属性完全取决于props的时候可以使用
     * 替换旧版本的 componentWillMount, componentWillReceiveProps
     * @param  {...any} args 
     * @returns object
     */
    // static getDerivedStateFromProps(props, state) {
    //     console.log('getDerivedStartFromProps', props, state)
    //     if (props.count) {
    //         state.count = props.count
    //         return state
    //     }
    //     return nu
    // }

    /**
     * 是否允许更新组件 setState后从这里开始触发，true为允许，false为不允许
     * @returns Boolean
     */
    shouldComponentUpdate(...args) {
        console.log('shouldComponentUpdate', args)
        return true
    }

    /**
     * 更新渲染的钩子
     * 常用
     * @returns html结构
     */
    render() {
        console.log('render')
        const { count } = this.state
        return (
            <div>
                <h2>当前值为：{count}</h2>
                <button onClick={this.add}>点我+1</button>
                <button onClick={this.unmount}>卸载</button>
                <button onClick={this.force}>强制更新</button>
            </div>
        );
    }

    /**
     * 在dom快要更新之前触发
     * @param  {...any} args 
     * @returns 
     */
    getSnapshotBeforeUpdate(...args) {
        console.log('getSnapshotBeforeUpdate', args)
        return null
    }

    /**
     * 
     * @param {prop} preProps 
     * @param {state} preState 
     */
    componentDidUpdate(preProps, preState, snapShortValue) {
        console.log('componentDidUpdate', preProps, preState)
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
        console.log(ReactDOM,)
        this.forceUpdate()
    }
}

ReactDOM.render(<Count count={199}></Count>, document.getElementById('test'))
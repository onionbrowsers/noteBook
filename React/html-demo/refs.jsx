class Demo extends React.Component {
    input1 = React.createRef() 
    state = {
        isHot: true
    }
    render() {
        const {isHot} = this.state
        return (
            <React.Fragment>
                <div>
                    <input ref={this.input1} placeholder="点击按钮提示" type="text" />
                    <button ref='button' onClick={this.showData}>点我提示数据</button>
                    <input ref={ref => this.funcRef = ref} onBlur={this.showData2} placeholder="失去焦点提示" type="text" />
                    <button onClick={this.threeRefMethod}>三种ref方式</button>
                </div>
                <div>
                    {/* 
                        内联回调函数的问题，
                        更新组件后第一次ref是null
                        之后才是nodeElment
                    */}
                    <h2 onClick={() => this.clickH2()}>今天天气很{isHot ? '炎热' : '凉爽'}</h2>
                    {/* <input ref={ref => {this.testRef = ref; console.log(ref) } } /> */}
                    {/* 解决方案 */}
                    <input ref={this.getInput} type="text" />
                </div>
            </React.Fragment>
        )
    }
    getInput = (ref) => {
        console.log(React.createRef)
        this.testRef = ref
        console.log(ref)
    }
    clickH2() {
        console.log(123)
        this.setState({
            isHot: !this.state.isHot
        })
    }
    showData = () => {
        console.log(this)
        console.log(this.input1.current.value)
    }
    showData2 = (event) => {
        console.log(event.target.value)
    }
    threeRefMethod = () => {
        // string ref
        console.log(this.refs)
        // callback func ref
        console.log(this.funcRef)
        // api
        console.log(this.input1)
    }
}

ReactDOM.render(<Demo></Demo>, document.getElementById('test'))

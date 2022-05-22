
class Weather extends React.Component {
    // constructor(props) {
    //     console.log(props)
    //     super(props)
    //     this.state = {
    //         isHot: true
    //     }
    // }
    state = {isHot: true}
    render() {
        console.log('render')
        const {isHot} = this.state
        return (
            <div>
                <h1 onClick={this.clickH1Func}>今天天气很{isHot ? '炎热' : '凉爽' }</h1>
                <h1 onClick={this.clickH1.bind(this)}>今天天气很{isHot ? '炎热' : '凉爽' }</h1>
            </div>
        )
    }
    clickH1() {
        console.log(this)
        const {isHot} = this.state
        // this.state.isHot = !this.state.isHot
        this.setState({
            isHot: !isHot
        })
    }
    // 这样会添加到实例上而不是原型上
    clickH1Func = () => {
        const {isHot} = this.state
        this.setState({
            isHot: !isHot
        })
    }
}

ReactDOM.render(<Weather></Weather>, document.querySelector('#test'))
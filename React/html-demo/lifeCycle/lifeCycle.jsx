class Life extends React.Component{
    state = {
        opacity: 1,
        timer: null
    }

    clear = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById('test'))
    }

    changeOpacity() {
        this.timer = setInterval(() => {
            const {opacity} = this.state
            this.setState({
                opacity: opacity <= 0 ? 1 : opacity - 0.1
            })
        }, 200)
    }

    componentDidMount() {
        this.changeOpacity()
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        return (
            <div>
                <h2 style={{opacity: this.state.opacity}}>测试组件</h2>
                <button onClick={this.clear}>清除</button>
            </div>
        );
    }
}

ReactDOM.render(<Life></Life>, document.getElementById('test'))

console.log(ReactDOM)
import React, { PureComponent } from 'react'

export default class Parent extends PureComponent {

    state = {
        carName: '奔驰'
    }

    changeCar() {
        this.setState({
            carName: '迈巴赫'
        })
    }

    componentWillMount() {
        console.log(this.buttonRef, '---')
    }

    componentDidMount() {
        console.log(this.buttonRef, 'xxx')
    }

    render() {
        return (
            <div>
                <h2>parent组件</h2>
                <h3>车名：{this.state.carName}</h3>
                <button ref={c => this.buttonRef = c} onClick={this.changeCar.bind(this)}>
                    点我换车
                </button>
                <Child {...this.state}></Child>
            </div>
        )
    }
}

class Child extends PureComponent {
    render() {
        console.log(this.props)
        return (
            <div>
                <h2>child组件</h2>
                <h3>接到的是：{this.props.carName}</h3>
            </div>
        )
    }
}

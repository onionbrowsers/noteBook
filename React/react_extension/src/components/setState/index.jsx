import React, { Component } from 'react'

export default class SetState extends Component {
    state = {
        count: 0
    }
    add() {
        /**
         * 对象式的setState
         */
        // this.setState({
        //     count: this.state.count + 1
        // }, () => {
        //     console.log(this.state, 'after')
        // })
        // console.log(this.state)
        /**
         * 函数式的setState
         */
        this.setState(state => ({
            count: ++state.count
        }))
    }
    render() {
        console.log(this.state, 'render')
        return (
            <div>
                <h1>
                    当前和为: {this.state.count}
                </h1>
                <button onClick={this.add.bind(this)}>
                    点击+1
                </button>
            </div>
        )
    }
}

import React, { Component } from 'react'

export default class Parent extends Component {
    render() {
        return (
            <div>
                <h2>parent组件</h2>
                <A render={state => {
                    return <B a={state.a}></B>
                }}></A>
            </div>
        )
    }
}

class A extends Component {
    state = {
        a: 1
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <h2>A组件</h2>
                {this.props.render(this.state)}
            </div>
        );
    }
}

class B extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <h2>B组件</h2>
            </div>
        );
    }
}

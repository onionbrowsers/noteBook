import React, { Component } from 'react'
import Child from './child'

export default class parent extends Component {

    state = {
        hasError: ''
    }

    static getDerivedStateFromError(error) {
        console.dir(error)
        return {
            hasError: error
        }
    }

    componentDidCatch(err, component) {
        console.log(component, 'catch')
    }

    render() {
        return (
            <div>
                <h3>我是parent</h3>
                {this.state.hasError ? <h2>出错</h2> : <Child></Child> }
            </div>
        )
    }
}

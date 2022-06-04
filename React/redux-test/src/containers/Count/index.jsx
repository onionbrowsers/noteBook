import { connect } from 'react-redux'
import {
    increment,
    decrement,
    incrementAsync
} from "../../redux/actions/count";
import React, { Component } from 'react'
import './index.css'

export class Count extends Component {
    increment() {
        const {value} = this.selectNumber
        this.props.increment(Number(value))
    }
    decrement() {
        const {value} = this.selectNumber
        this.props.decrement(Number(value))
    }
    incrementIfOdd() {
        const {value} = this.selectNumber
        const {count} = this.props
        if (count % 2 === 0) return
        this.props.increment(Number(value))
    }
    incrementAsync() {
        const {value} = this.selectNumber
        this.props.incrementAsync(Number(value), 500)
    }

    render() {
        return (
            <div className='count-wrapper'>
                <h1>当前求和为：{this.props.count || 0}</h1>
                <div className='action-wrapper'>
                    <select ref={c => this.selectNumber = c}>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                    </select>
                    <button onClick={this.increment.bind(this)}>+</button>
                    <button onClick={this.decrement.bind(this)}>-</button>
                    <button onClick={this.incrementIfOdd.bind(this)}>当前数为奇数+</button>
                    <button onClick={this.incrementAsync.bind(this)}>异步求和</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    count: state.count
})

const mapDispatchToProps = {
    increment,
    decrement,
    incrementAsync,
}

const CountContainer = connect(mapStateToProps, mapDispatchToProps)(Count)

export default CountContainer
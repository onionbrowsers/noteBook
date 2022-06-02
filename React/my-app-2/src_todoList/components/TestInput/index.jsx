import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TestInputModule from './index.module.css'

export default class TestInput extends Component {

    static propTypes = {
        addItem: PropTypes.func.isRequired
    }

    inputRef = React.createRef()

    handleInput(func, ...args) {
        let timer = null
        return function (...args2) {
            clearInterval(timer)
            timer = setTimeout(() => {
                func(...args, ...args2)
            }, 500)
        }
    }

    changeInput(event) {
        this.setState({
            value: event.target.value
        })
        // this.props.onChange(event.target.value)
    }

    keyDown(event) {
        const {value} = event.target
        if (event.keyCode !== 13 || !value.trim()) return
        this.props.addItem(value)
        this.inputRef.current.value = ''
    }

    render() {

        return (
            <div className={TestInputModule['input-wrapper']}>
                <input
                    ref={this.inputRef}
                    defaultValue={this.props.defaultValue || ''}
                    onKeyDown={this.keyDown.bind(this)}
                    type="text"
                    placeholder='请输入要做的事情' 
                    className={TestInputModule['input-content']}
                />
            </div>
        )
    }
}
